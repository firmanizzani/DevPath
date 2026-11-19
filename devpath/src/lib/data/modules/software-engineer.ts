import type { BabModule } from '$lib/data/types';

export const modules: BabModule[] = [
	{
		id: 1,
		scope_id: 'software-engineer',
		bab_number: 1,
		title: 'Logika, Variabel & Tipe Data',
		subtitle: 'Fondasi Pemrograman',
		explanation:
			'Sebelum program bisa memutuskan apa pun, kamu perlu tiga bahan dasar: variabel, tipe data, dan operator. Variabel adalah nama yang kamu buat untuk menyimpan nilai di memori, misalnya usia, harga, atau statusLogin. Tipe data menentukan bentuk nilai itu sekaligus aturan mainnya: string untuk teks, number untuk angka, boolean untuk pilihan dua arah seperti true dan false, lalu null dan undefined sebagai penanda nilai kosong. Operator menghubungkan semuanya, mulai dari aritmatika seperti penjumlahan dan perkalian, perbandingan seperti lebih besar atau sama dengan, sampai logika dan atau. Yang penting kamu pahami sejak awal, satu tipe data yang salah pilih bisa mengubah arti seluruh perhitungan.\n\nMasalah paling sering muncul bukan karena logikamu salah, melainkan karena tipe datanya tidak seperti yang kamu bayangkan. Semua nilai yang datang dari input HTML masuk sebagai string, jadi menjumlahkan harga dan ongkir bisa menghasilkan teks panjang alih-alih angka. Untuk itu konversi dulu memakai Number, parseInt, atau parseFloat sebelum melakukan hitungan. Kalau operasi terasa aneh, langsung curigai tipe datanya dengan typeof dan cetak nilainya ke konsol. Langkah sederhana ini sering menghemat waktu debugging jauh lebih banyak daripada membaca ulang kode dari awal.\n\nSatu kebiasaan yang layak kamu mulai sekarang: pakai const sebagai default, lalu ganti ke let hanya ketika nilai memang berubah. Hindari var karena cakupannya bocor keluar blok dan mudah membingungkan siapa pun yang membacanya. Dengan aturan kecil ini, kode kamu jadi lebih mudah diprediksi, lebih aman, dan siap kamu pakai untuk membangun percabangan di bab berikutnya.',
		code_snippet: `const nama = 'Dina';
let skor = 82.5;
const lulus = skor >= 75;

console.log(nama, skor, lulus);
console.log(typeof nama);   // "string"
console.log(typeof lulus);  // "boolean"

const dariInput = '1500';
const total = Number(dariInput) + 500;
console.log(total);         // 2000`,
		code_lang: 'javascript',
		code_caption: 'variables.js — deklarasi variabel, tipe data, dan typeof',
		image_url: '/diagrams/software-engineer-b1.svg',
		diagram: null,
		diagram_caption:
			'Gambar 1.1: Enam tipe data primitif yang menjadi bahan dasar variabel — teks, angka, boolean, daftar, objek, dan nilai kosong.',
		key_points: [
			'Variabel adalah nama untuk sebuah nilai; tipe data menentukan bagaimana nilai itu diproses.',
			'Operator `+` dengan string menyambung teks, sedangkan operator aritmatika lain mengonversinya jadi angka.',
			'Pakai `const` sebagai default, `let` saat nilai berubah, dan `typeof` untuk memeriksa tipe data.'
		],
		quiz: [
			{
				id: 'software-engineer-b1-q1',
				question: 'Apa keluaran dari potongan kode berikut?',
				code: `const a = '5';
const b = 3;
console.log(a + b, a * b);`,
				code_lang: 'javascript',
				code_caption: 'operasi.js — operator + dan * pada string',
				options: ['"53 15"', '"8 15"', '"53 8"', 'Error: tipe data tidak cocok'],
				correct_answer_index: 0,
				explanation:
					'Operator `+` yang bertemu string berarti menyambung teks, jadi 5 dan 3 menjadi teks 53. Operator `*` mengubah string jadi angka lebih dulu, sehingga hasilnya 15 bertipe number.'
			},
			{
				id: 'software-engineer-b1-q2',
				question: 'Apa yang dimaksud dengan tipe data boolean?',
				options: [
					'Tipe data untuk menyimpan angka bulat saja',
					'Tipe data yang hanya berisi true atau false',
					'Tipe data khusus untuk teks panjang',
					'Tipe data untuk menyimpan banyak nilai sekaligus'
				],
				correct_answer_index: 1,
				explanation:
					'Boolean hanya punya dua kemungkinan nilai, yaitu true atau false, dan hasilnya paling sering muncul dari operator perbandingan. Tipe ini jadi bahan utama kondisi if yang akan kamu pelajari di bab berikutnya.'
			},
			{
				id: 'software-engineer-b1-q3',
				question: 'Manakah pernyataan yang benar tentang `==` dan `===` di JavaScript?',
				options: [
					'`===` hanya boleh dipakai untuk angka, `==` hanya untuk teks',
					'Keduanya identik, `===` cuma ditulis lebih panjang',
					'`===` membandingkan nilai sekaligus tipe datanya, sedangkan `==` membandingkan nilai setelah konversi tipe',
					'`==` lebih ketat karena wajib menolak perbedaan tipe'
				],
				correct_answer_index: 2,
				explanation:
					'Karena `===` tidak melakukan konversi, perbandingan teks 5 dengan angka 5 menghasilkan false. Operator `==` mengonversi tipe dulu sehingga hasilnya true, dan kejadian ini sering jadi sumber bug yang sulit dilacak.'
			},
			{
				id: 'software-engineer-b1-q4',
				question:
					'Di form checkout, total dihitung dengan `const total = harga + ongkir` sehingga hasilnya jadi "150005000" padahal keduanya angka. Apa penyebabnya?',
				options: [
					'Nilai `harga` seharusnya dideklarasikan dengan `let`, bukan `const`',
					'Browser tidak mendukung penjumlahan dua angka',
					'Baris tersebut perlu diakhiri dengan titik koma',
					'Nilai dari input HTML berupa string sehingga operator + menyambung teks'
				],
				correct_answer_index: 3,
				explanation:
					'Semua nilai yang masuk lewat input HTML selalu berupa string, jadi penjumlahan berubah jadi penyambungan teks. Konversi dulu dengan Number atau parseFloat sebelum menghitung; memakai const atau let tidak berpengaruh sedikit pun.'
			},
			{
				id: 'software-engineer-b1-q5',
				question:
					'Untuk menyimpan nilai yang tidak akan berubah sepanjang program, deklarasi mana yang paling tepat?',
				options: [
					'`const`, karena nilainya ditetapkan saat deklarasi',
					'`let`, karena lebih ringkas ditulis',
					'`var`, karena paling lama ada di bahasa',
					'Tanpa deklarasi supaya lebih fleksibel'
				],
				correct_answer_index: 0,
				explanation:
					'`const` memberi sinyal bahwa nilai tersebut tidak akan diganti, sehingga pembaca kode tidak perlu menebak-nebak. Kalau nilai memang berubah seperti skor yang bertambah, barulah pakai `let`; `var` sebaiknya dihindari karena cakupannya bocor keluar blok.'
			},
			{
				id: 'software-engineer-b1-q6',
				question: 'Apa keluaran dari kode berikut?',
				code: `console.log(typeof null);
console.log(typeof undefined);
console.log(typeof [1, 2]);`,
				code_lang: 'javascript',
				code_caption: 'typeof.js — pengecekan tipe data',
				options: [
					'null, undefined, array',
					'"object", "undefined", "object"',
					'"null", "undefined", "array"',
					'object, object, object'
				],
				correct_answer_index: 1,
				explanation:
					'Function typeof selalu mengembalikan teks, jadi hasilnya berpetik dua. Nilai null memang dilaporkan sebagai "object" karena bug legendaris sejak versi awal JavaScript, sedangkan array juga termasuk tipe object.'
			},
			{
				id: 'software-engineer-b1-q7',
				question:
					'Pernyataan: objek yang dibuat dengan `const` tidak bisa diubah sama sekali. Apakah benar?',
				options: [
					'Benar, `const` membuat objek benar-benar immutable',
					'Benar, tetapi hanya untuk objek yang berisi angka',
					'Tidak sepenuhnya; nilai di dalamnya masih bisa diubah, hanya referensinya yang tidak bisa diganti',
					'Salah total, `const` sama sekali tidak berpengaruh pada objek'
				],
				correct_answer_index: 2,
				explanation:
					'`const` mengunci variabel agar tidak menunjuk ke objek lain, tetapi properti di dalam objek tetap bisa ditambah, diubah, atau dihapus. Kalau objek benar-benar perlu dibekukan, gunakan Object.freeze.'
			},
			{
				id: 'software-engineer-b1-q8',
				question: 'Apa keluaran dari kode berikut?',
				code: `console.log(0 && 'ya');
console.log('' || 'default');
console.log(Boolean(42));`,
				code_lang: 'javascript',
				code_caption: 'logika.js — operator && dan ||',
				options: [
					'Error karena 0 bukan boolean',
					'false, false, false',
					'"ya", "default", 42',
					'0, "default", true'
				],
				correct_answer_index: 3,
				explanation:
					'Operator `&&` mengembalikan nilai pertama yang falsy, jadi 0 yang dicetak. Operator `||` mengembalikan nilai pertama yang truthy sehingga string kosong dilewati dan "default" yang keluar, sementara Boolean(42) menghasilkan true.'
			},
			{
				id: 'software-engineer-b1-q9',
				question:
					'Sebuah skrip menghitung `const rata = (a + b) / 2` dengan a bernilai angka 80 dan b berupa teks "10". Berapa hasilnya?',
				options: [
					'4005, karena penggabungan teks terjadi sebelum pembagian',
					'45, karena teks 10 otomatis dianggap angka',
					'NaN, karena angka dan teks tidak boleh dicampur',
					'Error pada baris perhitungan'
				],
				correct_answer_index: 0,
				explanation:
					'Operator + yang bertemu teks bekerja sebagai penyambung, jadi 80 dan 10 menjadi teks 8010. Baru setelah itu pembagian memaksa teks itu jadi angka, sehingga hasilnya 4005 dan bukan 45.'
			},
			{
				id: 'software-engineer-b1-q10',
				question: 'Apa perbedaan antara `undefined` dan `null`?',
				options: [
					'Keduanya sama persis dan saling bisa ditukar',
					'`undefined` berarti nilai belum pernah diisi, `null` berarti nilai sengaja dikosongkan',
					'`null` khusus untuk angka, `undefined` khusus untuk teks',
					'`undefined` hanya muncul di proyek TypeScript'
				],
				correct_answer_index: 1,
				explanation:
					'JavaScript memberi `undefined` secara otomatis pada variabel, properti, atau fungsi yang belum punya nilai. `null` justru kamu tulis sendiri untuk menandai bahwa sebuah nilai memang dikosongkan secara sengaja.'
			}
		]
	},
	{
		id: 2,
		scope_id: 'software-engineer',
		bab_number: 2,
		title: 'Kontrol Alur (Percabangan & Perulangan)',
		subtitle: 'Decision & Loop',
		explanation:
			'Program yang berjalan lurus dari atas ke bawah hanya berguna untuk tugas sekali jalan. Supaya program bisa mengambil keputusan, kamu membutuhkan percabangan: if, else if, dan else. Kondisi di dalamnya selalu bernilai true atau false, dan cabang pertama yang terpenuhi itulah yang dijalankan. Urutan cabang sangat menentukan, jadi taruh syarat paling spesifik di bagian atas; jika syarat umum ditulis lebih dulu, cabang spesifik di bawahnya tidak akan pernah kejadian karena selalu ketelan oleh cabang pertama.\n\nSementara itu, perulangan dipakai untuk pekerjaan yang berulang: menampilkan ratusan baris data, menghitung total nilai, atau mengulang percobaan koneksi. Tiga bagian yang wajib kamu pahami adalah nilai awal, kondisi berhenti, dan kenaikan penghitung. Kesalahan di salah satu bagian membuat loop tidak pernah berhenti atau justru melewati data terakhir. Break menghentikan perulangan sepenuhnya ketika tujuan sudah tercapai, sedangkan continue hanya melompati satu putaran lalu lanjut ke iterasi berikutnya.\n\nSebelum menjalankan kode, biasakan menebak dulu keluarannya di kertas untuk beberapa putaran pertama. Kalau tebakanmu meleset, biasanya bug ketahuan di situ juga. Kebiasaan ini jauh lebih cepat daripada menambahkan log acak dan menjalankan program berkali-kali hanya untuk melihat apa yang terjadi.',
		code_snippet: `const nilai = 78;

if (nilai >= 75) {
  console.log('Lulus');
} else {
  console.log('Belum lulus');
}

let total = 0;
for (let i = 1; i <= 5; i++) {
  total += i;
}
console.log(total); // 15`,
		code_lang: 'javascript',
		code_caption: 'flow.js — if/else dan perulangan for',
		image_url: '/diagrams/software-engineer-b2.svg',
		diagram: null,
		diagram_caption:
			'Gambar 2.1: Percabangan if-else memilih satu jalur dari kondisi, sedangkan while/for mengulang blok selama kondisi masih terpenuhi.',
		key_points: [
			'`if` / `else if` / `else` dievaluasi berurutan; cabang pertama yang bernilai true yang dijalankan.',
			'Perulangan wajib punya tiga bagian: nilai awal, kondisi berhenti, dan kenaikan penghitung.',
			'`break` menghentikan perulangan total, `continue` hanya melompati satu putaran.'
		],
		quiz: [
			{
				id: 'software-engineer-b2-q1',
				question: 'Apa keluaran dari kode berikut?',
				code: `let total = 0;
for (let i = 1; i <= 5; i++) {
  if (i % 2 === 0) continue;
  total += i;
}
console.log(total);`,
				code_lang: 'javascript',
				code_caption: 'lanjut.js — perulangan dengan continue',
				options: ['15', '9', '6', '0'],
				correct_answer_index: 1,
				explanation:
					'Continue melompati putaran yang bernilai genap, jadi hanya 1, 3, dan 5 yang dijumlahkan sehingga hasilnya 9. Kalau continue diganti break, perulangan berhenti sejak i bernilai 2 dan totalnya hanya 1.'
			},
			{
				id: 'software-engineer-b2-q2',
				question: 'Apa fungsi dari pernyataan `break` di dalam perulangan?',
				options: [
					'Menghentikan perulangan sepenuhnya lalu lanjut ke kode setelahnya',
					'Melompati satu putaran lalu lanjut ke iterasi berikutnya',
					'Mengulang perulangan dari awal',
					'Menghapus variabel penghitung'
				],
				correct_answer_index: 0,
				explanation:
					'`break` langsung mengeluarkan program dari perulangan, sedangkan `continue` hanya melewati sisa blok pada putaran itu. Karena itu `break` cocok ketika tujuan sudah tercapai, misalnya data yang dicari sudah ketemu.'
			},
			{
				id: 'software-engineer-b2-q3',
				question: 'Bagaimana urutan evaluasi ketika sebuah kondisi punya beberapa cabang `else if`?',
				options: [
					'Semua cabang dengan kondisi true dijalankan berurutan',
					'Cabang terakhir yang bernilai true yang dijalankan',
					'Cabang yang ditulis paling bawah selalu dijalankan lebih dulu',
					'Hanya cabang pertama yang true yang dijalankan, lalu evaluasi berhenti'
				],
				correct_answer_index: 3,
				explanation:
					'Kondisi dievaluasi dari atas ke bawah dan berhenti begitu ada yang bernilai true. Karena itu syarat paling spesifik harus ditulis paling atas, kalau tidak cabang itu tidak akan pernah kejadian.'
			},
			{
				id: 'software-engineer-b2-q4',
				question:
					'Kamu perlu mencoba mengambil data dari API dan berhenti begitu berhasil, dengan maksimal 5 percobaan. Bentuk perulangan mana yang paling tepat?',
				options: [
					'`for` tanpa kondisi berhenti sama sekali',
					'`while (true)` tanpa `break`',
					'`for (let coba = 0; coba < 5; coba++)` dengan `break` ketika berhasil',
					'Lima pernyataan `if` yang ditulis berurutan'
				],
				correct_answer_index: 2,
				explanation:
					'Jumlah percobaan sudah diketahui sehingga `for` dengan batas 5 paling jelas, dan `break` memberi jalan keluar segera setelah permintaan sukses. Pola ini mencegah program terus berjalan percuma setelah tujuan tercapai.'
			},
			{
				id: 'software-engineer-b2-q5',
				question: 'Apa yang dicetak oleh kode berikut?',
				code: `let i = 0;
do {
  console.log(i);
  i += 2;
} while (i < 3);`,
				code_lang: 'javascript',
				code_caption: 'doloop.js — perulangan do...while',
				options: ['0', '0 dan 2', '0, 2, dan 4', 'Tidak mencetak apa pun'],
				correct_answer_index: 1,
				explanation:
					'Blok do...while selalu dijalankan sekali sebelum kondisi dicek, jadi nilai 0 tetap tercetak walau kondisinya belum tentu true. Setelah mencetak 0, i menjadi 2 dan kondisi masih benar sehingga 2 ikut tercetak; baru setelah i menjadi 4 perulangannya berhenti.'
			},
			{
				id: 'software-engineer-b2-q6',
				question: 'Kapan `for` lebih cocok digunakan dibanding `while`?',
				options: [
					'Ketika jumlah iterasi sudah bisa ditentukan sejak awal lewat nilai awal, batas, dan kenaikan',
					'Ketika kondisi berhenti hanya diketahui saat program berjalan',
					'Ketika kamu ingin mencetak hasil ke konsol',
					'Ketika variabel penghitungnya harus bertipe teks'
				],
				correct_answer_index: 0,
				explanation:
					'`for` memaket tiga bagian perulangan dalam satu baris sehingga mudah dibaca ketika jelas berapa putarannya. `while` lebih fleksibel untuk kasus seperti menunggu data datang atau membaca input sampai pengguna mengetik q.'
			},
			{
				id: 'software-engineer-b2-q7',
				question:
					'Apa yang terjadi jika kamu lupa menulis kenaikan seperti `i++` di dalam perulangan `for`?',
				options: [
					'Perulangan berjalan lebih cepat karena satu langkah dihilangkan',
					'Perulangan langsung berhenti karena kondisi tidak berubah',
					'Muncul pesan error sintaks dari interpreter',
					'Perulangan tidak pernah berhenti karena penghitung tidak pernah mencapai batas'
				],
				correct_answer_index: 3,
				explanation:
					'Kondisi `i < n` akan selalu bernilai true karena nilai i tidak pernah berubah, sehingga blok dievaluasi tanpa henti sampai memori habis. Kasus serupa terjadi pada `while` ketika kamu lupa mengubah variabel kondisi di dalam bloknya.'
			},
			{
				id: 'software-engineer-b2-q8',
				question: 'Apa keluaran dari kode berikut?',
				code: `for (let baris = 1; baris <= 3; baris++) {
  let pola = '';
  for (let kolom = 0; kolom < baris; kolom++) pola += '*';
  console.log(pola);
}`,
				code_lang: 'javascript',
				code_caption: 'pola.js — perulangan bersarang',
				options: [
					'Bintang tiga, dua, satu secara berurutan',
					'Angka 1 2 3',
					'Satu, dua, dan tiga bintang berurutan',
					'Dua, tiga, dan empat bintang berurutan'
				],
				correct_answer_index: 2,
				explanation:
					'Perulangan dalam berjalan sebanyak nilai baris, jadi putaran pertama menghasilkan satu bintang, lalu dua, lalu tiga. Perulangan bersarang semacam ini juga yang membuat kompleksitasnya menjadi kuadrat ketika kamu mempelajari Big O.'
			},
			{
				id: 'software-engineer-b2-q9',
				question:
					'Di aplikasi kasir, diskon diberikan hanya jika total belanja lebih dari 500000 dan pelanggan adalah member aktif. Ekspresi mana yang benar?',
				options: [
					'`if (total > 500000 && memberAktif)`',
					'`if (total > 500000 || memberAktif)`',
					'`if (total > 500000) && if (memberAktif)`',
					'`if (total & memberAktif)`'
				],
				correct_answer_index: 0,
				explanation:
					'Kata kunci `&&` menggabungkan dua syarat yang sama-sama harus terpenuhi, sehingga logika AND persis yang dibutuhkan di sini. Operator `||` justru membuat diskon diberikan walau hanya salah satu syarat yang terpenuhi.'
			},
			{
				id: 'software-engineer-b2-q10',
				question: 'Apa yang terjadi ketika kamu menulis `if (status = "aktif")` sebagai kondisi?',
				options: [
					'Program error karena seharusnya memakai dua tanda sama dengan',
					'Nilai "aktif" ditugaskan ke status, lalu cabang dijalankan karena hasilnya dianggap truthy',
					'Status dibandingkan dengan teks aktif seperti yang kamu harapkan',
					'Kondisi selalu bernilai false sehingga cabang dilewati'
				],
				correct_answer_index: 1,
				explanation:
					'Satu tanda `=` adalah penugasan, bukan perbandingan, jadi kondisi menghasilkan teks "aktif" yang dianggap truthy dan cabang selalu jalan. Kasus ini salah satu bug paling umum; selalu pakai `===` ketika kamu ingin membandingkan.'
			}
		]
	},
	{
		id: 3,
		scope_id: 'software-engineer',
		bab_number: 3,
		title: 'Fungsi & Modularisasi Kode',
		subtitle: 'Functions & Modularity',
		explanation:
			'Fungsi adalah blok kode bernama yang bisa kamu panggil berkali-kali kapan pun dibutuhkan. Dengan fungsi, kamu tidak perlu menyalin-tempel logika yang sama di sepuluh tempat berbeda. Secara umum sebuah fungsi punya nama, daftar parameter sebagai masukan, blok tubuh yang berisi logika, dan return sebagai keluaran. Di JavaScript kamu bisa menulisnya sebagai deklarasi fungsi, ekspresi fungsi, maupun arrow function; ketiganya bekerja sama, yang penting kamu konsisten memakainya di satu proyek.\n\nParameter juga bisa diberi nilai default supaya pemanggil tidak wajib mengisi semuanya. Ada argumen variatif seperti rest parameter yang mengumpulkan sisa argumen menjadi satu array, cocok untuk fungsi penjumlahan dengan jumlah argumen tidak tetap. Yang sering menjadi jebakan adalah cakupan variabel: nilai yang kamu deklarasikan di dalam fungsi bersifat lokal dan hilang setelah fungsi selesai, sehingga tidak bisa dibaca dari luar. Justru kebiasaan inilah yang membuat fungsi aman, karena ia tidak mengubah data dari luar diam-diam.\n\nModularisasi berarti memecah program dari satu berkas raksasa menjadi berkas-berkas kecil yang masing-masing punya satu tanggung jawab jelas. Saat ada bug di logika pembayaran, kamu langsung tahu harus membuka modul mana. Pemecahan ini juga memudahkan pengujian, penulisan ulang bagian tertentu, dan bekerja bersama tim karena batas antarmodul menjadi kesepakatan yang jelas bagi semua orang.',
		code_snippet: `function sapa(nama = 'Teman') {
  const sapaan = 'Halo, ' + nama;
  return sapaan;
}

const pesan = sapa('Dina');
const umum = sapa();

console.log(pesan);   // "Halo, Dina"
console.log(umum);    // "Halo, Teman"
console.log(typeof pesan); // "string"`,
		code_lang: 'javascript',
		code_caption: 'fungsi.js — deklarasi fungsi, parameter default, dan return',
		image_url: '/diagrams/software-engineer-b3.svg',
		diagram: null,
		diagram_caption:
			'Gambar 3.1: Lima langkah sebuah fungsi — definisikan, terima parameter, proses, kembalikan nilai, lalu panggil ulang di bagian mana pun.',
		key_points: [
			'Fungsi memuat nama, parameter sebagai masukan, tubuh logika, dan `return` sebagai keluaran.',
			'Nilai yang dideklarasikan di dalam fungsi bersifat lokal dan hilang setelah fungsi selesai berjalan.',
			'Modularisasi memecah program menjadi modul kecil dengan satu tanggung jawab agar mudah diuji dan dirawat.'
		],
		quiz: [
			{
				id: 'software-engineer-b3-q1',
				question: 'Apa keluaran dari kode berikut?',
				code: `function sapa(nama) {
  return 'Halo ' + nama;
}
console.log(sapa('Budi'));
console.log(sapa());`,
				code_lang: 'javascript',
				code_caption: 'default.js — parameter tanpa nilai',
				options: [
					'"Halo Budi" dan "Halo"',
					'Error karena parameter tidak diisi',
					'"Halo Budi" dan "Halo undefined"',
					'undefined dan undefined'
				],
				correct_answer_index: 2,
				explanation:
					'Parameter yang tidak dikirim otomatis bernilai undefined, sehingga penyambungan teks menghasilkan "Halo undefined" alih-alih error. Supaya lebih aman, beri nilai default di daftar parameter seperti nama yang diisi teks Teman.'
			},
			{
				id: 'software-engineer-b3-q2',
				question: 'Apa fungsi pernyataan `return` di dalam sebuah fungsi?',
				options: [
					'Mengulang fungsi dari awal',
					'Menyimpan nilai ke variabel global',
					'Mencetak nilai ke layar secara otomatis',
					'Mengembalikan nilai ke pemanggil sekaligus menghentikan eksekusi fungsi'
				],
				correct_answer_index: 3,
				explanation:
					'Begitu `return` dijalankan, sisa kode di dalam fungsi tidak lagi dieksekusi, jadi kamu biasanya menaruhnya di cabang terakhir. Kalau fungsi tidak punya `return`, ia tetap berjalan normal tetapi mengembalikan undefined.'
			},
			{
				id: 'software-engineer-b3-q3',
				question: 'Apa itu fungsi dalam pemrograman?',
				options: [
					'Blok kode bernama yang bisa dipanggil berulang untuk mengerjakan satu tugas tertentu',
					'Variabel khusus yang hanya menyimpan angka',
					'Berkas tempat menyimpan gambar',
					'Komentar yang ikut dijalankan komputer'
				],
				correct_answer_index: 0,
				explanation:
					'Fungsi memisahkan satu tugas ke dalam unit kecil yang punya nama dan bisa dipakai berkali-kali tanpa menyalin kode. Dengan begitu perbaikan cukup dilakukan di satu tempat dan kode jauh lebih mudah diuji.'
			},
			{
				id: 'software-engineer-b3-q4',
				question: 'Apa yang dikembalikan oleh fungsi yang tidak memiliki pernyataan `return`?',
				options: ['null', 'undefined', '0', 'Nama fungsi tersebut'],
				correct_answer_index: 1,
				explanation:
					'Fungsi tetap dieksekusi sampai akhir bloknya, hanya saja tidak ada nilai yang dikembalikan sehingga hasilnya undefined. Kalau pemanggil langsung mengoper hasilnya ke operasi lain, biasanya muncul NaN atau bug logika yang sulit ditebak.'
			},
			{
				id: 'software-engineer-b3-q5',
				question: 'Apa keluaran dari kode berikut?',
				code: `const kali = (a, b) => a * b;
const harga = 1000;

function cek() {
  const harga = 2000;
  return harga;
}

console.log(kali(4, 5), harga, cek());`,
				code_lang: 'javascript',
				code_caption: 'scope.js — arrow function dan cakupan variabel',
				options: [
					'20, 2000, 2000',
					'20, 1000, 1000',
					'20, 1000, 2000',
					'Error karena harga dideklarasikan dua kali'
				],
				correct_answer_index: 2,
				explanation:
					'Variabel harga di dalam fungsi bersifat lokal dan menutupi yang di luar hanya selama fungsi berjalan, sehingga nilai global tetap 1000. Arrow function kali mengembalikan hasil perkalian langsung karena tubuhnya memakai bentuk singkat tanpa kurung kurawal.'
			},
			{
				id: 'software-engineer-b3-q6',
				question:
					'Aturan pajak berubah dan logika hitung dipakai di 10 berkas. Apa manfaat terbesar menaruh logika itu ke dalam satu fungsi khusus?',
				options: [
					'Kode jadi lebih panjang sehingga mudah dicari',
					'Perubahan cukup dilakukan di satu tempat, berkas lain ikut benar',
					'Fungsi otomatis berjalan lebih cepat daripada kode biasa',
					'Tidak perlu lagi menyimpan nilai ke variabel'
				],
				correct_answer_index: 1,
				explanation:
					'Fungsi membuat satu sumber kebenaran untuk logika tersebut; saat aturan berubah, kamu hanya menyentuh satu berkas. Ini inti dari modularisasi sekaligus cara paling aman ketika bekerja dalam tim.'
			},
			{
				id: 'software-engineer-b3-q7',
				question: 'Bagaimana cara memberikan nilai awal pada sebuah parameter di JavaScript?',
				options: [
					'Menulisnya langsung di daftar parameter, misalnya function sapa dengan nama berisi Teman',
					'Mengubah parameter menjadi const di dalam fungsi',
					'Menambahkan tanda tanya setelah nama parameter',
					'Menugaskan nilai lewat pernyataan let di luar fungsi'
				],
				correct_answer_index: 0,
				explanation:
					'Nilai default dipakai hanya ketika pemanggil tidak mengirim argumen untuk parameter tersebut, sehingga fungsi tetap sah dipanggil dengan satu atau dua argumen. Cara ini lebih rapi dibanding mengecek undefined secara manual di dalam tubuh fungsi.'
			},
			{
				id: 'software-engineer-b3-q8',
				question: 'Apa keluaran dari kode berikut?',
				code: `function total(...angka) {
  return angka.reduce((akum, nilai) => akum + nilai, 0);
}

console.log(total(1, 2, 3));
console.log(total(10));`,
				code_lang: 'javascript',
				code_caption: 'rest.js — rest parameter dan reduce',
				options: [
					'6 dan 0',
					'6 dan 10',
					'Error karena jumlah argumen berbeda',
					'10 dan 10'
				],
				correct_answer_index: 1,
				explanation:
					'Rest parameter mengumpulkan semua argumen menjadi satu array, jadi fungsi tetap sah dipanggil dengan jumlah argumen berbeda. Pada pemanggilan kedua array hanya berisi satu elemen, sehingga hasilnya 10.'
			},
			{
				id: 'software-engineer-b3-q9',
				question:
					'Pernyataan: variabel yang dibuat di dalam fungsi bisa dibaca langsung dari luar fungsi. Benar atau salah?',
				options: [
					'Benar, selama deklarasinya memakai `let`',
					'Benar, asalkan fungsi sudah pernah dipanggil sekali',
					'Salah, variabel lokal hanya hidup di dalam fungsi tersebut',
					'Salah, semua variabel di JavaScript selalu bersifat global'
				],
				correct_answer_index: 2,
				explanation:
					'Variabel di dalam fungsi punya cakupan lokal dan tidak bisa diakses lagi setelah fungsi selesai. Cara satu-satunya membawa keluar nilainya adalah mengembalikannya lewat `return` atau menangkapnya lewat penutupan seperti callback.'
			},
			{
				id: 'software-engineer-b3-q10',
				question: 'Apa yang dimaksud dengan modularisasi kode?',
				options: [
					'Menulis seluruh program dalam satu berkas agar mudah dicari',
					'Menghapus semua komentar dari berkas',
					'Mengganti nama variabel supaya lebih pendek',
					'Memecah program menjadi modul kecil yang masing-masing punya satu tanggung jawab jelas'
				],
				correct_answer_index: 3,
				explanation:
					'Setiap modul sebaiknya punya satu alasan untuk berubah, sehingga bug di modul pembayaran tidak mengganggu modul login. Pemecahan ini juga membuat pengujian dan pembagian kerja tim jauh lebih mudah.'
			}
		]
	},
	{
		id: 4,
		scope_id: 'software-engineer',
		bab_number: 4,
		title: 'Struktur Data Dasar (Array, Object/Struct)',
		subtitle: 'Array & Object',
		explanation:
			'Program sering perlu menyimpan banyak nilai sekaligus. Kalau kamu membuat variabel terpisah untuk 500 karyawan, kodenya akan panjang dan mustahil dikelola. Array hadir untuk masalah itu: struktur terurut yang menyimpan banyak nilai dalam satu nama dan diakses lewat indeks yang dimulai dari nol. Object punya peran berbeda, yaitu menyimpan data yang punya label, seperti objek karyawan dengan properti id, nama, dan jabatan. Struktur data seperti struct pada bahasa lain memainkan peran yang sama dengan object.\n\nKunci utamanya adalah memilih struktur sesuai bentuk datanya. Kalau datanya berupa daftar dan urutannya penting, pakai array; kalau datanya berupa entitas dengan banyak atribut, pakai object; data campuran biasanya berupa array berisi object. Untuk mengubah isi array kamu punya berbagai metode bawaan seperti push untuk menambah, filter untuk menyaring, dan map untuk memetakan, semuanya bekerja tanpa kamu menulis perulangan manual. Sementara untuk object, properti baru cukup ditambahkan lewat penugasan kunci, dan kunci yang sama otomatis menimpa nilai lama.\n\nKejadian yang paling sering terjadi adalah salah indeks dan salah memilih metode. Mengambil indeks yang belum ada menghasilkan undefined, bukan error, sehingga bug sering muncul jauh dari sumber masalahnya. Selalu cek panjang array dengan length sebelum mengakses indeks tertentu, dan perhatikan bahwa metode seperti push mengubah array asli sedangkan map dan filter mengembalikan array baru.',
		code_snippet: `const karyawan = [
  { id: 1, nama: 'Sari', jabatan: 'QA' },
  { id: 2, nama: 'Rudi', jabatan: 'Dev' }
];

karyawan.push({ id: 3, nama: 'Ayu', jabatan: 'UI' });
const namaDepan = karyawan[0].nama;
const semuaNama = karyawan.map((k) => k.nama);

console.log(karyawan.length); // 3
console.log(namaDepan, semuaNama.join(', '));`,
		code_lang: 'javascript',
		code_caption: 'karyawan.js — array berisi object dan metode bawaan',
		image_url: '/diagrams/software-engineer-b4.svg',
		diagram: null,
		diagram_caption:
			'Gambar 4.1: Perbandingan array (indeks berurutan), object (kunci ke nilai), dan panduan memilih struktur sesuai kebutuhan data.',
		key_points: [
			'Array menyimpan daftar terurut dan diakses lewat indeks yang dimulai dari nol.',
			'Object menyimpan data berlabel; kunci yang sama akan menimpa nilai sebelumnya.',
			'`push` dan `sort` mengubah array asli, sedangkan `map` dan `filter` mengembalikan array baru.'
		],
		quiz: [
			{
				id: 'software-engineer-b4-q1',
				question: 'Apa keluaran dari kode berikut?',
				code: `const buah = ['apel', 'mangga'];
buah.push('jeruk');
buah[1] = 'pepaya';
console.log(buah.length, buah.join('-'));`,
				code_lang: 'javascript',
				code_caption: 'buah.js — push dan pengubahan lewat indeks',
				options: [
					'2 apel-mangga-jeruk',
					'3 apel-mangga-pepaya',
					'2 apel-pepaya-jeruk',
					'3 apel-pepaya-jeruk'
				],
				correct_answer_index: 3,
				explanation:
					'push menambah satu elemen sehingga panjangnya menjadi 3, dan pengisian indeks 1 menggantikan mangga menjadi pepaya. Karena itu urutannya kini apel, pepaya, jeruk yang digabung dengan tanda strip.'
			},
			{
				id: 'software-engineer-b4-q2',
				question: 'Apa itu array?',
				options: [
					'Struktur data berupa pasangan kunci dan nilai',
					'Kumpulan fungsi yang bisa dipanggil bersamaan',
					'Struktur data terurut yang menyimpan banyak nilai dalam satu nama dengan indeks mulai dari nol',
					'Variabel khusus untuk menyimpan teks panjang'
				],
				correct_answer_index: 2,
				explanation:
					'Array menjaga urutan data sehingga posisi setiap elemen bisa dihitung dari indeks nol. Karena urutannya pasti, kamu bisa mengakses dan mengubah elemen lewat indeks atau memakai metode bawaan seperti push, map, dan filter.'
			},
			{
				id: 'software-engineer-b4-q3',
				question: 'Diberi `const data = [4, 8, 15]`, bagaimana cara mengambil nilai 4?',
				options: ['`data[1]`', '`data[0]`', '`data.first()`', '`data.at(4)`'],
				correct_answer_index: 1,
				explanation:
					'Indeks array selalu dimulai dari nol, jadi elemen pertama berada di `data[0]`. Kesalahan menganggap indeks 1 sebagai elemen pertama adalah bug paling umum pada pemula karena nilainya tetap ada dan tidak memunculkan error.'
			},
			{
				id: 'software-engineer-b4-q4',
				question: 'Apa hasil dari `typeof [1, 2, 3]` di JavaScript?',
				options: ['"object"', '"array"', '"list"', '"object[]"'],
				correct_answer_index: 0,
				explanation:
					'Array di JavaScript termasuk tipe object, sehingga typeof melaporkan "object" dan bukan "array". Untuk memastikan sebuah nilai benar-benar array, gunakan Array.isArray lalu nilai itu baru bisa kamu proses sebagai daftar.'
			},
			{
				id: 'software-engineer-b4-q5',
				question: 'Apa keluaran dari kode berikut?',
				code: `const murid = { nama: 'Sari', nilai: 88 };
murid.lulus = murid.nilai >= 75;
const { nama, lulus } = murid;
console.log(nama, lulus, Object.keys(murid).length);`,
				code_lang: 'javascript',
				code_caption: 'murid.js — object, penambahan properti, dan destructuring',
				options: ['Sari 88 2', 'Sari true 2', 'undefined true 3', 'Sari true 3'],
				correct_answer_index: 3,
				explanation:
					'Penambahan properti lulus membuat jumlah kunci menjadi tiga, dan nilai boolean hasil perbandingan berarti true. Destructuring hanya menyalin dua kunci tersebut ke variabel ber nama sama, sedangkan nilai lain tetap tersimpan di object aslinya.'
			},
			{
				id: 'software-engineer-b4-q6',
				question:
					'Kamu perlu menyimpan 500 karyawan yang masing-masing punya id, nama, dan jabatan. Struktur mana yang paling tepat?',
				options: [
					'Tiga variabel terpisah untuk seluruh karyawan',
					'Satu string panjang yang dipisah koma',
					'Array berisi object, dengan satu object mewakili satu karyawan',
					'Object dengan 1500 properti bernomor'
				],
				correct_answer_index: 2,
				explanation:
					'Array menjaga daftar tetap terurut dan mudah ditelusuri, sementara object memberi nama jelas pada tiap atribut. Kombinasi keduanya adalah pola paling lazim untuk data berbentuk daftar entitas di hampir semua aplikasi.'
			},
			{
				id: 'software-engineer-b4-q7',
				question: 'Apa perbedaan utama antara array dan object?',
				options: [
					'Array hanya boleh berisi angka, object hanya boleh berisi teks',
					'Array diakses lewat indeks angka dan berurutan, object diakses lewat kunci bernama',
					'Array tidak bisa diubah, object bisa diubah',
					'Array selalu lebih cepat dari object dalam semua kasus'
				],
				correct_answer_index: 1,
				explanation:
					'Kunci array adalah angka berurutan sehingga cocok untuk daftar, sedangkan kunci object bisa berupa nama bebas sehingga cocok untuk atribut sebuah entitas. Pilihan ini sebenarnya soal kecocokan bentuk data, bukan soal kecepatan.'
			},
			{
				id: 'software-engineer-b4-q8',
				question: 'Bagaimana cara mengetahui jumlah elemen di dalam array bernama `items`?',
				options: ['`items.length`', '`items.size`', '`items.count()`', '`items.total`'],
				correct_answer_index: 0,
				explanation:
					'Properti length selalu mencerminkan jumlah elemen array dan ikut berubah ketika kamu melakukan push atau pop. Jangan tertukar dengan size yang dipakai oleh Set dan Map, bukan oleh array.'
			},
			{
				id: 'software-engineer-b4-q9',
				question:
					"Jika kamu menulis `obj['nilai'] = 5` lalu kemudian `obj['nilai'] = 9`, berapa nilai akhirnya?",
				options: [
					'5, karena kunci pertama dianggap permanen',
					'Error karena kunci dibuat dua kali',
					'9, tetapi propertinya menjadi duplikat',
					'9, karena kunci yang sama menimpa nilai sebelumnya'
				],
				correct_answer_index: 3,
				explanation:
					'Object tidak menyimpan dua kunci dengan nama sama; penulisan kedua hanya menimpa nilai yang sudah ada. Kalau kamu butuh menyimpan riwayat, simpan dalam array atau buat nama kunci yang berbeda untuk tiap entri.'
			},
			{
				id: 'software-engineer-b4-q10',
				question: 'Apa keluaran dari kode berikut?',
				code: `const angka = [1, 2, 3, 4];
const genap = angka.filter((n) => n % 2 === 0);
console.log(genap, angka.length);`,
				code_lang: 'javascript',
				code_caption: 'saring.js — metode filter pada array',
				options: ['[2, 4] dan 2', '[] dan 4', '[2, 4] dan 4', '[1, 3] dan 4'],
				correct_answer_index: 2,
				explanation:
					'Filter mengembalikan array baru berisi elemen yang lolos syarat, sehingga hasilnya 2 dan 4. Array aslinya tidak tersentuh sama sekali sehingga panjangnya tetap 4; perbedaan inilah yang membedakannya dari push.'
			}
		]
	},
	{
		id: 5,
		scope_id: 'software-engineer',
		bab_number: 5,
		title: 'Pemrograman Berorientasi Objek (OOP) & Encapsulation',
		subtitle: 'OOP & Encapsulation',
		explanation:
			'Pemrograman berorientasi objek memandang program sebagai kumpulan objek yang punya data sekaligus perilaku. Class adalah cetakan untuk membuat objek serupa, atribut menyimpan keadaan, dan method menjalankan perilaku. Konsep paling penting untuk kamu kuasai di sini adalah encapsulation, yaitu menyembunyikan detail internal objek dan hanya membuka cara penggunaan yang aman. Daripada membiarkan pihak luar mengubah saldo secara langsung, sebuah class menyediakan method seperti setor dan tarik yang melakukan validasi lebih dulu.\n\nDi JavaScript, field privat ditulis dengan tanda pagar di depan namanya dan hanya bisa diakses dari dalam class. Kamu juga bisa memakai getter dan setter untuk mengontrol cara nilai dibaca serta ditulis, misalnya mengubah suhu Fahrenheit menjadi Celsius begitu properti disetel. Konsep pewarisan memungkinkan kelas turunan memakai atribut kelas induk sambil menambah perilaku sendiri, sehingga aturan umum cukup ditulis sekali lalu dipakai ulang oleh banyak kelas.\n\nPerlu kamu ingat bahwa class di JavaScript adalah sintaks yang baru lahir pada ES2015; sebelumnya pola serupa dibangun dengan function dan prototype. Inti OOP-nya sendiri tetap sama di bahasa lain: satu objek bertanggung jawab atas keadaannya sendiri, dan setiap perubahan keadaan hanya terjadi lewat jalur yang sudah ditentukan. Kebiasaan ini membuat kode lebih mudah dirawat ketika tim dan fitur terus bertambah.',
		code_snippet: `class Akun {
  #saldo = 0;

  setor(jumlah) {
    if (jumlah <= 0) throw new Error('nilai tidak valid');
    this.#saldo += jumlah;
  }

  lihat() {
    return this.#saldo;
  }
}`,
		code_lang: 'javascript',
		code_caption: 'akun.js — class dengan field privat dan method pembatas',
		image_url: '/diagrams/software-engineer-b5.svg',
		diagram: null,
		diagram_caption:
			'Gambar 5.1: Diagram kelas UML Product, Cart, dan Order yang memperlihatkan atribut, visibilitas +/−, serta relasi antar-objek.',
		key_points: [
			'Encapsulation menutup akses langsung ke data internal dan hanya membuka method yang aman dipakai.',
			'Field privat memakai tanda pagar dan hanya bisa dibaca dari dalam tubuh class.',
			'Pewarisan membuat kelas turunan memakai ulang atribut dan method induk tanpa menulisnya dua kali.'
		],
		quiz: [
			{
				id: 'software-engineer-b5-q1',
				question: 'Apa yang terjadi ketika kode berikut dijalankan?',
				code: `class Akun {
  #saldo = 0;
  setor(n) { this.#saldo += n; }
  lihat() { return this.#saldo; }
}
const a = new Akun();
a.setor(50000);
console.log(a.#saldo);`,
				code_lang: 'javascript',
				code_caption: 'privat.js — akses field privat dari luar class',
				options: [
					'Error karena #saldo hanya boleh diakses di dalam class',
					'50000',
					'undefined',
					'0'
				],
				correct_answer_index: 0,
				explanation:
					'Field bertanda pagar bersifat privat sehingga hanya bisa dibaca dari dalam tubuh class; mengaksesnya dari luar langsung ditolak oleh parser JavaScript. Cara yang benar adalah memanggil metode lihat yang memang disediakan sebagai antarmuka aman.'
			},
			{
				id: 'software-engineer-b5-q2',
				question: 'Apa itu encapsulation dalam OOP?',
				options: [
					'Menyalin kode dari kelas lain supaya tidak menulis ulang',
					'Menggabungkan seluruh kode program ke dalam satu class',
					'Menyembunyikan detail internal objek dan hanya membuka cara penggunaan yang aman lewat method',
					'Menghapus seluruh atribut agar objek lebih ringan'
				],
				correct_answer_index: 2,
				explanation:
					'Encapsulation menempatkan data dan perilaku yang mengelolanya di satu tempat sekaligus menutup akses langsung ke data internal. Dengan begitu aturan validasi tidak bisa dilewati dan perubahan implementasi tidak mengganggu kode di luar.'
			},
			{
				id: 'software-engineer-b5-q3',
				question: 'Apa itu class dalam pemrograman berorientasi objek?',
				options: [
					'Fungsi khusus yang selalu mengembalikan angka',
					'Cetak biru yang mendefinisikan atribut dan perilaku untuk membuat banyak objek serupa',
					'Berkas gambar yang dipakai oleh antarmuka',
					'Variabel global yang berisi seluruh data program'
				],
				correct_answer_index: 1,
				explanation:
					'Class sendiri bukan objek, melainkan cetakan yang dipakai lewat kata new untuk menghasilkan objek. Setiap objek hasil cetakan punya salinan atributnya masing-masing dengan perilaku yang sama, sehingga aturan tidak perlu ditulis ulang.'
			},
			{
				id: 'software-engineer-b5-q4',
				question:
					'Di aplikasi bank, field saldo sebaiknya dijaga agar tidak diubah sembarang oleh kode luar. Pendekatan mana yang paling tepat?',
				options: [
					'Membuatnya global agar mudah diubah siapa saja',
					'Mengubahnya menjadi array agar bisa ditambah banyak',
					'Menghapus field dan menyimpan saldo di dalam komentar',
					'Menjadikannya privat lalu menyediakan method yang memvalidasi setiap perubahan'
				],
				correct_answer_index: 3,
				explanation:
					'Field privat tidak bisa disentuh dari luar, sehingga semua perubahan harus melewati method seperti setor dan tarik. Di situ kamu bisa memeriksa nominal positif, mencatat transaksi, dan menolak input aneh sebelum data benar-benar berubah.'
			},
			{
				id: 'software-engineer-b5-q5',
				question: 'Apa keluaran dari kode berikut?',
				code: `class Hewan {
  constructor(nama) { this.nama = nama; }
  suara() { return '...'; }
}
class Kucing extends Hewan {
  suara() { return 'Meong'; }
}
const k = new Kucing('Mimi');
console.log(k.nama, k.suara());`,
				code_lang: 'javascript',
				code_caption: 'warisan.js — pewarisan dan overriding method',
				options: ['Mimi Meong', 'undefined Meong', 'Mimi ...', 'Error karena Kucing tidak punya constructor'],
				correct_answer_index: 0,
				explanation:
					'Kucing mewarisi seluruh isi Hewan termasuk constructor yang mengisi properti nama, sehingga atribut tetap terisi walau tidak ditulis ulang. Method suara ditimpa oleh versi milik Kucing, dan inilah inti pewarisan sekaligus overriding.'
			},
			{
				id: 'software-engineer-b5-q6',
				question:
					'Sebuah aplikasi punya kelas Pengguna berisi nama dan email, lalu Admin yang punya hak tambahan berupa menghapus data. Relasi mana yang paling tepat?',
				options: [
					'Komposisi, karena Admin berisi Pengguna',
					'Duplikasi, supaya kode Admin menjadi mandiri',
					'Pewarisan, karena Admin extends Pengguna',
					'Tidak perlu relasi, cukup tulis ulang semua kodenya'
				],
				correct_answer_index: 2,
				explanation:
					'Admin hanya perlu menambah perilaku khusus sementara atribut umum dipakai ulang dari Pengguna, sehingga aturan tidak ditulis dua kali. Pewarisan yang berlebihan memang berisiko, jadi pakai hanya bila hubungan isanya benar-benar jelas.'
			},
			{
				id: 'software-engineer-b5-q7',
				question: 'Benarkah class adalah fitur asli JavaScript sejak kemunculan bahasa ini?',
				options: [
					'Benar, class sudah ada sejak JavaScript pertama kali dibuat',
					'Belum; syntax class baru hadir di ES2015, sebelumnya pola OOP dibangun dengan function dan prototype',
					'Benar, tetapi hanya dipakai di sisi server',
					'Salah, class di JavaScript berbeda total dengan class di bahasa lain'
				],
				correct_answer_index: 1,
				explanation:
					'Class di JavaScript sebenarnya sintaks gula yang mempermudah pola prototype yang lebih tua. Konsep OOP-nya tetap sama dengan bahasa lain, hanya mekanisme pewarisannya saja yang dibangun di atas prototype chain.'
			},
			{
				id: 'software-engineer-b5-q8',
				question:
					"Diberi `const obj = { nama: 'Ayi', ambil() { return this.nama; } }`, apa arti `this` di dalam method ambil?",
				options: [
					'Merujuk ke objek global window',
					'Merujuk ke class tempat objek dibuat',
					'Selalu bernilai undefined',
					'Merujuk ke objek tempat method dipanggil, yaitu obj'
				],
				correct_answer_index: 3,
				explanation:
					'Pada method biasa, `this` ditentukan oleh cara pemanggilan sehingga mengikuti objek di depan titik. Nilainya baru berbeda kalau kamu memakai arrow function, karena arrow function mengambil `this` dari lingkup di sekitarnya.'
			},
			{
				id: 'software-engineer-b5-q9',
				question: 'Apa itu method?',
				options: [
					'Fungsi yang hidup di dalam class atau object dan bekerja pada data objeknya',
					'Variabel khusus yang menyimpan daftar fungsi bawaan bahasa',
					'Komentar yang menjelaskan perilaku program',
					'Operator untuk membandingkan dua objek'
				],
				correct_answer_index: 0,
				explanation:
					'Method adalah fungsi biasa yang diperlakukan sebagai bagian dari objek sehingga bisa mengakses atributnya lewat `this`. Bedanya dengan fungsi biasa hanya letak dan cara pemanggilannya, bukan cara menuliskannya.'
			},
			{
				id: 'software-engineer-b5-q10',
				question: 'Apa keluaran dari kode berikut?',
				code: `class Suhu {
  #celsius = 0;
  set dariFahrenheit(f) {
    this.#celsius = (f - 32) * 5 / 9;
  }
  get tampil() {
    return this.#celsius.toFixed(1);
  }
}
const s = new Suhu();
s.dariFahrenheit = 212;
console.log(s.tampil);`,
				code_lang: 'javascript',
				code_caption: 'suhu.js — getter dan setter pada class',
				options: ['212', '32', '100.0', '100'],
				correct_answer_index: 2,
				explanation:
					'Setter mengubah suhu Fahrenheit menjadi Celsius saat kamu menugaskan nilai ke dariFahrenheit, sehingga 212 derajat menjadi 100. Getter tampil lalu mengubahnya jadi teks satu desimal, makanya hasilnya 100.0 dan bukan angka 100.'
			}
		]
	},
	{
		id: 6,
		scope_id: 'software-engineer',
		bab_number: 6,
		title: 'Analisis Kompleksitas Algoritma (Big O Notation)',
		subtitle: 'Big O Notation',
		explanation:
			'Big O notation adalah cara standar untuk menggambarkan bagaimana waktu eksekusi atau pemakaian memori sebuah algoritma tumbuh seiring ukuran input. Notasi ini tidak mengukur kecepatan dalam detik karena komputer berbeda-beda, melainkan bentuk pertumbuhannya. O(1) berarti waktu konstan berapa pun inputnya, O(n) berarti linear terhadap jumlah data, O(n log n) tumbuh sedikit lebih cepat, dan O(n²) meledak begitu data membesar. Saat memilih algoritma, angka di dalam notasi itulah yang menentukan apakah aplikasimu masih nyaman dipakai ketika data mencapai jutaan.\n\nContoh nyatanya begini: mengakses array lewat indeks membutuhkan waktu konstan karena komputer langsung tahu posisi memori, sedangkan mencari satu data di array tanpa urutan berarti harus memeriksa satu per satu sehingga paling buruk O(n). Binary search lebih cepat karena tiap langkah membuang separuh kandidat sehingga hanya butuh sekitar logaritma n langkah, asalkan datanya sudah terurut. Perulangan bersarang dua tingkat terhadap input yang sama umumnya menghasilkan kompleksitas kuadrat dan wajib kamu curigai ketika data mulai besar.\n\nBig O juga menyingkirkan konstanta dan istilah kecil karena yang dilihat adalah perilaku saat n sangat besar. Karena itu dua potongan kode dengan kompleksitas sama bisa berbeda kecepatannya pada input kecil, tetapi tetap sebanding saat input membesar. Kebiasaan menganalisis kompleksitas sebelum menulis kode akan mencegahmu memilih solusi cantik yang ternyata mahal di kemudian hari.',
		code_snippet: `function linear(data, target) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) return i;
  }
}

function binary(data, target) {
  let low = 0, high = data.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (data[mid] === target) return mid;
    if (data[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
}`,
		code_lang: 'javascript',
		code_caption: 'cari.js — perbandingan linear search dan binary search',
		image_url: '/diagrams/software-engineer-b6.svg',
		diagram: null,
		diagram_caption:
			'Gambar 6.1: Lima kurva kompleksitas — O(1), O(log n), O(n), O(n log n), dan O(n²) — dibandingkan terhadap pertumbuhan ukuran input.',
		key_points: [
			'Big O menggambarkan pertumbuhan waktu atau memori terhadap ukuran input, bukan kecepatan dalam satuan detik.',
			'Akses indeks array O(1), pencarian tanpa urutan O(n), dan perulangan bersarang umumnya O(n²).',
			'Binary search mencapai O(log n) karena tiap langkah membuang separuh kandidat, asalkan data sudah terurut.'
		],
		quiz: [
			{
				id: 'software-engineer-b6-q1',
				question: 'Apa itu Big O notation?',
				options: [
					'Cara mengukur kecepatan CPU dalam satuan detik',
					'Notasi untuk menggambarkan bagaimana waktu eksekusi atau pemakaian memori tumbuh seiring ukuran input',
					'Nama algoritma pencarian paling populer saat ini',
					'Satuan yang dipakai untuk mengukur ukuran sebuah berkas'
				],
				correct_answer_index: 1,
				explanation:
					'Big O tidak peduli dengan spesifikasi mesin, melainkan bentuk pertumbuhan ketika jumlah data membesar. Dengan begitu dua algoritma bisa dibandingkan secara adil hanya dari notasinya saja.'
			},
			{
				id: 'software-engineer-b6-q2',
				question: 'Berapa kompleksitas dari potongan kode berikut?',
				code: `for (let i = 0; i < n; i++) {
  console.log(i);
}`,
				code_lang: 'javascript',
				code_caption: 'satu.js — perulangan tunggal',
				options: ['O(1)', 'O(log n)', 'O(n kuadrat)', 'O(n)'],
				correct_answer_index: 3,
				explanation:
					'Jumlah putaran sama persis dengan nilai n, jadi waktu kerja tumbuh sebanding lurus dengan ukuran input. Kalau kamu menggandakan data, waktu yang dibutuhkan juga kira-kira dua kali lipat.'
			},
			{
				id: 'software-engineer-b6-q3',
				question: 'Berapa kompleksitas akses sebuah elemen di array berdasarkan indeks?',
				options: [
					'O(1), karena komputer langsung tahu posisi memorinya',
					'O(n), karena array harus ditelusuri dari awal',
					'O(log n), karena array selalu terurut',
					'O(n kuadrat), karena array punya dua dimensi'
				],
				correct_answer_index: 0,
				explanation:
					'Indeks array langsung diterjemahkan ke alamat memori sehingga satu langkah sudah cukup, tanpa peduli panjang arraynya. Berbeda dengan pencarian nilai tanpa indeks yang tetap harus menelusuri elemen satu per satu.'
			},
			{
				id: 'software-engineer-b6-q4',
				question:
					'Untuk mencari satu data yang urutannya tidak diketahui di dalam array yang belum terurut, berapa kompleksitas terburuknya?',
				options: ['O(1)', 'O(log n)', 'O(n)', 'O(faktorial n)'],
				correct_answer_index: 2,
				explanation:
					'Karena tidak ada petunjuk urutan, algoritma bisa jadi harus memeriksa sampai elemen paling akhir. Inilah alasan linear search terasa berat pada data besar dan mengapa binary search dipilih begitu datanya sudah diurutkan.'
			},
			{
				id: 'software-engineer-b6-q5',
				question: 'Berapa kompleksitas dari potongan kode berikut?',
				code: `for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    console.log(i, j);
  }
}`,
				code_lang: 'javascript',
				code_caption: 'bersarang.js — dua perulangan terhadap input yang sama',
				options: ['O(n)', 'O(n kuadrat)', 'O(2 pangkat n)', 'O(log n)'],
				correct_answer_index: 1,
				explanation:
					'Perulangan dalam berjalan sebanyak n untuk setiap putaran perulangan luar, sehingga total langkahnya n dikali n. Karena itu perulangan bersarang terhadap input yang sama harus selalu kamu periksa lebih dulu.'
			},
			{
				id: 'software-engineer-b6-q6',
				question: 'Mengapa binary search jauh lebih cepat daripada linear search pada data terurut?',
				options: [
					'Karena ia berhenti begitu menemukan satu kecocokan',
					'Karena ia tidak perlu membandingkan nilai sama sekali',
					'Karena ia mengurutkan data lebih dulu sebelum mencari',
					'Karena tiap langkahnya membuang separuh kandidat, jadi hanya butuh sekitar log2(n) langkah'
				],
				correct_answer_index: 3,
				explanation:
					'Hasil pertengahan yang tidak cocok membuat separuh data langsung dibuang dari pertimbangan. Untuk satu juta data, ini berarti hanya sekitar 20 langkah, sementara linear search bisa membutuhkan satu juta perbandingan.'
			},
			{
				id: 'software-engineer-b6-q7',
				question: 'Benarkah kode yang paling sedikit barisnya selalu paling cepat dijalankan?',
				options: [
					'Tidak; yang menentukan adalah pertumbuhan waktu terhadap ukuran input, bukan jumlah baris',
					'Benar, karena baris sedikit berarti instruksi juga sedikit',
					'Benar, selama kodenya ditulis dalam JavaScript',
					'Tidak; semua kode berjalan sama cepatnya di komputer modern'
				],
				correct_answer_index: 0,
				explanation:
					'Satu baris yang berisi perulangan bersarang bisa jauh lebih lambat daripada sepuluh baris sederhana pada data besar. Big O justru mengabaikan hal-hal kecil seperti jumlah baris dan fokus pada bentuk pertumbuhannya.'
			},
			{
				id: 'software-engineer-b6-q8',
				question:
					'Data masuk mencapai jutaan elemen dan waktunya harus tetap masuk akal. Kompleksitas mana yang paling aman dipilih?',
				options: ['O(n kuadrat)', 'O(2 pangkat n)', 'O(n log n)', 'O(faktorial n)'],
				correct_answer_index: 2,
				explanation:
					'O(n log n) hanya sedikit di atas linear sehingga masih sanggup menangani jutaan data dalam hitungan detik. Sementara itu O(n kuadrat) dan di atasnya membuat waktu meledak begitu input membesar.'
			},
			{
				id: 'software-engineer-b6-q9',
				question: 'Apa arti notasi O(log n)?',
				options: [
					'Waktu selalu konstan berapa pun ukuran inputnya',
					'Waktu tumbuh sangat lambat, sekitar logaritma n, karena tiap langkah membuang sebagian besar data',
					'Waktu dua kali lipat dari O(n)',
					'Waktu berbanding terbalik dengan jumlah data'
				],
				correct_answer_index: 1,
				explanation:
					'Logaritma n tumbuh sangat perlahan; menambah sepuluh kali lipat data hanya menambah sekitar satu langkah kerja. Binary search adalah contoh paling klasik yang mencapai kompleksitas ini.'
			},
			{
				id: 'software-engineer-b6-q10',
				question: 'Berapa kompleksitas dari fungsi berikut?',
				code: `function cari(data, target) {
  const set = new Set(data);
  return set.has(target);
}
console.log(cari([3, 1, 4], 4));`,
				code_lang: 'javascript',
				code_caption: 'set.js — pencarian memakai Set',
				options: [
					'O(1), karena memakai Set',
					'O(n kuadrat), karena ada dua langkah proses',
					'O(log n), karena Set selalu terurut',
					'O(n), karena membangun set harus memproses seluruh elemen'
				],
				correct_answer_index: 3,
				explanation:
					'Pencarian di Set memang rata-rata O(1), tetapi kamu harus membentuk Set terlebih dulu dengan memproses n elemen. Kompleksitas total ditentukan oleh langkah paling mahal, sehingga hasilnya tetap O(n).'
			}
		]
	},
	{
		id: 7,
		scope_id: 'software-engineer',
		bab_number: 7,
		title: 'Pengenalan Rekursi & Dynamic Programming',
		subtitle: 'Rekursi & DP',
		explanation:
			'Rekursi adalah teknik menyelesaikan masalah dengan mendefinisikan solusi dalam bentuk solusi yang lebih kecil dari masalah yang sama. Sebuah fungsi memanggil dirinya sendiri dengan input yang menyusut, sampai akhirnya mencapai base case, yaitu kondisi berhenti yang jawabannya sudah diketahui tanpa perlu memanggil diri lagi. Tanpa base case, fungsi akan terus memanggil dirinya sendiri sampai tumpukan memori penuh dan program berhenti dengan stack overflow. Faktorial, deret Fibonacci, dan perjalanan pada pohon biner adalah contoh masalah yang strukturnya memang alami untuk rekursi.\n\nMasalah muncul ketika rekursi memanggil submasalah yang sama berkali-kali. Fibonacci rekursif biasa misalnya menghitung ulang nilai yang sama berulang kali sehingga jumlah panggilannya tumbuh eksponensial. Di sinilah dynamic programming masuk: kamu menyimpan hasil tiap submasalah di memori lalu memakainya lagi saat dibutuhkan, teknik yang dikenal sebagai memoisasi. Dengan penyimpanan ini, masalah yang tadinya bisa berjalan berjam-jam selesai dalam sekejap karena setiap nilai hanya dihitung sekali sepanjang program.\n\nDynamic programming paling cocok untuk masalah yang punya optimal substructure, artinya solusi optimal dari masalah besar dibangun dari solusi optimal bagian-bagiannya, serta submasalah yang berulang. Kalau masalahmu tidak punya kedua ciri itu, rekursi biasa atau iterasi sudah cukup. Kuncinya adalah mengenali pola ini lebih dulu, baru memilih alat yang paling pas untuk menyelesaikannya.',
		code_snippet: `function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

console.log(fib(10));   // 55
console.log(fib(30));   // 832040`,
		code_lang: 'javascript',
		code_caption: 'fib.js — rekursi dengan memoisasi hasil submasalah',
		image_url: '/diagrams/software-engineer-b7.svg',
		diagram: null,
		diagram_caption:
			'Gambar 7.1: Pohon rekursi fib(n) — dua cabang panggilan diri, base case sebagai berhenti, dan memo[n] yang mencegah hitung ulang.',
		key_points: [
			'Rekursi memanggil fungsi versi yang lebih kecil sampai mencapai base case sebagai titik berhenti.',
			'Tanpa base case, pemanggilan menumpuk terus sampai memori habis dan terjadi stack overflow.',
			'Dynamic programming menyimpan hasil submasalah supaya nilai yang sama tidak pernah dihitung dua kali.'
		],
		quiz: [
			{
				id: 'software-engineer-b7-q1',
				question: 'Apa keluaran dari kode berikut?',
				code: `function faktorial(n) {
  if (n <= 1) return 1;
  return n * faktorial(n - 1);
}
console.log(faktorial(5));`,
				code_lang: 'javascript',
				code_caption: 'faktorial.js — rekursi sederhana',
				options: ['24', '5', '120', 'Error karena fungsi memanggil dirinya sendiri'],
				correct_answer_index: 2,
				explanation:
					'Fungsi memanggil dirinya dengan n yang menyusut sampai n bernilai 1, lalu hasilnya dikalikan kembali ke atas sehingga 5 dikali 4 dikali 3 dikali 2 dikali 1 sama dengan 120. Pemanggilan berjenjang inilah yang disebut rekursi.'
			},
			{
				id: 'software-engineer-b7-q2',
				question: 'Apa itu rekursi?',
				options: [
					'Teknik di mana sebuah fungsi memanggil dirinya sendiri sampai mencapai kondisi berhenti',
					'Teknik mengulangi kode memakai perulangan for',
					'Teknik menyimpan data ke basis data',
					'Teknik menggabungkan dua berkas menjadi satu'
				],
				correct_answer_index: 0,
				explanation:
					'Rekursi memecah masalah menjadi versi yang lebih kecil dari masalah yang sama, sehingga solusi akhir terbangun dari jawaban-jawaban kecil. Tanpa base case, pemanggilan itu tidak akan pernah berhenti dengan sendirinya.'
			},
			{
				id: 'software-engineer-b7-q3',
				question: 'Apa yang terjadi jika sebuah fungsi rekursif tidak punya base case?',
				options: [
					'Fungsi otomatis mengembalikan nilai 0',
					'Fungsi berhenti sendiri setelah 1000 pemanggilan',
					'Program mengabaikan pemanggilan berikutnya',
					'Fungsi terus memanggil dirinya sampai tumpukan memori penuh dan terjadi stack overflow'
				],
				correct_answer_index: 3,
				explanation:
					'Karena tidak pernah ada titik berhenti, setiap pemanggilan menumpuk frame baru di stack sampai memori habis. Dalam praktiknya, tulis dulu kondisi berhentinya sebelum kamu mengisi logika rekursinya.'
			},
			{
				id: 'software-engineer-b7-q4',
				question: 'Dua syarat wajib yang harus dimiliki setiap fungsi rekursif adalah?',
				options: [
					'Parameter berupa array dan pengembalian berupa angka',
					'Base case sebagai kondisi berhenti dan recursive case yang mendekati base case',
					'Perulangan while dan variabel penghitung',
					'Komentar panjang dan nama fungsi yang unik'
				],
				correct_answer_index: 1,
				explanation:
					'Base case menghentikan rekursi, sedangkan recursive case memanggil versi yang lebih kecil sehingga masalah benar-benar menyusut. Kalau recursive case tidak mendekati base case, fungsi akan berputar tanpa arah.'
			},
			{
				id: 'software-engineer-b7-q5',
				question: 'Apa keluaran dari kode berikut?',
				code: `function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
console.log(fib(10));`,
				code_lang: 'javascript',
				code_caption: 'memo.js — Fibonacci dengan memoisasi',
				options: ['34', '54', '55', '89'],
				correct_answer_index: 2,
				explanation:
					'Deret Fibonacci ke-10 bernilai 55, dihitung dari awal 0, 1, 1, 2, 3, dan seterusnya. Karena hasil lama disimpan di memo, tiap nilai hanya dihitung sekali sehingga fungsi tetap ringan meski n besar.'
			},
			{
				id: 'software-engineer-b7-q6',
				question: 'Apa itu dynamic programming?',
				options: [
					'Teknik menyelesaikan masalah besar dengan memecahnya menjadi submasalah yang saling tumpang tindih lalu menyimpan hasil submasalah itu',
					'Teknik menulis kode tanpa menggunakan fungsi sama sekali',
					'Teknik mempercepat program dengan menghapus seluruh komentar',
					'Teknik mengurutkan data sebelum disimpan ke basis data'
				],
				correct_answer_index: 0,
				explanation:
					'Dynamic programming memanfaatkan kenyataan bahwa submasalah yang sama sering muncul berkali-kali, sehingga hasilnya cukup dihitung sekali lalu disimpan. Penyimpanan ini disebut memoisasi, sedangkan versi berbentuk tabel disebut tabulation.'
			},
			{
				id: 'software-engineer-b7-q7',
				question:
					'Fungsi Fibonacci rekursif biasa dipanggil dengan n = 40 dan berjalan sangat lama. Apa penyebabnya?',
				options: [
					'Karena JavaScript tidak mendukung rekursi sama sekali',
					'Karena nilai 40 terlalu kecil untuk diproses',
					'Karena fungsi harus menghitung dua kali lipat pada setiap langkah',
					'Karena submasalah yang sama dihitung berkali-kali sehingga jumlah panggilan tumbuh eksponensial'
				],
				correct_answer_index: 3,
				explanation:
					'Tanpa penyimpanan hasil, fib(38) dipanggil dari banyak jalur berbeda dan selalu dihitung ulang dari nol. Menambahkan memoisasi membuat seluruh perhitungan turun drastis karena setiap nilai hanya dihitung sekali.'
			},
			{
				id: 'software-engineer-b7-q8',
				question: 'Benarkah rekursi selalu lebih lambat daripada solusi berbasis perulangan?',
				options: [
					'Benar, karena memanggil fungsi selalu mahal',
					'Tidak selalu; dengan memoisasi rekursi bisa sama cepat, dan untuk masalah tertentu strukturnya justru lebih jelas',
					'Benar, tetapi hanya di JavaScript',
					'Tidak; rekursi selalu lebih cepat daripada perulangan'
				],
				correct_answer_index: 1,
				explanation:
					'Memang ada biaya tambahan pada tiap pemanggilan fungsi, tetapi hal itu bisa diimbangi dengan menyimpan hasil. Yang terpenting, rekursi sering membuat penyelesaian masalah hierarkis seperti pohon dan backtracking jauh lebih mudah dipahami.'
			},
			{
				id: 'software-engineer-b7-q9',
				question: 'Untuk masalah seperti mana dynamic programming paling cocok dipakai?',
				options: [
					'Masalah yang hanya punya satu langkah proses',
					'Masalah acak tanpa pola yang berulang',
					'Masalah dengan optimal substructure dan submasalah yang berulang, seperti shortest path atau knapsack',
					'Masalah yang tidak boleh menyimpan hasil di memori'
				],
				correct_answer_index: 2,
				explanation:
					'Kalau solusi optimal dari masalah besar dibangun dari solusi optimal bagian-bagian dan submasalahnya berulang, manfaat DP langsung terasa. Tanpa kedua ciri itu, rekursi biasa atau iterasi biasa sudah lebih dari cukup.'
			},
			{
				id: 'software-engineer-b7-q10',
				question: 'Apa keluaran dari kode berikut?',
				code: `const memo = {};
function luas(n) {
  if (n <= 1) return n;
  memo[n] = memo[n] ?? luas(n - 1) + luas(n - 2);
  return memo[n];
}
console.log(luas(6));`,
				code_lang: 'javascript',
				code_caption: 'deret.js — penyimpanan hasil submasalah',
				options: ['8', '6', '13', '5'],
				correct_answer_index: 0,
				explanation:
					'Fungsi ini menghitung deret Fibonacci dan nilai pada indeks ke-6 adalah 8. Operator ?? membuat hasil lama dipakai ulang ketika sudah ada, sehingga submasalah yang sama tidak dihitung dua kali.'
			}
		]
	}
];
