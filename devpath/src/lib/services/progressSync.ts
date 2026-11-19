import { get } from 'svelte/store';
import { PUBLIC_API_URL } from '$env/static/public';
import { commit, progress, type ProgressState, type ScopeProgress } from './progress';
import { accessToken } from './supabase';

/** Baris `user_progress` di Supabase (mirror per scope/bab). */
export interface ProgressRow {
	scope_id: string;
	bab_number: number;
	score: number;
	xp: number;
	is_completed: boolean;
	completed_at?: string | null;
	updated_at?: string;
}

const BASE = (PUBLIC_API_URL ?? '').replace(/\/$/, '');

async function api<T>(path: string, init?: RequestInit): Promise<T | null> {
	if (!BASE) return null;
	const token = await accessToken();
	if (!token) return null;
	try {
		const res = await fetch(`${BASE}${path}`, {
			...init,
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
				...(init?.headers ?? {})
			},
			signal: AbortSignal.timeout(6000)
		});
		if (!res.ok) return null;
		return (await res.json()) as T;
	} catch {
		return null;
	}
}

/** State (LocalStorage) -> baris DB. Hanya bab yang selesai yang dikirim. */
export function rowsFromState(state: ProgressState): ProgressRow[] {
	const rows: ProgressRow[] = [];
	for (const [scopeId, p] of Object.entries(state.scopes)) {
		for (const bab of p.completed) {
			const score = p.scores[String(bab)] ?? 0;
			rows.push({
				scope_id: scopeId,
				bab_number: bab,
				score,
				xp: score,
				is_completed: true,
				completed_at: new Date(p.updated_at || Date.now()).toISOString()
			});
		}
	}
	return rows;
}

/** Gabungkan baris DB ke state lokal: union bab selesai + skor tertinggi menang. */
export function mergeRowsIntoState(state: ProgressState, rows: ProgressRow[]): ProgressState {
	const next: ProgressState = { version: 1, scopes: JSON.parse(JSON.stringify(state.scopes)) };

	for (const row of rows) {
		if (!row?.scope_id || !Number.isInteger(row.bab_number)) continue;
		const p: ScopeProgress = (next.scopes[row.scope_id] ??= {
			completed: [],
			scores: {},
			xp: 0,
			updated_at: Date.now()
		});
		if (row.is_completed && !p.completed.includes(row.bab_number)) {
			p.completed.push(row.bab_number);
		}
		const incoming = Number(row.score) || 0;
		const key = String(row.bab_number);
		p.scores[key] = Math.max(p.scores[key] ?? 0, incoming);
	}

	for (const p of Object.values(next.scopes)) {
		p.completed.sort((a, b) => a - b);
		const sumScores = p.completed.reduce((sum, bab) => sum + (p.scores[String(bab)] ?? 0), 0);
		p.xp = Math.max(p.xp ?? 0, sumScores);
		p.updated_at = Date.now();
	}

	return next;
}

export async function pullRemote(): Promise<ProgressRow[] | null> {
	const rows = await api<ProgressRow[]>('/api/progress');
	return Array.isArray(rows) ? rows : null;
}

export async function pushRows(rows: ProgressRow[]): Promise<boolean> {
	if (!rows.length) return true;
	const res = await api<{ count: number }>('/api/progress/sync', {
		method: 'POST',
		body: JSON.stringify({ rows })
	});
	return res !== null;
}

/** Simpan satu hasil kuis (dipanggil saat kuis selesai). */
export async function pushCompletion(
	scopeId: string,
	babNumber: number,
	score: number,
	isCompleted = true
): Promise<boolean> {
	const res = await api<{ ok: boolean }>('/api/progress/complete', {
		method: 'POST',
		body: JSON.stringify({ scope_id: scopeId, bab_number: babNumber, score, is_completed: isCompleted })
	});
	return res !== null;
}

export async function resetRemoteProgress(): Promise<boolean> {
	const res = await api<{ ok: boolean }>('/api/progress', { method: 'DELETE' });
	return res !== null;
}

/**
 * Sinkronisasi dua arah — dipanggil saat pengguna baru login/daftar:
 * tarik data cloud, gabung dengan progres lokal, lalu tulis hasil gabungannya.
 */
export async function bootstrapSync(): Promise<void> {
	const remote = await pullRemote();
	const local = get(progress);
	if (!remote) return;

	const merged = mergeRowsIntoState(local, remote);
	commit(merged);
	await pushRows(rowsFromState(merged));
}
