import postgres from 'postgres';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

const url =
	process.env.DATABASE_URL ??
	process.env.SUPABASE_DB_URL ??
	process.env.SUPABASE_DB_URI ??
	'';

/** Koneksi aktif hanya jika DATABASE_URL (Supabase Postgres) disediakan. */
export const dbEnabled = url.length > 0 && !url.includes('ganti-dengan');

export type Db = PostgresJsDatabase<typeof schema>;

export const db: Db | null = dbEnabled
	? drizzle(
			postgres(url, {
				max: 5,
				// diperlukan saat lewat Supabase Pooler (pgbouncer transaction mode)
				prepare: false,
				idle_timeout: 20,
				connect_timeout: 10
			}),
			{ schema }
		)
	: null;

export { schema };
