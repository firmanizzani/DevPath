import { Elysia } from 'elysia';
import { createClient } from '@supabase/supabase-js';
import { sql, eq } from 'drizzle-orm';
import { db, schema } from './db';
interface ProgressInput {
	scope_id: string;
	bab_number: number;
	score: number;
	xp: number;
	is_completed: boolean;
	completed_at: string | null;
}

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? '';

const authClient =
	SUPABASE_URL && SUPABASE_ANON_KEY
		? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
				auth: { persistSession: false, autoRefreshToken: false }
			})
		: null;

/** Validasi JWT Supabase (Authorization: Bearer <access_token>) -> user id. */
export async function requireUser(authorization: string | undefined): Promise<string | null> {
	if (!authClient || !authorization?.startsWith('Bearer ')) return null;
	const token = authorization.slice(7).trim();
	if (!token) return null;
	try {
		const { data, error } = await authClient.auth.getUser(token);
		if (error || !data.user) return null;
		return data.user.id;
	} catch {
		return null;
	}
}

function sanitizeRow(raw: unknown): ProgressInput | null {
	if (!raw || typeof raw !== 'object') return null;
	const r = raw as Record<string, unknown>;
	const scopeId = typeof r.scope_id === 'string' ? r.scope_id.trim() : '';
	const bab = Number(r.bab_number);
	const score = Number(r.score);
	if (!scopeId || scopeId.length > 64) return null;
	if (!Number.isInteger(bab) || bab < 1 || bab > 7) return null;
	if (!Number.isFinite(score) || score < 0 || score > 100) return null;
	return {
		scope_id: scopeId,
		bab_number: bab,
		score: Math.round(score),
		xp: Math.round(Number(r.xp) || 0) || Math.round(score),
		is_completed: r.is_completed === undefined ? true : Boolean(r.is_completed),
		completed_at: typeof r.completed_at === 'string' ? r.completed_at : new Date().toISOString()
	};
}

/**
 * Endpoint progres belajar (Supabase `user_progress`).
 * Semua request wajib menyertakan access token Supabase.
 */
export const progressRoutes = new Elysia()
	.get('/api/progress', async ({ request, set }) => {
		const userId = await requireUser(request.headers.get('authorization') ?? undefined);
		if (!userId) {
			set.status = 401;
			return { error: 'Tidak terautentikasi' };
		}
		if (!db) {
			set.status = 503;
			return { error: 'Database tidak tersedia' };
		}

		const rows = await db
			.select()
			.from(schema.userProgress)
			.where(eq(schema.userProgress.user_id, userId));

		return rows.map((row) => ({
			scope_id: row.scope_id,
			bab_number: row.bab_number,
			score: row.score,
			xp: row.xp,
			is_completed: row.is_completed,
			completed_at: row.completed_at,
			updated_at: row.updated_at
		}));
	})
	.post('/api/progress/sync', async ({ request, set }) => {
		const userId = await requireUser(request.headers.get('authorization') ?? undefined);
		if (!userId) {
			set.status = 401;
			return { error: 'Tidak terautentikasi' };
		}
		if (!db) {
			set.status = 503;
			return { error: 'Database tidak tersedia' };
		}

		let body: unknown;
		try {
			body = await request.json();
		} catch {
			set.status = 400;
			return { error: 'Body JSON tidak valid' };
		}

		const rawRows = Array.isArray((body as { rows?: unknown[] })?.rows)
			? ((body as { rows: unknown[] }).rows as unknown[])
			: [];
		const rows = rawRows
			.map(sanitizeRow)
			.filter((r): r is ProgressInput => r !== null)
			.slice(0, 200);

		if (!rows.length) return { count: 0 };

		await db
			.insert(schema.userProgress)
			.values(
				rows.map((row) => ({
					...row,
					user_id: userId,
					completed_at: row.completed_at ? new Date(row.completed_at) : null
				}))
			)
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

		return { count: rows.length };
	})
	.post('/api/progress/complete', async ({ request, set }) => {
		const userId = await requireUser(request.headers.get('authorization') ?? undefined);
		if (!userId) {
			set.status = 401;
			return { error: 'Tidak terautentikasi' };
		}
		if (!db) {
			set.status = 503;
			return { error: 'Database tidak tersedia' };
		}

		let body: unknown;
		try {
			body = await request.json();
		} catch {
			set.status = 400;
			return { error: 'Body JSON tidak valid' };
		}

		const row = sanitizeRow(body);
		if (!row) {
			set.status = 400;
			return { error: 'Data progres tidak valid (scope_id, bab_number 1-7, score 0-100)' };
		}

		await db
			.insert(schema.userProgress)
			.values({ ...row, user_id: userId, completed_at: row.completed_at ? new Date(row.completed_at) : null })
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

		return { ok: true };
	})
	.delete('/api/progress', async ({ request, set }) => {
		const userId = await requireUser(request.headers.get('authorization') ?? undefined);
		if (!userId) {
			set.status = 401;
			return { error: 'Tidak terautentikasi' };
		}
		if (!db) {
			set.status = 503;
			return { error: 'Database tidak tersedia' };
		}

		await db.delete(schema.userProgress).where(eq(schema.userProgress.user_id, userId));
		return { ok: true };
	});
