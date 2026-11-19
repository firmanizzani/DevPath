import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';

const BASE = process.env.BASE ?? 'http://localhost:5174';
const SHOTS = 'C:/Users/Firman Izzani/AppData/Local/Temp/opencode/shots3';
mkdirSync(SHOTS, { recursive: true });

const info = JSON.parse(readFileSync(new URL('../../api/tmp-test-user.json', import.meta.url), 'utf8'));
const NEW_PASS = 'rahasia456';

const browser = await chromium.launch({ channel: 'msedge' });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
page.on('console', (m) => {
	if (m.type() === 'error') console.log('[console error]', m.text().slice(0, 200));
});
const log = (...a) => console.log(...a);

// 1) halaman login
await page.goto(`${BASE}/login`, { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(700);
const activeTab = await page.locator('main a[href="/login"]').first().getAttribute('class');
log('1) tab Masuk aktif (bg-ink):', activeTab.includes('bg-ink'), '| punya shadow:', activeTab.includes('shadow'));
await page.screenshot({ path: `${SHOTS}/01-login.png`, fullPage: true });

// 2) klik tombol Google → harus muncul pesan provider belum aktif
await page.click('button:has-text("Masuk dengan Google")');
await page.waitForTimeout(1200);
const googleMsg = await page.locator('[role="alert"]').first().innerText().catch(() => '(tidak ada)');
log('2) pesan tombol Google:', googleMsg.replace(/\s+/g, ' ').slice(0, 120));
await page.screenshot({ path: `${SHOTS}/02-login-google-error.png`, fullPage: true });

// 3) halaman daftar
await page.goto(`${BASE}/register`, { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(700);
const regText = (await page.locator('main form').first().innerText()).toLowerCase();
log(
	'3) field daftar:',
	regText.includes('nama lengkap'),
	regText.includes('konfirmasi password'),
	regText.includes('target scope karir utama')
);
await page.screenshot({ path: `${SHOTS}/03-register.png`, fullPage: true });

// 4) tab Masuk dari halaman daftar
await page.click('a[href="/login"]');
await page.waitForURL('**/login', { timeout: 15000 });
log('4) tab Masuk menavigasi ke /login: OK');

// 5) login sukses
await page.fill('input[type="email"]', info.email);
await page.fill('input[type="password"]', info.password);
await page.click('button[type="submit"]');
await page.waitForURL('**/progres', { timeout: 25000 });
await page.waitForTimeout(2000);
log('5) login sukses → /progres: OK');

// 6) pengaturan — isi input password baru
await page.goto(`${BASE}/pengaturan`, { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(800);
await page.screenshot({ path: `${SHOTS}/04-pengaturan.png`, fullPage: true });
await page.fill('input[placeholder="Minimal 8 karakter"]', NEW_PASS);
await page.fill('input[placeholder="Ulangi password baru"]', NEW_PASS);
await page.click('button:has-text("Simpan Perubahan")');
await page.waitForTimeout(2500);
const saved = await page.locator('main').innerText();
log('6) simpan profil+password:', saved.includes('Profil & password berhasil diperbarui.'));
await page.screenshot({ path: `${SHOTS}/05-pengaturan-password.png`, fullPage: true });

// 7) verifikasi: login ulang dengan password baru di konteks bersih
const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const p2 = await ctx2.newPage();
await p2.goto(`${BASE}/login`, { waitUntil: 'load', timeout: 60000 });
await p2.waitForTimeout(1500);
await p2.fill('input[type="email"]', info.email);
await p2.fill('input[type="password"]', NEW_PASS);
await p2.click('button[type="submit"]');
const ok2 = await p2
	.waitForURL('**/progres', { timeout: 25000 })
	.then(() => true)
	.catch(() => false);
if (!ok2) {
	const err2 = await p2
		.locator('[role="alert"]')
		.first()
		.innerText()
		.catch(() => '(tidak ada alert)');
	log('   alert:', err2.replace(/\s+/g, ' ').slice(0, 160));
}
log('7) login dengan password baru:', ok2 ? 'OK' : 'GAGAL');
await ctx2.close();

// 8) mobile login
const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mp = await m.newPage();
await mp.goto(`${BASE}/login`, { waitUntil: 'load', timeout: 60000 });
await mp.waitForTimeout(700);
await mp.screenshot({ path: `${SHOTS}/06-mobile-login.png`, fullPage: true });
await m.close();

await browser.close();
log('SELESAI — screenshot di', SHOTS);
