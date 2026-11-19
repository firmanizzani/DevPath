import postgres from 'postgres';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Jalankan file SQL (supabase/auth.sql) terhadap Supabase via DATABASE_URL.
 * Pakai: bun run db:policies
 */
async function main() {
	const url = process.env.DATABASE_URL;
	if (!url) {
		console.error('[policies] DATABASE_URL belum diisi di api/.env');
		process.exit(1);
	}

	const sql = postgres(url, {
		prepare: false,
		max: 1,
		connect_timeout: 15,
		onnotice: () => {}
	});

	try {
		const checks = await sql`
			select conname, pg_get_constraintdef(oid) as def
			from pg_constraint
			where contype = 'c' and connamespace = 'public'::regnamespace
		`;
		console.log('[policies] CHECK constraint di public:', JSON.stringify(checks));

		const path = fileURLToPath(new URL('../../../supabase/auth.sql', import.meta.url));
		const body = readFileSync(path, 'utf8');
		await sql.unsafe(body);
		console.log('[policies] supabase/auth.sql dieksekusi OK');

		const tables = await sql`
			select tablename from pg_tables
			where schemaname = 'public' order by tablename
		`;
		console.log(
			'[policies] tabel public:',
			tables.map((t) => t.tablename).join(', ')
		);
	} finally {
		await sql.end({ timeout: 1 });
	}
}

main().catch((error) => {
	console.error('[policies] gagal:', error);
	process.exit(1);
});
