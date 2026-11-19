import type { BabModule, Scope } from './types';
import { scopes, categories } from './scopes';
import { modules as softwareEngineer } from './modules/software-engineer';
import { modules as uiUxDesigner } from './modules/ui-ux-designer';
import { modules as frontendDeveloper } from './modules/frontend-developer';
import { modules as backendDeveloper } from './modules/backend-developer';
import { modules as dataAnalyst } from './modules/data-analyst';
import { modules as cloudEngineer } from './modules/cloud-engineer';
import { modules as networkEngineer } from './modules/network-engineer';

export const modules: BabModule[] = [
	...softwareEngineer,
	...uiUxDesigner,
	...frontendDeveloper,
	...backendDeveloper,
	...dataAnalyst,
	...cloudEngineer,
	...networkEngineer
].sort((a, b) => a.id - b.id);

export const TOTAL_SCOPES = scopes.length;
export const TOTAL_MODULES = modules.length;
export const TOTAL_QUESTIONS = modules.reduce((sum, m) => sum + m.quiz.length, 0);

/** Jumlah bab per scope (7) — diturunkan dari konten, bukan angka mati. */
export const BABS_PER_SCOPE = modules.reduce((max, m) => Math.max(max, m.bab_number), 0);

/** Jumlah soal per kuis bab (10) — diturunkan dari konten. */
export const QUESTIONS_PER_BAB = modules.reduce(
	(max, m) => (m.quiz.length > max ? m.quiz.length : max),
	0
);

export function getScope(id: string | undefined): Scope | undefined {
	if (!id) return undefined;
	return scopes.find((s) => s.id === id);
}

export function modulesOfScope(scopeId: string): BabModule[] {
	return modules
		.filter((m) => m.scope_id === scopeId)
		.sort((a, b) => a.bab_number - b.bab_number);
}

export function getModule(scopeId: string | undefined, babNumber: number): BabModule | undefined {
	if (!scopeId) return undefined;
	return modules.find((m) => m.scope_id === scopeId && m.bab_number === babNumber);
}

export function questionsOfScope(scopeId: string): number {
	return modulesOfScope(scopeId).reduce((sum, m) => sum + m.quiz.length, 0);
}

export function nextModule(scopeId: string, babNumber: number): BabModule | undefined {
	return modules.find((m) => m.scope_id === scopeId && m.bab_number === babNumber + 1);
}

export { scopes, categories };
export type { BabModule, Scope };
