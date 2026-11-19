export type ScopeCategory = 'Engineering & Dev' | 'Data & Network' | 'Desain';

export type DiagramKind = 'client-server' | 'http-cycle' | 'osi' | 'subnet' | 'pipeline';

export type CodeLang =
	| 'javascript'
	| 'typescript'
	| 'python'
	| 'sql'
	| 'html'
	| 'css'
	| 'bash'
	| 'json'
	| 'go';

export interface Scope {
	id: string;
	title: string;
	category: ScopeCategory;
	description: string;
	icon: string;
	est_time: string;
	popularity: number;
	difficulty: number;
}

export interface QuizQuestion {
	id: string;
	question: string;
	image_url?: string | null;
	code?: string | null;
	code_lang?: CodeLang;
	code_caption?: string | null;
	options: string[];
	correct_answer_index: number;
	explanation: string;
}

export interface BabSection {
	heading: string;
	body: string;
}

export interface BabModule {
	id: number;
	scope_id: string;
	bab_number: number;
	title: string;
	subtitle: string;
	explanation: string;
	sections?: BabSection[];
	code_snippet?: string | null;
	code_lang?: CodeLang;
	code_caption?: string | null;
	image_url?: string | null;
	diagram?: DiagramKind | null;
	diagram_caption?: string | null;
	key_points: string[];
	quiz: QuizQuestion[];
}
