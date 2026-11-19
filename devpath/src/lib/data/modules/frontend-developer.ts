import type { BabModule } from '$lib/data/types';

export const modules: BabModule[] = [
	{
		id: 15,
		scope_id: 'frontend-developer',
		bab_number: 1,
		title: 'HTML5 Semantik & Aksesibilitas Web (A11y)',
		subtitle: 'Struktur & Aksesibilitas',
		explanation:
			'Kalau sebuah website itu rumah, maka HTML adalah kerangka bangunannya: dinding, ruangan, pintu, dan atap. Banyak pemula membangun rumah hanya dari tumpukan `div` yang tidak bermakna, sehingga semua bagian terlihat seperti kotak polos yang seragam. Padahal HTML5 sudah menyediakan tag **semantic** yang perannya jelas: `<header>` untuk bagian atas halaman, `<nav>` untuk navigasi, `<main>` untuk konten utama, `<article>` untuk tulisan yang berdiri sendiri, dan `<footer>` untuk bagian bawah. Tag semantic ini ibarat label ruangan yang benar — browser, mesin pencari, dan screen reader langsung paham bahwa blok tersebut navigasi, bukan sekadar wadah kosong.\n\nAksesibilitas web atau A11y berarti halaman kamu tetap bisa dipakai oleh semua orang, termasuk penyandang disabilitas yang mengandalkan screen reader atau navigasi keyboard. Caranya tidak rumit: satu halaman punya satu `<h1>`, urutan heading tidak melompat dari `<h1>` ke `<h3>`, setiap `<img>` punya `alt`, dan setiap `<input>` punya `<label>` dengan atribut `for` yang cocok. Konten interaktif juga wajib bisa dicapai lewat tombol Tab dan diaktifkan dengan Enter atau Space, itulah alasan kamu memakai `<button>` alih-alih `<div onclick>`. Manfaatnya dobel: pengguna pembaca layar mendapat petunjuk yang jelas dan mesin pencari mengindeks struktur halaman lebih akurat.\n\nSebagai studi kasus, bayangkan halaman profil sekolah yang seluruh isinya `<div class="kotak">`. Screen reader hanya membacakan teks tanpa urutan, pengguna keyboard tersesat karena menu tidak punya fokus, dan mesin pencari kehilangan konteks heading. Setelah ditulis ulang dengan markup semantic, developer lain juga lebih mudah merawat kode karena peran tiap blok langsung terbaca dari tagnya. Aksesibilitas bukan fitur tambahan, melainkan bagian dari kualitas fondasi.',
		code_snippet: `<!-- Formulir kontak yang aksesibel -->
<form>
  <label for="email">Alamat email</label>
  <input id="email" type="email" name="email" required>

  <fieldset>
    <legend>Pilih topik</legend>
    <input id="html" type="radio" name="topik" value="html">
    <label for="html">HTML</label>
    <input id="css" type="radio" name="topik" value="css">
    <label for="css">CSS</label>
  </fieldset>

  <button type="submit">Kirim</button>
</form>`,
		code_lang: 'html',
		code_caption: 'kontak.html — formulir semantic dengan label terhubung',
		image_url: '/diagrams/frontend-developer-b1.svg',
		diagram_caption:
			'Gambar 15.1: Struktur dokumen semantik HTML, aturan aksesibilitas (alt, aria-label, fokus keyboard), beserta cara mengujinya.',
		key_points: [
			'Pakai tag semantic seperti `<header>`, `<nav>`, `<main>`, `<article>`, dan `<footer>` agar arti konten terbaca browser, mesin pencari, dan screen reader.',
			'Jaga hierarki heading: satu `<h1>` per halaman, lanjut ke `<h2>` dan `<h3>` tanpa melompat.',
			'Setiap `<img>` wajib punya `alt` dan setiap `<input>` wajib punya `<label>`; interaksi harus bisa dijalankan lewat keyboard.'
		],
		quiz: [
			{
				id: 'frontend-developer-b1-q1',
				question: 'Manakah elemen HTML berikut yang bersifat **semantic**?',
				options: ['`<article>`', '`<div>`', '`<span>`', '`<b>`'],
				correct_answer_index: 0,
				explanation:
					'`<article>` punya makna tersendiri, yaitu konten mandiri yang tetap bermakna walau dipisahkan dari halaman. `<div>` dan `<span>` hanyalah wadah polos untuk keperluan tampilan, sedangkan `<b>` hanya mempertebal teks tanpa menyatakan arti apa pun.'
			},
			{
				id: 'frontend-developer-b1-q2',
				question: 'Apa masalah utama pada potongan markup berikut?',
				code: `<h1>Kelas Belajar Web</h1>\n<h3>Jadwal Pertemuan</h3>`,
				code_lang: 'html',
				code_caption: 'heading.html',
				options: [
					'Tidak ada masalah, heading hanya soal ukuran teks',
					'Hierarki melompat dari h1 ke h3 sehingga struktur konten terputus',
					'Dalam satu halaman tidak boleh ada lebih dari satu heading',
					'`<h3>` hanya boleh dipakai di dalam elemen `<section>`'
				],
				correct_answer_index: 1,
				explanation:
					'Screen reader memakai heading sebagai daftar isi halaman, jadi urutannya harus berjenjang: `<h1>`, lalu `<h2>`, baru `<h3>`. Melompati satu tingkat membuat pengguna pembaca layar kehilangan gambaran struktur. Jumlah heading dan aturan `<section>` bukan hal yang membatasi penggunaan heading.'
			},
			{
				id: 'frontend-developer-b1-q3',
				question:
					'Atribut apa yang membuat klik pada `<label>Email</label>` langsung memfokuskan elemen `<input id="surel">`?',
				options: [
					'`href` yang menunjuk ke id input',
					'Cukup `id` pada input tanpa atribut lain',
					'`for` pada label yang cocok persis dengan `id` input',
					'`aria-labelledby` diisi nama label pada kedua elemen'
				],
				correct_answer_index: 2,
				explanation:
					'Pasangan `for` dan `id` adalah cara bawaan HTML menghubungkan label ke input, sehingga area klik menjadi lebih luas dan screen reader menyebutkan label saat fokus. `aria-labelledby` dipakai untuk elemen yang tidak punya label bawaan, bukan sebagai pengganti pasangan `for` dan `id`.'
			},
			{
				id: 'frontend-developer-b1-q4',
				question:
					'Ikon kecil di samping teks judul hanya hiasan karena informasinya sudah tersampaikan oleh teks. Bagaimana penulisan `alt` yang tepat?',
				options: [
					'`alt="ikon"` agar pembaca layar tetap menyebutkan kata ikon',
					'Menghapus atribut `alt` sama sekali dari tag',
					'Mengisi `alt` dengan nama file gambar',
					'`alt=""` kosong agar screen reader melewati gambar dekoratif'
				],
				correct_answer_index: 3,
				explanation:
					'Gambar dekoratif sebaiknya dilewati screen reader karena informasinya sudah ada di teks sebelahnya, dan caranya adalah `alt=""`. Menghapus `alt` justru membuat pembaca layar membacakan nama file, sedangkan mengisi deskripsi hanya menambah informasi yang tidak perlu.'
			},
			{
				id: 'frontend-developer-b1-q5',
				question:
					'Sebuah tombol ikon di navbar dibuat dengan `<div onclick="kirim()">` sehingga tidak bisa dijangkau pengguna keyboard. Apa perbaikan paling tepat?',
				options: [
					'Menggantinya dengan elemen `<button>` yang memang dirancang untuk interaksi keyboard',
					'Menambahkan `style="cursor: pointer"` agar terlihat seperti tombol',
					'Membungkusnya dengan `<span>` supaya struktur lebih ringkas',
					'Memindahkan atribut `onclick` ke elemen `<body>`'
				],
				correct_answer_index: 0,
				explanation:
					'`<button>` sudah punya perilaku default yang dibutuhkan: bisa dijangkau lewat Tab, diaktifkan dengan Enter atau Space, dan punya role yang dikenali screen reader. Mengubah tampilan lewat CSS atau memindahkan handler tidak menambahkan kemampuan keyboard sama sekali.'
			},
			{
				id: 'frontend-developer-b1-q6',
				question: 'Apa yang salah dari potongan markup berikut?',
				code: `<img src="logo.png">\n<p>Selamat datang di DevPath</p>`,
				code_lang: 'html',
				code_caption: 'banner.html',
				options: [
					'Elemen `<p>` tidak boleh langsung mengikuti `<img>`',
					'Gambar tidak punya atribut `alt`, sehingga screen reader membacakan nama file',
					'`src` harus berupa URL absolut, bukan path relatif',
					'Gambar wajib dibungkus `<figure>` agar HTML tetap valid'
				],
				correct_answer_index: 1,
				explanation:
					'Ketika gambar gagal dimuat atau dibaca pembaca layar, `alt` menjadi satu-satunya penggantinya. Tanpa `alt`, pengguna nonvisual mendengar nama berkas yang tidak bermakna. Struktur `<img>` lalu `<p>` tetap valid, path relatif diperbolehkan, dan `<figure>` hanya dibutuhkan bila memang ada keterangan khusus.'
			},
			{
				id: 'frontend-developer-b1-q7',
				question: 'Apa peran utama elemen `<main>`?',
				options: [
					'Menandai bagian navigasi utama situs',
					'Menampung semua elemen duplikat di setiap halaman',
					'Mewakili konten utama yang unik dari halaman, maksimal satu per halaman',
					'Sebagai wadah seluruh elemen termasuk header dan footer'
				],
				correct_answer_index: 2,
				explanation:
					'`<main>` menandai konten utama yang spesifik halaman itu dan hanya boleh muncul sekali, sehingga pengguna screen reader bisa langsung melompat ke landmark tersebut. Navigasi dibawa `<nav>`, sedangkan `<header>` dan `<footer>` berada di luar `<main>`.'
			},
			{
				id: 'frontend-developer-b1-q8',
				question:
					'Pengguna keyboard ingin langsung melompat ke konten utama tanpa menekan Tab puluhan kali. Teknik aksesibilitas yang tepat adalah...?',
				options: [
					'Menambahkan `tabindex="100"` pada `<main>`',
					'Menambah `role="main"` saja pada `<body>`',
					'Memberi atribut `autofocus` pada elemen pertama halaman',
					'Menambahkan skip link tersembunyi yang muncul saat difokuskan'
				],
				correct_answer_index: 3,
				explanation:
					'Skip link adalah tautan pertama di DOM yang menuju konten utama dan baru terlihat ketika menerima fokus. `tabindex` bernilai besar justru mengacaukan urutan fokus alami, `autofocus` membuat pengguna tersesat, dan `role` saja tidak mengubah perjalanan keyboard.'
			},
			{
				id: 'frontend-developer-b1-q9',
				question:
					'Screen reader menyediakan fitur daftar heading untuk memindai halaman. Kebiasaan apa yang membuat daftar itu berguna?',
				code: `<h1>Resep Nasi Goreng</h1>\n<h2>Bahan</h2>\n<h2>Langkah Memasak</h2>\n<h3>Tahap Pertama</h3>`,
				code_lang: 'html',
				code_caption: 'resep.html',
				options: [
					'Menjaga heading berjenjang rapi dari h1 ke h2 lalu h3 sesuai tingkat konten',
					'Menggunakan heading sebanyak mungkin agar halaman terlihat lengkap',
					'Menulis seluruh judul sebagai `<p>` dengan font besar',
					'Menandai semua heading dengan `aria-label` yang sama'
				],
				correct_answer_index: 0,
				explanation:
					'Daftar heading hanya berguna jika tingkatnya mencerminkan struktur nyata konten, sehingga pengguna bisa memilih melompat ke bagian yang diinginkan. Terlalu banyak heading justru membuat daftar berantakan, dan judul berupa `<p>` tidak muncul di daftar tersebut.'
			},
			{
				id: 'frontend-developer-b1-q10',
				question: 'Apa miskonsepsi yang paling sering terjadi soal penggunaan ARIA?',
				options: [
					'`aria-label` bisa menggantikan struktur HTML yang semantic',
					'Elemen HTML native yang tepat biasanya lebih baik daripada ARIA yang menambahkan peran buatan',
					'ARIA hanya berguna untuk pengguna mouse',
					'ARIA membuat halaman menjadi lebih cepat dimuat'
				],
				correct_answer_index: 1,
				explanation:
					'Prinsip pertama ARIA: jangan pakai ARIA kalau elemen HTML sudah tersedia. `<button>` sudah membawa role dan perilaku keyboard bawaan, sedangkan `<div role="button">` masih harus kamu lengkapi sendiri. ARIA bukan peluru ajaib dan tidak memengaruhi kecepatan muat halaman.'
			}
		]
	},
	{
		id: 16,
		scope_id: 'frontend-developer',
		bab_number: 2,
		title: 'Modern CSS Layouting (Flexbox & Grid)',
		subtitle: 'Satu Sumbu & Dua Sumbu',
		explanation:
			'Bayangkan kamu menata barang di satu rel panjang — Flexbox bekerja persis seperti itu: satu sumbu, entah baris atau kolom, dengan seluruh item mengikuti arah tersebut. Kamu hanya perlu menentukan arah lewat `flex-direction`, sebaran lewat `justify-content`, dan perataan lewat `align-items`. Anak dengan `flex: 1` otomatis membagi sisa ruang secara proporsional, sehingga tidak ada yang perlu menghitung lebar secara manual. Flexbox cocok untuk navbar, toolbar, form inline, deretan tombol, dan kasus sederhana seperti menengahkan satu kotak di tengah layar.\n\nGrid berbeda: ia seperti denah ruangan yang membagi area menjadi baris **dan** kolom sekaligus, sehingga kamu bisa menempatkan elemen di posisi mana pun pada dua dimensi. Satuan `fr` membagi sisa ruang secara proporsional, `gap` mengatur jarak antar sel tanpa khawatir margin dobel, dan `grid-template-areas` bahkan memungkinkan kamu menamai area layout seperti `header`, `sidebar`, dan `isi` langsung di dalam kode. Untuk galeri kartu, `repeat(auto-fit, minmax(220px, 1fr))` membuat jumlah kolom menyesuaikan lebar layar dengan sangat sedikit media query.\n\nPada proyek dashboard, keputusan terbesar biasanya bukan soal warna, melainkan pemilihan layout. Sidebar tinggi penuh dengan konten yang mengalir di sampingnya adalah kandidat Grid: tentukan `grid-template-columns: 240px 1fr` dan tingginya akan otomatis mengikuti. Sebaliknya, deretan avatar di bawah judul artikel lebih cocok Flexbox karena semuanya berjalan pada satu baris. Praktik lama memakai `float` bahkan gambar potongan layout sudah tidak diperlukan lagi — deklarasi modern di container membuat anak-anak menyesuaikan diri, dan perawatan jauh lebih mudah saat desain berubah.',
		code_snippet: `/* Flexbox: navbar dengan item di ujung kiri dan kanan */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

/* Grid: galeri kartu yang menyesuaikan lebar layar */
.galeri {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}`,
		code_lang: 'css',
		code_caption: 'layout.css — flexbox dan grid dalam satu file',
		sections: [
			{
				heading: 'Panduan Singkat Memilih Layout',
				body: 'Pakai Flexbox saat tata letaknya satu dimensi, seperti navbar, deretan tombol, atau form inline. Pakai Grid saat kamu mengatur posisi elemen pada dua dimensi sekaligus, misalnya kartu produk, daftar artikel, dashboard, atau kerangka halaman besar.'
			}
		],
		image_url: '/diagrams/frontend-developer-b2.svg',
		diagram_caption:
			'Gambar 16.1: Flexbox menyusun elemen di satu sumbu (justify-content), CSS Grid mengatur dua sumbu sekaligus (grid-template-columns).',
		key_points: [
			'Flexbox mengatur satu sumbu (baris ATAU kolom) — cocok untuk navbar, toolbar, dan menengahkan elemen.',
			'Grid mengatur dua sumbu sekaligus (baris DAN kolom) — cocok untuk layout halaman dan galeri kartu.',
			'`justify-content` mengatur sebaran di sumbu utama, `align-items` di sumbu silang; `gap` selalu lebih rapi daripada margin untuk jarak antar item.'
		],
		quiz: [
			{
				id: 'frontend-developer-b2-q1',
				question: 'Kapan Flexbox lebih cocok digunakan daripada Grid?',
				options: [
					'Saat menata elemen pada dua dimensi sekaligus, baris dan kolom',
					'Saat membuat tabel data dengan banyak baris dan kolom',
					'Saat menata item pada satu sumbu, misalnya navbar atau toolbar',
					'Saat mengatur warna latar belakang halaman'
				],
				correct_answer_index: 2,
				explanation:
					'Flexbox memang dirancang untuk satu dimensi: kamu memilih arah baris atau kolom, lalu mengatur sebarannya. Untuk tata letak dua dimensi seperti tabel atau layout bertitik, Grid lebih tepat. Warna latar belakang tidak ada hubungannya dengan keduanya.'
			},
			{
				id: 'frontend-developer-b2-q2',
				question: 'Bagaimana posisi tiga anak (A, B, C) di dalam container berikut?',
				code: `.baris {\n  display: flex;\n  justify-content: space-between;\n}`,
				code_lang: 'css',
				code_caption: 'flex.css',
				options: [
					'Ketiganya menumpuk rata di sisi kiri',
					'A di kiri, B di tengah, C di kanan',
					'Ketiganya berdempetan di tengah',
					'A di kanan, B di tengah, C di kiri'
				],
				correct_answer_index: 1,
				explanation:
					'`space-between` menaruh anak pertama di ujung kiri, anak terakhir di ujung kanan, lalu menyebarkan sisa ruang kosong secara merata di antaranya. Sehingga A di kiri, B di tengah, dan C di kanan. Untuk menumpuk rata kiri kamu memakai `flex-start`.'
			},
			{
				id: 'frontend-developer-b2-q3',
				question:
					'Kamu ingin logo menempel di kiri navbar dan blok aksi di kanan, sementara tengahnya kosong. Properti yang tepat pada container flex adalah...?',
				options: [
					'`justify-content: space-between` pada container',
					'`text-align: right` pada setiap anak',
					'`position: absolute` pada blok aksi',
					'`margin-left: auto` pada semua anak'
				],
				correct_answer_index: 0,
				explanation:
					'`space-between` memisahkan anak pertama dan terakhir ke dua ujung container sehingga bagian tengah otomatis kosong. `text-align` hanya menyusun teks, `absolute` mengeluarkan elemen dari alur layout, dan `margin-left: auto` pada semua anak justru membuat semuanya menumpuk di kanan.'
			},
			{
				id: 'frontend-developer-b2-q4',
				question: 'Apa miskonsepsi umum tentang properti `gap`?',
				options: [
					'`gap` hanya berlaku untuk CSS Grid dan tidak untuk Flexbox',
					'`gap` menambahkan jarak di luar container sehingga layout mudah meluber',
					'`gap` menggantikan kebutuhan `width` pada setiap anak',
					'`gap` bisa dipakai di Flexbox dan Grid, dan hanya menambah jarak antar item, bukan di sisi luar'
				],
				correct_answer_index: 3,
				explanation:
					'`gap` kini berlaku untuk kedua display ini dan hanya menciptakan ruang di antara item, sehingga item pertama dan terakhir tetap menempel pada tepi container. Ia tidak mengatur lebar anak maupun menambah jarak di sisi luar.'
			},
			{
				id: 'frontend-developer-b2-q5',
				question:
					'Empat kartu harus tampil empat kolom di layar lebar dan dua kolom di layar sempit hanya dengan satu aturan. Cara paling ringkas?',
				options: [
					'Menulis empat media query terpisah untuk tiap lebar layar',
					'`grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`',
					'Menggunakan `flex-wrap: wrap` tanpa menentukan lebar anak',
					'Membuat dua versi HTML, satu untuk desktop dan satu untuk mobile'
				],
				correct_answer_index: 1,
				explanation:
					'`auto-fit` bersama `minmax` membiarkan browser menghitung sendiri berapa banyak kolom yang muat, sehingga aturannya tetap satu tetapi hasilnya menyesuaikan lebar layar. Media query berlebih dan dua versi HTML membuat perawatan jadi dua kali lipat.'
			},
			{
				id: 'frontend-developer-b2-q6',
				question: 'Semua anak menumpuk vertikal, padahal tujuan kamu adalah baris horizontal. Kenapa?',
				code: `.kotak {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}`,
				code_lang: 'css',
				code_caption: 'kotak.css',
				options: [
					'Karena `flex-direction: column` membuat arah utama menjadi vertikal',
					'Karena `display: flex` tidak pernah menghasilkan baris horizontal',
					'Karena `width: 100%` memaksa anak-anak menjadi satu kolom',
					'Karena properti `gap` belum ditambahkan'
				],
				correct_answer_index: 0,
				explanation:
					'Arah utama flex ditentukan oleh `flex-direction`; nilai bawaannya `row` (horizontal), tetapi di sini kamu mengubahnya menjadi `column`. Lebar container dan ketersediaan `gap` tidak memengaruhi arah tata letak.'
			},
			{
				id: 'frontend-developer-b2-q7',
				question:
					'Di dashboard, sidebar kiri dan konten kanan harus memiliki tinggi yang saling menyesuaikan. Pendekatan paling tepat?',
				options: [
					'`position: fixed` pada sidebar dan `margin-left` pada konten',
					'Membungkus keduanya dengan `<table>` agar selalu sejajar',
					'Memakai `display: block` pada keduanya lalu mengatur `float`',
					'Membungkus dengan flex atau grid dua kolom sehingga tinggi anak saling menyesuaikan'
				],
				correct_answer_index: 3,
				explanation:
					'Anak flex secara default membentang mengikuti sumbu silang, jadi sidebar dan konten otomatis setinggi yang terpanjang. `fixed` mengeluarkan sidebar dari alur dokumen, tabel bukan alat layout, dan `float` adalah teknik lama yang rapuh.'
			},
			{
				id: 'frontend-developer-b2-q8',
				question: 'Jika container selebar 900px, berapa lebar masing-masing anak?',
				code: `.grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 0;\n}`,
				code_lang: 'css',
				code_caption: 'dua-kolom.css',
				options: ['450px dan 450px', 'Masing-masing 225px', '300px dan 600px', 'Lebar mengikuti isi teks masing-masing anak'],
				correct_answer_index: 2,
				explanation:
					'`1fr 2fr` membagi ruang menjadi tiga bagian sama besar: anak pertama mendapat satu bagian (900 / 3 = 300px) dan anak kedua dua bagian (600px). Karena `gap: 0`, tidak ada ruang yang terpotong.'
			},
			{
				id: 'frontend-developer-b2-q9',
				question: 'Apa arti satuan `fr` dalam CSS Grid?',
				options: [
					'Satuan pecahan yang mewakili sisa ruang kosong pada container Grid',
					'Satuan tinggi huruf dalam tipografi',
					'Singkatan dari frame rate untuk animasi',
					'Satuan bawaan untuk lebar layar perangkat mobile'
				],
				correct_answer_index: 0,
				explanation:
					'`fr` berarti bagian dari sisa ruang yang tersedia setelah kebutuhan lain dipenuhi, sehingga pembagian tetap proporsional berapa pun lebar layar. Nilainya bukan piksel tetap dan tidak ada hubungannya dengan tipografi maupun animasi.'
			},
			{
				id: 'frontend-developer-b2-q10',
				question:
					'Kamu memakai `margin: 16px` pada tiap kartu dan hasilnya jarak antar kartu terlihat dobel serta tidak rapi di tepi. Apa penyebab sebenarnya?',
				options: [
					'Margin tidak berpengaruh pada jarak antar elemen',
					'Margin otomatis dihapus oleh browser pada container flex',
					'Margin hanya bisa dipakai dengan nilai negatif',
					'Margin anak pertama dan terakhir ikut menambah jarak ke tepi container sehingga spasi terlihat dobel — itulah alasan `gap` lebih disukai'
				],
				correct_answer_index: 3,
				explanation:
					'Margin ditempelkan di sisi luar setiap item, jadi dua item berdekatan menggabungkan margin masing-masing menjadi jarak dobel, sementara item pertama dan terakhir juga menjorok dari tepi. `gap` hanya membuat ruang di antara item sehingga hasilnya konsisten.'
			}
		]
	},
	{
		id: 17,
		scope_id: 'frontend-developer',
		bab_number: 3,
		title: 'Responsive Design & CSS Frameworks (Tailwind)',
		subtitle: 'Mobile-First & Utility Classes',
		explanation:
			'Responsive design berarti satu halaman harus nyaman dibuka di layar 360 piksel maupun 1920 piksel tanpa ada yang terpotong atau terlalu renggang. Praktik terbaik saat ini adalah **mobile-first**: tulis dulu gaya dasar untuk layar kecil, baru tambahkan `@media (min-width: 768px)` untuk memperkaya tampilan tablet dan desktop. Dengan begitu halaman tetap ringan secara default dan kamu hanya menambah gaya saat layar benar-benar punya ruang lebih. Untuk ukuran yang ingin mengalir seperti font judul, pakai `clamp(1.5rem, 4vw, 3rem)` supaya skalanya ikut lebar layar tanpa puluhan breakpoint.\n\nFramework CSS modern seperti Tailwind mengubah cara kamu menulis gaya: alih-alih membuat nama kelas `.card-title` di file terpisah, kamu menempelkan utilitas pendek seperti `flex`, `items-center`, `text-sm`, dan `px-4` langsung di markup. Tailwind hanya menghasilkan CSS yang benar-benar kamu pakai, sehingga bundel tetap kecil dan perubahan tampilan jadi cepat karena semua keputusan ada di satu tempat. Harganya ada: daftar kelas yang panjang perlu dibungkus jadi komponen berulang, dan kamu tetap harus memahami konsep Flexbox, Grid, serta breakpoint — utilitas hanyalah singkatan dari properti CSS biasa.\n\nSebagai studi kasus, tim startup memakai Tailwind untuk mempercepat iterasi desain, tetapi tetap menulis CSS kustom untuk komponen kompleks seperti carousel dan animasi grafik. Kamu bisa menguji responsivitas dengan menyusutkan jendela browser, mengaktifkan device toolbar di DevTools, dan memastikan area sentuh minimal sekitar 44 piksel serta teks tetap terbaca tanpa zoom. Jangan lupa mengecek perangkat sungguhan: emulasi DevTools akurat untuk layout, tetapi tidak sepenuhnya untuk perilaku sentuh dan font bawaan sistem.',
		code_snippet: `/* Mobile-first: gaya dasar untuk layar kecil */
.kartu {
  display: grid;
  gap: 12px;
  padding: 16px;
}

/* Ekskalasi untuk tablet ke atas */
@media (min-width: 768px) {
  .kartu {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 32px;
  }
}`,
		code_lang: 'css',
		code_caption: 'responsive.css — mobile-first dengan min-width',
		image_url: '/diagrams/frontend-developer-b3.svg',
		diagram_caption:
			'Gambar 17.1: Desain mobile-first tiga breakpoint — 320px ponsel, 768px tablet, 1280px desktop — dengan struktur halaman yang menyesuaikan.',
		key_points: [
			'Tulis gaya untuk layar kecil lebih dulu, lalu tambahkan breakpoint dengan `min-width` agar performa default tetap ringan.',
			'`clamp()` membuat ukuran fluid sehingga font dan spasi mengalir tanpa banyak media query.',
			'Tailwind mempercepat iterasi dengan utilitas pendek, tetapi tetap butuh pemahaman CSS asli dan komponen sebagai pengulang.'
		],
		quiz: [
			{
				id: 'frontend-developer-b3-q1',
				question: 'Apa arti pendekatan mobile-first?',
				options: [
					'Membuat dua situs terpisah: versi desktop dan versi mobile',
					'Menulis gaya dasar untuk layar kecil lebih dulu, lalu menambah gaya untuk layar besar lewat min-width',
					'Menghapus sebagian fitur desktop agar halaman termuat lebih cepat',
					'Menempatkan elemen terpenting di pojok kiri atas layar'
				],
				correct_answer_index: 1,
				explanation:
					'Mobile-first berarti titik awal gaya kamu adalah layar terkecil, kemudian tampilan diperkaya ketika ruang tersedia lewat `min-width`. Konsekuensinya halaman dasar selalu paling ringan. Membuat dua situs terpisah justru menggandakan pekerjaan perawatan.'
			},
			{
				id: 'frontend-developer-b3-q2',
				question: 'Manakah media query yang paling sesuai dengan filosofi mobile-first?',
				options: [
					'`@media (min-width: 768px)`',
					'`@media (max-width: 767px)` untuk gaya utama',
					'`@media screen and (max-width: 1920px)`',
					'Media query tidak diperlukan selama memakai Flexbox'
				],
				correct_answer_index: 0,
				explanation:
					'`min-width` berarti gaya ini aktif mulai dari lebar tertentu ke atas, sehingga layar kecil tetap memakai gaya dasar. Pendekatan `max-width` untuk gaya utama justru membalik pola mobile-first, dan Flexbox tidak menggantikan kebutuhan breakpoint.'
			},
			{
				id: 'frontend-developer-b3-q3',
				question: 'Di Tailwind, bagaimana membuat teks menjadi tebal hanya pada layar besar (breakpoint `lg`)?',
				options: ['`font-bold:lg`', '`lg-font-bold`', '`text-bold-lg`', '`lg:font-bold`'],
				correct_answer_index: 3,
				explanation:
					'Variasi responsif Tailwind ditulis dengan prefix breakpoint lalu diikuti titik dua dan utilitas, misalnya `lg:font-bold`. Tiga bentuk lain bukan sintaks Tailwind sehingga tidak menghasilkan gaya apa pun.'
			},
			{
				id: 'frontend-developer-b3-q4',
				question: 'Apa fungsi dari susunan class Tailwind pada potongan ini?',
				code: `<div class="flex items-center justify-between px-4 py-2">\n  <span>Keranjang</span>\n  <span>3 item</span>\n</div>`,
				code_lang: 'html',
				code_caption: 'keranjang.html',
				options: [
					'Menampilkan isi secara vertikal di tengah layar',
					'Menambahkan garis pembatas antar elemen',
					'Membuat isi sejajar horizontal, rata di ujung kiri dan kanan, dengan jarak dalam yang lega',
					'Mengubah warna latar menjadi abu-abu muda'
				],
				correct_answer_index: 2,
				explanation:
					'`flex` mengaktifkan Flexbox, `justify-between` menaruh anak pertama dan terakhir ke dua ujung, sedangkan `items-center` dan padding mengatur perataan serta jarak dalam. Tidak ada utilitas warna maupun border pada potongan tersebut.'
			},
			{
				id: 'frontend-developer-b3-q5',
				question:
					'Tim berdebat: proyek harus memakai Tailwind atau CSS kustom. Pertimbangan paling masuk akal?',
				options: [
					'Tailwind untuk iterasi UI cepat dan konsistensi token desain; CSS kustom untuk komponen yang sangat spesifik — keduanya boleh dipakai bersama',
					'Selalu Tailwind karena CSS kustom dianggap sudah usang',
					'Selalu CSS kustom karena Tailwind selalu menghasilkan file CSS besar',
					'Pilihan ditentukan oleh jumlah pengguna situs'
				],
				correct_answer_index: 0,
				explanation:
					'Keduanya melengkapi: Tailwind mempercepat penyusunan UI berulang dan menjaga konsistensi, sementara CSS kustom lebih nyaman untuk logika styling yang rumit. Tailwind menghasilkan CSS sesuai pemakaian, dan jumlah pengguna tidak menentukan pilihan tooling.'
			},
			{
				id: 'frontend-developer-b3-q6',
				question: 'Kenapa class `md:flex` tidak pernah aktif pada perangkat yang kamu uji?',
				code: `<div class="block md:flex">Konten</div>`,
				code_lang: 'html',
				code_caption: 'kartu.html',
				options: [
					'Karena `md:flex` harus ditulis dalam file CSS terpisah',
					'Karena Tailwind tidak mendukung prefix breakpoint',
					'Karena properti `display` tidak bisa diubah lewat media query',
					'Karena konfigurasi breakpoint `md` tidak cocok dengan lebar layar yang sedang kamu uji'
				],
				correct_answer_index: 3,
				explanation:
					'Prefix `md` hanya aktif ketika lebar layar melewati breakpoint medium. Jika layar masih lebih sempit, gaya dasar `block` tetap berlaku. Bukan berarti Tailwind gagal — kamu hanya perlu memeriksa nilai breakpoint dan lebar layar pengujian.'
			},
			{
				id: 'frontend-developer-b3-q7',
				question:
					'Untuk font judul yang ingin membesar mengikuti lebar layar tanpa banyak media query, rumus CSS yang tepat adalah...?',
				options: ['`font-size: 5vw;` saja', '`font-size: max(16px, 1vw);`', '`font-size: clamp(1.5rem, 4vw, 3rem);`', '`font-size: 100%;`'],
				correct_answer_index: 2,
				explanation:
					'`clamp(min, ideal, max)` memberi batas bawah dan atas sekaligus nilai yang mengikuti viewport, sehingga font tetap terbaca di layar kecil dan tidak berlebihan di layar besar. `vw` tunggal tidak punya batas, sedangkan persen tidak mengikuti lebar layar.'
			},
			{
				id: 'frontend-developer-b3-q8',
				question: 'Apa miskonsepsi umum tentang utility framework seperti Tailwind?',
				options: [
					'Utility classes membuat HTML menjadi sangat panjang dan tidak terbaca',
					'Memakai Tailwind berarti kamu tidak perlu belajar konsep CSS seperti Flexbox dan Grid',
					'Tailwind menghasilkan CSS yang tidak dipakai sehingga ukurannya selalu besar',
					'Tailwind tidak bisa dipakai bersama CSS kustom'
				],
				correct_answer_index: 1,
				explanation:
					'Tailwind hanyalah kumpulan singkatan properti CSS, jadi tanpa paham Flexbox, Grid, dan box model kamu akan kesulitan menyusun tampilan yang benar. Tailwind juga hanya menghasilkan CSS yang dipakai dan tetap bisa digabung dengan CSS kustom.'
			},
			{
				id: 'frontend-developer-b3-q9',
				question: 'Saat menguji tampilan responsif, langkah mana yang paling lengkap?',
				options: [
					'Hanya membuka situs di browser desktop milik sendiri',
					'Memperbesar zoom browser sampai 200 persen',
					'Menjalankan Lighthouse sekali lalu berhenti',
					'Menyusutkan lebar jendela, memakai device toolbar DevTools, dan memverifikasi pada perangkat nyata termasuk perilaku sentuh'
				],
				correct_answer_index: 3,
				explanation:
					'Pengujian responsif yang baik mencakup beberapa lebar layar, emulasi perangkat, dan verifikasi di perangkat asli karena perilaku sentuh serta font sistem tidak bisa ditiru sempurna oleh DevTools. Zoom dan satu audit saja tidak mewakili keragaman perangkat.'
			},
			{
				id: 'frontend-developer-b3-q10',
				question: 'Apa itu breakpoint dalam desain responsif?',
				options: [
					'Titik lebar layar tertentu di mana aturan CSS diubah agar tampilan menyesuaikan',
					'Ukuran file gambar maksimum sebelum dikompresi',
					'Batas jumlah elemen di dalam satu container',
					'Titik di mana script JavaScript berhenti berjalan'
				],
				correct_answer_index: 0,
				explanation:
					'Breakpoint adalah ambang lebar layar yang kamu pilih untuk mengubah tata letak, misalnya dari satu kolom menjadi tiga kolom. Ia tidak berkaitan dengan ukuran aset, jumlah elemen, atau masa hidup script.'
			}
		]
	},
	{
		id: 18,
		scope_id: 'frontend-developer',
		bab_number: 4,
		title: 'JavaScript Fundamentals, DOM Manipulation & Event Handling',
		subtitle: 'Logika, Elemen & Interaksi',
		explanation:
			'JavaScript adalah satu-satunya bahasa yang langsung dieksekusi oleh browser, jadi fondasinya wajib kuat. Mulai dari deklarasi: pakai `const` sebagai default, `let` hanya saat nilai benar-benar berubah, dan hindari `var` karena cakupannya bisa bocor keluar blok. Tipe data yang paling sering kamu jumpai adalah string, number, boolean, null, array, dan object; template literal seperti `Halo, ${nama}` memudahkan pencampuran teks tanpa menjumlahkan string dengan tanda tambah. Fungsi bisa ditulis sebagai deklarasi biasa atau arrow function, dan keduanya dipakai untuk membungkus logika yang ingin dipakai ulang.\n\nSetelah logika paham, kamu berinteraksi dengan halaman lewat DOM. `document.querySelector(".tombol")` mengambil elemen pertama yang cocok, sedangkan `textContent` mengubah teks dengan aman tanpa mengeksekusi HTML. Untuk daftar, kebiasaan baik adalah membuat elemen lewat `document.createElement`, mengisi `textContent`, lalu menyimpan id pada atribut `data-id` sehingga kamu bisa melacak data lewat `dataset.id`. Hindari `innerHTML` untuk konten dari pengguna karena membuka celah XSS — cukup ganti bagian yang berubah, bukan merender ulang seluruh kontainer.\n\nBagian interaksi sering tersandung pada event. `addEventListener` memasang pendengar tanpa menimpa yang lama, dan objek `event` memberi tahu `target` sebagai elemen asal. Karena event menggelembung dari anak ke induk, satu pendengar di container sudah cukup untuk ratusan tombol — teknik ini disebut event delegation. Sebagai studi kasus tombol hapus pada daftar tugas: cukup satu listener di `<ul>`, periksa `event.target.matches(".hapus")`, ambil `data-id`, lalu perbarui array state. Hasilnya tetap berfungsi walau item baru ditambahkan setelah halaman dimuat.',
		code_snippet: `const daftar = document.querySelector('#daftar');
const form = document.querySelector('#form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const item = document.createElement('li');
  item.textContent = event.target.judul.value;
  item.dataset.id = Date.now();
  daftar.appendChild(item);
  event.target.reset();
});`,
		code_lang: 'javascript',
		code_caption: 'app.js — menambah item lewat event listener',
		image_url: '/diagrams/frontend-developer-b4.svg',
		diagram_caption:
			'Gambar 18.1: Siklus manipulasi DOM — pilih elemen, pasang event, ubah tampilan, validasi input, lalu render ulang halaman.',
		key_points: [
			'Gunakan `const` sebagai deklarasi bawaan, `let` untuk nilai yang berubah, dan tinggalkan `var` yang cakupannya bocor.',
			'Ubah konten lewat `textContent` dan `createElement`; hindari `innerHTML` untuk data dari pengguna karena berisiko XSS.',
			'Satu listener di container dengan `event.target` (event delegation) lebih efisien daripada memasang listener di ratusan elemen.'
		],
		quiz: [
			{
				id: 'frontend-developer-b4-q1',
				question: 'Apa perbedaan utama antara `const`, `let`, dan `var`?',
				options: [
					'`const` hanya untuk angka, `let` untuk teks, `var` untuk array',
					'`let` deklarasinya paling aman karena otomatis menjadi global',
					'`var` dan `let` identik, hanya gaya penulisan berbeda',
					'`const` untuk nilai yang tidak diubah ulang, `let` untuk nilai yang berubah, `var` mudah bocor cakupan sehingga jarang dipakai'
				],
				correct_answer_index: 3,
				explanation:
					'`const` mencegah assignment ulang sehingga niat kode jelas, `let` dipakai bila nilai memang berubah, sedangkan `var` punya hoisting yang membuat cakupannya tidak terduga. Bukan soal tipe data maupun sifat global.'
			},
			{
				id: 'frontend-developer-b4-q2',
				question: 'Apa yang muncul di console setelah kode berikut dijalankan?',
				code: `const poin = 10;\nconst status = poin > 5 ? 'lolos' : 'gagal';\nconsole.log(status);`,
				code_lang: 'javascript',
				code_caption: 'nilai.js',
				options: ['undefined', 'gagal', 'lolos', 'Karena tanda tanya salah, kode langsung error'],
				correct_answer_index: 2,
				explanation:
					'Operator ternary bekerja sebagai if-else singkat: bila kondisi bernilai true, nilai pertama yang dipakai. Karena 10 lebih besar dari 5, hasilnya `lolos`. Kode ini valid dan tidak mungkin menghasilkan undefined.'
			},
			{
				id: 'frontend-developer-b4-q3',
				question: 'Untuk mengubah teks di dalam `<p id="pesan">` tanpa risiko XSS, cara terbaik adalah...?',
				options: [
					'document.querySelector("#pesan").innerHTML = data',
					'document.querySelector("#pesan").textContent = data',
					'document.write(data)',
					'document.body.innerHTML += data'
				],
				correct_answer_index: 1,
				explanation:
					'`textContent` memasukkan nilai sebagai teks biasa sehingga tag di dalam data tidak pernah dieksekusi. `innerHTML` dan `innerHTML +=` justru menampilkan string sebagai markup, sedangkan `document.write` menimpa seluruh dokumen.'
			},
			{
				id: 'frontend-developer-b4-q4',
				question:
					'Daftar berisi 200 tombol hapus yang dirender ulang setiap kali data berubah. Strategi pemasangan listener yang paling efisien?',
				options: [
					'Memasang satu `addEventListener` pada container dan memeriksa `event.target` saat ada klik',
					'Memasang listener baru pada setiap tombol setiap kali daftar dirender ulang',
					'Menambahkan atribut `onclick` di setiap tombol',
					'Memeriksa klik tiap detik dengan polling'
				],
				correct_answer_index: 0,
				explanation:
					'Dengan event delegation, satu listener tetap menangani semua tombol termasuk yang baru muncul setelah render ulang. Memasang listener berulang membuat kode lambat dan memori membengkak, sedangkan atribut `onclick` hanya menyimpan satu handler.'
			},
			{
				id: 'frontend-developer-b4-q5',
				question: 'Apa hasil dari kode berikut?',
				code: `const nama = 'Budi';\nnama = 'Andi';\nconsole.log(nama);`,
				code_lang: 'javascript',
				code_caption: 'konstanta.js',
				options: [
					'Budi — perubahan diam-diam diabaikan',
					'Andi — nilai terakhir yang ditulis selalu menang',
					'Error, karena `const` tidak boleh di-assign ulang',
					'undefined, karena console.log berjalan sebelum assignment'
				],
				correct_answer_index: 2,
				explanation:
					'`const` hanya mengizinkan penulisan nilai satu kali; percobaan assignment ulang memicu TypeError di JavaScript modern. Kalau memang nilainya berubah, gunakan `let` sejak awal.'
			},
			{
				id: 'frontend-developer-b4-q6',
				question:
					'Kamu memanggil `stopPropagation()` pada listener anak. Apa yang terjadi pada listener di elemen induk?',
				code: `anak.addEventListener('click', (e) => e.stopPropagation());\ninduk.addEventListener('click', () => console.log('induk'));`,
				code_lang: 'javascript',
				code_caption: 'bubbling.js',
				options: [
					'Listener induk tetap berjalan karena event bubble selalu diteruskan',
					'Listener induk tidak berjalan karena perambatan event dihentikan di anak',
					'Kedua listener error karena `stopPropagation` tidak ada',
					'Listener induk berjalan lebih lambat tetapi tetap muncul'
				],
				correct_answer_index: 1,
				explanation:
					'`stopPropagation` menghentikan event mencapai elemen berikutnya dalam rantai, sehingga handler di induk tidak pernah dipanggil. Kode tetap valid; hanya alur event-nya yang terpotong.'
			},
			{
				id: 'frontend-developer-b4-q7',
				question: 'Apa miskonsepsi umum tentang `innerHTML`?',
				options: [
					'`innerHTML` selalu cepat dan aman untuk menampilkan data dari server',
					'`innerHTML` membutuhkan library tambahan agar berfungsi',
					'`innerHTML` hanya bisa bekerja pada elemen `<div>`',
					'`innerHTML` tidak bisa menyisipkan elemen HTML'
				],
				correct_answer_index: 0,
				explanation:
					'`innerHTML` memang mudah, tetapi ia mengeksekusi string sebagai markup sehingga data dari pengguna bisa menyisipkan skrip berbahaya (XSS). Untuk teks aman gunakan `textContent`, dan `innerHTML` sendiri bekerja di banyak elemen yang boleh berisi anak.'
			},
			{
				id: 'frontend-developer-b4-q8',
				question: 'Bagaimana cara membaca nilai yang diketik pengguna pada elemen `<input id="email">`?',
				options: [
					'document.querySelector("#email").textContent',
					'document.getElementById("email").innerHTML',
					'Variabel window.email tersedia otomatis',
					'document.querySelector("#email").value'
				],
				correct_answer_index: 3,
				explanation:
					'Isi yang diketik pengguna tersimpan pada properti `value`, bukan pada konten anak elemen. Karena itu form selalu dibaca lewat `.value`; `textContent` menghasilkan string kosong untuk input.'
			},
			{
				id: 'frontend-developer-b4-q9',
				question: 'Apa perbedaan `event.target` dan `event.currentTarget` di dalam sebuah listener?',
				options: [
					'`currentTarget` selalu bernilai null pada event klik',
					'`target` adalah elemen asal event, `currentTarget` adalah elemen tempat listener dipasang',
					'`target` khusus untuk keyboard, `currentTarget` untuk mouse',
					'Keduanya identik dan hanya berbeda nama'
				],
				correct_answer_index: 1,
				explanation:
					'Ketika kamu memasang listener di container, `target` menunjuk tombol yang benar-benar diklik, sedangkan `currentTarget` menunjuk container itu sendiri. Perbedaan inilah yang membuat event delegation bisa bekerja.'
			},
			{
				id: 'frontend-developer-b4-q10',
				question: 'Apa gunanya `event.preventDefault()` pada event `submit`?',
				options: [
					'Menghentikan seluruh script JavaScript di halaman',
					'Mencegah event merambat ke elemen induk',
					'Membatalkan aksi bawaan browser seperti reload agar data dikirim lewat JavaScript',
					'Menghapus semua nilai form setelah dikirim'
				],
				correct_answer_index: 2,
				explanation:
					'Bawaan form adalah mengirim data dan memuat ulang halaman; `preventDefault` membatalkannya supaya kamu bisa mengirim lewat fetch dan memperbarui halaman. Untuk menghentikan perambatan gunakan `stopPropagation`.'
			}
		]
	},
	{
		id: 19,
		scope_id: 'frontend-developer',
		bab_number: 5,
		title: 'Asynchronous JavaScript (Promises & Fetch API)',
		subtitle: 'Promise, Await & HTTP',
		explanation:
			'JavaScript pada dasarnya berjalan secara sinkron: satu perintah selesai sebelum berikutnya dimulai. Masalahnya muncul saat permintaan jaringan — kalau menunggu respons server secara blocking, browser akan membeku dan pengguna tidak bisa menggulir halaman sama sekali. Di sinilah mode **asynchronous** bekerja. `Promise` adalah objek yang mewakili nilai masa depan dengan tiga kemungkinan status: pending, fulfilled, atau rejected. Kamu menangkap hasilnya lewat `.then()` dan kegagalannya lewat `.catch()`, atau lebih ringkas dengan `async/await` yang membuat kode asynchronous terlihat berurutan seperti kode biasa.\n\nFetch API adalah cara standar mengambil data. Penting diingat: `fetch` langsung mengembalikan Promise berisi objek `Response`, bukan data JSON-nya. Jadi langkahnya selalu dua tahap: `const res = await fetch(url)` lalu `const data = await res.json()`. Selain itu, `fetch` hanya menolak pada kegagalan koneksi; status 404 atau 500 tetap dianggap sukses sehingga kamu perlu memeriksa `res.ok` sendiri dan melempar error bila perlu. Bungkus seluruhnya dengan `try...catch` agar kegagalan tampil sebagai pesan yang bisa dimengerti pengguna, bukan hilang diam-diam di console.\n\nSebagai studi kasus, halaman dashboard menampilkan tiga kartu data sekaligus: profil, daftar tugas, dan notifikasi. Menjalankan `await` berurutan membuat pengguna menunggu tiga kali lipat padahal ketiganya tidak saling bergantung. Solusinya `Promise.all([fetchProfil(), fetchTugas(), fetchNotifikasi()])` yang berjalan paralel lalu menunggu semuanya selesai. Untuk pengalaman yang baik, tampilkan state loading sebelum request mulai, pesan kosong bila data nol, dan galat yang jelas di blok `catch`. Jangan lupa sediakan `AbortController` untuk membatalkan request lama saat pengguna mengetik cepat di kolom pencarian.',
		code_snippet: `async function muatProfil() {
  try {
    const res = await fetch('/api/profil');
    if (!res.ok) throw new Error('Gagal memuat: ' + res.status);
    const data = await res.json();
    tampilkan(data.nama);
  } catch (err) {
    pesanGagal.textContent = err.message;
  }
}
muatProfil();`,
		code_lang: 'javascript',
		code_caption: 'profil.js — async/await dengan pengecekan res.ok',
		image_url: '/diagrams/frontend-developer-b5.svg',
		diagram: 'http-cycle',
		diagram_caption:
			'Gambar 19.1: Siklus request-response yang dijalankan fetch — request pergi, server memproses, response kembali, hasil dirender, kegagalan ditangkap di catch.',
		sections: [
			{
				heading: 'Tiga State yang Wajib Ditampilkan',
				body: 'Setiap permintaan data punya tiga kemungkinan hasil. Sediakan tampilan untuk loading, data kosong, dan galat. Pengguna jadi tahu apakah aplikasi sedang bekerja, tidak menemukan apa-apa, atau benar-benar gagal — bukan layar kosong yang membingungkan.'
			}
		],
		key_points: [
			'`Promise` punya tiga status: pending, fulfilled, dan rejected; `async/await` hanyalah sintaks yang lebih mudah dibaca.',
			'`fetch` selalu mengembalikan `Response`, jadi body diambil lagi dengan `await res.json()`.',
			'`fetch` tidak error untuk status 4xx/5xx — periksa `res.ok` sendiri dan tangkap kegagalan dengan `try...catch`.'
		],
		quiz: [
			{
				id: 'frontend-developer-b5-q1',
				question: 'Apa status sebuah Promise ketika `fetch` masih menunggu respons dari server?',
				options: ['pending', 'fulfilled', 'rejected', 'undefined'],
				correct_answer_index: 0,
				explanation:
					'Promise dimulai dalam status pending selama pekerjaan belum selesai. Setelah berhasil ia menjadi fulfilled, dan setelah gagal menjadi rejected. Nilai undefined bukan status resmi sebuah Promise.'
			},
			{
				id: 'frontend-developer-b5-q2',
				question: 'Apa urutan keluaran dari kode berikut?',
				code: `console.log('mulai');\nPromise.resolve().then(() => console.log('promise'));\nconsole.log('akhir');`,
				code_lang: 'javascript',
				code_caption: 'urutan.js',
				options: [
					'mulai → promise → akhir',
					'promise → mulai → akhir',
					'mulai → akhir → promise',
					'Hanya "mulai" yang muncul karena Promise error'
				],
				correct_answer_index: 2,
				explanation:
					'Kode sinkron berjalan penuh lebih dulu sehingga `mulai` dan `akhir` tercetak lebih dulu. Callback `.then` masuk antrean microtask dan baru dieksekusi setelah stack sinkron kosong, jadi `promise` paling akhir. Promise tetap dieksekusi, bukan error.'
			},
			{
				id: 'frontend-developer-b5-q3',
				question: 'Apa langkah yang benar untuk mengubah response fetch menjadi objek JavaScript?',
				options: [
					'JSON.parse(await fetch(url))',
					'await fetch(url).text() lalu langsung dipakai sebagai object',
					'fetch(url).json() tanpa await lalu langsung diakses propertinya',
					'const res = await fetch(url) lalu const data = await res.json()'
				],
				correct_answer_index: 3,
				explanation:
					'Fetch memberi objek `Response` yang belum berisi body; `res.json()` mengembalikan Promise lain berisi hasil parse, jadi perlu di-await. Mengakses `.json()` tanpa await membuat propertinya undefined, dan `JSON.parse` tidak bisa menerima objek Response.'
			},
			{
				id: 'frontend-developer-b5-q4',
				question: 'Apa miskonsepsi yang sering terjadi tentang kata kunci `await`?',
				options: [
					'`await` membuat seluruh browser berhenti sampai request selesai',
					'`await` hanya boleh dipakai di dalam fungsi yang ditandai `async`',
					'`await` menghapus kebutuhan `try...catch`',
					'`await` hanya bisa bekerja untuk `fetch`'
				],
				correct_answer_index: 1,
				explanation:
					'`await` hanya valid di dalam fungsi `async` atau top-level module, sehingga sintaks lain akan error. Ia menunda fungsi itu saja, tidak membekukan browser, dan tetap butuh penanganan error meski ada `try...catch`.'
			},
			{
				id: 'frontend-developer-b5-q5',
				question: 'Kenapa blok `catch` berikut tidak pernah aktif ketika server membalas 404?',
				code: `try {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n} catch (err) {\n  console.error('masuk catch');\n}`,
				code_lang: 'javascript',
				code_caption: 'ambil.js',
				options: [
					'Karena `fetch` tidak pernah mengembalikan status 404',
					'Karena `res.json()` otomatis melempar error untuk status error',
					'Karena `fetch` hanya reject pada kegagalan koneksi; status 404 tetap dianggap sukses sehingga perlu pengecekan `res.ok`',
					'Karena `catch` tidak bisa dipakai bersama `await`'
				],
				correct_answer_index: 2,
				explanation:
					'`fetch` menolak hanya bila jaringan gagal; server yang membalas 404 tetap menghasilkan Response yang sukses. Karena itu kamu harus memeriksa `res.ok` dan melempar error sendiri agar masuk blok `catch`.'
			},
			{
				id: 'frontend-developer-b5-q6',
				question:
					'Tiga request yang tidak saling bergantung dijalankan berurutan sehingga total waktu 3 detik. Bagaimana cara memangkasnya?',
				options: [
					'Menjalankannya paralel dengan `Promise.all([...])`',
					'Menambahkan `await` pada tiap baris agar lebih cepat',
					'Mengganti `fetch` dengan `XMLHttpRequest` tanpa Promise',
					'Mengulang request sampai respons terasa cepat'
				],
				correct_answer_index: 0,
				explanation:
					'`Promise.all` menjalankan seluruh promise bersamaan lalu menunggu semuanya, sehingga total waktu mendekati request terlama saja. `await` berurutan justru menumpuk waktu, dan pergantian API tidak mempercepat apapun.'
			},
			{
				id: 'frontend-developer-b5-q7',
				question: 'Apa yang paling tepat ditampilkan saat data sedang dimuat?',
				options: [
					'Halaman kosong tanpa tanda apa pun sampai data datang',
					'State loading seperti spinner atau skeleton, lalu diganti dengan data, dan pesan galat bila request gagal',
					'Membiarkan layout bergeser sendiri saat konten muncul',
					'Alert bawaan browser berisi teks "Loading"'
				],
				correct_answer_index: 1,
				explanation:
					'Pengguna perlu tahu bahwa aplikasi sedang bekerja dan apa yang terjadi bila gagal, sehingga loading dan error state wajib disiapkan. Layar kosong dan alert justru membingungkan serta mengganggu alur pengguna.'
			},
			{
				id: 'frontend-developer-b5-q8',
				question: 'Apa masalah dari pola kode berikut saat memproses banyak data?',
				code: `for (const id of daftarId) {\n  const res = await fetch('/api/item/' + id);\n  hasil.push(await res.json());\n}`,
				code_lang: 'javascript',
				code_caption: 'semua.js',
				options: [
					'Variabel `hasil` harus dideklarasikan dengan `var` agar aman di dalam loop',
					'Loop `for...of` tidak bisa digunakan bersama `await`',
					'Kode pasti error karena path URL harus berupa absolute path',
					'Setiap iterasi menunggu request selesai sehingga total waktu bertambah; untuk data independen `Promise.all` jauh lebih cepat'
				],
				correct_answer_index: 3,
				explanation:
					'Kode ini benar secara sintaks tetapi memproses data satu per satu, jadi waktunya dijumlahkan. Karena tiap id tidak bergantung pada id lain, jalankan semua fetch lalu tunggu bersamaan dengan `Promise.all`.'
			},
			{
				id: 'frontend-developer-b5-q9',
				question: 'Apa perbedaan `res.ok` dan `res.status`?',
				options: [
					'`res.ok` bernilai true untuk status 200-299, `res.status` berisi kode angka seperti 404',
					'Keduanya selalu bernilai sama',
					'`res.status` hanya ada pada response JSON',
					'`res.ok` berisi teks pesan dari server'
				],
				correct_answer_index: 0,
				explanation:
					'`res.ok` adalah pemeriksaan singkat apakah status termasuk keluarga 2xx, sedangkan `res.status` memberi kode angka lengkap untuk log atau pesan galat. Keduanya ada di setiap Response, bukan hanya JSON.'
			},
			{
				id: 'frontend-developer-b5-q10',
				question:
					'Pengguna mengetik cepat di kolom pencarian sehingga beberapa request saling menyusul. Penanganan paling tepat?',
				options: [
					'Membiarkan request terakhir yang datang menimpa hasil lama tanpa pengecekan',
					'Menampilkan semua hasil dari setiap request sekaligus',
					'Menyimpan request aktif pada `AbortController`, membatalkan request sebelumnya, dan hanya menampilkan hasil terbaru',
					'Menggabungkan semua pencarian ke dalam satu request besar'
				],
				correct_answer_index: 2,
				explanation:
					'Dengan membatalkan request lama, hanya query terbaru yang diproses sehingga hasil tidak tertukar dan jaringan tidak terbuang. Menampilkan semua hasil justru membuat daftar kacau, dan menggabungkan query tidak praktis.'
			}
		]
	},
	{
		id: 20,
		scope_id: 'frontend-developer',
		bab_number: 6,
		title: 'State Management & Component Architecture (Svelte)',
		subtitle: 'Komponen & Reaktivitas',
		explanation:
			'Komponen adalah potongan UI yang bisa dipakai ulang: tombol, kartu, navigasi, hingga seluruh halaman. Prinsip dasarnya adalah **satu arah** — data mengalir dari induk ke anak lewat props, sementara anak mengirim kabar kembali lewat callback. Dengan begitu alur informasi mudah dilacak: kamu tahu persis dari mana nilai berasal dan siapa yang mengubahnya. Di Svelte, satu file `.svelte` berisi markup, logika, dan gaya sekaligus, sehingga komponen kecil seperti `<Tombol label="Simpan" onKlik={simpan}>` bisa dibaca utuh dalam satu layar.\n\nYang membuat Svelte menonjol adalah reaktivitas tanpa virtual DOM. Svelte mengompilasi komponen menjadi kode JavaScript biasa saat proses build, jadi perubahan state langsung menyentuh DOM tanpa perbandingan berkas. Di Svelte 5, state ditandai dengan rune `$state`, nilai turunan memakai `$derived`, dan props diterima lewat `$props()`. Sederhananya: ubah nilai yang ditandai, lalu tampilan yang terkait ikut diperbarui otomatis — tanpa menyusun ulang seluruh komponen atau memanggil fungsi render manual.\n\nUntuk state global seperti keranjang belanja, satu komponen saja tidak cukup karena banyak halaman yang perlu membacanya. Pola yang umum: angkat state ke tempat terdekat yang membutuhkannya, dan bila sudah menyebar ke banyak bagian, simpan di store yang bisa dibaca dari mana saja. Sebagai studi kasus, item keranjang ditambahkan lewat tombol pada kartu produk, jumlah di navbar otomatis naik karena membaca store yang sama, lalu total harga memakai nilai turunan dari daftar item. Pisahkan juga komponen presentasional yang hanya menampilkan data dari komponen cerdas yang mengurus logika, supaya pengujian dan perawatan jauh lebih mudah.',
		code_snippet: `<script>
  let { judul, onPilih } = $props();
  let jumlah = $state(0);

  const total = $derived(jumlah * 10);

  function tambah() {
    jumlah += 1;
    onPilih(total);
  }
</script>

<button onclick={tambah}>{judul}: {total}</button>`,
		code_lang: 'html',
		code_caption: 'KartuProduk.svelte — props, state, dan derived dalam satu komponen',
		sections: [
			{
				heading: 'Aturan Komponen yang Sehat',
				body: 'Beri satu komponen satu tanggung jawab, terima data lewat props, dan laporkan perubahan lewat callback. Saat komponen mulai menangani form, daftar, dan modal sekaligus, pecah menjadi bagian yang lebih kecil agar mudah diuji dan dipakai ulang.'
			}
		],
		image_url: '/diagrams/frontend-developer-b6.svg',
		diagram_caption:
			'Gambar 20.1: Alur reaktivitas Svelte — $state menjadi input komponen, $derived menghitung nilai turunan, lalu DOM diperbarui otomatis.',
		key_points: [
			'Data mengalir satu arah: induk mengirim props, anak melaporkan perubahan lewat callback.',
			'Svelte mengompilasi state reaktif ke operasi DOM langsung, sehingga runtime ringan tanpa virtual DOM.',
			'Naikkan state ke induk bila beberapa komponen membutuhkannya; gunakan store untuk state yang dipakai lintas halaman.'
		],
		quiz: [
			{
				id: 'frontend-developer-b6-q1',
				question: 'Apa arti "one-way data flow" dalam arsitektur komponen?',
				options: [
					'Data hanya boleh dikirim lewat jaringan, tidak lewat props',
					'Data mengalir dari induk ke anak lewat props; anak meminta perubahan lewat callback',
					'Semua state disimpan di dalam setiap komponen secara terpisah',
					'Komponen tidak boleh memiliki anak sama sekali'
				],
				correct_answer_index: 1,
				explanation:
					'Pola satu arah membuat sumber data mudah dilacak: nilai selalu turun dari induk dan perubahan dilaporkan naik lewat callback. Kebalikannya, menyalin state ke banyak tempat, membuat sulit menentukan siapa yang paling benar.'
			},
			{
				id: 'frontend-developer-b6-q2',
				question: 'Di Svelte 5, bagaimana cara membuat state lokal yang reaktif?',
				options: ['let jumlah = 0; biasa saja', 'state jumlah = 0', 'this.jumlah = 0', 'let jumlah = $state(0)'],
				correct_answer_index: 3,
				explanation:
					'Rune `$state` menandai nilai sebagai state reaktif sehingga perubahannya memperbarui tampilan terkait. Deklarasi biasa tidak membuat Svelte melacak perubahan, sedangkan sintaks `state` dan `this` bukan bagian dari Svelte.'
			},
			{
				id: 'frontend-developer-b6-q3',
				question: 'Apa yang tampil pada tombol setelah handler dipanggil dua kali?',
				code: `<script>\n  let angka = $state(0);\n</script>\n<button onclick={() => angka += 1}>{angka}</button>`,
				code_lang: 'html',
				code_caption: 'hitung.svelte',
				options: [
					'2, karena state reaktif memperbarui tampilan setiap kali nilainya berubah',
					'0, karena template dirender hanya sekali saat pertama kali',
					'1, karena handler hanya berjalan sekali',
					'Kode error karena `$state` tidak boleh dipakai di dalam handler'
				],
				correct_answer_index: 0,
				explanation:
					'Nilai `$state` yang berubah otomatis memicu pembaruan pada bagian template yang membacanya, jadi angka mengikuti sampai 2. Bukan render sekali kali, dan `$state` memang boleh diubah di dalam handler.'
			},
			{
				id: 'frontend-developer-b6-q4',
				question:
					'Komponen induk ingin menangani aksi yang terjadi di dalam komponen anak. Potongan mana yang benar?',
				code: `<Produk item={item} onPilih={tambahKeKeranjang} />`,
				code_lang: 'html',
				code_caption: 'Daftar.svelte',
				options: [
					'Mengakses DOM anak dari induk dengan document.querySelector',
					'Mengubah state anak langsung dari induk lewat ref',
					'Meneruskan fungsi callback sebagai props, lalu dipanggil anak saat aksi terjadi',
					'Menyimpan logika aksi di variabel global tanpa props'
				],
				correct_answer_index: 2,
				explanation:
					'Callback yang dikirim sebagai props membuat anak cukup memberi tahu, sedangkan keputusan dan perubahan state tetap dipegang induk. Mengambil DOM dari induk membuat kedua komponen saling tergantung dan sulit diuji.'
			},
			{
				id: 'frontend-developer-b6-q5',
				question:
					'State keranjang belanja dibutuhkan oleh navbar, halaman produk, dan halaman checkout. Pendekatan paling tepat?',
				options: [
					'Menyalin state keranjang ke setiap komponen',
					'Menyimpan keranjang di variabel global biasa tanpa reaktivitas',
					'Mengirim data keranjang lewat URL setiap pindah halaman',
					'Menempatkan state di store bersama sehingga semua komponen membaca sumber yang sama dan ikut diperbarui'
				],
				correct_answer_index: 3,
				explanation:
					'Store menyediakan satu sumber kebenaran yang reaktif, sehingga perubahan di satu tempat langsung terbaca di komponen lain. Menyalin state membuat data tidak sinkron, dan variabel biasa tidak memicu pembaruan tampilan.'
			},
			{
				id: 'frontend-developer-b6-q6',
				question: 'Apa yang terjadi saat kamu mencoba menulis ulang nilai hasil `$derived`?',
				code: `let total = $derived(harga * jumlah);\ntotal = 1000;`,
				code_lang: 'javascript',
				code_caption: 'total.js',
				options: [
					'Nilai `$derived` hanya bisa dibaca; menulis ulangnya memicu error karena ia dihitung otomatis dari sumbernya',
					'Nilai berubah menjadi 1000 dan perhitungan dibatalkan permanen',
					'Nilai kembali ke hasil hitungan lama setelah halaman dimuat ulang',
					'Kode diabaikan browser tanpa pesan apa pun'
				],
				correct_answer_index: 0,
				explanation:
					'Derived adalah nilai turunan yang selalu dihitung ulang dari sumbernya, jadi tulisannya tidak boleh diubah. Nilai yang bisa kamu ubah hanyalah state dasar seperti `$state`, bukan hasil `$derived`.'
			},
			{
				id: 'frontend-developer-b6-q7',
				question: 'Apa keunggulan utama Svelte dibanding framework dengan virtual DOM?',
				options: [
					'Svelte tidak memerlukan browser untuk menjalankan aplikasi',
					'Svelte menyimpan seluruh state di server sehingga hemat memori',
					'Svelte mengompilasi komponen menjadi operasi DOM langsung tanpa virtual DOM sehingga runtime lebih ringan',
					'Svelte hanya cocok untuk halaman statis'
				],
				correct_answer_index: 2,
				explanation:
					'Karena komponen dikompilasi lebih dulu, Svelte tidak perlu membandingkan representasi UI di memori setiap render. Browser tetap dibutuhkan, state tetap di klien, dan Svelte dipakai untuk aplikasi interaktif yang besar.'
			},
			{
				id: 'frontend-developer-b6-q8',
				question: 'Kapan sebuah state sebaiknya "diangkat" ke komponen induk?',
				options: [
					'Setiap kali komponen memiliki lebih dari satu baris script',
					'Saat dua komponen saudara atau lebih perlu membaca dan mengubah nilai yang sama',
					'Hanya saat aplikasi punya lebih dari 100 komponen',
					'Saat komponen tidak memiliki CSS'
				],
				correct_answer_index: 1,
				explanation:
					'State diangkat ketika beberapa bagian membutuhkan nilai yang sama, dengan induk sebagai pemilik dan anak sebagai pemakai lewat props. Komponen mandiri tidak perlu menaikkan state hanya karena kodenya panjang.'
			},
			{
				id: 'frontend-developer-b6-q9',
				question: 'Apa miskonsepsi umum tentang komponen?',
				options: [
					'Komponen harus selalu menerima minimal satu props agar bisa dipakai',
					'Props harus selalu berupa teks',
					'Komponen tidak boleh berisi blok script',
					'State lokal harus selalu dipindahkan ke store global'
				],
				correct_answer_index: 0,
				explanation:
					'Komponen yang tidak menerima props apa pun sangat sah, misalnya tombol ikon atau pemberitahuan. Props juga boleh berupa objek, array, atau fungsi, dan store hanya dipakai bila state memang dipakai lintas komponen.'
			},
			{
				id: 'frontend-developer-b6-q10',
				question:
					'Tim membuat komponen `<Halaman>` sepanjang 800 baris yang menangani form, daftar, dan modal sekaligus. Masalah utama dan perbaikan yang tepat?',
				options: [
					'Kodenya lambat karena Svelte tidak mendukung file panjang',
					'Tidak ada masalah selama kode tidak error',
					'File besar sulit dibaca — hapus saja komponen lain agar proyek ringkas',
					'Tanggung jawab terlalu banyak dalam satu komponen; pecah menjadi komponen kecil yang fokus pada satu tugas dengan props dan callback'
				],
				correct_answer_index: 3,
				explanation:
					'Komponen raksasa menyulitkan debugging, pengujian, dan pemakaian ulang karena segalanya saling terkait. Memecahnya menjadi bagian yang fokus membuat alur data jelas dan tiap bagian bisa diuji sendiri.'
			}
		]
	},
	{
		id: 21,
		scope_id: 'frontend-developer',
		bab_number: 7,
		title: 'Web Performance Optimization & Build Tools (Vite)',
		subtitle: 'Core Web Vitals & Vite',
		explanation:
			'Performa bukan sekadar angka di laboratorium — kecepatan langsung memengaruhi berapa lama pengunjung bertahan dan seberapa banyak yang akhirnya membeli. Google mengukurnya lewat Core Web Vitals: LCP untuk seberapa cepat elemen terbesar muncul, INP untuk respons setelah pengguna menekan atau mengetik, dan CLS untuk seberapa banyak tata letak bergeser tanpa perintah. Target praktisnya: LCP di bawah 2,5 detik, INP di bawah 200 milidetik, dan CLS di bawah 0,1. Gambar hero yang belum dikompresi, iklan yang menarik konten ke bawah, atau JavaScript berat di awal halaman adalah penyebab paling sering.\n\nLangkah optimasi yang memberi dampak besar biasanya sederhana: konversi gambar ke WebP atau AVIF, tentukan `width` dan `height` agar CLS nol, tunda gambar di bawah lipatan dengan `loading="lazy"`, dan asinkronkan skrip yang tidak menghalangi render. Di sisi bundel, audit impor yang tidak perlu, pisahkan library besar ke chunk terpisah lewat dynamic `import()`, dan manfaatkan cache browser dengan nama file yang berkonten. Selalu ukur sebelum dan sesudah memakai tab Performance di DevTools serta Lighthouse, karena optimasi tanpa data hanya menebak-nebak.\n\nBuild tool menentukan seberapa cepat kamu bekerja. Pada proyek berbasis Vite, server pengembangan tidak membundel seluruh aplikasi lebih dulu — Vite menyajikan modul ESM asli per file sehingga halaman terbuka hampir seketika dan Hot Module Replacement hanya mengganti bagian yang berubah. Saat produksi, Vite menggabungkan kode dengan Rollup, memecahnya menjadi chunk, lalu mengompres hasilnya. Sebagai studi kasus, katalog dengan ratusan komponen: waktu muat mode pengembangan turun dari puluhan detik ke di bawah dua detik setelah beralih ke Vite, dan halaman produk memuat gambar bertahap berkat lazy loading sehingga pengunjung bisa menggulir tanpa menunggu seluruh aset turun sekaligus.',
		code_snippet: `// Pisahkan library berat dengan dynamic import
const { default: Chart } = await import('./chart.js');

// Modal hanya dimuat saat tombol diklik
tombol.addEventListener('click', async () => {
  const { bukaModal } = await import('./modal.js');
  bukaModal({ judul: 'Detail Produk' });
});

// Render grafik setelah konten utama tampil
requestAnimationFrame(() => {
  new Chart('#grafik', { data, animasi: false });
});`,
		code_lang: 'javascript',
		code_caption: 'optimasi.js — dynamic import dan penundaan render',
		image_url: '/diagrams/frontend-developer-b7.svg',
		diagram_caption:
			'Gambar 21.1: Tiga patokan performa — LCP di bawah 2,5 detik, CLS di bawah 0,1, dan bundel produksi di bawah 300 kB.',
		key_points: [
			'Ukur Core Web Vitals: LCP di bawah 2,5 detik, INP di bawah 200 milidetik, dan CLS di bawah 0,1.',
			'Kompresi gambar, dimensi eksplisit, `loading="lazy"`, dan pemisahan chunk memberi dampak terbesar dengan usaha kecil.',
			'Vite menyajikan modul ESM langsung di mode dev untuk start instan, lalu menggabungkan dan memecah kode saat build produksi.'
		],
		quiz: [
			{
				id: 'frontend-developer-b7-q1',
				question: 'Apa yang dimaksud LCP dalam Core Web Vitals?',
				options: [
					'Jumlah total byte yang diunduh oleh halaman',
					'Waktu respons pertama pengguna berinteraksi dengan halaman',
					'Seberapa cepat elemen terbesar pada viewport awal selesai dirender',
					'Berapa lama server memproses request'
				],
				correct_answer_index: 2,
				explanation:
					'LCP (Largest Contentful Paint) mengukur kapan elemen terbesar seperti hero atau judul selesai tampil, sebagai tanda kapan halaman terasa termuat. Waktu interaksi adalah INP, sedangkan ukuran unduhan tidak diukur metrik ini.'
			},
			{
				id: 'frontend-developer-b7-q2',
				question: 'Gambar besar di bawah lipatan membuat halaman terasa berat. Tindakan paling tepat?',
				options: [
					'Menambahkan `loading="lazy"` serta mengompresi dan mengonversi gambar ke WebP atau AVIF',
					'Menghapus atribut `alt` agar ukuran HTML lebih kecil',
					'Menyimpan gambar sebagai base64 di dalam CSS',
					'Menghindari tag `<img>` dan menggantinya dengan teks'
				],
				correct_answer_index: 0,
				explanation:
					'Lazy loading menunda unduhan gambar di luar viewport dan kompresi mengecilkan berkas, sehingga beban awal jauh lebih ringan. Menghapus `alt` merusak aksesibilitas, base64 justru menambah ukuran CSS, dan menghapus gambar menghilangkan konten.'
			},
			{
				id: 'frontend-developer-b7-q3',
				question: 'Apa miskonsepsi umum tentang CLS?',
				options: [
					'CLS dipengaruhi oleh media query yang dipakai halaman',
					'CLS terjadi ketika elemen bergeser tanpa perintah pengguna, sering karena gambar atau iklan tanpa dimensi yang dialokasikan lebih dulu',
					'CLS hanya muncul saat koneksi internet lambat',
					'CLS dihitung dari jumlah animasi di halaman'
				],
				correct_answer_index: 1,
				explanation:
					'CLS mengukur pergeseran tata letak yang tak terduga, seperti konten yang mendadak mendorong tombol ke bawah. Penyebab utamanya aset tanpa ruang yang dialokasikan, bukan media query, kecepatan jaringan, atau animasi yang memang disengaja.'
			},
			{
				id: 'frontend-developer-b7-q4',
				question:
					'Apa keunggulan utama dev server Vite dibanding bundler konvensional yang membundel seluruh aplikasi sebelum mulai?',
				options: [
					'Vite mengompres semua file menjadi satu berkas sejak awal',
					'Vite menghilangkan kebutuhan JavaScript di lingkungan produksi',
					'Vite hanya bekerja untuk proyek berbasis TypeScript',
					'Vite menyajikan modul ESM per file sehingga start hampir seketika dan HMR mengganti hanya bagian yang berubah'
				],
				correct_answer_index: 3,
				explanation:
					'Karena modul disajikan langsung per file, waktu tunggu awal tidak lagi ditentukan oleh ukuran proyek. Hot Module Replacement juga memperbarui bagian yang berubah saja, sedangkan kompresi dan produksi tetap dilakukan saat proses build.'
			},
			{
				id: 'frontend-developer-b7-q5',
				question:
					'Halaman produk terasa lambat karena tiga library grafik dimuat di seluruh halaman. Perbaikan terbaik?',
				options: [
					'Memuat library grafik hanya saat halaman yang membutuhkannya dibuka lewat dynamic `import()`',
					'Memindahkan ketiganya ke inline script di setiap file HTML',
					'Menggabungkan semua library ke satu file bersama kode utama',
					'Menonaktifkan kompresi agar file lebih mudah dibaca'
				],
				correct_answer_index: 0,
				explanation:
					'Dengan dynamic import, library hanya diunduh dan dieksekusi ketika benar-benar dibutuhkan, sehingga halaman lain tidak menanggung bebannya. Inline dan bundling justru memaksa semua halaman memuat kode yang sama.'
			},
			{
				id: 'frontend-developer-b7-q6',
				question: 'Apa fungsi utama potongan kode berikut?',
				code: `const cache = new Map();\nasync function ambil(url) {\n  if (cache.has(url)) return cache.get(url);\n  const data = await (await fetch(url)).json();\n  cache.set(url, data);\n  return data;\n}`,
				code_lang: 'javascript',
				code_caption: 'cache.js',
				options: [
					'Menghapus data lama secara otomatis',
					'Menyimpan hasil request per URL agar data yang sama tidak diambil berkali-kali dari jaringan',
					'Mengompres payload JSON sebelum dikirim',
					'Mengganti `fetch` dengan `XMLHttpRequest`'
				],
				correct_answer_index: 1,
				explanation:
					'Cache menyimpan hasil berdasarkan URL sehingga permintaan berikutnya untuk sumber yang sama dijawab dari memori tanpa menunggu jaringan. Ia tidak menghapus data, mengompres, maupun mengganti API request.'
			},
			{
				id: 'frontend-developer-b7-q7',
				question: 'Apa perbedaan atribut `defer` dan `async` pada tag `<script>`?',
				options: [
					'Keduanya identik dan bisa dipertukarkan',
					'`async` menunggu DOM selesai, sedangkan `defer` tidak',
					'`defer` hanya berfungsi pada mode produksi',
					'`async` dieksekusi begitu file tersedia tanpa menunggu urutan, `defer` dijalankan setelah HTML selesai diurai sesuai urutan'
				],
				correct_answer_index: 3,
				explanation:
					'`async` cocok untuk skrip mandiri seperti analytics karena bisa dieksekusi kapan pun file tiba, sedangkan `defer` menunggu HTML selesai sekaligus menjaga urutan — cocok untuk skrip yang butuh elemen DOM.'
			},
			{
				id: 'frontend-developer-b7-q8',
				question: 'Apa dampak atribut `loading="lazy"` pada gambar berikut?',
				code: `<img src="/galeri-01.webp" width="800" height="600" alt="Galeri" loading="lazy">`,
				code_lang: 'html',
				code_caption: 'galeri.html',
				options: [
					'Gambar dimuat serentak bersama gambar lain sejak halaman dibuka',
					'Gambar tidak bisa diklik atau diperbesar',
					'Gambar baru diambil browser ketika mendekati viewport, sehingga unduhan awal halaman lebih ringan',
					'Gambar otomatis dikompresi menjadi format AVIF'
				],
				correct_answer_index: 2,
				explanation:
					'Lazy loading menunda pengambilan gambar sampai hampir terlihat di layar, mengurangi permintaan di awal kunjungan. Format berkas tidak berubah dan gambar tetap bisa difungsikan seperti biasa.'
			},
			{
				id: 'frontend-developer-b7-q9',
				question:
					'Saat pengguna menggulir, tombol tiba-tiba meloncat sehingga salah klik. Metrik terkait dan perbaikan yang tepat?',
				options: [
					'INP; perbaikinya dengan menambah animasi transisi',
					'CLS; alokasikan ruang dengan `width`, `height`, atau aspect-ratio sebelum aset dimuat',
					'LCP; ganti semua gambar dengan teks',
					'FPS; kurangi jumlah frame animasi'
				],
				correct_answer_index: 1,
				explanation:
					'Pergeseran tanpa perintah adalah CLS, dan pencegahannya adalah mengalokasikan ruang lebih dulu sehingga elemen lain tidak terdorong. Animasi tidak memperbaiki pergeseran, menghapus gambar merusak konten, dan FPS tidak relevan dengan masalah ini.'
			},
			{
				id: 'frontend-developer-b7-q10',
				question: 'Apa gunanya code splitting pada build produksi?',
				options: [
					'Memecah bundel menjadi potongan yang dimuat sesuai kebutuhan sehingga unduhan awal lebih kecil',
					'Menghapus semua komentar dari kode sumber',
					'Menggabungkan seluruh file menjadi satu agar mudah disalin',
					'Menyembunyikan kode sumber dari pengguna'
				],
				correct_answer_index: 0,
				explanation:
					'Dengan memecah kode, pengguna hanya mengunduh bagian yang dipakai halaman tersebut sehingga waktu muat awal turun. Kompresi dilakukan oleh tool build, bukan dengan menggabungkan semua file menjadi satu.'
			}
		]
	}
];
