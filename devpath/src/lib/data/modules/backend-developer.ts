import type { BabModule } from '$lib/data/types';

export const modules: BabModule[] = [
	{
		id: 22,
		scope_id: 'backend-developer',
		bab_number: 1,
		title: 'Konsep Client-Server & Protokol HTTP (Methods & Status Codes)',
		subtitle: 'Protokol & Transport',
		explanation:
			'Bayangkan kamu memesan makanan lewat aplikasi: kamu mengirim permintaan, lalu menunggu pesanan datang. Di internet peran itu terbagi tegas. **Client** adalah pihak yang meminta — browser, aplikasi mobile, atau layanan lain — sedangkan **server** adalah komputer yang menyimpan data dan menjalankan logika bisnis. Keduanya bertukar pesan lewat **HTTP**: client mengirim *request* berisi metode, URL, header, dan kadang body, lalu server membalas *response* berisi status code, header, dan body. Pola request–response ini dipakai hampir di setiap halaman yang kamu buka, termasuk saat frontend memanggil API buatanmu.\n\nMetode HTTP menjelaskan maksud permintaan. `GET` membaca data dan tidak boleh mengubah apa pun, `POST` membuat data baru, `PUT` mengganti seluruh resource, `PATCH` memperbarui sebagian, dan `DELETE` menghapus. Sifat idempoten pada `GET`, `PUT`, dan `DELETE` berarti aman diulang berkali-kali dengan hasil akhir yang sama, sehingga cocok untuk mekanisme retry saat koneksi goyah. Sebagai studi kasus, tombol muat ulang browser mengulang `GET`, jadi membuka halaman lagi tidak pernah menggandakan pesananmu; mengulang `POST` yang sama justru bisa membuat dua kali bayar.\n\nStatus code menceritakan hasil pemrosesan: `2xx` sukses (`200 OK`, `201 Created`), `3xx` pengalihan, `4xx` client perlu diperbaiki (`400` input salah, `401` belum login, `403` tidak berwenang, `404` tidak ditemukan), dan `5xx` server bermasalah. Kebiasaan paling menghemat waktu saat debugging adalah membaca status code lebih dulu: 4xx menuntunmu memeriksa URL, header, atau body request, sedangkan 5xx mengarahkanmu ke log server. Lengkapi dengan `curl -i` atau tab Network di DevTools untuk melihat request dan response apa adanya.',
		code_snippet: `# request membaca data
curl -i https://api.tokoku.com/produk/42

# request membuat data baru
curl -i -X POST https://api.tokoku.com/produk \\
  -H "Content-Type: application/json" \\
  -d '{"nama":"Sepatu Lari","harga":399000}'

# balasan server (ringkas)
HTTP/1.1 201 Created
Content-Type: application/json

{"id":42,"nama":"Sepatu Lari","harga":399000}`,
		code_lang: 'bash',
		code_caption: 'terminal — memeriksa method, header, dan status code dengan curl',
		image_url: '/diagrams/backend-developer-b1.svg',
		diagram: 'client-server',
		diagram_caption:
			'Gambar 22.1: Alur komunikasi client dan server — client mengirim request lewat HTTP, server memprosesnya, lalu membalas response ke client.',
		sections: [
			{
				heading: 'Memilih Metode yang Idempoten',
				body: 'Saat menulis client yang bisa mencoba ulang otomatis, utamakan metode idempoten: ulangi `GET`, `PUT`, atau `DELETE` dengan aman. Untuk `POST`, siasati dengan kunci idempotensi — client mengirim token unik, server menyimpan hasil pertama dan mengembalikannya pada permintaan berikutnya sehingga duplikat tidak terjadi.'
			}
		],
		key_points: [
			'Client mengirim request (metode, URL, header, body) dan server membalas response (status code, header, body).',
			'GET, PUT, dan DELETE idempoten sehingga aman diulang; POST tidak, jadi pengulangan bisa menggandakan data.',
			'Saat debugging, baca status code dulu: 4xx berarti request perlu diperbaiki, 5xx berarti server sedang bermasalah.'
		],
		quiz: [
			{
				id: 'backend-developer-b1-q1',
				question: 'Apa arti HTTP bersifat **stateless**?',
				options: [
					'Koneksi internet tidak boleh terputus selama request berlangsung',
					'Server memproses setiap request tanpa mengingat request sebelumnya',
					'Server wajib menyimpan sesi login selamanya sampai user menghapus akun',
					'Response HTTP tidak pernah memiliki body, hanya header'
				],
				correct_answer_index: 1,
				explanation:
					'Statusless berarti tiap request berdiri sendiri, jadi identitas user harus dikirim ulang lewat cookie atau token. Koneksi yang putus dan penyimpanan sesi bukan definisi stateless, dan response tetap boleh berisi body.'
			},
			{
				id: 'backend-developer-b1-q2',
				question: 'Apa yang dilakukan potongan perintah berikut?',
				code: `curl -i -X POST https://api.tokoku.com/produk -H "Content-Type: application/json" -d '{"nama":"Topi"}'`,
				code_lang: 'bash',
				code_caption: 'terminal',
				options: [
					'Mengambil daftar produk dari server',
					'Menghapus produk bernama Topi',
					'Mengubah data produk yang sudah ada',
					'Mengirim data baru berformat JSON untuk membuat produk'
				],
				correct_answer_index: 3,
				explanation:
					'`POST` dipakai membuat resource baru, jadi body JSON di atas dikirim ke server untuk disimpan; balasan yang pantas adalah `201 Created`. Menghapus memakai `DELETE`, mengubah memakai `PUT` atau `PATCH`, dan membaca data memakai `GET`.'
			},
			{
				id: 'backend-developer-b1-q3',
				question: 'Metode mana yang paling tepat untuk memperbarui **sebagian field** produk berid 9?',
				options: [
					'`PATCH /produk/9`',
					'`GET /produk/9`',
					'`POST /produk/buat`',
					'`DELETE /produk/9`'
				],
				correct_answer_index: 0,
				explanation:
					'`PATCH` khusus untuk perubahan sebagian representation, sehingga hanya field yang dikirim ikut berubah. `PUT` mengganti seluruh resource, `GET` hanya membaca, `DELETE` menghapus, dan `POST` umumnya membuat data baru.'
			},
			{
				id: 'backend-developer-b1-q4',
				question:
					'Karena koneksi goyah, client mengulang request pembuatan pesanan tiga kali hingga muncul tiga baris identik. Pernyataan mana yang benar?',
				options: [
					'`GET` juga bisa membuat data, jadi sebaiknya semua pembuatan memakai `GET`',
					'Semua metode HTTP idempoten, berarti ini bug di tempat lain',
					'`POST` tidak idempoten; server perlu kunci idempotensi atau client cukup mengulang metode idempoten',
					'Hal itu wajar karena HTTP memang dirancang menggandakan data'
				],
				correct_answer_index: 2,
				explanation:
					'`POST` tidak idempoten sehingga pengulangan menghasilkan data ganda; solusinya kunci idempotensi di server atau pemakaian `PUT` yang idempoten. `GET` tidak boleh dipakai membuat data, dan duplikat tetap bug yang harus diperbaiki.'
			},
			{
				id: 'backend-developer-b1-q5',
				question: 'Pernyataan mana yang benar tentang metode `GET`?',
				options: [
					'`GET` boleh menghapus data asal URL tidak dibagikan ke orang lain',
					'`GET` tidak boleh mengubah data, sehingga aman diulang dan disimpan sebagai bookmark',
					'`GET` selalu lebih cepat karena tidak mengirim body',
					'`GET` wajib membawa body berisi kredensial agar server tahu siapa kamu'
				],
				correct_answer_index: 1,
				explanation:
					'`GET` bersifat aman (tidak mengubah sisi server) sekaligus idempoten, jadi boleh diulang dan disimpan bookmark. Kredensial cukup lewat header atau cookie, dan kecepatan tidak ditentukan oleh ada-tidaknya body.'
			},
			{
				id: 'backend-developer-b1-q6',
				question: 'Berdasarkan baris status berikut, apa yang sebenarnya terjadi di server?',
				code: `HTTP/1.1 500 Internal Server Error\nContent-Type: application/json\n\n{"error":"gagal koneksi database"}`,
				code_lang: 'bash',
				code_caption: 'respons server',
				options: [
					'Client mengirim URL salah sehingga resource tidak ditemukan',
					'Client belum mengirim token autentikasi',
					'Input dari client tidak valid dan ditolak server',
					'Server mengalami kegagalan internal saat memproses request'
				],
				correct_answer_index: 3,
				explanation:
					'Angka 5xx selalu berarti kegagalan di sisi server; isi body bahkan menyebut database sebagai biang keladinya. URL salah menghasilkan 404, tanpa token menghasilkan 401 atau 403, dan input tidak valid menghasilkan 400.'
			},
			{
				id: 'backend-developer-b1-q7',
				question: 'Status **201 Created** dikembalikan server ketika...',
				options: [
					'Request berhasil dan menghasilkan resource baru',
					'Client mengirim request dengan format yang salah',
					'Resource yang diminta tidak ditemukan',
					'Server mengalami error tak terduga'
				],
				correct_answer_index: 0,
				explanation:
					'201 dipakai saat request sukses sekaligus membuat resource baru, misalnya `POST /produk`. Input salah memakai 400, resource tidak ada memakai 404, dan error tak terduga memakai 500.'
			},
			{
				id: 'backend-developer-b1-q8',
				question:
					'Halaman tertentu selalu menampilkan **404 Not Found** padahal server sehat dan database normal. Apa penyebab paling mungkin?',
				options: [
					'Database sedang penuh sehingga query dibatalkan',
					'Client tidak mengirim header `Accept`',
					'Path yang diminta tidak terdaftar di router server',
					'Server kehabisan memori saat memproses request'
				],
				correct_answer_index: 2,
				explanation:
					'404 berarti alamat yang diminta tidak ada atau tidak cocok dengan route yang terdaftar. Database bermasalah dan kehabisan memori menghasilkan 500, sedangkan header `Accept` yang tidak cocok menghasilkan 406, bukan 404.'
			},
			{
				id: 'backend-developer-b1-q9',
				question:
					'Client menjalankan kode berikut, tetapi hasilnya selalu masuk blok `catch`. Apa hal pertama yang harus kamu periksa?',
				code: `const res = await fetch('/api/produk/42');\nconst data = await res.json();`,
				code_lang: 'javascript',
				code_caption: 'client.js',
				options: [
					'Ukuran file JavaScript di server',
					'Nilai status pada `res` — `res.ok` bisa false, lalu `res.json()` gagal membaca body error',
					'Warna tema pada CSS halaman',
					'Versi browser user harus selalu diperbarui'
				],
				correct_answer_index: 1,
				explanation:
					'`fetch` tidak melempar error saat status 4xx atau 5xx; ia hanya gagal ketika body-nya bukan JSON seperti yang diharapkan. Selalu cek `res.ok` atau `res.status` sebelum mem-parse body. Ukuran aset dan CSS tidak memengaruhi panggilan API.'
			},
			{
				id: 'backend-developer-b1-q10',
				question: 'Miskonsepsi mana yang benar tentang status **3xx**?',
				options: [
					'3xx berarti terjadi kesalahan pada server',
					'3xx berarti client tidak punya izin mengakses resource',
					'3xx berarti permintaan ditolak karena body tidak valid',
					'3xx berarti request dialihkan ke URL lain, misalnya setelah login atau pindah domain'
				],
				correct_answer_index: 3,
				explanation:
					'Keluarga 3xx memberi tahu client untuk mengambil resource di lokasi lain, contohnya `302` saat redirect dan `304` saat cache masih berlaku. Kesalahan server memakai 5xx, izin memakai 403, dan body tidak valid memakai 400.'
			}
		]
	},
	{
		id: 23,
		scope_id: 'backend-developer',
		bab_number: 2,
		title: 'Perancangan RESTful API & Spesifikasi JSON',
		subtitle: 'Kontrak Endpoint & Data',
		explanation:
			'REST memperlakukan API seperti gudang resource. URL hanya menyebut **apa** yang dituju dengan kata benda jamak — `/produk`, `/pesanan`, `/pengguna` — sedangkan **apa yang dilakukan** diserahkan pada metode HTTP. Jadi `GET /pengguna/3` mengambil, `POST /pengguna` membuat, `PUT /pengguna/3` mengganti, dan `DELETE /pengguna/3` menghapus. Hindari pola `/getUser?id=3` atau `/pengguna/hapus/3`: menaruh kata kerja di URL memaksa client menghafal ratusan nama fungsi alih-alih memahami bentuk data, dan endpoint jadi terasa seperti RPC yang semrawut.\n\n**JSON** adalah bahasa bersama untuk membawanya: teks ringkas dengan enam tipe — `string`, `number`, `boolean`, `null`, `array`, dan `object`. Spesifikasinya ketat: key wajib memakai tanda kutip ganda, tidak boleh koma di akhir objek, tidak boleh komentar, dan `NaN` tidak sah. Karena itu `JSON.parse` menolak keras typo sekecil apa pun. Saat menerima body, kirim selalu header `Content-Type: application/json` lalu validasi skemanya sebelum dipakai; studi kasus klasik adalah field `harga` yang dikirim client sebagai string, lalu total di server dihitung dari teks dan menghasilkan angka aneh.\n\nAPI ibarat kontrak, jadi konsistensi lebih berharga daripada kreativitas. Tentukan bentuk error yang seragam, misalnya `{"error": "harga wajib angka"}`, aktifkan pagination seperti `?halaman=1&batas=20` begitu data melebihi satu layar, dan beri versi di URL (`/v1/produk`) jika format perlu berubah tanpa memutus client lama. Studi kasus nyata: satu tim mengganti field `nama` menjadi `namaLengkap` diam-diam, aplikasi mobile yang belum diperbarui langsung menampilkan data kosong. Perubahan kontrak begitu harus lewat versi baru atau minimal pengumuman bersama.',
		code_snippet: `import { Router } from 'express';
const router = Router();

router.get('/produk', async (req, res) => {
  const { halaman = 1, batas = 20 } = req.query;
  const data = await Produk.halaman(Number(halaman), Number(batas));
  res.json({ data });
});

router.post('/produk', async (req, res) => {
  const input = skemaProduk.parse(req.body);
  res.status(201).json(await Produk.buat(input));
});`,
		code_lang: 'typescript',
		code_caption: 'routes/produk.ts — endpoint REST dengan pagination dan validasi JSON',
		image_url: '/diagrams/backend-developer-b2.svg',
		diagram: null,
		sections: [
			{
				heading: 'Respons dan Error yang Konsisten',
				body: 'Sepakati satu bentuk error, misalnya `{"error": "...", "kode": "..."}`, lalu balas `400` dengan daftar field yang bermasalah agar frontend tinggal menampilkan pesan per field. Untuk daftar panjang, bungkus dalam objek seperti `{"data": [], "halaman": 1}` supaya client tahu kapan harus memuat halaman berikutnya.'
			}
		],
		diagram_caption:
			'Gambar 23.1: Matriks metode HTTP — GET, POST, PUT, dan DELETE beserta tujuan, contoh path, respons sukses, dan sifat idempoten.',
		key_points: [
			'Namai resource dengan kata benda jamak dan serahkan operasi (baca, tulis, ganti, hapus) pada metode HTTP.',
			'JSON valid memakai kutip ganda pada key, tanpa koma terakhir, tanpa komentar, dan hanya enam tipe data.',
			'Kembalikan status code yang jujur serta bentuk error yang konsisten agar client tidak menebak-nebak.'
		],
		quiz: [
			{
				id: 'backend-developer-b2-q1',
				question: 'Mana endpoint yang paling sesuai prinsip REST untuk mengambil pesanan berid 9?',
				options: [
					'`POST /api/getPesanan?id=9`',
					'`GET /api/pesanan/hapus/9`',
					'`GET /api/pesanan?aksi=lihat&id=9`',
					'`GET /api/pesanan/9`'
				],
				correct_answer_index: 3,
				explanation:
					'REST memakai kata benda untuk resource dan metode HTTP untuk aksinya, sehingga `GET /api/pesanan/9` sudah menyatakan semuanya. Kata kerja di URL (`getPesanan`, `hapus`, `aksi=lihat`) memaksa client menghafal nama fungsi, bukan struktur data.'
			},
			{
				id: 'backend-developer-b2-q2',
				question: 'Apa keluaran potongan kode berikut?',
				code: `const data = { id: 7, nama: 'Sari' };\nconsole.log(JSON.stringify(data));`,
				code_lang: 'javascript',
				code_caption: 'json.js',
				options: [
					'Objek `{ id: 7, nama: \'Sari\' }`',
					'Array `[7, "Sari"]`',
					'String `{"id":7,"nama":"Sari"}`',
					'Error karena objek tidak bisa diubah menjadi JSON'
				],
				correct_answer_index: 2,
				explanation:
					'`JSON.stringify` mengubah objek menjadi **string** dengan format JSON: semua key dibungkus kutip ganda dan spasi opsional hilang. Objek mentah bukan JSON karena JSON selalu berupa teks, dan fungsi ini tidak error untuk objek biasa.'
			},
			{
				id: 'backend-developer-b2-q3',
				question: 'Manakah yang merupakan **JSON valid**?',
				options: [
					'`{ nama: \'Budi\', umur: 20 }`',
					'`{"nama":"Budi","umur":20}`',
					'`{"nama":"Budi","umur":20,}`',
					'`{"nama":"Budi", // nama user\n"umur":20}`'
				],
				correct_answer_index: 1,
				explanation:
					'Spesifikasi JSON mewajibkan kutip ganda pada key, melarang koma di akhir, dan tidak mengenal komentar. Pilihan lain memakai gaya objek JavaScript atau tambahan yang membuat parser langsung menolaknya.'
			},
			{
				id: 'backend-developer-b2-q4',
				question: 'Endpoint pembuatan data yang sukses sebaiknya membalas status...',
				options: ['201 Created', '404 Not Found', '301 Moved Permanently', '500 Internal Server Error'],
				correct_answer_index: 0,
				explanation:
					'201 memberi tahu client bahwa resource baru benar-benar terbentuk, biasanya disertai header `Location`. 404 berarti tidak ditemukan, 301 untuk pengalihan permanen, dan 500 untuk kegagalan server.'
			},
			{
				id: 'backend-developer-b2-q5',
				question:
					'Frontend mengirim body JSON, tetapi di server `req.body` selalu `undefined` sehingga data tersimpan kosong. Penyebab paling mungkin?',
				options: [
					'URL endpoint salah sehingga server mengabaikan body',
					'Isi JSON memakai huruf besar semua sehingga tidak dikenali',
					'Response server terlalu besar sehingga body terpotong',
					'Header `Content-Type: application/json` tidak ikut dikirim sehingga server tidak mem-parse body'
				],
				correct_answer_index: 3,
				explanation:
					'Server memakai `Content-Type` untuk menentukan cara membaca body; tanpa `application/json`, middleware parser tidak aktif dan `req.body` tetap `undefined`. URL salah menghasilkan 404, dan panjang response tidak berpengaruh pada parsing body request.'
			},
			{
				id: 'backend-developer-b2-q6',
				question: 'Apa yang terjadi saat kode berikut dijalankan?',
				code: `const teks = '{"harga": 399000,}';\nconsole.log(JSON.parse(teks));`,
				code_lang: 'javascript',
				code_caption: 'parse.js',
				options: [
					'Mengembalikan objek `{ harga: 399000 }`',
					'Mengembalikan objek dengan `harga` berupa string "399000"',
					'Melempar error karena koma di akhir objek dilarang spesifikasi JSON',
					'Mengembalikan `undefined` tanpa error'
				],
				correct_answer_index: 2,
				explanation:
					'Koma setelah properti terakhir (trailing comma) tidak sah di JSON, jadi `JSON.parse` langsung melempar `SyntaxError`. JavaScript memang boleh menulis koma begitu, tetapi JSON adalah format berdiri sendiri dengan aturan lebih ketat.'
			},
			{
				id: 'backend-developer-b2-q7',
				question: 'Untuk mengubah **seluruh field** produk berid 5, metode mana yang tepat?',
				options: ['`POST /api/produk/buat`', '`PUT /api/produk/5`', '`GET /api/produk/5`', '`DELETE /api/produk/5`'],
				correct_answer_index: 1,
				explanation:
					'`PUT` mengganti seluruh representasi resource pada URL tersebut. `POST` membuat data baru, `GET` hanya membaca, dan `DELETE` menghapus; perubahan sebagian lebih cocok memakai `PATCH`.'
			},
			{
				id: 'backend-developer-b2-q8',
				question: 'Kenapa API modern perlu pagination seperti `?halaman=1&batas=20`?',
				options: [
					'Menjaga jumlah data per respons tetap kecil sehingga respons lebih cepat dan hemat memori',
					'Membuat JSON otomatis menjadi format yang valid',
					'Menghapus kebutuhan terhadap status code',
					'Menggantikan kebutuhan autentikasi pada client'
				],
				correct_answer_index: 0,
				explanation:
					'Membatasi jumlah baris membuat payload ringan, query lebih cepat, dan memori server terjaga. Pagination tidak berkaitan dengan validasi JSON, status code, maupun autentikasi yang tetap diperlukan.'
			},
			{
				id: 'backend-developer-b2-q9',
				question: 'Baris mana yang menyebabkan error saat kode berikut dijalankan?',
				code: `const teks = '{"nama": "Sari"}';\nconst objek = JSON.parse(teks);\nconsole.log(objek.namaLengkap.length);`,
				code_lang: 'javascript',
				code_caption: 'debug.js',
				options: [
					'Baris 1 karena string wajib memakai kutip tunggal',
					'Baris 2 karena `JSON.parse` tidak tersedia',
					'Baris 3 karena `JSON.parse` menghasilkan array, bukan objek',
					'Baris 3 karena `objek.namaLengkap` tidak ada sehingga `undefined.length` melempar TypeError'
				],
				correct_answer_index: 3,
				explanation:
					'Objek hasil parse hanya punya key `nama`, jadi `namaLengkap` bernilai `undefined` dan membaca `.length`-nya memicu `TypeError`. String kutip ganda valid di JavaScript dan `JSON.parse` memang tersedia, jadi baris 1 dan 2 aman.'
			},
			{
				id: 'backend-developer-b2-q10',
				question:
					'Rekan berkata: "API yang baik selalu membalas 200 OK, error cukup ditulis di body." Pernyataan itu...',
				options: [
					'Benar karena client hanya membaca isi body',
					'Benar asalkan body error memakai JSON',
					'Salah; status code yang jujur membuat client dan monitoring bisa bereaksi tanpa membaca isi body',
					'Salah karena 200 hanya boleh dipakai untuk respons kosong'
				],
				correct_answer_index: 2,
				explanation:
					'Status code adalah kontrak utama: proxy, retry otomatis, dan dashboard monitoring memakainya tanpa membuka body. Menyembunyikan semua error di balik 200 membuat alur client dan deteksi masalah jadi rumit; 200 juga sah untuk respons berisi data.'
			}
		]
	},
	{
		id: 24,
		scope_id: 'backend-developer',
		bab_number: 3,
		title: 'Pemodelan Basis Data & Relasi SQL (DDL, DML, JOIN)',
		subtitle: 'Skema & Kueri Relasional',
		explanation:
			'Basis data relational seperti Excel yang diberi aturan ketat. Satu **tabel** berisi baris (satu data) dan kolom (jenis informasi), misalnya `pelanggan` dengan kolom `id`, `nama`, dan `email`. Supaya setiap baris punya identitas, tiap tabel diberi **primary key** — semacam NIK untuk baris yang dijamin unik dan tidak boleh kosong. Tambahkan batasan seperti `NOT NULL` dan `UNIQUE` pada email supaya data kotor tertolak sejak awal, bukan menumpuk dan baru ketahuan saat laporan jadi menyesatkan.\n\nUntuk tabel `pesanan` yang perlu tahu milik siapa pesanan itu, cukup simpan `pelanggan_id` sebagai **foreign key** yang menunjuk ke tabel pelanggan, bukan menyalin nama pelanggan di setiap baris. Data yang disalin di banyak tempat pasti suatu saat tidak sinkron: nama diganti di satu tempat, di tempat lain masih nama lama. Relasi satu-ke-banyak memakai foreign key di sisi banyak, sedangkan banyak-ke-banyak membutuhkan tabel penghubung seperti `pesanan_produk` yang hanya berisi kedua kunci.\n\nSQL terbagi dua kelompok besar: **DDL** untuk mendesain struktur (`CREATE`, `ALTER`, `DROP`) dan **DML** untuk mengisi serta membaca data (`INSERT`, `SELECT`, `UPDATE`, `DELETE`). Untuk menggabungkan tabel berelasi kamu memakai `JOIN`: `INNER JOIN` hanya menampilkan baris yang punya pasangan, sedangkan `LEFT JOIN` mempertahankan seluruh baris tabel kiri. Studi kasusnya, laporan pelanggan dengan jumlah pesanan memakai `LEFT JOIN` plus `COUNT`, sehingga pelanggan yang belum pernah memesan tetap tampil dengan angka nol, bukan hilang begitu saja dari rekap.',
		code_snippet: `CREATE TABLE pelanggan (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(80) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL
);
CREATE TABLE pesanan (
  id SERIAL PRIMARY KEY,
  pelanggan_id INTEGER REFERENCES pelanggan(id),
  total NUMERIC(12, 2) NOT NULL
);
SELECT p.nama, o.total
FROM pesanan o
JOIN pelanggan p ON p.id = o.pelanggan_id
WHERE o.total > 100000;`,
		code_lang: 'sql',
		code_caption: 'schema.sql — DDL, DML, dan JOIN pada dua tabel berelasi',
		image_url: '/diagrams/backend-developer-b3.svg',
		diagram: null,
		sections: [
			{
				heading: 'Tiga Bentuk Relasi',
				body: 'Satu-ke-satu memakai kunci unik di salah satu tabel, satu-ke-banyak memakai foreign key di sisi banyak (misalnya `pesanan.pelanggan_id`), dan banyak-ke-banyak membutuhkan tabel penghubung seperti `pesanan_produk`. Menentukan bentuk ini lebih dulu membuat pilihan tipe JOIN di laporan jauh lebih mudah ditebak.'
			}
		],
		diagram_caption:
			'Gambar 24.1: Skema relasional users → orders → order_items dengan kunci utama (PK) dan kunci asing (FK) yang menghubungkan antartabel.',
		key_points: [
			'Primary key menjamin baris unik dan tidak boleh NULL; foreign key menautkan baris ke tabel lain.',
			'DDL mengubah struktur tabel (`CREATE`, `ALTER`, `DROP`), DML mengubah dan membaca isi data (`INSERT`, `SELECT`, `UPDATE`, `DELETE`).',
			'INNER JOIN hanya menampilkan baris berpasangan, LEFT JOIN mempertahankan seluruh baris tabel kiri.'
		],
		quiz: [
			{
				id: 'backend-developer-b3-q1',
				question: 'Apa fungsi utama **PRIMARY KEY** pada sebuah tabel?',
				options: [
					'Menghubungkan dua tabel berdasarkan kolom yang sama',
					'Menjamin setiap baris punya nilai unik dan tidak boleh NULL',
					'Menyimpan salinan data dari tabel lain agar query lebih cepat',
					'Membatasi database hanya boleh punya satu tabel'
				],
				correct_answer_index: 1,
				explanation:
					'Primary key adalah penjamin identitas unik per baris sekaligus selalu terisi. Menghubungkan dua tabel itu tugas **foreign key**, menyimpan salinan justru dihindari, dan jumlah tabel dalam database tidak dibatasi primary key.'
			},
			{
				id: 'backend-developer-b3-q2',
				question: 'Budi belum pernah memesan. Berapa hasil kolom `jumlah` untuk baris Budi pada query berikut?',
				code: `SELECT p.nama, COUNT(o.id) AS jumlah\nFROM pelanggan p\nLEFT JOIN pesanan o ON o.pelanggan_id = p.id\nGROUP BY p.nama;`,
				code_lang: 'sql',
				code_caption: 'hitung.sql',
				options: ['0', 'NULL', 'Baris Budi tidak muncul', 'Query error karena GROUP BY tidak boleh dipakai dengan JOIN'],
				correct_answer_index: 0,
				explanation:
					'`LEFT JOIN` tetap menampilkan semua baris tabel kiri meski tidak ada pasangannya, lalu `COUNT(o.id)` menghitung nilai non-NULL sehingga menghasilkan `0`. NULL hanya muncul pada fungsi agregat tertentu seperti `SUM`, dan baris Budi justru hilang bila memakai `INNER JOIN`.'
			},
			{
				id: 'backend-developer-b3-q3',
				question:
					'Saat INSERT pesanan, server menolak dengan pesan `null value in column "total" violates not-null constraint`. Apa penyebabnya?',
				options: [
					'Kolom `total` dijadikan PRIMARY KEY sehingga nilainya harus unik',
					'Tabel belum diberi index sehingga data gagal tersimpan',
					'Perintah SELECT tertulis di dalam perintah INSERT',
					'Nilai `total` tidak dikirim saat INSERT sehingga NULL dan melanggar aturan NOT NULL'
				],
				correct_answer_index: 3,
				explanation:
					'Error tersebut menyebut kolom `total` menerima NULL, artinya INSERT tidak mengisi kolom itu. Primary key soal keunikan, index soal kecepatan pencarian, dan mencampur SELECT di dalam INSERT bukan penyebab batasan NOT NULL.'
			},
			{
				id: 'backend-developer-b3-q4',
				question: 'Manakah yang termasuk perintah **DDL (Data Definition Language)**?',
				options: ['UPDATE', 'SELECT', 'ALTER TABLE', 'INSERT'],
				correct_answer_index: 2,
				explanation:
					'`ALTER TABLE` mengubah struktur tabel, misalnya menambah kolom, sehingga termasuk DDL. `UPDATE`, `SELECT`, dan `INSERT` bekerja pada isi data yang sudah ada dan masuk kategori DML.'
			},
			{
				id: 'backend-developer-b3-q5',
				question: 'Apa risiko terbesar menyalin nama pelanggan ke setiap baris tabel pesanan?',
				options: [
					'Query JOIN menjadi tidak bisa ditulis',
					'Data jadi mudah tidak sinkron ketika nama pelanggan berubah di satu tempat',
					'Tabel pesanan otomatis tidak bisa diberi primary key',
					'Ukuran database selalu lebih kecil dibanding cara relasional'
				],
				correct_answer_index: 1,
				explanation:
					'Penyalinan membuat data redundan: perubahan nama harus dilakukan di banyak baris dan satu yang terlewat membuat laporan berbeda-beda. JOIN justru tetap bisa ditulis, primary key tidak berhubungan, dan cara relasional umumnya lebih hemat tempat.'
			},
			{
				id: 'backend-developer-b3-q6',
				question: 'Berapa jumlah baris hasil query berikut bila ada 10 pesanan dan 4 pelanggan, tiap pesanan punya pelanggan sah?',
				code: `SELECT p.nama, o.total\nFROM pesanan o\nJOIN pelanggan p ON p.id = o.pelanggan_id;`,
				code_lang: 'sql',
				code_caption: 'gabung.sql',
				options: [
					'10 baris, satu per pesanan yang punya pasangan pelanggan',
					'4 baris, satu per pelanggan',
					'14 baris karena dua tabel digabungkan',
					'1 baris berisi seluruh data'
				],
				correct_answer_index: 0,
				explanation:
					'`INNER JOIN` menghasilkan satu baris untuk tiap pasangan baris yang kuncinya cocok, yaitu 10 pasangan dari sisi pesanan. Jumlahnya bukan penjumlahan baris kedua tabel, dan pelanggan tanpa pesanan ikut tersaring keluar.'
			},
			{
				id: 'backend-developer-b3-q7',
				question: 'Untuk relasi banyak-ke-banyak antara `pesanan` dan `produk`, skema yang tepat adalah...',
				options: [
					'Menambah kolom `produk_ids` berupa teks berisi daftar id di tabel pesanan',
					'Menyalin seluruh kolom pesanan ke tabel produk',
					'Menghapus salah satu tabel karena tidak bisa berelasi',
					'Membuat tabel penghubung `pesanan_produk` berisi `pesanan_id` dan `produk_id`'
				],
				correct_answer_index: 3,
				explanation:
					'Tabel penghubung mengubah relasi banyak-ke-banyak menjadi dua relasi satu-ke-banyak yang rapi dan bisa diberi kunci. Menyimpan daftar id dalam satu kolom teks membuat data sulit dicari dan melanggar bentuk normal, sedangkan penghapusan tabel justru membuang informasi.'
			},
			{
				id: 'backend-developer-b3-q8',
				question:
					'Laporan harus menampilkan **semua** pelanggan beserta jumlah pesanan, termasuk yang belum pernah memesan. Klausa apa yang tepat?',
				options: [
					'`INNER JOIN` saja tanpa agregasi',
					'`RIGHT JOIN` dari tabel pesanan ke pelanggan',
					'`LEFT JOIN` dari tabel pelanggan ke pesanan lalu `COUNT`',
					'`CROSS JOIN` antara kedua tabel'
				],
				correct_answer_index: 2,
				explanation:
					'`LEFT JOIN` dari `pelanggan` mempertahankan semua pelanggan meski pesanan kosong, dan `COUNT` mengubahnya jadi angka. `INNER JOIN` menyembunyikan pelanggan tanpa pesanan, `RIGHT JOIN` dari sisi pesanan tidak menjamin pelanggan tampil, dan `CROSS JOIN` menghasilkan kombinasi semua pasangan.'
			},
			{
				id: 'backend-developer-b3-q9',
				question: 'Query mana yang menemukan pelanggan yang belum pernah memesan?',
				code: `CREATE TABLE pelanggan (id INT, nama TEXT);\nCREATE TABLE pesanan (id INT, pelanggan_id INT);`,
				code_lang: 'sql',
				code_caption: 'skema ringkas',
				options: [
					'`SELECT * FROM pelanggan JOIN pesanan ON pesanan.pelanggan_id = pelanggan.id;`',
					'`SELECT * FROM pelanggan WHERE id NOT IN (SELECT pelanggan_id FROM pesanan);`',
					'`SELECT * FROM pesanan WHERE pelanggan_id IS NULL;`',
					'`SELECT * FROM pelanggan, pesanan;`'
				],
				correct_answer_index: 1,
				explanation:
					'Subquery mengumpulkan pelanggan yang sudah memesan, lalu `NOT IN` menyaring yang tidak ada di kumpulan itu. `JOIN` biasa justru hanya menampilkan pelanggan berpesanan, `pesanan.pelanggan_id` tidak NULL pada baris normal, dan koma antar tabel menghasilkan cross join.'
			},
			{
				id: 'backend-developer-b3-q10',
				question: 'Benarkah `UPDATE` termasuk perintah DDL karena bisa mengubah isi tabel?',
				options: [
					'Tidak; DDL hanya mengubah struktur (CREATE, ALTER, DROP), sedangkan UPDATE mengubah data sehingga masuk DML',
					'Benar; semua perintah yang menyentuh tabel adalah DDL',
					'Tidak; UPDATE termasuk perintah DQL khusus laporan',
					'Benar, asalkan UPDATE dijalankan lebih dari satu baris'
				],
				correct_answer_index: 0,
				explanation:
					'DDL menyangkut definisi tabel seperti menambah atau mengubah kolom, sedangkan UPDATE bekerja pada baris yang sudah ada sehingga termasuk DML. Tidak ada kategori DQL resmi untuk itu, dan jumlah baris tidak mengubah klasifikasi perintah.'
			}
		]
	},
	{
		id: 25,
		scope_id: 'backend-developer',
		bab_number: 4,
		title: 'ORM & Query Optimization',
		subtitle: 'Pemetaan Objek & Performa',
		explanation:
			'**ORM** memetakan tabel database ke objek atau kelas di bahasa aplikasi: baris `pelanggan` menjadi objek `Pelanggan`, kolom menjadi properti, dan relasi menjadi asosiasi yang bisa diakses seperti `pesanan.pelanggan`. Manfaatnya jelas — kamu menulis kode bertipe aman, migrasi skema tercatat rapi, dan nilai user tidak disisipkan langsung ke string query sehingga risiko SQL injection mengecil. Namun ORM tetap menghasilkan SQL, jadi kamu tetap perlu membacanya.\n\nMasalah paling sering adalah pola **N+1**: satu query mengambil daftar, lalu loop memicu query tambahan untuk tiap baris. Studi kasusnya, menampilkan 20 pesanan beserta nama pelanggan berarti 1 query daftar plus 20 query pelanggan, dan begitu datanya ratusan endpoint langsung melonjak dari milidetik ke detik. Solusinya memuat relasi sekaligus lewat `include` atau JOIN, membatasi jumlah baris dengan pagination, serta memilih kolom seperlunya lewat `select` supaya server tidak mengirim data yang tidak dipakai.\n\nSetelah pola query benar, optimasi lanjutan memakai data dari database: tambahkan index pada kolom yang sering muncul di `WHERE`, `ORDER BY`, atau kunci relasi, lalu ukur ulang dengan `EXPLAIN` untuk melihat apakah database masih memindai seluruh baris. Pasang query log pada lingkungan uji dan perhatikan angka: endpoint yang menghasilkan puluhan query dalam satu request hampir selalu punya masalah struktur, bukan masalah kecepatan CPU.',
		code_snippet: `// pesanan.ts — eager loading menghindari N+1
const daftar = await prisma.pesanan.findMany({
  where: { total: { gt: 100000 } },
  include: { pelanggan: { select: { nama: true, email: true } } },
  take: 20
});

for (const p of daftar) {
  console.log(p.pelanggan.nama, p.total);
}

// tanpa include, loop di atas bisa memicu 1 + N query`,
		code_lang: 'typescript',
		code_caption: 'pesanan.ts — memuat relasi sekaligus dengan Prisma include',
		image_url: '/diagrams/backend-developer-b4.svg',
		diagram: null,
		sections: [
			{
				heading: 'Membaca Rencana Eksekusi dengan EXPLAIN',
				body: 'Perintah `EXPLAIN` (atau `EXPLAIN ANALYZE`) menunjukkan apakah database memakai index atau memindai seluruh baris. Kalau muncul `Seq Scan` pada tabel besar, periksa kolom pada `WHERE` dan `ORDER BY`; tambahkan index yang sesuai, jalankan ulang `EXPLAIN`, dan pastikan biaya eksekusinya benar-benar turun sebelum diterapkan ke produksi.'
			}
		],
		diagram_caption:
			'Gambar 25.1: Lima langkah optimasi ORM — model, eager loading, profil query, indeks, hingga cache agar kueri tetap ramping.',
		key_points: [
			'ORM memetakan tabel ke objek tetapi tetap menghasilkan SQL, jadi periksa query log saat aplikasi mulai melambat.',
			'Pola N+1 muncul saat loop memicu satu query per baris; selesaikan dengan JOIN/eager loading atau query batch.',
			'Optimasi awal: pilih kolom seperlunya, batasi baris dengan pagination, tambah index pada kolom filter dan urutan, lalu ukur dengan EXPLAIN.'
		],
		quiz: [
			{
				id: 'backend-developer-b4-q1',
				question: 'Apa itu **ORM**?',
				options: [
					'Bahasa query khusus untuk membuat index database',
					'Server khusus yang menyimpan cache query',
					'Pustaka yang memetakan tabel database ke objek atau kelas di bahasa aplikasi',
					'Alat monitoring untuk mengukur kecepatan query'
				],
				correct_answer_index: 2,
				explanation:
					'ORM (Object-Relational Mapping) menyamakan tabel dengan kelas dan baris dengan objek sehingga kamu bekerja memakai struktur bahasa sendiri. Index dibuat oleh database, cache bukan bagian wajib ORM, dan pengukuran kecepatan adalah tugas tool terpisah.'
			},
			{
				id: 'backend-developer-b4-q2',
				question: 'Berapa kira-kira query database yang dijalankan kode berikut untuk 20 pesanan?',
				code: `const daftar = await prisma.pesanan.findMany({ take: 20 });\nfor (const p of daftar) {\n  const pel = await prisma.pelanggan.findUnique({ where: { id: p.pelangganId } });\n  console.log(pel.nama);\n}`,
				code_lang: 'typescript',
				code_caption: 'loop.js',
				options: [
					'1 query karena semua berjalan dalam satu blok kode',
					'2 query total berapa pun jumlah pesanan',
					'21 query karena dihitung dari jumlah kolom tabel',
					'21 query: 1 untuk daftar pesanan dan 20 untuk pelanggan (masalah N+1)'
				],
				correct_answer_index: 3,
				explanation:
					'Loop mengeksekusi `findUnique` sekali per baris sehingga totalnya 1 + 20 query. Inilah inti masalah N+1; perbaikinya memuat relasi sekaligus dengan `include` atau JOIN sehingga totalnya tinggal satu query.'
			},
			{
				id: 'backend-developer-b4-q3',
				question:
					'API daftar produk yang dulu 200 ms kini memakan 4 detik setelah data mencapai 500 ribu baris. Langkah diagnosis paling tepat pertama kali adalah...',
				options: [
					'Menghitung dan mencatat jumlah serta waktu query pada endpoint itu, lalu memeriksa rencana eksekusinya',
					'Menulis ulang seluruh frontend agar memuat lebih lambat',
					'Menghapus kolom yang tidak terpakai di tabel produk',
					'Memindahkan seluruh data ke file CSV'
				],
				correct_answer_index: 0,
				explanation:
					'Melambat bersamaan dengan pertambahan data menunjukkan query yang kehilangan index atau menghasilkan terlalu banyak query, jadi ukur dulu sebelum menebak. Menambah server hanya menunda masalah, dan dua opsi terakhir tidak menyebabkan apa pun pada sisi server.'
			},
			{
				id: 'backend-developer-b4-q4',
				question: 'Benarkah "ORM selalu lebih cepat daripada SQL manual"?',
				options: [
					'Benar karena ORM selalu menghasilkan SQL yang sudah dioptimalkan otomatis',
					'Belum tentu; ORM bisa menghasilkan query berlebihan seperti N+1, jadi hasilnya tetap perlu diukur',
					'Benar asalkan proyek memakai bahasa TypeScript',
					'Salah karena ORM tidak bisa membuat query JOIN'
				],
				correct_answer_index: 1,
				explanation:
					'Kenyamanan ORM tidak menjamin performa: ia bisa menghasilkan query kecil-kecil dalam jumlah banyak yang justru lebih lambat dari satu SQL manual. Maka query tetap diukur dan dibaca, dan ORM sendiri mendukung JOIN maupun bahasa bertipe.'
			},
			{
				id: 'backend-developer-b4-q5',
				question:
					'Sebuah query memakai `WHERE status = \'aktif\' ORDER BY dibuat_pada DESC`. Indeks mana yang paling membantu?',
				options: [
					'Indeks pada kolom `id` saja',
					'Indeks pada kolom `nama`',
					'Indeks gabungan pada (`status`, `dibuat_pada`)',
					'Tidak perlu index karena query sudah memakai WHERE'
				],
				correct_answer_index: 2,
				explanation:
					'Indeks gabungan melayani penyaringan `status` sekaligus pengurutan `dibuat_pada` dalam satu struktur. Index pada kolom lain tidak terpakai, dan tanpa index sama sekali database akan memindai seluruh baris sehingga WHERE tidak banyak menolong.'
			},
			{
				id: 'backend-developer-b4-q6',
				question: 'Apa kesimpulan dari cuplikan hasil `EXPLAIN` berikut?',
				code: `Seq Scan on pesanan  (cost=0.00..1850.00 rows=95 width=40)\n  Filter: (total > 100000)`,
				code_lang: 'sql',
				code_caption: 'hasil EXPLAIN',
				options: [
					'Query hanya memeriksa 10 baris karena sudah diindeks',
					'Query memakai index scan dan hanya mengembalikan 10 baris',
					'Query gagal dijalankan sehingga database melempar error',
					'Database memindai seluruh tabel (seq scan), kolom `total` belum punya index yang cocok'
				],
				correct_answer_index: 3,
				explanation:
					'`Seq Scan` berarti pencarian dilakukan baris demi baris dari awal sampai akhir tabel, tanda utama ketiadaan index yang relevan. Eksekusi tetap sukses (bukan error), dan angka `rows` adalah perkiraan baris keluaran, bukan jumlah baris yang dipindai.'
			},
			{
				id: 'backend-developer-b4-q7',
				question: 'Apa perbedaan **eager loading** dan **lazy loading**?',
				options: [
					'Eager loading mengambil relasi sekaligus saat query utama, lazy loading mengambilnya saat properti diakses',
					'Eager loading hanya dipakai untuk kolom teks, lazy loading untuk angka',
					'Eager loading berjalan di background, lazy loading di thread terpisah',
					'Keduanya sama saja, hanya beda nama pustaka'
				],
				correct_answer_index: 0,
				explanation:
					'Eager loading menggabungkan pengambilan relasi ke dalam satu kali query, sedangkan lazy loading menunda sampai kamu membuka propertinya sehingga bisa memicu query tambahan. Pilihan keduanya soal kapan data diambil, bukan tipe kolom atau tempat eksekusi.'
			},
			{
				id: 'backend-developer-b4-q8',
				question:
					'Kode `await prisma.pesanan.findMany()` tanpa pembatas membuat server kehabisan memori saat data besar. Solusi paling langsung adalah...',
				options: [
					'Menambah kolom baru di tabel pesanan',
					'Membatasi jumlah baris per respons dengan pagination (`take` dan `skip`) lalu menyajikannya bertahap',
					'Mengganti seluruh ORM menjadi spreadsheet',
					'Menjalankan query tanpa WHERE agar hasilnya lebih rapi'
				],
				correct_answer_index: 1,
				explanation:
					'Pagination menjaga jumlah baris di memori dan payload tetap kecil berapa pun total data. Menambah kolom tidak membatasi baris, spreadsheet justru lebih berat, dan menghilangkan WHERE membuat pemindahan data makin besar.'
			},
			{
				id: 'backend-developer-b4-q9',
				question: 'Potongan mana yang paling mengurangi ukuran respons ke client?',
				code: `const semua = await prisma.pelanggan.findMany();\nconst seperlunya = await prisma.pelanggan.findMany({ select: { id: true, nama: true } });`,
				code_lang: 'typescript',
				code_caption: 'select.js',
				options: [
					'Baris 1 karena `findMany` selalu mengirim kolom paling sedikit',
					'Keduanya sama karena ORM otomatis menyembunyikan kolom rahasia',
					'Baris 2 karena hanya meminta kolom `id` dan `nama`, kolom lain tidak ikut diambil',
					'Baris 1 karena tanpa opsi `select` query berjalan lebih cepat'
				],
				correct_answer_index: 2,
				explanation:
					'Opsi `select` membatasi kolom sejak database, sehingga bytes yang dibaca dan dikirim memang berkurang. ORM tidak diam-diam menyembunyikan kolom dan query tanpa `select` justru mentransfer lebih banyak data.'
			},
			{
				id: 'backend-developer-b4-q10',
				question: 'Apa miskonsepsi tentang pemakaian `SELECT *`?',
				options: [
					'`SELECT *` selalu lebih cepat karena database tidak perlu memilih kolom',
					'`SELECT *` membuat index otomatis terbentuk',
					'`SELECT *` mencegah data rahasia bocor karena semua kolom ikut terkirim',
					'`SELECT *` memaksa transfer semua kolom sehingga query lebih lambat dan perubahan skema mudah merusak kode'
				],
				correct_answer_index: 3,
				explanation:
					'Mengambil semua kolom memperbesar payload dan memaksa server menyusun data yang mungkin tidak dipakai, plus kode bisa error ketika kolom dihapus. Kecepatan justru sering menurun, index tidak dibuat otomatis, dan kolom sensitif seharusnya tidak ikut terkirim sama sekali.'
			}
		]
	},
	{
		id: 26,
		scope_id: 'backend-developer',
		bab_number: 5,
		title: 'Autentikasi & Keamanan (JWT, Hashing, CORS, Rate Limiting)',
		subtitle: 'Identitas & Pertahanan',
		explanation:
			'Menyimpan password apa adanya berarti satu kebocoran database langsung membuka semua akun. Karena itu password diolah algoritma satu arah seperti `bcrypt` atau `argon2` menjadi hash, ditambah salt acak per user sehingga dua orang dengan password sama punya hash berbeda dan tebakan massal jadi percuma. Hash tidak boleh dibalik — perbandingan cukup dilakukan dengan `bcrypt.compare`. Hindari MD5 atau SHA1 biasa karena terlalu cepat dan sudah banyak tabel reversibelnya, sehingga cocok untuk cek checksum file, bukan menjaga kredensial.\n\nUntuk sesi login, **JWT** bekerja seperti surat jalan bertanda tangan: payload (id user, role, masa berlaku) ditandatangani server dengan rahasia, lalu client membawa token itu pada tiap request. Server cukup memanggil `jwt.verify`; token yang isinya diutak-atik otomatis ditolak karena signature tidak cocok, dan masa berlaku singkat memperkecil kerugian ketika token bocor. Rahasia server tidak boleh pernah sampai ke browser, dan jangan simpan data sensitif di payload karena siapa pun bisa membacanya meski tidak bisa mengubahnya.\n\nDi lapisan tepi, **CORS** berperan seperti daftar tamu: server hanya mengizinkan origin tertentu lewat header `Access-Control-Allow-Origin`, sehingga situs lain tidak bisa membaca respons API-mu. **Rate limiting** membatasi jumlah percobaan per IP atau akun, meredam brute force dan spam. Bedakan `401` (identitas belum terbukti) dari `403` (sudah dikenali tapi tidak berwenang), dan hindari pesan "email belum terdaftar" yang membantu penyerang memeriksa keberadaan akun.',
		code_snippet: `// auth.ts — hashing password dan menerbitkan token
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function daftar(password: string) {
  const hash = await bcrypt.hash(password, 12);
  await db.user.create({ data: { passwordHash: hash } });
}

async function login(user: User, password: string) {
  const cocok = await bcrypt.compare(password, user.passwordHash);
  if (!cocok) throw new Error('Kredensial salah');
  return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
}`,
		code_lang: 'typescript',
		code_caption: 'auth.ts — bcrypt untuk password dan JWT untuk sesi',
		image_url: '/diagrams/backend-developer-b5.svg',
		diagram: null,
		sections: [
			{
				heading: 'Membedakan 401, 403, dan Blokir CORS',
				body: '401 muncul ketika token tidak dikirim, sudah kadaluarsa, atau signature-nya salah. 403 muncul ketika token valid tetapi role user tidak diizinkan. Kalau request bahkan tidak sempat dibaca browser dan muncul galat CORS di console, masalahnya ada pada header response server, bukan pada token yang kamu kirim.'
			}
		],
		diagram_caption:
			'Gambar 26.1: Alur autentikasi JWT — server memeriksa token, memberi akses bila valid, menolak 401 bila tidak, dan mengizinkan refresh.',
		key_points: [
			'Simpan password sebagai hash bersalt (bcrypt atau argon2), bukan plaintext maupun hash tanpa salt.',
			'JWT divalidasi dengan signature dan masa berlaku memakai rahasia server yang tidak boleh bocor ke client.',
			'CORS mengatur origin yang boleh memanggil API, rate limiting membatasi percobaan; 401 berarti belum autentikasi, 403 berarti tidak berwenang.'
		],
		quiz: [
			{
				id: 'backend-developer-b5-q1',
				question: 'Mengapa password harus disimpan sebagai hash **bersalt**?',
				options: [
					'Agar password asli tidak terbaca saat database bocor, dan salt membuat dua user dengan password sama tetap berbeda hash-nya',
					'Agar hash bisa dibalik menjadi password asli ketika user login',
					'Agar proses login berjalan lebih cepat daripada membandingkan teks',
					'Agar password muat di kolom database yang lebih sempit'
				],
				correct_answer_index: 0,
				explanation:
					'Salt memastikan setiap hash unik sehingga tebakan massal dan rainbow table tidak berlaku untuk banyak akun sekaligus, sementara hash tetap tidak bisa dibalik. Faktanya hashing sedikit lebih lambat, kolomnya berukuran mirip, dan justru ketidakbalikan itulah yang melindungi data.'
			},
			{
				id: 'backend-developer-b5-q2',
				question: 'Penyerang mengubah isi payload lalu mengirim ulang token. Apa yang terjadi saat server memanggil `jwt.verify`?',
				code: `// payload asli: { "sub": 9, "role": "user" }\n// payload hasil edit: { "sub": 9, "role": "admin" }\nawait jwt.verify(token, process.env.JWT_SECRET);`,
				code_lang: 'javascript',
				code_caption: 'token.js',
				options: [
					'Token dianggap valid karena isinya masih terbaca JSON',
					'Server mengembalikan payload lama yang tersimpan di memori',
					'Verifikasi melempar error karena signature tidak cocok dengan payload yang diubah',
					'Server otomatis menghapus akun penyerang'
				],
				correct_answer_index: 2,
				explanation:
					'Signature dibuat dari isi payload plus rahasia server, jadi begitu payload diubah signature lama tidak lagi cocok dan verifikasi gagal. Server tidak menyimpan salinan token lama maupun punya akses menghapus data di client; itulah sebabnya rahasia wajib dirahasiakan.'
			},
			{
				id: 'backend-developer-b5-q3',
				question:
					'Dalam satu menit masuk 5.000 percobaan login ke satu akun dari berbagai IP. Fitur mana yang paling tepat dipasang?',
				options: [
					'CORS dengan `Access-Control-Allow-Origin: *`',
					'Rate limiting per IP atau akun, ditambah jeda atau penguncian sementara setelah beberapa kali gagal',
					'Menyimpan password plaintext agar login lebih cepat',
					'Mengubah semua balasan gagal login menjadi status 200'
				],
				correct_answer_index: 1,
				explanation:
					'Rate limiting menutup jalur percobaan beruntun sehingga serangan tebak password jadi tidak ekonomis. CORS hanya soal origin browser, password justru harus tetap di-hash, dan menyembunyikan status tidak menghentikan jumlah percobaan.'
			},
			{
				id: 'backend-developer-b5-q4',
				question: 'Pernyataan mana yang benar tentang CORS?',
				options: [
					'CORS menjamin tidak ada yang bisa membajak token user',
					'CORS menggantikan kebutuhan autentikasi pada API',
					'CORS memblokir semua request dari Postman',
					'CORS hanya mengatur origin mana yang boleh memanggil API dari browser, jadi identitas tetap perlu JWT atau cookie'
				],
				correct_answer_index: 3,
				explanation:
					'CORS adalah kebijakan yang dieksekusi browser untuk mencegah situs lain membaca respons lintas origin, bukan pengenal user. Token tetap diperlukan untuk membuktikan identitas, dan alat seperti Postman tidak patuh pada CORS karena memang bukan browser.'
			},
			{
				id: 'backend-developer-b5-q5',
				question: 'User sudah login, tetapi role `viewer` mencoba endpoint `DELETE`. Status apa yang pantas?',
				options: ['403 Forbidden', '401 Unauthorized', '404 Not Found', '200 OK dengan pesan error di body'],
				correct_answer_index: 0,
				explanation:
					'403 dipakai ketika identitas sudah dikenali tetapi izinnya tidak cukup untuk aksi itu. 401 untuk yang belum berhasil autentikasi, 404 ketika resource tidak ada, dan 400-serie lebih tepat daripada membalas 200 untuk penolakan.'
			},
			{
				id: 'backend-developer-b5-q6',
				question: 'Apa yang terjadi pada potongan berikut ketika password yang diketik benar?',
				code: `const hash = "$2a$12$Kx0pLmN8sQrTuVwXyZ1aB";\nconst cocok = await bcrypt.compare("rahasia123", hash);\nconsole.log(cocok);`,
				code_lang: 'javascript',
				code_caption: 'login.js',
				options: [
					'Mencetak string hash baru karena `compare` menghasilkan hash dari input',
					'Mencetak `undefined` karena hash tidak bisa dibandingkan',
					'Mencetak `true` — `compare` mengecek password terhadap hash bersalt tanpa membalik hash',
					'Melempar error karena password tidak boleh ditulis langsung'
				],
				correct_answer_index: 2,
				explanation:
					'`bcrypt.compare` menghitung hash dari password input memakai salt yang tersimpan di dalam string hash, lalu membandingkannya; hasilnya boolean. Fungsi ini tidak mengembalikan hash baru, tidak mengembalikan undefined, dan memang dirancang menerima password plaintext dari user.'
			},
			{
				id: 'backend-developer-b5-q7',
				question: 'Urutan bagian yang benar pada JWT adalah...',
				options: [
					'Signature, payload, header',
					'Header, payload, signature',
					'Payload, signature, header',
					'Header, signature, payload'
				],
				correct_answer_index: 1,
				explanation:
					'JWT ditulis sebagai tiga bagian yang digabung tanda titik: header (algoritma), data (klaim), lalu signature yang menandatangani keduanya. Urutan lain membuat token tidak dikenali parser.'
			},
			{
				id: 'backend-developer-b5-q8',
				question:
					'Saat mendaftar server membalas "email sudah dipakai", sedangkan saat login membalas "email belum terdaftar". Apa risikonya?',
				options: [
					'Tidak ada risiko karena pesan hanya tampil di browser',
					'Pesan error membuat response menjadi tidak valid JSON',
					'User jadi bingung sehingga harus mengulang pendaftaran',
					'Penyerang bisa memeriksa keberadaan email (user enumeration) lalu fokus menyerang akun yang nyata ada'
				],
				correct_answer_index: 3,
				explanation:
					'Perbedaan pesan itu berfungsi seperti pengecek keberadaan akun tanpa perlu membobol apa pun. Untuk menutupnya, balas pesan umum seperti "periksa email kamu untuk instruksi selanjutnya" dan lakukan pengecekan di latar belakang.'
			},
			{
				id: 'backend-developer-b5-q9',
				question: 'Apa arti balasan berikut bagi client?',
				code: `HTTP/1.1 429 Too Many Requests\nRetry-After: 30`,
				code_lang: 'bash',
				code_caption: 'respons server',
				options: [
					'Permintaan dibatasi server dan boleh dicoba lagi setelah 30 detik',
					'Password user salah sehingga harus mengirim ulang token',
					'Server sedang error dan perlu dihubungi admin',
					'URL yang diminta tidak ditemukan'
				],
				correct_answer_index: 0,
				explanation:
					'429 adalah tanda rate limiting aktif, dan header `Retry-After` memberi jeda yang disarankan sebelum mencoba kembali. Password salah memakai 401, error server memakai 500, dan tidak ditemukan memakai 404.'
			},
			{
				id: 'backend-developer-b5-q10',
				question: 'Miskonsepsi mana tentang penyimpanan password?',
				options: [
					'MD5 lebih aman daripada bcrypt karena prosesnya lebih cepat',
					'Membalik teks password (reverse) sudah cukup mengamankan data',
					'Hash biasa tanpa salt rentan terhadap rainbow table, jadi wajib memakai bcrypt atau argon2 yang bersalt otomatis',
					'Menyimpan password dalam base64 dianggap aman karena berubah bentuk'
				],
				correct_answer_index: 2,
				explanation:
					'Tanpa salt, hash identik untuk password identik dan mudah dicocokkan dengan tabel prekalkulasi; salt pada bcrypt/argon2 mematahkan keuntungan itu. Cepatnya MD5 justru memudahkan peretasan, reverse dan base64 mudah dibalik siapa pun.'
			}
		]
	},
	{
		id: 27,
		scope_id: 'backend-developer',
		bab_number: 6,
		title: 'Caching & Message Queues (Redis/RabbitMQ)',
		subtitle: 'Kecepatan & Pemrosesan Asinkron',
		explanation:
			'Setiap request yang menyusun data mahal — query rapat, perhitungan laporan, respons agregasi — bisa disimpan sementara di **Redis** supaya permintaan berikutnya tinggal membaca. Pola paling umum adalah **cache-aside**: aplikasi mengecek cache lebih dulu; kalau *miss*, ia membaca database lalu menaruh hasilnya kembali beserta **TTL**, misalnya 60 detik. TTL berperan sebagai jaring pengaman supaya entri basi tidak hidup selamanya ketika proses pembaruan suatu saat terlewat.\n\nTantangan utamanya ada di invalidasi. Studi kasus: admin mengubah harga produk, tetapi pengguna tetap melihat harga lama selama beberapa menit karena cache tidak dibatalkan — maka setiap penulisan data sebaiknya menghapus atau memperbarui kunci yang terpengaruh. Di sisi lain, cache yang terlalu sering dibuang membuat database kembali kebebani; cari tengahnya dengan TTL pendek untuk data cepat berubah dan lebih panjang untuk data stabil, lalu awasi ukuran memori Redis agar tidak menumbuk aplikasi lain.\n\nSementara cache mempercepat pembacaan, **message queue** seperti RabbitMQ memecah pekerjaan lambat dari request. Saat checkout, service cukup menyimpan pesanan lalu menerbitkan event `order.baru`; worker terpisah mengirim email dan memperbarui stok tanpa membuat client menunggu. Kontraknya: pengiriman umumnya *at-least-once*, jadi pesan bisa sampai dua kali dan worker harus idempoten. Pesan yang terus gagal diproses dikirim ke **dead-letter queue** agar tidak memblokir antrean.',
		code_snippet: `// katalog.js — cache-aside dan penerbitan pekerjaan
async function ambilProduk(id) {
  const kunci = 'produk:' + id;
  const cache = await redis.get(kunci);
  if (cache) return JSON.parse(cache);
  const data = await db.produk.findUnique({ where: { id } });
  await redis.set(kunci, JSON.stringify(data), 'EX', 60);
  return data;
}
async function checkout(pesanan) {
  await db.pesanan.simpan(pesanan);
  await queue.publish('order.baru', JSON.stringify(pesanan));
}`,
		code_lang: 'javascript',
		code_caption: 'katalog.js — cache-aside dengan Redis dan publish ke antrean',
		image_url: '/diagrams/backend-developer-b6.svg',
		diagram: null,
		sections: [
			{
				heading: 'Kapan Pekerjaan Layak Masuk Antrean',
				body: 'Kandidat terbaik adalah pekerjaan yang butuh waktu lebih dari ratusan milidetik, bisa diulang, dan tidak meminta hasil seketika: kirim email, buat thumbnail, rekap laporan. Sebaliknya, operasi yang wajib selesai sebelum respons dikirim — seperti mengurangi stok saat checkout — tetap berjalan di dalam request utama supaya keadaan data tetap bisa dipastikan.'
			}
		],
		diagram_caption:
			'Gambar 27.1: Dua jalur percepat — Redis sebagai cache hit/miss dan RabbitMQ sebagai antrean yang diproses worker sebelum menulis ke database.',
		key_points: [
			'Cache-aside: baca cache lebih dulu, query database saat miss, lalu simpan hasilnya kembali dengan TTL.',
			'Setiap penulisan data harus membatalkan atau memperbarui cache supaya pengguna tidak membaca data basi.',
			'Message queue memisahkan pekerjaan lambat dari request; worker harus idempoten karena pesan bisa terkirim lebih dari sekali.'
		],
		quiz: [
			{
				id: 'backend-developer-b6-q1',
				question: 'Apa fungsi **TTL** pada data cache?',
				options: [
					'Menentukan ukuran maksimum data yang boleh disimpan',
					'Membuat data cache kedaluwarsa otomatis setelah waktu tertentu',
					'Mengenkripsi data sebelum disimpan di Redis',
					'Menghitung berapa kali data dibaca dari database'
				],
				correct_answer_index: 1,
				explanation:
					'TTL (time to live) memberi batas usia entri sehingga data lama hilang sendiri tanpa harus dihapus manual. Ukuran cache diatur kebijakan lain, enkripsi bukan tugas TTL, dan penghitungan baca dilakukan lewat statistik atau metrik.'
			},
			{
				id: 'backend-developer-b6-q2',
				question:
					'Pada panggilan pertama dan kedua `ambilProduk(42)` tanpa perubahan apa pun, berapa kali query database dijalankan?',
				code: `async function ambilProduk(id) {\n  const kunci = "produk:" + id;\n  const cache = await redis.get(kunci);\n  if (cache) return JSON.parse(cache);\n  const data = await db.produk.findUnique({ where: { id } });\n  await redis.set(kunci, JSON.stringify(data), "EX", 60);\n  return data;\n}`,
				code_lang: 'javascript',
				code_caption: 'ambilProduk.js',
				options: [
					'2 kali, sekali tiap panggilan karena fungsi selalu sampai ke baris query',
					'0 kali karena data selalu diambil dari cache',
					'3 kali karena ada operasi `set` pada cache',
					'1 kali — panggilan pertama miss lalu mengisi cache, panggilan kedua hit'
				],
				correct_answer_index: 3,
				explanation:
					'Baris `redis.get` menembus pada panggilan pertama sehingga database dibaca sekali dan hasilnya disimpan; panggilan kedua berhenti di `if (cache)`. Operasi `set` menulis ke Redis, bukan ke database, sehingga tidak menambah query.'
			},
			{
				id: 'backend-developer-b6-q3',
				question:
					'Admin mengubah harga produk, tetapi pengguna masih melihat harga lama selama beberapa menit. Apa penyebab paling mungkin?',
				options: [
					'Cache tidak dibatalkan atau diperbarui saat data di database berubah',
					'HTTP method yang dipakai salah sehingga harga tidak tersimpan',
					'Database menolak UPDATE karena kolom harga bertipe teks',
					'Client tidak mengirim header `Content-Type`'
				],
				correct_answer_index: 0,
				explanation:
					'Ini gejala klasik cache basi: nilai lama masih hidup di Redis sampai TTL-nya habis. UPDATE yang gagal akan memunculkan error di server, dan header request tidak memengaruhi isi cache yang sudah tersimpan.'
			},
			{
				id: 'backend-developer-b6-q4',
				question: 'Manakah pernyataan yang benar soal invalidasi cache?',
				options: [
					'Menghapus seluruh cache setiap ada satu perubahan kecil selalu praktik terbaik',
					'Cache tidak perlu diurus karena TTL pasti cukup',
					'Invalidasi yang baik menyasar kunci yang terpengaruh saja, dengan TTL sebagai jaring pengaman bila ada yang terlewat',
					'Cache boleh dibiarkan basi selama server tidak error'
				],
				correct_answer_index: 2,
				explanation:
					'Menyasar kunci spesifik menjaga data lain tetap hangat dan beban database tetap rendah, sedangkan TTL menutup celah ketika proses invalidasi gagal. Menghapus semua berlebihan, mengabaikan invalidasi membuat data lama tampil, dan cache basi tetap merusak kepercayaan user walau server sehat.'
			},
			{
				id: 'backend-developer-b6-q5',
				question: 'Kapan pekerjaan paling tepat dipindahkan ke message queue?',
				options: [
					'Saat operasi wajib selesai sebelum response dikirim ke client',
					'Saat pekerjaan lambat dan tidak wajib seketika, misalnya mengirim ribuan email notifikasi',
					'Saat data harus dibaca dari cache',
					'Saat ingin menghapus seluruh kolom tabel'
				],
				correct_answer_index: 1,
				explanation:
					'Antrean cocok untuk pekerjaan yang boleh tertunda agar request tetap ringan dan respons cepat. Operasi yang harus dikonfirmasi seketika tetap di request utama, dan membaca cache maupun menghapus kolom bukan alasan memakai antrean.'
			},
			{
				id: 'backend-developer-b6-q6',
				question:
					'Worker menerima pesan yang sama dua kali karena koneksi sempat terputus. Jaminan apa yang umumnya diberikan queue dan bagaimana worker seharusnya bersikap?',
				code: `queue.consume("order.baru", async (pesan) => {\n  await kirimEmail(JSON.parse(pesan).email);\n  await queue.ack(pesan);\n});`,
				code_lang: 'javascript',
				code_caption: 'worker.js',
				options: [
					'Queue menjamin tepat satu kali, jadi worker tidak perlu apa-apa',
					'Queue menghapus pesan begitu diterima worker',
					'Worker harus menolak semua pesan duplikat secara manual tanpa cek',
					'Umumnya at-least-once, jadi worker dibuat idempoten dengan mengecek id pesanan sebelum mengulang kerjanya'
				],
				correct_answer_index: 3,
				explanation:
					'Karena ack bisa gagal setelah pekerjaan selesai, pesan dikirim ulang sehingga jaminan yang umum adalah at-least-once. Idempotensi membuat pengulangan aman; menghapus pesan sebelum diproses justru berisiko kehilangan data.'
			},
			{
				id: 'backend-developer-b6-q7',
				question: 'Apa itu **dead-letter queue**?',
				options: [
					'Antrean cadangan untuk pesan yang terus gagal diproses, agar bisa diperiksa tanpa memblokir antrean utama',
					'Antrean khusus pesan yang dibatalkan oleh user',
					'Tempat menyimpan password user yang gagal login',
					'Cache berkecepatan tinggi untuk data yang sering dibaca'
				],
				correct_answer_index: 0,
				explanation:
					'Pesan yang melewati batas percobaan dipindahkan ke antrean khusus ini supaya worker lain tetap bisa memproses pesan normal, lalu tim memeriksa penyebab kegagalanannya. Fungsinya beda jauh dari penyimpanan kredensial atau cache.'
			},
			{
				id: 'backend-developer-b6-q8',
				question:
					'Saat flash sale, trafik melonjak dan database dibuat terus-menerus query produk yang sama. Langkah paling tepat adalah...',
				options: [
					'Menonaktifkan semua endpoint lain agar fokus ke satu produk',
					'Menyimpan seluruh database di memori aplikasi',
					'Melayani data produk dari cache dengan TTL singkat dan menampung aksi tulis lewat antrean',
					'Menghapus index agar penulisan lebih cepat'
				],
				correct_answer_index: 2,
				explanation:
					'Membaca dari cache menahan beban berulang sementara antrean merapikan aksi tulis yang menumpuk. Mematikan endpoint membuat layanan lain mati, memindahkan seluruh database ke memori aplikasi tidak realistis, dan menghapus index justru memperlambat segalanya.'
			},
			{
				id: 'backend-developer-b6-q9',
				question: 'Apa efek perintah berikut?',
				code: `redis-cli SET produk:42 '{"harga":399000}' EX 60`,
				code_lang: 'bash',
				code_caption: 'terminal redis',
				options: [
					'Menyimpan data tanpa batas waktu sehingga harus dihapus manual',
					'Menyimpan kunci `produk:42` yang otomatis kedaluwarsa setelah 60 detik',
					'Menjalankan query SQL ke tabel produk',
					'Menghapus kunci `produk:42` dari Redis'
				],
				correct_answer_index: 1,
				explanation:
					'Opsi `EX 60` menetapkan TTL 60 detik untuk kunci tersebut, jadi Redis menghapusnya sendiri setelah waktu itu. Perintah ini menulis ke Redis bukan database, dan bukan perintah penghapusan.'
			},
			{
				id: 'backend-developer-b6-q10',
				question: 'Benarkah message queue menjamin pesan diproses **tepat sekali**?',
				options: [
					'Benar, selama worker selalu berjalan tanpa putus',
					'Benar asalkan memakai RabbitMQ, bukan Redis',
					'Benar karena setiap pesan punya id unik',
					'Tidak; yang umum dijamin adalah at-least-once, jadi pemrosesan bisa berulang dan worker harus idempoten'
				],
				correct_answer_index: 3,
				explanation:
					'Exactly-once sulit dijamin di sistem tersebar, maka praktiknya at-least-once dipasangkan dengan idempotensi di sisi pemroses. Keberjalan worker dan pilihan produk tidak mengubah jaminan pengiriman, dan id unik hanya membantu deteksi duplikat.'
			}
		]
	},
	{
		id: 28,
		scope_id: 'backend-developer',
		bab_number: 7,
		title: 'Arsitektur Microservices & CI/CD Deployment',
		subtitle: 'Skala & Rilis Otomatis',
		explanation:
			'Monolit cepat dibangun, tetapi ketika satu bagian seperti proses video membanjiri seluruh server, semuanya ikut terdampak. **Microservices** memecah sistem menjadi layanan kecil dengan tanggung jawab jelas — katalog, pembayaran, notifikasi — yang bisa diskalakan dan dirilis terpisah sesuai kebutuhan timnya. Tukarnya: jaringan yang bisa gagal, data yang terpecah per layanan sehingga tidak ada JOIN lintas service, dan konsistensi yang hanya bersifat akhir (eventual). Sistem harus tetap dirancang jalan saat satu layanan sedang down.\n\nKomunikasi antar layanan memakai REST atau gRPC untuk panggilan sinkron, dan message broker ketika pekerjaan boleh tertunda. Karena satu permintaan bisa melewati banyak layanan, tiap request perlu **correlation ID** agar jejaknya terlacak di log terpusat, ditambah metrik dan retry dengan jeda yang tumbuh (backoff) supaya kegagalan sesaat tidak membanjiri layanan sebelah. Di sisi data, tiap service bebas memilih teknologi asalkan batas kepemilikannya jelas.\n\n**CI/CD** menghapus rilis manual: setiap push menjalankan lint dan test otomatis — gagal uji berarti pipeline berhenti dan kode tidak lanjut ke server — lalu membangun image dan mendeploy. Kamu menambah strategi seperti blue-green atau canary agar versi baru diuji pada sebagian trafik lebih dulu, sehingga rollback cukup dengan mengembalikan trafik ke versi lama. Studi kasusnya, tim yang dulu merilis sebulan sekali kini mendorong kode ke produksi tiap hari karena pipeline-lah yang menjaga kualitasnya.',
		code_snippet: `# deploy.sh — dari commit sampai health check
npm ci
npm run lint && npm test
docker build -t registry.tokoku/api:1.4.2 .
docker push registry.tokoku/api:1.4.2

ssh deploy@api-1 "docker pull registry.tokoku/api:1.4.2"
ssh deploy@api-1 "docker stop api && docker rm api"
ssh deploy@api-1 "docker run -d --name api -p 8080:8080 registry.tokoku/api:1.4.2"
curl -fsS https://api.tokoku.com/health || echo "cek gagal, jalankan rollback"`,
		code_lang: 'bash',
		code_caption: 'deploy.sh — pipeline CI/CD dari build sampai health check',
		image_url: '/diagrams/backend-developer-b7.svg',
		diagram: null,
		sections: [
			{
				heading: 'Strategi Rilis yang Aman',
				body: 'Blue-green menyiapkan dua lingkungan identik lalu memindahkan trafik seketika, sedangkan canary menyalurkan sebagian kecil trafik ke versi baru lebih dulu. Keduanya makin tenang bila disertai feature flag sehingga fitur baru bisa dinyalakan tanpa deploy ulang, dan rollback cukup dengan mematikan flag atau mengembalikan trafik ke versi lama.'
			}
		],
		diagram_caption:
			'Gambar 28.1: Pipeline CI/CD dari build image, pengujian otomatis, deploy staging, smoke test, hingga rilis produksi bertahap.',
		key_points: [
			'Microservices menukar kemudahan monolit dengan tantangan jaringan, data terpecah, dan konsistensi akhir.',
			'Komunikasi antar layanan: REST atau gRPC untuk panggilan sinkron, message broker untuk pekerjaan yang boleh tertunda.',
			'CI/CD menjalankan lint, test, build, dan deploy secara otomatis; gerbangnya adalah hasil pipeline, bukan klik manual.'
		],
		quiz: [
			{
				id: 'backend-developer-b7-q1',
				question: 'Kapan memecah aplikasi menjadi microservices paling masuk akal?',
				options: [
					'Sejak baris pertama kode ditulis agar struktur selalu rapi',
					'Setiap kali tim ingin memakai bahasa pemrograman yang berbeda',
					'Saat ada bagian yang butuh skala, rilis, atau tim yang terpisah dari modul lain',
					'Hanya ketika aplikasi sudah memakai database relasional'
				],
				correct_answer_index: 2,
				explanation:
					'Pemecahan paling bermanfaat ketika ada kebutuhan yang berbeda-beda antar bagian, misalnya video yang menuntut resource jauh lebih besar. Memecah sejak awal atau demi pilihan bahasa menambah kompleksitas jaringan dan rilis tanpa kebutuhan nyata.'
			},
			{
				id: 'backend-developer-b7-q2',
				question: 'Apa yang terjadi pada pipeline berikut saat `npm test` gagal?',
				code: `npm ci\nnpm run lint && npm test\ndocker build -t registry.tokoku/api:1.4.2 .\ndocker push registry.tokoku/api:1.4.2`,
				code_lang: 'bash',
				code_caption: 'pipeline.sh',
				options: [
					'Pipeline berhenti sebelum build sehingga image tidak pernah dikirim ke registry',
					'Image tetap dibangun lalu di-rollback otomatis',
					'Test gagal diabaikan dan kode tetap dideploy',
					'Seluruh isi repository ikut terhapus'
				],
				correct_answer_index: 0,
				explanation:
					'Operator `&&` hanya menjalankan perintah berikutnya bila yang sebelumnya sukses, sehingga kegagalan test menghentikan rantai sebelum build. Tidak ada rollback otomatis atau penghapusan repo, dan praktik baiknya memang mencegah kode gagal uji sampai ke image.'
			},
			{
				id: 'backend-developer-b7-q3',
				question:
					'Layanan pembayaran sedang down, tetapi katalog tetap melayani pengguna dengan normal. Sifat arsitektur ini disebut...',
				options: [
					'Monolit modular',
					'Transaksi dua fase',
					'Load balancing',
					'Ketahanan layanan: kegagalan satu service dibatasi agar tidak menjatuhkan service lain'
				],
				correct_answer_index: 3,
				explanation:
					'Kemampuan satu bagian gagal tanpa meruntuhkan seluruh sistem adalah salah satu alasan utama memecah monolit. Monolit justru membuat kegagalan satu modul ikut menahan semua, dan istilah transaksi serta load balancing tidak menjelaskan gejala ini.'
			},
			{
				id: 'backend-developer-b7-q4',
				question: 'Tentang data di microservices, mana pernyataan yang benar?',
				options: [
					'Setiap service boleh memakai tabel service lain agar query tetap satu JOIN',
					'Setiap service sebaiknya memiliki data miliknya sendiri; sinkronisasi antar service bersifat akhir, bukan satu transaksi ACID global',
					'Semua service wajib berbagi satu database tunggal supaya konsisten',
					'Data tidak boleh disimpan di service mana pun'
				],
				correct_answer_index: 1,
				explanation:
					'Kepemilikan data per service menjaga tim bebas mengubah skemanya tanpa mengganggu tim lain, dengan rekonsiliasi lewat event sehingga konsistensinya tercapai di akhir (eventual). Berbagi tabel atau database tunggal mengembalikan ketergantungan yang ingin dihindari, dan service tetap butuh penyimpanannya sendiri.'
			},
			{
				id: 'backend-developer-b7-q5',
				question: 'Keuntungan utama **blue-green deployment** adalah...',
				options: [
					'Biaya server menjadi lebih murah',
					'Kode baru diuji langsung di hadapan seluruh pengguna',
					'Versi baru berjalan paralel dengan versi lama sehingga rilis bisa langsung dibalik saat bermasalah',
					'Tidak perlu lagi menjalankan automated test'
				],
				correct_answer_index: 2,
				explanation:
					'Karena dua versi hidup berdampingan, perpindahan dan pengembalian trafik bisa dilakukan dalam hitungan detik. Malah pengujian otomatis tetap wajib, dan langsung menghadapkan kode baru ke seluruh pengguna berisiko tinggi.'
			},
			{
				id: 'backend-developer-b7-q6',
				question:
					'Setelah deploy, health check membalas status 502. Perintah apa yang seharusnya dijalankan pertama kali?',
				code: `curl -fsS https://api.tokoku.com/health\necho "cek selesai"`,
				code_lang: 'bash',
				code_caption: 'health.sh',
				options: [
					'Jalankan rollback ke versi image sebelumnya, lalu selidiki log untuk mencari penyebabnya',
					'Hapus seluruh log server agar kesalahan tidak terlihat',
					'Matikan monitoring supaya alarm berhenti',
					'Paksa semua client memakai versi lama lewat perubahan DNS manual'
				],
				correct_answer_index: 0,
				explanation:
					'502 menandakan versi baru tidak melayani dengan baik, jadi prioritasnya memulihkan layanan lewat rollback sambil data log diselidiki. Menghapus log justru menghilangkan bukti, mematikan monitoring menyembunyikan masalah, dan perubahan DNS lambat serta berisiko.'
			},
			{
				id: 'backend-developer-b7-q7',
				question: 'Apa gunanya **correlation ID** dalam sistem microservices?',
				options: [
					'Menggantikan password antar layanan',
					'Menentukan urutan deploy service',
					'Menyimpan cache bersama di semua service',
					'Menelusuri satu request yang melewati banyak layanan lewat log yang terpusat'
				],
				correct_answer_index: 3,
				explanation:
					'ID yang dibawa dari service ke service memungkinkan kamu mencari semua jejak log satu permintaan, termasuk menemukan layanan mana yang memperlambat atau gagal. Keamanan, urutan rilis, dan cache bukan fungsi dari ID ini.'
			},
			{
				id: 'backend-developer-b7-q8',
				question:
					'Versi baru sudah dideploy ke sebagian kecil pengguna (canary) dan error rate melonjak. Langkah terbaik berikutnya adalah...',
				options: [
					'Mendeploy ke seluruh pengguna agar load terbagi rata',
					'Hentikan rollout dan kembalikan trafik ke versi lama sambil menyelidiki log',
					'Menonaktifkan seluruh test suite agar pipeline hijau',
					'Mengubah semua respons error menjadi 200 OK'
				],
				correct_answer_index: 1,
				explanation:
					'Canary memang dirancang untuk menahan kerusakan pada sebagian kecil trafik, jadi berhenti dan mundur adalah keputusan yang benar. Menambah volume justru memperbesar dampak, mematikan test menyembunyikan masalah, dan status 200 hanya menyamarkan gejala.'
			},
			{
				id: 'backend-developer-b7-q9',
				question: 'Apa fungsi opsi pada perintah berikut?',
				code: `docker run -d --name api --restart unless-stopped -p 8080:8080 registry.tokoku/api:1.4.2`,
				code_lang: 'bash',
				code_caption: 'terminal',
				options: [
					'Menjalankan container hanya sekali lalu menghapusnya',
					'Menghubungkan container ke database milik service lain',
					'Membuat Docker menjalankan kembali container meski server sempat restart',
					'Membatasi container hanya boleh membaca file tertentu'
				],
				correct_answer_index: 2,
				explanation:
					'`--restart unless-stopped` menyuruh Docker menghidupkan lagi container secara otomatis setelah crash atau reboot, sehingga layanan pulih tanpa campur tangan manual. Opsi itu tidak menghapus container, tidak menautkan service lain, dan bukan soal izin file.'
			},
			{
				id: 'backend-developer-b7-q10',
				question: 'Apa beda **CI** dan **CD**?',
				options: [
					'CI sering menggabungkan dan menguji kode secara otomatis, CD mengirim hasil yang lolos uji ke server secara otomatis',
					'Keduanya sama saja, hanya singkatan yang berbeda',
					'CI hanya dipakai untuk deploy manual, CD untuk pengujian',
					'CD berarti menulis dokumentasi kode setiap commit'
				],
				correct_answer_index: 0,
				explanation:
					'Continuous Integration menyangkut penggabungan dan pengujian kode yang rutin di setiap push, sedangkan Continuous Delivery atau Deployment melanjutkan hasil yang sudah lolos sampai ke server. Bukan sinonim, dan CI bukan ajang deploy manual.'
			}
		]
	}
];
