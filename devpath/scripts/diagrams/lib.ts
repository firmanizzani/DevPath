/**
 * Pustaka renderer SVG untuk diagram materi DevPath.
 * Setiap diagram di-ekstern ke `static/diagrams/*.svg` lalu dirujuk lewat `image_url`.
 * Palet gelap netral supaya tetap terbaca di tema terang maupun gelap.
 */

export const C = {
	bg: '#0e1118',
	panel: '#161b26',
	panel2: '#1d2431',
	line: '#2b3444',
	ink: '#e8ecf3',
	muted: '#94a1b5',
	cyan: '#38bdf8',
	emerald: '#34d399',
	amber: '#fbbf24',
	rose: '#fb7185',
	violet: '#a78bfa'
};

const SANS = "'Segoe UI', Geist, Arial, sans-serif";
const MONO = "ui-monospace, 'JetBrains Mono', Consolas, monospace";

export const esc = (s: string) =>
	String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

type TextOpts = {
	size?: number;
	color?: string;
	weight?: number;
	anchor?: 'start' | 'middle' | 'end';
	mono?: boolean;
	italic?: boolean;
	opacity?: number;
};

export const T = (x: number, y: number, s: string, o: TextOpts = {}) => {
	const { size = 13, color = C.ink, weight = 400, anchor = 'start', mono = false, italic = false, opacity = 1 } = o;
	return `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}" text-anchor="${anchor}" font-family="${mono ? MONO : SANS}" font-style="${italic ? 'italic' : 'normal'}" opacity="${opacity}">${esc(s)}</text>`;
};

export const R = (
	x: number,
	y: number,
	w: number,
	h: number,
	o: { fill?: string; stroke?: string; rx?: number; sw?: number; dash?: string; opacity?: number } = {}
) => {
	const { fill = C.panel, stroke = C.line, rx = 10, sw = 1, dash, opacity = 1 } = o;
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${opacity !== 1 ? ` opacity="${opacity}"` : ''}/>`;
};

export const L = (
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	o: { stroke?: string; w?: number; dash?: string; marker?: boolean; opacity?: number } = {}
) => {
	const { stroke = C.line, w = 2, dash, marker = false, opacity = 1 } = o;
	return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ' marker-end="url(#ar)"' : ''} opacity="${opacity}"/>`;
};

export const PATH = (
	d: string,
	o: { stroke?: string; w?: number; fill?: string; dash?: string; marker?: boolean } = {}
) => {
	const { stroke = C.line, w = 2, fill = 'none', dash, marker = false } = o;
	return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ' marker-end="url(#ar)"' : ''}/>`;
};

const DEFS = `<defs><marker id="ar" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>`;

/** Potong teks menjadi baris-baris agar muat dalam lebar piksel tertentu. */
export function wrap(s: string, maxChars: number, maxLines = 3): string[] {
	const words = String(s).split(/\s+/);
	const lines: string[] = [];
	let cur = '';
	for (const w of words) {
		if (!cur) cur = w;
		else if ((cur + ' ' + w).length <= maxChars) cur += ' ' + w;
		else {
			lines.push(cur);
			cur = w;
			if (lines.length === maxLines - 1) break;
		}
	}
	if (cur && lines.length < maxLines) lines.push(cur);
	if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
		const last = lines[maxLines - 1];
		lines[maxLines - 1] = last.slice(0, Math.max(3, maxChars - 1)) + '…';
	}
	return lines;
}

export const multi = (x: number, y: number, lines: string[], lh: number, o: TextOpts = {}) =>
	lines.map((ln, i) => T(x, y + i * lh, ln, o)).join('');

const tone = (t?: string) =>
	t === 'ok' ? C.emerald : t === 'warn' ? C.amber : t === 'err' ? C.rose : t === 'violet' ? C.violet : C.cyan;

/** Bungkus isi diagram: latar, judul, kicker, dan catatan kaki. */
export function frame(opts: {
	kicker: string;
	title: string;
	sub?: string;
	note?: string;
	body: string;
}): string {
	const head: string[] = [];
	head.push(T(40, 34, opts.kicker.toUpperCase(), { size: 11.5, color: C.cyan, mono: true, weight: 600 }));
	head.push(T(40, 64, opts.title, { size: 22, weight: 700 }));
	if (opts.sub) head.push(T(40, 88, opts.sub, { size: 13, color: C.muted }));
	if (opts.note) head.push(T(480, 516, opts.note, { size: 12, color: C.muted, mono: true, anchor: 'middle' }));
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" role="img" aria-label="${esc(opts.title)}">
${DEFS}
<rect width="960" height="540" fill="${C.bg}"/>
<rect x="0" y="0" width="960" height="4" fill="${C.cyan}" opacity="0.55"/>
${head.join('\n')}
${opts.body}
</svg>`;
}

/* ------------------------------------------------------------------ flow */

export function renderFlow(p: {
	kicker: string;
	title: string;
	sub?: string;
	note?: string;
	steps: { label: string; sub?: string; tone?: string }[];
	cycle?: boolean;
}): string {
	const n = p.steps.length;
	const twoRows = n > 5;
	const boxes: string[] = [];
	const arrows: string[] = [];

	if (!twoRows) {
		const gap = 34;
		const w = Math.floor((880 - gap * (n - 1)) / n);
		const y = 190;
		p.steps.forEach((s, i) => {
			const x = 40 + i * (w + gap);
			const c = tone(s.tone);
			boxes.push(R(x, y, w, 132, { fill: C.panel, stroke: c, opacity: 1 }));
			boxes.push(R(x, y, w, 4, { fill: c, stroke: 'none', rx: 2 }));
			boxes.push(T(x + 14, y + 32, `0${i + 1}`, { size: 12, color: c, mono: true, weight: 700 }));
			boxes.push(multi(x + w / 2, y + 62, wrap(s.label, Math.max(10, Math.floor(w / 8)), 3), 18, {
				size: 13.5,
				weight: 600,
				anchor: 'middle'
			}));
			if (s.sub) boxes.push(T(x + w / 2, y + 118, s.sub, { size: 11, color: C.muted, mono: true, anchor: 'middle' }));
			if (i < n - 1) {
				const x1 = x + w + 6;
				const x2 = x + w + gap - 6;
				arrows.push(L(x1, y + 66, x2, y + 66, { stroke: C.muted, marker: true }));
			}
		});
		if (p.cycle) {
			const firstX = 40 + w / 2;
			const lastX = 40 + (n - 1) * (w + gap) + w / 2;
			arrows.push(PATH(`M${lastX} 330 L${lastX} 372 L${firstX} 372 L${firstX} 336`, { stroke: C.emerald, dash: '6 5', marker: true }));
			arrows.push(T(480, 392, 'siklus berulang — hasil pengujian kembali ke tahap pertama', {
				size: 12,
				color: C.emerald,
				mono: true,
				anchor: 'middle'
			}));
		}
	} else {
		const perRow = 4;
		const rows = Math.ceil(n / perRow);
		for (let r = 0; r < rows; r++) {
			const slice = p.steps.slice(r * perRow, r * perRow + perRow);
			const gap = 34;
			const w = Math.floor((880 - gap * (slice.length - 1)) / slice.length);
			const y = 150 + r * 170;
			slice.forEach((s, i) => {
				const idx = r * perRow + i;
				const x = 40 + i * (w + gap);
				const c = tone(s.tone);
				boxes.push(R(x, y, w, 118, { fill: C.panel, stroke: c }));
				boxes.push(R(x, y, w, 4, { fill: c, stroke: 'none', rx: 2 }));
				boxes.push(T(x + 14, y + 30, `0${idx + 1}`, { size: 12, color: c, mono: true, weight: 700 }));
				boxes.push(multi(x + w / 2, y + 58, wrap(s.label, Math.max(10, Math.floor(w / 8)), 3), 17, {
					size: 13,
					weight: 600,
					anchor: 'middle'
				}));
				if (s.sub) boxes.push(T(x + w / 2, y + 106, s.sub, { size: 10.5, color: C.muted, mono: true, anchor: 'middle' }));
				if (i < slice.length - 1) {
					arrows.push(L(x + w + 6, y + 59, x + w + gap - 6, y + 59, { stroke: C.muted, marker: true }));
				}
			});
			if (r < rows - 1) {
				const lastX = 40 + (slice.length - 1) * (w + gap) + w / 2;
				arrows.push(PATH(`M${lastX} ${y + 118} L${lastX} ${y + 150} L80 ${y + 150} L80 ${y + 186}`, { stroke: C.muted, dash: '6 5', marker: true }));
			}
		}
	}

	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: boxes.join('') + arrows.join('') });
}

/* ------------------------------------------------------- flowchart (cabang) */

export function renderFlowchart(p: {
	kicker: string;
	title: string;
	sub?: string;
	note?: string;
	condition: string;
	yes: string;
	no: string;
	after: string;
	loop: string;
}): string {
	const b: string[] = [];
	// start
	b.push(R(40, 250, 118, 66, { fill: C.panel2, rx: 33 }));
	b.push(T(99, 289, 'Mulai', { size: 13.5, weight: 600, anchor: 'middle' }));
	b.push(L(158, 283, 198, 283, { stroke: C.muted, marker: true }));

	// diamond
	b.push(`<path d="M310 200 L430 283 L310 366 L190 283 Z" fill="${C.panel}" stroke="${C.cyan}" stroke-width="1.5"/>`);
	b.push(multi(310, 274, wrap(p.condition, 18, 3), 17, { size: 13, weight: 600, anchor: 'middle' }));

	// yes / no boxes
	b.push(R(500, 168, 214, 96, { fill: C.panel, stroke: C.emerald }));
	b.push(T(516, 196, 'YA · if (true)', { size: 11.5, color: C.emerald, mono: true, weight: 700 }));
	b.push(multi(607, 224, wrap(p.yes, 26, 2), 17, { size: 13, anchor: 'middle' }));
	b.push(L(430, 250, 500, 216, { stroke: C.emerald, marker: true }));

	b.push(R(500, 316, 214, 96, { fill: C.panel, stroke: C.amber }));
	b.push(T(516, 344, 'TIDAK · else', { size: 11.5, color: C.amber, mono: true, weight: 700 }));
	b.push(multi(607, 372, wrap(p.no, 26, 2), 17, { size: 13, anchor: 'middle' }));
	b.push(L(430, 316, 500, 352, { stroke: C.amber, marker: true }));

	// merge
	b.push(R(760, 250, 160, 66, { fill: C.panel2, stroke: C.violet }));
	b.push(multi(840, 278, wrap(p.after, 22, 2), 17, { size: 12.5, anchor: 'middle' }));
	b.push(L(714, 216, 760, 268, { stroke: C.emerald, marker: true }));
	b.push(L(714, 364, 760, 300, { stroke: C.amber, marker: true }));

	// loop back
	b.push(PATH('M840 316 L840 442 L310 442 L310 372', { stroke: C.cyan, dash: '7 5', marker: true }));
	b.push(T(575, 432, p.loop, { size: 12, color: C.cyan, mono: true, anchor: 'middle' }));

	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: b.join('') });
}

/* ------------------------------------------------------------------ ladder */

export function renderLadder(p: {
	kicker: string;
	title: string;
	sub?: string;
	note?: string;
	items: { label: string; sub?: string; tone?: string }[];
	groups?: { label: string; sub?: string; from: number; to: number; tone?: string }[];
	footnote?: string;
}): string {
	const b: string[] = [];
	const n = p.items.length;
	const top = 112;
	const available = p.footnote ? 340 : 380;
	const h = Math.min(46, Math.floor(available / n) - 6);
	const gap = 6;
	const leftW = p.groups ? 540 : 880;

	p.items.forEach((it, i) => {
		const y = top + i * (h + gap);
		const c = tone(it.tone);
		b.push(R(40, y, leftW, h, { fill: C.panel, stroke: C.line, rx: 7 }));
		b.push(R(40, y, 5, h, { fill: c, stroke: 'none', rx: 2.5 }));
		b.push(T(60, y + h / 2 + 5, it.label, { size: 13.5, weight: 600 }));
		if (it.sub) b.push(T(40 + leftW - 16, y + h / 2 + 4, it.sub, { size: 11.5, color: C.muted, mono: true, anchor: 'end' }));
	});

	(p.groups ?? []).forEach((g) => {
		const y1 = top + g.from * (h + gap);
		const y2 = top + g.to * (h + gap) + h;
		const c = tone(g.tone);
		b.push(R(614, y1, 306, y2 - y1, { fill: 'none', stroke: c, dash: '5 4', rx: 10 }));
		b.push(T(767, y1 + 28, g.label, { size: 13, color: c, weight: 700, anchor: 'middle' }));
		if (g.sub) b.push(multi(767, y1 + 50, wrap(g.sub, 34, 3), 17, { size: 11.5, color: C.muted, mono: true, anchor: 'middle' }));
	});

	if (p.footnote) b.push(T(480, 480, p.footnote, { size: 12.5, color: C.muted, anchor: 'middle' }));

	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: b.join('') });
}

/* ------------------------------------------------------------------ matrix */

const toneFill: Record<string, string> = {
	ok: 'rgba(52,211,153,0.14)',
	warn: 'rgba(251,191,36,0.14)',
	err: 'rgba(251,113,133,0.14)',
	cyan: 'rgba(56,189,248,0.14)',
	violet: 'rgba(167,139,250,0.14)',
	muted: 'rgba(148,161,181,0.10)'
};

export function renderMatrix(p: {
	kicker: string;
	title: string;
	sub?: string;
	note?: string;
	cols: string[];
	rows: { label: string; sub?: string; cells: { text: string; tone?: string }[] }[];
	footnote?: string;
}): string {
	const b: string[] = [];
	const x0 = 40;
	const labelW = 300;
	const colW = Math.floor((920 - x0 - labelW) / p.cols.length);
	const top = 118;
	const rowH = Math.min(74, Math.floor(330 / p.rows.length) - 6);

	b.push(R(x0, top, labelW, 40, { fill: C.panel2, rx: 8 }));
	b.push(T(x0 + 16, top + 26, p.rows[0]?.sub ?? 'Kriteria', { size: 12, color: C.muted, mono: true }));
	p.cols.forEach((c, i) => {
		const x = x0 + labelW + i * colW;
		b.push(R(x + 3, top, colW - 6, 40, { fill: C.panel2, rx: 8 }));
		b.push(multi(x + colW / 2, top + 25, wrap(c, Math.max(8, Math.floor(colW / 7)), 1), 14, {
			size: 12.5,
			weight: 700,
			anchor: 'middle',
			color: C.cyan
		}));
	});

	p.rows.forEach((r, ri) => {
		const y = top + 48 + ri * (rowH + 6);
		b.push(R(x0, y, labelW, rowH, { fill: C.panel, rx: 8 }));
		b.push(multi(x0 + 16, y + (rowH > 40 ? 26 : 24), wrap(r.label, 34, 2), 17, { size: 13, weight: 600 }));
		r.cells.forEach((cell, ci) => {
			const x = x0 + labelW + ci * colW;
			const fill = cell.tone ? toneFill[cell.tone] : C.panel;
			b.push(R(x + 3, y, colW - 6, rowH, { fill, stroke: cell.tone ? tone(cell.tone) : C.line, rx: 8, opacity: 1 }));
			b.push(multi(x + colW / 2, y + (rowH > 40 ? 26 : 24), wrap(cell.text, Math.max(9, Math.floor(colW / 7.2)), 3), 15, {
				size: 11.5,
				anchor: 'middle',
				color: cell.tone ? tone(cell.tone) : C.ink
			}));
		});
	});

	if (p.footnote) b.push(T(480, 476, p.footnote, { size: 12.5, color: C.muted, anchor: 'middle' }));
	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: b.join('') });
}

/* -------------------------------------------------------------------- arch */

export function renderArch(p: {
	kicker: string;
	title: string;
	sub?: string;
	note?: string;
	columns: { title?: string; nodes: { label: string; sub?: string; tone?: string }[] }[];
	edges: { from: [number, number]; to: [number, number]; label?: string; tone?: string }[];
	footnote?: string;
}): string {
	const b: string[] = [];
	const ncols = p.columns.length;
	const colW = 880 / ncols;
	const boxW = Math.min(230, colW - 56);
	const positions: { x: number; y: number; w: number; h: number }[][] = [];

	p.columns.forEach((col, ci) => {
		const cx = 40 + ci * colW + colW / 2;
		const nodeH = 74;
		const gapY = 54;
		const total = col.nodes.length * nodeH + (col.nodes.length - 1) * gapY;
		const startY = 250 - total / 2 + 34;
		const colPos: { x: number; y: number; w: number; h: number }[] = [];
		col.nodes.forEach((node, ni) => {
			const y = startY + ni * (nodeH + gapY);
			const x = cx - boxW / 2;
			const c = tone(node.tone);
			colPos.push({ x, y, w: boxW, h: nodeH });
			b.push(R(x, y, boxW, nodeH, { fill: C.panel, stroke: c }));
			b.push(R(x, y, 5, nodeH, { fill: c, stroke: 'none', rx: 2.5 }));
			b.push(multi(x + boxW / 2 + 3, y + (node.sub ? 34 : 44), wrap(node.label, Math.floor(boxW / 7.6), 2), 17, {
				size: 13,
				weight: 600,
				anchor: 'middle'
			}));
			if (node.sub) b.push(T(x + boxW / 2 + 3, y + 58, node.sub, { size: 11, color: C.muted, mono: true, anchor: 'middle' }));
		});
		if (col.title) {
			b.push(T(cx, startY - 30, col.title, { size: 11.5, color: C.muted, mono: true, anchor: 'middle' }));
		}
		positions.push(colPos);
	});

	p.edges.forEach((e) => {
		const a = positions[e.from[0]]?.[e.from[1]];
		const t = positions[e.to[0]]?.[e.to[1]];
		if (!a || !t) return;
		const c = tone(e.tone);
		const sameCol = e.from[0] === e.to[0];
		if (sameCol) {
			const x = a.x + a.w / 2;
			b.push(PATH(`M${x} ${a.y + a.h} L${x} ${t.y}`, { stroke: c, marker: true }));
		} else if (t.x > a.x) {
			const y1 = a.y + a.h / 2;
			const y2 = t.y + t.h / 2;
			const midX = (a.x + a.w + t.x) / 2;
			if (Math.abs(y1 - y2) < 3) {
				b.push(L(a.x + a.w + 4, y1, t.x - 6, y2, { stroke: c, marker: true }));
			} else {
				b.push(PATH(`M${a.x + a.w + 4} ${y1} L${midX} ${y1} L${midX} ${y2} L${t.x - 6} ${y2}`, { stroke: c, marker: true }));
			}
		} else {
			const y1 = a.y + a.h / 2;
			const y2 = t.y + t.h / 2;
			const midX = (t.x + t.w + a.x) / 2;
			b.push(PATH(`M${a.x - 4} ${y1} L${midX} ${y1} L${midX} ${y2} L${t.x + t.w + 6} ${y2}`, { stroke: c, marker: true }));
		}
		if (e.label) {
			const mx = (a.x + a.w + t.x) / 2;
			b.push(T(mx, Math.min(a.y + a.h / 2, t.y + t.h / 2) - 10, e.label, {
				size: 11,
				color: c,
				mono: true,
				anchor: 'middle'
			}));
		}
	});

	if (p.footnote) b.push(T(480, 476, p.footnote, { size: 12.5, color: C.muted, anchor: 'middle' }));
	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: b.join('') });
}

/* ------------------------------------------------------------------ erd/class */

export function renderErd(p: {
	kicker: string;
	title: string;
	sub?: string;
	note?: string;
	tables: { name: string; cols: string[]; tone?: string }[];
	relations?: { from: number; to: number; label?: string; tone?: string }[];
	footnote?: string;
}): string {
	const b: string[] = [];
	const n = p.tables.length;
	const gap = 34;
	const w = Math.floor((880 - gap * (n - 1)) / n);
	const top = 130;

	p.tables.forEach((t, i) => {
		const x = 40 + i * (w + gap);
		const c = tone(t.tone);
		const headH = 40;
		const rowH = 26;
		const h = headH + t.cols.length * rowH + 8;
		b.push(R(x, top, w, h, { fill: C.panel, stroke: c, rx: 8 }));
		b.push(R(x, top, w, headH, { fill: c, stroke: 'none', rx: 8, opacity: 0.18 }));
		b.push(T(x + 16, top + 26, t.name, { size: 14, weight: 700, color: c, mono: true }));
		t.cols.forEach((col, ci) => {
			const y = top + headH + 8 + ci * rowH;
			if (ci) b.push(L(x + 10, y - 4, x + w - 10, y - 4, { stroke: C.line, w: 1, opacity: 0.7 }));
			const isKey = /^(PK|FK)/.test(col);
			b.push(T(x + 16, y + 16, col, { size: 12, color: isKey ? C.ink : C.muted, mono: true, weight: isKey ? 600 : 400 }));
		});
	});

	(p.relations ?? []).forEach((r) => {
		const a = p.tables[r.from];
		const t = p.tables[r.to];
		if (!a || !t) return;
		const c = tone(r.tone);
		const x1 = 40 + r.from * (w + gap) + w;
		const x2 = 40 + r.to * (w + gap);
		const y = top + 40 + Math.min(a.cols.length, t.cols.length) * 10;
		b.push(L(x1 + 4, y, x2 - 8, y, { stroke: c, marker: true }));
		if (r.label) b.push(T((x1 + x2) / 2, y - 10, r.label, { size: 11.5, color: c, mono: true, anchor: 'middle', weight: 700 }));
	});

	if (p.footnote) b.push(T(480, 476, p.footnote, { size: 12.5, color: C.muted, anchor: 'middle' }));
	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: b.join('') });
}

/* ------------------------------------------------------------------ states */

export function renderStates(p: {
	kicker: string;
	title: string;
	sub?: string;
	note?: string;
	items: { label: string; caption: string; tone?: string }[];
	footnote?: string;
}): string {
	const b: string[] = [];
	const n = p.items.length;
	const gap = 26;
	const w = Math.floor((880 - gap * (n - 1)) / n);
	const top = 150;

	p.items.forEach((it, i) => {
		const x = 40 + i * (w + gap);
		const c = tone(it.tone);
		b.push(R(x, top, w, 148, { fill: C.panel, stroke: c }));
		// tiruan elemen UI
		const bw = w - 48;
		b.push(R(x + 24, top + 46, bw, 46, { fill: i === 1 ? c : C.panel2, stroke: c, rx: 8, opacity: i === 1 ? 0.9 : 1 }));
		b.push(T(x + 24 + bw / 2, top + 75, it.label, { size: 13, weight: 700, anchor: 'middle', color: i === 1 ? C.bg : c }));
		b.push(T(x + w / 2, top + 126, it.caption, { size: 11.5, color: C.muted, mono: true, anchor: 'middle' }));
		b.push(T(x + 16, top + 26, `STATE ${i + 1}`, { size: 10.5, color: c, mono: true, weight: 700 }));
	});

	if (p.footnote) b.push(T(480, 360, p.footnote, { size: 12.5, color: C.muted, anchor: 'middle' }));
	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: b.join('') });
}

/* -------------------------------------------------------------------- tree */

export function renderTree(p: {
	kicker: string;
	title: string;
	sub?: string;
	note?: string;
	root: string;
	rootSub?: string;
	children: { label: string; sub?: string; chips?: string[]; tone?: string }[];
	footnote?: string;
}): string {
	const b: string[] = [];
	const n = p.children.length;
	const gap = 24;
	const w = Math.floor((880 - gap * (n - 1)) / n);
	const rootW = 300;
	const rootX = 480 - rootW / 2;

	b.push(R(rootX, 124, rootW, 66, { fill: C.panel2, stroke: C.cyan }));
	b.push(T(480, 152, p.root, { size: 14.5, weight: 700, anchor: 'middle' }));
	if (p.rootSub) b.push(T(480, 174, p.rootSub, { size: 11.5, color: C.muted, mono: true, anchor: 'middle' }));

	p.children.forEach((c, i) => {
		const x = 40 + i * (w + gap);
		const y = 268;
		const col = tone(c.tone);
		const cx = x + w / 2;
		b.push(PATH(`M480 190 L480 228 L${cx} 228 L${cx} ${y - 6}`, { stroke: C.line, marker: true }));
		b.push(R(x, y, w, 84, { fill: C.panel, stroke: col }));
		b.push(R(x, y, w, 4, { fill: col, stroke: 'none', rx: 2 }));
		b.push(multi(cx, y + 34, wrap(c.label, Math.max(10, Math.floor(w / 7.6)), 2), 17, {
			size: 13,
			weight: 600,
			anchor: 'middle'
		}));
		if (c.sub) b.push(T(cx, y + 72, c.sub, { size: 11, color: C.muted, mono: true, anchor: 'middle' }));
		(c.chips ?? []).forEach((chip, ci) => {
			const cy = y + 96 + ci * 30;
			b.push(R(x + 8, cy, w - 16, 24, { fill: C.panel2, stroke: C.line, rx: 6 }));
			b.push(T(cx, cy + 16, chip, { size: 11, color: C.muted, mono: true, anchor: 'middle' }));
		});
	});

	if (p.footnote) b.push(T(480, 476, p.footnote, { size: 12.5, color: C.muted, anchor: 'middle' }));
	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: b.join('') });
}

/* ------------------------------------------------------------------- cards */

export function renderCards(p: {
	kicker: string;
	title: string;
	sub?: string;
	note?: string;
	items: { label: string; value: string; sub?: string; tone?: string }[];
	cols?: number;
	footnote?: string;
}): string {
	const b: string[] = [];
	const cols = p.cols ?? 3;
	const rows = Math.ceil(p.items.length / cols);
	const gapX = 22;
	const gapY = 20;
	const w = Math.floor((880 - gapX * (cols - 1)) / cols);
	const h = Math.min(120, Math.floor((rows > 2 ? 340 : 360) / rows) - gapY);

	p.items.forEach((it, i) => {
		const r = Math.floor(i / cols);
		const c = i % cols;
		const x = 40 + c * (w + gapX);
		const y = 126 + r * (h + gapY);
		const col = tone(it.tone);
		b.push(R(x, y, w, h, { fill: C.panel, stroke: col }));
		b.push(T(x + 18, y + 30, it.label.toUpperCase(), { size: 10.5, color: col, mono: true, weight: 700 }));
		b.push(multi(x + 18, y + 60, wrap(it.value, Math.floor(w / 8.6), 2), 22, { size: 17, weight: 600 }));
		if (it.sub) b.push(T(x + 18, y + h - 18, it.sub, { size: 11.5, color: C.muted, mono: true }));
	});

	if (p.footnote) b.push(T(480, 492, p.footnote, { size: 12.5, color: C.muted, anchor: 'middle' }));
	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: b.join('') });
}

/* --------------------------------------------------------------- structure */

type Panel =
	| { title: string; type: 'slots'; items: string[]; caption?: string }
	| { title: string; type: 'rows'; rows: [string, string][]; caption?: string }
	| { title: string; type: 'grid'; cols: string[]; rows: string[][]; caption?: string };

export function renderStructure(p: {
	kicker: string;
	title: string;
	sub?: string;
	note?: string;
	panels: Panel[];
	footnote?: string;
}): string {
	const b: string[] = [];
	const n = p.panels.length;
	const gap = 28;
	const w = Math.floor((880 - gap * (n - 1)) / n);
	const top = 132;
	const h = 300;

	p.panels.forEach((panel, i) => {
		const x = 40 + i * (w + gap);
		b.push(R(x, top, w, h, { fill: C.panel, stroke: C.line, rx: 10 }));
		b.push(T(x + 16, top + 28, panel.title, { size: 13, weight: 700, color: C.cyan }));

		if (panel.type === 'slots') {
			const count = panel.items.length;
			const sw = Math.floor((w - 32 - (count - 1) * 6) / count);
			panel.items.forEach((val, si) => {
				const sx = x + 16 + si * (sw + 6);
				b.push(R(sx, top + 96, sw, 56, { fill: C.panel2, stroke: C.violet, rx: 6 }));
				b.push(T(sx + sw / 2, top + 90, `[${si}]`, { size: 11, color: C.muted, mono: true, anchor: 'middle' }));
				b.push(T(sx + sw / 2, top + 130, val, { size: 12.5, mono: true, anchor: 'middle' }));
			});
			b.push(T(x + 16, top + 186, 'indeks berurutan · akses O(1)', { size: 11.5, color: C.muted, mono: true }));
		} else if (panel.type === 'rows') {
			panel.rows.forEach(([k, v], ri) => {
				const y = top + 52 + ri * 34;
				b.push(R(x + 16, y, w - 32, 28, { fill: C.panel2, stroke: C.line, rx: 6 }));
				b.push(T(x + 28, y + 19, k, { size: 12, mono: true, color: C.cyan }));
				b.push(T(x + w - 28, y + 19, v, { size: 12, mono: true, anchor: 'end' }));
			});
		} else {
			const colW = Math.floor((w - 32) / (panel.cols.length + 1));
			panel.cols.forEach((c, ci) => {
				const cx = x + 16 + ci * colW;
				b.push(R(cx, top + 52, colW - 3, 30, { fill: C.panel2, stroke: C.line, rx: 5 }));
				b.push(T(cx + colW / 2, top + 72, c, { size: 11.5, mono: true, anchor: 'middle', color: C.cyan }));
			});
			panel.rows.forEach((row, ri) => {
				row.forEach((cell, ci) => {
					const cx = x + 16 + ci * colW;
					const y = top + 88 + ri * 30;
					b.push(R(cx, y, colW - 3, 28, { fill: ci === 0 ? 'rgba(167,139,250,0.14)' : C.panel, stroke: C.line, rx: 5 }));
					b.push(T(cx + colW / 2, y + 19, cell, { size: 11.5, mono: true, anchor: 'middle', color: ci === 0 ? C.violet : C.ink }));
				});
			});
		}

		if (panel.caption) b.push(T(x + 16, top + h - 18, panel.caption, { size: 11.5, color: C.muted }));
	});

	if (p.footnote) b.push(T(480, 476, p.footnote, { size: 12.5, color: C.muted, anchor: 'middle' }));
	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: b.join('') });
}

/* ------------------------------------------------------------------- chart */

function axes(b: string[], x0: number, y0: number, w: number, h: number, xLabel: string, yLabel: string) {
	b.push(L(x0, y0, x0, y0 + h, { stroke: C.line }));
	b.push(L(x0, y0 + h, x0 + w, y0 + h, { stroke: C.line }));
	b.push(T(x0 + w / 2, y0 + h + 34, xLabel, { size: 11.5, color: C.muted, mono: true, anchor: 'middle' }));
	b.push(`<text x="${x0 - 42}" y="${y0 + h / 2}" font-size="11.5" fill="${C.muted}" font-family="${MONO}" transform="rotate(-90 ${x0 - 42} ${y0 + h / 2})" text-anchor="middle">${esc(yLabel)}</text>`);
}

export function renderChart(
	p: {
		kicker: string;
		title: string;
		sub?: string;
		note?: string;
		footnote?: string;
	} & (
		| { chart: 'curves'; series: { label: string; color: string; fn: (t: number) => number }[] }
		| { chart: 'trio'; panels: { label: string; kind: 'hist' | 'box' | 'scatter' }[] }
		| { chart: 'gauges'; metrics: { label: string; value: string; pct: number; tone: string; target: string }[] }
		| { chart: 'bell'; label: string }
	)
): string {
	const b: string[] = [];

	if (p.chart === 'curves') {
		const x0 = 90;
		const y0 = 126;
		const w = 780;
		const h = 300;
		axes(b, x0, y0, w, h, 'ukuran input (n)', 'waktu eksekusi');
		p.series.forEach((s) => {
			let d = '';
			for (let i = 0; i <= 60; i++) {
				const t = i / 60;
				const x = x0 + t * w;
				const y = y0 + h - Math.min(1, s.fn(t)) * h;
				d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
			}
			b.push(PATH(d, { stroke: s.color, w: 2.6 }));
			const ly = y0 + 22 + p.series.indexOf(s) * 24;
			b.push(L(x0 + w - 190, ly - 5, x0 + w - 160, ly - 5, { stroke: s.color, w: 3 }));
			b.push(T(x0 + w - 150, ly, s.label, { size: 12, mono: true, color: s.color }));
		});
		b.push(T(x0 + 16, y0 + 20, 'makin landai = makin baik', { size: 11.5, color: C.muted, mono: true }));
	}

	if (p.chart === 'trio') {
		const gap = 26;
		const w = Math.floor((880 - gap * 2) / 3);
		p.panels.forEach((panel, i) => {
			const x = 40 + i * (w + gap);
			const y = 140;
			b.push(R(x, y, w, 270, { fill: C.panel, stroke: C.line, rx: 10 }));
			b.push(T(x + 16, y + 28, panel.label, { size: 13, weight: 700, color: C.cyan }));
			const px = x + 34;
			const py = y + 60;
			const pw = w - 68;
			const ph = 160;
			b.push(L(px, py, px, py + ph, { stroke: C.line }));
			b.push(L(px, py + ph, px + pw, py + ph, { stroke: C.line }));

			if (panel.kind === 'hist') {
				const vals = [0.25, 0.45, 0.72, 0.95, 0.8, 0.55, 0.34, 0.2, 0.12, 0.07];
				const bw = pw / vals.length;
				vals.forEach((v, bi) => {
					const bh = v * ph;
					b.push(R(px + bi * bw + 2, py + ph - bh, bw - 4, bh, { fill: C.cyan, stroke: 'none', rx: 3, opacity: 0.75 }));
				});
			} else if (panel.kind === 'box') {
				const cy = py + ph / 2;
				b.push(L(px + 20, cy, px + pw - 20, cy, { stroke: C.muted }));
				b.push(R(px + pw * 0.28, cy - 34, pw * 0.44, 68, { fill: 'rgba(52,211,153,0.16)', stroke: C.emerald, rx: 5 }));
				b.push(L(px + pw * 0.5, cy - 34, px + pw * 0.5, cy + 34, { stroke: C.emerald, w: 3 }));
				b.push(L(px + pw * 0.28, cy - 20, px + pw * 0.72, cy - 20, { stroke: C.emerald, w: 1.5 }));
				b.push(L(px + pw * 0.28, cy + 20, px + pw * 0.72, cy + 20, { stroke: C.emerald, w: 1.5 }));
				[0.12, 0.16, 0.9].forEach((o) =>
					b.push(`<circle cx="${px + o * pw}" cy="${cy}" r="4.5" fill="${C.rose}"/>`)
				);
				b.push(T(px + pw / 2, py + ph + 26, 'kuartil · outlier', { size: 11, color: C.muted, mono: true, anchor: 'middle' }));
			} else {
				const pts = Array.from({ length: 26 }, (_, i) => {
					const t = i / 25;
					return [px + t * pw, py + ph - (t * 0.72 + 0.12 + Math.sin(i * 1.7) * 0.08) * ph];
				});
				pts.forEach(([x1, y1]) => b.push(`<circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="4" fill="${C.amber}" opacity="0.85"/>`));
				b.push(PATH(`M${px} ${py + ph * 0.86} L${px + pw} ${py + ph * 0.14}`, { stroke: C.cyan, dash: '6 5' }));
			}
		});
	}

	if (p.chart === 'gauges') {
		p.metrics.forEach((m, i) => {
			const y = 146 + i * 106;
			const col = tone(m.tone);
			b.push(R(40, y, 880, 88, { fill: C.panel, stroke: col }));
			b.push(T(64, y + 32, m.label, { size: 14, weight: 700 }));
			b.push(T(64, y + 60, `target ${m.target}`, { size: 11.5, color: C.muted, mono: true }));
			const barX = 320;
			const barW = 460;
			b.push(R(barX, y + 34, barW, 20, { fill: C.panel2, stroke: C.line, rx: 10 }));
			b.push(R(barX, y + 34, Math.max(12, barW * Math.min(1, m.pct)), 20, { fill: col, stroke: 'none', rx: 10, opacity: 0.85 }));
			b.push(T(barX + barW + 24, y + 50, m.value, { size: 15, weight: 700, mono: true, color: col }));
		});
	}

	if (p.chart === 'bell') {
		const x0 = 90;
		const y0 = 130;
		const w = 780;
		const h = 290;
		axes(b, x0, y0, w, h, 'nilai data', 'kepadatan');
		const cx = x0 + w / 2;
		const pts: string[] = [];
		for (let i = 0; i <= 120; i++) {
			const t = (i / 120) * 2 - 1;
			const y = Math.exp(-0.5 * Math.pow(t * 2.1, 2));
			pts.push(`${(x0 + (i / 120) * w).toFixed(1)} ${(y0 + h - y * h * 0.92).toFixed(1)}`);
		}
		const curve = 'M' + pts.join(' L');
		b.push(PATH(`${curve} L${x0 + w} ${y0 + h} L${x0 + w * 0.78} ${y0 + h} Z`, { fill: 'rgba(251,113,133,0.20)', stroke: 'none' }));
		b.push(PATH(curve, { stroke: C.cyan, w: 2.6 }));
		b.push(L(cx, y0 + 10, cx, y0 + h, { stroke: C.muted, dash: '5 4' }));
		b.push(T(cx, y0 + 4, 'μ (rata-rata populasi)', { size: 11.5, color: C.muted, mono: true, anchor: 'middle' }));
		const tailX = x0 + w * 0.86;
		b.push(L(tailX, y0 + 60, tailX, y0 + h, { stroke: C.rose, dash: '4 4' }));
		b.push(T(tailX + 8, y0 + 74, 'area p-value', { size: 11.5, color: C.rose, mono: true }));
		b.push(T(x0 + 24, y0 + 34, p.label, { size: 12, color: C.muted, mono: true }));
	}

	if (p.footnote) b.push(T(480, 476, p.footnote, { size: 12.5, color: C.muted, anchor: 'middle' }));
	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: b.join('') });
}

/* ------------------------------------------------------------------ mockup */

type Block = { x: number; y: number; w: number; h: number; label?: string; tone?: string; text?: boolean };

function browserFrame(x: number, y: number, w: number, h: number, title: string, blocks: Block[], toneName?: string) {
	const c = tone(toneName);
	const b: string[] = [];
	b.push(R(x, y, w, h, { fill: C.panel, stroke: c, rx: 10 }));
	b.push(R(x, y, w, 34, { fill: C.panel2, stroke: 'none', rx: 10 }));
	b.push(`<rect x="${x}" y="${y + 20}" width="${w}" height="14" fill="${C.panel2}"/>`);
	[0, 1, 2].forEach((i) =>
		b.push(`<circle cx="${x + 18 + i * 16}" cy="${y + 17}" r="4.5" fill="${[C.rose, C.amber, C.emerald][i]}" opacity="0.85"/>`)
	);
	b.push(T(x + 74, y + 22, title, { size: 11.5, color: C.muted, mono: true }));
	blocks.forEach((blk) => {
		const col = tone(blk.tone);
		b.push(
			R(x + blk.x, y + blk.y, blk.w, blk.h, {
				fill: blk.text ? 'rgba(148,161,181,0.16)' : 'rgba(56,189,248,0.10)',
				stroke: col,
				rx: 6
			})
		);
		if (blk.label) b.push(T(x + blk.x + blk.w / 2, y + blk.y + blk.h / 2 + 4, blk.label, { size: 11.5, color: col, anchor: 'middle', mono: true }));
	});
	return b.join('');
}

export function renderMockup(
	p: {
		kicker: string;
		title: string;
		sub?: string;
		note?: string;
		footnote?: string;
	} & (
		| { variant: 'compare'; left: { title: string; blocks: Block[] }; right: { title: string; blocks: Block[] }; leftTone?: string; rightTone?: string }
		| { variant: 'gridtype' }
		| { variant: 'layout' }
		| { variant: 'devices' }
		| { variant: 'dashboard'; kpis: { label: string; value: string; delta: string }[]; chartLabel: string; rows: string[][] }
	)
): string {
	const b: string[] = [];

	if (p.variant === 'compare') {
		b.push(browserFrame(40, 138, 430, 300, p.left.title, p.left.blocks, p.leftTone ?? 'muted'));
		b.push(browserFrame(490, 138, 430, 300, p.right.title, p.right.blocks, p.rightTone ?? 'cyan'));
		b.push(T(255, 462, p.left.title, { size: 13, weight: 700, anchor: 'middle', color: tone(p.leftTone) }));
		b.push(T(705, 462, p.right.title, { size: 13, weight: 700, anchor: 'middle', color: tone(p.rightTone) }));
	}

	if (p.variant === 'gridtype') {
		// kiri: 8pt grid
		b.push(R(40, 138, 430, 300, { fill: C.panel, stroke: C.line }));
		b.push(T(60, 168, '8PT GRID', { size: 11.5, color: C.cyan, mono: true, weight: 700 }));
		for (let gx = 64; gx <= 446; gx += 8) b.push(L(gx, 186, gx, 424, { stroke: C.line, w: 1, opacity: 0.35 }));
		for (let gy = 190; gy <= 424; gy += 8) b.push(L(64, gy, 446, gy, { stroke: C.line, w: 1, opacity: 0.35 }));
		b.push(R(80, 206, 160, 56, { fill: 'rgba(56,189,248,0.16)', stroke: C.cyan }));
		b.push(T(160, 240, 'padding 16', { size: 11.5, mono: true, color: C.cyan, anchor: 'middle' }));
		b.push(R(256, 206, 160, 56, { fill: 'rgba(52,211,153,0.14)', stroke: C.emerald }));
		b.push(T(336, 240, 'gap 8 · 24', { size: 11.5, mono: true, color: C.emerald, anchor: 'middle' }));
		b.push(R(80, 286, 336, 112, { fill: 'rgba(167,139,250,0.10)', stroke: C.violet, dash: '6 4' }));
		b.push(T(248, 336, 'kelipatan 8 → rapi & konsisten', { size: 12.5, mono: true, color: C.violet, anchor: 'middle' }));

		// kanan: hierarki tipografi + kontras
		b.push(R(490, 138, 430, 300, { fill: C.panel, stroke: C.line }));
		b.push(T(510, 168, 'HIERARKI TIPOGRAFI', { size: 11.5, color: C.cyan, mono: true, weight: 700 }));
		b.push(T(510, 218, 'Judul 40/48', { size: 30, weight: 700 }));
		b.push(T(510, 262, 'Subjudul 24/32', { size: 20, weight: 600 }));
		b.push(T(510, 296, 'Body 16/24 — kenyamanan baca', { size: 14, color: C.muted }));
		b.push(T(510, 322, 'CAPTION 13/18', { size: 12, color: C.muted, mono: true }));
		b.push(R(510, 348, 176, 46, { fill: 'rgba(52,211,153,0.14)', stroke: C.emerald }));
		b.push(T(598, 377, 'kontras 7.2:1 ✓', { size: 12.5, mono: true, color: C.emerald, anchor: 'middle' }));
		b.push(R(706, 348, 176, 46, { fill: 'rgba(251,113,133,0.14)', stroke: C.rose }));
		b.push(T(794, 377, 'kontras 2.1:1 ✗', { size: 12.5, mono: true, color: C.rose, anchor: 'middle' }));
	}

	if (p.variant === 'layout') {
		// flexbox
		b.push(R(40, 138, 430, 300, { fill: C.panel, stroke: C.line }));
		b.push(T(60, 168, 'FLEXBOX · SATU SUMBU', { size: 11.5, color: C.cyan, mono: true, weight: 700 }));
		b.push(R(64, 196, 382, 176, { fill: 'rgba(56,189,248,0.06)', stroke: C.cyan, dash: '6 4' }));
		[0, 1, 2].forEach((i) =>
			b.push(R(84 + i * 118, 224, 100, 120, { fill: C.panel2, stroke: C.violet }))
		);
		[0, 1, 2].forEach((i) => b.push(T(134 + i * 118, 292, `item ${i + 1}`, { size: 12, mono: true, color: C.violet, anchor: 'middle' })));
		b.push(PATH('M84 396 L446 396', { stroke: C.emerald, marker: true }));
		b.push(T(265, 388, 'main axis (justify-content)', { size: 11.5, mono: true, color: C.emerald, anchor: 'middle' }));
		b.push(PATH('M462 224 L462 344', { stroke: C.amber, marker: true }));
		b.push(T(478, 292, 'cross', { size: 11, mono: true, color: C.amber }));

		// grid
		b.push(R(490, 138, 430, 300, { fill: C.panel, stroke: C.line }));
		b.push(T(510, 168, 'CSS GRID · DUA SUMBU', { size: 11.5, color: C.cyan, mono: true, weight: 700 }));
		for (let i = 0; i < 6; i++) {
			const col = i % 3;
			const row = Math.floor(i / 3);
			b.push(R(514 + col * 130, 196 + row * 92, 122, 84, { fill: C.panel2, stroke: C.cyan }));
			b.push(T(575 + col * 130, 244 + row * 92, `cell ${i + 1}`, { size: 12, mono: true, color: C.cyan, anchor: 'middle' }));
		}
		b.push(T(705, 400, 'grid-template-columns: repeat(3, 1fr)', { size: 11.5, mono: true, color: C.muted, anchor: 'middle' }));
	}

	if (p.variant === 'devices') {
		const frames = [
			{ w: 176, h: 300, label: '320–479px · mobile', tone: 'cyan' },
			{ w: 250, h: 300, label: '768px · tablet', tone: 'emerald' },
			{ w: 366, h: 300, label: '1280px · desktop', tone: 'violet' }
		];
		let x = 40;
		frames.forEach((f) => {
			const c = tone(f.tone);
			b.push(R(x, 150, f.w, f.h, { fill: C.panel, stroke: c }));
			b.push(R(x + 12, 164, f.w - 24, 34, { fill: C.panel2, stroke: C.line, rx: 5 }));
			b.push(T(x + f.w / 2, 186, 'nav', { size: 11, mono: true, color: C.muted, anchor: 'middle' }));
			b.push(R(x + 12, 210, f.w - 24, 96, { fill: 'rgba(56,189,248,0.10)', stroke: c, rx: 5 }));
			b.push(T(x + f.w / 2, 262, 'hero', { size: 11.5, mono: true, color: c, anchor: 'middle' }));
			const cols = f.w > 300 ? 3 : f.w > 200 ? 2 : 1;
			for (let i = 0; i < cols; i++) {
				const cw = (f.w - 24 - (cols - 1) * 10) / cols;
				b.push(R(x + 12 + i * (cw + 10), 318, cw, 76, { fill: C.panel2, stroke: C.line, rx: 5 }));
			}
			b.push(R(x + 12, 408, f.w - 24, 26, { fill: 'rgba(167,139,250,0.12)', stroke: C.violet, rx: 5 }));
			b.push(T(x + f.w / 2, 470, f.label, { size: 11.5, mono: true, color: c, anchor: 'middle' }));
			x += f.w + 24;
		});
	}

	if (p.variant === 'dashboard') {
		p.kpis.forEach((k, i) => {
			const x = 40 + i * 224;
			b.push(R(x, 130, 210, 84, { fill: C.panel, stroke: C.line }));
			b.push(T(x + 16, 156, k.label.toUpperCase(), { size: 10.5, color: C.muted, mono: true, weight: 700 }));
			b.push(T(x + 16, 186, k.value, { size: 22, weight: 700 }));
			b.push(T(x + 16, 206, k.delta, { size: 11.5, mono: true, color: k.delta.startsWith('-') ? C.rose : C.emerald }));
		});
		// chart utama
		b.push(R(40, 232, 636, 214, { fill: C.panel, stroke: C.line }));
		b.push(T(60, 258, p.chartLabel, { size: 12, color: C.cyan, mono: true, weight: 700 }));
		const gx = 74;
		const gy = 282;
		const gw = 566;
		const gh = 136;
		b.push(L(gx, gy + gh, gx + gw, gy + gh, { stroke: C.line }));
		let d = '';
		const pts = [0.35, 0.42, 0.38, 0.55, 0.62, 0.58, 0.72, 0.68, 0.81, 0.88];
		pts.forEach((v, i) => {
			const x = gx + (i / (pts.length - 1)) * gw;
			const y = gy + gh - v * gh;
			d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
		});
		b.push(PATH(`${d} L${gx + gw} ${gy + gh} L${gx} ${gy + gh} Z`, { fill: 'rgba(56,189,248,0.14)', stroke: 'none' }));
		b.push(PATH(d, { stroke: C.cyan, w: 2.6 }));
		pts.forEach((v, i) => {
			const x = gx + (i / (pts.length - 1)) * gw;
			const y = gy + gh - v * gh;
			b.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="${C.cyan}"/>`);
		});
		// panel kanan: filter
		b.push(R(700, 232, 220, 214, { fill: C.panel, stroke: C.line }));
		b.push(T(720, 258, 'FILTER & LEGENDA', { size: 11.5, color: C.cyan, mono: true, weight: 700 }));
		['Periode: 30 hari', 'Region: ASEAN', 'Segmen: Retail', 'Bandingkan: YoY'].forEach((f, i) => {
			b.push(R(720, 274 + i * 38, 180, 30, { fill: C.panel2, stroke: C.line, rx: 6 }));
			b.push(T(734, 294 + i * 38, f, { size: 11.5, mono: true, color: C.muted }));
		});
		// baris tabel
		p.rows.forEach((row, ri) => {
			row.forEach((cell, ci) => {
				const x = 40 + ci * 106;
				b.push(T(x + 4, 456 + ri * 24, cell, { size: 11.5, mono: true, color: ri === 0 ? C.muted : C.ink }));
			});
		});
	}

	if (p.footnote) b.push(T(480, 512, p.footnote, { size: 12, color: C.muted, anchor: 'middle' }));
	return frame({ kicker: p.kicker, title: p.title, sub: p.sub, note: p.note, body: b.join('') });
}
