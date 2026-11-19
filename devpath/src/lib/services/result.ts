export interface QuizResult {
	scope_id: string;
	bab_number: number;
	score: number;
	correct: number;
	total: number;
	answers: number[];
	time_ms: number;
	at: number;
}

const KEY = 'devpath:last-result';

export function saveResult(result: QuizResult) {
	if (typeof sessionStorage === 'undefined') return;
	try {
		sessionStorage.setItem(KEY, JSON.stringify(result));
	} catch {
		/* abaikan */
	}
}

export function readResult(): QuizResult | null {
	if (typeof sessionStorage === 'undefined') return null;
	try {
		const raw = sessionStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as QuizResult;
		if (typeof parsed?.score !== 'number') return null;
		return parsed;
	} catch {
		return null;
	}
}

export function formatDuration(ms: number): string {
	const totalSeconds = Math.max(1, Math.round(ms / 1000));
	const m = Math.floor(totalSeconds / 60);
	const s = totalSeconds % 60;
	return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} Menit`;
}
