import { writable } from 'svelte/store';
import type { Scope } from '$lib/data/types';
import { BABS_PER_SCOPE, QUESTIONS_PER_BAB } from '$lib/data';

/** Standar kelulusan: minimal 7 dari 10 soal benar (>= 70) untuk membuka bab berikutnya. */
export const PASS_SCORE = 70;
export { BABS_PER_SCOPE, QUESTIONS_PER_BAB };

export function passed(score: number): boolean {
	return score >= PASS_SCORE;
}

export interface ScopeProgress {
	completed: number[];
	scores: Record<string, number>;
	xp: number;
	updated_at: number;
}

export interface ProgressState {
	version: number;
	scopes: Record<string, ScopeProgress>;
}

const KEY = 'devpath:progress:v1';
const EMPTY: ProgressState = { version: 1, scopes: {} };

function read(): ProgressState {
	if (typeof localStorage === 'undefined') return EMPTY;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return EMPTY;
		const parsed = JSON.parse(raw) as ProgressState;
		if (!parsed || typeof parsed !== 'object' || !parsed.scopes) return EMPTY;
		return { version: 1, scopes: parsed.scopes };
	} catch {
		return EMPTY;
	}
}

function write(state: ProgressState) {
	if (typeof localStorage === 'undefined') return;
	try {
		localStorage.setItem(KEY, JSON.stringify(state));
	} catch {
		/* storage penuh / private mode — abaikan */
	}
}

export const progress = writable<ProgressState>(EMPTY);

/** Simpan state baru ke LocalStorage sekaligus update store (dipakai sinkronisasi cloud). */
export function commit(state: ProgressState) {
	write(state);
	progress.set(state);
}

export function hydrateProgress() {
	progress.set(read());
}

function ensure(state: ProgressState, scopeId: string): ScopeProgress {
	if (!state.scopes[scopeId]) {
		state.scopes[scopeId] = { completed: [], scores: {}, xp: 0, updated_at: Date.now() };
	}
	return state.scopes[scopeId];
}

function clone(state: ProgressState): ProgressState {
	return { version: 1, scopes: JSON.parse(JSON.stringify(state.scopes)) };
}

export function scopeProgress(state: ProgressState, scopeId: string): ScopeProgress {
	return state.scopes[scopeId] ?? { completed: [], scores: {}, xp: 0, updated_at: 0 };
}

export function isUnlocked(state: ProgressState, scopeId: string, babNumber: number): boolean {
	if (babNumber <= 1) return true;
	const p = scopeProgress(state, scopeId);
	return p.completed.includes(babNumber - 1);
}

export function isCompleted(state: ProgressState, scopeId: string, babNumber: number): boolean {
	return scopeProgress(state, scopeId).completed.includes(babNumber);
}

export function currentBab(state: ProgressState, scopeId: string, totalBab = BABS_PER_SCOPE): number {
	const p = scopeProgress(state, scopeId);
	for (let i = 1; i <= totalBab; i++) {
		if (!p.completed.includes(i) && isUnlocked(state, scopeId, i)) return i;
	}
	return totalBab;
}

export interface ScopeStats {
	completed: number;
	total: number;
	percent: number;
	status: 'not-started' | 'in-progress' | 'completed';
	current: number;
	avgScore: number;
}

export function statsFor(state: ProgressState, scope: Scope, totalBab = BABS_PER_SCOPE): ScopeStats {
	const p = scopeProgress(state, scope.id);
	const completed = p.completed.filter((b) => b >= 1 && b <= totalBab).length;
	const scores = Object.values(p.scores);
	const avgScore = scores.length
		? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
		: 0;
	return {
		completed,
		total: totalBab,
		percent: Math.round((completed / totalBab) * 100),
		status: completed === 0 ? 'not-started' : completed === totalBab ? 'completed' : 'in-progress',
		current: currentBab(state, scope.id, totalBab),
		avgScore
	};
}

/**
 * Catat hasil kuis. Skor selalu disimpan (untuk rata-rata), tetapi bab hanya
 * ditandai `completed` — dan bab berikutnya terbuka — bila skor >= PASS_SCORE.
 */
export function markCompleted(scopeId: string, babNumber: number, score: number) {
	progress.update((state) => {
		const next = clone(state);
		const p = ensure(next, scopeId);
		if (passed(score) && !p.completed.includes(babNumber)) p.completed.push(babNumber);
		p.completed.sort((a, b) => a - b);
		const prev = p.scores[String(babNumber)] ?? 0;
		if (score > prev) p.scores[String(babNumber)] = score;
		p.xp += Math.max(0, Math.round(score));
		p.updated_at = Date.now();
		write(next);
		return next;
	});
}

export function resetAll() {
	const next: ProgressState = { version: 1, scopes: {} };
	write(next);
	progress.set(next);
}

export function totalXp(state: ProgressState): number {
	return Object.values(state.scopes).reduce((sum, p) => sum + (p.xp ?? 0), 0);
}
