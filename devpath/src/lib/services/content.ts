import type { BabModule, Scope } from '$lib/data/types';
import { modules as localModules, scopes as localScopes, modulesOfScope } from '$lib/data';

const RAW_BASE = import.meta.env.PUBLIC_API_URL ?? '';
const BASE = RAW_BASE.replace(/\/$/, '');
const TIMEOUT_MS = 1500;

export type DataSource = 'api' | 'local';

async function apiGet<T>(path: string): Promise<T | null> {
	if (!BASE) return null;
	try {
		const res = await fetch(`${BASE}${path}`, {
			signal: AbortSignal.timeout(TIMEOUT_MS),
			headers: { accept: 'application/json' }
		});
		if (!res.ok) return null;
		return (await res.json()) as T;
	} catch {
		return null;
	}
}

export async function fetchScopes(): Promise<{ data: Scope[]; source: DataSource }> {
	const remote = await apiGet<Scope[]>('/api/scopes');
	if (Array.isArray(remote) && remote.length > 0) return { data: remote, source: 'api' };
	return { data: localScopes, source: 'local' };
}

export async function fetchModule(
	scopeId: string,
	babNumber: number
): Promise<{ data: BabModule | undefined; source: DataSource }> {
	const remote = await apiGet<BabModule>(`/api/scopes/${scopeId}/modules/${babNumber}`);
	if (remote && remote.id) return { data: remote, source: 'api' };
	const local = localModules.find((m) => m.scope_id === scopeId && m.bab_number === babNumber);
	return { data: local, source: 'local' };
}

export async function fetchScopeModules(
	scopeId: string
): Promise<{ data: BabModule[]; source: DataSource }> {
	const remote = await apiGet<BabModule[]>(`/api/scopes/${scopeId}/modules`);
	if (Array.isArray(remote) && remote.length > 0) return { data: remote, source: 'api' };
	return { data: modulesOfScope(scopeId), source: 'local' };
}

export const apiStatus = {
	base: BASE,
	enabled: BASE.length > 0
};

export interface QuizSubmitResult {
	score: number;
	correct: number;
	total: number;
	passed: boolean;
}

/**
 * Kirim seluruh jawaban kuis untuk dinilai server (`POST /api/modules/:babId/submit`).
 * Server menyimpan ke `user_progress` bila skor >= 70 dan token disertakan.
 * Mengembalikan null bila API mati/tidak merespons — pemanggil memakai penilaian lokal.
 */
export async function postQuizSubmit(
	babId: number,
	answers: number[]
): Promise<QuizSubmitResult | null> {
	if (!BASE) return null;
	try {
		const { accessToken } = await import('./supabase');
		const token = await accessToken();
		const res = await fetch(`${BASE}/api/modules/${babId}/submit`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				...(token ? { authorization: `Bearer ${token}` } : {})
			},
			body: JSON.stringify({ answers }),
			signal: AbortSignal.timeout(TIMEOUT_MS)
		});
		if (!res.ok) return null;
		const data = (await res.json()) as Partial<QuizSubmitResult>;
		if (typeof data?.score !== 'number' || typeof data?.correct !== 'number') return null;
		return {
			score: data.score,
			correct: data.correct,
			total: typeof data.total === 'number' ? data.total : answers.length,
			passed: data.passed === undefined ? data.score >= 70 : Boolean(data.passed)
		};
	} catch {
		return null;
	}
}
