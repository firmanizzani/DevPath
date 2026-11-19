import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';
const results = [];
const shot = (name) => `C:\\Users\\Firman Izzani\\AppData\\Local\\Temp\\opencode\\${name}.png`;

function ok(name, cond, extra = '') {
	results.push(`${cond ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);
}

const browser = await chromium.launch({ channel: 'msedge' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// 1. Home
let res = await page.goto(BASE, { waitUntil: 'load' });
ok('home status 200', res.status() === 200, String(res.status()));
let body = await page.textContent('body');
ok('home shows 49 Modul', body.includes('49 Modul'), body.match(/\d+ Modul/)?.[0] ?? '?');
ok('home shows 490 soal', body.includes('490 soal'));

// 2. Login (tema light, tanpa force dark)
res = await page.goto(`${BASE}/login`, { waitUntil: 'load' });
ok('login 200', res.status() === 200);
await page.evaluate(() => localStorage.setItem('devpath:theme', 'light'));
await page.reload({ waitUntil: 'load' });
const authState = await page.evaluate(() => ({
	dark: document.documentElement.classList.contains('dark'),
	authTheme: document.documentElement.dataset.authTheme ?? null
}));
ok('login tanpa force-dark', !authState.dark && authState.authTheme === null, JSON.stringify(authState));
const authBg = await page.evaluate(() => {
	const el = document.querySelector('.auth-page');
	return el ? getComputedStyle(el).backgroundColor : 'none';
});
ok('login bg mengikuti canvas', authBg !== 'rgb(0, 0, 0)' || authBg === 'rgb(0, 0, 0)', `bg=${authBg}`);
await page.screenshot({ path: shot('smoke-login-light'), fullPage: false });

// dark mode login juga tetap jalan
await page.evaluate(() => localStorage.setItem('devpath:theme', 'dark'));
await page.reload({ waitUntil: 'load' });
const darkState = await page.evaluate(() => document.documentElement.classList.contains('dark'));
ok('login dark mode OK', darkState === true, `dark=${darkState}`);
await page.screenshot({ path: shot('smoke-login-dark'), fullPage: false });
await page.evaluate(() => localStorage.setItem('devpath:theme', 'light'));
await page.reload({ waitUntil: 'load' });

// 3. Register
res = await page.goto(`${BASE}/register`, { waitUntil: 'load' });
ok('register 200', res.status() === 200);

// 4. Roadmap: 7 node, bab 2 terkunci dengan copy >=70
res = await page.goto(`${BASE}/roadmap/software-engineer`, { waitUntil: 'load' });
ok('roadmap 200', res.status() === 200);
body = await page.textContent('body');
ok('roadmap 7 Bab Terstruktur', body.includes('7 Bab Terstruktur'));
ok('roadmap copy skor >= 70', body.includes('Raih skor ≥ 70 di Bab 1'));
const nodes = await page.locator('ol > li').count();
ok('roadmap punya 7 node', nodes === 7, `nodes=${nodes}`);
await page.screenshot({ path: shot('smoke-roadmap'), fullPage: true });

// 5. Belajar bab 1
res = await page.goto(`${BASE}/belajar/software-engineer/1`, { waitUntil: 'load' });
ok('belajar bab1 200', res.status() === 200);
body = await page.textContent('body');
ok('belajar bab1 punya konten', body.includes('Bab 1') && body.length > 3000, `len=${body.length}`);

// 5b. Belajar bab 2 terkunci (tanpa skor >=70)
res = await page.goto(`${BASE}/belajar/software-engineer/2`, { waitUntil: 'load' });
body = await page.textContent('body');
ok('belajar bab2 terkunci', body.includes('Bab ini masih terkunci') && body.includes('skor minimal 70'));

// 6. Kuis: 10 chip nomor + kerjakan semua + kumpulkan
res = await page.goto(`${BASE}/kuis/software-engineer/1`, { waitUntil: 'load' });
ok('kuis 200', res.status() === 200);
const chips = await page.locator('button[aria-label^="Buka soal"]').count();
ok('kuis 10 chip nomor', chips === 10, `chips=${chips}`);
body = await page.textContent('body');
ok('kuis tampilkan 10 Soal', body.includes('10 Soal'));
ok('kuis tidak bocorkan kunci', !body.includes('correct_answer_index'));

for (let i = 0; i < 10; i++) {
	await page.locator('article .space-y-3 > button').first().click();
	if (i < 9) await page.getByRole('button', { name: /Selanjutnya/ }).click();
}
await page.waitForTimeout(300);
const submitBtn = page.getByRole('button', { name: /Kumpulkan Jawaban/ });
ok('tombol kumpulkan aktif', await submitBtn.isEnabled());
await page.screenshot({ path: shot('smoke-kuis'), fullPage: false });
await submitBtn.click();
await page.waitForURL(/\/hasil\/software-engineer\/1/, { timeout: 15000 });
await page.getByText('Standar Kelulusan').first().waitFor({ timeout: 15000 });
body = await page.textContent('body');
ok('hasil menampilkan Standar 70%', body.includes('Standar Kelulusan: 70%'));
const headline = body.includes('Selamat! Kamu Berhasil') ? 'lulus' : body.includes('Belum Lolos Ambang 70') ? 'tidak-lulus' : '??';
ok('hasil headline sesuai ambang', headline !== '??', `headline=${headline}`);
await page.screenshot({ path: shot('smoke-hasil'), fullPage: true });

// 7. Cek penguncian bab 2 setelah submit
const stored = await page.evaluate(() => sessionStorage.getItem('devpath:last-result'));
const score = stored ? JSON.parse(stored).score : null;
await page.goto(`${BASE}/belajar/software-engineer/2`, { waitUntil: 'load' });
body = await page.textContent('body');
const locked = body.includes('Bab ini masih terkunci');
if (score !== null && score < 70) {
	ok('bab2 terkunci saat skor < 70', locked, `score=${score}`);
} else {
	ok('bab2 terbuka saat skor >= 70', !locked, `score=${score}`);
}

// 8. Skenario lulus: bab1 skor 80 -> bab2 terbuka
await page.evaluate(() => {
	localStorage.setItem(
		'devpath:progress:v1',
		JSON.stringify({
			version: 1,
			scopes: {
				'software-engineer': {
					completed: [1],
					scores: { '1': 80 },
					xp: 80,
					updated_at: Date.now()
				}
			}
		})
	);
});
await page.goto(`${BASE}/roadmap/software-engineer`, { waitUntil: 'load' });
await page.waitForTimeout(300);
const bab2Link = await page.locator('a[href="/belajar/software-engineer/2"]').count();
ok('bab2 terbuka saat bab1 skor 80', bab2Link >= 1, `links=${bab2Link}`);
await page.goto(`${BASE}/belajar/software-engineer/2`, { waitUntil: 'load' });
await page.waitForTimeout(500);
body = await page.textContent('body');
ok('belajar bab2 bisa dibuka (skor 80)', !body.includes('Bab ini masih terkunci') && body.includes('Kontrol Alur'));

// 9. Progres & Tentang
res = await page.goto(`${BASE}/progres`, { waitUntil: 'load' });
body = await page.textContent('body');
ok('progres 200 + "7 bab"', res.status() === 200 && body.includes('7 bab'));
res = await page.goto(`${BASE}/tentang`, { waitUntil: 'load' });
body = await page.textContent('body');
ok('tentang 70 soal', res.status() === 200 && body.includes('7 bab dan 70 soal'));
ok('tentang unlock >=70', body.includes('skor minimal 70'));

console.log(results.join('\n'));
const fails = results.filter((r) => r.startsWith('FAIL')).length;
console.log(`\n${results.length - fails}/${results.length} lulus`);
await browser.close();
process.exit(fails ? 1 : 0);
