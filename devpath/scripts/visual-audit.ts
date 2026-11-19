/**
 * Visual audit: menghasilkan 49 SVG dari `scripts/diagrams/specs.ts`,
 * lalu menulis `image_url` dan `diagram_caption` ke tiap file modul.
 *
 * Jalankan: bun run scripts/visual-audit.ts
 * Setelah itu: npm run validate:data && npm run check && (cd api) bun run db:seed
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { modules } from '$lib/data/index';
import { specs } from './diagrams/specs';

const ROOT = join(import.meta.dir, '..');
const DIAG_DIR = join(ROOT, 'static', 'diagrams');
const MODULE_DIR = join(ROOT, 'src', 'lib', 'data', 'modules');

const errors: string[] = [];
const notes: string[] = [];

/* --------------------------------------------------- validasi & caption */
if (specs.length !== 49) errors.push(`specs harus 49, dapat ${specs.length}`);

const slugs = new Set<string>();
type Job = { spec: (typeof specs)[number]; module: (typeof modules)[number]; caption: string };
const jobs: Job[] = [];

for (const spec of specs) {
	if (slugs.has(spec.slug)) errors.push(`slug duplikat: ${spec.slug}`);
	slugs.add(spec.slug);

	const mod = modules.find((m) => m.scope_id === spec.scope && m.bab_number === spec.bab);
	if (!mod) {
		errors.push(`modul tidak ditemukan: ${spec.scope} bab ${spec.bab}`);
		continue;
	}

	const rest = spec.caption.replace(/^Gambar [\d.]+:\s*/, '');
	const caption = `Gambar ${mod.id}.1: ${rest}`;
	if (caption !== spec.caption) {
		notes.push(`${spec.slug}: prefix caption dikoreksi menjadi "Gambar ${mod.id}.1"`);
	}
	jobs.push({ spec, module: mod, caption });
}

if (errors.length) {
	errors.forEach((e) => console.error(` - ${e}`));
	process.exit(1);
}

/* ------------------------------------------------------------ tulis SVG */
mkdirSync(DIAG_DIR, { recursive: true });

for (const job of jobs) {
	const svg = job.spec.svg();
	if (!svg.includes('viewBox="0 0 960 540"')) {
		errors.push(`${job.spec.slug}: viewBox bukan 960x540`);
		continue;
	}
	writeFileSync(join(DIAG_DIR, `${job.spec.slug}.svg`), svg.trimStart(), 'utf8');
}
console.log(`[svg] ${jobs.length} file ditulis ke static/diagrams/`);

/* --------------------------------------------------------- patch modul */
function patchBlock(block: string, job: Job): string {
	const url = `/diagrams/${job.spec.slug}.svg`;
	let out = block;

	/* 1. image_url */
	const imgRe = /^(\t+)image_url:[^\n]*\n/m;
	if (imgRe.test(out)) {
		out = out.replace(imgRe, (_m, tabs: string) => `${tabs}image_url: '${url}',\n`);
	} else {
		const anchor = /^(\t+)(?:diagram:|key_points:)/m.exec(out);
		if (!anchor) {
			errors.push(`${job.spec.slug}: anchor image_url tidak ditemukan`);
			return out;
		}
		out = out.slice(0, anchor.index) + `${anchor[1]}image_url: '${url}',\n` + out.slice(anchor.index);
	}

	/* 2. diagram_caption */
	const capRe = /^(\t+)diagram_caption:(?:\s*'|\s*\n\t+')[^'\n]*',?/m;
	const tabs = '\t\t';
	const inline = `${tabs}diagram_caption: '${job.caption}',`;
	const blockStyle = `${tabs}diagram_caption:\n${tabs}\t'${job.caption}',`;
	const replacement = inline.length <= 110 ? inline : blockStyle;
	if (capRe.test(out)) {
		out = out.replace(capRe, () => replacement);
	} else {
		const anchor = /^(\t+)key_points:/m.exec(out);
		if (!anchor) {
			errors.push(`${job.spec.slug}: anchor diagram_caption tidak ditemukan`);
			return out;
		}
		out = out.slice(0, anchor.index) + replacement + '\n' + out.slice(anchor.index);
	}

	return out;
}

const byScope = new Map<string, Job[]>();
for (const job of jobs) {
	const list = byScope.get(job.spec.scope) ?? [];
	list.push(job);
	byScope.set(job.spec.scope, list);
}

for (const [scope, list] of byScope) {
	const file = join(MODULE_DIR, `${scope}.ts`);
	const text = readFileSync(file, 'utf8');

	/* potong per blok modul: dari `id: <n>,` sampai `id:` berikutnya */
	const starts: number[] = [];
	const re = /\n\t\tid: \d+,/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(text))) starts.push(m.index);
	if (starts.length !== 7) {
		errors.push(`${scope}.ts: harus 7 blok modul, dapat ${starts.length}`);
		continue;
	}
	starts.push(text.length);

	const pieces: string[] = [text.slice(0, starts[0])];
	let patched = 0;
	for (let i = 0; i < starts.length - 1; i++) {
		const block = text.slice(starts[i], starts[i + 1]);
		const idMatch = /\n\t\tid: (\d+),/.exec(block);
		const id = idMatch ? Number(idMatch[1]) : -1;
		const job = list.find((j) => j.module.id === id);
		if (job) {
			pieces.push(patchBlock(block, job));
			patched++;
		} else {
			pieces.push(block);
		}
	}
	const out = pieces.join('');

	writeFileSync(file, out, 'utf8');
	console.log(`[patch] ${scope}.ts — ${patched}/7 modul diperbarui`);

	/* cek hasil */
	const final = readFileSync(file, 'utf8');
	const imgCount = (final.match(/^\t\timage_url: '\/diagrams\//gm) ?? []).length;
	const capCount = (final.match(/^\t\tdiagram_caption:/gm) ?? []).length;
	if (imgCount !== 7) errors.push(`${scope}.ts: image_url /diagrams/ = ${imgCount}, harus 7`);
	if (capCount !== 7) errors.push(`${scope}.ts: diagram_caption = ${capCount}, harus 7`);
}

/* -------------------------------------------------------------- laporan */
notes.forEach((n) => console.log(`[catat] ${n}`));

if (errors.length) {
	console.error(`\n${errors.length} masalah:`);
	errors.forEach((e) => console.error(` - ${e}`));
	process.exit(1);
}

console.log('\nVisual audit selesai: 49 SVG + patch image_url/diagram_caption.');
console.log('Lanjut: npm run validate:data && npm run check && bun run db:seed (di api/)');
