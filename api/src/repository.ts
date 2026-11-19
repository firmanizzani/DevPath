import { eq, asc, and } from 'drizzle-orm';
import type { BabModule, Scope } from '$lib/data/types';
import {
	scopes as localScopes,
	modules as localModules,
	modulesOfScope as localModulesOfScope,
	getModule as localGetModule
} from '$lib/data/index';
import { db, dbEnabled, schema } from './db';
import type { BabRow, QuestionRow, ScopeRow } from './db/schema';

/** Semua akses DB dibungkus try/catch: bila Supabase tak terjangkau, fallback ke konten lokal. */
async function safe<T>(fn: () => Promise<T>): Promise<T | null> {
	if (!db || !dbEnabled) return null;
	try {
		return await fn();
	} catch (error) {
		console.warn('[devpath-api] database tidak tersedia:', error instanceof Error ? error.message : error);
		return null;
	}
}

function toScope(row: ScopeRow): Scope {
	return {
		id: row.id,
		title: row.title,
		category: row.category as Scope['category'],
		description: row.description,
		icon: row.icon_name,
		est_time: row.est_time,
		popularity: row.popularity,
		difficulty: row.difficulty
	};
}

function toQuestion(row: QuestionRow) {
	return {
		id: row.question_key,
		question: row.question,
		image_url: row.image_url,
		code: row.code,
		code_lang: (row.code_lang as BabModule['code_lang']) ?? undefined,
		code_caption: row.code_caption,
		options: (row.options as string[]) ?? [],
		correct_answer_index: row.correct_answer_index,
		explanation: row.explanation
	};
}

function toModule(bab: BabRow, questions: QuestionRow[]): BabModule {
	return {
		id: bab.id,
		scope_id: bab.scope_id,
		bab_number: bab.bab_number,
		title: bab.title,
		subtitle: bab.subtitle ?? '',
		explanation: bab.explanation,
		sections: (bab.sections as BabModule['sections']) ?? undefined,
		code_snippet: bab.code_snippet,
		code_lang: (bab.code_lang as BabModule['code_lang']) ?? undefined,
		code_caption: bab.code_caption,
		image_url: bab.image_url,
		diagram: (bab.diagram as BabModule['diagram']) ?? null,
		diagram_caption: bab.diagram_caption,
		key_points: (bab.key_points as string[]) ?? [],
		quiz: [...questions]
			.sort((a, b) => a.position - b.position)
			.map((question) => toQuestion(question))
	};
}

export async function listScopes(): Promise<Scope[]> {
	const rows = await safe(() => db!.query.scopes.findMany({ orderBy: asc(schema.scopes.title) }));
	if (rows && rows.length) return rows.map(toScope);
	return localScopes;
}

export async function findScope(id: string): Promise<Scope | undefined> {
	const rows = await safe(() => db!.query.scopes.findMany({ where: eq(schema.scopes.id, id) }));
	if (rows && rows.length) return toScope(rows[0]);
	return localScopes.find((scope) => scope.id === id);
}

export async function listModules(scopeId: string): Promise<BabModule[]> {
	const rows = await safe(() =>
		db!.query.babModules.findMany({
			where: eq(schema.babModules.scope_id, scopeId),
			orderBy: asc(schema.babModules.bab_number),
			with: { questions: true }
		})
	);
	if (rows && rows.length) {
		return rows.map((bab) => toModule(bab, bab.questions ?? []));
	}
	return localModulesOfScope(scopeId);
}

export async function findModule(scopeId: string, babNumber: number): Promise<BabModule | undefined> {
	const rows = await safe(() =>
		db!.query.babModules.findMany({
			where: (table, { and, eq }) =>
				and(eq(table.scope_id, scopeId), eq(table.bab_number, babNumber)),
			with: { questions: true },
			limit: 1
		})
	);
	if (rows && rows.length) return toModule(rows[0], rows[0].questions ?? []);
	return localGetModule(scopeId, babNumber);
}

export const source = () => (dbEnabled ? 'supabase(drizzle)' : 'local');

/** Cari modul berdasarkan primair key `bab_modules.id` (untuk endpoint /api/modules/:babId). */
export async function findModuleById(babId: number): Promise<BabModule | undefined> {
	const rows = await safe(() =>
		db!.query.babModules.findMany({
			where: eq(schema.babModules.id, babId),
			with: { questions: true },
			limit: 1
		})
	);
	if (rows && rows.length) return toModule(rows[0], rows[0].questions ?? []);
	return localModules.find((mod) => mod.id === babId);
}

export type ModuleStatus = 'not-started' | 'in-progress' | 'completed';

/**
 * Ambil skor progres pengguna untuk satu scope -> Map<bab_number, {status, score}>.
 * Tanpa user/DB mengembalikan Map kosong (semua not-started).
 */
export async function fetchScopeScores(
	userId: string | null,
	scopeId: string
): Promise<Map<number, { status: ModuleStatus; score: number }>> {
	const map = new Map<number, { status: ModuleStatus; score: number }>();
	if (!userId) return map;
	const rows = await safe(() =>
		db!
			.select()
			.from(schema.userProgress)
			.where(
				and(eq(schema.userProgress.user_id, userId), eq(schema.userProgress.scope_id, scopeId))
			)
	);
	for (const row of rows ?? []) {
		map.set(row.bab_number, {
			status: row.is_completed ? 'completed' : row.score > 0 ? 'in-progress' : 'not-started',
			score: row.score
		});
	}
	return map;
}
