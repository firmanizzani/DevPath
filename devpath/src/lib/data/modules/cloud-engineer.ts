import type { BabModule } from '$lib/data/types';

export const modules: BabModule[] = [
	{
		id: 36,
		scope_id: 'cloud-engineer',
		bab_number: 1,
		title: 'Konsep Cloud Computing & Model Layanan (IaaS, PaaS, SaaS)',
		subtitle: 'Model Layanan Cloud',
		explanation:
			'Dulu, kalau ingin menjalankan sebuah aplikasi, sebuah tim harus membeli server fisik, menyewa rak di data center, dan mengurus pendingin serta listriknya jauh sebelum baris kode pertama ditulis. **Cloud computing** mengubah belanja aset itu menjadi langganan: daya komputasi, penyimpanan, dan jaringan disediakan lewat internet, kamu mengambil sesuai kebutuhan dan membayar sesuai pemakaian. Sifat inilah yang membuat cloud disebut *on-demand* dan *elastis* — kapasitas bisa ditambah dalam hitungan menit saat kampanye besar dan dikurangi lagi saat sepi. Yang sering dilupakan, cloud selalu menerapkan *shared responsibility*: penyedia layanan mengamankan data center, jaringan fisik, dan hypervisor-nya, sementara konfigurasi layanan, data, serta akses akunmu tetap sepenuhnya tanggung jawabmu.\n\nModel layanan cloud paling mudah diingat lewat analogi tempat tinggal. **IaaS** seperti menyewa rumah kosong — kamu dapat server virtual, jaringan, dan storage mentah; sistem operasi, middleware, sampai aplikasi urusanmu sendiri. **PaaS** seperti apartemen *full furnished* — runtime, database, dan penanganan scaling sudah disediakan, kamu tinggal membawa kode. **SaaS** seperti hotel — aplikasi jadi yang tinggal dipakai lewat browser, contohnya email korporat atau CRM berlangganan.\n\nStudi kasus: sebuah startup marketplace ingin rilis dalam tiga minggu tanpa tim infrastruktur. Opsi IaaS berarti mereka kehilangan waktu berminggu-minggu untuk patch OS dan menyiapkan database, padahal yang dibutuhkan adalah kecepatan rilis, sehingga PaaS menjadi pilihan paling masuk akal. Sebaliknya, tim keuangan yang wajib menjalankan aplikasi lama dengan aturan data residensi ketat biasanya tetap memilih IaaS atau skema *hybrid*. Kuncinya sederhana: makin banyak yang ingin kamu kendalikan, makin ke bawah model yang kamu pilih, dan makin besar pula beban operasional yang harus kamu pikul sendiri.',
		sections: [
			{
				heading: 'IaaS, PaaS, SaaS dalam Satu Kalimat',
				body: '**IaaS**: kamu urus dari OS ke atas. **PaaS**: kamu urus dari kode ke atas. **SaaS**: kamu tinggal pakai. Makin ke atas modelnya, makin sedikit yang kamu urus dan makin cepat bisa mulai kerja.'
			}
		],
		code_snippet: `# IaaS — buat VM sendiri, OS dan patch sepenuhnya urusanmu
$ aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro

# PaaS — deploy aplikasi tanpa menyentuh server
$ aws elasticbeanstalk create-application --application-name toko-api
$ aws elasticbeanstalk create-environment --application-name toko-api --environment-name prod

# Pantau pemakaian sebagai bahan prediksi biaya
$ aws ce get-cost-and-usage --time-period Start=2026-01-01,End=2026-01-31 --granularity MONTHLY`,
		code_lang: 'bash',
		code_caption: 'cloud.sh — langkah khas IaaS dan PaaS sekaligus cek pemakaian biaya',
		image_url: '/diagrams/cloud-engineer-b1.svg',
		diagram: null,
		diagram_caption:
			'Gambar 36.1: Perbandingan IaaS, PaaS, dan SaaS dari sisi yang dikelola, contoh layanan, analogi, hingga tim yang paling cocok.',
		key_points: [
			'Cloud menyediakan daya komputer lewat internet dengan pola bayar sesuai pemakaian dan skala yang elastis.',
			'IaaS memberi kendali dari OS ke atas, PaaS dari kode ke atas, SaaS tinggal dipakai.',
			'Cloud menerapkan shared responsibility: infrastruktur diurus penyedia, data dan akses tetap urusanmu.'
		],
		quiz: [
			{
				id: 'cloud-engineer-b1-q1',
				question:
					'Perusahaan memakai aplikasi CRM lewat browser, sementara vendor yang mengurus server, update, dan keamanannya. Model layanan yang dipakai adalah...',
				options: ['IaaS', 'SaaS', 'PaaS', 'FaaS'],
				correct_answer_index: 1,
				explanation:
					'SaaS adalah aplikasi jadi yang tinggal dipakai dan seluruh urusan server ada di tangan vendor, serta CRM berlangganan adalah contohnya. IaaS tetap menuntut kamu mengurus OS dan aplikasi sendiri, PaaS hanya menyediakan platform untuk menjalankan kode buatanmu, sedangkan FaaS tetap berurusan dengan kode yang kamu kirimkan sendiri.'
			},
			{
				id: 'cloud-engineer-b1-q2',
				question:
					'Studi kasus: startup ingin merilis aplikasi dalam tiga minggu, timnya berisi dua developer dan tidak ada orang infrastruktur. Model yang paling tepat adalah...',
				options: [
					'PaaS — runtime dan database sudah disediakan, tim tinggal deploy kode',
					'IaaS — semua diurus sendiri dari OS ke atas',
					'SaaS — pakai aplikasi jadi untuk semua kebutuhan',
					'On-premise — beli server dulu biar penuh kendali'
				],
				correct_answer_index: 0,
				explanation:
					'Kebutuhan utamanya adalah kecepatan rilis tanpa beban operasional infrastruktur, dan di situlah peran PaaS. IaaS dan on-premise tetap menuntut pengurusan OS serta database, sedangkan SaaS menyediakan aplikasi pakai jadi, bukan tempat menjalankan produk buatanmu.'
			},
			{
				id: 'cloud-engineer-b1-q3',
				question: 'Dari dua perintah berikut, mana yang mewakili pendekatan IaaS?',
				code: `$ aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro
$ aws elasticbeanstalk create-application --application-name toko-api`,
				code_lang: 'bash',
				code_caption: 'perintah awal IaaS vs PaaS',
				options: [
					'create-application — platform yang mengurus runtime, OS, dan scaling untukmu',
					'Keduanya termasuk SaaS karena sama-sama layanan berbayar',
					'run-instances — kamu membuat VM lalu mengurus OS dan patch-nya sendiri',
					'Tidak ada, keduanya hanya berjalan di komputer lokal'
				],
				correct_answer_index: 2,
				explanation:
					'Perintah `run-instances` hanya membuat mesin virtual; sistem operasi, patch, sampai web server tetap tanggung jawabmu, itulah ciri IaaS. Sebaliknya `create-application` menyerahkan urusan platform ke penyedia sehingga lebih mengarah ke PaaS, dan keduanya jelas bukan SaaS.'
			},
			{
				id: 'cloud-engineer-b1-q4',
				question: 'Pernyataan berikut mengenai keamanan di cloud, mana yang benar?',
				options: [
					'Benar sepenuhnya, penyedia menjamin data pengguna 100% aman',
					'Benar untuk data, tetapi salah untuk jaringan',
					'Benar untuk jaringan, tetapi salah untuk data',
					'Salah — penyedia mengamankan infrastruktur, kamu tetap mengamankan data, konfigurasi, dan akses'
				],
				correct_answer_index: 3,
				explanation:
					'Itulah prinsip *shared responsibility*: penyedia menjaga data center, jaringan fisik, dan hypervisor, sedangkan penandaan akses publik, enkripsi data, dan manajemen izin tetap di tanganmu. Kecelakaan di cloud hampir selalu berasal dari bagian tanggung jawab pengguna, bukan dari sisi penyedia.'
			},
			{
				id: 'cloud-engineer-b1-q5',
				question: 'Dibandingkan IaaS, layanan PaaS membebaskan tim dari pengurusan...',
				options: [
					'server fisik di data center penyedia',
					'runtime, patch OS, dan penanganan scaling — tim hanya membawa kode',
					'aplikasi jadi yang tinggal dipakai lewat browser',
					'sistem operasi dan mesin virtual saja'
				],
				correct_answer_index: 1,
				explanation:
					'PaaS menyerahkan seluruh lapisan di bawah kode kepada penyedia, termasuk runtime, patch, dan penskalaan, sehingga tim hanya fokus pada aplikasi. Server fisik tetap urusan penyedia bahkan di IaaS, sedangkan SaaS bukan tempat kamu menjalankan kode sendiri.'
			},
			{
				id: 'cloud-engineer-b1-q6',
				question: 'Apa arti angka yang muncul pada output perintah berikut?',
				code: `$ aws ce get-cost-and-usage --time-period Start=2026-02-01,End=2026-02-28 --granularity MONTHLY
{ "UnblendedCost": { "Amount": "12.40", "Unit": "USD" } }`,
				code_lang: 'bash',
				code_caption: 'cek total biaya bulanan',
				options: [
					'Total biaya layanan cloud selama Februari 2026 yang bisa kamu pantau tiap bulan',
					'Biaya yang harus dibayar per detik kepada penyedia',
					'Tagihan listrik data center milik perusahaan',
					'Biaya koneksi internet kantor selama sebulan'
				],
				correct_answer_index: 0,
				explanation:
					'Perintah `get-cost-and-usage` menghitung konsumsi biaya pada rentang tanggal yang diberikan, sehingga angka USD 12.40 adalah tagihan periode bulan itu. Ini bukan tarif per detik, bukan biaya fisik data center, dan tidak ada hubungannya dengan koneksi internet kantor.'
			},
			{
				id: 'cloud-engineer-b1-q7',
				question: 'Sifat elastis pada cloud berarti...',
				options: [
					'resource hanya bisa ditambah, tidak pernah dikurangi',
					'server selalu menyala 24 jam tanpa biaya tambahan',
					'resource dapat ditambah dan dikurangi sesuai kebutuhan, dan penagihan mengikuti pemakaian',
					'biaya selalu tetap berapa pun tingkat pemakaiannya'
				],
				correct_answer_index: 2,
				explanation:
					'Elastis berarti kapasitas mengikuti permintaan, naik saat trafik ramai dan turun saat sepi, sehingga penagihan pun mengikuti. Anggapan resource hanya boleh bertambah, biaya selalu nol, dan tagihan selalu tetap adalah salah paham yang membuat banyak tim akhirnya membayar kapasitas menganggur.'
			},
			{
				id: 'cloud-engineer-b1-q8',
				question:
					'Studi kasus: lembaga keuangan wajib menjalankan aplikasi warisan dengan kontrol penuh atas sistem operasi dan penempatan data. Pilihan paling masuk akal adalah...',
				options: [
					'SaaS — tinggal pakai aplikasi perbankan online',
					'IaaS — kendali penuh atas OS, jaringan, dan penempatan data sambil tetap menyewa infrastruktur penyedia',
					'PaaS — biar penyedia yang mengurus semuanya',
					'FaaS — jalankan seluruh beban kerja lewat fungsi serverless'
				],
				correct_answer_index: 1,
				explanation:
					'Ketika kendali atas OS dan lokasi data adalah tuntutan kepatuhan, IaaS memberi fleksibilitas itu tanpa harus membangun data center sendiri. PaaS dan SaaS justru menyerahkan sebagian besar kendali ke penyedia, sedangkan FaaS tidak cocok untuk aplikasi warisan yang butuh lingkungan OS khusus.'
			},
			{
				id: 'cloud-engineer-b1-q9',
				question:
					'Berdasarkan konfigurasi layanan berikut, model layanan yang paling sesuai adalah...',
				code: `{
  "layanan": "platform-hosting",
  "yang_dikelola_penyedia": ["runtime", "os-patch", "auto-scaling", "load-balancer"],
  "yang_dikelola_pengguna": ["kode-aplikasi", "konfigurasi-env"]
}`,
				code_lang: 'json',
				code_caption: 'ringkasan pembagian tanggung jawab sebuah layanan',
				options: ['PaaS', 'IaaS', 'SaaS', 'On-premise'],
				correct_answer_index: 0,
				explanation:
					'Penyedia mengurus runtime sampai scaling sedangkan kamu hanya membawa kode dan konfigurasi, dan itu ciri khas PaaS. Kalau yang diurus pengguna meliputi OS serta middleware, itu berarti IaaS; kalau semuanya serba jadi dan tinggal dipakai, itu SaaS.'
			},
			{
				id: 'cloud-engineer-b1-q10',
				question: 'Miskonsepsi paling umum mengenai biaya cloud adalah...',
				options: [
					'Seluruh biaya cloud selalu lebih murah daripada on-premise',
					'Biaya cloud pasti nol karena tidak ada server fisik',
					'Migrasi ke cloud selalu menurunkan biaya dalam sekejap',
					'Cloud tidak otomatis lebih murah — resource yang dibiarkan menyala tanpa dipakai justru bisa membengkak'
				],
				correct_answer_index: 3,
				explanation:
					'Cloud menurunkan biaya hanya bila kamu mengelola pemakaian: VM lupa dimatikan, snapshot menumpuk, dan log tanpa masa simpan adalah penyebab tagihan naik. Anggapan bahwa biaya pasti turun atau bahkan nol mengabaikan fakta bahwa penagihan mengikuti pemakaian, baik yang perlu maupun yang tidak.'
			}
		]
	},
	{
		id: 37,
		scope_id: 'cloud-engineer',
		bab_number: 2,
		title: 'Virtualization & Containerization (VM vs Docker)',
		subtitle: 'VM vs Container',
		explanation:
			'Satu server fisik yang besar dulu dibagi menjadi beberapa **virtual machine**: tiap VM menjalankan sistem operasi sendiri di atas lapisan bernama *hypervisor*. Hasilnya kuat dan terisolasi, tapi berat — satu VM bisa menghabiskan ratusan MB hanya untuk OS sebelum aplikasi dijalankan, dan proses boot-nya memakan menit. **Container** membalik pendekatannya: yang dikemas cuma aplikasi beserta pustaka yang dibutuhkannya, sementara *kernel* host dipakai bersama. Kalau VM ibarat keluarga dengan rumah dan dapur sendiri, container seperti gerobak di food court — banyak lapak, satu dapur bersama, dan kamu tinggal memilih lapak mana yang paling pas untuk beban kerjamu.\n\nDampak praktisnya langsung terasa. Container menyala dalam hitungan detik tanpa proses boot OS, jadi cocok untuk beban yang naik-turun. Yang lebih penting, seluruh dependensi dibawa di dalam **image**, sehingga lingkungan developer dan produksi benar-benar identik — lagu lama "di komputer saya jalan" akhirnya tamat. Alurnya selalu berulang: tulis *Dockerfile*, build menjadi image, jalankan container, simpan image ke registry, lalu tarik di server produksi. Ingat juga sifatnya: container mudah dibuat dan dimusnahkan, sehingga jangan pernah menyimpan data penting di dalamnya.\n\nStudi kasus: sebuah tim menerapkan batas sumber daya pada tiap container, misalnya 512 MB memori dan setengah inti CPU. Saat satu proses masuk ke dalam loop tak terduga, hanya container itu yang dihentikan sistem dan diganti otomatis, sedangkan layanan lain tetap melayani pengguna. Di situlah keunggulan dibanding VM: karena ringan, proses penggantian terjadi hampir tanpa terasa — dan ketika jumlahnya sudah ratusan, tugas mengatur hal semacam itu diserahkan ke orkestrator seperti Kubernetes.',
		code_snippet: `# 1. Susun image dari Dockerfile di folder saat ini
$ docker build -t toko-api:1.2 .

# 2. Jalankan container dan petakan port host ke container
$ docker run -d --name api --restart unless-stopped -p 8080:8080 toko-api:1.2

# 3. Pantau pemakaian sumber daya tiap container
$ docker stats --no-stream

# 4. Bersihkan image lama supaya disk tidak penuh
$ docker image prune -a --filter "until=168h"

# 5. Distribusikan image ke registry
$ docker push registry.toko.dev/toko-api:1.2`,
		code_lang: 'bash',
		code_caption: 'docker.sh — build, jalankan, pantau, bersihkan, dan distribusikan image',
		image_url: '/diagrams/cloud-engineer-b2.svg',
		diagram: null,
		diagram_caption:
			'Gambar 37.1: Perbandingan tumpukan virtual machine (OS tamu di atas hypervisor) dengan kontainer (runtime di atas kernel bersama).',
		key_points: [
			'Container berbagi kernel host dan hanya membungkus aplikasi beserta dependensinya, sehingga ringan dan cepat.',
			'Image bersifat immutable: perubahan dilakukan dengan build image baru, bukan mengedit container yang sedang jalan.',
			'Simpan data penting di luar container karena filesystem-nya ikut hilang saat container diganti.'
		],
		quiz: [
			{
				id: 'cloud-engineer-b2-q1',
				question: 'Perbedaan paling mendasar antara virtual machine dan container adalah...',
				options: [
					'Container berbagi kernel OS dengan host, sedangkan VM menjalankan OS sendiri lewat hypervisor',
					'Container selalu lebih aman karena punya sistem operasi sendiri',
					'VM tidak butuh image, container tidak butuh Dockerfile',
					'VM hanya bisa menjalankan Linux, container bisa menjalankan Windows'
				],
				correct_answer_index: 0,
				explanation:
					'Seluruh perbedaan lain berangkat dari hal ini: VM memvirtualkan mesin lengkap termasuk OS-nya, container hanya mengemas aplikasi di atas kernel host. Justru karena punya OS sendiri VM yang lebih berat, dan keduanya sama-sama butuh image serta tetap aman bila dikonfigurasi dengan baik.'
			},
			{
				id: 'cloud-engineer-b2-q2',
				question: 'Berdasarkan output berikut, versi aplikasi apa yang sedang berjalan?',
				code: `$ docker ps
CONTAINER ID   IMAGE          STATUS
a1b2c3d4e5f6   toko-api:1.1   Up 3 hours

$ docker images
REPOSITORY   TAG    SIZE
toko-api     1.0    120MB
toko-api     1.1    121MB`,
				code_lang: 'bash',
				code_caption: 'docker ps & docker images',
				options: ['toko-api:1.0', 'toko-api:1.1', 'toko-api:latest', 'Tidak ada container yang berjalan'],
				correct_answer_index: 1,
				explanation:
					'Kolom IMAGE pada `docker ps` menunjukkan container yang sedang berjalan memakai `toko-api:1.1`. Meski ada juga tag 1.0 di registry lokal, yang benar-benar berjalan adalah yang dinyatakan saat perintah dijalankan, bukan image paling lama maupun tag `latest`.'
			},
			{
				id: 'cloud-engineer-b2-q3',
				question: 'Cara yang benar untuk memperbarui aplikasi yang sudah berjalan dalam container adalah...',
				options: [
					'Edit file langsung di dalam container yang sedang jalan',
					'SSH ke host lalu ganti binary aplikasi secara manual',
					'Ubah kode, build image baru dengan tag baru, lalu jalankan container dari image baru',
					'Tidak perlu build ulang karena container otomatis menarik kode terbaru'
				],
				correct_answer_index: 2,
				explanation:
					'Container dan image bersifat immutable, jadi perubahan selalu lewat build baru dan diganti dengan menjalankan container baru dari image tersebut. Mengedit isi container akan hilang saat container diganti, dan container tidak punya mekanisme menarik kode terbaru secara otomatis.'
			},
			{
				id: 'cloud-engineer-b2-q4',
				question:
					'Studi kasus: aplikasi lancar di laptop developer, tapi crash di produksi karena versi library berbeda. Solusi paling tepat adalah...',
				options: [
					'Memperbesar RAM server produksi',
					'Mematikan test otomatis supaya error berhenti muncul',
					'Menyalin folder proyek developer ke produksi lewat FTP',
					'Membundel dependensi ke dalam image, lalu deploy image yang sama di semua lingkungan'
				],
				correct_answer_index: 3,
				explanation:
					'Inti container adalah membawa dependensi di dalam image sehingga isinya identik di mana pun dijalankan. Memperbesar RAM tidak menyelesaikan beda versi, menyalin folder mentah justru kembali rapuh, dan mematikan test hanya menyembunyikan masalah.'
			},
			{
				id: 'cloud-engineer-b2-q5',
				question: 'Sifat immutable pada image berarti...',
				options: [
					'Setiap perubahan dilakukan lewat build image baru; image lama tetap tidak berubah',
					'Image otomatis diperbarui setiap 24 jam oleh daemon',
					'Image selalu berukuran di bawah 100 MB',
					'Image hanya bisa dijalankan satu kali lalu dihapus'
				],
				correct_answer_index: 0,
				explanation:
					'Image hanya bisa ditimpa dengan membuat image baru dari tahap build, sehingga versi lama tetap utuh dan bisa dipakai sebagai jalan mundur. Image tidak mengupdate dirinya sendiri, ukurannya tergantung isinya, dan boleh dijalankan berkali-kali.'
			},
			{
				id: 'cloud-engineer-b2-q6',
				question: 'Apa arti kolom PORTS pada output berikut?',
				code: `$ docker run -d --name api -p 8080:8080 toko-api:1.1
$ docker ps
IMAGE         PORTS
toko-api:1.1  0.0.0.0:8080->8080/tcp`,
				code_lang: 'bash',
				code_caption: 'docker run dengan pemetaan port',
				options: [
					'Volume container dipetakan ke folder host',
					'Port 8080 di host diteruskan ke port 8080 di container sehingga bisa diakses dari luar',
					'Batas memori container adalah 8080 MB',
					'Container hanya menerima trafik dari alamat IP 0.0.0.0'
				],
				correct_answer_index: 1,
				explanation:
					'Format `-p host:container` membuka port container agar bisa diakses dari jaringan luar; tanpa itu aplikasi di dalam container tersembunyi sepenuhnya. Pemetaan volume memakai flag `-v`, bukan `-p`, dan angka 8080 tidak ada hubungannya dengan memori maupun alamat IP asal.'
			},
			{
				id: 'cloud-engineer-b2-q7',
				question: 'Alasan container bisa menampung jauh lebih banyak instance daripada VM pada resource yang sama adalah...',
				options: [
					'Isolasi antar aplikasi jadi lebih kuat secara otomatis',
					'Container tidak perlu membuat image sama sekali',
					'Container tidak membawa OS sendiri sehingga sisa resource untuk aplikasi lebih banyak',
					'Boot container selalu memakan waktu beberapa menit'
				],
				correct_answer_index: 2,
				explanation:
					'Karena hanya membungkus aplikasi dan pustakanya, container tidak menghabiskan ratusan MB untuk OS tampan seperti VM. Isolasi justru jadi perhatian tersendiri yang harus dijaga, image tetap wajib dibuat, dan boot container terkenal justru sangat cepat.'
			},
			{
				id: 'cloud-engineer-b2-q8',
				question:
					'Studi kasus: container sudah berjalan dan port sudah disebut saat `docker run`, tapi aplikasi tetap tidak bisa dibuka dari luar. Penyebab paling mungkin adalah...',
				options: [
					'Image terlalu besar sehingga gagal diakses dari luar',
					'Lupa memetakan port sehingga port container tidak pernah dibuka ke host',
					'Registry sedang mengalami gangguan',
					'Container harus diubah menjadi virtual machine terlebih dahulu'
				],
				correct_answer_index: 1,
				explanation:
					'Tanpa flag `-p`, semua port di dalam container tertutup rapat dari host sehingga tidak ada jalur masuk ke aplikasi. Ukuran image, kondisi registry, dan jenis runtime tidak memengaruhi keterjangkauan port.'
			},
			{
				id: 'cloud-engineer-b2-q9',
				question: 'Bagaimana pandangan yang tepat mengenai keamanan container?',
				options: [
					'Benar, container sudah sepenuhnya terisolasi dari host',
					'Benar, asalkan memakai image resmi dari vendor',
					'Salah, karena container selalu dijalankan sebagai root',
					'Karena berbagi kernel, container tetap butuh hardening seperti menjalankan proses sebagai non-root'
				],
				correct_answer_index: 3,
				explanation:
					'Berbagi kernel berarti ada permukaan serangan yang dipakai bersama, sehingga hardening tetap diperlukan meski isolasi proses cukup baik. Isolasi tidak berarti kebal, dan sumber image tidak menentukan praktik keamanan di dalam container.'
			},
			{
				id: 'cloud-engineer-b2-q10',
				question: 'Apa yang terjadi setelah perintah terakhir pada potongan berikut?',
				code: `$ docker build -t toko-api:1.2 .
Successfully built 9f3e2a1b7c4d
Successfully tagged toko-api:1.2`,
				code_lang: 'bash',
				code_caption: 'hasil akhir docker build',
				options: [
					'Container baru langsung berjalan di port 8080',
					'Image toko-api:1.2 dihapus dari registry',
					'Image baru dengan tag 1.2 berhasil dibuat dari Dockerfile di folder saat ini',
					'File Dockerfile otomatis diunggah ke internet'
				],
				correct_answer_index: 2,
				explanation:
					'Pesan `Successfully tagged` menandakan build selesai dan image bertanda `toko-api:1.2` kini tersedia di mesin lokal. Build tidak otomatis menjalankan container, tidak menghapus image, dan tidak mengirim apa pun ke registry sampai kamu menjalankan perintah push.'
			}
		]
	},
	{
		id: 38,
		scope_id: 'cloud-engineer',
		bab_number: 3,
		title: 'Orchestration Container dengan Kubernetes (K8s) Dasar',
		subtitle: 'Pod, Deployment & Service',
		explanation:
			'Ketika container sudah berjumlah belasan, urusan manual seperti menjalankan perintah satu per satu di banyak server mulai tidak terkontrol: ada yang lupa versi, ada yang mati tanpa diganti, dan tidak ada yang tahu container mana yang seharusnya berjalan. **Kubernetes** hadir sebagai otak pengaturnya. Kamu mendeskripsikan keadaan yang diinginkan, lalu K8s terus membandingkannya dengan kenyataan dan memperbaikinya. Unit terkecil di K8s adalah **Pod**, yaitu satu atau beberapa container yang selalu dijalankan bersama di satu node. Karena Pod mudah dibuat dan dimusnahkan, kamu hampir tidak pernah membuat Pod langsung; yang kamu buat adalah **Deployment**, objek yang menjamin selalu ada Pod sesuai jumlah replika yang diminta.\n\nKalau satu Pod crash, Deployment otomatis membuat penggantinya. Kalau kamu menaikkan replika dari 2 menjadi 4, K8s menyebarkannya ke node yang punya sisa kapasitas. Agar Pod bisa diakses, dibutuhkan **Service**, yaitu alamat stabil yang tidak berubah walau IP Pod terus berganti — biasanya ClusterIP untuk komunikasi internal dan LoadBalancer atau Ingress untuk akses dari luar. Semua ini dideklarasikan dalam manifest YAML atau JSON yang disimpan bersama kode, sehingga cluster bisa dibangun ulang dari nol kapan pun dibutuhkan.\n\nStudi kasus: tim e-commerce mengalami lonjakan trafik saat harbolnas. Dengan autoscaler yang menaikkan replika otomatis berdasarkan pemakaian CPU, Pod bertambah dari 3 menjadi 12 dalam satu menit dan kembali turun setelah trafik mereda. Tanpa orkestrator, skenario itu berarti tengah malam dihabiskan untuk masuk ke banyak server secara manual.',
		sections: [
			{
				heading: 'Objek Wajib untuk Pemula',
				body: '**Deployment** menjaga jumlah dan kesehatan Pod. **Service** memberi nama DNS stabil di balik IP Pod yang berubah. **Ingress** mengatur rute masuk dari luar. Pelajari tiga ini dulu sebelum masuk ke objek yang lebih lanjut seperti StatefulSet atau DaemonSet.'
			}
		],
		code_snippet: `{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": { "name": "toko-api" },
  "spec": {
    "replicas": 3,
    "selector": { "matchLabels": { "app": "toko-api" } },
    "template": {
      "metadata": { "labels": { "app": "toko-api" } },
      "spec": {
        "containers": [{ "name": "api", "image": "registry.toko.dev/toko-api:1.2", "ports": [{ "containerPort": 8080 }] }]
      }
    }
  }
}`,
		code_lang: 'json',
		code_caption: 'deployment.json — deklarasi 3 replika aplikasi toko-api',
		image_url: '/diagrams/cloud-engineer-b3.svg',
		diagram: null,
		diagram_caption:
			'Gambar 38.1: Hierarki Kubernetes — Deployment menjaga ReplicaSet, ReplicaSet membuat Pod, lalu Ingress mengarahkan trafik lewat Service.',
		key_points: [
			'Kubernetes bekerja deklaratif: kamu menyatakan keadaan ideal, lalu controller terus menyesuaikan kenyataan.',
			'Deployment menjaga jumlah replika dan mengganti Pod yang mati; Service memberi alamat akses yang stabil.',
			'Simpan definisi dalam manifest bersama kode sehingga cluster bisa dibangun ulang dari nol.'
		],
		quiz: [
			{
				id: 'cloud-engineer-b3-q1',
				question: 'Unit terkecil dalam Kubernetes yang bisa dijadwalkan ke sebuah node adalah...',
				options: ['Pod', 'Container tunggal', 'Node', 'Service'],
				correct_answer_index: 0,
				explanation:
					'Pod adalah pembungkus terkecil yang berisi satu atau lebih container dan selalu dijalankan bersama dalam satu node. Container saja bukan objek yang dijadwalkan, Node adalah mesin pelaksananya, sedangkan Service adalah lapisan akses di atas Pod.'
			},
			{
				id: 'cloud-engineer-b3-q2',
				question: 'Fungsi utama sebuah Deployment adalah...',
				options: [
					'Memetakan nama domain ke IP publik',
					'Menjaga jumlah replika Pod sesuai deklarasi dan mengganti Pod yang mati',
					'Menyimpan rahasia aplikasi dalam bentuk terenkripsi',
					'Mengompres image agar lebih kecil'
				],
				correct_answer_index: 1,
				explanation:
					'Deployment memantau apakah jumlah Pod sehat sesuai angka `replicas`, lalu membuat pengganti bila ada yang gagal. Pemetaan domain urusan Ingress, rahasia disimpan lewat Secret, dan kompresi image terjadi pada proses build.'
			},
			{
				id: 'cloud-engineer-b3-q3',
				question: 'Setelah manifest berikut diterapkan, berapa jumlah Pod yang dihasilkan?',
				code: `{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": { "name": "toko-api" },
  "spec": {
    "replicas": 3,
    "selector": { "matchLabels": { "app": "toko-api" } },
    "template": {
      "metadata": { "labels": { "app": "toko-api" } },
      "spec": {
        "containers": [{ "name": "api", "image": "registry.toko.dev/toko-api:1.2" }]
      }
    }
  }
}`,
				code_lang: 'json',
				code_caption: 'deployment.json — potongan manifest Kubernetes',
				options: ['1 Pod', '4 Pod', '3 Pod', '0 Pod, karena manifest belum dijalankan'],
				correct_answer_index: 2,
				explanation:
					'Nilai `replicas: 3` menyatakan tiga Pod diinginkan sekaligus, dan container di dalam template diterapkan ke tiap Pod tersebut. Angka 1 dan 4 tidak muncul di mana pun dalam manifest, dan pertanyaan menyatakan manifest sudah diterapkan sehingga jawaban 0 tidak relevan.'
			},
			{
				id: 'cloud-engineer-b3-q4',
				question:
					'Studi kasus: satu node dalam cluster tiba-tiba mati. Apa yang terjadi pada Pod yang berjalan di node tersebut?',
				options: [
					'Pod hilang permanen beserta data di dalamnya',
					'Seluruh cluster berhenti beroperasi',
					'Deployment otomatis ikut terhapus',
					'Kubernetes menjadwalkan ulang Pod penggantinya di node lain selama masih ada kapasitas'
				],
				correct_answer_index: 3,
				explanation:
					'Controller melihat jumlah Pod sehat berkurang lalu membuat penggantinya di node yang sehat, itulah inti kemampuan *self-healing*. Data di dalam Pod tetap hilang karena itu, sehingga data persisten harus disimpan di luar, bukan di Pod.'
			},
			{
				id: 'cloud-engineer-b3-q5',
				question:
					'Aplikasi perlu tetap bisa diakses meski IP Pod terus berganti karena sering diganti. Solusi yang tepat adalah...',
				options: [
					'Service dengan nama DNS stabil yang menunjuk ke Pod di baliknya',
					'Menulis IP Pod terbaru ke file /etc/hosts di setiap container',
					'Mematikan dan menyalakan Pod setiap kali IP berubah',
					'Mencatat IP Pod pada spreadsheet tim'
				],
				correct_answer_index: 0,
				explanation:
					'Service menyediakan titik akses tetap dan memilih Pod sehat secara otomatis di belakangnya, sehingga klien tidak perlu peduli IP mana yang sedang hidup. Pendekatan manual lewat berkas hosts atau catatan tidak scalable dan tetap harus diperbarui tiap kali Pod berganti.'
			},
			{
				id: 'cloud-engineer-b3-q6',
				question: 'Apa arti status `CrashLoopBackOff` pada pod kedua di bawah ini?',
				code: `$ kubectl get pods
NAME                       READY   STATUS             RESTARTS
toko-api-7d9f8b4c5-2xzq1   1/1     Running            0
toko-api-7d9f8b4c5-m8ktp   0/1     CrashLoopBackOff   4`,
				code_lang: 'bash',
				code_caption: 'kubectl get pods',
				options: [
					'Pod sedang menunggu giliran untuk mendapat alamat IP',
					'Container gagal terus-menerus sehingga kubelet mengulanginya dengan jeda yang makin panjang',
					'Image belum berhasil ditarik dari registry',
					'Pod sengaja dijeda oleh administrator'
				],
				correct_answer_index: 1,
				explanation:
					'CrashLoopBackOff berarti aplikasi di dalam container berhenti segera setelah menyala, lalu diulang berkali-kali dengan jeda menambah. Untuk mencari akar masalahnya, periksa log pod tersebut dan pastikan perintah di dalam container benar-benar bisa berjalan.'
			},
			{
				id: 'cloud-engineer-b3-q7',
				question: 'Keunggulan pendekatan deklaratif Kubernetes dibanding perintah imperatif adalah...',
				options: [
					'Kamu harus menulis langkah demi langkah setiap kali melakukan deploy',
					'Semua konfigurasi hanya bisa dilakukan lewat antarmuka web',
					'Kamu menyatakan keadaan akhir yang diinginkan, lalu Kubernetes menyesuaikan kenyataan ke arah sana',
					'Kubernetes tidak memerlukan file konfigurasi apa pun'
				],
				correct_answer_index: 2,
				explanation:
					'Deklaratif berarti kamu menuliskan hasil akhir yang diharapkan, dan controller yang bekerja menuju hasil itu berulang kali. Perintah langkah demi langkah justru sifatnya imperatif, sementara konfigurasi tetap dibutuhkan dalam bentuk manifest.'
			},
			{
				id: 'cloud-engineer-b3-q8',
				question:
					'Tim ingin Pod bertambah otomatis saat rata-rata pemakaian CPU melewati 70%. Objek Kubernetes yang tepat adalah...',
				options: [
					'Horizontal Pod Autoscaler',
					'Ingress',
					'ConfigMap',
					'PersistentVolume'
				],
				correct_answer_index: 0,
				explanation:
					'Horizontal Pod Autoscaler menambah dan mengurangi jumlah replika berdasarkan metrik seperti CPU atau penggunaan aplikasi. Ingress mengatur rute masuk, ConfigMap menyimpan konfigurasi non-rahasia, sedangkan PersistentVolume menyangkut penyimpanan.'
			},
			{
				id: 'cloud-engineer-b3-q9',
				question: 'Miskonsepsi mengenai hubungan Kubernetes dan Docker adalah...',
				options: [
					'Benar, Docker sudah tidak dipakai lagi di klaster modern',
					'Benar, asalkan memakai Kubernetes versi terbaru',
					'Salah, Kubernetes hanya mengelola virtual machine',
					'Kubernetes mengorkestrasi container; runtime container seperti containerd tetap berjalan di bawahnya'
				],
				correct_answer_index: 3,
				explanation:
					'Kubernetes tidak menggantikan runtime container, melainkan duduk di atasnya untuk menjadwalkan, memantau, dan mengganti container. Klausa runtime memang bisa berpindah dari Docker ke containerd, tetapi konsep container tetap menjadi bahan dasarnya.'
			},
			{
				id: 'cloud-engineer-b3-q10',
				question: 'Apa kesimpulan dari output perintah berikut?',
				code: `$ kubectl rollout status deployment/toko-api
Waiting for rollout: 1 of 3 updated replicas are available...
deployment "toko-api" successfully rolled out`,
				code_lang: 'bash',
				code_caption: 'kubectl rollout status',
				options: [
					'Deployment gagal dan perlu dilakukan rollback',
					'Hanya satu replika yang berhasil diperbarui',
					'Deploy versi baru berjalan dan seluruh replika sudah terganti dengan sukses',
					'Semua Pod dihapus tanpa ada pengganti'
				],
				correct_answer_index: 2,
				explanation:
					'Baris terakhir berbunyi `successfully rolled out`, yang berarti seluruh replika versi baru sudah tersedia dan proses rollout selesai. Pesan tunggu sebelumnya hanyalah tahap berjalan, bukan tanda kegagalan.'
			}
		]
	},
	{
		id: 39,
		scope_id: 'cloud-engineer',
		bab_number: 4,
		title: 'Cloud Storage & Managed Database Architecture',
		subtitle: 'Object Storage & Database Terkelola',
		explanation:
			'Bayangkan data aplikasimu seperti barang di gudang: ada yang laku cepat, ada yang hanya arsip. Di cloud, **object storage** seperti S3 adalah gudang datar raksasa — setiap file diunggah sebagai objek lengkap dengan URL dan metadata, biayanya paling murah, otomatis tahan terhadap kegagalan satu *availability zone*, dan cocok untuk foto, video, log, serta backup. **Block storage** bekerja seperti hard disk virtual yang menempel pada satu VM dan menawarkan kecepatan baca-tulis tinggi, sedangkan **file storage** seperti folder bersama lewat protokol NFS. Untuk data terstruktur yang butuh relasi dan transaksi, tersedia **database terkelola** seperti RDS atau Cloud SQL: vendor mengurus backup, patch, replika, dan pemantauan, kamu fokus pada skema dan query.\n\nArsitektur modern menerapkan prinsip *stateless*: komputasi dan penyimpanan dipisah supaya keduanya diskalakan sendiri-sendiri. Container boleh dimatikan dan diganti kapan saja selama datanya hidup di luar — unggahan pengguna langsung dikirim ke object storage lalu disajikan lewat CDN. Kesalahan paling klasik adalah menaruh file unggahan di dalam container karena semuanya lenyap saat deploy berikutnya. Untuk database, arsitektur yang lazim adalah satu *primary instance* untuk menulis dan *read replica* untuk laporan berat, ditambah mode *Multi-AZ* agar gangguan satu zona tidak berarti downtime.\n\nStudi kasus: platform kursus menyimpan 2 TB video baru setiap bulan. Dengan aturan lifecycle di object storage, file yang berumur 30 hari otomatis pindah ke tier paling murah sehingga biaya turun tanpa mengubah satu baris kode pun. Sementara itu, query laporan yang dulu memakan 40 detik di primer kini berjalan di replika baca dan tidak lagi memengaruhi transaksi pengguna.',
		code_snippet: `import boto3

s3 = boto3.client("s3")
s3.upload_file("laporan.pdf", "toko-bucket", "laporan/laporan-2026.pdf")

rds = boto3.client("rds")
for db in rds.describe_db_instances()["DBInstances"]:
    ident = db["DBInstanceIdentifier"]
    print(ident, db["DBInstanceStatus"], db["MultiAZ"])`,
		code_lang: 'python',
		code_caption: 'storage_check.py — unggah objek dan audit instance database terkelola',
		image_url: '/diagrams/cloud-engineer-b4.svg',
		diagram: null,
		diagram_caption:
			'Gambar 39.1: Arsitektur layanan terkelola — objek storage untuk file, database terkelola untuk data, cache untuk kecepatan, plus backup dan replika.',
		key_points: [
			'Object storage untuk file mentah, block storage untuk disk VM, database terkelola untuk data relasional bertransaksi.',
			'Pisahkan komputasi dan penyimpanan agar aplikasi tetap stateless dan bisa diskalakan bebas.',
			'Untuk beban baca berat, arahkan laporan ke read replica agar transaksi di primer tetap ringan.'
		],
		quiz: [
			{
				id: 'cloud-engineer-b4-q1',
				question:
					'Arsip log mentah sebesar 500 GB per hari yang jarang dibaca tapi wajib disimpan setahun paling tepat disimpan di...',
				options: [
					'Object storage dengan aturan lifecycle yang memindahkan file lama ke tier paling murah',
					'Memori RAM server aplikasi agar selalu cepat diakses',
					'Tabel database relasional dengan kolom teks besar',
					'Disk blok yang menempel pada satu VM tertentu'
				],
				correct_answer_index: 0,
				explanation:
					'Object storage murah, tahan gagal, dan mendukung lifecycle yang otomatis memindahkan objek lama ke tier murah. RAM jelas hilang saat proses berhenti, database relasional mahal dan lambat untuk biner sebesar itu, sedangkan disk blok bergantung pada satu VM saja.'
			},
			{
				id: 'cloud-engineer-b4-q2',
				question: 'Keunggulan utama database terkelola (*managed database*) untuk tim kecil adalah...',
				options: [
					'Query dijamin selalu lebih cepat daripada buatan sendiri',
					'Backup, patch, replika, dan pemantauan diurus penyedia, sehingga tim fokus ke skema dan query',
					'Kamu tidak perlu menulis SQL sama sekali',
					'Biaya layanan selalu nol karena tidak ada server fisik'
				],
				correct_answer_index: 1,
				explanation:
					'Nilai utamanya adalah menggeser pekerjaan operasional berulang seperti backup dan patch ke penyedia. Kecepatan query tetap bergantung skema dan beban kerja, biaya layanan tetap ada, dan kamu tetap harus menulis SQL.'
			},
			{
				id: 'cloud-engineer-b4-q3',
				question: 'Apa yang dicetak bagian loop pada skrip berikut?',
				code: `import boto3

s3 = boto3.client("s3")
s3.upload_file("laporan.pdf", "toko-bucket", "laporan/laporan-2026.pdf")

rds = boto3.client("rds")
for db in rds.describe_db_instances()["DBInstances"]:
    print(db["DBInstanceIdentifier"], db["DBInstanceStatus"])`,
				code_lang: 'python',
				code_caption: 'audit_db.py — loop audit instance database',
				options: [
					'Isi bucket object storage beserta ukurannya',
					'URL publik file laporan yang baru diunggah',
					'Identifier dan status setiap instance database terkelola',
					'Jadwal backup otomatis database'
				],
				correct_answer_index: 2,
				explanation:
					'Fungsi `describe_db_instances` mengembalikan daftar instance, lalu loop mencetak nama pengenal dan statusnya satu per satu. Bucket tidak dikelola oleh perintah RDS, URL objek dihasilkan oleh API bucket terpisah, dan jadwal backup tidak muncul pada panggilan tersebut.'
			},
			{
				id: 'cloud-engineer-b4-q4',
				question:
					'Setiap kali container di-deploy ulang, file unggahan di `/app/uploads` selalu hilang. Tindakan paling tepat adalah...',
				options: [
					'Tambahkan kolom BLOB pada tabel database',
					'Pasang RAID di dalam setiap container',
					'Perbanyak replika container agar file ikut tersimpan',
					'Pindahkan penyimpanan ke object storage atau volume eksternal, lalu buat aplikasi stateless'
				],
				correct_answer_index: 3,
				explanation:
					'Filesystem container memang hilang bersama container lama saat diganti, jadi data persisten harus disimpan di luar. Menumpuk BLOB di database memperberat backup, RAID tidak menyelesaikan sifat sementara container, dan menambah replika hanya menggandakan masalah.'
			},
			{
				id: 'cloud-engineer-b4-q5',
				question:
					'Untuk data transaksional dengan relasi antar tabel dan kebutuhan konsistensi baca-tulis, pilihan paling tepat adalah...',
				options: [
					'Database relasional terkelola dengan replika dan mode Multi-AZ',
					'Object storage dengan aturan lifecycle',
					'Cache in-memory saja sebagai satu-satunya penyimpanan',
					'CDN yang menyimpan seluruh transaksi'
				],
				correct_answer_index: 0,
				explanation:
					'Kebutuhan relasi dan transaksi adalah wilayah database relasional, sedangkan pengelolaan dan ketersediaan diserahkan ke penyedia. Object storage tidak punya konsep transaksi, cache mudah kehilangan data bila dimatikan, dan CDN disebut hanya untuk menyalin konten statis ke dekat pengguna.'
			},
			{
				id: 'cloud-engineer-b4-q6',
				question: 'Apa yang terjadi setelah perintah terakhir pada potongan berikut?',
				code: `$ aws s3 ls s3://toko-bucket/backup/
2026-02-01 03:00   18203440 orders-2026-02-01.sql.gz
2026-02-02 03:00   18310022 orders-2026-02-02.sql.gz

$ aws s3 cp s3://toko-bucket/backup/orders-2026-02-02.sql.gz .`,
				code_lang: 'bash',
				code_caption: 'aws s3 ls & cp',
				options: [
					'File backup dihapus dari bucket',
					'Salinan file backup diunduh ke direktori kerja yang sedang aktif',
					'File diunggah dari lokal ke bucket',
					'Jadwal backup berikutnya dibatalkan'
				],
				correct_answer_index: 1,
				explanation:
					'Perintah `aws s3 cp` dengan sumber bucket dan tujuan titik berarti menyalin objek dari cloud ke folder kerja, jadi arahnya unduhan. Objek di bucket tidak ikut terhapus, tujuan titik membuatnya bukan unggahan, dan penjadwalan backup tidak disentuh perintah ini.'
			},
			{
				id: 'cloud-engineer-b4-q7',
				question: 'Memisahkan komputasi dari penyimpanan membuat...',
				options: [
					'biaya penyimpanan otomatis ikut naik setiap kali CPU ditambah',
					'data wajib disimpan di dalam container agar tidak hilang',
					'container bisa diskalakan bebas tanpa perlu memindahkan atau menyalin datanya',
					'backup menjadi mustahil dilakukan'
				],
				correct_answer_index: 2,
				explanation:
					'Karena penyimpanan berdiri sendiri, kamu boleh menambah atau mengurangi container kapan saja tanpa menyentuh datanya. Justru sebaliknya, menyimpan data di dalam container membuat backup sulit dan penskalaan berbahaya.'
			},
			{
				id: 'cloud-engineer-b4-q8',
				question: 'Benarkah kalau gambar sudah dipasang di CDN, file aslinya hilang dari object storage?',
				options: [
					'Benar, CDN memindahkan file asli keluar dari bucket',
					'Benar, file asli dihapus otomatis agar hemat penyimpanan',
					'Salah, tetapi file tetap harus disalin manual ke setiap server',
					'Salah, CDN hanya menyalin cache di lokasi dekat pengguna dan file asli tetap di object storage'
				],
				correct_answer_index: 3,
				explanation:
					'CDN hanyalah salinan cache yang didekatkan ke pengguna; sumber tetap berada di object storage dan bisa diminta ulang bila cache kedaluwarsa. Karena itu penghapusan asli tidak terjadi, dan penyalinan manual ke banyak server justru yang ingin dihindari oleh CDN.'
			},
			{
				id: 'cloud-engineer-b4-q9',
				question:
					'Laporan bulanan membutuhkan query atas ratusan juta baris tanpa memengaruhi transaksi pengguna. Berikut query yang dijalankan. Tujuannya adalah...',
				code: `SELECT r.region_name, SUM(o.total) AS omzet
FROM orders o
JOIN regions r ON r.id = o.region_id
GROUP BY r.region_name
ORDER BY omzet DESC;`,
				code_lang: 'sql',
				code_caption: 'laporan.sql — agregasi yang dijalankan pada replika baca',
				options: [
					'Menghapus seluruh order yang sudah lama',
					'Membuat index baru pada tabel orders',
					'Menampilkan total omzet per region untuk laporan tanpa membebani transaksi primer',
					'Memindahkan data order ke object storage'
				],
				correct_answer_index: 2,
				explanation:
					'Klausa `SUM` bersama `GROUP BY` menghitung agregat per wilayah, yang cocok untuk laporan, dan dijalankan di replika agar primer tetap fokus melayani tulis. Query ini tidak menghapus, tidak membuat index, dan tidak memindahkan apa pun.'
			},
			{
				id: 'cloud-engineer-b4-q10',
				question: 'Miskonsepsi umum mengenai backup adalah...',
				options: [
					'Benar, makin sering backup otomatis makin aman',
					'Benar, asalkan backup disimpan di server yang sama dengan data aslinya',
					'Salah, backup cukup dilakukan sekali seumur hidup',
					'Yang menentukan adalah RPO dan RTO serta hasil uji pemulihan — backup yang tidak pernah diuji bisa tetap gagal'
				],
				correct_answer_index: 3,
				explanation:
					'Kemanjuran backup baru terbukti ketika file itu benar-benar bisa dipulihkan dalam batas waktu yang ditetapkan RPO dan RTO. Frekuensi saja tidak menjamin, dan menyimpan salinan di server yang sama justru ikut hilang bersama saat server rusak.'
			}
		]
	},
	{
		id: 40,
		scope_id: 'cloud-engineer',
		bab_number: 5,
		title: 'Cloud Networking & Keamanan (VPC, Subnet, IAM)',
		subtitle: 'VPC, Subnet & IAM',
		explanation:
			'Masuk ke cloud bukan berarti aplikasimu langsung terbuka untuk siapa saja. Di sana kamu menggambar **VPC**, yaitu jaringan pribadi virtual lengkap dengan subnet, route table, dan gerbangnya. Praktik yang umum adalah membagi VPC menjadi **subnet publik** yang punya jalur ke internet — tempat load balancer dan NAT gateway — serta **subnet privat** tempat server aplikasi dan database tinggal tanpa IP publik. Di level instance, **security group** berperan seperti firewall *stateful* yang hanya membuka port yang memang dibutuhkan, sedangkan di level subnet ada *network access control list* yang bersifat *stateless* dan menyaring trafik secara lebih kasar.\n\nLapisan kedua adalah identitas. **IAM** mengatur siapa, manusia maupun *service account* aplikasi, boleh melakukan apa, dengan prinsip *least privilege*: hak serendah mungkin selama pekerjaan tetap bisa selesai. Studi kasus yang paling sering terjadi bukan berasal dari serangan canggih, melainkan dari kelalaian — kunci akses tidak sengaja ter-commit ke repository publik, database terbuka ke seluruh internet, atau satu akun root dipakai bersama oleh seluruh tim. Karena itu biasakan simpan rahasia di *secret manager*, pisahkan akun tiap layanan, dan aktifkan audit log.\n\nSatu VPC yang disusun rapi membuat setiap jalur trafik bisa ditelusuri dan setiap izin bisa dipertanggungjawabkan. Ingat bahwa jaringan menutup pintu serangan, sedangkan IAM memastikan hanya pihak yang berhak yang memegang kunci — keduanya saling melengkapi, bukan pengganti satu sama lain.',
		sections: [
			{
				heading: 'Subnet Publik vs Privat',
				body: '**Publik**: punya jalur ke internet, dipakai untuk antarmuka yang memang harus terbuka seperti load balancer dan NAT gateway. **Privat**: tanpa IP publik, hanya bisa diakses dari dalam VPC — tempat wajib untuk server aplikasi dan database produksi.'
			}
		],
		code_snippet: `{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::toko-bucket/report/*"
    },
    {
      "Effect": "Deny",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::toko-bucket/*",
      "Condition": { "Bool": { "aws:SecureTransport": "false" } }
    }
  ]
}`,
		code_lang: 'json',
		code_caption: 'iam-policy.json — izin baca laporan dan penolakan koneksi tanpa TLS',
		image_url: '/diagrams/cloud-engineer-b5.svg',
		diagram: 'subnet',
		diagram_caption:
			'Gambar 40.1: Tata letak VPC dengan subnet publik untuk load balancer dan NAT gateway, serta subnet privat untuk aplikasi dan database yang tidak memiliki IP publik.',
		key_points: [
			'VPC memisahkan subnet publik dan privat; database produksi jangan pernah diberi IP publik.',
			'Terapkan least privilege di IAM: izin sesedikit mungkin, akun terpisah per layanan, rahasia di luar kode.',
			'Security group bersifat stateful untuk instance, network ACL stateless untuk subnet — keduanya melengkapi.'
		],
		quiz: [
			{
				id: 'cloud-engineer-b5-q1',
				question: 'Fungsi utama VPC dalam cloud adalah...',
				options: [
					'Memberi jaringan pribadi virtual tempat kamu mengatur subnet, route table, dan firewall',
					'Mengompres file agar kapasitas penyimpanan bertambah',
					'Menjalankan container aplikasi secara otomatis',
					'Menghitung tagihan bulanan layanan cloud'
				],
				correct_answer_index: 0,
				explanation:
					'VPC adalah kanvas jaringan milikmu di dalam wilayah penyedia, lengkap dengan subnet dan aturan lalu lintas yang kamu tentukan sendiri. Kompresi, orkestrasi container, dan penagihan adalah layanan lain yang tidak ada hubungannya dengan isolasi jaringan.'
			},
			{
				id: 'cloud-engineer-b5-q2',
				question: 'Tempat paling aman untuk menempatkan database produksi adalah...',
				options: [
					'Subnet publik agar mudah diakses dari mana saja',
					'Subnet privat tanpa IP publik, hanya diakses dari dalam VPC',
					'Langsung di internet dengan port 5432 terbuka',
					'IP publik milik developer agar koneksi lebih cepat'
				],
				correct_answer_index: 1,
				explanation:
					'Subnet privat menghilangkan jalur serangan langsung dari internet sehingga akses hanya mungkin dari dalam VPC. Subnet publik justru mengekspos database, keterbukaan port ke internet tetap berbahaya meski ada password, dan menempelkan IP personal tidak menyelesaikan masalah isolasi.'
			},
			{
				id: 'cloud-engineer-b5-q3',
				question: 'Berdasarkan policy berikut, apa yang tidak bisa dilakukan pemegang kredensial ini?',
				code: `{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::toko-bucket/*"
}`,
				code_lang: 'json',
				code_caption: 'policy.json — potongan izin bucket',
				options: [
					'Membaca object di bucket toko-bucket',
					'Mengunggah object baru ke bucket toko-bucket',
					'Menghapus object dari bucket, karena izin s3:DeleteObject tidak ada',
					'Mengakses bucket bernama toko-bucket'
				],
				correct_answer_index: 2,
				explanation:
					'Policy hanya mengizinkan `s3:GetObject` dan `s3:PutObject`, sedangkan penghapusan membutuhkan `s3:DeleteObject` yang tidak tercantum. Karena itu membaca dan mengunggah diperbolehkan, sementara menghapus ditolak oleh penyedia.'
			},
			{
				id: 'cloud-engineer-b5-q4',
				question:
					'Pemindaian keamanan menemukan port 5432 terbuka ke 0.0.0.0/0 pada database produksi. Tindakan paling tepat adalah...',
				options: [
					'Dibiarkan saja karena database tetap meminta password',
					'Ganti password database dengan yang lebih panjang',
					'Tambahkan lebih banyak user database',
					'Tutup jalur di level jaringan: hapus IP publik, pindahkan ke subnet privat, dan batasi security group'
				],
				correct_answer_index: 3,
				explanation:
					'Membatasi jalur di level jaringan menutup pintu serangan sebelum masuk ke tahap autentikasi, dan password saja tidak cukup menghadapi pemindaian massal. Menambah user tidak menutup port, sedangkan membiarkan kebuka berarti menunggu insiden.'
			},
			{
				id: 'cloud-engineer-b5-q5',
				question: 'Perbedaan mendasar antara security group dan network ACL adalah...',
				options: [
					'Security group bersifat stateful untuk level instance, network ACL stateless untuk level subnet',
					'Keduanya identik dan hanya beda nama saja',
					'Network ACL hanya berlaku untuk VM publik',
					'Security group bekerja di level aplikasi'
				],
				correct_answer_index: 0,
				explanation:
					'Security group menempel pada satu instance dan mengingat koneksi balikannya, sedangkan NACL bekerja di tingkat subnet dan menilai tiap paket secara terpisah. Pembedanya bukan status publik maupun lapisan aplikasi, melainkan cakupan dan sifat stateful atau stateless.'
			},
			{
				id: 'cloud-engineer-b5-q6',
				question: 'Apa risiko dari konfigurasi berikut?',
				code: `$ aws ec2 describe-security-groups --group-ids sg-0a1b2c3d
[ { "IpPermissions": [ { "IpProtocol": "tcp", "FromPort": 22,
    "ToPort": 22, "IpRanges": [ { "CidrIp": "0.0.0.0/0" } ] } ] } ]`,
				code_lang: 'bash',
				code_caption: 'inspect-sg.sh — audit aturan masuk security group',
				options: [
					'Konfigurasi sudah aman karena SSH selalu terenkripsi',
					'Port SSH terbuka ke seluruh internet sehingga rentan dipindai dan diserang brute force',
					'Port 22 tertutup sehingga tidak ada risiko sama sekali',
					'Risiko hanya muncul jika server menggunakan sistem operasi Windows'
				],
				correct_answer_index: 1,
				explanation:
					'Cidr `0.0.0.0/0` berarti semua alamat di internet boleh mencoba koneksi ke port 22, target favorit pemindaian otomatis. Enkripsi tidak mencegah percobaan login massal, port terbuka jelas berisiko, dan risiko berlaku di semua sistem operasi.'
			},
			{
				id: 'cloud-engineer-b5-q7',
				question:
					'Aplikasi di subnet privat perlu mengunduh patch dari internet. Komponen yang dibutuhkan adalah...',
				options: [
					'Internet gateway yang dipasang langsung di subnet privat',
					'Memindahkan seluruh server ke subnet publik',
					'NAT gateway di subnet publik dengan route table yang mengarahkan subnet privat ke sana',
					'Menonaktifkan seluruh route table agar trafik mengalir bebas'
				],
				correct_answer_index: 2,
				explanation:
					'NAT gateway di subnet publik meneruskan permintaan keluar dari subnet privat tanpa memberinya alamat publik, sehingga isolasi tetap terjaga. Internet gateway tidak dipasang di subnet, memindahkan server justru membuka akses, dan route table yang mati membuat trafik macet.'
			},
			{
				id: 'cloud-engineer-b5-q8',
				question: 'Prinsip *least privilege* dalam IAM berarti...',
				options: [
					'Memberi hak admin ke semua anggota tim agar tidak terhambat',
					'Memberi izin sesedikit mungkin yang benar-benar dibutuhkan oleh tugasnya',
					'Memakai akun root untuk setiap layanan agar jarang muncul error',
					'Memberi hak berdasarkan lama masa kerja karyawan'
				],
				correct_answer_index: 1,
				explanation:
					'Hak yang dipangkas seminimal mungkin memastikan bila kredensial bocor, dampaknya pun terbatas. Admin untuk semua orang, pemakaian akun root, dan pembagian izin berdasarkan masa kerja justru memperbesar peluang penyalahgunaan.'
			},
			{
				id: 'cloud-engineer-b5-q9',
				question: 'Tempat yang benar untuk menyimpan rahasia seperti kunci API aplikasi adalah...',
				options: [
					'Secret manager atau environment variable terenkripsi, bukan ditulis di repository',
					'File konfigurasi yang ikut ter-commit ke repository publik',
					'Langsung di dalam source code supaya mudah ditemukan',
					'Dalam screenshot dokumentasi yang dibagikan ke seluruh tim'
				],
				correct_answer_index: 0,
				explanation:
					'Kunci yang tertanam di kode akan ikut tersimpan di riwayat Git dan sulit ditarik kembali meski sudah dihapus. Secret manager menyediakan akses teraudit dan rotasi, sedangkan cara lain membuat rahasia terpampang di tempat yang mudah tersebar.'
			},
			{
				id: 'cloud-engineer-b5-q10',
				question: 'Miskonsepsi: karena VPC bersifat pribadi, seluruh isinya otomatis aman. Pernyataan itu...',
				options: [
					'Benar sepenuhnya, VPC sudah mengamankan seluruh isinya',
					'Benar selama semua trafik memakai HTTPS',
					'Salah, VPC tidak mengisolasi apa pun dari cloud lain',
					'Salah, VPC hanya memisahkan jaringan; keamanan tetap bergantung pada security group, IAM, dan konfigurasi layanan di dalamnya'
				],
				correct_answer_index: 3,
				explanation:
					'VPC memang mengisolasi jaringanmu, tetapi kebocoran tetap mungkin lewat izin longgar, port terbuka, atau data yang dipublikasikan. Isolasi jaringan bukan jaminan mutlak, dan anggapan bahwa VPC tidak mengisolasi apa pun juga keliru.'
			}
		]
	},
	{
		id: 41,
		scope_id: 'cloud-engineer',
		bab_number: 6,
		title: 'Infrastructure as Code (Terraform Dasar)',
		subtitle: 'Deklarasi Infrastruktur',
		explanation:
			'Dulu, membuat satu server berarti mengklik konsol web puluhan kali: pilih gambar, atur jaringan, pasang aturan firewall, beri nama, lalu berharap tidak ada yang terlewat. **Infrastructure as Code** mengganti klik itu dengan file teks berisi deskripsi infrastruktur yang diinginkan. **Terraform** bekerja secara deklaratif: kamu menulis keadaan akhir, bukan langkah perintah. Saat `terraform apply` dijalankan, alat membaca *state file* yang mencatat resource yang sudah ada, membandingkannya dengan deklarasi, lalu menyusun rencana perubahan — menambah yang kurang, mengubah yang beda, dan menghapus yang tidak lagi tercantum.\n\nKeuntungannya terasa dalam kerja tim. Konfigurasi disimpan di Git, setiap perubahan melewati *code review*, riwayatnya jelas, dan environment uji bisa dibuat identik dengan produksi hanya dengan menjalankan kode yang sama. Insiden dengan alasan bahwa perubahan sudah dilakukan di konsol pun hilang karena tidak ada tindakan yang tidak tercatat. Namun ada dua kewaspadaan: *state file* harus disimpan di tempat terkunci dengan *remote state* dan *locking* agar dua engineer tidak saling menimpa, dan hasil `plan` wajib dibaca sebelum `apply` karena Terraform bisa menghapus resource yang hilang dari kode.\n\nStudi kasus: satu tim menghabiskan dua hari untuk membangun environment uji secara manual. Setelah memakai IaC, environment yang sama terbentuk dalam 12 menit dari nol, dan saat ada kesalahan konfigurasi, tim tinggal mengembalikan satu *commit* lalu menjalankan apply ulang. Prinsipnya sederhana: apa yang bisa dibuat ulang dengan satu perintah, tidak akan pernah ditakuti saat rusak.',
		code_snippet: `# 1. Inisialisasi proyek dan unduh provider
$ terraform init

# 2. Rencanakan perubahan sebelum diterapkan
$ terraform plan -out=tfplan

# 3. Terapkan rencana dan simpan ke state
$ terraform apply tfplan

# 4. Lihat resource yang sedang dikelola
$ terraform state list

# 5. Hapus resource uji di environment dev
$ terraform destroy -auto-approve`,
		code_lang: 'bash',
		code_caption: 'terraform.sh — alur kerja harian: init, plan, apply, state, destroy',
		image_url: '/diagrams/cloud-engineer-b6.svg',
		diagram: null,
		diagram_caption:
			'Gambar 41.1: Siklus Infrastructure as Code Terraform — tulis HCL, review plan, apply, state tersimpan, lalu ubah konfigurasi berulang.',
		key_points: [
			'Infrastruktur ditulis sebagai kode teks di Git sehingga bisa ditinjau, diulang, dan dikembalikan.',
			'State file mencatat resource nyata; simpan di remote state dengan locking agar tim tidak saling menimpa.',
			'Selalu baca hasil plan sebelum apply, dan jangan pernah menaruh rahasia langsung di file .tf.'
		],
		quiz: [
			{
				id: 'cloud-engineer-b6-q1',
				question: 'Infrastructure as Code (IaC) berarti...',
				options: [
					'Infrastruktur dideklarasikan dalam file teks yang disimpan di version control dan bisa dibuat ulang',
					'Menggambar diagram infrastruktur di aplikasi desain',
					'Mengklik konsol cloud satu per satu tanpa menyimpan catatan',
					'Menulis hanya kode aplikasi tanpa perlu menyentuh server'
				],
				correct_answer_index: 0,
				explanation:
					'Inti IaC adalah memperlakukan infrastruktur seperti kode: dideklarasikan, disimpan, ditinjau, dan bisa dibuat ulang kapan saja. Menggambar diagram tidak menghasilkan resource, klik manual justru yang ingin dihindari, dan IaC tetap berurusan dengan resource server.'
			},
			{
				id: 'cloud-engineer-b6-q2',
				question: 'Fungsi utama *state file* pada Terraform adalah...',
				options: [
					'Menyimpan seluruh source code aplikasi',
					'Mencatat resource yang sudah ada supaya Terraform tahu selisih antara deklarasi dan kenyataan',
					'Mengenkripsi rahasia agar tidak bocor',
					'Mengompres file konfigurasi agar lebih ringan'
				],
				correct_answer_index: 1,
				explanation:
					'Dengan state, Terraform tahu resource mana yang sudah terbangun sehingga bisa menghitung perubahan yang tepat. Source code disimpan di Git, kerahasiaan ditangani secret manager, dan kompresi bukan tujuan dari file state.'
			},
			{
				id: 'cloud-engineer-b6-q3',
				question: 'Berapa resource yang akan dibuat saat menjalankan perintah plan pada potongan berikut?',
				code: `$ terraform plan
Plan: 3 to add, 1 to change, 0 to destroy.

$ terraform apply
Apply complete! Resources: 3 added, 1 changed, 0 destroyed.`,
				code_lang: 'bash',
				code_caption: 'hasil plan dan apply',
				options: ['1 resource', '4 resource', '3 resource', '0 resource karena tidak ada perubahan'],
				correct_answer_index: 2,
				explanation:
					'Baris `Plan: 3 to add` menyatakan tiga resource baru akan dibuat; angka 1 adalah resource yang diubah, bukan ditambahkan. Total empat adalah jumlah seluruh perubahan, bukan jumlah penambahan yang ditanyakan.'
			},
			{
				id: 'cloud-engineer-b6-q4',
				question:
					'Studi kasus: dua engineer menemukan infrastruktur berbeda dari file di repository karena ada yang mengubah konfigurasi langsung di konsol. Penyelesaian paling tepat adalah...',
				options: [
					'Menghapus file state supaya selisih tidak terdeteksi',
					'Mem-fork repo tim ke repository pribadi',
					'Menghentikan penggunaan Terraform selamanya',
					'Mengembalikan perubahan ke dalam kode, apply ulang, dan melarang perubahan manual lewat proses review'
				],
				correct_answer_index: 3,
				explanation:
					'Drift diperbaiki dengan menjadikan kode sebagai satu-satunya sumber kebenaran, lalu ditegakkan kembali lewat apply. Menghapus state justru membuat Terraform kehilangan ingatannya, dan meninggalkan IaC hanya mengembalikan masalah manual yang sama.'
			},
			{
				id: 'cloud-engineer-b6-q5',
				question: 'Perintah apa yang menghasilkan output pada potongan berikut?',
				code: `$ terraform init
Initializing provider plugins...
Terraform has been successfully initialized!`,
				code_lang: 'bash',
				code_caption: 'hasil perintah awal proyek Terraform',
				options: ['terraform init', 'terraform destroy', 'terraform fmt', 'terraform logout'],
				correct_answer_index: 0,
				explanation:
					'Pesan `Terraform has been successfully initialized` adalah ciri khas `terraform init`, yang mengunduh provider dan menyiapkan direktori kerja. Perintah lain menghasilkan pesan berbeda: destroy menghapus resource, fmt merapikan file, dan logout keluar dari akun.'
			},
			{
				id: 'cloud-engineer-b6-q6',
				question: 'Apa yang ditampilkan oleh output perintah berikut?',
				code: `$ terraform output -json
{
  "public_ip": { "value": "54.123.45.67", "type": "string" },
  "db_endpoint": { "value": "toko-db.abc123.rds.amazonaws.com", "type": "string" }
}`,
				code_lang: 'json',
				code_caption: 'terraform output -json',
				options: [
					'Daftar region yang tersedia di penyedia cloud',
					'Nilai resource hasil apply yang bisa dikonsumsi oleh script lain',
					'File konfigurasi provider yang belum terunduh',
					'Log error saat menjalankan apply'
				],
				correct_answer_index: 1,
				explanation:
					'Perintah `output` menampilkan nilai keluaran yang sudah dideklarasikan dalam konfigurasi, misalnya IP publik atau alamat database. Format JSON membuatnya mudah dibaca oleh script, dan ini bukan daftar region, file provider, maupun log galat.'
			},
			{
				id: 'cloud-engineer-b6-q7',
				question: 'Keuntungan utama menyimpan konfigurasi infrastruktur di Git adalah...',
				options: [
					'Membuat proses deploy menjadi lebih lambat',
					'Menghilangkan kebutuhan menyimpan state',
					'Setiap perubahan tercatat, bisa ditinjau tim, dan dikembalikan bila bermasalah',
					'Menjamin biaya infrastruktur selalu menurun'
				],
				correct_answer_index: 2,
				explanation:
					'Riwayat commit membuat setiap perubahan bisa diaudit dan dikembalikan, termasuk lewat *code review* sebelum masuk. Git tidak memperlambat deploy, tidak menghapus kebutuhan state, dan tidak menjamin apa pun soal biaya.'
			},
			{
				id: 'cloud-engineer-b6-q8',
				question:
					'Studi kasus: dua engineer menjalankan apply pada waktu bersamaan sehingga resource terduplikasi dan state rusak. Penyebab paling mungkin adalah...',
				options: [
					'File .tf terlalu panjang sehingga diproses ganda',
					'State tidak dikunci karena remote state tidak memakai locking',
					'Penyedia cloud sedang mengalami gangguan',
					'Region yang dipilih salah sehingga resource menjadi dobel'
				],
				correct_answer_index: 1,
				explanation:
					'Tanpa mekanisme locking, dua proses apply bisa menulis state secara bersamaan sehingga selisih informasi membuat resource ganda. Panjang file dan gangguan penyedia tidak menyebabkan duplikasi, sedangkan region salah umumnya memunculkan galat, bukan duplikasi diam-diam.'
			},
			{
				id: 'cloud-engineer-b6-q9',
				question: 'Benarkah `terraform apply` selalu aman dijalankan tanpa melihat hasil plan terlebih dahulu?',
				options: [
					'Benar, Terraform hanya menambah resource baru',
					'Benar, asalkan dijalankan oleh akun admin',
					'Salah hanya jika file .tf benar-benar kosong',
					'Salah, plan harus dibaca dulu karena apply bisa menghapus atau mengubah resource yang tidak kamu perhitungkan'
				],
				correct_answer_index: 3,
				explanation:
					'Karena state menjadi acuan, resource yang hilang dari kode akan masuk ke daftar penghapusan saat apply. Karena itu plan selalu dibaca dulu sebagai langkah pengaman, terlepas dari hak akun yang menjalankannya.'
			},
			{
				id: 'cloud-engineer-b6-q10',
				question: 'Miskonsepsi: rahasia seperti token database boleh ditulis langsung di file .tf karena file itu tidak dipublikasikan.',
				options: [
					'Benar, asalkan repository bersifat privat',
					'Benar, selama file ditambahkan ke daftar gitignore',
					'Salah karena file .tf tidak mendukung tipe string',
					'Salah, file .tf tetap tersimpan di Git dan backup sehingga rahasia harus lewat variabel environment atau secret manager'
				],
				correct_answer_index: 3,
				explanation:
					'File konfigurasi ikut tersimpan di riwayat versi dan salinan cadangan, sehingga menghapusnya dari commit terakhir pun tidak menghapus jejaknya. Kerahasiaan seharusnya datang dari luar kode, misalnya variabel lingkungan atau secret manager, bukan dari status privatnya repository.'
			}
		]
	},
	{
		id: 42,
		scope_id: 'cloud-engineer',
		bab_number: 7,
		title: 'Cloud Monitoring, Logging & Disaster Recovery',
		subtitle: 'Metrik, Log & RPO/RTO',
		explanation:
			'Aplikasi boleh terlihat lancar di dashboard, tapi pertanyaan yang benar-benar penting adalah bagaimana kamu tahu saat sesuatu mulai memburuk. **Monitoring** menjawabnya lewat tiga bahan baku: **metrik**, yaitu angka berkelanjutan seperti CPU, latensi, dan jumlah request yang mudah digambar serta dialarmkan; **log**, yaitu catatan peristiwa per baris yang berguna menelusuri akar masalah; dan *trace*, yaitu jejak satu request melintasi banyak layanan. Alarm dibuat dengan ambang yang bermakna, misalnya latensi 95 persen di atas 800 milidetik selama dua menit, beserta *runbook* yang menjelaskan langkah pertama saat bunyi supaya tim tidak kebingungan.\n\nDi sisi pemulihan, dua angka wajib dipahami adalah **RPO** (*Recovery Point Objective*: seberapa banyak data yang siap hilang) dan **RTO** (*Recovery Time Objective*: berapa lama layanan harus pulih). RPO 15 menit berarti replika atau backup harus menyusul segitu, sedangkan RTO satu jam berarti prosedur failover wajib selesai dalam satu jam. Ingat pula bahwa backup yang tidak pernah diuji pulih hanyalah file yang enak dilihat, sehingga pelatihan pemulihan atau *game day* perlu dijalankan berkala.\n\nStudi kasus: toko daring pernah kehilangan 40 menit transaksi karena database utama gagal. Setelah kejadian itu mereka menambah replika lintas zona, alarm khusus untuk kesehatan replikasi, dan simulasi failover bulanan. Ketika gangguan berikutnya datang, layanan pulih hanya dalam 9 menit karena tim sudah pernah menjalankan prosedur yang sama sebelumnya.',
		sections: [
			{
				heading: 'Menyusun Alarm yang Sehat',
				body: 'Alarm yang baik punya tiga syarat: ambangnya berdasarkan dampak ke pengguna, bukan sekadar angka teknis; penyebabnya bisa dilihat dalam satu menit dari dashboard; dan setiap alarm punya runbook berisi langkah pertama. Alarm tanpa tindakan hanya menimbulkan kelelahan pemberitahuan.'
			}
		],
		code_snippet: `# Pasang alarm CPU dan kirim notifikasi ke tim
$ aws cloudwatch put-metric-alarm --alarm-name api-cpu-high --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 300 --threshold 80 --comparison-operator GreaterThanThreshold --evaluation-periods 2

# Uji endpoint kesehatan sebelum dan sesudah deploy
$ curl -s -o /dev/null -w "%{http_code}" https://api.toko.dev/healthz

# Telusuri error aplikasi terbaru
$ aws logs filter-log-events --log-group-name /app/toko-api --filter-pattern "ERROR"`,
		code_lang: 'bash',
		code_caption: 'monitoring.sh — pasang alarm, uji kesehatan, dan telusuri log error',
		image_url: '/diagrams/cloud-engineer-b7.svg',
		diagram: null,
		diagram_caption:
			'Gambar 42.1: Metrik ketahanan cloud — uptime, latensi p95, dan RPO — beserta target yang harus dijaga agar layanan tetap andal.',
		key_points: [
			'Metrik dipakai untuk grafik dan alarm, log untuk menelusuri akar masalah — keduanya perlu terpusat dan mudah dicari.',
			'RPO menentukan seberapa banyak data yang siap hilang, RTO menentukan berapa lama layanan harus pulih.',
			'Backup yang tidak pernah diuji pemulihannya belum dianggap ada; jalankan simulasi failover berkala.'
		],
		quiz: [
			{
				id: 'cloud-engineer-b7-q1',
				question: 'Perbedaan mendasar antara metrik dan log adalah...',
				options: [
					'Metrik berupa angka berkelanjutan untuk grafik dan alarm, log berupa catatan peristiwa per baris',
					'Keduanya sama saja dan saling menggantikan',
					'Log hanya berisi pesan error sistem',
					'Metrik hanya disimpan selama satu jam lalu hilang'
				],
				correct_answer_index: 0,
				explanation:
					'Metrik memang dirancang untuk ditinjau sebagai deret angka dari waktu ke waktu, sedangkan log menjelaskan peristiwa terperinci pada satu saat. Log memuat berbagai tingkat pesan, dan masa simpan keduanya tergantung kebijakan yang kamu atur sendiri.'
			},
			{
				id: 'cloud-engineer-b7-q2',
				question: 'RPO dan RTO masing-masing menjelaskan...',
				options: [
					'RPO adalah jumlah server, RTO adalah jumlah backup',
					'RPO menjelaskan seberapa banyak data yang siap hilang, RTO menjelaskan berapa lama layanan harus pulih',
					'RPO adalah waktu pemulihan, RTO adalah jumlah data hilang',
					'Keduanya menjelaskan jumlah backup per hari'
				],
				correct_answer_index: 1,
				explanation:
					'Kedua istilah berbicara tentang kerugian, bukan tentang alat: RPO menyangkut data yang hilang, RTO menyangkut waktu berhenti. Karena itu keduanya baru berguna bila diikat pada strategi backup dan failover yang nyata.'
			},
			{
				id: 'cloud-engineer-b7-q3',
				question: 'Berdasarkan output berikut, apa arti kondisi alarm saat ini?',
				code: `$ aws cloudwatch describe-alarms --alarm-names api-cpu-high
[ { "AlarmName": "api-cpu-high", "StateValue": "ALARM",
    "MetricName": "CPUUtilization", "Threshold": 80.0,
    "Period": 300, "EvaluationPeriods": 2 } ]`,
				code_lang: 'bash',
				code_caption: 'describe-alarms — status alarm CPU',
				options: [
					'Alarm berhasil dibuat dan kondisi mesin masih normal',
					'Konfigurasi alarm tidak valid sehingga diabaikan',
					'CPU rata-rata melewati 80 persen selama dua periode berturut-turut sehingga alarm aktif',
					'Seluruh instance otomatis dihentikan oleh sistem'
				],
				correct_answer_index: 2,
				explanation:
					'Nilai "ALARM" pada StateValue berarti ambang 80 persen sudah terlampaui sepanjang dua periode penilaian masing-masing 300 detik. Status seperti ini menandakan ada tindakan yang perlu diambil, bukan sekadar informasi bahwa konfigurasi berhasil dibuat.'
			},
			{
				id: 'cloud-engineer-b7-q4',
				question:
					'Studi kasus: perusahaan menetapkan layanan harus pulih dalam satu jam saat region utama terganggu. Arsitektur yang memenuhi adalah...',
				options: [
					'Tambahan backup di region yang sama',
					'Snapshot mingguan yang disimpan di komputer tim',
					'Satu availability zone dengan disk cadangan',
					'Multi-region dengan replika siap pakai dan prosedur failover yang rutin diuji'
				],
				correct_answer_index: 3,
				explanation:
					'Pemulihan lintas region hanya bisa dicapai bila ada salinan data dan rencana yang sudah teruji, bukan sekadar file cadangan. Backup satu region tidak menolong saat region itu bermasalah, dan satu zona tetap rapuh terhadap gangguan lokal.'
			},
			{
				id: 'cloud-engineer-b7-q5',
				question:
					'Log aplikasi tersebar di 20 server dan tim kesulitan menemukan penyebab error. Langkah yang tepat adalah...',
				options: [
					'Mengirim log ke layanan log terpusat dengan format terstruktur agar mudah dicari',
					'Masuk ke tiap server lewat SSH setiap kali ada masalah',
					'Menyimpan log hanya di memori agar proses cepat',
					'Menghapus log setiap hari agar disk tidak penuh'
				],
				correct_answer_index: 0,
				explanation:
					'Terpusat membuat seluruh log bisa dicari dan dikorelasikan dari satu tempat, apalagi bila formatnya konsisten sehingga field seperti level dan request id bisa difilter. Pendekatan manual tidak scalable, log di memori hilang saat proses berhenti, dan menghapus semuanya menghapus jejak investigasi.'
			},
			{
				id: 'cloud-engineer-b7-q6',
				question: 'Apa yang bisa disimpulkan dari output perintah berikut?',
				code: `$ aws logs filter-log-events --log-group-name /app/toko-api --filter-pattern "ERROR"
{ "message": "payment gateway timeout", "level": "error", "orderId": "ORD-1024" }`,
				code_lang: 'bash',
				code_caption: 'filter log error aplikasi',
				options: [
					'Log hanya tersedia dalam bentuk teks biasa tanpa struktur',
					'Log berformat JSON memudahkan pencarian error berdasarkan level dan field tertentu',
					'Alarm CPU sedang aktif karena melebihi ambang',
					'Backup database terbaru berhasil diunggah'
				],
				correct_answer_index: 1,
				explanation:
					'Field `level` dan `orderId` membuat pesan bisa difilter dan ditelusuri per transaksi, itulah guna log terstruktur. Perintah ini tidak berkaitan dengan alarm CPU maupun status backup, dan format yang terlihat jelas bukan teks polos.'
			},
			{
				id: 'cloud-engineer-b7-q7',
				question: 'Aturan 3-2-1 untuk backup bermakna...',
				options: [
					'tiga server, dua region, dan satu administrator',
					'tiga kali backup per hari di satu disk yang sama',
					'tiga salinan data, dua media berbeda, dan satu salinan berada di lokasi terpisah',
					'tiga admin, dua backup, dan satu file konfigurasi'
				],
				correct_answer_index: 2,
				explanation:
					'Kombinasi ini memastikan selalu ada cadangan ketika satu lokasi atau satu jenis media ikut rusak. Menumpuk backup di satu disk atau satu lokasi justru membuat semuanya raib bersama dalam satu kejadian.'
			},
			{
				id: 'cloud-engineer-b7-q8',
				question:
					'Pengguna mengeluh aplikasi lambat, tetapi pemakaian CPU server justru rendah. Pemeriksaan paling awal yang tepat adalah...',
				options: [
					'Meriksa metrik latensi, koneksi database, dan antrean, lalu menelusuri log pada waktu kejadian',
					'Langsung menambah CPU ke seluruh server',
					'Me-restart semua layanan secara bersamaan',
					'Mematikan alarm supaya pemberitahuan berhenti'
				],
				correct_answer_index: 0,
				explanation:
					'Kelambatan sering berasal dari antrean atau koneksi database yang habis, sehingga metrik lain perlu diperiksa sebelum menambah kapasitas. Merestart tanpa diagnosis menghapus bukti, dan mematikan alarm justru menyembunyikan sinyal masalah.'
			},
			{
				id: 'cloud-engineer-b7-q9',
				question: 'Apa arti kode status yang muncul dari uji kesehatan berikut?',
				code: `$ curl -s -o /dev/null -w "%{http_code}" https://api.toko.dev/healthz
503`,
				code_lang: 'bash',
				code_caption: 'uji endpoint kesehatan aplikasi',
				options: [
					'Permintaan berhasil dan halaman dimuat normal',
					'Halaman tidak ditemukan di server',
					'Layanan sementara tidak tersedia, biasanya karena upstream atau dependensi bermasalah',
					'Berhasil tanpa isi'
				],
				correct_answer_index: 2,
				explanation:
					'Kode 503 berarti server menerima permintaan tetapi tidak bisa memenuhinya sekarang, misalnya karena dependency seperti database sedang terputus. Kode sukses berada di kisaran 200, sedangkan 404 berarti sumber yang diminta tidak ada.'
			},
			{
				id: 'cloud-engineer-b7-q10',
				question: 'Miskonsepsi: alarm yang sering berbunyi adalah tanda monitoring yang bagus.',
				options: [
					'Benar, makin banyak alarm berarti makin aman',
					'Benar, semua metrik wajib diberi alarm',
					'Salah hanya jika alarm dikirim lewat email',
					'Salah, alarm yang terus-menerus tanpa tindakan membuat tim acuh tak acuh; alarm harus bermakna dan disertai runbook'
				],
				correct_answer_index: 3,
				explanation:
					'Ketika semua bunyi dianggap biasa, tim cenderung mengabaikannya sampai insiden sungguhan datang, dan itulah efek kelelahan pemberitahuan. Jumlah alarm bukan tolok ukur keamanan, dan media pengiriman tidak mengubah mutunya.'
			}
		]
	}
];
