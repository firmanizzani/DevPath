import { scopes, modules, TOTAL_MODULES, TOTAL_QUESTIONS, TOTAL_SCOPES } from '$lib/data/index';

const problems: string[] = [];
const push = (m: string) => problems.push(m);

const validCategories = new Set(['Engineering & Dev', 'Data & Network', 'Desain']);
const validLangs = new Set([
	'javascript',
	'typescript',
	'python',
	'sql',
	'html',
	'css',
	'bash',
	'json',
	'go'
]);
const validDiagrams = new Set(['client-server', 'http-cycle', 'osi', 'subnet', 'pipeline']);

const BABS_PER_SCOPE = 7;
const QUESTIONS_PER_BAB = 10;
const PASS_SCORE = 70;

if (TOTAL_SCOPES !== 7) push(`scope harus 7, dapat ${TOTAL_SCOPES}`);
if (TOTAL_MODULES !== 49) push(`modul harus 49, dapat ${TOTAL_MODULES}`);
if (TOTAL_QUESTIONS !== 490) push(`soal harus 490, dapat ${TOTAL_QUESTIONS}`);

const ids = new Set<number>();
const questionIds = new Set<string>();

for (const scope of scopes) {
	if (!validCategories.has(scope.category)) push(`kategori tak dikenal: ${scope.category} (${scope.id})`);
	if (!scope.description) push(`scope ${scope.id} tanpa deskripsi`);
	const babs = modules
		.filter((m) => m.scope_id === scope.id)
		.map((m) => m.bab_number)
		.sort((a, b) => a - b);
	if (babs.length !== BABS_PER_SCOPE) push(`${scope.id}: harus ${BABS_PER_SCOPE} bab, dapat ${babs.length}`);
	for (let i = 1; i <= BABS_PER_SCOPE; i++) {
		if (!babs.includes(i)) push(`${scope.id}: bab ${i} hilang`);
	}
}

for (let i = 1; i <= 49; i++) {
	if (!modules.some((m) => m.id === i)) push(`id modul hilang: ${i}`);
}

for (const mod of modules) {
	const tag = `${mod.scope_id} b${mod.bab_number}`;
	if (ids.has(mod.id)) push(`id duplikat: ${mod.id}`);
	ids.add(mod.id);

	if (mod.bab_number < 1 || mod.bab_number > BABS_PER_SCOPE) push(`${tag}: bab_number di luar 1-${BABS_PER_SCOPE}`);
	if (!mod.title?.trim()) push(`${tag}: judul kosong`);
	if (!mod.subtitle?.trim()) push(`${tag}: subtitle kosong`);
	if (!scopes.some((s) => s.id === mod.scope_id)) push(`${tag}: scope_id tak dikenal`);

	const paragraphs = mod.explanation.split(/\n{2,}/).filter((p) => p.trim().length > 1);
	if (paragraphs.length < 2) push(`${tag}: explanation butuh >= 2 paragraf, dapat ${paragraphs.length}`);
	if (paragraphs.length > 4) push(`${tag}: explanation maksimal 4 paragraf, dapat ${paragraphs.length}`);
	if (mod.explanation.split(/\s+/).length < 150) push(`${tag}: explanation terlalu pendek (<150 kata)`);

	if (mod.key_points?.length !== 3) push(`${tag}: key_points harus 3, dapat ${mod.key_points?.length}`);

	if (mod.code_snippet && !mod.code_lang) push(`${tag}: code_snippet tanpa code_lang`);
	if (mod.code_lang && !validLangs.has(mod.code_lang)) push(`${tag}: code_lang tak dikenal: ${mod.code_lang}`);
	if (!mod.code_snippet && !mod.diagram && !mod.image_url)
		push(`${tag}: butuh code_snippet ATAU diagram ATAU image_url`);
	if (mod.diagram && !validDiagrams.has(mod.diagram)) push(`${tag}: diagram tak dikenal: ${mod.diagram}`);
	if (mod.image_url && !/^\/diagrams\/[\w-]+\.svg$/.test(mod.image_url))
		push(`${tag}: image_url harus /diagrams/<slug>.svg, dapat ${mod.image_url}`);
	if ((mod.diagram || mod.image_url) && !mod.diagram_caption)
		push(`${tag}: visual (diagram/image_url) tanpa diagram_caption`);
	if (mod.sections && mod.sections.length > 1) push(`${tag}: sections maksimal 1`);

	if (!mod.quiz || mod.quiz.length !== QUESTIONS_PER_BAB)
		push(`${tag}: kuis harus ${QUESTIONS_PER_BAB} soal, dapat ${mod.quiz?.length}`);

	const indexCounts = [0, 0, 0, 0];

	for (const [i, q] of (mod.quiz ?? []).entries()) {
		const qtag = `${tag} q${i + 1}`;
		if (questionIds.has(q.id)) push(`id soal duplikat: ${q.id}`);
		questionIds.add(q.id);
		const expected = `${mod.scope_id}-b${mod.bab_number}-q${i + 1}`;
		if (q.id !== expected) push(`${qtag}: id salah, harus ${expected}, dapat ${q.id}`);
		if (!q.question?.trim()) push(`${qtag}: pertanyaan kosong`);
		if (q.options?.length !== 4) push(`${qtag}: opsi harus 4, dapat ${q.options?.length}`);
		if (q.correct_answer_index < 0 || q.correct_answer_index > 3) {
			push(`${qtag}: indeks jawaban di luar 0-3`);
		} else {
			indexCounts[q.correct_answer_index] += 1;
		}
		if (!q.explanation?.trim()) push(`${qtag}: pembahasan kosong`);
		if (q.code && !q.code_lang) push(`${qtag}: code tanpa code_lang`);
		if (q.code_lang && !validLangs.has(q.code_lang)) push(`${qtag}: code_lang tak dikenal`);
	}

	indexCounts.forEach((count, index) => {
		if (count < 2 || count > 4) {
			push(`${tag}: sebaran kunci tidak seimbang — opsi ${index} dipakai ${count}x (harus 2-4)`);
		}
	});
}

if (PASS_SCORE !== 70) push('PASS_SCORE harus 70');

const summary = {
	scopes: TOTAL_SCOPES,
	modules: TOTAL_MODULES,
	questions: TOTAL_QUESTIONS,
	babPerScope: BABS_PER_SCOPE,
	questionsPerBab: QUESTIONS_PER_BAB,
	passScore: PASS_SCORE,
	withCode: modules.filter((m) => m.code_snippet).length,
	withDiagram: modules.filter((m) => m.diagram).length,
	withImage: modules.filter((m) => m.image_url).length,
	withSections: modules.filter((m) => m.sections?.length).length,
	withCodeQuestions: modules.reduce((sum, m) => sum + m.quiz.filter((q) => q.code).length, 0)
};

console.log(JSON.stringify(summary, null, 2));

if (problems.length) {
	console.error(`\n${problems.length} masalah:`);
	problems.forEach((p) => console.error(' - ' + p));
	process.exit(1);
}

console.log('\nSemua validasi konten lulus.');
