import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';

const SHOTS = 'C:/Users/Firman Izzani/AppData/Local/Temp/opencode/shots2';
mkdirSync(SHOTS, { recursive: true });

const info = JSON.parse(
	readFileSync(new URL('../../api/tmp-test-user.json', import.meta.url), 'utf8')
);

const browser = await chromium.launch({ channel: 'msedge' });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
page.on('console', (m) => {
	if (m.type() === 'error') console.log('[browser error]', m.text());
});
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

const log = (...a) => console.log(...a);

// 1) tanpa login — header guest
await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 60000 });
const guestHeader = await page.locator('header').innerText();
log('1) header guest memuat "Masuk":', guestHeader.includes('Masuk'), '| "Daftar":', guestHeader.includes('Daftar'));

// 2) tanam progres lokal (simulasi pengguna lama yang belum login)
await page.evaluate(() => {
	localStorage.setItem(
		'devpath:progress:v1',
		JSON.stringify({
			version: 1,
			scopes: {
				'frontend-developer': { completed: [1], scores: { '1': 88 }, xp: 88, updated_at: Date.now() }
			}
		})
	);
});
await page.reload({ waitUntil: 'load', timeout: 60000 });

// 3) halaman login
await page.goto('http://localhost:5173/login', { waitUntil: 'load', timeout: 60000 });
await page.screenshot({ path: `${SHOTS}/02-login.png`, fullPage: true });
log('3) /login OK, tab aktif "Masuk":', (await page.locator('a[href="/login"]').first().innerText()).includes('Masuk'));

// 4) percobaan login gagal -> alert merah
await page.fill('input[type="email"]', 'salah@email.com');
await page.fill('input[type="password"]', 'passwordsalah');
await page.click('main button[type="submit"]');
await page.waitForTimeout(1800);
const alertText = await page.locator('[role="alert"]').first().innerText().catch(() => '');
log('4) alert error muncul:', alertText);
await page.screenshot({ path: `${SHOTS}/04-login-error.png`, fullPage: true });

// 5) halaman register
await page.goto('http://localhost:5173/register', { waitUntil: 'load', timeout: 60000 });
await page.screenshot({ path: `${SHOTS}/03-register.png`, fullPage: true });
const regLabels = (await page.locator('main form').first().innerText()).toLowerCase();
log(
	'5) field register ada:',
	regLabels.includes('nama lengkap'),
	regLabels.includes('konfirmasi password'),
	regLabels.includes('target scope karir utama'),
	regLabels.includes('google')
);

// 6) login sukses
await page.goto('http://localhost:5173/login', { waitUntil: 'load', timeout: 60000 });
await page.fill('input[type="email"]', info.email);
await page.fill('input[type="password"]', info.password);
await page.click('main button[type="submit"]');
await page.waitForURL('**/progres', { timeout: 20000 });
await page.waitForTimeout(2500);
const authedHeader = (await page.locator('header').innerText()).toLowerCase();
log('6) setelah login — ada nama:', authedHeader.includes('tester devpath'), '| ada badge:', authedHeader.includes('frontend'), '| tombol Masuk hilang:', !authedHeader.includes('daftar'));
await page.screenshot({ path: `${SHOTS}/05-progres-login.png`, fullPage: true });

// 7) buka dropdown profil
await page.click('header button[aria-label="Menu akun"]');
await page.waitForTimeout(400);
const menu = await page.locator('header').innerText();
log('7) menu dropdown — Progres Saya:', menu.includes('Progres Saya'), '| Pengaturan:', menu.includes('Pengaturan'), '| Keluar:', menu.includes('Keluar'));
await page.screenshot({ path: `${SHOTS}/06-menu-profil.png` });

// 8) halaman pengaturan
await page.goto('http://localhost:5173/pengaturan', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(600);
await page.screenshot({ path: `${SHOTS}/07-pengaturan.png`, fullPage: true });
const setTxt = await page.locator('main').innerText();
log('8) pengaturan — ada form:', setTxt.includes('Profil'), '| zona berbahaya:', setTxt.includes('Zona Berbahaya'));

// 9) simpan perubahan profil
await page.fill('input[type="text"]', 'Tester DevPath Diperbarui');
await page.click('button:has-text("Simpan Perubahan")');
await page.waitForTimeout(1800);
const saved = await page.locator('main').innerText();
log('9) simpan profil sukses:', saved.includes('Profil berhasil diperbarui'));
await page.screenshot({ path: `${SHOTS}/08-profil-tersimpan.png`, fullPage: true });

// 10) cookie sesi
const cookies = await ctx.cookies();
log('10) cookie supabase:', cookies.filter((c) => c.name.startsWith('sb-')).map((c) => c.name));

// 11) logout
await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(800);
await page.click('header button[aria-label="Menu akun"]');
await page.waitForTimeout(400);
await page.click('header button:has-text("Keluar")');
await page.waitForTimeout(2500);
const afterLogout = (await page.locator('header').innerText()).toLowerCase();
log('11) setelah keluar — tombol Masuk kembali:', afterLogout.includes('masuk'), '| nama hilang:', !afterLogout.includes('tester'));
await page.screenshot({ path: `${SHOTS}/10-setelah-keluar.png` });

// 12) login lagi -> progres dipulihkan dari Supabase
await page.goto('http://localhost:5173/login', { waitUntil: 'load', timeout: 60000 });
await page.fill('input[type="email"]', info.email);
await page.fill('input[type="password"]', info.password);
await page.click('main button[type="submit"]');
await page.waitForURL('**/progres', { timeout: 20000 });
await page.evaluate(() => localStorage.removeItem('devpath:progress:v1'));
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(3000);
const restored = await page.evaluate(() => localStorage.getItem('devpath:progress:v1'));
log('12) progres dipulihkan dari cloud:', restored);
await page.screenshot({ path: `${SHOTS}/11-progres-restore.png`, fullPage: true });

// 13) mobile: halaman login
const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mp = await m.newPage();
await mp.goto('http://localhost:5173/login', { waitUntil: 'load', timeout: 60000 });
await mp.waitForTimeout(800);
await mp.screenshot({ path: `${SHOTS}/09-mobile-login.png`, fullPage: true });
await m.close();

await browser.close();
log('SELESAI');
