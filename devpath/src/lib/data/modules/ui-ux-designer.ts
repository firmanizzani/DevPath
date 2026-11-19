import type { BabModule } from '$lib/data/types';

export const modules: BabModule[] = [
	{
		id: 8,
		scope_id: 'ui-ux-designer',
		bab_number: 1,
		title: 'Design Thinking & Riset Pengguna',
		subtitle: 'Riset & Empati',
		explanation:
			'Banyak desainer pemula langsung membuka aplikasi desain begitu mendapat permintaan, ibarat dokter yang meresepkan obat sebelum memeriksa pasien. Padahal pekerjaan pertama adalah memahami masalahnya: siapa penggunanya, sedang berusaha menyelesaikan apa, dan di mana titik sakitnya. Di sinilah **design thinking** dipakai, yaitu alur berputar dari empati (Empathize), merumuskan masalah (Define), mencari ide (Ideate), membuat purwarupa (Prototype), lalu menguji (Test). Tahap empati dijalankan lewat **riset pengguna**: wawancara mendalam, observasi langsung, survei singkat, atau membaca keluhan yang masuk ke kanal dukungan. Rumusannya sederhana: jangan bicara solusi sebelum masalahnya jelas.\n\nRiset bukan sekadar formalitas yang diklik lalu dilupakan; ia menjamin kamu sedang menyelesaikan masalah yang benar. Tim yang melompati riset sering menghabiskan berminggu-minggu membangun fitur canggih yang tidak ada yang memakai, sementara masalah aslinya sederhana: orang tidak menemukan tombolnya atau tidak percaya pada prosesnya. Sebagai contoh nyata, tim sebuah aplikasi pembayaran pernah kebingungan kenapa transfer antarbank sepi padahal survei menyebut pengguna menginginkan fitur itu; setelah wawancara, ternyata kendalanya biaya admin yang muncul mendadak di langkah akhir, bukan tampilannya. Praktiknya, ajak 5-8 responden yang mewakili target pengguna, catat perkataan mereka apa adanya, kelompokkan temuan menjadi pola, lalu tulis satu kalimat problem statement. Kalimat itu menjadi patokan untuk menilai semua ide berikutnya. Hindari juga pertanyaan mengarahkan seperti "kamu suka fitur ini, kan?"; orang cenderung mengiyakan, dan jawaban manis itu jarang mencerminkan perilaku nyata.',
		code_snippet: null,
		code_caption: null,
		image_url: '/diagrams/ui-ux-designer-b1.svg',
		diagram: 'pipeline',
		diagram_caption:
			'Gambar 8.1: Alur design thinking yang berputar — empati, define, ideate, prototype, test, lalu kembali ke empati dengan temuan baru.',
		sections: [
			{
				heading: 'Menyusun problem statement yang tajam',
				body: 'Satu kalimat masalah yang baik menyebut siapa penggunanya, apa yang ia coba capai, dan apa yang menghalanginya, tanpa menyelipkan solusi. Cukup spesifik untuk dipakai menilai ide, tetapi cukup terbuka agar tim masih bebas menawarkan beberapa cara menyelesaikannya.'
			}
		],
		key_points: [
			'Pahami masalah dan konteks pengguna lewat riset lebih dulu, baru bicara solusi dan menggambar layar.',
			'Utamakan perilaku nyata dan cerita spesifik dari pengguna, bukan asumsi tim atau janji "nanti pasti dipakai".',
			'Simpan satu problem statement yang jelas sebelum mencari ide — semua ide dinilai dari kecocokannya ke masalah itu.'
		],
		quiz: [
			{
				id: 'ui-ux-designer-b1-q1',
				question: 'Apa tujuan utama tahap Empathize dalam design thinking?',
				options: [
					'Menentukan warna, tipografi, dan gaya ikon yang akan dipakai',
					'Memahami masalah, konteks, dan kebutuhan pengguna dari sudut pandang mereka',
					'Menyusun jadwal sprint dan pembagian tugas bersama tim developer',
					'Memilih aplikasi desain yang paling cepat untuk membuat mockup'
				],
				correct_answer_index: 1,
				explanation:
					'Empathize berarti memahami dulu, bukan menghias atau membagi tugas. Warna dan tipografi ditentukan jauh setelah masalah dipahami, sedangkan jadwal sprint serta pilihan aplikasi desain tidak menghasilkan wawasan tentang pengguna.'
			},
			{
				id: 'ui-ux-designer-b1-q2',
				question:
					'Desainer menyimpan catatan riset dalam potongan HTML berikut. Elemen mana yang paling tepat dijadikan judul kelompok temuan?',
				code: `<section>
  <h2>Temuan: ongkir tersembunyi</h2>
  <p>5 dari 7 peserta berhenti di halaman pembayaran.</p>
</section>`,
				code_lang: 'html',
				code_caption: 'catatan-riset.html',
				options: [
					'Semua elemen di atas sama-sama benar',
					'`<p>` karena paragraf paling mudah dibaca',
					'`<section>` karena selalu tampil sebagai judul',
					'`<h2>` karena heading dipakai sebagai judul tingkat dua'
				],
				correct_answer_index: 3,
				explanation:
					'`<h2>` adalah heading level dua, sehingga paling tepat untuk judul kelompok temuan. `<section>` hanya menandai blok konten tanpa menampilkan judul, dan `<p>` adalah paragraf biasa; tidak ada elemen yang otomatis menjadi judul hanya karena strukturnya.'
			},
			{
				id: 'ui-ux-designer-b1-q3',
				question:
					'Saat wawancara, pengguna berkata "Saya pasti pakai fitur itu", padahal data pemakaian menunjukkan jarang dibuka. Bagaimana sebaiknya memperlakukan pernyataan itu?',
				options: [
					'Anggap sebagai opini, lalu verifikasi lewat perilaku nyata atau data penggunaan',
					'Langsung jadikan bukti bahwa fitur itu wajib diprioritaskan',
					'Hapus dari catatan riset karena pengguna dianggap tidak jujur',
					'Tanyakan ulang dengan kalimat yang sama sampai pengguna mengiyakan'
				],
				correct_answer_index: 0,
				explanation:
					'Orang cenderung melebih-lebihkan niatnya di masa depan, sehingga pernyataan harus dicek ke perilaku nyata. Mengulang pertanyaan justru memancing jawaban yang kamu mau, dan menghapus data berarti membuang temuan yang masih bisa dikonfirmasi.'
			},
			{
				id: 'ui-ux-designer-b1-q4',
				question: 'Manakah contoh pertanyaan wawancara riset yang paling baik?',
				options: [
					'Apakah kamu suka fitur keranjang belanja kami?',
					'Apakah kamu mau kami tambahkan filter harga di halaman produk?',
					'Ceritakan terakhir kali kamu belanja online sampai hampir batal membeli. Apa yang terjadi?',
					'Menurut kamu desain kami sekarang sudah bagus, bukan?'
				],
				correct_answer_index: 2,
				explanation:
					'Pertanyaan terbuka yang meminta cerita perilaku masa lalu menghasilkan kronologi, kendala, dan kata yang dipakai pengguna. Tiga opsi lain bersifat mengarahkan sehingga pengguna hanya diminta menyetujui asumsimu atau langsung diarahkan ke solusi.'
			},
			{
				id: 'ui-ux-designer-b1-q5',
				question: 'Manakah pernyataan yang paling keliru tentang riset pengguna?',
				options: [
					'Riset yang berguna harus panjang berbulan-bulan dengan ratusan responden, padahal 5-8 wawancara sudah cukup untuk temuan awal',
					'Wawancara sebaiknya meminta cerita perilaku masa lalu, bukan menawarkan solusi',
					'Observasi bisa dilakukan sederhana, misalnya mengamati pengguna memakai aplikasi di tempat',
					'Temuan riset disimpan agar bisa dirujuk tim saat berdebat soal prioritas fitur'
				],
				correct_answer_index: 0,
				explanation:
					'Pernyataan pertama paling keliru karena riset kecil yang berulang justru lebih efektif daripada satu riset raksasa yang memakan waktu. Tiga opsi lain adalah praktik riset yang sehat: meminta cerita perilaku, observasi sederhana, dan dokumentasi temuan.'
			},
			{
				id: 'ui-ux-designer-b1-q6',
				question:
					'Setelah temuan riset dikelompokkan menjadi pola, langkah berikutnya yang paling tepat adalah...',
				options: [
					'Langsung menggambar mockup high-fidelity untuk semua ide yang muncul',
					'Memilih palet warna baru agar presentasi temuan lebih menarik',
					'Menambah responden sampai jumlahnya bulat dan mudah dipresentasikan',
					'Merumuskan satu problem statement yang jelas sebagai patokan menilai solusi'
				],
				correct_answer_index: 3,
				explanation:
					'Pola baru benar-benar berguna ketika diringkas menjadi satu kalimat masalah yang tajam, supaya semua ide ke depan punya patokan penilaian yang sama. Melompati ke mockup atau mempercantik presentasi membuat tim kembali mengerjakan solusi tanpa kejelasan masalah.'
			},
			{
				id: 'ui-ux-designer-b1-q7',
				question:
					'Survei menyebut 80% pengguna menginginkan notifikasi promo, tapi setelah diluncurkan hanya 2% yang membukanya. Penjelasan paling masuk akal?',
				options: [
					'Data survei selalu akurat sehingga pasti ada kesalahan pada sistem notifikasi',
					'Ada jarak antara apa yang dikatakan orang dan apa yang mereka lakukan, jadi niat perlu dicek ke perilaku',
					'Persentase 2% masih tergolong normal untuk semua jenis aplikasi sehingga tidak perlu ditindaklanjuti',
					'Fitur harus dihapus dari seluruh produk tanpa pengujian ulang'
				],
				correct_answer_index: 1,
				explanation:
					'Survei menangkap niat, bukan tindakan; faktor privasi, kebiasaan, dan nilai yang tidak terasa membuat orang jarang benar-benar membuka notifikasi. Angka 2% bukan standar universal untuk semua produk, dan penghapusan sepihak tanpa uji ulang menutup peluang perbaikan.'
			},
			{
				id: 'ui-ux-designer-b1-q8',
				question:
					'Dari catatan riset JSON berikut, berapa responden yang mencatat kendala "biaya tersembunyi"?',
				code: `[
  { "id": "P1", "kendala": "biaya tersembunyi" },
  { "id": "P2", "kendala": "alur bayar panjang" },
  { "id": "P3", "kendala": "biaya tersembunyi" },
  { "id": "P4", "kendala": "alur bayar panjang" },
  { "id": "P5", "kendala": "biaya tersembunyi" }
]`,
				code_lang: 'json',
				code_caption: 'catatan-riset.json',
				options: ['2', '5', '3', '4'],
				correct_answer_index: 2,
				explanation:
					'P1, P3, dan P5 mencatat kendala yang sama, sehingga jumlahnya 3. Angka 5 adalah total responden dan 2 adalah jumlah kendala "alur bayar panjang", bukan jawaban yang ditanya.'
			},
			{
				id: 'ui-ux-designer-b1-q9',
				question: 'Bagaimana posisi tahap design thinking ketika hasil testing sudah kembali?',
				options: [
					'Proyek dianggap selesai dan seluruh dokumen riset diarsipkan',
					'Hasil test dipakai untuk memperbarui empati dan define, lalu siklus berputar lagi',
					'Tim langsung merilis versi final ke seluruh pengguna tanpa revisi',
					'Tahap testing dihapus karena sudah dijalankan satu kali'
				],
				correct_answer_index: 1,
				explanation:
					'Design thinking berupa siklus, bukan garis lurus: temuan test memperdalam pemahaman sehingga masalah bisa didefinisikan ulang. Menganggap selesai atau melewati iterasi membuat asumsi yang terbukti salah tetap dipakai untuk versi berikutnya.'
			},
			{
				id: 'ui-ux-designer-b1-q10',
				question: 'Manakah problem statement yang paling baik sebagai patokan kerja tim?',
				options: [
					'Pengguna baru gagal menyelesaikan checkout karena total biaya hanya muncul di langkah terakhir',
					'Tim marketing butuh tombol checkout berwarna merah agar konversi naik',
					'Kita harus menambahkan tiga fitur baru agar tidak kalah dari kompetitor',
					'Desain halaman pembayaran harus dibuat ulang sepenuhnya minggu ini'
				],
				correct_answer_index: 0,
				explanation:
					'Problem statement yang baik menyebut pengguna, masalah, dan konteksnya tanpa memaksa solusi, sehingga ide tetap terbuka. Tiga opsi lain sudah menyimpulkan solusi atau target bisnis sebelum masalahnya dipahami.'
			}
		]
	},
	{
		id: 9,
		scope_id: 'ui-ux-designer',
		bab_number: 2,
		title: 'Arsitektur Informasi & Wireframing (Low-Fi)',
		subtitle: 'Struktur & Sketsa',
		explanation:
			'Masuk mal besar tanpa peta membuatmu berputar-putar mencari toko tujuan; produk digital dengan arsitektur informasi yang berantakan membuat pengguna berputar di menu yang sama. **Arsitektur informasi (IA)** menjawab tiga pertanyaan: isi apa saja yang ada (**konten**), dikelompokkan bagaimana (**kategorisasi**), serta bagaimana orang menemukannya (**navigasi dan labeling**). Begitu strukturnya masuk akal, kamu menuangkannya ke **wireframe**, yaitu sketsa kasar berisi kotak, garis, dan teks penanda yang menggantikan gambar. Warnanya sengaja dibuang dulu supaya yang dinilai adalah susunan dan alurnya, bukan selera warna. Semakin awal struktur ini diuji, semakin sedikit yang harus dibongkar nanti.\n\nContoh nyatanya, marketplace dengan kategori Kopi, Teh, dan Cemilan mendadak membingungkan ketika menu riwayat pesanan disembunyikan di dalam "Akun" sementara pengguna mencari kata "pesanan". Orang tidak mengeluh pelan-pelan; mereka cukup menutup aplikasi. Karena itu urutannya penting: susun **sitemap** dulu, misalnya lewat kartu yang diurutkan bersama pengguna, tentukan label memakai bahasa yang sering mereka ucapkan, baru gambar wireframe low-fidelity, lalu rangkai prototipe yang bisa diklik. Kalau dari 5 peserta sudah ada yang tersesat saat desainnya masih kotak-kotak, kamu menghemat berhari-hari pekerjaan visual dan coding yang pasti akan berubah. Sebagai patokan praktis, kalau pengguna baru bisa menyelesaikan tugas utama hanya dengan melihat wireframe kotak-kotak, strukturnya sudah cukup kuat untuk lanjut ke tahap visual.',
		code_snippet: `<!-- Kerangka wireframe: struktur dulu, gaya belakangan -->
<header>
  <h1>Toko Kopi Pagi</h1>
  <nav>Beranda &middot; Produk &middot; Keranjang (2)</nav>
</header>

<main>
  <aside>Kategori: Kopi, Teh, Cemilan</aside>
  <section>
    <h2>Daftar Produk</h2>
    <article>Kartu Produk 1</article>
    <article>Kartu Produk 2</article>
  </section>
</main>

<footer>Bantuan &middot; Syarat &amp; Ketentuan</footer>`,
		code_lang: 'html',
		code_caption: 'wireframe.html — kerangka halaman tanpa gaya visual',
		image_url: '/diagrams/ui-ux-designer-b2.svg',
		diagram: null,
		sections: [
			{
				heading: 'Anatomi wireframe low-fidelity',
				body: 'Isi wireframe minimal empat hal: kerangka halaman (header, konten utama, footer), urutan konten dari yang paling penting, lokasi navigasi dan tombol utama, serta penanda komponen yang belum digambar seperti foto, ikon, dan tombol. Warna, font final, dan bayangan ditunda ke tahap mockup.'
			}
		],
		diagram_caption:
			'Gambar 9.1: Perbandingan site map (struktur antarhalaman) dan wireframe low-fi yang menyusun tata letak sebelum masuk desain visual.',
		key_points: [
			'Arsitektur informasi menentukan apa isinya, dikelompokkan bagaimana, dan bagaimana pengguna menemukannya.',
			'Wireframe dibuat abu-abu tanpa detail visual agar tim fokus menilai struktur, prioritas, dan alur.',
			'Uji alur lewat prototipe klik sebelum mempercantik desain — memindahkan blok di wireframe murah, mengganti desain jadi mahal.'
		],
		quiz: [
			{
				id: 'ui-ux-designer-b2-q1',
				question: 'Apa yang dimaksud dengan arsitektur informasi (IA)?',
				options: [
					'Pemilihan warna, tipografi, dan ikon agar tampilan terlihat konsisten',
					'Pengaturan grid dan breakpoint agar halaman muat di berbagai layar',
					'Cara mengelompokkan, memberi label, dan menavigasikan konten agar pengguna mudah menemukannya',
					'Proses menerjemahkan wireframe menjadi kode HTML dan CSS'
				],
				correct_answer_index: 2,
				explanation:
					'IA fokus pada struktur dan temu-kembali informasi: apa isinya, bagaimana dikelompokkan, dan bagaimana dicari. Warna serta grid adalah urusan visual dan layout, sedangkan penerjemahan ke kode adalah tahap implementasi setelah struktur jelas.'
			},
			{
				id: 'ui-ux-designer-b2-q2',
				question:
					'Potongan wireframe berikut menampilkan halaman riwayat. Elemen mana yang menjadi judul utamanya?',
				code: `<main>
  <h1>Riwayat Pesanan</h1>
  <ul>
    <li>Order #1024 - Dikirim</li>
    <li>Order #1025 - Diproses</li>
  </ul>
</main>`,
				code_lang: 'html',
				code_caption: 'riwayat.html',
				options: [
					'`<h1>` karena heading level 1 dipakai untuk judul utama halaman',
					'`<main>` karena hanya elemen ini yang tampil di layar',
					'`<li>` karena setiap daftar punya judul sendiri',
					'`<ul>` karena penanda utama selalu berada di dalam daftar'
				],
				correct_answer_index: 0,
				explanation:
					'`<h1>` adalah heading level satu sehingga menjadi judul utama halaman. `<main>` hanya menandai blok konten utama, `<ul>` membuat daftar berpenanda titik, dan `<li>` adalah isi tiap baris daftar.'
			},
			{
				id: 'ui-ux-designer-b2-q3',
				question:
					'Dari 5 peserta pengujian, 4 orang gagal menemukan halaman riwayat pesanan dari menu utama. Masalah paling mungkin ada di mana?',
				options: [
					'Warna menu kurang kontras dengan latar halaman',
					'Ukuran logo terlalu besar sehingga mengambil tempat',
					'Gaya font pada menu tidak konsisten antarhalaman',
					'Label dan pengelompokan menu tidak sesuai dengan cara pengguna mencari'
				],
				correct_answer_index: 3,
				explanation:
					'Kegagalan menemukan hampir selalu berasal dari struktur dan penamaan: label seperti "Akun" bisa saja menyimpan riwayat, padahal pengguna mencari kata "pesanan". Kontras, ukuran logo, dan font memengaruhi keterbacaan, bukan kemampuan menemukan.'
			},
			{
				id: 'ui-ux-designer-b2-q4',
				question: 'Manakah miskonsepsi paling umum soal wireframing?',
				options: [
					'Wireframe sebaiknya sudah dites ke pengguna sebelum menjadi prototipe',
					'Wireframe harus memakai warna brand dan ikon final agar bisa dinilai',
					'Wireframe dibuat abu-abu agar tim fokus pada struktur dan alur',
					'Wireframe jauh lebih murah diubah dibanding desain high-fidelity'
				],
				correct_answer_index: 1,
				explanation:
					'Wireframe justru dibuat tanpa gaya visual supaya pembahasan berputar pada struktur dan alur; begitu warna final terpasang, feedback bergeser ke estetika. Menguji sketsa ke pengguna tetap sah, dan mengubah wireframe memang jauh lebih murah daripada mengubah desain final.'
			},
			{
				id: 'ui-ux-designer-b2-q5',
				question:
					'Pengguna sering mencari kata "pesanan" tetapi menu memakai label "Arsip Transaksi". Apa perbaikan paling tepat?',
				options: [
					'Ganti label dengan kata yang sering diucapkan pengguna, misalnya "Pesanan Saya"',
					'Tambahkan animasi agar menu lebih mencolok',
					'Pindahkan menu ke footer agar halaman terlihat lebih bersih',
					'Ubah warna ikon menu menjadi warna brand'
				],
				correct_answer_index: 0,
				explanation:
					'Label yang baik memakai bahasa pengguna, bukan bahasa internal tim. Animasi, posisi di footer, dan perubahan warna tidak membantu orang menemukan istilah yang tidak ia kenali.'
			},
			{
				id: 'ui-ux-designer-b2-q6',
				question: 'Apa fungsi utama potongan wireframe berikut?',
				code: `<nav>
  <a href="/">Beranda</a>
  <a href="/produk">Produk</a>
  <a href="/keranjang">Keranjang</a>
</nav>`,
				code_lang: 'html',
				code_caption: 'navigasi.html',
				options: [
					'Menampilkan tabel data dari server',
					'Membuat formulir pendaftaran pengguna',
					'Kerangka navigasi utama berisi tautan antarhalaman',
					'Struktur kartu produk dalam grid katalog'
				],
				correct_answer_index: 2,
				explanation:
					'Elemen `<nav>` berisi tautan `<a>` yang menghubungkan satu halaman ke halaman lain, jadi ini adalah kerangka navigasi. Tabel data memakai `<table>`, formulir memakai `<form>`, dan grid katalog umumnya dibangun dari wadah artikel, bukan daftar tautan.'
			},
			{
				id: 'ui-ux-designer-b2-q7',
				question: 'Apa gunanya card sorting bersama pengguna?',
				options: [
					'Menguji kecepatan animasi antarhalaman',
					'Memilih font yang paling mudah dibaca',
					'Menentukan urutan elemen pada wireframe berdasarkan selera desainer',
					'Menemukan cara pengguna mengelompokkan dan menamai informasi'
				],
				correct_answer_index: 3,
				explanation:
					'Card sorting mengungkap mental model pengguna: bagaimana mereka mengelompokkan konten dan kata apa yang mereka pakai untuk menamainya. Hasilnya dipakai menyusun sitemap dan label, bukan untuk menilai animasi, font, atau selera pribadi desainer.'
			},
			{
				id: 'ui-ux-designer-b2-q8',
				question:
					'Analisis menunjukkan 60% pengguna berhenti di langkah memilih metode pembayaran. Langkah paling tepat?',
				options: [
					'Menambahkan promosi di halaman awal agar pengguna lebih bersemangat',
					'Mengamati pengguna di langkah itu lalu menyusun ulang pilihan pembayaran yang membingungkan',
					'Menghapus seluruh langkah pembayaran dan menagih lewat transfer manual',
					'Mengganti semua ikon halaman dengan ilustrasi baru'
				],
				correct_answer_index: 1,
				explanation:
					'Titik berhenti massal menandakan kebingungan di satu langkah, jadi penyelidikan harus dipusatkan di sana sebelum solusinya dipilih. Promosi, penghapusan pembayaran, dan pergantian ikon menjawab masalah lain yang tidak terbukti dari datanya.'
			},
			{
				id: 'ui-ux-designer-b2-q9',
				question: 'Ciri utama wireframe low-fidelity adalah...',
				options: [
					'Memakai warna brand, tipografi final, dan bayangan halus',
					'Sudah bisa diklik penuh seperti aplikasi aslinya',
					'Hanya berisi kotak, garis, dan penanda teks tanpa gaya visual',
					'Wajib dibuat langsung dengan kode HTML dan CSS'
				],
				correct_answer_index: 2,
				explanation:
					'Low-fidelity berarti sengaja dibuat kasar dan tanpa gaya, supaya yang dinilai adalah struktur dan alur. Gaya visual muncul di mockup, klik penuh muncul di prototipe, dan wireframe tetap boleh digambar di kertas maupun aplikasi desain.'
			},
			{
				id: 'ui-ux-designer-b2-q10',
				question: 'Manakah pernyataan yang keliru tentang arsitektur informasi?',
				options: [
					'IA tetap dibutuhkan bahkan oleh aplikasi kecil dengan sedikit menu',
					'IA hanya relevan untuk situs besar dengan ribuan halaman',
					'IA mencakup konten, kategorisasi, serta navigasi dan labeling',
					'IA bisa diuji lewat tree testing atau kartu yang diurutkan pengguna'
				],
				correct_answer_index: 1,
				explanation:
					'IA relevan di semua skala, karena tiga pertanyaannya (isi, kelompok, cara menemukan) selalu muncul bahkan pada aplikasi dengan lima menu. Pengelompokan, pengujian struktur, dan aplikasi kecil tetap membutuhkan keputusan IA yang jelas.'
			}
		]
	},
	{
		id: 10,
		scope_id: 'ui-ux-designer',
		bab_number: 3,
		title: 'Prinsip Visual & Typography',
		subtitle: 'Hierarki & Teks',
		explanation:
			'Kalau semua orang berteriak di satu ruangan, tidak ada yang terdengar. **Hierarki visual** bekerja persis seperti itu: ia menentukan siapa yang paling keras "berteriak" lewat ukuran, ketebalan, kontras, dan jarak, supaya mata pengguna tahu harus mulai dari mana. Pengguna tidak membaca layar seperti membaca koran; mereka **memindai**, lalu berhenti hanya pada hal yang menonjol. Di ranah tipografi, hal itu diwujudkan lewat skala ukuran font yang berjarak jelas, line-height yang longgar untuk badan teks, serta lebar baris sekitar 45-75 karakter supaya mata tidak kehilangan baris berikutnya.\n\nKetika hierarki tidak ada, pengguna kehilangan orientasi: tombol utama sama besarnya dengan tautan kecil, judul kalah tenang dari teks kaki, dan orang akhirnya menggulir tanpa tahu harus klik apa. Sebagai contoh nyata, aplikasi berita yang menampilkan teks badan 13px dengan lebar 110 karakter membuat pembacanya cepat lelah, sementara perubahan sederhana ke 16px dan kolom yang lebih sempit langsung terasa nyaman. Praktik kecil yang mudah diterapkan: satu elemen menonjol per layar, kontras teks memenuhi ambang keterbacaan 4,5:1, jarak antarkelompok lebih besar daripada jarak di dalam kelompok, dan cukup satu keluarga font dengan beberapa berat. Hierarki yang rapi membuat pengguna menemukan tombol utama dalam sekejap tanpa harus membaca seluruh layar dari awal.',
		code_snippet: `/* Skala tipografi: hierarki disimpan sebagai token */
:root {
  --text-body: 16px;
  --text-h2: 24px;
  --text-h1: 34px;
}

body {
  font-size: var(--text-body);
  line-height: 1.6;
  color: #0f172a;
}

h1 {
  font-size: var(--text-h1);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.artikel {
  max-width: 68ch;
}`,
		code_lang: 'css',
		code_caption: 'tipografi.css — skala ukuran dan kenyamanan baca',
		image_url: '/diagrams/ui-ux-designer-b3.svg',
		diagram: null,
		sections: [
			{
				heading: 'Tiga alat hierarki visual',
				body: 'Ukuran dan ketebalan menentukan apa yang dibaca pertama, kontras mengalihkan mata ke aksi utama, sedangkan jarak dan kesamaan bentuk mengelompokkan informasi tanpa garis pemisah. Kuncinya satu: satu elemen menonjol dan sisanya tenang, karena kalau semuanya menonjol maka tidak ada yang menonjol.'
			}
		],
		diagram_caption:
			'Gambar 10.1: Prinsip visual — grid 8pt untuk ritme spasi, hierarki tipografi berjenjang, dan pasangan warna yang lolos kontras.',
		key_points: [
			'Hierarki visual dibangun dari kontras, ukuran, jarak, dan penataan, bukan dari jumlah warna yang dipakai.',
			'Tipografi nyaman lahir dari skala ukuran yang jelas, line-height longgar, dan lebar baris sekitar 45-75 karakter.',
			'Kelompokkan elemen yang mirip; jarak antarkelompok dibuat lebih besar daripada jarak di dalam kelompok.'
		],
		quiz: [
			{
				id: 'ui-ux-designer-b3-q1',
				question:
					'Berdasarkan aturan CSS berikut, apa perbedaan utama yang dibuat kelas `.judul` dibanding `body`?',
				code: `body {
  font-size: 16px;
  line-height: 1.5;
}
.judul {
  font-size: 2rem;
  line-height: 1.2;
}`,
				code_lang: 'css',
				code_caption: 'hierarki.css',
				options: [
					'Judul dibuat lebih besar dan rapat, badan teks lebih kecil dan renggang',
					'Judul dibuat lebih kecil agar tidak menutupi gambar',
					'Keduanya identik sehingga hierarki tidak terbentuk',
					'Aturan `.judul` menghapus jarak antarbaris sepenuhnya'
				],
				correct_answer_index: 0,
				explanation:
					'`2rem` lebih besar dari `16px`, sedangkan `line-height: 1.2` lebih rapat daripada `1.5`, sehingga judul terlihat menonjol dan badan teks terasa longgar untuk dibaca. Hierarki justru membutuhkan perbedaan seperti ini, bukan aturan yang sama.'
			},
			{
				id: 'ui-ux-designer-b3-q2',
				question:
					'Sebuah artikel memakai teks badan 12px dengan lebar 120 karakter per baris. Pengguna mengeluh cepat lelah membaca. Perbaikan paling tepat?',
				options: [
					'Menambah jumlah iklan agar halaman terlihat lebih hidup',
					'Menggabungkan seluruh teks menjadi satu paragraf panjang',
					'Mengubah warna teks menjadi abu-abu muda agar terasa lebih lembut',
					'Memperbesar ukuran teks ke sekitar 16px dan membatasi sekitar 45-75 karakter per baris'
				],
				correct_answer_index: 3,
				explanation:
					'Ukuran terlalu kecil dan baris terlalu panjang membuat mata kehilangan jejak sehingga pembacaan terasa melelahkan. Iklan, gabungan paragraf, dan warna pucat justru menurunkan keterbacaan, bukan memperbaikinya.'
			},
			{
				id: 'ui-ux-designer-b3-q3',
				question: 'Apa yang dimaksud dengan hierarki visual?',
				options: [
					'Urutan pengembangan fitur dari yang paling mudah ke yang paling sulit',
					'Pengaturan elemen agar mata tahu mana yang dibaca pertama, kedua, dan seterusnya',
					'Susunan menu navigasi pada sidebar halaman',
					'Daftar komponen yang tersimpan di dalam design system'
				],
				correct_answer_index: 1,
				explanation:
					'Hierarki visual mengatur urutan baca lewat perbedaan ukuran, kontras, dan jarak. Urutan fitur adalah prioritas produk, susunan menu masuk ke arsitektur informasi, dan daftar komponen adalah bagian dari design system.'
			},
			{
				id: 'ui-ux-designer-b3-q4',
				question:
					'Sebuah teks putih muda di atas latar putih terlihat "elegan" tetapi sulit dibaca. Prinsip mana yang dilanggar?',
				options: [
					'Prinsip kesinambungan karena garis pemisah terlalu banyak',
					'Prinsip penataan karena jarak antarbaris terlalu rapat',
					'Prinsip kontras karena perbedaan warna teks dan latar terlalu kecil',
					'Prinsip kesatuan karena terlalu banyak jenis font dipakai'
				],
				correct_answer_index: 2,
				explanation:
					'Keterbacaan bergantung pada selisih terang-gelap antara teks dan latarnya; putih muda di atas putih hampir tidak berselisih sehingga gagal memenuhi ambang kontras. Garis pemisah, line-height, dan jumlah font memengaruhi aspek lain, bukan kontras warna.'
			},
			{
				id: 'ui-ux-designer-b3-q5',
				question: 'Manakah miskonsepsi umum tentang tipografi?',
				options: [
					'Skala ukuran font sebaiknya dibuat kelipatan agar konsisten',
					'Line-height yang longgar membantu kenyamanan membaca',
					'Satu keluarga font dengan beberapa berat sudah cukup untuk kebanyakan produk',
					'Semakin banyak jenis font dipakai, semakin profesional tampilannya'
				],
				correct_answer_index: 3,
				explanation:
					'Menambah jenis font justru memperkecil kemungkinan terbentuknya hierarki yang jelas karena semua elemen terlihat sama "ramainya". Skala kelipatan, line-height longgar, dan penggunaan hemat font justru praktik yang sehat.'
			},
			{
				id: 'ui-ux-designer-b3-q6',
				question: 'Apa manfaat menyimpan ukuran font sebagai variabel CSS seperti di bawah ini?',
				code: `:root {
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 20px;
}`,
				code_lang: 'css',
				code_caption: 'skala-font.css',
				options: [
					'Ukuran disimpan sekali lalu dipakai ulang, sehingga perubahan skala tinggal mengubah satu tempat',
					'Font otomatis diunduh dari internet saat variabel dipanggil',
					'Browser mengabaikan ukuran ini agar teks selalu sama besar',
					'Ukuran menjadi tidak terbatas sehingga boleh memakai angka berapa pun'
				],
				correct_answer_index: 0,
				explanation:
					'Variabel CSS membuat satu nilai dipakai ulang di banyak tempat, jadi penyesuaian skala cukup diedit sekali. Variabel tidak mengunduh font, tidak diabaikan browser, dan tetap memakai nilai angka yang kamu tentukan sendiri.'
			},
			{
				id: 'ui-ux-designer-b3-q7',
				question:
					'Di sebuah layar, tombol "Beli Sekarang" sebesar tautan kecil sementara teks kaki paling mencolok. Apa akibatnya?',
				options: [
					'Pengguna menjadi lebih teliti membaca seluruh isi halaman',
					'Pengguna kehilangan fokus pada aksi utama dan tidak tahu harus klik apa',
					'Halaman menjadi lebih cepat dimuat karena elemennya sedikit',
					'Tidak ada dampak karena ukuran tidak memengaruhi perilaku'
				],
				correct_answer_index: 1,
				explanation:
					'Ketika elemen sekunder lebih menonjol dari aksi utama, mata berhenti di tempat yang salah dan pengguna kehilangan titik masuk. Jumlah elemen tidak menentukan kecepatan muat secara langsung, dan ukuran sangat memengaruhi perilaku.'
			},
			{
				id: 'ui-ux-designer-b3-q8',
				question:
					'Dalam satu formulir pendaftaran, label justru ditempelkan rapat ke kolom berikutnya sehingga terlihat seperti milik kolom itu. Masalahnya...',
				options: [
					'Ukuran font label terlalu kecil untuk dibaca',
					'Jumlah kolom terlalu banyak sehingga formulir menjadi panjang',
					'Label kehilangan hubungan dengan kolomnya karena jarak tidak mengindikasikan kelompok',
					'Warna label harus diganti agar lebih mencolok'
				],
				correct_answer_index: 2,
				explanation:
					'Prinsip proximity: kita menganggap elemen yang berdekatan sebagai satu kelompok, sehingga jarak menentukan pasangan label-kolom. Masalahnya bukan ukuran, panjang formulir, atau warna, melainkan penataan jarak antarelemen.'
			},
			{
				id: 'ui-ux-designer-b3-q9',
				question:
					'Mengapa desainer membuat satu elemen "berteriak" dan menenangkan sisanya?',
				options: [
					'Agar mata punya titik masuk yang jelas; kalau semuanya menonjol, tidak ada yang menonjol',
					'Agar halaman terlihat lebih ramai dan informatif',
					'Agar jumlah warna pada palet berkurang menjadi lebih sedikit',
					'Agar file CSS menjadi lebih ringan ukurannya'
				],
				correct_answer_index: 0,
				explanation:
					'Hierarki bekerja lewat perbedaan: satu elemen dibuat menonjol agar menjadi fokus pertama, sementara elemen lain dibuat tenang. Kepadatan informasi, jumlah warna, dan ukuran file tidak menentukan keberhasilan hierarki.'
			},
			{
				id: 'ui-ux-designer-b3-q10',
				question:
					'Tim aplikasi berita mengubah teks badan dari 13px ke 17px dan lebar baris dari 110 ke 65 karakter. Apa yang paling mungkin terjadi?',
				options: [
					'Kemampuan membaca menurun karena teks justru menjadi lebih besar',
					'Jumlah artikel di layar berkurang sehingga fitur daftar berita harus dihapus',
					'Kenyamanan membaca membaik karena ukuran dan panjang baris lebih ramah mata',
					'Hierarki hilang karena judul dan badan teks sekarang sama besarnya'
				],
				correct_answer_index: 2,
				explanation:
					'Ukuran 17px dengan lebar sekitar 65 karakter mendekati rentang kenyamanan baca, sehingga mata lebih jarang salah pindah baris. Judul tetap dibedakan lewat skala dan bobot, dan berkurangnya item di layar bukan alasan untuk menghapus fitur.'
			}
		]
	},
	{
		id: 11,
		scope_id: 'ui-ux-designer',
		bab_number: 4,
		title: 'Design System & Reusable Components',
		subtitle: 'Token & Komponen',
		explanation:
			'Membangun layar satu per satu tanpa aturan bersama ibarat tiap koki di satu dapur membuat takaran garam versi masing-masing; hasilnya masakan yang tidak pernah sama. **Design system** adalah buku resep tim: **token** seperti warna, jarak, radius, dan ukuran font didefinisikan sekali, lalu **komponen** seperti tombol, kartu, dan input dibangun dari token itu beserta varian serta statusnya (default, hover, focus, disabled, loading). Dengan satu sumber kebenaran, perubahan keputusan cukup dilakukan di satu tempat dan merambat ke seluruh produk.\n\nManfaatnya dua arah. Pengguna belajar pola yang konsisten sehingga tidak perlu menebak-nebak tombol mana yang aman ditekan, sementara desainer dan developer bekerja lebih cepat karena tidak memutuskan ulang hal yang sama di tiap halaman. Sebagai contoh nyata, sebuah toko daring dengan empat aplikasi berbeda cukup memakai token warna primer yang sama agar pengguna merasa berada di satu produk yang utuh meski masuk lewat pintu yang berbeda. Praktiknya, mulailah dari token dan komponen yang paling sering dipakai, dokumentasikan cara pakainya beserta status yang harus disiapkan, lalu tumbuhkan bertahap. Design system yang menunggu sempurna justru sering tidak pernah dipakai, karena sistem yang hidup selalu berkembang mengikuti kebutuhan nyata.',
		code_snippet: `{
  "color": {
    "primary": "#2563eb",
    "primary-hover": "#1d4ed8",
    "danger": "#dc2626",
    "text": "#0f172a"
  },
  "radius": { "sm": "4px", "md": "8px", "lg": "16px" },
  "space": { "sm": "8px", "md": "16px", "lg": "32px" }
}`,
		code_lang: 'json',
		code_caption: 'design-tokens.json — token warna, radius, dan jarak',
		image_url: '/diagrams/ui-ux-designer-b4.svg',
		diagram: null,
		sections: [
			{
				heading: 'Urutan membangun design system',
				body: 'Mulai dari token paling dasar seperti warna, jarak, dan tipografi, lanjutkan ke komponen atomik seperti tombol dan label input, baru gabungkan menjadi pola yang lebih besar seperti kartu dan formulir. Dokumentasikan setiap keputusan beserta contoh pemakaian dan status yang didukung, supaya desainer dan developer memakai istilah yang sama.'
			}
		],
		diagram_caption:
			'Gambar 11.1: Struktur design system — token warna, skala tipografi, ikon, komponen, dan spasi yang dipakai ulang di seluruh produk.',
		key_points: [
			'Design system menyimpan token dan komponen sekali lalu dipakai berkali-kali: konsisten, cepat, dan mudah dirawat.',
			'Komponen yang baik disertai varian dan status seperti hover, focus, disabled, loading, error, dan kondisi data kosong.',
			'Tumbuhkan sistem dari komponen yang paling sering dipakai, bukan menunggu dokumentasi sempurna sejak hari pertama.'
		],
		quiz: [
			{
				id: 'ui-ux-designer-b4-q1',
				question: 'Apa yang dimaksud dengan design system?',
				options: [
					'Kumpulan mockup untuk semua kemungkinan ukuran layar',
					'Aturan agar tiap halaman dibuat berbeda oleh tiap desainer',
					'Sekumpulan token, komponen, dan pedoman yang dipakai ulang agar produk konsisten',
					'Dokumen merek dagang yang disimpan tim legal perusahaan'
				],
				correct_answer_index: 2,
				explanation:
					'Design system adalah sumber keputusan bersama: token, komponen, dan pedoman pemakaiannya. Ia justru membuat halaman seragam, bukan berbeda-beda, dan tidak ada hubungannya dengan dokumen hukum atau mockup semua ukuran layar.'
			},
			{
				id: 'ui-ux-designer-b4-q2',
				question:
					'Berdasarkan token JSON berikut, nilai warna apa yang terpakai jika tombol utama memakai `color.primary`?',
				code: `{
  "color": {
    "primary": "#2563eb",
    "danger": "#dc2626"
  },
  "radius": { "md": "8px" }
}`,
				code_lang: 'json',
				code_caption: 'token.json',
				options: ['`#2563eb`', '`#dc2626`', '`8px`', 'Warna merah karena danger selalu menang'],
				correct_answer_index: 0,
				explanation:
					'Nilai `color.primary` dalam token adalah `#2563eb`, sedangkan `#dc2626` adalah nilai `danger` dan `8px` adalah nilai radius. Token tidak saling menimpa seperti aturan CSS, jadi masing-masing key memberi nilai yang sudah ditetapkan.'
			},
			{
				id: 'ui-ux-designer-b4-q3',
				question:
					'Sebuah komponen tombol dikirim ke developer tanpa status selain "default". Apa risikonya?',
				options: [
					'Tombol tidak akan muncul di browser sama sekali',
					'Ukuran tombol otomatis membesar di layar kecil',
					'Warna tombol berubah mengikuti tema sistem operasi',
					'Developer menebak sendiri tampilan hover, focus, disabled, dan loading sehingga hasilnya tidak konsisten'
				],
				correct_answer_index: 3,
				explanation:
					'Status yang tidak didokumentasikan membuat tiap developer membuat versi sendiri, dan hasil akhirnya berbeda antarhalaman. Tombol tetap tampil, ukuran tidak berubah otomatis, dan tema sistem tidak mengambil alih warna tanpa konfigurasi khusus.'
			},
			{
				id: 'ui-ux-designer-b4-q4',
				question:
					'Empat tim produk memakai empat nuansa biru berbeda untuk tombol utama. Solusi paling tepat?',
				options: [
					'Menambahkan satu biru lagi sebagai warna khusus presentasi',
					'Menetapkan satu token warna primer di design system lalu menyuruh semua tim memakainya',
					'Membiarkan perbedaan karena tiap tim punya selera berbeda',
					'Mengganti seluruh warna produk menjadi hitam putih'
				],
				correct_answer_index: 1,
				explanation:
					'Warna primer adalah keputusan bersama, jadi tempatnya adalah satu token yang dirujuk semua tim. Menambah varian baru memperbanyak kekacauan, membiarkannya membuat produk terasa terpecah, dan hitam putih pun bukan solusi karena menghapus identitas warna sama sekali.'
			},
			{
				id: 'ui-ux-designer-b4-q5',
				question: 'Manakah miskonsepsi umum tentang design system?',
				options: [
					'Design system harus sempurna dan lengkap sejak hari pertama sebelum boleh dipakai',
					'Design system dimulai dari token dan komponen yang paling sering dipakai lalu berkembang',
					'Design system menghemat waktu karena keputusan tidak diulang di tiap halaman',
					'Design system perlu didokumentasikan agar desainer dan developer memakai istilah yang sama'
				],
				correct_answer_index: 0,
				explanation:
					'Menunggu kesempurnaan membuat sistem tidak pernah dirilis dan akhirnya tidak pernah dipakai; sistem yang baik justru tumbuh bertahap dari kebutuhan nyata. Tiga opsi lain menjelaskan manfaat dan cara kerja design system yang benar.'
			},
			{
				id: 'ui-ux-designer-b4-q6',
				question:
					'Desainer memakai jarak 7px, 13px, 18px, dan 24px secara acak di berbagai komponen. Apa perbaikan paling tepat?',
				options: [
					'Menambahkan jarak baru 31px agar pilihan makin banyak',
					'Menghapus seluruh jarak dan menempelkan semua elemen rapat',
					'Memakai nilai piksel acak asalkan terlihat rapi di satu layar',
					'Memakai skala jarak berkelipatan seperti 4 atau 8 piksel agar ritme visual konsisten'
				],
				correct_answer_index: 3,
				explanation:
					'Skala berkelipatan membuat jarak antarelumen terasa berirama dan mudah ditebak, sekaligus disimpan sebagai token bersama. Menambah nilai acak memperparah kekacauan, merapatkan semua elemen menghapus hierarki kelompok, dan rapi di satu layar bukan patokan sistem.'
			},
			{
				id: 'ui-ux-designer-b4-q7',
				question: 'Berapa jarak yang terpakai jika sebuah komponen memakai token `space.lg`?',
				code: `{
  "space": { "sm": "8px", "md": "16px", "lg": "32px" },
  "font": { "body": "16px", "caption": "13px" }
}`,
				code_lang: 'json',
				code_caption: 'token-jarak.json',
				options: ['`8px`', '`32px`', '`16px`', '`13px`'],
				correct_answer_index: 1,
				explanation:
					'Pada objek `space`, key `lg` bernilai `32px`, sehingga komponen memakai jarak itu. `8px` adalah `sm`, `16px` adalah `md`, dan `13px` berada pada objek `font`, bukan `space`.'
			},
			{
				id: 'ui-ux-designer-b4-q8',
				question:
					'Tim memperbaiki kontras tombol di satu file token, lalu seluruh layar ikut berubah. Konsep yang tercermin adalah...',
				options: [
					'Duplikasi kode agar aman ketika satu file rusak',
					'Hardcoding gaya di tiap komponen agar fleksibel',
					'Penggunaan ulang token: satu sumber kebenaran dipakai banyak komponen',
					'Penggabungan seluruh komponen menjadi satu file besar'
				],
				correct_answer_index: 2,
				explanation:
					'Karena gaya diambil dari satu token, perbaikan di sana otomatis merambat ke semua pemakai. Duplikasi dan hardcoding justru membuat perubahan harus dilakukan di banyak tempat, dan komponen tetap boleh berada di banyak berkas terpisah.'
			},
			{
				id: 'ui-ux-designer-b4-q9',
				question: 'Apa perbedaan antara design token dan komponen?',
				options: [
					'Token adalah nilai dasar seperti warna dan jarak, komponen adalah potongan UI yang dibangun dari token',
					'Token adalah berkas gambar, komponen adalah berkas teks',
					'Keduanya hal yang sama, hanya istilahnya berbeda',
					'Komponen hanya berlaku untuk aplikasi mobile'
				],
				correct_answer_index: 0,
				explanation:
					'Token adalah bahan baku seperti `#2563eb` atau `16px`, sedangkan komponen adalah wadah jadi seperti tombol yang memakai bahan itu. Keduanya saling melengkapi, bukan sinonim, dan berlaku di web maupun mobile.'
			},
			{
				id: 'ui-ux-designer-b4-q10',
				question: 'Kapan sebuah elemen layak dijadikan komponen reusable?',
				options: [
					'Saat elemen itu baru muncul sekali di satu halaman',
					'Saat desainer ingin memberi nama khusus pada elemennya',
					'Saat elemen hanya dipakai di versi desktop',
					'Saat elemen dipakai berulang di beberapa tempat dan butuh status serta varian yang sama'
				],
				correct_answer_index: 3,
				explanation:
					'Komponen reusable dibuat saat ada pola berulang dengan kebutuhan status dan varian serupa, sehingga pengulangan keputusan bisa dihilangkan. Elemen sekali pakai justru belum perlu dikomponenkan, dan nama atau platform bukan alasan teknisnya.'
			}
		]
	},
	{
		id: 12,
		scope_id: 'ui-ux-designer',
		bab_number: 5,
		title: 'Prototyping Interaktif & Micro-interactions',
		subtitle: 'Purwarupa & Gerak',
		explanation:
			'Prototipe adalah purwarupa yang bisa diklik, bukan gambar diam: ia mensimulasikan alur yang mendekati produk asli tanpa menunggu kode selesai. Bayangkan kamu mencoba pemesanan tiket di versi uji coba sebelum bioskopnya benar-benar dibangun, sehingga kursi yang salah tata letak masih bisa dipindah dengan murah. Di dalamnya hidup **micro-interaction**, yaitu umpan balik kecil saat tombol ditekan, animasi menyukai foto, skeleton saat memuat, atau tarikan layar untuk memuat ulang. Umumnya micro-interaction punya empat bagian: pemicu (pengguna menekan), aturan (apa yang terjadi), umpan balik (apa yang terlihat), lalu hasil yang terus berulang.\n\nUmpan balik kecil ini menentukan rasa "responsif" sebuah produk. Animasi sekitar 150 sampai 300 milidetik terasa cepat dan hidup, sementara transisi 1,5 detik di tiap pindah layar membuat pengguna mengeluh lemot. Contoh nyatanya, aplikasi belanja yang memunculkan item keranjang dengan geser naik singkat membuat pengguna yakin aksinya berhasil tanpa harus membaca teks konfirmasi. Sebaliknya, layar yang diam saja dua detik setelah tombol Bayar ditekan memancing pengguna menekan berulang, dan pesanan bisa terkirim dua kali. Gunakan prototipe untuk menguji alur penting sebelum coding, lalu pakai animasi hanya kalau ia memberi status, memandu perhatian, atau menjaga konteks.',
		code_snippet: `/* Umpan balik kecil yang membuat aksi terasa nyata */
.tombol {
  transition: transform 0.2s ease, background 0.2s ease;
}

.tombol:active {
  transform: scale(0.96);
}

@keyframes muncul {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.kartu-baru {
  animation: muncul 0.25s ease-out;
}`,
		code_lang: 'css',
		code_caption: 'micro-interaction.css — umpan balik saat menekan dan memuat',
		image_url: '/diagrams/ui-ux-designer-b5.svg',
		diagram: null,
		sections: [
			{
				heading: 'Memilih tingkat kerapatan prototipe',
				body: 'Untuk menguji alur dan urutan layar, wireframe yang bisa diklik sudah cukup dan cepat dibuat. Untuk menguji respons emosional terhadap gerak dan kecepatan, tambahkan transisi serta status nyata. Prototipe tidak perlu sempurna, karena tujuannya menguji asumsi sebelum kode ditulis, bukan memamerkan hasil akhir.'
			}
		],
		diagram_caption:
			'Gambar 12.1: Empat keadaan tombol — default, hover, pressed, dan success — contoh micro-interaction yang memberi umpan balik instan.',
		key_points: [
			'Prototipe menghubungkan layar agar alur bisa diklik dan diuji sebelum coding dimulai.',
			'Micro-interaction terdiri dari pemicu, aturan, umpan balik, dan hasil yang berulang untuk satu aksi kecil.',
			'Jaga durasi animasi sekitar 150-300 milidetik dan pakai gerak hanya jika memberi status atau memandu perhatian.'
		],
		quiz: [
			{
				id: 'ui-ux-designer-b5-q1',
				question: 'Apa yang dimaksud dengan micro-interaction?',
				options: [
					'Interaksi kecil yang merespons satu aksi pengguna, misalnya menyukai tombol atau menarik layar untuk memuat ulang',
					'Animasi pembuka layar selamat datang yang berdurasi lima detik',
					'Seluruh transisi antarhalaman dalam satu aplikasi',
					'Penambahan fitur baru pada setiap rilis mingguan'
				],
				correct_answer_index: 0,
				explanation:
					'Micro-interaction melayani satu aksi kecil dan langsung meresponsnya dengan umpan balik. Splash screen dan transisi halaman berskala lebih besar, sedangkan rilis fitur adalah keputusan produk, bukan interaksi.'
			},
			{
				id: 'ui-ux-designer-b5-q2',
				question: 'Berdasarkan CSS berikut, apa yang terjadi pada tombol ketika ditekan pengguna?',
				code: `.tombol {
  transition: transform 0.2s ease;
}
.tombol:active {
  transform: scale(0.96);
}`,
				code_lang: 'css',
				code_caption: 'tombol.css',
				options: [
					'Tombol sedikit mengecil selama sekitar 0,2 detik lalu kembali ke ukuran semula',
					'Tombol otomatis berubah warna menjadi merah',
					'Tombol menghilang dari layar secara permanen',
					'Tombol berputar 90 derajat setiap kali ditekan'
				],
				correct_answer_index: 0,
				explanation:
					'Pseudo-class `:active` memberi `scale(0.96)` hanya saat tombol ditekan, dan `transition` membuat perubahan itu merambat selama 0,2 detik. Tidak ada aturan warna, penghilangan, atau rotasi pada potongan ini.'
			},
			{
				id: 'ui-ux-designer-b5-q3',
				question:
					'Berapa rentang durasi yang umumnya terasa nyaman untuk micro-interaction?',
				options: [
					'Satu sampai dua detik agar pengguna menyadari perubahan',
					'Lebih dari lima detik agar terasa dramatis',
					'Sekitar 150 sampai 300 milidetik agar terasa responsif',
					'Tanpa durasi karena animasi sebaiknya langsung tanpa transisi'
				],
				correct_answer_index: 2,
				explanation:
					'Durasi di bawah setengah detik tetap terlihat namun tidak menunda tugas, sehingga produk terasa responsif. Lebih dari satu detik membuat pengguna menunggu, dan tanpa transisi perubahan justru melompat dan terasa kasar.'
			},
			{
				id: 'ui-ux-designer-b5-q4',
				question:
					'Pengguna menarik layar ke bawah untuk memuat ulang, tetapi tidak ada tanda apa pun sehingga ia menarik berulang kali. Masalahnya ada pada...',
				options: [
					'Jumlah data yang tersimpan di server',
					'Ukuran font halaman utama',
					'Warna logo aplikasi',
					'Umpan balik micro-interaction yang tidak menunjukkan sistem sedang bekerja'
				],
				correct_answer_index: 3,
				explanation:
					'Tanpa umpan balik seperti indikator atau perubahan bentuk, pengguna tidak tahu apakah permintaannya diterima sehingga ia mengulang aksi. Data server, ukuran font, dan warna logo tidak memberi tahu status proses kepada pengguna.'
			},
			{
				id: 'ui-ux-designer-b5-q5',
				question: 'Manakah miskonsepsi umum tentang prototipe dan animasi?',
				options: [
					'Semakin banyak animasi dan efek, semakin premium hasil desainnya',
					'Animasi sebaiknya punya tujuan seperti menunjukkan status atau memandu perhatian',
					'Prototipe yang bisa diklik berguna menguji alur sebelum coding dimulai',
					'Prototipe tidak perlu sempurna karena tujuannya menguji asumsi'
				],
				correct_answer_index: 0,
				explanation:
					'Efek yang menumpuk tanpa tujuan justru memperlambat tugas dan membuat pengguna pusing, bukan merasa premium. Tiga opsi lain adalah panduan yang benar: animasi berfungsi, prototipe menguji alur, dan hasil uji tidak menuntut kesempurnaan.'
			},
			{
				id: 'ui-ux-designer-b5-q6',
				question:
					'Kamu harus menguji alur checkout minggu ini sementara developer belum mulai coding. Pilihan paling tepat?',
				options: [
					'Menunggu versi produksi selesai supaya hasilnya paling akurat',
					'Membuat prototipe klik dari wireframe yang mewakili alur utama',
					'Menyusun dokumen teks panjang tanpa visual sama sekali',
					'Menggambar seluruh layar dalam resolusi sangat tinggi dengan detail ikon'
				],
				correct_answer_index: 1,
				explanation:
					'Prototipe klik sudah cukup untuk menunjukkan urutan langkah dan mengumpulkan temuan sebelum kode ada. Menunggu produksi justru menghilangkan kesempatan memperbaiki murah, sedangkan dokumen teks dan detail piksel tidak menguji alur.'
			},
			{
				id: 'ui-ux-designer-b5-q7',
				question: 'Apa yang dilakukan potongan CSS ini pada elemen `.kartu`?',
				code: `@keyframes muncul {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.kartu { animation: muncul 0.25s ease-out; }`,
				code_lang: 'css',
				code_caption: 'animasi-kartu.css',
				options: [
					'Menyembunyikan kartu secara permanen dari halaman',
					'Membuat kartu berputar setiap satu detik',
					'Memunculkan kartu dengan efek meluncur naik selama 0,25 detik',
					'Mengubah kartu menjadi tombol yang bisa ditekan'
				],
				correct_answer_index: 2,
				explanation:
					'Keyframes `muncul` bergerak dari `opacity: 0` dan turun 8px menuju posisi normal, sehingga kartu tampak muncul sambil naik selama 0,25 detik. Tidak ada penghapusan permanen, rotasi berkelanjutan, atau perubahan elemen menjadi tombol.'
			},
			{
				id: 'ui-ux-designer-b5-q8',
				question:
					'Sebuah aplikasi memakai animasi 1,5 detik di setiap pindah layar, lalu pengguna mengeluh "lemot". Tindakan terbaik?',
				options: [
					'Menambah efek parallax agar perpindahan terasa lebih halus',
					'Mempertahankan durasi karena animasi panjang terasa mahal',
					'Menghapus seluruh transisi termasuk perubahan status tombol',
					'Mempercepat atau menghapus transisi yang tidak membantu tugas, sisakan yang memberi umpan balik'
				],
				correct_answer_index: 3,
				explanation:
					'Yang membuat lambat adalah durasi yang menunda langkah berikutnya, jadi transisi hiasan dipangkas atau dilepas sambil status penting tetap dipertahankan. Menambah efek memperparah, mempertahankan durasi mengabaikan keluhan, dan menghapus semua umpan balik membuat aksi terasa tak berjawab.'
			},
			{
				id: 'ui-ux-designer-b5-q9',
				question: 'Apa yang membedakan prototipe dari mockup statis?',
				options: [
					'Prototipe bisa diklik dan mensimulasikan alur, mockup hanya tampilan diam',
					'Prototipe selalu berupa kode produksi siap rilis',
					'Mockup selalu bisa diuji langsung bersama pengguna sungguhan',
					'Prototipe wajib memakai warna abu-abu tanpa warna sama sekali'
				],
				correct_answer_index: 0,
				explanation:
					'Prototipe punya interaksi: tautan, transisi, dan respons terhadap klik yang meniru produk nyata. Mockup tetap gambar diam, kode produksi baru muncul di tahap implementasi, dan wireframe abu-abu adalah nama lain untuk sketsa rendah detail.'
			},
			{
				id: 'ui-ux-designer-b5-q10',
				question:
					'Saat data dimuat, layar kosong tanpa tanda apa pun selama dua detik. Solusi yang paling sesuai prinsip micro-interaction?',
				options: [
					'Menampilkan pesan kesalahan agar pengguna tahu ada masalah',
					'Menampilkan status progres seperti skeleton atau penanda putar agar pengguna tahu sistem bekerja',
					'Membiarkan layar kosong agar pengguna tidak terganggu',
					'Menonaktifkan seluruh halaman sampai data selesai tanpa penanda sama sekali'
				],
				correct_answer_index: 1,
				explanation:
					'Saat proses berjalan, pengguna perlu tanda bahwa sistem bekerja, dan skeleton atau spinner memberi umpan balik itu. Pesan error hanya untuk kegagalan, layar kosong membingungkan, dan penonaktifan tanpa penanda tetap membuat pengguna menunggu dalam kegelapan.'
			}
		]
	},
	{
		id: 13,
		scope_id: 'ui-ux-designer',
		bab_number: 6,
		title: 'Usability Testing & Evaluasi Heuristik',
		subtitle: 'Validasi Pengguna',
		explanation:
			'Desain yang belum pernah dicoba ke pengguna ibarat resep masakan yang belum pernah dicicipi: kelihatan lengkap di kertas, tapi bisa jadi terlalu asin. **Usability testing** sederhananya begini, ajak 3-5 orang yang mewakili target pengguna, beri satu tugas nyata seperti mencari sepatu ukuran 42 lalu membayarnya, dan minta mereka **berpikir keras** sambil mengerjakan. Kamu diam dan mengamati: di mana mereka berhenti, berapa kali salah klik, berapa lama selesai, dan kata apa yang keluar saat bingung. Tugasmu bukan menjelaskan produk ke peserta, melainkan menonton produk dan alurmu diuji.\n\nMengapa repot-repot? Karena setelah rilis, biaya memperbaiki masalah naik drastis: mengubah wireframe butuh menit, mengubah desain butuh jam, mengubah kode dan basis data butuh hari. Sedikit pengujian di awal sudah menutup sebagian besar masalah besar, dan penelitian klasik menyebut sekitar lima peserta per putaran sudah menemukan mayoritas masalah berulang; yang efektif adalah memperbaiki lalu **diuji ulang**, bukan menambah peserta dalam satu putaran panjang. Pelengkapnya adalah **evaluasi heuristik** oleh pakar, yang menilai desain terhadap pedoman seperti visibility of system status dan match with real world. Heuristik cepat karena tanpa peserta, tetapi tetap tidak menggantikan pengamatan ke pengguna sungguhan. Praktiknya: tetapkan tugas beserta ukuran keberhasilannya, catat perilaku lebih dulu sebelum opini, lalu urutkan temuan berdasarkan severity supaya tim tahu mana yang dikerjakan pekan ini.',
		code_snippet: null,
		code_caption: null,
		image_url: '/diagrams/ui-ux-designer-b6.svg',
		diagram: 'pipeline',
		diagram_caption:
			'Gambar 13.1: Siklus usability testing — menyusun tugas, merekrut peserta, menjalankan sesi, menganalisis temuan, lalu menguji ulang setelah perbaikan.',
		sections: [
			{
				heading: 'Metrik yang layak dicatat',
				body: 'Tiga metrik inti: task success rate untuk berapa persen peserta menyelesaikan tugas, time on task untuk mendeteksi langkah yang berbelit, dan jumlah kesalahan untuk melihat titik membingungkan. Tambahkan kutipan kalimat bingung peserta supaya angka punya konteks yang mudah dipahami tim.'
			}
		],
		key_points: [
			'Amati pengguna mengerjakan tugas nyata dan catat perilakunya, bukan sekadar menanyakan apakah mereka suka.',
			'Sekitar 3-5 peserta per putaran cukup untuk menemukan masalah besar; perbaiki lalu uji ulang.',
			'Nilai temuan dari severity, dan lengkapi dengan evaluasi heuristik oleh pakar untuk menyapu masalah umum.'
		],
		quiz: [
			{
				id: 'ui-ux-designer-b6-q1',
				question: 'Apa yang dimaksud dengan usability testing?',
				options: [
					'Menguji kecepatan server di bawah beban pengguna yang ramai',
					'Menguji kecocokan warna brand dengan selera tim internal',
					'Menjalankan unit test pada kode setiap komponen',
					'Mengamati pengguna nyata mengerjakan tugas untuk menemukan masalah pemakaian'
				],
				correct_answer_index: 3,
				explanation:
					'Usability testing berpusat pada pengguna nyata yang mengerjakan tugas, sehingga masalahnya terlihat dari perilaku. Kecepatan server adalah urusan performa, selera warna bukan pengukuran, dan unit test adalah pekerjaan pengembang atas kode.'
			},
			{
				id: 'ui-ux-designer-b6-q2',
				question: 'Selama sesi usability testing, peran moderator sebaiknya...',
				options: [
					'Menjelaskan setiap fitur agar peserta tidak bingung',
					'Diam dan memberi tugas, lalu mengamati tanpa menyelamatkan peserta',
					'Menjawab semua pertanyaan peserta secepat mungkin',
					'Mengevaluasi penampilan visual setiap halaman bersama peserta'
				],
				correct_answer_index: 1,
				explanation:
					'Yang diuji adalah kemampuan produk mengarahkan pengguna, jadi bantuan moderator justru menutupi kelemahan itu. Menjelaskan fitur dan menjawab pertanyaan mengubah sesi menjadi demo, sedangkan penampilan visual bukan fokus tugas pemakaian.'
			},
			{
				id: 'ui-ux-designer-b6-q3',
				question:
					'Berdasarkan data hasil pengujian berikut, berapa persen peserta yang berhasil menyelesaikan tugas?',
				code: `[
  { "peserta": "P1", "berhasil": true },
  { "peserta": "P2", "berhasil": true },
  { "peserta": "P3", "berhasil": false },
  { "peserta": "P4", "berhasil": true },
  { "peserta": "P5", "berhasil": false }
]`,
				code_lang: 'json',
				code_caption: 'hasil-test.json',
				options: ['60', '40', '3', '5'],
				correct_answer_index: 0,
				explanation:
					'Tiga dari lima peserta berhasil (P1, P2, P4), sehingga success rate-nya 3/5 x 100 = 60 persen. Angka 40 adalah yang tidak berhasil, 3 adalah jumlah peserta lulus, dan 5 adalah total peserta.'
			},
			{
				id: 'ui-ux-designer-b6-q4',
				question:
					'Peserta berkata "mudah sekali" padahal kamu melihat dia salah klik tiga kali. Tindakan paling tepat?',
				options: [
					'Menganggap sesi sukses karena peserta memberi pujian',
					'Membatalkan sesi karena peserta dianggap tidak kooperatif',
					'Menjadikan perilaku yang teramati sebagai data utama, pernyataan lisan sebagai konteks tambahan',
					'Mengulang pertanyaan sampai peserta mau mengaku kesulitan'
				],
				correct_answer_index: 2,
				explanation:
					'Perilaku nyata adalah bukti objektif, sementara pujian sering muncul karena sopan atau ingin menyenangkan peneliti. Mendesak peserta justru membuat sesi berikutnya tidak jujur, dan membatalkan sesi membuang data yang sudah terkumpul.'
			},
			{
				id: 'ui-ux-designer-b6-q5',
				question: 'Apa itu heuristic evaluation?',
				options: [
					'Wawancara mendalam dengan dua puluh responden acak',
					'Penilaian desain oleh pakar berdasarkan pedoman heuristik usability',
					'Pengukuran kecepatan muat halaman di berbagai jaringan',
					'Pengujian A/B dua versi halaman ke pengguna'
				],
				correct_answer_index: 1,
				explanation:
					'Heuristik adalah penilaian cepat oleh pakar yang membandingkan desain dengan pedoman umum seperti visibility of system status. Wawancara, pengukuran performa, dan A/B testing adalah teknik lain dengan prosedur yang berbeda.'
			},
			{
				id: 'ui-ux-designer-b6-q6',
				question: 'Manakah miskonsepsi umum tentang evaluasi heuristik?',
				options: [
					'Heuristic evaluation bisa sepenuhnya menggantikan pengujian ke pengguna',
					'Heuristik cepat dilakukan tanpa peserta dan bagus untuk menyapu masalah umum',
					'Hasil heuristik sebaiknya diurutkan berdasarkan severity',
					'Tetap ada masalah yang hanya muncul saat pengguna sungguhan memakai produk'
				],
				correct_answer_index: 0,
				explanation:
					'Heuristik menangkap masalah yang sudah dikenal pakar, tetapi tidak menemukan kebingungan tak terduga milik pengguna spesifikmu. Tiga opsi lain adalah fakta yang benar: heuristik cepat, temuan perlu severity, dan ia melengkapi namun tidak menggantikan pengujian.'
			},
			{
				id: 'ui-ux-designer-b6-q7',
				question:
					'Berapa peserta yang umumnya cukup per putaran usability testing untuk menemukan sebagian besar masalah?',
				options: [
					'Minimal seratus orang agar valid secara statistik',
					'Tidak perlu peserta, cukup tim internal yang menguji',
					'Sekitar 30 sampai 50 orang agar mewakili seluruh segmen',
					'Sekitar 3 sampai 5 orang sudah cukup menemukan mayoritas masalah berulang'
				],
				correct_answer_index: 3,
				explanation:
					'Pengamatan kualitatif menemukan masalah berulang dengan sangat cepat, jadi beberapa peserta per putaran sudah cukup. Seratusan responden dibutuhkan untuk survei kuantitatif, dan tim internal tidak mewakili pengguna karena mereka sudah terlalu paham produk.'
			},
			{
				id: 'ui-ux-designer-b6-q8',
				question:
					'Setelah beberapa temuan pengujian terkumpul, langkah berikutnya yang paling tepat adalah...',
				options: [
					'Memperbaiki semua temuan sekaligus tanpa urutan sama sekali',
					'Menghapus temuan yang dianggap sepele begitu saja',
					'Mengurutkan temuan berdasarkan severity dan frekuensinya lalu memperbaiki yang paling menghambat',
					'Menambah peserta lagi sampai jumlah temuan bertambah'
				],
				correct_answer_index: 2,
				explanation:
					'Severity menentukan mana yang menghambat tugas utama sehingga tim tahu apa yang dikerjakan pekan ini. Memperbaiki tanpa urutan membuang waktu, menghapus temuan kehilangan informasi, dan menambah peserta hanya memperpanjang sesi tanpa memperbaiki apa pun.'
			},
			{
				id: 'ui-ux-designer-b6-q9',
				question:
					'Pengguna menekan tombol "Bayar" berulang kali karena layar tidak menunjukkan apa-apa. Pelanggaran heuristik yang paling tepat adalah...',
				options: [
					'Match between system and the real world',
					'Visibility of system status',
					'Error prevention',
					'Aesthetic and minimalist design'
				],
				correct_answer_index: 1,
				explanation:
					'Heuristik visibility of system status menuntut sistem selalu memberi tahu pengguna apa yang sedang terjadi lewat indikator atau pesan. Ketiga opsi lain membahas bahasa yang dipakai, pencegahan kesalahan, dan kebersihan tampilan, bukan status proses.'
			},
			{
				id: 'ui-ux-designer-b6-q10',
				question: 'Metrik "time on task" paling berguna untuk...',
				options: [
					'Menentukan warna tombol utama halaman',
					'Menghitung jumlah berkas CSS yang dimuat',
					'Mendeteksi langkah yang berbelit atau terlalu lama dibanding baseline',
					'Mengukur jumlah pengunjung harian situs'
				],
				correct_answer_index: 2,
				explanation:
					'Waktu penyelesaian yang jauh lebih lama dari perkiraan menandakan langkah membingungkan atau berbelit. Warna tombol dan jumlah berkas CSS bukan metrik pengujian, sedangkan pengunjung harian dihitung dari analitik kunjungan.'
			}
		]
	},
	{
		id: 14,
		scope_id: 'ui-ux-designer',
		bab_number: 7,
		title: 'Handoff Desain ke Developer & Etika UX',
		subtitle: 'Serah Terima & Etika',
		explanation:
			'Menyerahkan desain tanpa spesifikasi ibarat koki mengirim gambar masakan ke dapur lain: hasilnya pasti berbeda-beda. **Handoff** yang baik menyertakan token dan ukuran, aset siap pakai, varian komponen beserta status seperti kosong, error, dan loading, catatan aksesibilitas seperti kontras minimal 4,5:1 untuk teks kecil, target sentuh, serta urutan fokus keyboard, dan contoh kondisi nyata seperti teks panjang maupun data kosong. Semua itu disampaikan sambil berdiskusi, bukan dilempar sebagai berkas final yang tidak boleh disentuh siapa pun.\n\nEtika ikut masuk di tahap ini karena desain dan kode memengaruhi keputusan jutaan orang. Desainer dan developer sepakat menghindari **dark pattern**: tombol berlangganan besar sementara tombol berhenti disembunyikan, penghapusan akun yang berbelit, atau notifikasi promo yang tidak bisa dimatikan. Praktik sehatnya, libatkan developer sejak awal, pakai istilah yang sama di dokumen dan kode, hormati kredit karya tim, dan berani menolak permintaan yang memanipulasi pengguna dengan mengusulkan alternatif yang jujur. Sebagai contoh nyata, saat developer menemukan kondisi yang belum ada di desain misalnya teks tiga kali lebih panjang, keduanya membahas solusi lalu memperbarui dokumen bersama. Produk yang amanah biasanya juga lebih mudah dipercaya dan dipakai dalam jangka panjang.',
		code_snippet: `{
  "component": "Button",
  "variant": "primary",
  "props": { "bg": "#2563eb", "radius": "8px", "padding": "8px 16px" },
  "states": ["default", "hover", "focus", "disabled"],
  "a11y": { "minTarget": "44px", "focusRing": "2px solid #0f172a" },
  "assets": ["icon-plus.svg", "loading-spinner.svg"]
}`,
		code_lang: 'json',
		code_caption: 'handoff-spec.json — spesifikasi komponen untuk developer',
		image_url: '/diagrams/ui-ux-designer-b7.svg',
		diagram: 'client-server',
		diagram_caption:
			'Gambar 14.1: Alur handoff — desainer mengunggah aset dan token ke cloud, developer menariknya ke basis kode lewat API atau plugin, lalu hasil build dikirim kembali untuk diperiksa bersama.',
		key_points: [
			'Handoff yang lengkap menyertakan token, aset, varian, status, catatan aksesibilitas, dan contoh kondisi nyata.',
			'Libatkan developer sejak awal dan selesaikan perbedaan persepsi lewat diskusi, bukan dokumen yang dilempar sepihak.',
			'Tolak dark pattern dan praktik manipulatif; desain yang jujur dan aksesibel lebih mudah dipercaya pengguna.'
		],
		quiz: [
			{
				id: 'ui-ux-designer-b7-q1',
				question: 'Apa yang dimaksud dengan handoff desain?',
				options: [
					'Menyerahkan seluruh keputusan coding sepenuhnya ke tim desain',
					'Menghapus berkas desain begitu produk dirilis',
					'Serah terima spesifikasi, aset, token, dan status komponen agar desain direalisasikan secara akurat',
					'Membuat presentasi promosi produk untuk klien'
				],
				correct_answer_index: 2,
				explanation:
					'Handoff adalah jembatan informasi antara desain dan implementasi supaya hasil akhir sesuai maksud desainer. Coding tetap milik developer, berkas desain disimpan untuk rujukan, dan presentasi klien adalah kegiatan berbeda.'
			},
			{
				id: 'ui-ux-designer-b7-q2',
				question:
					'Berdasarkan spesifikasi JSON berikut, berapa status tombol yang harus disiapkan developer?',
				code: `{
  "button": {
    "primary": { "bg": "#2563eb", "radius": "8px" },
    "states": ["default", "hover", "focus", "disabled"]
  }
}`,
				code_lang: 'json',
				code_caption: 'spesifikasi.json',
				options: ['4', '2', '1', '8'],
				correct_answer_index: 0,
				explanation:
					'Array `states` berisi empat nilai: default, hover, focus, dan disabled, sehingga developer menyiapkan tampilan untuk keempatnya. Angka lain muncul jika menghitung jumlah properti atau nilai lain, bukan jumlah status.'
			},
			{
				id: 'ui-ux-designer-b7-q3',
				question:
					'Apa yang paling sering terlewat saat handoff dan membuat developer menebak-nebak?',
				options: [
					'Ukuran logo di sudut halaman',
					'State tambahan seperti kosong, error, loading, dan kondisi data panjang',
					'Nama berkas gambar di dalam folder aset',
					'Judul halaman pada tag head dokumen'
				],
				correct_answer_index: 1,
				explanation:
					'Kondisi di luar skenario normal adalah yang paling sering tidak digambar, padahal developer tetap harus menanganinya. Logo, nama berkas, dan judul halaman biasanya sudah jelas dan jarang menimbulkan tebakan.'
			},
			{
				id: 'ui-ux-designer-b7-q4',
				question:
					'Sebuah aplikasi membuat tombol "Berlangganan" besar sedangkan tombol "Berhenti" kecil, abu-abu, dan disembunyikan tiga langkah ke dalam. Praktik ini disebut...',
				options: [
					'Inclusive design karena memberi pilihan kepada pengguna',
					'Design token karena warna tombol disimpan terpusat',
					'Progressive disclosure karena menu dibuka bertahap',
					'Dark pattern karena sengaja mempersulit pengguna menolak'
				],
				correct_answer_index: 3,
				explanation:
					'Praktik ini memanfaatkan hambatan dan perbedaan visual untuk menekan pengguna agar berlangganan, yang merupakan ciri dark pattern. Inclusive design dan progressive disclosure justru dimaksudkan memudahkan pengguna, sedangkan design token tidak ada hubungannya dengan kedua hal itu.'
			},
			{
				id: 'ui-ux-designer-b7-q5',
				question: 'Manakah miskonsepsi umum dalam hubungan desainer dan developer?',
				options: [
					'Desainer sebaiknya melibatkan developer sejak awal proyek',
					'Spesifikasi yang jelas mengurangi bolak-balik revisi',
					'Developer hanya perlu menyalin pixel tanpa perlu berdiskusi',
					'Perbedaan persepsi desain dan implementasi wajib dibahas saat handoff'
				],
				correct_answer_index: 2,
				explanation:
					'Desain selalu butuh penyesuaian teknis seperti kondisi data, performa, dan aksesibilitas, sehingga diskusi bukan tanda developer malas melainkan bagian normal dari kolaborasi. Tiga opsi lain adalah praktik kerja yang benar.'
			},
			{
				id: 'ui-ux-designer-b7-q6',
				question: 'Hal berikut sebaiknya ikut disertakan dalam handoff yang bertanggung jawab...',
				options: [
					'Catatan aksesibilitas seperti kontras minimal, target sentuh, dan urutan fokus keyboard',
					'Selera warna pribadi desainer tanpa alasan penggunaan',
					'Daftar kompetitor beserta harga produk mereka',
					'Jadwal libur tim desain periode berjalan'
				],
				correct_answer_index: 0,
				explanation:
					'Catatan aksesibilitas mencegah produk hanya bisa dipakai orang tertentu dan sering justru menjadi syarat mutlak. Selera pribadi, data kompetitor, dan jadwal libur bukan informasi teknis yang dibutuhkan untuk merealisasikan desain.'
			},
			{
				id: 'ui-ux-designer-b7-q7',
				question:
					'Tim growth meminta desain yang membuat pengguna sulit menemukan tombol hapus akun dan terus menerima notifikasi promo. Respons etis yang paling tepat?',
				options: [
					'Mengikuti permintaan karena itu urusan bisnis, bukan etika desain',
					'Menolak pola manipulatif dan mengusulkan cara yang jujur serta mudah ditemukan',
					'Menambah lebih banyak notifikasi agar pengguna cepat jenuh',
					'Menyembunyikan tombol hapus akun ke lokasi yang lebih dalam lagi'
				],
				correct_answer_index: 1,
				explanation:
					'Desain memengaruhi keputusan pengguna, sehingga kejujuran dan kontrol pengguna atas akunnya adalah tanggung jawab desainer. Mengikuti atau memperparah permintaan itu melanggar etika, dan kejenuhan pengguna justru merusak kepercayaan produk.'
			},
			{
				id: 'ui-ux-designer-b7-q8',
				question: 'Apa itu dark pattern?',
				options: [
					'Pola desain gelap yang hanya dipakai di mode malam',
					'Komponen UI yang sudah usang dan harus diganti',
					'Gaya visual dengan kontras warna yang rendah',
					'Pola antarmuka yang dirancang untuk menipu atau memanipulasi keputusan pengguna'
				],
				correct_answer_index: 3,
				explanation:
					'Nama "dark" merujuk pada niatnya yang memanipulasi, bukan warnanya. Mode malam, komponen usang, dan kontras rendah adalah hal teknis atau visual yang tidak melibatkan maksud menipu.'
			},
			{
				id: 'ui-ux-designer-b7-q9',
				question:
					'Jika tim memutuskan mengganti warna primer menjadi #1d4ed8, apa yang perlu diubah pada potongan CSS berikut?',
				code: `:root {
  --btn-primary-bg: #2563eb;
  --btn-radius: 8px;
}
.btn-primary {
  background: var(--btn-primary-bg);
  border-radius: var(--btn-radius);
}`,
				code_lang: 'css',
				code_caption: 'tombol-handoff.css',
				options: [
					'Hanya warna di dalam `.btn-primary` karena variabel tidak bisa diubah',
					'Seluruh berkas CSS dari awal agar tidak ada aturan tersisa',
					'Cukup nilai `--btn-primary-bg` di satu tempat karena dipakai lewat variabel',
					'Tidak perlu apa-apa karena warna sudah final'
				],
				correct_answer_index: 2,
				explanation:
					'Nilai primer hanya didefinisikan sekali di `:root` lalu dirujuk lewat `var()`, jadi mengubah satu tempat cukup. `.btn-primary` tidak menyimpan warna literal, dan mengganti seluruh berkas justru membuang keuntungan token.'
			},
			{
				id: 'ui-ux-designer-b7-q10',
				question:
					'Developer menemukan kondisi yang tidak ada di desain, misalnya teks tiga kali lebih panjang dari perkiraan. Sikap yang paling sehat?',
				options: [
					'Developer mengubah desain sepihak tanpa kabar ke siapa pun',
					'Desainer menolak perubahan karena desain sudah disetujui',
					'Keduanya berdiskusi mencari solusi bersama lalu memperbarui dokumen desain',
					'Masalah dibiarkan sampai pengguna akhirnya komplain'
				],
				correct_answer_index: 2,
				explanation:
					'Kondisi tak terduga adalah temuan baru yang harus diselesaikan bersama karena desainer paham maksudnya dan developer paham batasan teknisnya. Mengubah sepihak memicu penyimpangan, menolak mentah-mentah mengabaikan kenyataan, dan membiarkannya berarti menunggu kegagalan.'
			}
		]
	}
];
