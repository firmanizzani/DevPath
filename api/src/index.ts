import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { sql } from 'drizzle-orm';
import {
	findModule,
	findModuleById,
	findScope,
	listModules,
	listScopes,
	fetchScopeScores,
	source
} from './repository';
import { progressRoutes, requireUser } from './progress';
import { db, schema } from './db';

const PORT = Number(process.env.PORT ?? 3001);
const MAX_BAB = 7;
const PASS_SCORE = 70;

const app = new Elysia()
	.use(cors())
	.use(progressRoutes)
	.get('/health', () => ({
		status: 'ok',
		service: 'devpath-api',
		runtime: 'bun',
		database: source(),
		timestamp: new Date().toISOString()
	}))
	.get('/api/scopes', async () => listScopes())
	.get('/api/scopes/:id', async ({ params, set }) => {
		const scope = await findScope(params.id);
		if (!scope) {
			set.status = 404;
			return { error: 'Scope tidak ditemukan', id: params.id };
		}
		return scope;
	})
	.get('/api/scopes/:id/modules', async ({ params, set, request }) => {
		const scope = await findScope(params.id);
		if (!scope) {
			set.status = 404;
			return { error: 'Scope tidak ditemukan', id: params.id };
		}
		const modules = await listModules(params.id);
		const userId = await requireUser(request.headers.get('authorization') ?? undefined);
		const scores = await fetchScopeScores(userId, params.id);
		return modules.map((mod) => {
			const status = scores.get(mod.bab_number);
			return {
				...mod,
				status: status?.status ?? 'not-started',
				score: status?.score ?? 0
			};
		});
	})
	.get('/api/scopes/:id/modules/:bab', async ({ params, set }) => {
		const babNumber = Number(params.bab);
		if (!Number.isInteger(babNumber) || babNumber < 1 || babNumber > MAX_BAB) {
			set.status = 400;
			return { error: `Nomor bab harus 1-${MAX_BAB}`, bab: params.bab };
		}
		const mod = await findModule(params.id, babNumber);
		if (!mod) {
			set.status = 404;
			return { error: 'Modul tidak ditemukan', scope: params.id, bab: babNumber };
		}
		return mod;
	})
	// Kuis tersanitasi: tanpa kunci jawaban & pembahasan (aman dikirim ke client).
	.get('/api/modules/:babId/quiz', async ({ params, set }) => {
		const babId = Number(params.babId);
		if (!Number.isInteger(babId) || babId < 1) {
			set.status = 400;
			return { error: 'ID bab tidak valid', babId: params.babId };
		}
		const mod = await findModuleById(babId);
		if (!mod) {
			set.status = 404;
			return { error: 'Modul tidak ditemukan', babId };
		}
		return {
			id: mod.id,
			scope_id: mod.scope_id,
			bab_number: mod.bab_number,
			title: mod.title,
			subtitle: mod.subtitle,
			quiz: mod.quiz.map((question) => ({
				id: question.id,
				question: question.question,
				image_url: question.image_url,
				code: question.code,
				code_lang: question.code_lang,
				code_caption: question.code_caption,
				options: question.options
			}))
		};
	})
	// Penilaian kuis di server: { answers: number[] } -> skor + review penuh.
	// Bila token valid & skor >= 70, hasil disimpan ke user_progress.
	.post('/api/modules/:babId/submit', async ({ params, request, set }) => {
		const babId = Number(params.babId);
		if (!Number.isInteger(babId) || babId < 1) {
			set.status = 400;
			return { error: 'ID bab tidak valid', babId: params.babId };
		}
		const mod = await findModuleById(babId);
		if (!mod) {
			set.status = 404;
			return { error: 'Modul tidak ditemukan', babId };
		}

		let body: unknown;
		try {
			body = await request.json();
		} catch {
			set.status = 400;
			return { error: 'Body JSON tidak valid' };
		}
		const rawAnswers = (body as { answers?: unknown })?.answers;
		if (!Array.isArray(rawAnswers) || rawAnswers.length !== mod.quiz.length) {
			set.status = 400;
			return {
				error: `Jawaban harus berupa array berisi ${mod.quiz.length} angka`,
				expected: mod.quiz.length,
				received: Array.isArray(rawAnswers) ? rawAnswers.length : null
			};
		}
		const answers: number[] = [];
		for (const [index, value] of rawAnswers.entries()) {
			const n = Number(value);
			const options = mod.quiz[index]?.options.length ?? 4;
			if (!Number.isInteger(n) || n < 0 || n >= options) {
				set.status = 400;
				return { error: `Jawaban soal ke-${index + 1} di luar rentang opsi` };
			}
			answers.push(n);
		}

		let correct = 0;
		const review = mod.quiz.map((question, index) => {
			const isCorrect = answers[index] === question.correct_answer_index;
			if (isCorrect) correct += 1;
			return {
				id: question.id,
				your_answer_index: answers[index],
				correct_answer_index: question.correct_answer_index,
				correct: isCorrect,
				explanation: question.explanation
			};
		});

		const total = mod.quiz.length;
		const score = Math.round((correct / total) * 100);
		const passed = score >= PASS_SCORE;

		let saved = false;
		const userId = await requireUser(request.headers.get('authorization') ?? undefined);
		if (userId && db && passed) {
			try {
				await db
					.insert(schema.userProgress)
					.values({
						user_id: userId,
						scope_id: mod.scope_id,
						bab_number: mod.bab_number,
						score,
						xp: score,
						is_completed: true,
						completed_at: new Date()
					})
					.onConflictDoUpdate({
						target: [
							schema.userProgress.user_id,
							schema.userProgress.scope_id,
							schema.userProgress.bab_number
						],
						set: {
							score: sql`greatest(${schema.userProgress.score}, excluded.score)`,
							xp: sql`greatest(${schema.userProgress.xp}, excluded.xp)`,
							is_completed: sql`(${schema.userProgress.is_completed} or excluded.is_completed)`,
							completed_at: sql`coalesce(${schema.userProgress.completed_at}, excluded.completed_at)`,
							updated_at: new Date()
						}
					});
				saved = true;
			} catch (error) {
				console.warn(
					'[devpath-api] gagal menyimpan hasil submit:',
					error instanceof Error ? error.message : error
				);
			}
		}

		return { score, correct, total, passed, pass_score: PASS_SCORE, saved, review };
	})
	.get('/api/search', async ({ query }) => {
		const q = String(query.q ?? '').trim().toLowerCase();
		const scopes = await listScopes();
		if (!q) return scopes;
		return scopes.filter(
			(scope) =>
				scope.title.toLowerCase().includes(q) ||
				scope.description.toLowerCase().includes(q) ||
				scope.category.toLowerCase().includes(q)
		);
	})
	.listen(PORT);

console.log(`[devpath-api] berjalan di http://localhost:${PORT} • db=${source()}`);

export type App = typeof app;
