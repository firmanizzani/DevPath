import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const out = process.env.OUT ?? 'C:/Users/FIRMAN~1/AppData/Local/Temp/opencode/shots-svg';
mkdirSync(out, { recursive: true });

const slugs = [
	'software-engineer-b6',
	'backend-developer-b2',
	'cloud-engineer-b3',
	'data-analyst-b7',
	'network-engineer-b1',
	'ui-ux-designer-b2',
	'frontend-developer-b3',
	'software-engineer-b4'
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 580 } });
let failed = 0;
for (const slug of slugs) {
	const url = `http://localhost:5173/diagrams/${slug}.svg`;
	try {
		const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
		if (!res || !res.ok()) throw new Error(`HTTP ${res?.status()}`);
		await page.waitForTimeout(150);
		await page.screenshot({ path: `${out}/${slug}.png` });
		console.log(`ok   ${slug}`);
	} catch (e) {
		failed++;
		console.log(`GAGAL ${slug}: ${e.message}`);
	}
}
await browser.close();
console.log(failed ? `${failed} gagal` : 'semua screenshot sukses');
process.exit(failed ? 1 : 0);
