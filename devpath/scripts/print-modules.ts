import { modules, scopes } from '$lib/data/index';

const out = scopes.flatMap((s) =>
	modules
		.filter((m) => m.scope_id === s.id)
		.sort((a, b) => a.bab_number - b.bab_number)
		.map((m) => ({
			scope: s.id,
			bab: m.bab_number,
			title: m.title,
			subtitle: m.subtitle,
			diagram: m.diagram ?? null,
			image: m.image_url ?? null,
			caption: m.diagram_caption ?? null,
			code: Boolean(m.code_snippet)
		}))
);

console.log(JSON.stringify(out, null, 1));
