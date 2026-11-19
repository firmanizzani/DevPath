import { defineConfig } from 'drizzle-kit';

const url =
	process.env.DATABASE_URL ??
	process.env.SUPABASE_DB_URL ??
	'postgresql://postgres:password@localhost:5432/postgres';

export default defineConfig({
	schema: './src/db/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: { url },
	verbose: true,
	strict: false
});
