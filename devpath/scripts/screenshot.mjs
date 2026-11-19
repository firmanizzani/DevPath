import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const OUT = process.env.SHOTS ?? 'screenshots';

const result = {
	scope_id: 'backend-developer',
	bab_number: 1,
	score: 80,
	correct: 4,
	total: 5,
	answers: [1, 3, 0, 2, 1],
	time_ms: 222000,
	at: Date.now()
};

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const context = await browser.newContext({
	viewport: { width: 1280, height: 900 },
	deviceScaleFactor: 1,
	colorScheme: 'dark'
});
const page = await context.newPage();

async function shot(path, name, fullPage = true) {
	await page.goto(BASE + path, { waitUntil: 'networkidle' });
	await page.waitForTimeout(700);
	await page.screenshot({ path: `${OUT}/${name}.png`, fullPage });
	console.log('ok', name);
}

await shot('/', '01-katalog');
await shot('/roadmap/backend-developer', '02-roadmap');
await shot('/belajar/backend-developer/1', '03-materi');
await shot('/kuis/backend-developer/1', '04-kuis');

await page.goto(BASE + '/kuis/backend-developer/1', { waitUntil: 'domcontentloaded' });
await page.evaluate(
	(r) => sessionStorage.setItem('devpath:last-result', JSON.stringify(r)),
	result
);
await shot('/hasil/backend-developer/1', '05-hasil');
await shot('/progres', '06-progres');
await shot('/tentang', '07-tentang');

// mode terang
await page.evaluate(() => {
	localStorage.setItem('devpath:theme', 'light');
});
await shot('/', '08-katalog-terang');

// mobile
const mobile = await browser.newContext({
	viewport: { width: 390, height: 844 },
	deviceScaleFactor: 2,
	colorScheme: 'dark',
	isMobile: true,
	hasTouch: true
});
const mp = await mobile.newPage();
await mp.goto(BASE + '/', { waitUntil: 'networkidle' });
await mp.waitForTimeout(700);
await mp.screenshot({ path: `${OUT}/09-mobile-katalog.png`, fullPage: true });
console.log('ok 09-mobile-katalog');

await mp.goto(BASE + '/belajar/network-engineer/1', { waitUntil: 'networkidle' });
await mp.waitForTimeout(700);
await mp.screenshot({ path: `${OUT}/10-mobile-materi.png`, fullPage: true });
console.log('ok 10-mobile-materi');

await browser.close();
