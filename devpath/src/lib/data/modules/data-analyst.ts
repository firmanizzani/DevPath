import type { BabModule } from '$lib/data/types';

export const modules: BabModule[] = [
	{
		id: 29,
		scope_id: 'data-analyst',
		bab_number: 1,
		title: 'Pembersihan & Persiapan Data (Data Wrangling)',
		subtitle: 'Persiapan Data',
		explanation:
			'Data mentah dari export database, survei pelanggan, atau file Excel hampir selalu kotor. Studi kasus: tim marketing sebuah e-commerce mengunduh 50.000 baris transaksi untuk laporan bulanan, lalu menemukan 1.200 baris duplikat, kolom tanggal ditulis dalam tiga format berbeda, nama kota seperti `jakarta`, `Jakarta `, dan `JKT` yang maksudnya sama, serta kolom nilai_transaksi kosong pada sebagian baris. Akibatnya total penjualan jauh meleset dari angka sebenarnya. Tahap **data wrangling** alias pembersihan dan persiapan data adalah proses membaca, memeriksa, menstandarkan, dan menyimpan ulang data supaya layak dianalisis.\n\nKenapa tahap ini yang duluan? Karena kualitas kesimpulan tidak akan pernah melampaui kualitas data yang masuk, prinsip *garbage in, garbage out*. Di pekerjaan nyata, mayoritas waktu analyst memang habis untuk mengambil dan mencuci data, bukan membuat grafik cantik. Alurnya selalu berulang: baca data dengan `pandas`, cek ukuran dan jumlah nilai kosong lewat `isna().sum()`, buang duplikat dengan `drop_duplicates()`, konversi tipe data terutama tanggal lewat `pd.to_datetime`, lalu seragamkan teks dengan `strip()` dan `str.lower()`. Setelah itu tentukan apakah baris kosong dihapus atau diisi ulang sesuai konteks bisnisnya: nilai penjualan yang kosong lebih aman diisi nol, sedangkan kolom usia yang 40 persen kosong jangan diisi sembarangan karena akan menurunkan rata-rata. Terakhir, simpan hasilnya ke file bersih beserta catatan setiap keputusan pembersihan, supaya rekan kerja bisa mengulang langkah yang sama dan analisis tetap bisa direproduksi.',
		sections: [
			{
				heading: 'Empat Musuh Data yang Paling Sering Muncul',
				body: '**Duplikat** (baris kembar), **missing value** (nilai kosong), **format tidak seragam** (tanggal dan satuan ditulis beda-beda), serta **typo kategori** (`JKTI`, `Jakarta`, `Jakarta Raya` yang maksudnya sama). Deteksi cepat: `df.duplicated().sum()`, `df.isna().sum()`, dan `value_counts()` pada tiap kolom kategori.'
			}
		],
		code_snippet: `import pandas as pd

df = pd.read_csv('penjualan.csv')
print(df.shape)
print(df.isna().sum())

df = df.drop_duplicates()
df['tanggal'] = pd.to_datetime(df['tanggal'])
df['kota'] = df['kota'].str.strip().str.title()
df['jumlah'] = df['jumlah'].fillna(0)

df.to_csv('penjualan_bersih.csv', index=False)`,
		code_lang: 'python',
		code_caption: 'bersihkan_data.py — cek, bersihkan, lalu simpan dengan pandas',
		image_url: '/diagrams/data-analyst-b1.svg',
		diagram: 'pipeline',
		diagram_caption: 'Gambar 29.1: Alur persiapan data — ambil, cek, bersihkan, standarkan, simpan.',
		key_points: [
			'Data wrangling mendahului analisis: cek, bersihkan, dan standarkan data sebelum mengambil kesimpulan.',
			'Empat masalah paling umum: duplikat, nilai kosong, format tidak seragam, dan typo pada kolom kategori.',
			'Dokumentasikan tiap keputusan pembersihan supaya analisis bisa direproduksi orang lain.'
		],
		quiz: [
			{
				id: 'data-analyst-b1-q1',
				question: 'Apa maksud prinsip *garbage in, garbage out* dalam analisis data?',
				options: [
					'Data mentah harus selalu dibuang sebelum dianalisis',
					'Kualitas kesimpulan tidak akan lebih baik dari kualitas data yang dimasukkan',
					'Database otomatis membersihkan data setiap kali diquery',
					'Semakin banyak baris data, semakin kecil peluang kesalahan'
				],
				correct_answer_index: 1,
				explanation:
					'Analisis hanya memproses angka yang masuk, sehingga kesalahan pada data akan terbawa sampai kesimpulan akhir. Data mentah tetap dipakai, hanya perlu dicuci dulu, dan database tidak pernah membersihkan isi kolom secara otomatis.'
			},
			{
				id: 'data-analyst-b1-q2',
				question: 'Apa keluaran dari potongan kode berikut?',
				code: `import pandas as pd

df = pd.DataFrame({'kota': ['Jakarta', 'jakarta ', 'Bandung', 'BANDUNG']})
df['kota'] = df['kota'].str.strip().str.title()
print(df['kota'].nunique())`,
				code_lang: 'python',
				code_caption: 'cek_kota.py',
				options: ['4', '1', '3', '2'],
				correct_answer_index: 3,
				explanation:
					'`strip()` membuang spasi ekor dan `title()` menyeragamkan kapital, sehingga keempat nilai berubah menjadi Jakarta, Jakarta, Bandung, dan Bandung. Nilai unik tinggal dua, jadi hasil cetaknya 2.'
			},
			{
				id: 'data-analyst-b1-q3',
				question: 'Sebuah kolom berisi 1.000 baris dan 25 di antaranya kosong. Berapa persentase missing value pada kolom tersebut?',
				options: ['2,5%', '25%', '0,25%', '250%'],
				correct_answer_index: 0,
				explanation:
					'Persentase dihitung sebagai 25 dibagi 1.000 lalu dikalikan 100, sehingga hasilnya 2,5 persen. Angka 0,25 persen didapat dari 25 dibagi 10.000, bukan 1.000.'
			},
			{
				id: 'data-analyst-b1-q4',
				question:
					'Output `df.isna().sum()` menunjukkan kolom `gaji` kosong pada 400 dari 1.000 baris. Tindakan paling bertanggung jawab adalah...',
				options: [
					'Langsung ganti semua nilai kosong dengan 0 lalu lanjutkan analisis',
					'Hapus seluruh kolom gaji karena dianggap rusak',
					'Periksa penyebab dan pola kosongnya dulu, baru tentukan isi ulang atau kecualikan',
					'Diamkan saja dan jangan dilaporkan kepada siapa pun'
				],
				correct_answer_index: 2,
				explanation:
					'Kosong sebanyak 40 persen terlalu besar untuk diabaikan, dan mengisinya dengan 0 akan menurunkan rata-rata gaji secara drastis. Cek dulu apakah kosongnya berpola (misalnya hanya pada karyawan baru) sebelum memilih strategi imputasi atau kecualikan kolom.'
			},
			{
				id: 'data-analyst-b1-q5',
				question: 'Urutan langkah data wrangling yang paling logis adalah...',
				options: [
					'Simpan hasilnya lebih dulu, baru baca data dan cek strukturnya',
					'Baca data, cek struktur dan nilai kosong, buang duplikat, seragamkan format, lalu simpan hasil bersih',
					'Langsung membuat visualisasi sebelum data dibersihkan',
					'Tambahkan kolom baru sebanyak mungkin sebelum cek isi data'
				],
				correct_answer_index: 1,
				explanation:
					'Wrangling selalu diawali memahami isi data, baru memperbaikinya, dan disimpan di akhir sebagai artefak yang bisa dipakai ulang. Menyimpan sebelum dibersihkan berarti file hasilnya sama kotor dengan sumbernya.'
			},
			{
				id: 'data-analyst-b1-q6',
				question: 'Apa keluaran dari potongan kode berikut?',
				code: `import pandas as pd

df = pd.DataFrame({'harga': [100, 200, None, 400]})
print(df['harga'].isna().sum())
print(round(df['harga'].mean(), 2))`,
				code_lang: 'python',
				code_caption: 'cek_kosong.py',
				options: ['2 dan 175.0', '1 dan 300.0', '1 dan 233.33', '0 dan 233.33'],
				correct_answer_index: 2,
				explanation:
					'Ada satu nilai kosong sehingga `isna().sum()` bernilai 1. Fungsi `mean()` mengabaikan nilai kosong, jadi hasilnya (100+200+400)/3 = 233.33.'
			},
			{
				id: 'data-analyst-b1-q7',
				question:
					'Baris pada file transaksi terlihat kembar, tetapi setiap baris punya `id_transaksi` yang selalu unik. Cara paling tepat mendeteksi transaksi yang sama tercatat dua kali adalah...',
				options: [
					'Deteksi duplikat dengan `subset` kolom kunci transaksi seperti tanggal, produk, dan nominal',
					'Selalu jalankan `drop_duplicates()` tanpa parameter karena paling aman',
					'Cukup periksa lewat grafik saja, tidak perlu kode',
					'Kolom id membuat duplikat mustahil terjadi sehingga tidak perlu dicek'
				],
				correct_answer_index: 0,
				explanation:
					'Karena `id_transaksi` selalu berbeda, `duplicated()` dengan seluruh kolom tidak akan menemukan apa pun. Tentukan subset kolom yang benar-benar menjelaskan sebuah transaksi agar kembarannya terdeteksi.'
			},
			{
				id: 'data-analyst-b1-q8',
				question: 'Manakah pernyataan yang KELIRU tentang `drop_duplicates()`?',
				options: [
					'Secara default ia membandingkan seluruh kolom untuk menentukan baris kembar',
					'Duplikat sebaiknya ditangani sebelum agregasi agar angka ringkasan tidak membengkak',
					'Parameter `keep="first"` mempertahankan kemunculan pertama dari baris kembar',
					'Ia selalu menghapus duplikat berdasarkan kolom pertama saja'
				],
				correct_answer_index: 3,
				explanation:
					'Pernyataan terakhir keliru: tanpa `subset`, `drop_duplicates()` membandingkan semua kolom, bukan hanya kolom pertama. Tiga pernyataan lainnya benar dan merupakan praktik standar.'
			},
			{
				id: 'data-analyst-b1-q9',
				question: 'Apa keluaran dari potongan kode berikut?',
				code: `import pandas as pd

df = pd.DataFrame({'kota': ['A', 'B', 'A', 'C'], 'total': [10, 20, 30, 40]})
df = df.drop_duplicates(subset=['kota'], keep='first')
print(df['total'].sum())`,
				code_lang: 'python',
				code_caption: 'dedup_kota.py',
				options: ['70', '60', '50', '100'],
				correct_answer_index: 0,
				explanation:
					'Dengan `subset=[\'kota\']` dan `keep=\'first\'`, hanya baris pertama tiap kota yang bertahan: A(10), B(20), dan C(40). Totalnya 70, bukan 100 seperti data mentah.'
			},
			{
				id: 'data-analyst-b1-q10',
				question: 'Mengapa setiap keputusan pembersihan data perlu didokumentasikan?',
				options: [
					'Agar file CSV tidak menjadi terlalu besar',
					'Supaya jumlah kolom tetap konstan selamanya',
					'Agar analisis bisa direproduksi dan diaudit oleh orang lain',
					'Karena semua database mewajibkan pencatatan harian'
				],
				correct_answer_index: 2,
				explanation:
					'Dokumentasi membuat rekan kerja tahu mengapa sebuah baris dihapus atau nilai diisi ulang, sehingga hasilnya bisa dicek ulang. Tanpa catatan, analisis sama sekali tidak bisa direproduksi.'
			}
		]
	},
	{
		id: 30,
		scope_id: 'data-analyst',
		bab_number: 2,
		title: 'Analisis Eksploratif (EDA) & Statistik Deskriptif',
		subtitle: 'EDA & Statistik',
		explanation:
			'Setelah data bersih, jangan buru-buru menyimpulkan. **Analisis eksploratif data (EDA)** adalah tahap mengamati data dari berbagai sudut sebelum membangun model atau laporan. Studi kasus: tim produk ingin tahu kenapa aplikasi kehilangan pengguna di minggu ketiga, tetapi sebelum menguji hipotesis apa pun mereka membuka ringkasan statistik lebih dulu: mean dan median durasi sesi, standar deviasi, kuartil, bentuk distribusi lewat histogram, boxplot untuk menangkap pencilan, serta matriks korelasi antar kolom seperti durasi_sesi, jumlah_klik, dan umur_akun. Dari gambaran itu muncul dugaan awal: kolom mana yang janggal, kelompok mana yang berbeda perilakunya, dan tren apa yang mungkin tersembunyi.\n\nKenapa tahap ini penting? Karena setiap pilihan analisis berikutnya bergantung pada bentuk data. Kalau distribusinya miring ke kanan, rata-rata akan menipu dan median lebih jujur mewakili pengguna biasa; kalau ada outlier ekstrem, kamu perlu tahu sebelum memasukkannya ke model; kalau dua kolom berkorelasi, itu baru petunjuk kecenderungan bersama, bukan bukti sebab-akibat. Praktiknya di Python sangat ringkas: `describe()` untuk ringkasan statistik, `skew()` untuk mengukur kemiringan, `value_counts()` untuk kolom kategori, `groupby()` untuk membandingkan segmen pengguna, dan `corr()` untuk memetakan hubungan antar kolom numerik. Habiskan waktu lebih lama di tahap ini, karena temuan murah di EDA mencegah kesalahan mahal di akhir proyek.',
		sections: [
			{
				heading: 'Kapan Mean, Kapan Median?',
				body: 'Mean sensitif terhadap outlier: satu gaji direktur bisa menaikkan rata-rata seluruh divisi secara tidak wajar. Median (nilai tengah) jauh lebih tahan, jadi pakai **median** untuk data miring dan berpencilan, serta **mean** untuk data yang distribusinya simetris. Modus hanya relevan pada data kategorikal.'
			}
		],
		code_snippet: `import pandas as pd

df = pd.read_csv('karyawan.csv')

print(df[['gaji', 'masa_kerja']].describe())
print(df['gaji'].median())
print(df['gaji'].skew())

print(df.groupby('divisi')['gaji'].median())
print(df.corr(numeric_only=True)['gaji'].sort_values(ascending=False))`,
		code_lang: 'python',
		code_caption: 'eda_karyawan.py — ringkasan statistik, groupby, dan korelasi',
		image_url: '/diagrams/data-analyst-b2.svg',
		diagram: null,
		diagram_caption:
			'Gambar 30.1: Tiga tampilan EDA — histogram distribusi, boxplot kuartil dan outlier, serta scatter hubungan antarvariabel.',
		key_points: [
			'EDA mengamati pusat data, sebaran, bentuk distribusi, dan korelasi sebelum analisis lebih lanjut.',
			'Data miring dan berpencilan lebih jujur diukur dengan median daripada mean.',
			'Korelasi menunjukkan kecenderungan bergerak bersama, bukan hubungan sebab-akibat.'
		],
		quiz: [
			{
				id: 'data-analyst-b2-q1',
				question:
					'Distribusi gaji sebuah perusahaan sangat condong ke kanan karena ada beberapa eksekutif bergaji jauh di atas rata-rata. Ukuran pusat data yang paling mewakili karyawan biasa adalah...',
				options: ['Mean (rata-rata)', 'Modus', 'Median', 'Rentang'],
				correct_answer_index: 2,
				explanation:
					'Median mengambil nilai tengah sehingga tidak terpengaruh outlier ekstrem, berbeda dengan mean yang ikut tertarik naik oleh gaji eksekutif. Modus hanya cocok untuk data kategorikal, sedangkan rentang termasuk ukuran sebaran bukan ukuran pusat.'
			},
			{
				id: 'data-analyst-b2-q2',
				question: 'Apa keluaran dari potongan kode berikut?',
				code: `import statistics

data = [8, 9, 11, 60]
print(sum(data) / len(data))
print(statistics.median(data))`,
				code_lang: 'python',
				code_caption: 'hitung_pusat.py',
				options: ['22 dan 10', '22 dan 34.5', '12 dan 10', '22 dan 11'],
				correct_answer_index: 0,
				explanation:
					'Mean = (8+9+11+60)/4 = 88/4 = 22, dan nilai 60 menariknya jauh di atas mayoritas data. Median dari data terurut adalah rata-rata dua nilai tengah: (9+11)/2 = 10.'
			},
			{
				id: 'data-analyst-b2-q3',
				question:
					'Penjualan es krim dan jumlah orang tenggelam sama-sama tinggi pada musim panas. Kesimpulan paling tepat adalah...',
				options: [
					'Menjual es krim menyebabkan orang tenggelam',
					'Korelasi selalu membuktikan hubungan sebab-akibat',
					'Kedua kolom pasti berisi kesalahan pencatatan',
					'Keduanya sama-sama dipengaruhi faktor lain seperti cuaca panas; korelasi bukan sebab-akibat'
				],
				correct_answer_index: 3,
				explanation:
					'Korelasi hanya mengukur kecenderungan bergerak bersama, dan keduanya bisa sama-sama dinaikkan oleh variabel ketiga yaitu musim panas. Karena itu korelasi tidak pernah membuktikan kausalitas.'
			},
			{
				id: 'data-analyst-b2-q4',
				question: 'Sebuah dataset memiliki variance sebesar 25. Berapa standar deviasinya?',
				options: ['12,5', '5', '25', '7'],
				correct_answer_index: 1,
				explanation:
					'Standard deviation adalah akar kuadrat dari variance, jadi akar dari 25 sama dengan 5. Angka 12,5 hanya setengah variance, bukan akarnya.'
			},
			{
				id: 'data-analyst-b2-q5',
				question:
					'Histogram menunjukkan sebagian besar nilai berkumpul di kiri dengan ekor panjang ke kanan, dan mean lebih besar dari median. Kesimpulan paling tepat adalah...',
				options: [
					'Distribusi simetris sempurna sehingga mean dan median dipakai bergantian',
					'Distribusi condong ke kiri, jadi median harus diabaikan',
					'Distribusi condong ke kanan (right-skewed), sehingga median lebih mewakili nilai tipikal',
					'Data pasti mengandung duplikat yang harus segera dihapus'
				],
				correct_answer_index: 2,
				explanation:
					'Ekor panjang ke kanan menarik mean ke atas sehingga mean lebih besar dari median, tanda klasik distribusi right-skewed. Pada kondisi ini median menjadi ukuran pusat yang lebih jujur.'
			},
			{
				id: 'data-analyst-b2-q6',
				question: 'Sebuah kolom punya Q1 = 50 dan Q3 = 120. Berapa nilai IQR?',
				options: ['70', '60', '35', '85'],
				correct_answer_index: 0,
				explanation:
					'IQR (*interquartile range*) dihitung sebagai Q3 dikurangi Q1, jadi 120 - 50 = 70. Angka 35 adalah setengah IQR, sedangkan 60 dan 85 tidak terkait rumus kuartil mana pun.'
			},
			{
				id: 'data-analyst-b2-q7',
				question: 'Apa keluaran dari potongan kode berikut?',
				code: `import pandas as pd

s = pd.Series([2, 4, 4, 4, 5, 5, 7, 9])
print(s.mode()[0])
print(s.median())`,
				code_lang: 'python',
				code_caption: 'modus_median.py',
				options: ['5 dan 4.5', '4 dan 5', '4.5 dan 4.5', '4 dan 4.5'],
				correct_answer_index: 3,
				explanation:
					'Nilai 4 muncul tiga kali sehingga modusnya 4. Median dari delapan nilai terurut adalah rata-rata nilai keempat dan kelima: (4+5)/2 = 4.5.'
			},
			{
				id: 'data-analyst-b2-q8',
				question: 'Jika koefisien korelasi antara dua kolom bernilai 0, artinya...',
				options: [
					'Kedua kolom saling bebas secara sempurna dan tidak mungkin berkaitan',
					'Tidak ada hubungan linear, tetapi hubungan non-linear tetap mungkin terjadi',
					'Salah satu kolom pasti berisi nilai kosong',
					'Kedua kolom selalu bernilai sama pada setiap baris'
				],
				correct_answer_index: 1,
				explanation:
					'Korelasi Pearson hanya mengukur hubungan linear; hubungan berbentuk parabola bisa saja kuat namun tetap menghasilkan koefisien mendekati 0. Korelasi 0 juga tidak berarti ada nilai kosong.'
			},
			{
				id: 'data-analyst-b2-q9',
				question:
					'Ringkasan statistik menunjukkan mean = 45 dan median = 40 pada kolom durasi_sesi. Pernyataan paling tepat adalah...',
				options: [
					'Data pasti berdistribusi normal karena kedua angkanya berdekatan',
					'Mean dan median hampir selalu identik sehingga tidak perlu diperiksa lagi',
					'Rata-rata tertarik ke atas oleh nilai ekstrem, jadi distribusi condong ke kanan',
					'Median salah hitung dan harus diganti dengan mean'
				],
				correct_answer_index: 2,
				explanation:
					'Ketika mean lebih besar dari median, biasanya ada nilai ekstrem yang menarik rata-rata ke atas, tandanya distribusi miring ke kanan. Selisih ini juga membuat median lebih mewakili nilai tipikal.'
			},
			{
				id: 'data-analyst-b2-q10',
				question: 'Tujuan utama tahap EDA adalah...',
				options: [
					'Menemukan pola, anomali, dan distribusi data sebelum analisis lebih lanjut',
					'Membuat model prediksi secepat mungkin tanpa memeriksa isi data',
					'Menghapus semua outlier agar angka laporan terlihat rapi',
					'Menghias laporan dengan warna agar cepat disetujui manajemen'
				],
				correct_answer_index: 0,
				explanation:
					'EDA bertujuan memahami data lebih dulu sehingga pilihan analisis berikutnya tepat, bukan menghapus pencilan demi angka yang enak dilihat. Model dan visualisasi baru relevan setelah struktur data dipahami.'
			}
		]
	},
	{
		id: 31,
		scope_id: 'data-analyst',
		bab_number: 3,
		title: 'Advanced SQL untuk Analisis Data (Agregasi, Window Functions)',
		subtitle: 'SQL Lanjutan',
		explanation:
			'SQL dasar mengambil dan menyaring baris; SQL lanjutan mengubah ratusan juta baris menjadi jawaban bisnis dalam hitungan detik. **`GROUP BY`** mengelompokkan baris serupa (per kota, per bulan, per produk) lalu meringkasnya dengan `COUNT`, `SUM`, `AVG`, `MIN`, dan `MAX`. **`HAVING`** menyaring hasil pengelompokan itu, sesuatu yang tidak bisa dilakukan `WHERE` karena `WHERE` berjalan sebelum agregasi. Lalu ada **window function** seperti `ROW_NUMBER`, `RANK`, dan `LAG` yang menambahkan nomor urut, peringkat, atau nilai baris sebelumnya tanpa menggabungkan baris menjadi satu, sehingga detail transaksi tetap terlihat bersama posisinya di dalam kelompok.\n\nStudi kasusnya: manajer retail meminta tiga produk terlaris per cabang bulan lalu, tren pendapatan per bulan, serta rata-rata nilai transaksi per wilayah. Semua permintaan itu bisa dijawab satu atau dua query tanpa menarik data mentah ke laptop. Di database produksi berisi puluhan juta baris, memproses data di sisi server jauh lebih hemat memori dan lebih cepat daripada menghitung ulang di Python. Pola yang paling sering dipakai: agregasi per periode untuk melihat tren, `JOIN` untuk menggabungkan fakta dengan dimensi seperti penjualan dan master produk, klausa `WITH` (CTE) supaya query panjang tetap terbaca, subquery untuk membandingkan tiap baris terhadap rata-rata keseluruhan, serta window function untuk peringkat dan pergerakan nilai antar periode.',
		sections: [
			{
				heading: 'Urutan Eksekusi Klausa SQL',
				body: '`WHERE` memfilter **baris mentah** sebelum dikelompokkan; `HAVING` memfilter **hasil agregasi** setelah `GROUP BY`. Urutannya selalu `FROM` lalu `WHERE`, `GROUP BY`, `HAVING`, `SELECT`, `ORDER BY`, dan terakhir `LIMIT`. Karena itu menulis `WHERE AVG(x) > 100` akan selalu ditolak database.'
			}
		],
		code_snippet: `SELECT bulan,
       SUM(total) AS pendapatan,
       COUNT(DISTINCT customer_id) AS pelanggan,
       AVG(total) AS rata_rata
FROM orders
WHERE tanggal >= '2024-01-01'
GROUP BY bulan
HAVING SUM(total) > 10000000
ORDER BY bulan;`,
		code_lang: 'sql',
		code_caption: 'laporan_bulanan.sql — agregasi, filter hasil, dan pengurutan per bulan',
		image_url: '/diagrams/data-analyst-b3.svg',
		diagram: null,
		diagram_caption:
			'Gambar 31.1: Rangkaian SQL analitik — GROUP BY, fungsi jendela OVER, peringkat, running total, LAG/LEAD, hingga CTE bertingkat.',
		key_points: [
			'`WHERE` menyaring baris mentah, `HAVING` menyaring hasil agregasi setelah `GROUP BY`.',
			'Hitung di database, bukan di memori aplikasi, ketika volumenya besar.',
			'Window function memberi peringkat dan nilai antar baris tanpa menggabungkan baris.'
		],
		quiz: [
			{
				id: 'data-analyst-b3-q1',
				question: 'Klausa SQL mana yang dirancang khusus untuk menyaring hasil **setelah** fungsi agregasi dijalankan?',
				options: [
					'`HAVING` — dipakai bersama `GROUP BY` untuk memfilter hasil agregasi',
					'`WHERE` — selalu boleh memakai `AVG()` langsung di dalamnya',
					'`ORDER BY` — menyaring baris sebelum dikelompokkan',
					'`LIMIT` — menghapus baris yang nilainya kosong'
				],
				correct_answer_index: 0,
				explanation:
					'`HAVING` memang dibuat untuk kondisi atas hasil agregasi seperti `HAVING COUNT(*) > 1`. `WHERE` berjalan sebelum pengelompokan sehingga `WHERE AVG(...)` selalu ditolak, `ORDER BY` hanya mengurutkan, dan `LIMIT` hanya membatasi jumlah baris hasil.'
			},
			{
				id: 'data-analyst-b3-q2',
				question: 'Berapa baris yang dikembalikan query berikut?',
				code: `-- Jakarta 2024-01  800
-- Bandung 2024-01  500
-- Jakarta 2024-02  600
-- Surabaya 2024-01 700
-- Surabaya 2024-02 450

SELECT kota, SUM(omzet) AS total
FROM penjualan
GROUP BY kota
HAVING SUM(omzet) > 1000;`,
				code_lang: 'sql',
				code_caption: 'top_kota.sql',
				options: ['3 baris', '1 baris', '0 baris', '2 baris'],
				correct_answer_index: 3,
				explanation:
					'Total per kota: Jakarta 1.400, Bandung 500, dan Surabaya 1.150. Hanya Jakarta dan Surabaya yang lolos filter di atas 1.000, sehingga query mengembalikan 2 baris.'
			},
			{
				id: 'data-analyst-b3-q3',
				question: 'Apa yang terjadi pada fungsi `RANK()` ketika dua baris memiliki nilai sama persis?',
				options: [
					'Nomor diberikan berurutan tanpa jeda meski nilainya sama',
					'Nilai sama mendapat nomor yang sama, lalu nomor berikutnya melompat',
					'Kedua baris dihapus dari hasil query',
					'Query langsung error dan dihentikan database'
				],
				correct_answer_index: 1,
				explanation:
					'RANK() memberi peringkat identik pada nilai kembar sehingga peringkat berikutnya melompat, misalnya 1, 1, lalu 3. Berbeda dengan ROW_NUMBER() yang selalu berurutan tanpa jeda.'
			},
			{
				id: 'data-analyst-b3-q4',
				question:
					'Query `GROUP BY` dijalankan pada tabel berisi 1.000 baris dan menghasilkan 5 kelompok kota. Berapa baris keluaran sebelum `ORDER BY` diterapkan?',
				options: ['1.000', '200', '5', '100'],
				correct_answer_index: 2,
				explanation:
					'Setiap kelompok hasil `GROUP BY` diringkas menjadi tepat satu baris, sehingga 5 kota menghasilkan 5 baris. Jumlah baris awal tidak menentukan jumlah keluaran agregasi.'
			},
			{
				id: 'data-analyst-b3-q5',
				question:
					'Pada data soal nomor 2 (Jakarta 800 dan 600, Bandung 500, Surabaya 700 dan 450), kota apa yang dicetak query berikut?',
				code: `SELECT kota,
       COUNT(*) AS jumlah_transaksi,
       AVG(omzet) AS rata_rata
FROM penjualan
GROUP BY kota
ORDER BY rata_rata DESC
LIMIT 1;`,
				code_lang: 'sql',
				code_caption: 'kota_teratas.sql',
				options: ['Jakarta', 'Bandung', 'Surabaya', 'Tidak bisa ditentukan'],
				correct_answer_index: 0,
				explanation:
					'Rata-rata Jakarta = (800+600)/2 = 700, Surabaya = (700+450)/2 = 575, dan Bandung = 500. Karena diurutkan menurun lalu diambil satu baris pertama, hasilnya Jakarta.'
			},
			{
				id: 'data-analyst-b3-q6',
				question:
					'Jika baris datanya Jan = 100, Feb = 200, dan Mar = 300, berapa nilai `kumulatif` pada baris Maret?',
				code: `SELECT nama,
       omzet,
       SUM(omzet) OVER (ORDER BY bulan) AS kumulatif
FROM penjualan;`,
				code_lang: 'sql',
				code_caption: 'akumulasi.sql',
				options: ['300', '1.000', '200', '600'],
				correct_answer_index: 3,
				explanation:
					'Akumulasi mengikuti urutan bulan: Jan 100, Feb 100+200 = 300, dan Mar 300+300 = 600. Setiap baris tetap tampil utuh, berbeda dengan `GROUP BY` yang menggabungkan baris menjadi satu.'
			},
			{
				id: 'data-analyst-b3-q7',
				question:
					'Query: `SELECT dept, AVG(gaji) FROM karyawan GROUP BY dept HAVING COUNT(*) < 3`. Apa yang ditampilkannya?',
				options: [
					'Semua departemen dengan gaji di bawah 3 juta',
					'Departemen yang berisi kurang dari 3 karyawan, beserta rata-rata gajinya',
					'Tiga departemen pertama secara alfabet',
					'Rata-rata gaji seluruh karyawan dibagi 3'
				],
				correct_answer_index: 1,
				explanation:
					'`COUNT(*)` menghitung jumlah baris per kelompok, sehingga `HAVING COUNT(*) < 3` menyisakan departemen beranggota kurang dari tiga orang. Fungsi agregasi pada `SELECT` menampilkan rata-rata gaji kelompok tersebut.'
			},
			{
				id: 'data-analyst-b3-q8',
				question:
					'Seorang rekan berkata: "WHERE dan HAVING itu sama saja, hanya beda nama." Pernyataan paling tepat adalah...',
				options: [
					'Benar, keduanya bisa dipakai bergantian di posisi klausa mana pun',
					'Benar, asalkan ukuran tabel tidak terlalu besar',
					'Keliru; WHERE menyaring baris mentah sebelum dikelompokkan, HAVING menyaring hasil agregasi',
					'Keliru; HAVING hanya bisa dipakai tanpa GROUP BY'
				],
				correct_answer_index: 2,
				explanation:
					'Keduanya bekerja pada tahap berbeda: `WHERE` pada baris mentah sebelum pengelompokan, `HAVING` pada hasil agregasi sesudahnya. `HAVING` justru membutuhkan `GROUP BY` agar punya hasil kelompok untuk disaring.'
			},
			{
				id: 'data-analyst-b3-q9',
				question: 'Apa keuntungan utama memakai CTE (`WITH ... AS`) dalam query analisis?',
				options: [
					'Query panjang terbaca bertingkat dan bisa dirujuk beberapa kali dalam satu query',
					'CTE otomatis mempercepat setiap query tanpa pengecualian',
					'CTE menghapus kebutuhan membersihkan data sama sekali',
					'CTE hanya bisa dipakai untuk membuat tabel baru'
				],
				correct_answer_index: 0,
				explanation:
					'CTE memecah query panjang menjadi langkah bernama yang mudah diikuti dan bisa dirujuk berkali-kali. Namun ia adalah kenyamanan sintaks, bukan jaminan kecepatan, dan tetap tidak menggantikan pembersihan data.'
			},
			{
				id: 'data-analyst-b3-q10',
				question: 'Untuk menampilkan 3 produk dengan omzet tertinggi di SETIAP kota, klausa yang tepat adalah...',
				options: [
					'`ORDER BY omzet DESC LIMIT 3` saja karena otomatis per kota',
					'`GROUP BY kota` tanpa fungsi peringkat sama sekali',
					'`HAVING ROW_NUMBER() < 4` sebelum data dikelompokkan',
					'`ROW_NUMBER() OVER (PARTITION BY kota ORDER BY omzet DESC) <= 3`'
				],
				correct_answer_index: 3,
				explanation:
					'`PARTITION BY kota` membuat penghitungan dimulai ulang tiap kota sehingga peringkat benar-benar per kota. `LIMIT 3` hanya membatasi seluruh hasil secara global, bukan per kelompok.'
			}
		]
	},
	{
		id: 32,
		scope_id: 'data-analyst',
		bab_number: 4,
		title: 'Visualisasi Data & Storytelling (Pemilihan Chart)',
		subtitle: 'Visualisasi & Storytelling',
		explanation:
			'Angka yang sama bisa terlihat biasa saja atau terasa mendesak, tergantung grafik yang kamu pilih. Pemilihan chart yang tepat adalah keterampilan pertama seorang analis data. Studi kasus: seorang manajer ingin memahami kinerja penjualan setahun. Tren 12 bulan sebaiknya ditampilkan dengan **garis** karena mata manusia paling mudah membaca arah pergerakan; perbandingan omzet antar cabang lebih jelas dengan **batang** yang diurutkan dari nilai terbesar; kontribusi tiga kategori produk terhadap total bisa memakai **batang bertumpuk**; sedangkan hubungan harga dan jumlah terjual membutuhkan **scatter plot**. Pie chart hanya aman saat kategorinya sedikit dan totalnya benar-benar bermakna bagi pembaca.\n\nStorytelling berarti menyusun grafik menjadi satu cerita yang utuh: mulai dari masalah bisnis, tunjukkan data yang relevan, nyatakan temuan dalam satu kalimat, lalu tutup dengan rekomendasi. Praktik yang membuat pesan cepat sampai: letakkan KPI utama di kiri atas, urutkan kategori dari yang terbesar, mulai sumbu y batang dari nol supaya perbedaan tidak dilebih-lebihkan, hindari efek tiga dimensi dan animasi yang tidak menjelaskan apa pun, serta pakai warna hanya untuk menyorot satu kelompok yang penting. Satu grafik yang jujur dan diberi judul kesimpulan lebih berguna daripada dashboard penuh warna yang membuat pembaca bertanya-tanya pesannya apa.',
		sections: [
			{
				heading: 'Judul Grafik yang Bercerita',
				body: 'Judul `Omzet turun 12 persen di Jabodetabek` jauh lebih berguna daripada `Omzet per Wilayah`. Tulis kesimpulan sebagai judul, gunakan subjudul untuk periode dan sumber data, lalu biarkan sumbu serta legenda mendukung pesan itu.'
			}
		],
		code_snippet: `import matplotlib.pyplot as plt

bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei']
omzet = [120, 150, 90, 200, 175]

plt.figure(figsize=(10, 5))
plt.plot(bulan, omzet, marker='o', color='#2563eb')
plt.title('Tren Omzet Bulanan 2024')
plt.xlabel('Bulan')
plt.ylabel('Omzet (juta)')
plt.grid(axis='y', alpha=0.3)
plt.show()`,
		code_lang: 'python',
		code_caption: 'tren_omzet.py — line chart sederhana dengan matplotlib',
		image_url: '/diagrams/data-analyst-b4.svg',
		diagram: null,
		diagram_caption:
			'Gambar 32.1: Panduan memilih chart — tren pakai line, perbandingan bar, komposisi pie/donut, distribusi histogram, beserta hal yang harus dihindari.',
		key_points: [
			'Sesuaikan jenis chart dengan pertanyaan: tren, perbandingan, komposisi, atau hubungan.',
			'Kejujuran visual berarti sumbu jelas, kategori terurut, dan tanpa dekorasi yang menyesatkan.',
			'Struktur cerita data: masalah, data, temuan, lalu rekomendasi aksi.'
		],
		quiz: [
			{
				id: 'data-analyst-b4-q1',
				question: 'Untuk menunjukkan tren penjualan 12 bulan terakhir, jenis chart yang paling tepat adalah...',
				options: ['Diagram lingkaran', 'Grafik garis', 'Histogram', 'Scatter plot'],
				correct_answer_index: 1,
				explanation:
					'Garis membuat arah naik-turun dan pola musiman langsung terlihat karena titik-titik waktu saling terhubung. Diagram lingkaran tidak punya sumbu waktu, histogram untuk sebaran, dan scatter untuk hubungan dua variabel.'
			},
			{
				id: 'data-analyst-b4-q2',
				question: 'Bentuk visual apa yang muncul dari kode berikut?',
				code: `import matplotlib.pyplot as plt

bulan = ['Jan', 'Feb', 'Mar', 'Apr']
penjualan = [120, 150, 90, 200]

plt.plot(bulan, penjualan, marker='o')
plt.title('Penjualan 2024')
plt.show()`,
				code_lang: 'python',
				code_caption: 'plot_sederhana.py',
				options: [
					'Diagram lingkaran dengan 4 bagian',
					'Histogram dengan 4 bin',
					'Garis dengan 4 titik tertinggi di April',
					'Batang horizontal terurut'
				],
				correct_answer_index: 2,
				explanation:
					'Fungsi `plt.plot()` menggambar garis yang menghubungkan empat titik data, dengan `marker=\'o\'` menandai tiap titik. Nilai tertinggi adalah April sebesar 200 sehingga puncaknya berada di titik terakhir.'
			},
			{
				id: 'data-analyst-b4-q3',
				question: 'Diagram lingkaran (pie chart) paling tepat digunakan untuk...',
				options: [
					'Menunjukkan proporsi beberapa kategori terhadap total dengan jumlah kategori sedikit',
					'Menampilkan tren data deret waktu',
					'Menggambarkan hubungan dua variabel numerik',
					'Membandingkan ratusan baris transaksi sekaligus'
				],
				correct_answer_index: 0,
				explanation:
					'Pie chart hanya dibaca baik saat seluruh irisan membentuk satu total yang bermakna dan kategorinya terbatas. Untuk tren pakai garis, untuk hubungan pakai scatter, dan untuk data besar gunakan agregasi dulu.'
			},
			{
				id: 'data-analyst-b4-q4',
				question:
					'Sebuah grafik batang memulai sumbu y dari angka 80 sehingga selisih yang hanya 5 persen tampak berbeda jauh. Penilaian paling tepat adalah...',
				options: [
					'Sumbu yang tidak dimulai dari nol selalu diperbolehkan asal diberi warna',
					'Angka pada grafik dianggap salah semua dan harus dihitung ulang',
					'Grafik seperti ini selalu lebih akurat daripada grafik yang mulai dari nol',
					'Sumbu yang dipotong melebih-lebihkan perbedaan sehingga bisa menyesatkan pembaca'
				],
				correct_answer_index: 3,
				explanation:
					'Pada grafik batang, tinggi batang berarti nilai, sehingga memotong sumbu membuat perbedaan kecil terlihat dramatis. Sumbu sebaiknya mulai dari nol; jika tidak bisa, beri anotasi jelas agar pembaca tidak tertipu.'
			},
			{
				id: 'data-analyst-b4-q5',
				question:
					'Scatter plot menunjukkan titik-titik membentuk pola naik dari kiri bawah ke kanan atas. Kesimpulan paling tepat adalah...',
				options: [
					'Ada korelasi negatif yang kuat',
					'Ada korelasi positif: saat satu variabel naik, variabel lain cenderung naik',
					'Kedua variabel tidak berhubungan sama sekali',
					'Hubungan sebab-akibat pasti terjadi antara kedua variabel'
				],
				correct_answer_index: 1,
				explanation:
					'Pola ke kanan atas adalah ciri korelasi positif, sedangkan arah sebaliknya menandai korelasi negatif. Bentuk pola hanya menunjukkan kecenderungan bersama dan tidak membuktikan sebab-akibat.'
			},
			{
				id: 'data-analyst-b4-q6',
				question:
					'Seorang desainer memakai 20 warna berbeda untuk 20 kategori pada satu grafik. Penilaian paling tepat adalah...',
				options: [
					'Warna sebanyak mungkin membuat grafik terlihat lebih profesional',
					'Setiap kategori memang wajib punya warna sendiri agar tidak tertukar',
					'Pakai warna untuk menyorot satu-dua kelompok penting, sisanya biarkan netral',
					'Ganti semuanya dengan efek tiga dimensi agar warna tidak perlu dikelola'
				],
				correct_answer_index: 2,
				explanation:
					'Warna paling efektif sebagai penanda perhatian, bukan hiasan seragam; begitu semua warna terang, tidak ada yang menonjol. Untuk banyak kategori, urutkan batang dan sorot hanya kelompok yang relevan dengan pesan.'
			},
			{
				id: 'data-analyst-b4-q7',
				question: 'Berapa jumlah batang yang ditampilkan oleh kode berikut?',
				code: `import pandas as pd

df = pd.DataFrame({'bulan': ['Jan', 'Feb', 'Mar'], 'omzet': [800, 950, 700]})
df.plot(x='bulan', y='omzet', kind='bar')`,
				code_lang: 'python',
				code_caption: 'bar_plot.py',
				options: ['3', '2', '4', '1'],
				correct_answer_index: 0,
				explanation:
					'Data berisi tiga baris dan sumbu x memakai kolom bulan, sehingga grafik batang menampilkan tiga batang dengan tinggi 800, 950, dan 700.'
			},
			{
				id: 'data-analyst-b4-q8',
				question:
					'Anggapan "grafik yang bagus adalah yang paling ramai warna dan animasi" paling tepat dibantah dengan...',
				options: [
					'Animasi terbukti meningkatkan akurasi angka pada laporan',
					'Grafik ramai selalu lebih mudah dibaca daripada grafik sederhana',
					'Warna dan animasi adalah satu-satunya penentu kualitas dashboard',
					'Yang menentukan adalah pesan yang ingin disampaikan; elemen dekoratif yang tidak menjelaskan apa pun justru mengganggu'
				],
				correct_answer_index: 3,
				explanation:
					'Nilai visualisasi terletak pada kejelasan pesan, bukan jumlah hiasan; dekorasi berlebih menambah beban kognitif pembaca. Elemen hanya layak dipertahankan jika menjelaskan data atau memandu perhatian.'
			},
			{
				id: 'data-analyst-b4-q9',
				question: 'Urutan cerita data yang paling mudah diikuti pembaca eksekutif adalah...',
				options: [
					'Angka mentah seluruh database, baru judul, lalu kesimpulan',
					'Masalah bisnis, data dan tren yang relevan, temuan utama, lalu rekomendasi aksi',
					'Rekomendasi lebih dulu tanpa data, baru penjelasan angka',
					'Daftar kolom dan tipe datanya, lalu metode pengumpulan data'
				],
				correct_answer_index: 1,
				explanation:
					'Pembaca perlu tahu dulu mengapa topik itu penting, baru melihat bukti, lalu mengetahui langkah berikutnya; urutan itu mengikuti cara kerja keputusan bisnis. Menyodorkan angka mentah justru membuat pembaca kehilangan konteks.'
			},
			{
				id: 'data-analyst-b4-q10',
				question:
					'Cara paling efektif membandingkan penjualan 8 cabang dengan nilai yang berbeda jauh adalah...',
				options: [
					'Diagram lingkaran dengan 8 irisan berwarna berbeda',
					'Grafik garis yang menghubungkan kedelapan cabang',
					'Batang horizontal yang diurutkan dari nilai terbesar',
					'Scatter plot dengan dua sumbu kategori'
				],
				correct_answer_index: 2,
				explanation:
					'Batang terurut membuat peringkat dan selisih antarcabang terbaca sekilas, apalagi label panjang muat rapi pada sumbu horizontal. Garis mengisyaratkan kontinuitas yang tidak ada pada kategori, sedangkan pie 8 irisan sulit dibandingkan.'
			}
		]
	},
	{
		id: 33,
		scope_id: 'data-analyst',
		bab_number: 5,
		title: 'Pengenalan Python untuk Data Analysis (Pandas & NumPy)',
		subtitle: 'Pandas & NumPy',
		explanation:
			'Python menjadi bahasa kerja analyst karena dua pustakanya bekerja berdampingan: **NumPy** menyediakan array numerik yang dihitung cepat dalam memori, sedangkan **Pandas** menyediakan struktur data berbentuk tabel yang familiar seperti spreadsheet. Objek utamanya adalah `DataFrame` yang dua dimensi berisi baris dan kolom, sementara `Series` mewakili satu kolom saja. Studi kasus: analis di sebuah e-commerce membaca `orders.csv` berisi 300 ribu transaksi, lalu langsung bertanya berapa jumlahnya (`shape`), apa saja tipenya (`info`), berapa nilai kosong (`isna`), dan bagaimana sebaran nilainya (`describe`). Semua pertanyaan awal itu terjawab hanya dalam beberapa baris kode.\n\nSetelah itu kerjaan harian berputar pada operasi yang berulang: memilih kolom, menyaring baris dengan kondisi, mengurutkan, menggabungkan tabel, mengelompokkan lalu meringkas, serta membuat kolom turunan dari perhitungan kolom lain. NumPy masuk ketika kamu butuh operasi vektor seperti normalisasi skor, mengisi nilai kosong dengan median, atau statistik array; Pandas masuk untuk hampir semua pekerjaan berbasis tabel. Kunci efisiensinya adalah menghindari perulangan baris demi baris dengan Python murni, karena operasi vektorisasi jauh lebih cepat dan lebih ringkas. Kuasai `read_csv`, `loc` dan `iloc`, `groupby`, `merge`, serta agregasi, dan sekitar 80 persen permintaan analisis harian di kantor sudah bisa kamu selesaikan sendiri.',
		sections: [],
		code_snippet: `import pandas as pd
import numpy as np

df = pd.read_csv('orders.csv')
print(df.shape)
print(df.dtypes)
print(df.isna().sum())

skor = np.array(df['nilai'], dtype=float)
df['skor_normal'] = (skor - skor.mean()) / skor.std()

print(df.groupby('kota')['total'].agg(['sum', 'count', 'mean']))`,
		code_lang: 'python',
		code_caption: 'analisis_orders.py — baca, cek, normalisasi, lalu kelompokkan',
		image_url: '/diagrams/data-analyst-b5.svg',
		diagram: null,
		diagram_caption:
			'Gambar 33.1: Peta fungsi inti pandas dan numpy beserta urutan kerja analisis — muat, rapikan, ringkas, tampilkan.',
		key_points: [
			'Series berupa satu kolom, DataFrame berupa tabel dua dimensi yang menjadi kerja harian analyst.',
			'NumPy dipakai untuk operasi numerik vektor, Pandas untuk seluruh pekerjaan berbasis tabel.',
			'Operasi vektorisasi menggantikan perulangan baris demi baris sehingga lebih cepat dan ringkas.'
		],
		quiz: [
			{
				id: 'data-analyst-b5-q1',
				question: 'Apa perbedaan utama `Series` dan `DataFrame` di Pandas?',
				options: [
					'Series adalah baris, sedangkan DataFrame adalah kolom',
					'Series hanya bisa berisi teks, sedangkan DataFrame hanya angka',
					'DataFrame selalu berisi tepat satu kolom',
					'Series berupa satu kolom (1 dimensi), DataFrame berupa kumpulan kolom menjadi tabel (2 dimensi)'
				],
				correct_answer_index: 3,
				explanation:
					'Struktur Pandas bertingkat: beberapa Series yang berbagi indeks membentuk sebuah DataFrame. Series bukan baris, dan keduanya bebas berisi angka maupun teks.'
			},
			{
				id: 'data-analyst-b5-q2',
				question: 'Apa keluaran dari potongan kode berikut?',
				code: `import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr.mean())
print(arr[arr > 3])`,
				code_lang: 'python',
				code_caption: 'numpy_filter.py',
				options: ['3 dan [1 2 3]', '3 dan [4 5]', '2.5 dan [4 5]', '3 dan [5]'],
				correct_answer_index: 1,
				explanation:
					'Rata-rata kelima nilai adalah 15/5 = 3. Kondisi `arr > 3` menghasilkan mask boolean sehingga hanya elemen 4 dan 5 yang lolos dan ikut tercetak.'
			},
			{
				id: 'data-analyst-b5-q3',
				question: 'Untuk `s = pd.Series([10, 20, 30, 40])`, apa isi dari `s.loc[1:3]`?',
				options: ['[10, 20, 30]', '[20, 30]', '[20, 30, 40]', '[40]'],
				correct_answer_index: 2,
				explanation:
					'`loc` memakai label indeks dan bersifat inklusif di kedua ujung, jadi label 1 sampai 3 mencakup nilai 20, 30, dan 40. Berbeda dengan `iloc` yang memakai posisi dan batas akhirnya eksklusif.'
			},
			{
				id: 'data-analyst-b5-q4',
				question: 'File CSV kamu memakai titik koma sebagai pemisah kolom. Cara membacanya yang benar adalah...',
				options: [
					"`pd.read_csv('data.csv', sep=';')`",
					"`pd.read_csv('data.csv')` tanpa parameter lain",
					"`pd.read_excel('data.csv')` karena CSV harus dibuka lewat Excel",
					"`pd.read_json('data.csv')` agar formatnya otomatis rapi"
				],
				correct_answer_index: 0,
				explanation:
					"Parameter `sep=';'` memberi tahu Pandas pemisah kolomnya, sehingga satu baris terpecah sesuai titik koma. Tanpa itu seluruh baris dianggap satu kolom tunggal, dan membuka CSV lewat Excel justru mengabaikan Pandas."
			},
			{
				id: 'data-analyst-b5-q5',
				question: 'Apa yang dikembalikan oleh `df.shape`?',
				options: [
					'Tipe data tiap kolom',
					'Jumlah nilai kosong per kolom',
					'Daftar nama kolom',
					'Tuple berisi jumlah baris dan jumlah kolom'
				],
				correct_answer_index: 3,
				explanation:
					'`shape` mengembalikan pasangan (baris, kolom) yang berguna untuk memastikan filter tidak membuang terlalu banyak data. Untuk tipe data pakai `dtypes` atau `info`, untuk nilai kosong pakai `isna()`.'
			},
			{
				id: 'data-analyst-b5-q6',
				question: 'Apa keluaran dari potongan kode berikut?',
				code: `import pandas as pd

df = pd.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})
print(df['b'].sum())
print(df.mean(numeric_only=True).max())`,
				code_lang: 'python',
				code_caption: 'agregasi_dasar.py',
				options: ['6 dan 3', '15 dan 5', '15 dan 3', '9 dan 5'],
				correct_answer_index: 1,
				explanation:
					'Total kolom b adalah 4+5+6 = 15. Rata-rata kolom a bernilai 2 dan kolom b bernilai 5, sehingga nilai terbesar dari kedua rata-rata tersebut adalah 5.'
			},
			{
				id: 'data-analyst-b5-q7',
				question: 'Berapa bentuk (shape) hasil dari `a = np.arange(6).reshape(2, 3)`?',
				options: ['(6, 1)', '(3, 2)', '(2, 3)', '(6, 2)'],
				correct_answer_index: 2,
				explanation:
					'`reshape(2, 3)` berarti 2 baris dan 3 kolom, dan 2 x 3 sama dengan 6 elemen sehingga jumlahnya tetap cocok dengan `arange(6)`. Urutan argumen selalu baris lalu kolom.'
			},
			{
				id: 'data-analyst-b5-q8',
				question: 'Anggapan "operasi NumPy lebih lambat dari list Python" adalah...',
				options: [
					'Keliru; array NumPy homogen dan operasi vektorisasi dijalankan dalam satu langkah, umumnya jauh lebih cepat',
					'Benar karena NumPy selalu membaca data dari disk',
					'Benar karena list Python menggunakan memori lebih sedikit',
					'Benar, tetapi hanya berlaku untuk data teks'
				],
				correct_answer_index: 0,
				explanation:
					'Karena semua elemen NumPy bertipe sama dan tersusun berdekatan di memori, operasi matematis dijalankan sekaligus untuk seluruh array. List justru perlu iterasi per elemen dengan tipe yang bisa berbeda-beda.'
			},
			{
				id: 'data-analyst-b5-q9',
				question: 'Apa keluaran dari potongan kode berikut?',
				code: `import pandas as pd

df = pd.DataFrame({'kota': ['A', 'B', 'A', 'C'], 'nilai': [5, 3, 7, 2]})
print(df.groupby('kota')['nilai'].sum()['A'])`,
				code_lang: 'python',
				code_caption: 'groupby_sederhana.py',
				options: ['5', '7', '10', '12'],
				correct_answer_index: 3,
				explanation:
					'Kelompok A berisi dua baris dengan nilai 5 dan 7, sehingga jumlahnya 12. Groupby bekerja dengan mengelompokkan baris terlebih dulu, baru fungsi agregasi dihitung per kelompok.'
			},
			{
				id: 'data-analyst-b5-q10',
				question: 'Perbedaan `loc` dan `iloc` adalah...',
				options: [
					'`loc` memakai posisi numerik, sedangkan `iloc` memakai label indeks',
					'`loc` memakai label indeks, sedangkan `iloc` memakai posisi numerik',
					'Keduanya selalu menghasilkan nilai yang berbeda',
					'`iloc` hanya bisa bekerja pada kolom pertama'
				],
				correct_answer_index: 1,
				explanation:
					'`loc` membaca label sehingga cocok dengan nama baris yang bermakna, sedangkan `iloc` membaca posisi berdasarkan angka. Pada indeks berurutan hasilnya sering sama, tetapi setelah diacak keduanya bisa berbeda.'
			}
		]
	},
	{
		id: 34,
		scope_id: 'data-analyst',
		bab_number: 6,
		title: 'Pengujian Hipotesis & Statistika Inferensial',
		subtitle: 'Statistika Inferensial',
		explanation:
			'Perusahaan ragu apakah pelatihan baru benar-benar menaikkan penjualan, atau selisih yang terlihat hanya kebetulan pada sampel kecil. Statistika inferensial memberi cara menguji dugaan itu secara terukur. Kamu menyusun hipotesis nol (H0) yang menyatakan tidak ada perbedaan nyata, hipotesis alternatif (H1) yang menyatakan ada perbedaan, lalu menghitung p-value: peluang memperoleh hasil setidaknya sedetail ini andai H0 benar. Bila p-value lebih kecil dari taraf signifikansi yang kamu tetapkan, biasanya 0,05, maka H0 ditolak. Studi kasusnya sederhana: dua kelompok toko dengan data penjualan bulan lalu, satu kelompok menerima pelatihan dan satu lagi tidak, lalu rata-rata keduanya dibandingkan.\n\nYang sering terlupa, keputusan statistik tidak otomatis menjadi keputusan bisnis. Beda yang signifikan secara statistik bisa saja hanya setengah persen peningkatan penjualan dan tidak sepadan dengan biaya pelatihannya. Sebaliknya, selisih besar pada sampel kecil bisa belum signifikan karena rentangnya masih lebar. Ada juga dua jenis kesalahan yang wajib kamu pahami: menolak H0 padahal H0 benar disebut kesalahan tipe I, sedangkan gagal menolak H0 padahal H0 salah disebut kesalahan tipe II, dan yang kedua bisa ditekan dengan menambah ukuran sampel. Sebelum menguji, pastikan asumsinya terpenuhi: data numerik berdistribusi wajar atau sampel cukup besar, observasi antarsampel independen, serta varians kedua kelompok tidak terlalu jauh berbeda. Selalu lampirkan besaran selisih, bukan hanya p-value.',
		sections: [
			{
				heading: 'Tipe I versus Tipe II',
				body: 'Kesalahan **tipe I** = menolak H0 yang sebenarnya benar, peluangnya persis sama dengan taraf alpha. Kesalahan **tipe II** = gagal menolak H0 yang sebenarnya salah. Menurunkan alpha menekan tipe I tetapi menaikkan tipe II, sehingga keseimbangan terbaik dicari dengan menambah ukuran sampel.'
			}
		],
		code_snippet: `from scipy import stats

kelompok_a = [78, 82, 75, 80, 77]
kelompok_b = [74, 71, 76, 69, 73]

stat, p = stats.ttest_ind(kelompok_a, kelompok_b)
print('p-value =', round(p, 4))

alpha = 0.05
keputusan = 'Tolak H0' if p < alpha else 'Gagal tolak H0'
print(keputusan)`,
		code_lang: 'python',
		code_caption: 'uji_t.py — bandingkan dua kelompok dengan independent t-test',
		image_url: '/diagrams/data-analyst-b6.svg',
		diagram: null,
		diagram_caption:
			'Gambar 34.1: Kurva normal dengan rerata populasi μ dan daerah p-value — H0 ditolak hanya bila data jatuh di ekor ekstrem.',
		key_points: [
			'Uji hipotesis menghasilkan keputusan tolak atau gagal tolak H0 pada taraf alpha tertentu.',
			'p-value adalah peluang hasil sedetail itu andai H0 benar, bukan peluang H0 benar.',
			'Signifikan secara statistik belum tentu bermakna secara bisnis; selalu cek besaran selisih.'
		],
		quiz: [
			{
				id: 'data-analyst-b6-q1',
				question: 'Apa itu p-value?',
				options: [
					'Peluang bahwa hipotesis alternatif benar secara mutlak',
					'Peluang bahwa hipotesis nol selalu benar untuk semua data',
					'Peluang memperoleh hasil setidaknya sedetail data yang diamati jika hipotesis nol benar',
					'Persentase perbedaan antara dua kelompok yang diuji'
				],
				correct_answer_index: 2,
				explanation:
					'p-value dihitung dengan asumsi H0 benar, lalu melihat seberapa ekstrem data yang diamati. Ia bukan peluang kebenaran H0 maupun H1, dan bukan ukuran besar-kecilnya perbedaan.'
			},
			{
				id: 'data-analyst-b6-q2',
				question: 'Jika p-value = 0,03 dan taraf signifikansi alpha = 0,05, kesimpulan yang tepat adalah...',
				options: [
					'Tolak H0; hasil signifikan secara statistik pada taraf 5 persen',
					'Terima H0; tidak ada perbedaan sama sekali',
					'Data terbukti 100 persen mendukung H1',
					'Ubah alpha menjadi 0,03 agar hasilnya tidak signifikan'
				],
				correct_answer_index: 0,
				explanation:
					'Karena 0,03 lebih kecil dari 0,05, H0 ditolak pada taraf 5 persen. Alpha harus ditetapkan sebelum data dilihat, bukan diubah setelah hasilnya tidak diinginkan.'
			},
			{
				id: 'data-analyst-b6-q3',
				question: 'Kesalahan tipe I terjadi ketika...',
				options: [
					'Gagal menolak H0 padahal H0 sebenarnya salah',
					'Menolak H0 padahal H0 sebenarnya benar',
					'Data sampel terlalu banyak sehingga uji menjadi tidak valid',
					'H1 diterima tanpa menghitung p-value sama sekali'
				],
				correct_answer_index: 1,
				explanation:
					'Tipe I berarti kamu menolak hipotesis nol yang sebenarnya benar, dan peluangnya sama dengan taraf alpha yang dipilih. Tipe II kebalikannya: gagal menolak H0 yang sebenarnya salah.'
			},
			{
				id: 'data-analyst-b6-q4',
				question:
					'Uji menunjukkan beda penjualan antar kelompok signifikan (p = 0,01), namun selisihnya hanya 0,2 persen dari target. Kesimpulan bisnis paling tepat adalah...',
				options: [
					'Karena signifikan, langsung gandakan investasi tanpa perhitungan lain',
					'Angka p-value selalu lebih penting daripada selisih penjualan',
					'Statistika pasti salah karena selisihnya kecil',
					'Bedanya signifikan secara statistik, tetapi manfaat bisnisnya perlu dinilai dari besaran selisih dan biayanya'
				],
				correct_answer_index: 3,
				explanation:
					'Signifikansi menjawab apakah beda itu mungkin kebetulan, bukan apakah beda itu cukup besar untuk ditindaklanjuti. Keputusan investasi tetap membutuhkan perbandingan manfaat dengan biaya.'
			},
			{
				id: 'data-analyst-b6-q5',
				question: 'Sebuah confidence interval 95 persen berisi rentang [48, 52]. Artinya...',
				options: [
					'Ada peluang 95 persen bahwa parameter bergerak di luar rentang tersebut',
					'95 persen data individual berada antara 48 dan 52',
					'Jika pengulangan sampel dilakukan berkali-kali, sekitar 95 persen interval yang terbentuk berisi nilai parameter populasi',
					'Data pasti salah karena rentangnya terlalu sempit'
				],
				correct_answer_index: 2,
				explanation:
					'Dalam pengulangan sampel yang sama, metode interval 95 persen akan berhasil menangkap parameter pada kira-kira 95 dari 100 percobaan. Parameter itu sendiri tetap, bukan yang bergerak, dan interval bukan rentang nilai tiap individu.'
			},
			{
				id: 'data-analyst-b6-q6',
				question:
					'Kode berikut dijalankan dan tercetak `p-value = 0.0094`. Dengan alpha = 0,05, keputusan yang tepat adalah...',
				code: `from scipy import stats

kelompok_a = [78, 82, 75, 80, 77]
kelompok_b = [74, 71, 76, 69, 73]

stat, p = stats.ttest_ind(kelompok_a, kelompok_b)
print('p-value =', round(p, 4))`,
				code_lang: 'python',
				code_caption: 'hasil_uji.py',
				options: [
					'Tolak H0: kedua kelompok berbeda signifikan',
					'Gagal tolak H0: perbedaan hanya kebetulan',
					'Uji tidak valid karena jumlah sampel kurang dari 30',
					'Kedua kelompok pasti identik'
				],
				correct_answer_index: 0,
				explanation:
					'0,0094 lebih kecil dari alpha 0,05 sehingga H0 ditolak dan bedanya signifikan. Jumlah sampel kecil bukan alasan otomatis membatalkan uji, asalkan asumsi uji terpenuhi.'
			},
			{
				id: 'data-analyst-b6-q7',
				question: 'Cara paling ampuh menurunkan kesalahan tipe II (gagal menolak H0 yang salah) adalah...',
				options: [
					'Memakai alpha sekecil mungkin agar kesalahan tipe I ikut nol',
					'Meningkatkan ukuran sampel agar uji memiliki daya deteksi lebih tinggi',
					'Menghapus sebanyak mungkin outlier sebelum diuji',
					'Mengganti grafik dengan warna yang lebih mencolok'
				],
				correct_answer_index: 1,
				explanation:
					'Sampel lebih besar menurunkan simpangan baku rata-rata sehingga beda nyata lebih mudah terdeteksi. Memperkecil alpha justru menaikkan risiko tipe II, dan menghapus outlier sembarangan bisa membuang sinyal yang sebenarnya ada.'
			},
			{
				id: 'data-analyst-b6-q8',
				question: 'Anggapan "uji hipotesis membuktikan hipotesis benar" adalah...',
				options: [
					'Benar, karena p-value di bawah 0,05 berarti H1 terbukti',
					'Benar, asalkan ukuran sampelnya besar',
					'Benar untuk data populasi dan salah untuk data sampel',
					'Keliru; uji hanya menghasilkan keputusan menolak atau gagal menolak H0 pada taraf tertentu, bukan kebenaran mutlak'
				],
				correct_answer_index: 3,
				explanation:
					'Statistik inferensial bekerja dengan menghitung kemungkinan di bawah asumsi H0, sehingga kesimpulannya selalu bersifat probabilistik. Semua temuan tetap terbuka ditinjau ulang dengan data atau desain baru.'
			},
			{
				id: 'data-analyst-b6-q9',
				question: 'Apa keluaran dari potongan kode berikut?',
				code: `import pandas as pd

df = pd.DataFrame({'kelompok': ['A', 'A', 'B', 'B'], 'skor': [80, 77, 75, 73]})
rata = df.groupby('kelompok')['skor'].mean()
print(rata['B'] - rata['A'])`,
				code_lang: 'python',
				code_caption: 'selisih_rata.py',
				options: ['4.5', '-4.5', '0', '-9'],
				correct_answer_index: 1,
				explanation:
					'Rata-rata A = (80+77)/2 = 78,5 dan rata-rata B = (75+73)/2 = 74, sehingga B dikurangi A sama dengan -4,5. Tanda minus menunjukkan rata-rata kelompok B lebih rendah.'
			},
			{
				id: 'data-analyst-b6-q10',
				question: 'Asumsi yang umumnya dibutuhkan uji-t adalah...',
				options: [
					'Populasi berdistribusi normal atau sampel cukup besar dengan data numerik',
					'Seluruh data berupa kategori nominal',
					'Tidak ada asumsi apa pun untuk semua jenis uji',
					'Ukuran sampel harus tepat 30 orang'
				],
				correct_answer_index: 0,
				explanation:
					'Uji-t membutuhkan data numerik yang sebarannya masuk akal; pada sampel besar, klaim ini longgar berkat teorem limit pusat. Uji nonparametrik adalah alternatif bila asumsi tersebut jelas-jelas terlanggar.'
			}
		]
	},
	{
		id: 35,
		scope_id: 'data-analyst',
		bab_number: 7,
		title: 'Pembuatan Executive Dashboard & Pelaporan Business Intelligence',
		subtitle: 'Dashboard & Pelaporan',
		explanation:
			'Dashboard eksekutif bukan tempat menampilkan semua data yang kamu punya, melainkan alat untuk menjawab pertanyaan dalam sepuluh detik: apakah penjualan sudah sesuai target, wilayah atau produk mana yang tertinggal, dan risiko apa yang perlu ditindaklanjuti minggu ini. Studi kasusnya: direktur sebuah retail chain hanya punya satu layar sebelum rapat pagi dimulai. Dashboard yang baik menempatkan tiga sampai lima KPI utama di baris pertama lengkap dengan angka pembanding, tren pendapatan 12 bulan di bagian tengah, lalu kontribusi region dan produk di bagian bawah. Semuanya harus terbaca tanpa pembaca perlu bertanya kepada pembuatnya.\n\nProses pembuatannya dimulai dari menyusun definisi metrik bersama tim bisnis, mengambil data lewat query yang bisa dijalankan ulang, memvalidasi angkanya terhadap laporan manual yang selama ini dipercaya, dan baru menyusun visual. Prinsip yang dipakai: satu layar satu pesan, urutan baca mengikuti pola F dari kiri atas ke kanan bawah, warna hanya untuk status seperti hijau sesuai target dan merah tertinggal, serta judul grafik berupa kesimpulan bukan sekadar nama kolom. Laporan pendampingnya ditulis singkat: ringkasan angka, tiga temuan utama, satu rekomendasi aksi, dan catatan metode beserta sumber data supaya setiap angka bisa diaudit ulang oleh siapa pun di tim.',
		sections: [
			{
				heading: 'Anatomi Satu Layar',
				body: 'Baris pertama: KPI utama dengan pembanding target dan periode lalu. Baris kedua: tren utama 12 bulan. Baris ketiga: kontribusi per wilayah atau produk, ditutup dengan catatan sumber data dan waktu refresh di sudut bawah.'
			}
		],
		code_snippet: `SELECT DATE_FORMAT(tanggal, '%Y-%m') AS bulan,
       SUM(total) AS pendapatan,
       COUNT(DISTINCT customer_id) AS pelanggan,
       AVG(total) AS rata_rata
FROM orders
WHERE tanggal >= '2024-01-01'
GROUP BY 1
HAVING SUM(total) > 0
ORDER BY 1;`,
		code_lang: 'sql',
		code_caption: 'kpi_bulanan.sql — query dasar KPI bulanan untuk dashboard',
		image_url: '/diagrams/data-analyst-b7.svg',
		diagram: null,
		diagram_caption:
			'Gambar 35.1: Kerangka executive dashboard — kartu KPI dengan delta, tren pendapatan, panel filter, dan tabel ringkasan per wilayah.',
		key_points: [
			'Dashboard eksekutif menjawab pertanyaan bisnis dalam hitungan detik, bukan menampilkan seluruh kolom.',
			'Setiap angka penting selalu dibandingkan dengan target atau periode sebelumnya.',
			'Laporan yang baik ditutup dengan temuan dan satu rekomendasi aksi yang jelas.'
		],
		quiz: [
			{
				id: 'data-analyst-b7-q1',
				question: 'Apa kebutuhan utama pembaca eksekutif saat membuka dashboard?',
				options: [
					'Melihat KPI utama, arah tren, dan anomali dalam hitungan detik',
					'Melihat seluruh kolom mentah dari tabel transaksi',
					'Membaca definisi teknis setiap metrik sebelum angka',
					'Menonton animasi transisi antar halaman'
				],
				correct_answer_index: 0,
				explanation:
					'Waktu baca eksekutif sangat singkat, sehingga layar harus langsung menjawab status, arah, dan pengecualian. Detail mentah tetap tersedia sebagai drill-down, bukan sebagai isi halaman utama.'
			},
			{
				id: 'data-analyst-b7-q2',
				question: 'Apa arti `GROUP BY 1` pada query berikut?',
				code: `SELECT DATE_FORMAT(tanggal, '%Y-%m') AS bulan,
       SUM(total) AS pendapatan,
       COUNT(DISTINCT customer_id) AS pelanggan
FROM orders
WHERE tanggal >= '2024-01-01'
GROUP BY 1
ORDER BY 1;`,
				code_lang: 'sql',
				code_caption: 'kpi_query.sql',
				options: [
					'Mengambil hanya satu baris pertama dari hasil',
					'Mengelompokkan berdasarkan kolom pertama tabel orders',
					'Mengelompokkan berdasarkan kolom pertama pada daftar SELECT, yaitu bulan',
					'Membatasi query agar menghasilkan satu kelompok saja'
				],
				correct_answer_index: 2,
				explanation:
					'Angka pada `GROUP BY` adalah posisi kolom di daftar `SELECT`, bukan nama kolom tabel, sehingga 1 merujuk pada `bulan`. Fungsi agregasi lalu dihitung per bulan, dan `ORDER BY 1` mengurutkannya kembali berdasarkan bulan.'
			},
			{
				id: 'data-analyst-b7-q3',
				question:
					'Dashboard menunjukkan jumlah pesanan naik 10 persen tetapi pendapatan turun 8 persen bulan ini. Hipotesis paling masuk akal untuk diperiksa berikutnya adalah...',
				options: [
					'Sistem pembayaran sedang error sehingga semua angka tidak valid',
					'Pesanan bulan lalu tercatat dua kali sehingga pembandingnya salah',
					'Jumlah pelanggan berkurang drastis sehingga semua metrik ikut turun',
					'Rata-rata nilai per pesanan turun, misalnya karena diskon atau pergeseran ke produk yang lebih murah'
				],
				correct_answer_index: 3,
				explanation:
					'Pendapatan adalah hasil kali jumlah pesanan dengan nilai rata-ratanya, jadi pesanan naik sementara pendapatan turun menunjukkan rata-rata nilai pesanan menurun. Kenaikan jumlah pesanan juga mustahil terjadi bila pelanggan drastis berkurang.'
			},
			{
				id: 'data-analyst-b7-q4',
				question: 'Mengapa KPI utama diletakkan di kiri atas layar dashboard?',
				options: [
					'Karena warna paling kontras selalu berada di sudut tersebut',
					'Karena pembaca memindai layar mengikuti pola F dan berhenti paling awal pada area kiri atas',
					'Karena kolom pertama selalu berisi angka terbesar',
					'Karena aturan baku semua aplikasi BI mewajibkannya'
				],
				correct_answer_index: 1,
				explanation:
					'Penelitian pembacaan layar menunjukkan pola berbentuk F: mata bergerak ke kanan lalu turun, sehingga sudut kiri atas menjadi titik perhatian pertama. Penempatan ini soal perilaku membaca, bukan aturan warna atau tipe kolom.'
			},
			{
				id: 'data-analyst-b7-q5',
				question: 'Perbedaan mendasar dashboard eksekutif dan dashboard operasional adalah...',
				options: [
					'Eksekutif butuh ringkasan KPI dan tren jangka panjang, operasional butuh detail real-time per transaksi',
					'Eksekutif butuh data mentah, operasional hanya butuh grafik',
					'Keduanya selalu memakai jenis chart yang sama persis',
					'Dashboard operasional tidak membutuhkan angka sama sekali'
				],
				correct_answer_index: 0,
				explanation:
					'Kebutuhan keduanya berbeda pada level detail dan kecepatan update: eksekutif memutuskan arah, operator menjalankan proses harian. Karena itu periode, granularitas, dan kedalaman drill-down keduanya juga berbeda.'
			},
			{
				id: 'data-analyst-b7-q6',
				question: 'Berapa nilai `peringkat` untuk produk dengan jumlah terjual terbesar?',
				code: `SELECT produk,
       SUM(qty) AS terjual,
       RANK() OVER (ORDER BY SUM(qty) DESC) AS peringkat
FROM penjualan
GROUP BY produk;`,
				code_lang: 'sql',
				code_caption: 'peringkat_produk.sql',
				options: [
					'Sama dengan jumlah total qty',
					'Tergantung jumlah produk yang dijual',
					'1',
					'0'
				],
				correct_answer_index: 2,
				explanation:
					'Karena diurutkan menurun, produk terlaris menempati urutan pertama sehingga `RANK()` bernilai 1, lalu berikutnya 2, 3, dan seterusnya. Peringkat dihitung tanpa menghapus detail tiap produk seperti yang dilakukan `GROUP BY` biasa.'
			},
			{
				id: 'data-analyst-b7-q7',
				question:
					'Anggapan "dashboard eksekutif yang bagus adalah yang menampilkan semua kolom database" adalah...',
				options: [
					'Benar, karena eksekutif perlu mengawasi setiap detail operasional',
					'Benar, asalkan kolomnya disusun secara alfabetis',
					'Benar, karena ruang layar saat ini sudah sangat luas',
					'Keliru; eksekutif butuh 5-7 KPI inti dan pesan yang jelas, bukan banjir angka'
				],
				correct_answer_index: 3,
				explanation:
					'Terlalu banyak angka membuat pesan penting tenggelam dan memaksa pembaca mencari sendiri maknanya. Kurasi metrik justru membuat anomali serta peluang lebih cepat terlihat.'
			},
			{
				id: 'data-analyst-b7-q8',
				question:
					'Minggu lalu 10.000 pengunjung menghasilkan 200 pembelian (2 persen). Minggu ini 12.000 pengunjung menghasilkan 360 pembelian (3 persen). Pernyataan yang benar adalah...',
				options: [
					'Conversion rate naik 80 persen dan jumlah pembelian naik 1 persen',
					'Jumlah pembelian naik dari 200 ke 360, setara kenaikan 80 persen',
					'Conversion rate naik 80 persen menjadi 3 persen',
					'Kedua metrik turun karena pengunjung bertambah'
				],
				correct_answer_index: 1,
				explanation:
					'Kenaikan absolut 200 ke 360 sama dengan 160 dibagi 200 dikali 100, yaitu 80 persen. Conversion rate sendiri hanya naik 1 poin persentase, yaitu dari 2 ke 3 persen, bukan 80 persen.'
			},
			{
				id: 'data-analyst-b7-q9',
				question: 'Berapa kolom metrik yang dicetak untuk setiap bulan oleh kode berikut?',
				code: `import pandas as pd

df = pd.read_csv('orders.csv')
df['bulan'] = df['tanggal'].str[:7]
kpi = df.groupby('bulan')['total'].agg(['sum', 'count'])
print(kpi)`,
				code_lang: 'python',
				code_caption: 'kpi_pandas.py',
				options: ['2', '1', '3', '4'],
				correct_answer_index: 0,
				explanation:
					'Agregasi `agg` dengan daftar `sum` dan `count` menghasilkan dua kolom metrik per kelompok bulan, yaitu total pendapatan dan jumlah transaksi, ditambah indeks bulan di paling kiri.'
			},
			{
				id: 'data-analyst-b7-q10',
				question: 'Elemen yang wajib ada pada laporan mingguan agar bisa ditindaklanjuti adalah...',
				options: [
					'Daftar seluruh query SQL yang dipakai menarik data',
					'Jumlah baris setiap tabel sumber beserta ukuran filenya',
					'Angka pembanding terhadap target atau periode sebelumnya beserta satu rekomendasi aksi',
					'Semua visualisasi yang pernah dibuat tim selama satu bulan'
				],
				correct_answer_index: 2,
				explanation:
					'Tanpa pembanding, angka mentah tidak memberi tahu apakah situasinya baik atau buruk, dan tanpa rekomendasi pembaca tidak tahu harus berbuat apa. Detail query dan seluruh riwayat visualisasi lebih cocok disimpan di lampiran teknis.'
			}
		]
	}
];
