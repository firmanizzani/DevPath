/**
 * 49 spesifikasi visual — satu per bab (7 scope × 7 bab).
 * Dihasilkan `scripts/visual-audit.ts` menjadi `static/diagrams/<slug>.svg`
 * lalu ditulis balik ke field `image_url` + `diagram_caption` tiap modul.
 * Penomoran caption memakai pola `Gambar <id_modul>.1` (id global 1–49).
 */
import {
	C,
	renderFlow,
	renderFlowchart,
	renderLadder,
	renderMatrix,
	renderArch,
	renderErd,
	renderStates,
	renderTree,
	renderCards,
	renderStructure,
	renderChart,
	renderMockup
} from './lib';

export interface Spec {
	scope: string;
	bab: number;
	slug: string;
	caption: string;
	svg: () => string;
}

const TITLES: Record<string, string> = {
	'software-engineer': 'Software Engineer',
	'ui-ux-designer': 'UI/UX Designer',
	'frontend-developer': 'Frontend Developer',
	'backend-developer': 'Backend Developer',
	'data-analyst': 'Data Analyst',
	'cloud-engineer': 'Cloud Engineer',
	'network-engineer': 'Network Engineer'
};

const K = (scope: string, bab: number) => `${TITLES[scope]} · Bab ${bab}`;

export const specs: Spec[] = [
	/* ------------------------------------------------- software-engineer */
	{
		scope: 'software-engineer',
		bab: 1,
		slug: 'software-engineer-b1',
		caption:
			'Gambar 1.1: Enam tipe data primitif yang menjadi bahan dasar variabel — teks, angka, boolean, daftar, objek, dan nilai kosong.',
		svg: () =>
			renderCards({
				kicker: K('software-engineer', 1),
				title: 'Tipe Data Primitif',
				sub: 'setiap nilai punya tipe yang menentukan operasi yang boleh dilakukan',
				items: [
					{ label: 'String', value: '"halo"', sub: 'teks — nama, kota', tone: 'cyan' },
					{ label: 'Number', value: '42', sub: 'angka — harga, skor', tone: 'ok' },
					{ label: 'Boolean', value: 'true', sub: 'benar / salah', tone: 'violet' },
					{ label: 'Array', value: '[1, 2, 3]', sub: 'daftar berurutan', tone: 'warn' },
					{ label: 'Object', value: '{ a: 1 }', sub: 'kunci ke nilai', tone: 'err' },
					{ label: 'Null', value: 'null', sub: 'sengaja kosong' }
				],
				footnote: 'typeof mengecek tipe — kesalahan tipe data paling sering muncul di sini'
			})
	},
	{
		scope: 'software-engineer',
		bab: 2,
		slug: 'software-engineer-b2',
		caption:
			'Gambar 2.1: Percabangan if-else memilih satu jalur dari kondisi, sedangkan while/for mengulang blok selama kondisi masih terpenuhi.',
		svg: () =>
			renderFlowchart({
				kicker: K('software-engineer', 2),
				title: 'Percabangan & Perulangan',
				sub: 'kontrol alur: pilih cabang, ulangi, lalu lanjut',
				condition: 'if (x % 2 === 0)?',
				yes: 'jalankan blok if',
				no: 'jalankan blok else',
				after: 'lanjut ke kode berikutnya',
				loop: 'while / for — ulangi selama kondisi terpenuhi'
			})
	},
	{
		scope: 'software-engineer',
		bab: 3,
		slug: 'software-engineer-b3',
		caption:
			'Gambar 3.1: Lima langkah sebuah fungsi — definisikan, terima parameter, proses, kembalikan nilai, lalu panggil ulang di bagian mana pun.',
		svg: () =>
			renderFlow({
				kicker: K('software-engineer', 3),
				title: 'Anatomi Fungsi & Modularisasi',
				sub: 'satu fungsi, satu tugas — mudah diuji dan dipakai ulang',
				steps: [
					{ label: 'Definisikan fungsi', sub: 'function / def', tone: 'cyan' },
					{ label: 'Terima parameter', sub: 'argumen masuk', tone: 'violet' },
					{ label: 'Proses di dalam', sub: 'logika tunggal', tone: 'warn' },
					{ label: 'Kembalikan nilai', sub: 'return', tone: 'ok' },
					{ label: 'Panggil & gunakan', sub: 'reusable', tone: 'cyan' }
				]
			})
	},
	{
		scope: 'software-engineer',
		bab: 4,
		slug: 'software-engineer-b4',
		caption:
			'Gambar 4.1: Perbandingan array (indeks berurutan), object (kunci ke nilai), dan panduan memilih struktur sesuai kebutuhan data.',
		svg: () =>
			renderStructure({
				kicker: K('software-engineer', 4),
				title: 'Struktur Data Dasar',
				sub: 'array untuk urutan, object untuk atribut bernama',
				panels: [
					{
						title: 'Array — indeks berurutan',
						type: 'slots',
						items: ['[0]', '[1]', '[2]', '[3]']
					},
					{
						title: 'Object — kunci & nilai',
						type: 'rows',
						rows: [
							['nama', '"Rina"'],
							['usia', '24'],
							['aktif', 'true']
						],
						caption: 'kunci unik → nilai bebas tipe'
					},
					{
						title: 'Pilih struktur',
						type: 'grid',
						cols: ['Butuh', 'Struktur'],
						rows: [
							['urutan', 'Array'],
							['kunci', 'Object'],
							['campur', 'List obj']
						],
						caption: 'putuskan sebelum menulis kode'
					}
				],
				footnote: 'akses array by indeks O(1); cari di object lewat kunci, bukan telusuri satu per satu'
			})
	},
	{
		scope: 'software-engineer',
		bab: 5,
		slug: 'software-engineer-b5',
		caption:
			'Gambar 5.1: Diagram kelas UML Product, Cart, dan Order yang memperlihatkan atribut, visibilitas +/−, serta relasi antar-objek.',
		svg: () =>
			renderErd({
				kicker: K('software-engineer', 5),
				title: 'Diagram Kelas OOP',
				sub: 'atribut + publik, − privat — enkapsulasi menyembunyikan detail dalam',
				tables: [
					{
						name: 'class Product',
						cols: ['+ id: int', '+ nama: string', '+ harga: number', '- stok: int'],
						tone: 'cyan'
					},
					{
						name: 'class Cart',
						cols: ['+ id: int', '+ items: Product[]', '+ total: number'],
						tone: 'violet'
					},
					{
						name: 'class Order',
						cols: ['+ id: int', '+ cart: Cart', '+ userId: int', '+ status: string'],
						tone: 'ok'
					}
				],
				relations: [
					{ from: 0, to: 1, label: 'berisi 1..n', tone: 'cyan' },
					{ from: 1, to: 2, label: 'menjadi', tone: 'violet' }
				],
				footnote: 'produk dikumpulkan di keranjang, keranjang dikunci menjadi pesanan'
			})
	},
	{
		scope: 'software-engineer',
		bab: 6,
		slug: 'software-engineer-b6',
		caption:
			'Gambar 6.1: Lima kurva kompleksitas — O(1), O(log n), O(n), O(n log n), dan O(n²) — dibandingkan terhadap pertumbuhan ukuran input.',
		svg: () =>
			renderChart({
				kicker: K('software-engineer', 6),
				title: 'Analisis Kompleksitas Big O',
				sub: 'bagaimana waktu eksekusi tumbuh saat input membesar',
				chart: 'curves',
				series: [
					{ label: 'O(1) konstan', color: C.emerald, fn: () => 0.1 },
					{
						label: 'O(log n)',
						color: C.cyan,
						fn: (t) => 0.08 + 0.45 * (Math.log(1 + t * 9) / Math.log(10))
					},
					{ label: 'O(n) linier', color: C.amber, fn: (t) => 0.15 + 0.55 * t },
					{
						label: 'O(n log n)',
						color: C.violet,
						fn: (t) => 0.12 + 0.6 * (t * (Math.log(1 + t * 9) / Math.log(10)))
					},
					{ label: 'O(n²) kuadratik', color: C.rose, fn: (t) => 0.1 + 0.9 * t * t }
				],
				footnote: 'pilih algoritma yang keloknya landai — selisih meledak di data besar'
			})
	},
	{
		scope: 'software-engineer',
		bab: 7,
		slug: 'software-engineer-b7',
		caption:
			'Gambar 7.1: Pohon rekursi fib(n) — dua cabang panggilan diri, base case sebagai berhenti, dan memo[n] yang mencegah hitung ulang.',
		svg: () =>
			renderTree({
				kicker: K('software-engineer', 7),
				title: 'Rekursi & Dynamic Programming',
				sub: 'pecah masalah menjadi submasalah yang lebih kecil',
				root: 'fib(n)',
				rootSub: 'panggil diri sendiri',
				children: [
					{ label: 'fib(n−1)', sub: 'panggil diri', tone: 'cyan' },
					{ label: 'fib(n−2)', sub: 'panggil diri', tone: 'cyan' },
					{ label: 'base case', sub: 'n ≤ 1 → 1', tone: 'ok' },
					{ label: 'memo[n]', sub: 'hasil disimpan', tone: 'violet' }
				],
				footnote: 'tanpa memo banyak simpul dihitung ulang — memoization memotong panggilan berulang'
			})
	},

	/* ---------------------------------------------------- ui-ux-designer */
	{
		scope: 'ui-ux-designer',
		bab: 1,
		slug: 'ui-ux-designer-b1',
		caption:
			'Gambar 8.1: Alur design thinking yang berputar — empati, define, ideate, prototype, test, lalu kembali ke empati dengan temuan baru.',
		svg: () =>
			renderFlow({
				kicker: K('ui-ux-designer', 1),
				title: 'Design Thinking & Riset Pengguna',
				sub: 'siklus berputar, bukan garis lurus — tiap putaran membawa temuan baru',
				cycle: true,
				steps: [
					{ label: 'Empati', sub: 'wawancara & observasi', tone: 'cyan' },
					{ label: 'Define', sub: 'rumuskan masalah', tone: 'violet' },
					{ label: 'Ideate', sub: 'brainstorm solusi', tone: 'warn' },
					{ label: 'Prototype', sub: 'purwarupa cepat', tone: 'ok' },
					{ label: 'Test', sub: 'uji ke pengguna', tone: 'cyan' }
				]
			})
	},
	{
		scope: 'ui-ux-designer',
		bab: 2,
		slug: 'ui-ux-designer-b2',
		caption:
			'Gambar 9.1: Perbandingan site map (struktur antarhalaman) dan wireframe low-fi yang menyusun tata letak sebelum masuk desain visual.',
		svg: () =>
			renderMockup({
				kicker: K('ui-ux-designer', 2),
				title: 'Arsitektur Informasi & Wireframing',
				sub: 'susun struktur dulu, baru gambar layarnya',
				variant: 'compare',
				leftTone: 'warn',
				rightTone: 'cyan',
				left: {
					title: 'SITE MAP',
					blocks: [
						{ x: 20, y: 56, w: 170, h: 62, label: 'Beranda' },
						{ x: 210, y: 56, w: 170, h: 62, label: 'Produk' },
						{ x: 20, y: 138, w: 170, h: 62, label: 'Tentang' },
						{ x: 210, y: 138, w: 170, h: 62, label: 'Kontak' }
					]
				},
				right: {
					title: 'WIREFRAME HALAMAN',
					blocks: [
						{ x: 20, y: 48, w: 360, h: 34, label: 'Nav' },
						{ x: 20, y: 94, w: 360, h: 74, label: 'Hero' },
						{ x: 20, y: 180, w: 170, h: 84, label: 'Kartu 1' },
						{ x: 210, y: 180, w: 170, h: 84, label: 'Kartu 2' }
					]
				},
				footnote: 'site map = apa yang ada; wireframe = di mana letaknya'
			})
	},
	{
		scope: 'ui-ux-designer',
		bab: 3,
		slug: 'ui-ux-designer-b3',
		caption:
			'Gambar 10.1: Prinsip visual — grid 8pt untuk ritme spasi, hierarki tipografi berjenjang, dan pasangan warna yang lolos kontras.',
		svg: () =>
			renderMockup({
				kicker: K('ui-ux-designer', 3),
				title: 'Prinsip Visual & Typography',
				sub: 'ritme spasi, hierarki teks, dan kontras yang aman dibaca',
				variant: 'gridtype',
				footnote: 'semua kelipatan 8 — spasi, ukuran font, dan tinggi komponen ikut aturan yang sama'
			})
	},
	{
		scope: 'ui-ux-designer',
		bab: 4,
		slug: 'ui-ux-designer-b4',
		caption:
			'Gambar 11.1: Struktur design system — token warna, skala tipografi, ikon, komponen, dan spasi yang dipakai ulang di seluruh produk.',
		svg: () =>
			renderTree({
				kicker: K('ui-ux-designer', 4),
				title: 'Design System & Komponen',
				sub: 'sumber kebenaran visual bersama desainer dan developer',
				root: 'Design System',
				rootSub: 'token → komponen → layar',
				children: [
					{ label: 'Warna', sub: 'token', chips: ['kontras AA'], tone: 'cyan' },
					{ label: 'Tipografi', sub: 'skala', chips: ['16 / 24 body'], tone: 'violet' },
					{ label: 'Ikon', sub: 'grid', chips: ['24 × 24 px'], tone: 'warn' },
					{ label: 'Komponen', sub: 'pakai ulang', chips: ['tombol · kartu'], tone: 'ok' },
					{ label: 'Spasi', sub: '8pt', chips: ['4 · 8 · 16'], tone: 'cyan' }
				],
				footnote: 'komponen yang sudah teruji mengurangi keputusan berulang dan menjaga konsistensi'
			})
	},
	{
		scope: 'ui-ux-designer',
		bab: 5,
		slug: 'ui-ux-designer-b5',
		caption:
			'Gambar 12.1: Empat keadaan tombol — default, hover, pressed, dan success — contoh micro-interaction yang memberi umpan balik instan.',
		svg: () =>
			renderStates({
				kicker: K('ui-ux-designer', 5),
				title: 'Prototyping & Micro-interactions',
				sub: 'status kecil yang membuat antarmuka terasa hidup',
				items: [
					{ label: 'Default', caption: 'diam, kontras aman', tone: 'cyan' },
					{ label: 'Hover', caption: 'naik 2px + bayangan', tone: 'violet' },
					{ label: 'Pressed', caption: 'skala 0.98 saat klik', tone: 'warn' },
					{ label: 'Success', caption: 'ceklis hijau + pesan', tone: 'ok' }
				],
				footnote: 'tiap keadaan menjawab: apa yang baru saja terjadi dan apa yang bisa dilakukan sekarang'
			})
	},
	{
		scope: 'ui-ux-designer',
		bab: 6,
		slug: 'ui-ux-designer-b6',
		caption:
			'Gambar 13.1: Siklus usability testing — menyusun tugas, merekrut peserta, menjalankan sesi, menganalisis temuan, lalu menguji ulang setelah perbaikan.',
		svg: () =>
			renderFlow({
				kicker: K('ui-ux-designer', 6),
				title: 'Usability Testing & Heuristik',
				sub: 'perbaiki lalu uji ulang — bukan menambah peserta dalam satu putaran panjang',
				cycle: true,
				steps: [
					{ label: 'Susun tugas', sub: 'skenario & sukses', tone: 'cyan' },
					{ label: 'Rekrut peserta', sub: '3-5 orang', tone: 'violet' },
					{ label: 'Jalankan sesi', sub: 'pikir keras', tone: 'warn' },
					{ label: 'Analisis temuan', sub: 'severity tinggi', tone: 'ok' },
					{ label: 'Perbaiki & uji ulang', sub: 'iterasi berikutnya', tone: 'cyan' }
				]
			})
	},
	{
		scope: 'ui-ux-designer',
		bab: 7,
		slug: 'ui-ux-designer-b7',
		caption:
			'Gambar 14.1: Alur handoff — desainer mengunggah aset dan token ke cloud, developer menariknya ke basis kode lewat API atau plugin, lalu hasil build dikirim kembali untuk diperiksa bersama.',
		svg: () =>
			renderArch({
				kicker: K('ui-ux-designer', 7),
				title: 'Handoff Desain ke Developer',
				sub: 'aset, token, dan spesifikasi berpindah dengan versi yang jelas',
				columns: [
					{ title: 'DESAINER', nodes: [{ label: 'Desainer', sub: 'Figma', tone: 'cyan' }] },
					{
						title: 'BERKAS BERSAMA',
						nodes: [
							{ label: 'Cloud & Plugin', sub: 'aset + token', tone: 'violet' },
							{ label: 'Repo & Branch', sub: 'versi desain', tone: 'warn' }
						]
					},
					{ title: 'KODE', nodes: [{ label: 'Developer', sub: 'basis kode', tone: 'ok' }] },
					{ title: 'VERIFIKASI', nodes: [{ label: 'Build & QA', sub: 'review bersama', tone: 'cyan' }] }
				],
				edges: [
					{ from: [0, 0], to: [1, 0], label: 'unggah', tone: 'cyan' },
					{ from: [1, 0], to: [2, 0], label: 'tarik', tone: 'violet' },
					{ from: [1, 1], to: [2, 0], label: 'salin', tone: 'warn' },
					{ from: [2, 0], to: [3, 0], label: 'build', tone: 'ok' }
				],
				footnote: 'serah terima bukan lempar file — desainer dan developer menyepakati definisi selesai'
			})
	},

	/* -------------------------------------------------- frontend-developer */
	{
		scope: 'frontend-developer',
		bab: 1,
		slug: 'frontend-developer-b1',
		caption:
			'Gambar 15.1: Struktur dokumen semantik HTML, aturan aksesibilitas (alt, aria-label, fokus keyboard), beserta cara mengujinya.',
		svg: () =>
			renderStructure({
				kicker: K('frontend-developer', 1),
				title: 'HTML Semantik & Aksesibilitas',
				sub: 'tag sesuai makna — bukan sekadar tampilan',
				panels: [
					{
						title: 'Struktur Semantik',
						type: 'rows',
						rows: [
							['<header>', 'kepala halaman'],
							['<nav>', 'navigasi'],
							['<main>', 'konten utama'],
							['<footer>', 'info penutup']
						],
						caption: 'pembaca layar memakai tag ini'
					},
					{
						title: 'Aksesibilitas (A11y)',
						type: 'rows',
						rows: [
							['alt', 'teks gambar'],
							['aria-label', 'nama tombol'],
							['tabindex', 'urutan fokus']
						],
						caption: 'wajib untuk pengguna keyboard'
					},
					{
						title: 'Uji Aksesibilitas',
						type: 'rows',
						rows: [
							['Fokus', 'tab + enter'],
							['Baca', 'NVDA / VoiceOver'],
							['Skor', 'Lighthouse ≥ 90']
						],
						caption: 'audit rutin setiap rilis'
					}
				],
				footnote: 'semantik yang benar = SEO lebih baik sekaligus akses lebih luas'
			})
	},
	{
		scope: 'frontend-developer',
		bab: 2,
		slug: 'frontend-developer-b2',
		caption:
			'Gambar 16.1: Flexbox menyusun elemen di satu sumbu (justify-content), CSS Grid mengatur dua sumbu sekaligus (grid-template-columns).',
		svg: () =>
			renderMockup({
				kicker: K('frontend-developer', 2),
				title: 'CSS Layout: Flexbox vs Grid',
				sub: 'satu sumbu vs dua sumbu — pilih alat sesuai bentuk tata letak',
				variant: 'layout',
				footnote: 'flex untuk baris navigasi dan tombol; grid untuk katalog, dashboard, dan form'
			})
	},
	{
		scope: 'frontend-developer',
		bab: 3,
		slug: 'frontend-developer-b3',
		caption:
			'Gambar 17.1: Desain mobile-first tiga breakpoint — 320px ponsel, 768px tablet, 1280px desktop — dengan struktur halaman yang menyesuaikan.',
		svg: () =>
			renderMockup({
				kicker: K('frontend-developer', 3),
				title: 'Responsive Design & Tailwind',
				sub: 'satu markup, tiga ukuran layar — gaya ditambah dari yang kecil ke besar',
				variant: 'devices',
				footnote: 'Tailwind sm/md/lg ≈ 640/768/1024px — titik di mana tata letak boleh berubah'
			})
	},
	{
		scope: 'frontend-developer',
		bab: 4,
		slug: 'frontend-developer-b4',
		caption:
			'Gambar 18.1: Siklus manipulasi DOM — pilih elemen, pasang event, ubah tampilan, validasi input, lalu render ulang halaman.',
		svg: () =>
			renderFlow({
				kicker: K('frontend-developer', 4),
				title: 'JavaScript, DOM & Event',
				sub: 'elemen dipilih, event ditangkap, tampilan diperbarui',
				steps: [
					{ label: 'Pilih elemen', sub: 'querySelector', tone: 'cyan' },
					{ label: 'Dengarkan event', sub: 'addEventListener', tone: 'violet' },
					{ label: 'Ubah DOM', sub: 'textContent / class', tone: 'warn' },
					{ label: 'Validasi', sub: 'cek input', tone: 'ok' },
					{ label: 'Render ulang', sub: 'update tampilan', tone: 'cyan' }
				]
			})
	},
	{
		scope: 'frontend-developer',
		bab: 5,
		slug: 'frontend-developer-b5',
		caption:
			'Gambar 19.1: Siklus request-response yang dijalankan fetch — request pergi, server memproses, response kembali, hasil dirender, kegagalan ditangkap di catch.',
		svg: () =>
			renderFlow({
				kicker: K('frontend-developer', 5),
				title: 'Async JavaScript: Promises & Fetch',
				sub: 'kode tidak menunggu diam — request berjalan sementara UI tetap hidup',
				steps: [
					{ label: 'fetch(url)', sub: 'kirim request', tone: 'cyan' },
					{ label: 'await response', sub: 'status 200 / 404', tone: 'violet' },
					{ label: 'response.json()', sub: 'parse JSON', tone: 'warn' },
					{ label: '.then render', sub: 'update state', tone: 'ok' },
					{ label: 'catch error', sub: 'tampilkan pesan', tone: 'err' }
				]
			})
	},
	{
		scope: 'frontend-developer',
		bab: 6,
		slug: 'frontend-developer-b6',
		caption:
			'Gambar 20.1: Alur reaktivitas Svelte — $state menjadi input komponen, $derived menghitung nilai turunan, lalu DOM diperbarui otomatis.',
		svg: () =>
			renderArch({
				kicker: K('frontend-developer', 6),
				title: 'State Management Svelte',
				sub: 'state → komponen → DOM, semuanya terhubung reaktif',
				columns: [
					{
						title: 'STATE',
						nodes: [
							{ label: '$state()', sub: 'sumber data', tone: 'cyan' },
							{ label: '$derived()', sub: 'nilai turunan', tone: 'violet' }
						]
					},
					{
						title: 'KOMPONEN',
						nodes: [
							{ label: '<Counter>', sub: 'props & snippet', tone: 'warn' },
							{ label: '<List>', sub: 'render ulang', tone: 'warn' }
						]
					},
					{
						title: 'TAMPILAN',
						nodes: [{ label: 'DOM reaktif', sub: 'update otomatis', tone: 'ok' }]
					}
				],
				edges: [
					{ from: [0, 0], to: [1, 0], tone: 'cyan' },
					{ from: [0, 0], to: [1, 1], tone: 'cyan' },
					{ from: [0, 1], to: [1, 1], tone: 'violet' },
					{ from: [1, 0], to: [2, 0], tone: 'warn' },
					{ from: [1, 1], to: [2, 0], tone: 'warn' }
				],
				footnote: 'ubah state, bukan DOM — kerangka yang memperbarui tampilan sendiri'
			})
	},
	{
		scope: 'frontend-developer',
		bab: 7,
		slug: 'frontend-developer-b7',
		caption:
			'Gambar 21.1: Tiga patokan performa — LCP di bawah 2,5 detik, CLS di bawah 0,1, dan bundel produksi di bawah 300 kB.',
		svg: () =>
			renderChart({
				kicker: K('frontend-developer', 7),
				title: 'Web Performance & Build Tools',
				sub: 'Core Web Vitals yang dinilai Lighthouse dan Chrome UX Report',
				chart: 'gauges',
				metrics: [
					{ label: 'Largest Contentful Paint', value: '1.8 s', pct: 0.72, tone: 'ok', target: '≤ 2.5 s' },
					{ label: 'Cumulative Layout Shift', value: '0.04', pct: 0.4, tone: 'ok', target: '≤ 0.1' },
					{ label: 'Ukuran bundel produksi', value: '145 kB', pct: 0.48, tone: 'cyan', target: '≤ 300 kB' }
				],
				footnote: 'Vite memangkas waktu build: dev server ESM + bundling Rollup untuk produksi'
			})
	},

	/* --------------------------------------------------- backend-developer */
	{
		scope: 'backend-developer',
		bab: 1,
		slug: 'backend-developer-b1',
		caption:
			'Gambar 22.1: Alur komunikasi client dan server — client mengirim request lewat HTTP, server memprosesnya, lalu membalas response ke client.',
		svg: () =>
			renderArch({
				kicker: K('backend-developer', 1),
				title: 'Client-Server & Protokol HTTP',
				sub: 'request pergi, server memproses, response kembali',
				columns: [
					{ title: 'CLIENT', nodes: [{ label: 'Browser / Aplikasi', sub: 'kirim permintaan', tone: 'cyan' }] },
					{
						title: 'JARINGAN',
						nodes: [
							{ label: 'HTTP Request', sub: 'GET /api/courses', tone: 'violet' },
							{ label: 'HTTP Response', sub: '200 OK · JSON', tone: 'ok' }
						]
					},
					{
						title: 'SERVER',
						nodes: [
							{ label: 'API Server', sub: 'proses & validasi', tone: 'warn' },
							{ label: 'Database', sub: 'simpan data', tone: 'cyan' }
						]
					}
				],
				edges: [
					{ from: [0, 0], to: [1, 0], label: 'request', tone: 'cyan' },
					{ from: [1, 0], to: [2, 0], label: 'proses', tone: 'violet' },
					{ from: [2, 0], to: [1, 1], label: 'respons', tone: 'ok' },
					{ from: [1, 1], to: [0, 0], label: 'balas', tone: 'ok' }
				],
				footnote: 'metode menentukan aksi: GET baca, POST buat, PUT ubah, DELETE hapus'
			})
	},
	{
		scope: 'backend-developer',
		bab: 2,
		slug: 'backend-developer-b2',
		caption:
			'Gambar 23.1: Matriks metode HTTP — GET, POST, PUT, dan DELETE beserta tujuan, contoh path, respons sukses, dan sifat idempoten.',
		svg: () =>
			renderMatrix({
				kicker: K('backend-developer', 2),
				title: 'Perancangan RESTful API',
				sub: 'kontrak endpoint yang konsisten dan bisa diprediksi',
				cols: ['GET', 'POST', 'PUT', 'DELETE'],
				rows: [
					{
						label: 'Tujuan',
						sub: 'Aspek',
						cells: [
							{ text: 'baca data', tone: 'cyan' },
							{ text: 'buat baru', tone: 'ok' },
							{ text: 'perbarui', tone: 'warn' },
							{ text: 'hapus', tone: 'err' }
						]
					},
					{
						label: 'Contoh path',
						cells: [
							{ text: '/api/items' },
							{ text: '/api/items' },
							{ text: '/api/items/:id' },
							{ text: '/api/items/:id' }
						]
					},
					{
						label: 'Respons sukses',
						cells: [
							{ text: '200 OK' },
							{ text: '201 Created' },
							{ text: '200 OK' },
							{ text: '204 No Content' }
						]
					},
					{
						label: 'Idempoten?',
						cells: [
							{ text: 'ya', tone: 'ok' },
							{ text: 'tidak', tone: 'warn' },
							{ text: 'ya', tone: 'ok' },
							{ text: 'ya', tone: 'ok' }
						]
					}
				]
			})
	},
	{
		scope: 'backend-developer',
		bab: 3,
		slug: 'backend-developer-b3',
		caption:
			'Gambar 24.1: Skema relasional users → orders → order_items dengan kunci utama (PK) dan kunci asing (FK) yang menghubungkan antartabel.',
		svg: () =>
			renderErd({
				kicker: K('backend-developer', 3),
				title: 'Pemodelan Basis Data & Relasi SQL',
				sub: 'satuan data disimpan sekali, dihubungkan lewat kunci',
				tables: [
					{ name: 'users', cols: ['PK id', 'email', 'nama', 'dibuat_pada'], tone: 'cyan' },
					{ name: 'orders', cols: ['PK id', 'FK user_id', 'total', 'status'], tone: 'violet' },
					{ name: 'order_items', cols: ['PK id', 'FK order_id', 'FK product_id', 'qty'], tone: 'ok' }
				],
				relations: [
					{ from: 0, to: 1, label: '1 .. n', tone: 'cyan' },
					{ from: 1, to: 2, label: '1 .. n', tone: 'violet' }
				],
				footnote: 'JOIN menggabungkan kembali lewat FK; indeks pada FK mempercepat pencarian'
			})
	},
	{
		scope: 'backend-developer',
		bab: 4,
		slug: 'backend-developer-b4',
		caption:
			'Gambar 25.1: Lima langkah optimasi ORM — model, eager loading, profil query, indeks, hingga cache agar kueri tetap ramping.',
		svg: () =>
			renderFlow({
				kicker: K('backend-developer', 4),
				title: 'ORM & Query Optimization',
				sub: 'nyaman menulis kode tanpa mengorbankan kecepatan basis data',
				steps: [
					{ label: 'Tulis model ORM', sub: 'entitas ↔ tabel', tone: 'cyan' },
					{ label: 'Relasi & eager loading', sub: 'hindari N+1', tone: 'violet' },
					{ label: 'Profil query', sub: 'EXPLAIN ANALYZE', tone: 'warn' },
					{ label: 'Tambah index', sub: 'partial + composite', tone: 'ok' },
					{ label: 'Cache hasil', sub: 'TTL 60 detik', tone: 'cyan' }
				]
			})
	},
	{
		scope: 'backend-developer',
		bab: 5,
		slug: 'backend-developer-b5',
		caption:
			'Gambar 26.1: Alur autentikasi JWT — server memeriksa token, memberi akses bila valid, menolak 401 bila tidak, dan mengizinkan refresh.',
		svg: () =>
			renderFlowchart({
				kicker: K('backend-developer', 5),
				title: 'Autentikasi & Keamanan',
				sub: 'JWT, hashing, CORS, dan rate limiting dalam satu alur',
				condition: 'token JWT valid?',
				yes: 'verifikasi signature & kadaluarsa',
				no: '401 Unauthorized',
				after: 'proses & balas data',
				loop: 'refresh token lalu coba lagi'
			})
	},
	{
		scope: 'backend-developer',
		bab: 6,
		slug: 'backend-developer-b6',
		caption:
			'Gambar 27.1: Dua jalur percepat — Redis sebagai cache hit/miss dan RabbitMQ sebagai antrean yang diproses worker sebelum menulis ke database.',
		svg: () =>
			renderArch({
				kicker: K('backend-developer', 6),
				title: 'Caching & Message Queues',
				sub: 'jawaban cepat dari cache, pekerjaan berat dari antrean',
				columns: [
					{ title: 'APLIKASI', nodes: [{ label: 'API Server', sub: 'layanan utama', tone: 'cyan' }] },
					{
						title: 'PERCEPAT & ANTRE',
						nodes: [
							{ label: 'Redis Cache', sub: 'hit / miss', tone: 'ok' },
							{ label: 'RabbitMQ Queue', sub: 'tugas berat', tone: 'warn' }
						]
					},
					{
						title: 'PEMROSES',
						nodes: [
							{ label: 'Worker', sub: 'consumer', tone: 'violet' },
							{ label: 'Database', sub: 'sumber data', tone: 'cyan' }
						]
					}
				],
				edges: [
					{ from: [0, 0], to: [1, 0], label: 'GET', tone: 'ok' },
					{ from: [1, 0], to: [2, 1], label: 'miss', tone: 'cyan' },
					{ from: [1, 1], to: [2, 0], label: 'pekerjaan', tone: 'warn' },
					{ from: [2, 0], to: [2, 1], tone: 'violet' }
				],
				footnote: 'cache menghindari kerja ulang; antrean menunda kerja berat agar request tidak menumpuk'
			})
	},
	{
		scope: 'backend-developer',
		bab: 7,
		slug: 'backend-developer-b7',
		caption:
			'Gambar 28.1: Pipeline CI/CD dari build image, pengujian otomatis, deploy staging, smoke test, hingga rilis produksi bertahap.',
		svg: () =>
			renderFlow({
				kicker: K('backend-developer', 7),
				title: 'Microservices & CI/CD',
				sub: 'setiap layanan diuji dan dirilis lewat pipeline otomatis',
				steps: [
					{ label: 'Build image', sub: 'Docker · semver', tone: 'cyan' },
					{ label: 'Unit & integration test', sub: 'CI runner', tone: 'violet' },
					{ label: 'Deploy staging', sub: 'Kubernetes', tone: 'warn' },
					{ label: 'Smoke test QA', sub: 'Playwright', tone: 'ok' },
					{ label: 'Rilis produksi', sub: 'canary 10%', tone: 'cyan' }
				]
			})
	},

	/* ----------------------------------------------------- data-analyst */
	{
		scope: 'data-analyst',
		bab: 1,
		slug: 'data-analyst-b1',
		caption: 'Gambar 29.1: Alur persiapan data — ambil, cek, bersihkan, standarkan, simpan.',
		svg: () =>
			renderFlow({
				kicker: K('data-analyst', 1),
				title: 'Pembersihan & Persiapan Data',
				sub: 'garbage in, garbage out — kualitas data menentukan kualitas kesimpulan',
				steps: [
					{ label: 'Ambil data', sub: 'read_csv', tone: 'cyan' },
					{ label: 'Cek kualitas', sub: 'isna · duplicated', tone: 'warn' },
					{ label: 'Bersihkan', sub: 'drop · impute', tone: 'err' },
					{ label: 'Standarkan', sub: 'to_datetime', tone: 'violet' },
					{ label: 'Simpan', sub: 'to_csv', tone: 'ok' }
				]
			})
	},
	{
		scope: 'data-analyst',
		bab: 2,
		slug: 'data-analyst-b2',
		caption:
			'Gambar 30.1: Tiga tampilan EDA — histogram distribusi, boxplot kuartil dan outlier, serta scatter hubungan antarvariabel.',
		svg: () =>
			renderChart({
				kicker: K('data-analyst', 2),
				title: 'Analisis Eksploratif (EDA)',
				sub: 'lihat bentuk data, ringkas, lalu cari hubungannya',
				chart: 'trio',
				panels: [
					{ label: 'Distribusi nilai', kind: 'hist' },
					{ label: 'Sebaran & outlier', kind: 'box' },
					{ label: 'Hubungan variabel', kind: 'scatter' }
				],
				footnote: 'statistik deskriptif: mean, median, modus, simpangan baku — ringkas sebelum menyimpulkan'
			})
	},
	{
		scope: 'data-analyst',
		bab: 3,
		slug: 'data-analyst-b3',
		caption:
			'Gambar 31.1: Rangkaian SQL analitik — GROUP BY, fungsi jendela OVER, peringkat, running total, LAG/LEAD, hingga CTE bertingkat.',
		svg: () =>
			renderLadder({
				kicker: K('data-analyst', 3),
				title: 'Advanced SQL untuk Analisis',
				sub: 'agregasi dan fungsi jendela tanpa menggabungkan baris asal',
				items: [
					{ label: 'GROUP BY + agregasi', sub: 'SUM · COUNT · AVG', tone: 'cyan' },
					{ label: 'OVER (PARTITION BY)', sub: 'nilai per kelompok', tone: 'violet' },
					{ label: 'ROW_NUMBER()', sub: 'peringkat baris' },
					{ label: 'SUM() OVER', sub: 'running total' },
					{ label: 'LAG / LEAD', sub: 'bandingkan baris sebelumnya' },
					{ label: 'CTE (WITH)', sub: 'query bertingkat', tone: 'ok' }
				],
				groups: [
					{ label: 'Agregasi klasik', from: 0, to: 0, tone: 'cyan' },
					{
						label: 'Fungsi jendela',
						sub: 'nilai dihitung per partisi tanpa menggabungkan baris',
						from: 1,
						to: 4,
						tone: 'violet'
					},
					{ label: 'CTE', from: 5, to: 5, tone: 'ok' }
				],
				footnote: 'rantai CTE menjaga kueri panjang tetap terbaca dan bisa diuji bertahap'
			})
	},
	{
		scope: 'data-analyst',
		bab: 4,
		slug: 'data-analyst-b4',
		caption:
			'Gambar 32.1: Panduan memilih chart — tren pakai line, perbandingan bar, komposisi pie/donut, distribusi histogram, beserta hal yang harus dihindari.',
		svg: () =>
			renderMatrix({
				kicker: K('data-analyst', 4),
				title: 'Visualisasi Data & Storytelling',
				sub: 'pilih grafik dari pertanyaannya, bukan dari yang paling cantik',
				cols: ['Tren', 'Perbandingan', 'Komposisi', 'Distribusi'],
				rows: [
					{
						label: 'Chart yang tepat',
						sub: 'Pertanyaan',
						cells: [
							{ text: 'Line', tone: 'cyan' },
							{ text: 'Bar', tone: 'ok' },
							{ text: 'Pie / donut', tone: 'warn' },
							{ text: 'Histogram', tone: 'violet' }
						]
					},
					{
						label: 'Contoh pertanyaan',
						cells: [
							{ text: 'Bagaimana penjualan per bulan?' },
							{ text: 'Wilayah mana teratas?' },
							{ text: 'Porsi tiap kategori?' },
							{ text: 'Sebaran usia pelanggan?' }
						]
					},
					{
						label: 'Hindari',
						cells: [
							{ text: 'lebih dari 20 titik' },
							{ text: 'terlalu banyak kategori' },
							{ text: 'lebih dari 5 bagian' },
							{ text: 'data kategorikal' }
						]
					}
				],
				footnote: 'satu grafik, satu pesan — beri judul yang menyebut kesimpulannya'
			})
	},
	{
		scope: 'data-analyst',
		bab: 5,
		slug: 'data-analyst-b5',
		caption:
			'Gambar 33.1: Peta fungsi inti pandas dan numpy beserta urutan kerja analisis — muat, rapikan, ringkas, tampilkan.',
		svg: () =>
			renderStructure({
				kicker: K('data-analyst', 5),
				title: 'Python untuk Data Analysis',
				sub: 'pandas untuk tabel, numpy untuk angka',
				panels: [
					{
						title: 'pandas',
						type: 'rows',
						rows: [
							['read_csv', 'muat data'],
							['df.shape', 'baris × kolom'],
							['groupby', 'agregasi'],
							['merge', 'gabung tabel']
						],
						caption: 'API inti 80% pekerjaan'
					},
					{
						title: 'numpy',
						type: 'rows',
						rows: [
							['np.array', 'vektor numerik'],
							['np.mean', 'rata-rata'],
							['np.where', 'pilih kondisi'],
							['np.linspace', 'rentang nilai']
						],
						caption: 'operasi vektor yang cepat'
					},
					{
						title: 'Alur kerja',
						type: 'rows',
						rows: [
							['load', 'baca'],
							['clean', 'rapikan'],
							['aggregate', 'ringkas'],
							['visualize', 'tampilkan']
						],
						caption: 'urutan khas analisis'
					}
				],
				footnote: 'DataFrame = tabel dua dimensi; Series = satu kolomnya'
			})
	},
	{
		scope: 'data-analyst',
		bab: 6,
		slug: 'data-analyst-b6',
		caption:
			'Gambar 34.1: Kurva normal dengan rerata populasi μ dan daerah p-value — H0 ditolak hanya bila data jatuh di ekor ekstrem.',
		svg: () =>
			renderChart({
				kicker: K('data-analyst', 6),
				title: 'Pengujian Hipotesis',
				sub: 'uji apakah perbedaan yang terlihat lebih dari sekadar kebetulan',
				chart: 'bell',
				label: 'H0: μ = μ0 — sebaran bila hipotesis nol benar',
				footnote: 'p-value kecil (< 0.05) → tolak H0; selalu cek asumsi sebelum mengambil kesimpulan'
			})
	},
	{
		scope: 'data-analyst',
		bab: 7,
		slug: 'data-analyst-b7',
		caption:
			'Gambar 35.1: Kerangka executive dashboard — kartu KPI dengan delta, tren pendapatan, panel filter, dan tabel ringkasan per wilayah.',
		svg: () =>
			renderMockup({
				kicker: K('data-analyst', 7),
				title: 'Executive Dashboard & Pelaporan',
				sub: 'satu layar untuk keputusan mingguan pimpinan',
				variant: 'dashboard',
				kpis: [
					{ label: 'Pendapatan', value: 'Rp 4,8 M', delta: '+12,4%' },
					{ label: 'Pesanan', value: '18.240', delta: '+6,1%' },
					{ label: 'Konversi', value: '3,2%', delta: '-0,4%' },
					{ label: 'Rata-rata keranjang', value: 'Rp 263 k', delta: '+2,0%' }
				],
				chartLabel: 'TREN PENDAPATAN 30 HARI',
				rows: [
					['Wilayah', 'Pendapatan', 'Konversi'],
					['Jabodetabek', 'Rp 1,9 M', '3,5%'],
					['Jawa Barat', 'Rp 1,4 M', '3,1%']
				]
			})
	},

	/* --------------------------------------------------- cloud-engineer */
	{
		scope: 'cloud-engineer',
		bab: 1,
		slug: 'cloud-engineer-b1',
		caption:
			'Gambar 36.1: Perbandingan IaaS, PaaS, dan SaaS dari sisi yang dikelola, contoh layanan, analogi, hingga tim yang paling cocok.',
		svg: () =>
			renderMatrix({
				kicker: K('cloud-engineer', 1),
				title: 'Model Layanan Cloud',
				sub: 'makin ke atas modelnya, makin sedikit yang kamu urus',
				cols: ['IaaS', 'PaaS', 'SaaS'],
				rows: [
					{
						label: 'Yang kamu kelola',
						sub: 'Model',
						cells: [
							{ text: 'OS, runtime, kode', tone: 'warn' },
							{ text: 'Kode saja', tone: 'ok' },
							{ text: 'Tidak ada — tinggal pakai', tone: 'cyan' }
						]
					},
					{
						label: 'Contoh layanan',
						cells: [
							{ text: 'EC2, Compute Engine' },
							{ text: 'App Engine, Heroku' },
							{ text: 'Gmail, CRM online' }
						]
					},
					{
						label: 'Analogi',
						cells: [
							{ text: 'Rumah kosong' },
							{ text: 'Apartemen siap huni' },
							{ text: 'Hotel' }
						]
					},
					{
						label: 'Cocok untuk',
						cells: [
							{ text: 'Kontrol penuh' },
							{ text: 'Rilis cepat' },
							{ text: 'Tim non-teknis' }
						]
					}
				]
			})
	},
	{
		scope: 'cloud-engineer',
		bab: 2,
		slug: 'cloud-engineer-b2',
		caption:
			'Gambar 37.1: Perbandingan tumpukan virtual machine (OS tamu di atas hypervisor) dengan kontainer (runtime di atas kernel bersama).',
		svg: () =>
			renderArch({
				kicker: K('cloud-engineer', 2),
				title: 'Virtualisasi vs Kontainerisasi',
				sub: 'VM membawa OS penuh; kontainer berbagi satu kernel',
				columns: [
					{
						title: 'VIRTUAL MACHINE',
						nodes: [
							{ label: 'Aplikasi', sub: 'bebas OS', tone: 'cyan' },
							{ label: 'Sistem Operasi Tamu', sub: 'Ubuntu terpisah', tone: 'warn' },
							{ label: 'Hypervisor', sub: 'KVM / VMware', tone: 'violet' }
						]
					},
					{
						title: 'KONTAINER',
						nodes: [
							{ label: 'Aplikasi', sub: 'bebas OS', tone: 'cyan' },
							{ label: 'Runtime Kontainer', sub: 'Docker · containerd', tone: 'ok' },
							{ label: 'Kernel Linux', sub: 'dipakai bersama', tone: 'ok' }
						]
					}
				],
				edges: [
					{ from: [0, 0], to: [0, 1], tone: 'warn' },
					{ from: [0, 1], to: [0, 2], tone: 'warn' },
					{ from: [1, 0], to: [1, 1], tone: 'ok' },
					{ from: [1, 1], to: [1, 2], tone: 'ok' }
				],
				footnote: 'VM: ratusan MB, start hitungan menit — kontainer: puluhan MB, start milidetik'
			})
	},
	{
		scope: 'cloud-engineer',
		bab: 3,
		slug: 'cloud-engineer-b3',
		caption:
			'Gambar 38.1: Hierarki Kubernetes — Deployment menjaga ReplicaSet, ReplicaSet membuat Pod, lalu Ingress mengarahkan trafik lewat Service.',
		svg: () =>
			renderArch({
				kicker: K('cloud-engineer', 3),
				title: 'Orchestration dengan Kubernetes',
				sub: 'deklarasikan jumlah pod, cluster yang menjaga',
				columns: [
					{
						title: 'DEPLOYMENT',
						nodes: [
							{ label: 'Deployment', sub: 'replika: 3', tone: 'cyan' },
							{ label: 'ReplicaSet', sub: 'jaga jumlah pod', tone: 'violet' }
						]
					},
					{
						title: 'POD',
						nodes: [
							{ label: 'Pod A', sub: 'nginx', tone: 'ok' },
							{ label: 'Pod B', sub: 'nginx', tone: 'ok' },
							{ label: 'Pod C', sub: 'nginx', tone: 'ok' }
						]
					},
					{
						title: 'LAYANAN',
						nodes: [
							{ label: 'Ingress', sub: 'HTTP masuk', tone: 'warn' },
							{ label: 'Service', sub: 'ClusterIP :80', tone: 'cyan' }
						]
					}
				],
				edges: [
					{ from: [0, 0], to: [0, 1], tone: 'cyan' },
					{ from: [0, 1], to: [1, 0], label: 'buat pod', tone: 'violet' },
					{ from: [0, 1], to: [1, 1], tone: 'violet' },
					{ from: [0, 1], to: [1, 2], tone: 'violet' },
					{ from: [2, 0], to: [2, 1], tone: 'warn' }
				],
				footnote: 'pod mati digantikan otomatis — inilah self-healing yang ditawarkan orchestrator'
			})
	},
	{
		scope: 'cloud-engineer',
		bab: 4,
		slug: 'cloud-engineer-b4',
		caption:
			'Gambar 39.1: Arsitektur layanan terkelola — objek storage untuk file, database terkelola untuk data, cache untuk kecepatan, plus backup dan replika.',
		svg: () =>
			renderArch({
				kicker: K('cloud-engineer', 4),
				title: 'Cloud Storage & Managed Database',
				sub: 'data diletakkan sesuai karakternya, semuanya dikelola penyedia',
				columns: [
					{ title: 'APLIKASI', nodes: [{ label: 'Layanan API', sub: 'backend', tone: 'cyan' }] },
					{
						title: 'LAYANAN TERKELOLA',
						nodes: [
							{ label: 'Object Storage', sub: 'S3 / GCS', tone: 'warn' },
							{ label: 'Managed Database', sub: 'Postgres RDS', tone: 'violet' },
							{ label: 'Cache Terkelola', sub: 'Redis ElastiCache', tone: 'ok' }
						]
					},
					{
						title: 'KETAHANAN',
						nodes: [{ label: 'Backup & Replika', sub: 'multi-AZ · PITR', tone: 'cyan' }]
					}
				],
				edges: [
					{ from: [0, 0], to: [1, 0], label: 'unggah', tone: 'warn' },
					{ from: [0, 0], to: [1, 1], label: 'query', tone: 'violet' },
					{ from: [0, 0], to: [1, 2], label: 'cache', tone: 'ok' },
					{ from: [1, 1], to: [2, 0], label: 'backup', tone: 'cyan' }
				],
				footnote: 'S3 untuk file statis, RDS untuk transaksi, Redis untuk jawaban cepat'
			})
	},
	{
		scope: 'cloud-engineer',
		bab: 5,
		slug: 'cloud-engineer-b5',
		caption:
			'Gambar 40.1: Tata letak VPC dengan subnet publik untuk load balancer dan NAT gateway, serta subnet privat untuk aplikasi dan database yang tidak memiliki IP publik.',
		svg: () =>
			renderArch({
				kicker: K('cloud-engineer', 5),
				title: 'Cloud Networking & Keamanan',
				sub: 'VPC memisahkan area publik dan privat lewat subnet',
				columns: [
					{ title: 'PENGGUNA', nodes: [{ label: 'Pengguna', sub: 'browser HTTPS', tone: 'cyan' }] },
					{
						title: 'SUBNET PUBLIK',
						nodes: [
							{ label: 'Load Balancer', sub: '10.0.1.0/24', tone: 'warn' },
							{ label: 'NAT Gateway', sub: 'egres privat', tone: 'warn' }
						]
					},
					{
						title: 'SUBNET PRIVAT',
						nodes: [
							{ label: 'Aplikasi', sub: '10.0.2.0/24', tone: 'ok' },
							{ label: 'Database', sub: '10.0.3.0/24', tone: 'violet' }
						]
					}
				],
				edges: [
					{ from: [0, 0], to: [1, 0], label: 'HTTPS', tone: 'cyan' },
					{ from: [1, 0], to: [2, 0], label: 'API', tone: 'warn' },
					{ from: [2, 0], to: [2, 1], tone: 'violet' },
					{ from: [1, 1], to: [0, 0], label: 'egres', tone: 'ok' }
				],
				footnote: 'IAM mengatur siapa boleh apa — prinsip hak minimum (least privilege)'
			})
	},
	{
		scope: 'cloud-engineer',
		bab: 6,
		slug: 'cloud-engineer-b6',
		caption:
			'Gambar 41.1: Siklus Infrastructure as Code Terraform — tulis HCL, review plan, apply, state tersimpan, lalu ubah konfigurasi berulang.',
		svg: () =>
			renderFlow({
				kicker: K('cloud-engineer', 6),
				title: 'Infrastructure as Code (Terraform)',
				sub: 'infrastruktur dideklarasikan di kode, bukan diklik manual',
				steps: [
					{ label: 'Tulis konfigurasi', sub: 'file .tf (HCL)', tone: 'cyan' },
					{ label: 'Init & review plan', sub: 'terraform init', tone: 'violet' },
					{ label: 'Apply', sub: 'terraform apply', tone: 'warn' },
					{ label: 'State tersimpan', sub: 'backend remote', tone: 'ok' },
					{ label: 'Ubah & ulangi', sub: 'plan lagi', tone: 'cyan' }
				]
			})
	},
	{
		scope: 'cloud-engineer',
		bab: 7,
		slug: 'cloud-engineer-b7',
		caption:
			'Gambar 42.1: Metrik ketahanan cloud — uptime, latensi p95, dan RPO — beserta target yang harus dijaga agar layanan tetap andal.',
		svg: () =>
			renderChart({
				kicker: K('cloud-engineer', 7),
				title: 'Monitoring, Logging & Disaster Recovery',
				sub: 'apa yang dipantau dan seberapa cepat bisa pulih',
				chart: 'gauges',
				metrics: [
					{ label: 'Uptime layanan', value: '99,95%', pct: 0.99, tone: 'ok', target: '≥ 99,9%' },
					{ label: 'Latensi p95 API', value: '180 ms', pct: 0.6, tone: 'warn', target: '≤ 200 ms' },
					{ label: 'RPO — titik pemulihan', value: '15 menit', pct: 0.5, tone: 'ok', target: '≤ 1 jam' }
				],
				footnote: 'RTO = berapa lama pulih; RPO = berapa banyak data yang hilang — keduanya disepakati di awal'
			})
	},

	/* -------------------------------------------------- network-engineer */
	{
		scope: 'network-engineer',
		bab: 1,
		slug: 'network-engineer-b1',
		caption:
			'Gambar 43.1: Tujuh lapisan OSI beserta padanan TCP/IP — dari lapisan fisik (kabel dan bit) sampai aplikasi (HTTP dan DNS).',
		svg: () =>
			renderLadder({
				kicker: K('network-engineer', 1),
				title: 'Model Referensi OSI & TCP/IP',
				sub: 'pecahan masalah jaringan jadi tujuh tanggung jawab yang rapi',
				items: [
					{ label: '7 · Application', sub: 'HTTP, DNS, FTP', tone: 'cyan' },
					{ label: '6 · Presentation', sub: 'enkripsi, kompresi' },
					{ label: '5 · Session', sub: 'kelola sesi' },
					{ label: '4 · Transport', sub: 'TCP · UDP · port', tone: 'violet' },
					{ label: '3 · Network', sub: 'IP · router · ICMP', tone: 'ok' },
					{ label: '2 · Data Link', sub: 'frame · switch · MAC', tone: 'warn' },
					{ label: '1 · Physical', sub: 'kabel · sinyal bit' }
				],
				groups: [
					{
						label: 'Lapisan Aplikasi (TCP/IP)',
						sub: 'Application, Presentation, dan Session digabung jadi satu',
						from: 0,
						to: 2,
						tone: 'cyan'
					},
					{ label: 'Transport', from: 3, to: 3, tone: 'violet' },
					{
						label: 'Internet & Antarmuka',
						sub: 'packet, lalu frame, lalu bit',
						from: 4,
						to: 6,
						tone: 'ok'
					}
				],
				footnote: 'turun lapis: data → segment → packet → frame → bit; naik lapis: kebalikannya'
			})
	},
	{
		scope: 'network-engineer',
		bab: 2,
		slug: 'network-engineer-b2',
		caption:
			'Gambar 44.1: Cara membaca alamat IPv4 dan CIDR, contoh pembagian subnet VLSM, serta empat langkah menghitung subnet.',
		svg: () =>
			renderStructure({
				kicker: K('network-engineer', 2),
				title: 'Pengalamatan IP & Subnetting',
				sub: 'satu blok alamat dibagi sesuai kebutuhan tiap segmen',
				panels: [
					{
						title: 'Membaca Alamat IPv4',
						type: 'rows',
						rows: [
							['Oktet', '192 . 168 . 10 . 25'],
							['CIDR', '/24'],
							['Netmask', '255.255.255.0'],
							['Ukuran', '256 alamat · 254 host']
						],
						caption: 'bagian jaringan di kiri, host di kanan'
					},
					{
						title: 'Contoh VLSM',
						type: 'grid',
						cols: ['Subnet', 'Rentang', 'Peruntukan'],
						rows: [
							['10.0.0.0/24', '.0 – .254', 'Server'],
							['10.0.1.0/26', '.0 – .62', 'Kantor'],
							['10.0.1.64/26', '.64 – .126', 'Wi-Fi']
						],
						caption: 'prioritaskan segmen padat lebih dulu'
					},
					{
						title: 'Langkah CIDR',
						type: 'rows',
						rows: [
							['1', 'hitung kebutuhan host'],
							['2', 'pilih prefix (/26 → 62)'],
							['3', 'catat network & broadcast'],
							['4', 'uji dengan ping']
						],
						caption: 'urutan menghitung subnet'
					}
				],
				footnote: 'prefix makin besar ( /24 → /26 ), blok makin kecil dan host makin sedikit'
			})
	},
	{
		scope: 'network-engineer',
		bab: 3,
		slug: 'network-engineer-b3',
		caption:
			'Gambar 45.1: Alur switching — access port memisahkan VLAN 10 dan 20, trunk 802.1Q membawa keduanya, lalu router menghubungkan antar-VLAN.',
		svg: () =>
			renderArch({
				kicker: K('network-engineer', 3),
				title: 'Switching & VLAN',
				sub: 'satu switch, beberapa jaringan logis yang terpisah',
				columns: [
					{
						title: 'ACCESS PORT',
						nodes: [
							{ label: 'PC · VLAN 10', sub: '10.10.10.0/24', tone: 'cyan' },
							{ label: 'PC · VLAN 20', sub: '10.10.20.0/24', tone: 'warn' }
						]
					},
					{
						title: 'TRUNK 802.1Q',
						nodes: [{ label: 'Switch L2', sub: 'tag & teruskan', tone: 'violet' }]
					},
					{
						title: 'GABUNG L3',
						nodes: [{ label: 'Router / L3 Switch', sub: 'antar-VLAN', tone: 'ok' }]
					}
				],
				edges: [
					{ from: [0, 0], to: [1, 0], label: 'access', tone: 'cyan' },
					{ from: [0, 1], to: [1, 0], label: 'access', tone: 'warn' },
					{ from: [1, 0], to: [2, 0], label: 'trunk', tone: 'violet' }
				],
				footnote: 'broadcast dipisah per VLAN — trafik yang tidak perlu tidak sampai ke segmen lain'
			})
	},
	{
		scope: 'network-engineer',
		bab: 4,
		slug: 'network-engineer-b4',
		caption:
			'Gambar 46.1: Rute dari host lokal ke internet — routing statis dan OSPF di dalam jaringan, lalu BGP menuju otonomi sistem lain.',
		svg: () =>
			renderArch({
				kicker: K('network-engineer', 4),
				title: 'Routing Protocol',
				sub: 'router bertukar informasi rute untuk menemukan jalur terbaik',
				columns: [
					{
						title: 'JARINGAN LOKAL',
						nodes: [
							{ label: 'Host A', sub: '192.168.1.10', tone: 'cyan' },
							{ label: 'Router R1', sub: 'OSPF area 0', tone: 'ok' }
						]
					},
					{
						title: 'TRANSIT',
						nodes: [
							{ label: 'Router R2', sub: 'OSPF cost 10', tone: 'violet' },
							{ label: 'Router R3', sub: 'gateway edge', tone: 'warn' }
						]
					},
					{
						title: 'JARINGAN LUAR',
						nodes: [{ label: 'Internet / AS lain', sub: 'BGP AS64512', tone: 'cyan' }]
					}
				],
				edges: [
					{ from: [0, 0], to: [0, 1], tone: 'cyan' },
					{ from: [0, 1], to: [1, 0], label: 'OSPF', tone: 'ok' },
					{ from: [1, 0], to: [1, 1], tone: 'violet' },
					{ from: [1, 1], to: [2, 0], label: 'BGP', tone: 'warn' }
				],
				footnote: 'statis = tulis jalurnya sendiri; dinamis = router saling mengabarkan perubahan'
			})
	},
	{
		scope: 'network-engineer',
		bab: 5,
		slug: 'network-engineer-b5',
		caption:
			'Gambar 47.1: Rantai pertahanan jaringan — firewall menyaring, NAT menerjemahkan, VPN mengenkripsi, inspeksi memeriksa, lalu log mencatat.',
		svg: () =>
			renderFlow({
				kicker: K('network-engineer', 5),
				title: 'Network Security',
				sub: 'lapisan demi lapisan sebelum paket sampai ke tujuan',
				steps: [
					{ label: 'Filter Firewall', sub: 'aturan port/IP', tone: 'err' },
					{ label: 'Terjemah NAT', sub: 'IP publik ↔ privat', tone: 'warn' },
					{ label: 'Enkripsi VPN', sub: 'IPSec / TLS', tone: 'violet' },
					{ label: 'Inspeksi paket', sub: 'IDS / IPS', tone: 'cyan' },
					{ label: 'Catat log', sub: 'jejak audit', tone: 'ok' }
				]
			})
	},
	{
		scope: 'network-engineer',
		bab: 6,
		slug: 'network-engineer-b6',
		caption:
			'Gambar 48.1: Urutan diagnosa jaringan — ping uji hidup, traceroute jejak rute, cek DNS, cek DHCP, lalu Wireshark untuk detail paket.',
		svg: () =>
			renderFlow({
				kicker: K('network-engineer', 6),
				title: 'Protokol & Diagnostik Jaringan',
				sub: 'dari pemeriksaan paling sederhana ke yang paling detail',
				steps: [
					{ label: 'Ping', sub: 'uji konektivitas', tone: 'cyan' },
					{ label: 'Traceroute', sub: 'jejak rute', tone: 'violet' },
					{ label: 'Cek DNS', sub: 'resolve nama', tone: 'warn' },
					{ label: 'Cek DHCP', sub: 'lease & IP', tone: 'ok' },
					{ label: 'Wireshark', sub: 'tangkap paket', tone: 'cyan' }
				]
			})
	},
	{
		scope: 'network-engineer',
		bab: 7,
		slug: 'network-engineer-b7',
		caption:
			'Gambar 49.1: Alur otomasi jaringan — temukan host, kumpulkan fakta konfigurasi, terapkan perubahan, validasi hasil, lalu simpan di version control.',
		svg: () =>
			renderLadder({
				kicker: K('network-engineer', 7),
				title: 'Otomasi Jaringan (Python/Ansible)',
				sub: 'perubahan berulang dijalankan skrip, bukan diketik manual',
				items: [
					{ label: 'Temukan host & fakta', sub: 'inventory · nornir', tone: 'cyan' },
					{ label: 'Kumpulkan konfigurasi', sub: 'ios_facts · napalm', tone: 'violet' },
					{ label: 'Terapkan perubahan', sub: 'playbook · netmiko', tone: 'warn' },
					{ label: 'Validasi hasil', sub: 'ping test · diff', tone: 'ok' },
					{ label: 'Version control & CI', sub: 'git + pipeline', tone: 'cyan' }
				],
				groups: [
					{
						label: 'Fase discovery',
						sub: 'baca dulu kondisi sebelum menyentuh perangkat',
						from: 0,
						to: 1,
						tone: 'cyan'
					},
					{
						label: 'Fase perubahan',
						sub: 'terapkan lalu buktikan hasilnya',
						from: 2,
						to: 3,
						tone: 'warn'
					},
					{ label: 'Fase rilis', from: 4, to: 4, tone: 'ok' }
				],
				footnote: 'Ansible bersifat deklaratif dan idempoten; Python imperatif untuk logika kustom'
			})
	}
];
