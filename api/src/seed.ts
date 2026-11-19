import { eq, sql } from 'drizzle-orm';
import { db, schema } from './db';
import { scopes, modules } from '$lib/data/index';

/**
 * Seed Supabase (PostgreSQL) dari konten lokal DevPath.
 * Jalankan: `bun run db:seed` dengan DATABASE_URL di .env
 */
async function main() {
	if (!db) {
		console.log(
			'[seed] DATABASE_URL belum diisi — melewati seeding. Isi api/.env lalu jalankan lagi `bun run db:seed`.'
		);
		return;
	}

	console.log(`[seed] menyinkronkan ${scopes.length} scope & ${modules.length} bab...`);

	for (const scope of scopes) {
		await db
			.insert(schema.scopes)
			.values({
				id: scope.id,
				title: scope.title,
				category: scope.category,
				description: scope.description,
				icon_name: scope.icon,
				est_time: scope.est_time,
				popularity: scope.popularity,
				difficulty: scope.difficulty
			})
			.onConflictDoUpdate({
				target: schema.scopes.id,
				set: {
					title: scope.title,
					category: scope.category,
					description: scope.description,
					icon_name: scope.icon,
					est_time: scope.est_time,
					popularity: scope.popularity,
					difficulty: scope.difficulty
				}
			});
	}

	// Konten lama dihapus dulu (cascade ke quiz_questions) supaya id primair bab
	// selalu mengikuti konten baru (49 bab, skema id SE=1-7 ... NE=43-49).
	// Progres pengguna (user_progress) tidak tersentuh — hanya bergantung scope+bab_number.
	console.log('[seed] menghapus konten bab & kuis lama...');
	await db.delete(schema.quizQuestions);
	await db.delete(schema.babModules);

	for (const mod of modules) {
		const [bab] = await db
			.insert(schema.babModules)
			.values({
				id: mod.id,
				scope_id: mod.scope_id,
				bab_number: mod.bab_number,
				title: mod.title,
				subtitle: mod.subtitle,
				explanation: mod.explanation,
				sections: mod.sections ?? null,
				code_snippet: mod.code_snippet ?? null,
				code_lang: mod.code_lang ?? null,
				code_caption: mod.code_caption ?? null,
				image_url: mod.image_url ?? null,
				diagram: mod.diagram ?? null,
				diagram_caption: mod.diagram_caption ?? null,
				key_points: mod.key_points
			})
			.onConflictDoUpdate({
				target: [schema.babModules.scope_id, schema.babModules.bab_number],
				set: {
					title: mod.title,
					subtitle: mod.subtitle,
					explanation: mod.explanation,
					sections: mod.sections ?? null,
					code_snippet: mod.code_snippet ?? null,
					code_lang: mod.code_lang ?? null,
					code_caption: mod.code_caption ?? null,
					image_url: mod.image_url ?? null,
					diagram: mod.diagram ?? null,
					diagram_caption: mod.diagram_caption ?? null,
					key_points: mod.key_points
				}
			})
			.returning({ id: schema.babModules.id });

		const babId = bab.id;
		await db.delete(schema.quizQuestions).where(eq(schema.quizQuestions.bab_id, babId));

		await db.insert(schema.quizQuestions).values(
			mod.quiz.map((question, index) => ({
				question_key: question.id,
				bab_id: babId,
				position: index,
				question: question.question,
				image_url: question.image_url ?? null,
				code: question.code ?? null,
				code_lang: question.code_lang ?? null,
				code_caption: question.code_caption ?? null,
				options: question.options,
				correct_answer_index: question.correct_answer_index,
				explanation: question.explanation
			}))
		);

		console.log(`  ✓ ${mod.scope_id} bab ${mod.bab_number} — ${mod.quiz.length} soal`);
	}

	console.log('[seed] selesai.');

	// Jaga urutan serial setelah insert id eksplisit (1..49).
	await db.execute(
		sql`select setval('bab_modules_id_seq', coalesce((select max(id) from bab_modules), 0) + 1, false)`
	);
	await db.execute(
		sql`select setval('quiz_questions_id_seq', coalesce((select max(id) from quiz_questions), 0) + 1, false)`
	);
	console.log('[seed] sequence bab_modules & quiz_questions disinkronkan.');
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error('[seed] gagal:', error);
		process.exit(1);
	});
