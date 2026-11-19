import type { BabModule } from '$lib/data/types';

export const modules: BabModule[] = [
	{
		id: 43,
		scope_id: 'network-engineer',
		bab_number: 1,
		title: 'Model Referensi OSI Layer & TCP/IP',
		subtitle: 'Peta Tujuh Layer',
		explanation:
			'Kalau kamu pernah melihat cara kerja pabrik, tiap pekerja hanya menangani satu tahap kecil: ada yang memotong, ada yang menjahit, ada yang mengemas. Jaringan komputer memakai prinsip yang sama lewat sistem berlapis bernama **model OSI**. Model ini memecah komunikasi menjadi 7 layer, mulai dari Physical (kabel, sinyal, konektor), Data Link (alamat MAC dan switch), Network (alamat IP dan router), Transport (TCP dan UDP yang mengatur keandalan serta port), lalu Session, Presentation, sampai Application yang langsung bersentuhan dengan aplikasi yang kamu buka. Di lapangan yang dipakai adalah **model TCP/IP**, yang memadatkan tujuh layer OSI menjadi empat: Network Access, Internet, Transport, dan Application.\n\nNilai dari memahami layer bukan terletak pada hafalannya, tapi karena layer itu berfungsi sebagai peta troubleshooting. Contoh kasus: satu lantai kantor tiba-tiba tidak bisa internet. Kalau lampu di port switch mati, kamu langsung tahu masalahnya di layer Physical sehingga tidak perlu repot membuka pengaturan IP. Tapi kalau lampu menyala, `ping 8.8.8.8` sukses, namun `nslookup example.com` gagal, masalahnya sudah pindah ke lapisan atas yaitu resolusi DNS. Saat data dikirim, tiap layer menambahkan header miliknya sendiri (*encapsulation*) dari Application turun ke Physical, lalu header itu dilepas berurutan di sisi penerima (*decapsulation*). Karena itu strategi diagnosa yang paling hemat waktu adalah menyusuri layer dari bawah ke atas, bukan menebak-nebak dari atas ke bawah.',
		sections: [
			{
				heading: 'Mnemonik Tujuh Layer OSI',
				body: 'Dari bawah ke atas: **Physical**, **Data Link**, **Network**, **Transport**, **Session**, **Presentation**, **Application**. Trik yang dipakai banyak praktisi: *Please Do Not Throw Sausage Pizza Away*. Tiap layer punya contoh protokol khas, misalnya HTTP di Application, TCP di Transport, IP di Network, Ethernet di Data Link, dan kabel UTP di Physical.'
			}
		],
		code_snippet: `# Uji bertingkat: link, gateway, port, lalu jalur
$ ip -br a show eth0
eth0  UP  192.168.10.24/24

$ ping -c 2 192.168.10.1
64 bytes from 192.168.10.1: icmp_seq=1 ttl=64 time=0.9 ms

$ nc -zv example.com 443
Connection to example.com 443 port [tcp/https] succeeded!

# Telusuri jalur, lihat di hop ke berapa berhenti
$ traceroute -n 1.1.1.1
 1  192.168.10.1    0.8 ms
 2  100.64.0.1      7.3 ms
 3  1.1.1.1        14.6 ms`,
		code_lang: 'bash',
		code_caption: 'layer-check.sh — cek bertingkat dari link fisik sampai port aplikasi',
		image_url: '/diagrams/network-engineer-b1.svg',
		diagram_caption:
			'Gambar 43.1: Tujuh lapisan OSI beserta padanan TCP/IP — dari lapisan fisik (kabel dan bit) sampai aplikasi (HTTP dan DNS).',
		key_points: [
			'OSI punya 7 layer sedangkan TCP/IP memadatkannya menjadi 4 layer yang dipakai di jaringan nyata.',
			'Setiap layer hanya berbicara dengan layer di sebelahnya melalui encapsulation dan decapsulation.',
			'Troubleshooting paling efektif menyusuri layer dari bawah ke atas, bukan menebak dari atas ke bawah.'
		],
		quiz: [
			{
				id: 'network-engineer-b1-q1',
				question: 'Layer OSI mana yang bertanggung jawab mengurus alamat IP dan memilih rute antar jaringan?',
				options: [
					'Layer Network',
					'Layer Data Link',
					'Layer Transport',
					'Layer Physical'
				],
				correct_answer_index: 0,
				explanation:
					'Layer Network (Layer 3) bekerja dengan alamat IP dan routing table, tempat router beroperasi. Data Link hanya meneruskan frame berdasarkan MAC di satu segmen, Transport mengurus koneksi lewat TCP/UDP, dan Physical mengurus sinyal serta kabel.'
			},
			{
				id: 'network-engineer-b1-q2',
				question: 'Perangkat mana yang bekerja utamanya di layer Data Link (Layer 2)?',
				options: ['Router', 'Switch', 'Server', 'Modem kabel'],
				correct_answer_index: 1,
				explanation:
					'Switch membangun tabel MAC address dan meneruskan frame berdasarkan port tujuan MAC, persis tugas layer Data Link. Router bekerja di layer Network, sedangkan server dan modem berinteraksi di lapisan yang lebih tinggi.'
			},
			{
				id: 'network-engineer-b1-q3',
				question: 'Berdasarkan output traceroute berikut, di manakah jalur paling mungkin mengalami masalah?',
				code: ` 1  192.168.10.1    1.2 ms\n 2  10.47.0.1       8.4 ms\n 3  * * *\n 4  * * *`,
				code_lang: 'bash',
				code_caption: 'traceroute -n 8.8.8.8',
				options: [
					'Hop 1 bermasalah karena gateway lokal tidak merespons',
					'Hop 2 mati total sehingga jalur putus di sana',
					'Setelah hop 2 tidak ada jawaban, jadi masalah mulai setelah 10.47.0.1',
					'Output normal, tidak ada gangguan sama sekali'
				],
				correct_answer_index: 2,
				explanation:
					'Hop 1 dan 2 masih memberi balasan berarti jalur sehat sampai titik itu. Bintang di hop 3 dan 4 berarti tidak ada jawaban, jadi gangguannya ada di perangkat setelah `10.47.0.1` atau memang diblokir oleh firewall di sana.'
			},
			{
				id: 'network-engineer-b1-q4',
				question: 'Apa yang dimaksud dengan proses *encapsulation* saat data dikirim?',
				options: [
					'Penerjemahan nama domain menjadi alamat IP',
					'Pembuatan koneksi baru sebelum data dikirim',
					'Penggabungan dua paket berbeda menjadi satu paket',
					'Tiap layer menambahkan header miliknya sendiri ketika data turun menuju layer fisik'
				],
				correct_answer_index: 3,
				explanation:
					'Encapsulation adalah penambahan header berlapis: data aplikasi dibungkus header TCP/UDP, lalu IP, lalu frame, sampai menjadi bit di kabel. Proses sebaliknya yang melepas header secara berurutan disebut decapsulation. Penerjemahan nama domain adalah tugas DNS.'
			},
			{
				id: 'network-engineer-b1-q5',
				question: 'Saat kamu membuka situs lewat HTTPS, protokol HTTP dikenali berada di layer berapa?',
				options: [
					'Layer 7 (Application)',
					'Layer 4 (Transport)',
					'Layer 2 (Data Link)',
					'Layer 1 (Physical)'
				],
				correct_answer_index: 0,
				explanation:
					'HTTP bersentuhan langsung dengan aplikasi pengguna sehingga berada di layer Application (Layer 7). TCP yang menampung koneksi HTTP berada di Layer 4, frame Ethernet di Layer 2, dan sinyal di kabel berada di Layer 1.'
			},
			{
				id: 'network-engineer-b1-q6',
				question: 'Berdasarkan cuplikan output berikut, apa yang sebenarnya terjadi di perangkat?',
				code: `Netid  State   Local Address:Port\nLISTEN 0       0.0.0.0:22\nLISTEN 0       0.0.0.0:80`,
				code_lang: 'bash',
				code_caption: 'ss -tuln (cuplikan)',
				options: [
					'Kedua port sedang terhubung ke klien aktif',
					'Layanan di port 22 dan 80 sedang menunggu koneksi masuk',
					'Port 80 diblokir oleh firewall sehingga tidak bisa dipakai',
					'Tidak ada layanan yang berjalan di perangkat ini'
				],
				correct_answer_index: 1,
				explanation:
					'Status `LISTEN` berarti service siap menerima koneksi baru pada alamat tersebut, jadi SSH (22) dan web server (80) sedang berjalan. Statusnya belum `ESTABLISHED`, sehingga bukan berarti sudah ada klien yang terhubung.'
			},
			{
				id: 'network-engineer-b1-q7',
				question: 'Protokol mana yang bekerja di layer Transport dan membuka koneksi lebih dulu lewat *three-way handshake*?',
				options: ['IP', 'ARP', 'TCP', 'ICMP'],
				correct_answer_index: 2,
				explanation:
					'TCP bersifat connection-oriented: SYN, SYN-ACK, lalu ACK sebelum data mengalir, sehingga kehilangan paket bisa diketahui dan dikirim ulang. IP dan ARP bekerja di layer bawah, sedangkan ICMP menopang perintah `ping`.'
			},
			{
				id: 'network-engineer-b1-q8',
				question:
					'Semua komputer di satu ruangan mati total karena lampu di port switch ikut padam. Layer mana yang wajib kamu periksa pertama?',
				options: [
					'Layer 7 (Application)',
					'Layer 5 (Session)',
					'Layer 3 (Network)',
					'Layer 1 (Physical)'
				],
				correct_answer_index: 3,
				explanation:
					'Lampu port padam adalah gejala fisik, jadi layer 1 adalah titik paling masuk akal untuk dicek: kabel, konektor, power switch, atau port itu sendiri. Mengecek DNS atau IP di kondisi seperti ini hanya membuang waktu.'
			},
			{
				id: 'network-engineer-b1-q9',
				question: 'Apa perbedaan utama TCP dan UDP?',
				options: [
					'TCP connection-oriented dengan pengiriman ulang, UDP connectionless dan lebih ringan',
					'TCP hanya dipakai untuk DNS, UDP hanya untuk web',
					'TCP tidak pernah bisa mengirim data berukuran besar',
					'UDP menjamin paket tidak pernah hilang di perjalanan'
				],
				correct_answer_index: 0,
				explanation:
					'TCP membuka koneksi, mengurutkan, dan mengirim ulang paket yang hilang sehingga andal tetapi berat. UDP langsung mengirim tanpa jaminan, sehingga cocok untuk streaming atau DNS yang lebih mengutamakan kecepatan.'
			},
			{
				id: 'network-engineer-b1-q10',
				question: 'Berapa jumlah layer yang dipakai model TCP/IP setelah memadatkan model OSI?',
				options: ['5 layer', '4 layer', '3 layer', 'Tetap 7 layer'],
				correct_answer_index: 1,
				explanation:
					'TCP/IP memadatkan tujuh layer OSI menjadi empat: Network Access, Internet, Transport, dan Application. Layer Session dan Presentation OSI dianggap menempel pada Application, sementara Data Link dan Physical digabung jadi Network Access.'
			}
		]
	},
	{
		id: 44,
		scope_id: 'network-engineer',
		bab_number: 2,
		title: 'Pengalamatan IP & Subnetting (IPv4 & VLSM/CIDR)',
		subtitle: 'IPv4, VLSM & CIDR',
		explanation:
			'Setiap alamat IP terbagi menjadi dua bagian: identitas jaringan dan identitas host di dalamnya, dengan pemisah berupa **subnet mask** seperti `255.255.255.224` atau penulisan singkat `/27`. Semakin besar angka setelah garis miring, semakin sempit jaringannya. Sebagai gambaran, `/24` menyisakan 8 bit sehingga muat 254 host yang bisa dipakai, `/26` menyisakan 6 bit alias 62 host, dan `/27` menyisakan 5 bit alias 30 host. Dua alamat di tiap blok tidak pernah diberikan ke host: yang pertama untuk network address dan yang terakhir untuk broadcast address. Kalau dua komputer punya network address berbeda, mereka tidak bisa saling bicara langsung walau terpasang di satu switch, harus lewat router.\n\nDi lapangan, subnetting dipakai untuk membatasi broadcast supaya jaringan tidak mudah tersendat sekaligus menghemat alamat IP agar tidak terbuang. Saat merancang jaringan kantor, tiap divisi biasanya mendapat subnet sendiri dengan ukuran sesuai kebutuhan: tim penjualan 60 orang cukup `/26`, sedangkan link titik ke titik antar router hanya butuh `/30` yang menyisakan dua host. Cara membagi satu blok besar menjadi beberapa subnet berbeda ukuran seperti ini disebut **VLSM**, sedangkan penulisan `10.0.0.0/8` yang kamu temui di dokumen dan routing table adalah notasi **CIDR**. Kemampuan menghitung jumlah host, rentang, dan broadcast dengan cepat adalah skill yang paling sering diuji saat interview jaringan, jadi biasakan berpikir dengan rumus `2^(32 - prefix) - 2`, bukan sekadar menghafal angka.',
		sections: [
			{
				heading: 'Rumus Cepat Subnetting',
				body: 'Jumlah host usable selalu `2^(32 - prefix) - 2`, blok subnet selalu kelipatan kuat dua (128, 64, 32, 16, 8, 4), dan broadcast address selalu alamat terakhir sebelum blok berikutnya dimulai. Contoh `/26`: bloknya 64, sehingga jaringannya berada di .0, .64, .128, dan .192 pada satu oktet.'
			}
		],
		code_snippet: `# Rincikan alamat beserta subnetnya
$ ipcalc 192.168.10.35/27
Address:   192.168.10.35
Netmask:   255.255.255.224 = 27
Network:   192.168.10.32/27
HostMin:   192.168.10.33
HostMax:   192.168.10.62
Broadcast: 192.168.10.63
Hosts/Net: 30

# Cek cepat jumlah host usable sebuah prefix
$ python3 -c "print(2**(32-26)-2)"
62`,
		code_lang: 'bash',
		code_caption: 'ipcalc & python — memeriksa rentang, broadcast, dan jumlah host',
		image_url: '/diagrams/network-engineer-b2.svg',
		diagram_caption:
			'Gambar 44.1: Cara membaca alamat IPv4 dan CIDR, contoh pembagian subnet VLSM, serta empat langkah menghitung subnet.',
		key_points: [
			'IP terbagi menjadi bagian jaringan dan bagian host; subnet mask-lah yang memisah keduanya.',
			'Jumlah host usable = 2^(32 - prefix) − 2 karena network address dan broadcast tidak dipakai host.',
			'VLSM memberi prefix sesuai kebutuhan tiap subnet supaya alamat IP tidak terbuang.'
		],
		quiz: [
			{
				id: 'network-engineer-b2-q1',
				question: 'Sebuah jaringan memakai CIDR `/27`. Berapa <u>host yang bisa dipakai</u> (usable) di jaringan itu?',
				options: ['30 host', '32 host', '62 host', '28 host'],
				correct_answer_index: 0,
				explanation:
					'`/27` menyisakan 32 − 27 = 5 bit untuk host, jadi 2^5 = 32 alamat. Dua di antaranya dipakai untuk network address dan broadcast, sehingga yang usable tinggal 32 − 2 = 30 host.'
			},
			{
				id: 'network-engineer-b2-q2',
				question: 'Sebuah divisi berisi 60 perangkat. Prefix VLSM paling hemat yang tetap muat untuk mereka adalah?',
				options: ['/24 — 254 host', '/25 — 126 host', '/26 — 62 host', '/27 — 30 host'],
				correct_answer_index: 2,
				explanation:
					'`/26` menyisakan 6 bit host sehingga 2^6 − 2 = 62 alamat usable, pas untuk 60 perangkat dengan sisa dua alamat. `/24` dan `/25` jelas kebanyakan alias boros, sedangkan `/27` hanya 30 host sehingga tidak cukup.'
			},
			{
				id: 'network-engineer-b2-q3',
				question: 'Apa fungsi **broadcast address** pada satu segmen jaringan?',
				options: [
					'IP yang dipegang router sebagai gateway default',
					'Alamat pertama yang selalu dipakai server DHCP',
					'Alamat identitas jaringan yang tidak boleh diberikan ke host',
					'Alamat tujuan yang dikirim ke seluruh host dalam satu segmen'
				],
				correct_answer_index: 3,
				explanation:
					'Broadcast address (bit host semuanya 1) dipakai saat sebuah paket memang ditujukan ke semua perangkat di segmen, misalnya pada proses DHCP. Alamat itu sendiri tidak boleh dipakai host, sedangkan gateway hanyalah IP host biasa yang kebetulan dipegang router.'
			},
			{
				id: 'network-engineer-b2-q4',
				question:
					'Dua komputer terpasang di switch yang sama tapi saling `ping` gagal total. Setelah dicek, ternyata keduanya berada di subnet berbeda. Mengapa?',
				options: [
					'Karena MAC address keduanya sama sehingga saling bentrok',
					'Karena network address berbeda, jadi tetap butuh router sebagai perantara',
					'Karena switch tidak mendukung komunikasi dua arah',
					'Karena keduanya belum menginstal driver jaringan'
				],
				correct_answer_index: 1,
				explanation:
					'Beda network berarti beda jaringan logis walau kabel fisiknya satu. Paket antar subnet harus melewati router, sehingga tanpa gateway keduanya tetap tidak bisa bicara. Masalah ini bukan soal MAC, driver, maupun kemampuan switch.'
			},
			{
				id: 'network-engineer-b2-q5',
				question: 'Berdasarkan informasi berikut, berapa jumlah host usable dan rentangnya?',
				code: `Address:   192.168.1.0\nNetmask:   255.255.255.240 = 28\nNetwork:   192.168.1.0/28\nBroadcast: 192.168.1.15`,
				code_lang: 'bash',
				code_caption: 'ipcalc 192.168.1.0/28',
				options: [
					'16 host, seluruh rentang 192.168.1.0 sampai 192.168.1.15',
					'12 host, rentang 192.168.1.2 sampai 192.168.1.13',
					'14 host, rentang 192.168.1.1 sampai 192.168.1.14',
					'30 host, rentang 192.168.1.1 sampai 192.168.1.30'
				],
				correct_answer_index: 2,
				explanation:
					'`/28` menyisakan 4 bit, jadi 2^4 = 16 alamat. Dikurangi network address `192.168.1.0` dan broadcast `192.168.1.15`, tersisa 14 host dengan rentang `.1` sampai `.14`.'
			},
			{
				id: 'network-engineer-b2-q6',
				question: 'Apa broadcast address dari jaringan `10.1.5.0/28`?',
				options: ['10.1.5.15', '10.1.5.31', '10.1.5.16', '10.1.5.0'],
				correct_answer_index: 0,
				explanation:
					'`/28` berarti blok sebesar 16 alamat, jadi jaringannya berada di `10.1.5.0` sampai `10.1.5.15`. Alamat terakhir dalam blok itulah broadcast, sedangkan `.16` adalah jaringan berikutnya dan `.0` adalah network address.'
			},
			{
				id: 'network-engineer-b2-q7',
				question: 'Apa arti notasi CIDR `10.0.0.0/8`?',
				options: [
					'Jaringan yang hanya boleh diisi 8 host',
					'Jaringan dengan subnet mask 255.255.0.0',
					'Blok yang berisi 8 subnet kecil',
					'Subnet mask 255.0.0.0 dengan sisa 24 bit untuk host'
				],
				correct_answer_index: 3,
				explanation:
					'Angka setelah garis miring adalah jumlah bit jaringan, sehingga `/8` berarti subnet mask `255.0.0.0`. Sisa 32 − 8 = 24 bit dipakai host, jadi blok ini sangat luas dan lazim dipakai untuk jaringan privat internal perusahaan.'
			},
			{
				id: 'network-engineer-b2-q8',
				question: 'Apa keuntungan utama menerapkan VLSM di sebuah jaringan kantor?',
				options: [
					'Menambah kecepatan fisik kabel dan port switch',
					'Mengalokasikan prefix sesuai kebutuhan sehingga alamat IP tidak terbuang',
					'Menghapus kebutuhan router sama sekali',
					'Menggantikan fungsi DNS agar nama domain cepat teresolusi'
				],
				correct_answer_index: 1,
				explanation:
					'VLSM membuat tiap segmen mendapat ukuran yang pas: tim kecil tidak perlu menghabiskan blok `/24` yang hanya dipakai sedikit alamat. Hasilnya alamat hemat dan broadcast lebih terkendali, tetapi routing tetap dibutuhkan.'
			},
			{
				id: 'network-engineer-b2-q9',
				question: 'Berdasarkan output berikut, berapa network address dari komputer tersebut?',
				code: `2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500\n    inet 192.168.10.45/27 brd 192.168.10.63 scope global eth0`,
				code_lang: 'bash',
				code_caption: 'ip a show eth0',
				options: ['192.168.10.32', '192.168.10.0', '192.168.10.45', '192.168.10.63'],
				correct_answer_index: 0,
				explanation:
					'`/27` berarti blok 32 alamat, dan `192.168.10.45` jatuh di blok `.32` sampai `.63`, sehingga network address-nya `192.168.10.32`. `.0` adalah blok sebelumnya, `.45` adalah alamat host itu sendiri, dan `.63` adalah broadcast.'
			},
			{
				id: 'network-engineer-b2-q10',
				question:
					'Kamu perlu menghubungkan dua router dengan satu kabel point-to-point. Prefix paling hemat yang sebaiknya dipakai?',
				options: ['/27 — 30 host', '/30 — 2 host usable', '/24 — 254 host', '/28 — 14 host'],
				correct_answer_index: 1,
				explanation:
					'`/30` menyisakan 2 bit, sehingga 2^2 = 4 alamat dengan 2 yang usable, persis cukup untuk satu interface di tiap ujung link. Memakai `/24` hanya untuk dua titik membuang 252 alamat secara percuma.'
			}
		]
	},
	{
		id: 45,
		scope_id: 'network-engineer',
		bab_number: 3,
		title: 'Switching & VLAN Configuration',
		subtitle: 'VLAN & Trunking',
		explanation:
			'Switch bekerja di layer 2 dan membuat keputusan berdasarkan **alamat MAC**. Saat frame pertama masuk, switch mencatat MAC pengirim berada di port yang mana, sehingga pengiriman berikutnya cukup diarahkan ke port tujuan alih-alih disebarkan ke semua port. Kelemahannya, satu switch fisik berarti satu broadcast domain: ARP dan iklan jaringan dari seluruh perangkat beredar ke mana-mana, membuat trafik membengkak dan batas keamanannya longgar. Di sinilah **VLAN** masuk: satu switch dibagi menjadi beberapa jaringan logis, misalnya VLAN 10 untuk keuangan dan VLAN 20 untuk tim lapangan, tanpa perlu membeli perangkat tambahan.\n\nSetelah VLAN dibuat, kamu perlu mengatur dua hal berikutnya: pembagian port dan penghubung antar-VLAN. Port yang menuju komputer biasanya diset *access mode* pada satu VLAN saja, sedangkan kabel penghubung antar switch atau menuju router harus diset *trunk* agar bisa membawa banyak VLAN sekaligus dengan penanda **802.1Q**. Untuk komunikasi antar-VLAN tersedia dua jalur populer: router-on-a-stick lewat satu kabel trunk menuju router virtual, atau L3 switch yang langsung melakukan routing di dalam perangkat. Studi kasus sederhana: kalau PC di VLAN 10 tidak bisa membuka aplikasi server di VLAN 20, cek dulu apakah trunk mengizinkan kedua VLAN tersebut dan apakah gateway tiap subnet sudah punya alamat yang benar.',
		code_snippet: `! Buat VLAN, lalu tempelkan ke sejumlah port access
Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name Keuangan
Switch(config)# interface range g0/1 - 10
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10

! Port menuju router diset trunk 802.1Q
Switch(config)# interface g0/24
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20
Switch(config-if)# switchport trunk native vlan 99`,
		code_lang: 'bash',
		code_caption: 'vlan.cfg — konfigurasi VLAN access dan trunk pada Cisco IOS',
		image_url: '/diagrams/network-engineer-b3.svg',
		diagram_caption:
			'Gambar 45.1: Alur switching — access port memisahkan VLAN 10 dan 20, trunk 802.1Q membawa keduanya, lalu router menghubungkan antar-VLAN.',
		key_points: [
			'Switch membangun tabel MAC dan meneruskan frame di layer 2, sehingga satu switch tanpa VLAN adalah satu broadcast domain.',
			'VLAN memisahkan broadcast secara logis; komunikasi antar-VLAN tetap butuh router atau L3 switch.',
			'Port pengguna diset access, sedangkan jalur antar switch atau ke router diset trunk dengan penanda 802.1Q.'
		],
		quiz: [
			{
				id: 'network-engineer-b3-q1',
				question: 'Apa fungsi utama pembuatan VLAN di sebuah switch?',
				options: [
					'Menggantikan kebutuhan router untuk semua komunikasi',
					'Memisahkan broadcast domain secara logis pada satu switch fisik',
					'Membagi bandwidth port agar semua pengguna kecepatannya sama',
					'Mengubah alamat IP setiap host yang terpasang'
				],
				correct_answer_index: 1,
				explanation:
					'VLAN membatasi broadcast hanya sampai anggota VLAN yang sama sekaligus memisahkan segmen keamanan, semuanya di satu perangkat. Broadcast jadi lebih terkendali, tetapi kecepatan port tidak otomatis dibagi rata dan fungsi routing tetap dibutuhkan.'
			},
			{
				id: 'network-engineer-b3-q2',
				question: 'Perintah mana yang menjadikan port `g0/1` sebagai port akses milik VLAN 10?',
				code: `Switch(config)# vlan 10\nSwitch(config-vlan)# name Keuangan\nSwitch(config)# interface g0/1\nSwitch(config-if)# switchport mode access\nSwitch(config-if)# switchport access vlan 10`,
				code_lang: 'bash',
				code_caption: 'konfigurasi port access VLAN',
				options: [
					'switchport access vlan 10',
					'switchport mode trunk',
					'switchport trunk allowed vlan 10',
					'ip address 192.168.10.1 255.255.255.0'
				],
				correct_answer_index: 0,
				explanation:
					'Perintah `switchport access vlan 10` menempelkan port tersebut ke VLAN 10 setelah mode-nya diset access. `switchport mode trunk` dipakai untuk jalur antar perangkat, sedangkan `ip address` dipakai pada interface L3, bukan pada port access biasa.'
			},
			{
				id: 'network-engineer-b3-q3',
				question: 'Kapan sebuah port switch wajib diset dalam mode trunk?',
				options: [
					'Saat terhubung langsung ke komputer pengguna biasa',
					'Saat menghubungkan dua switch atau menuju router untuk membawa banyak VLAN sekaligus',
					'Saat menghubungkan printer lokal di satu ruangan',
					'Saat kamu mengatur alamat IP statis pada switch'
				],
				correct_answer_index: 3,
				explanation:
					'Trunk memungkinkan satu kabel membawa banyak VLAN dengan penanda 802.1Q, sehingga cocok untuk jalur antar switch atau menuju router. Port yang menuju perangkat pengguna justru harus access agar trafiknya terkunci di satu VLAN.'
			},
			{
				id: 'network-engineer-b3-q4',
				question:
					'PC di VLAN 10 tidak bisa mengakses server di VLAN 20 walau IP-nya sudah diatur pada subnet yang sama. Penyebab paling mungkin?',
				options: [
					'MAC address PC dan server sama sehingga saling bentrok',
					'Alamat IP publik yang tersedia sudah habis',
					'Belum dikonfigurasi jalur routing antar-VLAN',
					'Kabel patch cord terlalu panjang dari standar'
				],
				correct_answer_index: 2,
				explanation:
					'VLAN yang berbeda berarti broadcast domain berbeda, jadi butuh router atau L3 switch untuk meneruskan paket di antaranya. Kecocokan subnet saja tidak cukup tanpa ada gateway yang menghubungkan kedua VLAN.'
			},
			{
				id: 'network-engineer-b3-q5',
				question: 'Berdasarkan cuplikan berikut, apa kesimpulan paling tepat tentang port `g0/24`?',
				code: `Interface  Mode   Encapsulation  Status     Native vlan\ng0/24      trunk  802.1q        trunking   99\n\nVlan allowed on trunk\ng0/24      10,20,99`,
				code_lang: 'bash',
				code_caption: 'show interfaces trunk (cuplikan)',
				options: [
					'Port g0/24 sedang membawa VLAN 10, 20, dan 99 lewat trunk 802.1Q',
					'Port g0/24 hanya terikat pada VLAN 1',
					'Port g0/24 sedang rusak sehingga semua VLAN ditolak',
					'Port g0/24 menghubungkan dua komputer dalam satu VLAN'
				],
				correct_answer_index: 0,
				explanation:
					'Kolom mode menunjukkan `trunk` dan daftar VLAN yang diizinkan berisi 10, 20, serta 99, jadi ketiganya melintasi port itu. Native VLAN 99 berarti frame tanpa tag akan diperlakukan sebagai anggota VLAN 99.'
			},
			{
				id: 'network-engineer-b3-q6',
				question: 'Apa isi dari MAC address table pada sebuah switch?',
				options: [
					'Daftar alamat MAC beserta port tempat belajar frame tersebut',
					'Daftar alamat IP beserta rute tujuannya',
					'Daftar nomor VLAN yang sedang aktif',
					'Daftar pengguna yang sedang login ke switch'
				],
				correct_answer_index: 0,
				explanation:
					'Switch belajar dari alamat sumber setiap frame masuk, lalu mencatatnya bersama port asalnya. Tabel itu yang membuat pengiriman berikutnya bisa langsung diarahkan ke satu port tanpa memboroskan bandwidth ke port lain.'
			},
			{
				id: 'network-engineer-b3-q7',
				question: 'Apa fungsi standar 802.1Q pada sebuah jaringan bertopologi trunk?',
				options: [
					'Menyandi isi frame agar tidak bisa disadap',
					'Mengubah kecepatan negosiasi port secara otomatis',
					'Menandai frame dengan VLAN ID agar bisa melewati trunk dengan benar',
					'Melakukan routing otomatis antar subnet'
				],
				correct_answer_index: 2,
				explanation:
					'802.1Q menambahkan tag berisi VLAN ID pada header frame, sehingga penerima tahu frame itu milik VLAN berapa. Tanpa tag, penerima tidak bisa membedakan VLAN asal dan bisa menaruh frame pada VLAN yang salah.'
			},
			{
				id: 'network-engineer-b3-q8',
				question:
					'Semua perangkat di satu switch dipasang dalam satu VLAN besar tanpa pemisahan. Apa dampaknya?',
				options: [
					'Broadcast domain jadi sangat sempit sehingga trafik hemat',
					'Trafik broadcast otomatis terbatas hanya di tiga port',
					'Keamanan meningkat karena semua saling mengenal',
					'Broadcast menyebar ke seluruh port sehingga trafik membengkak'
				],
				correct_answer_index: 3,
				explanation:
					'Satu VLAN berarti satu broadcast domain penuh, jadi setiap ARP dan iklan jaringan sampai ke semua port. Selain boros bandwidth, semua perangkat juga berada di segmen keamanan yang sama sehingga risikonya lebih tinggi.'
			},
			{
				id: 'network-engineer-b3-q9',
				question: 'Apa kegunaan interface VLAN (SVI) pada sebuah L3 switch?',
				options: [
					'Menggantikan kabel fisik antar switch',
					'Menjadi gateway antar-VLAN langsung di dalam switch',
					'Menambah jumlah port fisik yang tersedia',
					'Mengatur kecepatan tiap port satu per satu'
				],
				correct_answer_index: 1,
				explanation:
					'SVI adalah interface virtual yang diberi alamat IP pada VLAN tertentu dan berfungsi sebagai gateway bagi host di VLAN itu. Dengan SVI di tiap VLAN, L3 switch bisa melakukan routing antar-VLAN tanpa perlu router terpisah.'
			},
			{
				id: 'network-engineer-b3-q10',
				question: 'Urutan perintah yang benar untuk memasukkan port `g0/5` ke VLAN 20 adalah?',
				code: `Switch(config)# vlan 20\nSwitch(config-vlan)# name Operasional\nSwitch(config)# interface g0/5\nSwitch(config-if)# switchport mode access\nSwitch(config-if)# switchport access vlan 20`,
				code_lang: 'bash',
				code_caption: 'memasukkan satu port ke VLAN 20',
				options: [
					'vlan 20, lalu interface g0/5, lalu mode access, lalu access vlan 20',
					'interface g0/5, lalu ip address, lalu vlan 20',
					'switchport access vlan 20 terlebih dahulu sebelum VLAN dibuat',
					'shutdown port dulu, baru membuat VLAN 20'
				],
				correct_answer_index: 0,
				explanation:
					'VLAN harus terlebih dahulu didefinisikan sebelum bisa ditunjuk ke sebuah port, baru setelah itu masuk ke mode interface dan menempelkannya. Perintah `ip address` tidak relevan karena port access bekerja di layer 2.'
			}
		]
	},
	{
		id: 46,
		scope_id: 'network-engineer',
		bab_number: 4,
		title: 'Routing Protocol (Static Routing, OSPF, BGP Dasar)',
		subtitle: 'Statis, OSPF & BGP',
		explanation:
			'Router memilih jalur berdasarkan **routing table**. Kamu bisa mengisinya sendiri lewat *static routing*, misalnya `ip route 192.168.50.0 255.255.255.0 10.0.0.2`, yang cocok untuk jaringan kecil dan stabil karena ringkas, mudah ditebak, dan tidak memakai resource proses. Untuk jaringan besar yang sering berubah, jalur lebih baik diisi otomatis oleh protokol dinamis. **OSPF** adalah pilihan paling umum: protokol interior yang membuat router bertukar informasi *link-state* dengan tetangganya, membangun peta jaringan yang sama, lalu menghitung jalur terbaik dengan algoritma SPF. OSPF bekerja di dalam satu autonomous system dan dibagi ke beberapa area, dengan area 0 sebagai tulang punggung supaya perhitungan tetap ringan.\n\nKalau trafik harus melintasi banyak penyedia layanan, ceritanya berbeda. Di sinilah **BGP** dipakai: protokol antar-domain yang menukar rute antar **autonomous system** berdasarkan nomor AS, bukan sekadar jarak terpendek. BGP lebih peduli pada kebijakan dan hubungan bisnis antar AS, misalnya menolak rute dari pihak tertentu atau memilih jalur lewat penyedia yang lebih murah. Kombinasi yang lazim di perusahaan: rute statis untuk kantor cabang yang hanya punya satu jalur keluar, OSPF untuk mendistribusikan rute di dalam kampus, dan BGP untuk menyambung ke internet atau data center lain. Saat paket gagal sampai, urutan cek yang efisien adalah memastikan rute terdaftar dengan `show ip route`, baru memeriksa apakah tetangga routing masih terdeteksi.',
		sections: [
			{
				heading: 'OSPF vs BGP dalam Satu Kalimat',
				body: 'OSPF menghitung jalur terbaik **di dalam** satu autonomous system dengan peta link-state, sedangkan BGP menukar rute **antar** autonomous system berdasarkan kebijakan dan hubungan bisnis. Karena itu OSPF cocok untuk kampus, sementara BGP dipakai untuk menyambung jaringan ke penyedia internet.'
			}
		],
		code_snippet: `! Rute statis menuju jaringan cabang
Router(config)# ip route 192.168.50.0 255.255.255.0 10.0.0.2

! Aktifkan OSPF dan ikutkan interface ke area 0
Router(config)# router ospf 1
Router(config-router)# network 10.0.0.0 0.0.0.3 area 0
Router(config-router)# network 192.168.10.0 0.0.0.255 area 0
Router(config-router)# passive-interface default

! BGP dasar dengan tetangga di AS lain
Router(config)# router bgp 65010
Router(config-router)# neighbor 203.0.113.2 remote-as 65001
Router(config-router)# network 192.168.10.0 mask 255.255.255.0`,
		code_lang: 'bash',
		code_caption: 'routing.cfg — rute statis, OSPF area 0, dan neighbor BGP',
		image_url: '/diagrams/network-engineer-b4.svg',
		diagram_caption:
			'Gambar 46.1: Rute dari host lokal ke internet — routing statis dan OSPF di dalam jaringan, lalu BGP menuju otonomi sistem lain.',
		key_points: [
			'Static routing diisi manual dan cocok untuk jalur tunggal; OSPF mengisi rute otomatis dengan algoritma SPF di dalam satu AS.',
			'BGP menukar rute antar autonomous system dan mengutamakan kebijakan, bukan sekadar jalur terpendek.',
			'Urutan diagnosa: cek rute terdaftar di routing table dulu, baru cek status tetangga protokol.'
		],
		quiz: [
			{
				id: 'network-engineer-b4-q1',
				question: 'Apa perbedaan pokok antara static routing dan protokol OSPF?',
				options: [
					'Static routing memilih jalur otomatis dengan algoritma SPF',
					'OSPF mengharuskan tiap rute diketik manual satu per satu',
					'Static routing memakai algoritma Dijkstra yang kompleks',
					'Static routing diisi manual, OSPF mendistribusikan rute secara otomatis'
				],
				correct_answer_index: 3,
				explanation:
					'Rute statis harus dibuat dan dipelihara administrator, sedangkan OSPF membuat router bertukar informasi lalu menghitung rute sendiri. Dijkstra dipakai oleh OSPF untuk menghitung jalur terbaik, bukan oleh rute statis.'
			},
			{
				id: 'network-engineer-b4-q2',
				question: 'Berdasarkan routing table berikut, ke mana paket tujuan `10.1.2.9` diteruskan?',
				code: `S*  0.0.0.0/0       via 203.0.113.1\nS   10.0.0.0/8      via 172.16.0.1\nS   10.1.0.0/16     via 192.168.10.254\nC   192.168.10.0/24  is directly connected`,
				code_lang: 'bash',
				code_caption: 'show ip route (cuplikan)',
				options: [
					'Ke 192.168.10.254 karena 10.1.0.0/16 adalah rute yang paling spesifik',
					'Ke 172.16.0.1 karena 10.0.0.0/8 lebih luas sehingga lebih aman',
					'Ke 203.0.113.1 karena rute default selalu menang',
					'Dibuang karena 10.1.2.9 tidak terdaftar secara persis'
				],
				correct_answer_index: 0,
				explanation:
					'Router memakai aturan *longest prefix match*: di antara semua rute yang cocok, `/16` lebih spesifik daripada `/8` dan `/0`, jadi paket diteruskan lewat `192.168.10.254`. Rute default baru dipakai ketika tidak ada rute lain yang cocok.'
			},
			{
				id: 'network-engineer-b4-q3',
				question: 'Apa fungsi area 0 dalam protokol OSPF?',
				options: [
					'Area cadangan ketika area utama mengalami gangguan',
					'Area khusus yang hanya dipakai untuk jaringan IPv6',
					'Area backbone tempat seluruh area lain saling terhubung',
					'Area khusus untuk menggabungkan seluruh VLAN'
				],
				correct_answer_index: 2,
				explanation:
					'Dalam OSPF, semua area wajib terhubung ke area 0 yang berperan sebagai tulang punggung penghubung. Area lain seperti area 1 dan 2 tidak boleh saling lewat tanpa melewati area 0, karena itu pula area 0 harus selalu stabil.'
			},
			{
				id: 'network-engineer-b4-q4',
				question: 'Protokol BGP bekerja di lingkup seperti apa?',
				options: [
					'Hanya di dalam satu LAN kecil dengan satu switch',
					'Antar autonomous system berdasarkan nomor AS',
					'Khusus untuk jaringan nirkabel saja',
					'Hanya dipakai ketika kabel jaringan terputus'
				],
				correct_answer_index: 1,
				explanation:
					'BGP adalah protokol antar-domain yang menukar rute antar autonomous system, contohnya antara jaringan kampus dengan penyedia internet. Untuk pengaturan rute di dalam satu LAN atau kampus, yang lazim dipakai adalah OSPF atau rute statis.'
			},
			{
				id: 'network-engineer-b4-q5',
				question: 'Berdasarkan output berikut, bagaimana status hubungan OSPF dengan router tetangga?',
				code: `Router# show ip ospf neighbor\nNeighbor ID     Pri  State     Dead Time   Address       Interface\n203.0.113.2       1  FULL/DR   00:00:34   203.0.113.2   Gig0/0`,
				code_lang: 'bash',
				code_caption: 'show ip ospf neighbor',
				options: [
					'OSPF sedang down karena tetangga tidak dikenal sama sekali',
					'Baru memulai proses hello pertama kali',
					'Hanya terjadi pertukaran rute satu arah',
					'State FULL, artinya adjacency OSPF sudah terbentuk sempurna'
				],
				correct_answer_index: 3,
				explanation:
					'Status `FULL` menandakan database link-state sudah tersinkronisasi dengan tetangga sehingga rute boleh ditukar. Kalau statusnya `INIT` atau `2WAY`, proses negosiasi masih berjalan, sedangkan `DOWN` berarti tetangga tidak terdeteksi sama sekali.'
			},
			{
				id: 'network-engineer-b4-q6',
				question: 'Situasi apa yang paling cocok memakai static routing dibanding protokol dinamis?',
				options: [
					'Jaringan kecil dengan satu-satunya jalur keluar yang jarang berubah',
					'Kampus besar dengan ratusan router yang sering berubah',
					'Perhubungan antara dua penyedia internet berbeda',
					'Jaringan yang seluruh routenya harus dihitung otomatis'
				],
				correct_answer_index: 0,
				explanation:
					'Kalau jalurnya cuma satu dan jarang berubah, rute statis lebih ringkas, hemat resource, dan tidak menimbulkan lalu lintas routing tambahan. Untuk topologi besar dan dinamis, OSPF justru jauh lebih praktis dan mudah dipelihara.'
			},
			{
				id: 'network-engineer-b4-q7',
				question: 'Apa yang dimaksud dengan autonomous system number (ASN) dalam BGP?',
				options: [
					'Nomor port khusus yang dipakai router BGP',
					'Pengenal unik yang membedakan satu domain routing dari yang lain',
					'Alamat MAC khusus untuk perangkat router',
					'Tipe kabel yang dipakai antar penyedia layanan'
				],
				correct_answer_index: 1,
				explanation:
					'ASN adalah nomor yang menandai satu administrasi routing, misalnya nomor AS milik operator internet atau perusahaan. BGP memakai ASN untuk menentukan rute mana dari AS mana, bukan berdasarkan jarak fisik.'
			},
			{
				id: 'network-engineer-b4-q8',
				question: 'Kapan rute default `0.0.0.0/0` dipakai oleh router untuk meneruskan paket?',
				options: [
					'Selalu lebih dulu karena paling spesifik di antara semua rute',
					'Saat semua rute yang ada di tabel dianggap cocok',
					'Ketika tidak ada rute lain yang cocok dengan tujuan paket',
					'Hanya ketika protokol OSPF mengalami kegagalan total'
				],
				correct_answer_index: 2,
				explanation:
					'Rute default adalah rute cadangan terakhir: ia baru dipakai ketika tidak ada entry lain yang cocok dengan alamat tujuan. Jika ada rute yang lebih spesifik seperti `/16`, rute `/0` tersebut kalah menang dalam longest prefix match.'
			},
			{
				id: 'network-engineer-b4-q9',
				question: 'Pada perintah `network 10.0.0.0 0.0.0.3 area 0`, apa fungsi angka `0.0.0.3`?',
				code: `Router(config)# router ospf 1\nRouter(config-router)# network 10.0.0.0 0.0.0.3 area 0\nRouter(config-router)# passive-interface default`,
				code_lang: 'bash',
				code_caption: 'deklarasi jaringan OSPF',
				options: [
					'Wildcard mask yang menandai blok 4 alamat dalam satu jaringan',
					'Subnet mask 255.255.255.252 dalam format CIDR',
					'Nilai metrik khusus OSPF',
					'Broadcast address milik area 0'
				],
				correct_answer_index: 0,
				explanation:
					'Angka kedua pada perintah `network` OSPF adalah wildcard mask, bukan subnet mask. `0.0.0.3` berarti hanya blok 4 alamat yang cocok, umumnya dipakai untuk link point-to-point antar router.'
			},
			{
				id: 'network-engineer-b4-q10',
				question: 'Dalam praktik BGP, apa yang paling menentukan jalur yang dipilih?',
				options: [
					'Jumlah hop paling sedikit antar tujuan',
					'Kekuatan sinyal di media transmisi',
					'Biaya pembelian kabel jaringan',
					'Kebijakan dan hubungan bisnis antar AS, bukan semata jarak'
				],
				correct_answer_index: 3,
				explanation:
					'BGP memakai path attribute seperti LOCAL_PREF, AS-path, dan MED untuk menerapkan kebijakan administratif, sehingga sebuah jalur lebih panjang bisa saja dipilih karena dianggap lebih murah atau lebih tepercaya. Jarak bukan pertimbangan utama.'
			}
		]
	},
	{
		id: 47,
		scope_id: 'network-engineer',
		bab_number: 5,
		title: 'Network Security (Firewall, NAT, VPN)',
		subtitle: 'Firewall, NAT & VPN',
		explanation:
			'Jaringan yang terbuka lebar tanpa pengaman ibarat gedung tanpa pintu. **Firewall** adalah penjaga pintu itu: ia memeriksa tiap paket yang lewat berdasarkan aturan seperti *izinkan trafik keluar ke port 443, blokir semua koneksi masuk dari luar*. Firewall modern bersifat *stateful*, artinya ia menyimpan catatan sesi sehingga paket balasan dari koneksi yang kamu buka sendiri dianggap sah tanpa perlu aturan tambahan. Prinsip dasar yang selalu dianjurkan adalah **default deny**: hanya tujuan dan port yang memang dibutuhkan yang dibuka, sisanya ditutup rapat.\n\nDi sisi pengalamatan, **NAT** memungkinkan banyak perangkat lokal berbagi satu alamat IP publik, dan bentuk paling umum adalah **PAT** yang membedakan tiap koneksi lewat nomor port. Untuk komunikasi jarak jauh, **VPN** menyediakan terowongan terenkripsi: site-to-site IPSec menghubungkan dua kantor secara permanen, sedangkan VPN berbasis TLS dipakai pengguna remote. Studi kasus nyata: karyawan yang bekerja dari rumah tidak bisa membuka aplikasi internal `10.20.0.15:8080` karena alamat itu bersifat privat. Solusinya bukan mengekspos server ke publik, melainkan memasang VPN client lalu mengaksesnya lewat terowongan. Ingat juga bahwa firewall hanya sebaik aturannya: satu baris `allow any any` di posisi teratas sudah membuat seluruh aturan setelahnya percuma.',
		code_snippet: `# Default deny pada forwarding, kecuali koneksi yang sudah terbuka
$ sudo iptables -P FORWARD DROP
$ sudo iptables -A FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT

# Izinkan trafik web dari segmen lokal saja
$ sudo iptables -A FORWARD -s 192.168.10.0/24 -p tcp --dport 443 -j ACCEPT

# PAT: satu IP publik untuk seluruh host internal
$ sudo iptables -t nat -A POSTROUTING -s 192.168.10.0/24 -o eth0 -j MASQUERADE

# Simpan dan tinjau aturan yang berlaku
$ sudo iptables-save > /etc/iptables/rules.v4
$ sudo iptables -L -n -v`,
		code_lang: 'bash',
		code_caption: 'firewall.sh — aturan iptables: default deny, stateful, dan PAT',
		image_url: '/diagrams/network-engineer-b5.svg',
		diagram_caption:
			'Gambar 47.1: Rantai pertahanan jaringan — firewall menyaring, NAT menerjemahkan, VPN mengenkripsi, inspeksi memeriksa, lalu log mencatat.',
		key_points: [
			'Firewall stateful memantau sesi koneksi; prinsip default deny menutup semua kecuali yang diizinkan eksplisit.',
			'NAT/PAT membuat banyak host lokal berbagi satu IP publik, sementara VPN menyediakan terowongan terenkripsi.',
			'Urutan aturan menentukan hasil: satu aturan izinkan semuanya di posisi atas membuat aturan lain percuma.'
		],
		quiz: [
			{
				id: 'network-engineer-b5-q1',
				question: 'Apa artinya firewall dikatakan bersifat *stateful*?',
				options: [
					'Firewall hanya menyaring berdasarkan nomor port tujuan',
					'Firewall bekerja khusus di layer 1 tanpa membaca alamat',
					'Firewall menyimpan catatan sesi sehingga paket balasan yang sah diizinkan tanpa aturan tambahan',
					'Firewall memblokir seluruh trafik keluar dari jaringan'
				],
				correct_answer_index: 2,
				explanation:
					'Stateful firewall mencatat koneksi yang kamu buka, misalnya permintaan TCP ke port 443, lalu mengizinkan paket balasan dari port tersebut secara otomatis. Dengan begitu kamu tidak perlu menulis dua aturan untuk tiap koneksi dua arah.'
			},
			{
				id: 'network-engineer-b5-q2',
				question: 'Keunggulan PAT (Port Address Translation) dibanding NAT statis biasa?',
				options: [
					'Setiap host lokal mendapat satu IP publik pribadi',
					'Menggantikan kebutuhan DNS server sepenuhnya',
					'Menghapus kebutuhan router di jaringan lokal',
					'Banyak host lokal bisa berbagi satu IP publik dengan pembeda nomor port'
				],
				correct_answer_index: 3,
				explanation:
					'PAT membedakan koneksi dari tiap host lewat nomor port sumber yang unik, sehingga satu IP publik bisa melayani ratusan perangkat. NAT statis biasa hanya memetakan satu alamat lokal ke satu alamat publik sehingga jauh lebih boros.'
			},
			{
				id: 'network-engineer-b5-q3',
				question: 'Apa maksud dari kebijakan *default deny* pada sebuah firewall?',
				options: [
					'Hanya trafik yang diizinkan secara eksplisit yang boleh lewat, sisanya ditutup',
					'Izinkan semuanya dulu, lalu blokir yang terdeteksi berbahaya',
					'Blokir seluruh trafik keluar tanpa kecuali',
					'Abaikan aturan lama ketika aturan baru ditambahkan'
				],
				correct_answer_index: 0,
				explanation:
					'Default deny berarti tidak ada lubang yang tidak kamu rencanakan: layanan baru tetap tertutup sampai kamu membukanya sendiri. Pola sebaliknya justru membahayakan karena setiap port yang lupa ditutup langsung terbuka untuk publik.'
			},
			{
				id: 'network-engineer-b5-q4',
				question: 'VPN site-to-site berbasis IPSec umumnya dipakai untuk kebutuhan apa?',
				options: [
					'Mengakses situs publik tanpa lewat proxy',
					'Menghubungkan dua lokasi kantor secara permanen dan terenkripsi',
					'Menggantikan fungsi switch di lantai kantor',
					'Membuka port router agar bisa diakses dari internet'
				],
				correct_answer_index: 1,
				explanation:
					'Site-to-site IPSec membangun terowongan enkripsi antara dua gateway sehingga seluruh trafik antar dua kantor terasa seperti berada di jaringan yang sama. Untuk pengguna individual, yang lazim dipakai adalah VPN client berbasis TLS.'
			},
			{
				id: 'network-engineer-b5-q5',
				question: 'Apa efek dari urutan dua aturan berikut?',
				code: `$ sudo iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT\n$ sudo iptables -A INPUT -p tcp --dport 22 -j DROP`,
				code_lang: 'bash',
				code_caption: 'aturan iptables untuk port SSH',
				options: [
					'SSH dari semua alamat diizinkan tanpa pengecualian',
					'SSH dari luar jaringan diizinkan lebih dulu',
					'Hanya SSH dari jaringan 10.0.0.0/8 yang diizinkan, selain itu ditutup',
					'Port 22 ditutup total untuk semua sumber'
				],
				correct_answer_index: 2,
				explanation:
					'Aturan dibaca berurutan: paket dari `10.0.0.0/8` cocok pada baris pertama dan langsung diizinkan, sedangkan sisanya jatuh ke baris kedua dan dibuang. Inilah alasan mengapa urutan aturan sama pentingnya dengan isinya.'
			},
			{
				id: 'network-engineer-b5-q6',
				question: 'Port mana yang umum dipakai oleh VPN berbasis TLS seperti OpenVPN sebagai alternatif?',
				options: ['Port 21', 'Port 25', 'Port 69', 'Port 443'],
				correct_answer_index: 3,
				explanation:
					'Port 443 dipakai HTTPS, sehingga trafik VPN di atasnya sulit dibedakan dan jarang diblokir oleh firewall kantor. Port 21 untuk FTP, 25 untuk SMTP, dan 69 untuk TFTP, semuanya tidak berkaitan dengan VPN.'
			},
			{
				id: 'network-engineer-b5-q7',
				question:
					'Jika sebuah aturan `allow any any` ditempatkan di posisi teratas pada daftar aturan firewall, apa konsekuensinya?',
				options: [
					'Keamanan tetap terjaga karena semua trafik tetap diperiksa',
					'Seluruh aturan setelahnya menjadi tidak berarti karena trafik sudah diizinkan duluan',
					'Firewall jadi memproses paket lebih lambat dari biasanya',
					'Tidak ada efek karena aturan selalu diurutkan otomatis'
				],
				correct_answer_index: 1,
				explanation:
					'Firewall menilai aturan dari atas ke bawah dan berhenti pada yang pertama cocok. Begitu `allow any any` cocok, semua aturan pembatas di bawahnya tidak pernah sempat dijalankan.'
			},
			{
				id: 'network-engineer-b5-q8',
				question:
					'Sebuah jaringan rumah hanya memiliki satu alamat IP publik dan tidak memakai NAT sama sekali. Apa risikonya?',
				options: [
					'Perangkat lokal tidak mendapat alamat sehingga tidak bisa terhubung',
					'MAC address setiap host jadi hilang dari tabel switch',
					'Layanan DNS lokal berhenti melayani permintaan',
					'Semua port switch otomatis dalam keadaan shutdown'
				],
				correct_answer_index: 0,
				explanation:
					'Alamat IP publik hanya bisa dipakai satu perangkat pada satu waktu, sehingga tanpa NAT perangkat lain sama sekali tidak punya alamat yang valid untuk berkomunikasi. Masalah ini bukan soal MAC, DNS, atau status port switch.'
			},
			{
				id: 'network-engineer-b5-q9',
				question:
					'Pada output `iptables -L -n`, terlihat kebijakan (policy) pada chain FORWARD adalah `DROP`. Apa artinya?',
				code: `Chain FORWARD (policy DROP)\nnum  target  prot opt source        destination\n1    ACCEPT  tcp  --  192.168.10.0/24  0.0.0.0/0  tcp dpt:443`,
				code_lang: 'bash',
				code_caption: 'iptables -L -n -v (cuplikan)',
				options: [
					'Seluruh trafik termasuk yang keluar otomatis diizinkan',
					'Trafik masuk dari semua alamat langsung ditolak semua',
					'Paket yang tidak cocok dengan aturan mana pun pada chain itu akan dibuang',
					'Chain sedang dimatikan sehingga tidak memproses paket'
				],
				correct_answer_index: 2,
				explanation:
					'Policy berlaku sebagai aturan terakhir: hanya paket yang cocok pada aturan dalam tabel yang diizinkan, sisanya mengikuti `DROP`. Itulah inti default deny yang membuat trafik tak dikenal otomatis dibuang.'
			},
			{
				id: 'network-engineer-b5-q10',
				question: 'Apa jaminan utama yang diberikan oleh enkripsi pada sebuah VPN?',
				options: [
					'Kerahasiaan dan integritas data selama dalam perjalanan',
					'Penambahan jumlah IP publik yang tersedia',
					'Pembukaan semua port secara otomatis',
					'Percepatan resolusi nama domain'
				],
				correct_answer_index: 0,
				explanation:
					'Enkripsi membuat isi paket tidak terbaca oleh pihak yang menyadap di jalan, sedangkan autentikasi memastikan paket tidak diubah di tengah perjalanan. VPN tidak menambah IP publik, membuka port, maupun mempercepat DNS.'
			}
		]
	},
	{
		id: 48,
		scope_id: 'network-engineer',
		bab_number: 6,
		title: 'Network Protocols & Diagnostics (DHCP, DNS, Ping, Traceroute, Wireshark)',
		subtitle: 'DHCP, DNS & Diagnosa',
		explanation:
			'Saat laptop baru menyala di kantor, **DHCP** langsung menyapa lewat empat tahap: *discover*, *offer*, *request*, dan *ack*, lalu memberi IP, subnet mask, gateway, dan DNS dalam satu kali jalan. Kalau proses ini gagal, perangkat akan memakai alamat privat sementara `169.254.x.x` yang menandakan dia tidak mendapat konfigurasi sama sekali. Setelah punya alamat, **DNS** bekerja seperti buku telepon internet: resolver lokal bertanya ke nameserver rekursif, dan bila belum ada di cache ia menelusuri root, TLD, sampai authoritative nameserver. Protokol kecil lain seperti **ARP** menerjemahkan IP ke MAC di segmen lokal, sedangkan **ICMP** menopang perintah `ping` serta pesan seperti destination unreachable.\n\nUntuk diagnosa, urutan yang paling hemat waktu tetap dari bawah ke atas. `ping` ke IP dulu untuk menguji konektivitas mentah, `traceroute` untuk melihat di hop ke berapa paket berhenti, `dig` atau `nslookup` untuk menguji resolusi nama, `netstat` untuk melihat port, dan **Wireshark** atau `tcpdump` kalau kamu perlu melihat isi paket sebenarnya. Pola klasik yang sering bikin bingung: `nslookup example.com` sukses tapi `ping` ke IP-nya gagal terus, artinya DNS sehat dan masalahnya ada di layer 3 seperti routing atau firewall. Sebaliknya, `ping 8.8.8.8` sukses tapi nama domain gagal berarti jaringan jalan, yang bermasalah hanya DNS. Bedakan juga pesan host unreachable dengan request timed out karena keduanya menunjuk ke masalah yang berbeda.',
		sections: [
			{
				heading: 'Urutan Diagnosa dari Bawah ke Atas',
				body: 'Cek link fisik dan `ip a` dulu, lalu ping gateway lokal, `dig nama.com` untuk DNS, `traceroute` kalau jalur putus, dan baru tangkap paket dengan `tcpdump` atau Wireshark kalau semua langkah sebelumnya sehat. Dengan urutan ini kamu tidak akan mengutak-atik DNS padahal masalahnya ada di kabel.'
			}
		],
		code_snippet: `# 1. Konektivitas mentah tanpa lewat DNS
$ ping -c 3 8.8.8.8
64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=12.4 ms

# 2. Lihat di hop ke berapa jalur berhenti
$ traceroute -n example.com
 1  192.168.10.1   1.1 ms
 2  100.64.0.1     8.9 ms
 3  * * *

# 3. Uji resolusi nama
$ dig +short example.com
93.184.216.34
# 4. Tangkap paket DNS yang keluar
$ sudo tcpdump -i eth0 port 53 -nn`,
		code_lang: 'bash',
		code_caption: 'diagnosa.sh — urutan ping, traceroute, dig, dan tcpdump',
		image_url: '/diagrams/network-engineer-b6.svg',
		diagram_caption:
			'Gambar 48.1: Urutan diagnosa jaringan — ping uji hidup, traceroute jejak rute, cek DNS, cek DHCP, lalu Wireshark untuk detail paket.',
		key_points: [
			'DHCP memberi alamat lewat proses DORA, DNS menerjemahkan nama domain, dan ICMP menopang ping.',
			'Diagnosa dari bawah ke atas: link, alamat IP, gateway, DNS, baru port aplikasi.',
			'Nama teresolusi tapi ping IP gagal berarti masalah di konektivitas layer 3, bukan di DNS.'
		],
		quiz: [
			{
				id: 'network-engineer-b6-q1',
				question: 'Bagaimana urutan proses yang benar saat sebuah perangkat meminta alamat IP lewat DHCP?',
				options: [
					'Ack, Offer, Request, Discover',
					'Discover, Offer, Request, Ack',
					'Request, Ack, Discover, Offer',
					'Offer, Discover, Ack, Request'
				],
				correct_answer_index: 1,
				explanation:
					'Perangkat membroadcast *discover*, server menjawab *offer*, perangkat mengirim *request* untuk menerima tawaran, lalu server mengonfirmasi dengan *ack*. Urutan ini dikenal sebagai proses DORA.'
			},
			{
				id: 'network-engineer-b6-q2',
				question: 'Record DNS jenis apa yang memetakan nama domain ke alamat IPv4?',
				options: ['CNAME', 'MX', 'A', 'TXT'],
				correct_answer_index: 2,
				explanation:
					'Record **A** dipakai untuk nama domain ke IPv4, sedangkan **AAAA** untuk IPv6. CNAME membuat alias ke nama lain, MX untuk server email, dan TXT untuk verifikasi seperti SPF dan DKIM.'
			},
			{
				id: 'network-engineer-b6-q3',
				question:
					'Sebuah adapter menampilkan alamat `169.254.10.20` setelah tersambung ke jaringan. Apa kesimpulannya?',
				options: [
					'Gagal mendapat konfigurasi dari DHCP sehingga hanya link-local',
					'Alamat IP publik yang sah dari penyedia internet',
					'Konfigurasi gateway sudah benar dan siap dipakai',
					'Layanan DNS sudah aktif pada adapter tersebut'
				],
				correct_answer_index: 0,
				explanation:
					'Alamat `169.254.x.x` (APIPA) dibuat otomatis oleh sistem ketika tidak ada server DHCP yang menjawab. Dengan alamat ini perangkat hanya bisa bicara di segmennya sendiri, bukan ke jaringan yang lebih luas.'
			},
			{
				id: 'network-engineer-b6-q4',
				question:
					'<u>`ping 8.8.8.8` sukses</u>, tapi `nslookup example.com` selalu gagal. Di mana masalahnya?',
				options: [
					'Kabel atau switch pada lapisan fisik',
					'Alamat IP host yang belum terkonfigurasi',
					'Gateway default yang belum ada di routing table',
					'Layanan DNS atau konfigurasi DNS yang bermasalah'
				],
				correct_answer_index: 3,
				explanation:
					'Ping ke IP publik sukses berarti jalur fisik sampai layer 3 sehat. Yang gagal adalah penerjemahan nama ke IP, tugas DNS, sehingga titik perbaikannya ada di resolver atau server DNS.'
			},
			{
				id: 'network-engineer-b6-q5',
				question: 'Apa kesimpulan paling tepat dari output ping berikut?',
				code: `$ ping 192.168.10.1\nPING 192.168.10.1 (192.168.10.1) 56(84) bytes of data.\n\n--- 192.168.10.1 ping statistics ---\n4 packets transmitted, 0 received, 100% packet loss`,
				code_lang: 'bash',
				code_caption: 'ping ke gateway lokal',
				options: [
					'Host tujuan hidup tapi port aplikasinya tertutup',
					'Tidak ada balasan sama sekali, artinya koneksi ke tujuan gagal',
					'Nama domain belum berhasil diterjemahkan ke IP',
					'TTL terlalu rendah sehingga paket dibuang di jalan'
				],
				correct_answer_index: 1,
				explanation:
					'Semua paket hilang dengan `0 received`, jadi tidak ada jawaban ICMP sama sekali: bisa karena host mati, IP salah, link down, atau firewall memblokir. Opsi port tertutup dan DNS tidak relevan karena tujuan di sini sudah berupa IP, bukan nama domain.'
			},
			{
				id: 'network-engineer-b6-q6',
				question:
					'Berdasarkan cuplikan traceroute berikut, apa yang paling tepat disimpulkan?',
				code: ` 1  192.168.10.1    1.4 ms\n 2  100.64.0.1      9.2 ms\n 3  * * *\n 4  * * *`,
				code_lang: 'bash',
				code_caption: 'traceroute example.com',
				options: [
					'Hop 1 dan 2 bermasalah sehingga paket tidak sampai',
					'Output menunjukkan koneksi sempurna tanpa gangguan',
					'Jalur terverifikasi sampai hop 2, setelahnya tidak ada jawaban',
					'DNS belum teresolusi sehingga traceroute langsung berhenti'
				],
				correct_answer_index: 2,
				explanation:
					'Kehadiran balasan di hop 1 dan 2 menandakan paket berjalan sejauh itu. Bintang berikutnya bisa berarti perangkat selanjutnya memblokir paket dengan firewall, tapi tetap bisa jadi jalur setelah titik itu memang putus.'
			},
			{
				id: 'network-engineer-b6-q7',
				question: 'Apa fungsi utama Wireshark dalam troubleshooting jaringan?',
				options: [
					'Mengatur alamat IP secara statis pada host',
					'Membagi satu switch menjadi beberapa VLAN',
					'Memantau konfigurasi DHCP server dari jarak jauh',
					'Merekam dan menganalisis isi paket yang melintas di jaringan'
				],
				correct_answer_index: 3,
				explanation:
					'Wireshark adalah alat analisis paket yang merekam trafik lalu menampilkannya per layer, sehingga kamu bisa melihat isi handshake, header, dan payload yang sebenarnya. Fungsi pengaturan IP dan VLAN adalah tugas lain yang tidak dimilikinya.'
			},
			{
				id: 'network-engineer-b6-q8',
				question: 'Mengapa serangan ARP spoofing berbahaya bagi sebuah jaringan lokal?',
				options: [
					'Penyerang memalsukan pemetaan IP ke MAC sehingga trafik bisa diarahkan dan disadap',
					'Penyerang menambah bandwidth upload seluruh host',
					'Seluruh DNS server berhenti merespons permintaan',
					'Semua port switch berubah menjadi mode trunk'
				],
				correct_answer_index: 0,
				explanation:
					'Dengan mengirim balasan ARP palsu, penyerang membuat korban percaya bahwa dirinyalah gateway, sehingga seluruh trafik melewatinya lebih dulu. Ancaman ini mungkin karena ARP tidak punya mekanisme autentikasi bawaan.'
			},
			{
				id: 'network-engineer-b6-q9',
				question: 'Berdasarkan output berikut, apa arti dari status yang ditampilkan?',
				code: `$ dig example.com\n; <<>> DiG 9.18 <<>> example.com\n;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 12345\n;; ANSWER SECTION:\n;; AUTHORITY SECTION:\n. 86400 IN SOA a.root-servers.net. ...`,
				code_lang: 'bash',
				code_caption: 'dig example.com',
				options: [
					'Paket berhasil sampai ke server tetapi port-nya tertutup',
					'Nama domain tidak ditemukan di DNS',
					'Koneksi internet komputer terputus total',
					'Firewall memblokir semua trafik keluar'
				],
				correct_answer_index: 1,
				explanation:
					'`NXDOMAIN` berarti authoritative nameserver memastikan nama yang ditanyakan tidak ada. Kalau koneksi internet putus total, `dig` bahkan tidak akan mendapat balasan apa pun dari nameserver.'
			},
			{
				id: 'network-engineer-b6-q10',
				question:
					'Apa perbedaan antara pesan *request timed out* dan *destination host unreachable* saat melakukan ping?',
				options: [
					'Keduanya selalu menandakan kabel yang putus',
					'Timeout berarti DNS gagal, unreachable berarti port tertutup',
					'Unreachable umumnya datang dari perangkat yang tahu jalurnya tidak ada, timeout berarti tidak ada jawaban sama sekali',
					'Timeout hanya terjadi pada jaringan IPv6'
				],
				correct_answer_index: 2,
				explanation:
					'Pesan unreachable biasanya dikirim perantara yang tahu tujuan tidak dapat dijangkau, sehingga memberi petunjuk lokasi masalah. Timeout justru tidak memberi informasi apa pun karena tidak ada balasan yang sampai kembali.'
			}
		]
	},
	{
		id: 49,
		scope_id: 'network-engineer',
		bab_number: 7,
		title: 'Network Automation dasar dengan Python/Ansible',
		subtitle: 'Otomasi Jaringan',
		explanation:
			'Mengetik konfigurasi yang sama ke 30 switch satu per satu adalah pekerjaan lambat dan rawan salah ketik. **Otomasi jaringan** menggantinya dengan skrip yang bisa dijalankan berulang dengan hasil yang selalu konsisten. Di Python, library seperti **Netmiko** memudahkan kamu membuka sesi SSH ke perangkat, mengirim perintah show atau configure, lalu membaca outputnya untuk dijadikan laporan. Pola dasarnya selalu sama: baca daftar perangkat dari file, buka koneksi, kirim perintah, tangkap output, tutup koneksi. Karena skrip ini berhadapan langsung dengan perangkat produksi, biasakan menjalankannya lebih dulu di lab atau memakai mode read-only sebelum benar-benar mengubah konfigurasi.\n\nAlternatifnya adalah **Ansible** yang bekerja tanpa agen: cukup SSH terbuka, lalu playbook dijalankan ke banyak host sekaligus dari satu inventory. Keunggulannya terletak pada sifat *idempoten*, artinya menjalankan playbook dua kali tidak merusak karena ia hanya memastikan konfigurasi sesuai keinginan, bukan menambah lagi. Studi kasus nyata: mensinkronkan server NTP dan banner login ke seluruh switch kantor pada malam minggu, lalu menjalankan task verifikasi yang membaca `show running-config` dan melaporkan perangkat yang menyimpang. Otomasi yang baik selalu punya tiga tahap: terapkan perubahan, verifikasi hasil, dan siapkan jalur rollback. Dengan begitu automation bukan sekadar mempercepat kerja, tapi juga membuat setiap perubahan jaringan terukur dan mudah dipertanggungjawabkan.',
		code_snippet: `from netmiko import ConnectHandler

sw = {
    "device_type": "cisco_ios",
    "host": "192.168.10.11",
    "username": "admin",
    "password": "rahasia",
}

with ConnectHandler(**sw) as ssh:
    output = ssh.send_command("show ip interface brief")
    print(output)
    cfg = ["ntp server 10.0.0.5", "banner motd ^Akses terbatas^A"]
    ssh.send_config_set(cfg)
    ssh.save_config()`,
		code_lang: 'python',
		code_caption: 'backup.py — kumpulkan output show dan terapkan konfigurasi via Netmiko',
		image_url: '/diagrams/network-engineer-b7.svg',
		diagram_caption:
			'Gambar 49.1: Alur otomasi jaringan — temukan host, kumpulkan fakta konfigurasi, terapkan perubahan, validasi hasil, lalu simpan di version control.',
		key_points: [
			'Otomasi mengganti kerja manual berulang dengan skrip yang konsisten dan bisa diuji di lab lebih dulu.',
			'Netmiko membuka sesi SSH untuk menjalankan perintah show dan configure, Ansible bekerja tanpa agen lewat playbook.',
			'Playbook Ansible idempoten: dijalankan berkali-kali tetap menghasilkan kondisi akhir yang sama.'
		],
		quiz: [
			{
				id: 'network-engineer-b7-q1',
				question: 'Apa keuntungan utama mengganti konfigurasi manual dengan otomasi jaringan?',
				options: [
					'Hasil konsisten dan bisa diulang ke banyak perangkat tanpa salah ketik',
					'Kebutuhan backup konfigurasi jadi hilang sepenuhnya',
					'Kabel jadi lebih rapi secara otomatis',
					'Kecepatan kabel fisik ikut meningkat'
				],
				correct_answer_index: 0,
				explanation:
					'Skrip menjalankan langkah yang sama persis setiap kali, sehingga perbedaan hasil karena salah ketik manusia bisa dihindari. Perubahan juga bisa diulang ke puluhan perangkat dalam hitungan menit, tetapi backup tetap diperlukan.'
			},
			{
				id: 'network-engineer-b7-q2',
				question: 'Library Netmiko pada Python berinteraksi dengan perangkat jaringan lewat apa?',
				options: [
					'SNMP dengan komunitas public',
					'API REST bawaan setiap switch',
					'Koneksi Bluetooth antar perangkat',
					'Sesi SSH ke perangkat'
				],
				correct_answer_index: 3,
				explanation:
					'Netmiko dibangun di atas SSH untuk mengirim perintah CLI dan menangkap outputnya, sehingga cocok untuk perangkat yang memang punya antarmuka terminal. SNMP dan REST adalah metode lain yang berbeda protokol.'
			},
			{
				id: 'network-engineer-b7-q3',
				question: 'Apa arti sifat *idempoten* pada Ansible?',
				options: [
					'Playbook hanya boleh dijalankan satu kali dalam satu sesi',
					'Menjalankan playbook berkali-kali tetap menghasilkan kondisi akhir yang sama',
					'Playbook selalu menghapus konfigurasi lama sebelum menulis baru',
					'Setiap task wajib berjalan secara paralel'
				],
				correct_answer_index: 1,
				explanation:
					'Idempoten berarti task hanya memastikan kondisi yang diinginkan tercapai, bukan menambah duplikat setiap kali dijalankan. Karena itu mengulang playbook aman dan sering dipakai untuk menjaga konfigurasi tetap sesuai standar.'
			},
			{
				id: 'network-engineer-b7-q4',
				question: 'Apa syarat utama di sisi managed node agar bisa dikelola Ansible?',
				options: [
					'Agent Ansible khusus harus selalu terpasang',
					'Alamat IP publik unik untuk tiap perangkat',
					'Konektivitas SSH yang terbuka tanpa agen',
					'Sistem operasi Windows di setiap host'
				],
				correct_answer_index: 2,
				explanation:
					'Ansible menjalankan modulnya lewat SSH, jadi cukup pastikan akun dengan hak memadai bisa login dari mesin kontrol. Tidak perlu memasang agent tambahan, yang membuatnya ringan dibanding kebanyakan alat otomasi lain.'
			},
			{
				id: 'network-engineer-b7-q5',
				question: 'Berdasarkan output berikut, apa yang terjadi pada host kedua?',
				code: `$ ansible -i inventory.ini all -m ping\n192.168.10.11 | SUCCESS => {\n    "ping": "pong"\n}\n192.168.10.12 | UNREACHABLE => {\n    "msg": "Failed to connect to host"\n}`,
				code_lang: 'bash',
				code_caption: 'ansible -m ping terhadap dua host',
				options: [
					'Host kedua tidak bisa dijangkau melalui koneksi yang dicoba Ansible',
					'Host kedua merespons dengan sukses seperti host pertama',
					'Seluruh playbook gagal karena salah satu host merespons',
					'Host kedua hanya memblokir paket ICMP saja'
				],
				correct_answer_index: 0,
				explanation:
					'Status `UNREACHABLE` berarti Ansible tidak berhasil masuk ke perangkat, umumnya karena SSH mati, kredensial salah, atau rute terputus. Bukan berarti seluruh playbook gagal, karena host pertama tetap dilayani dengan normal.'
			},
			{
				id: 'network-engineer-b7-q6',
				question: 'Mengapa sebuah skrip otomasi sebaiknya menyediakan mode dry-run?',
				options: [
					'Agar eksekusi menjadi lebih cepat dari mode normal',
					'Karena Python tidak dapat menulis file konfigurasi',
					'Agar kredensial tidak perlu disimpan di mana pun',
					'Melihat rencana perubahan tanpa menyentuh perangkat produksi'
				],
				correct_answer_index: 3,
				explanation:
					'Dry-run menampilkan perintah yang akan dijalankan tanpa menerapkannya, sehingga kamu bisa meninjau dampaknya lebih dulu. Ini penting karena perubahan otomatis yang salah bisa menyebar cepat ke banyak perangkat sekaligus.'
			},
			{
				id: 'network-engineer-b7-q7',
				question: 'Pada potongan kode Python berikut, apa fungsi `send_command`?',
				code: `for sw in switches:\n    conn = ConnectHandler(**sw)\n    print(conn.send_command("show version"))\n    conn.disconnect()`,
				code_lang: 'python',
				code_caption: 'iterasi beberapa switch dengan Netmiko',
				options: [
					'Menghapus seluruh konfigurasi pada perangkat',
					'Menjalankan playbook Ansible di latar belakang',
					'Mengirim perintah show ke perangkat dan mengembalikan outputnya',
					'Menyimpan hasil konfigurasi ke dalam NVRAM'
				],
				correct_answer_index: 2,
				explanation:
					'`send_command` mengirim perintah CLI lalu mengembalikan hasilnya sebagai string sehingga bisa dicetak atau dianalisis. Untuk menulis konfigurasi, Netmiko menyediakan metode lain seperti `send_config_set`.'
			},
			{
				id: 'network-engineer-b7-q8',
				question: 'Berapa dan seperti apa bentuk kumpulan host yang dikenal Ansible?',
				options: [
					'Sebuah berkas SQL yang di-query tiap kali playbook berjalan',
					'File teks atau INI berisi daftar host beserta pengelompokannya',
					'Gambar beresolusi tinggi yang diunggah ke server kontrol',
					'File biner hasil kompilasi dari bahasa Go'
				],
				correct_answer_index: 1,
				explanation:
					'Inventory Ansible berupa file teks yang memuat nama host atau grup, dan bisa ditulis manual maupun dihasilkan dari dynamic inventory. Format lain seperti SQL, gambar, atau biner tidak dipakai untuk menyimpan daftar host.'
			},
			{
				id: 'network-engineer-b7-q9',
				question: 'Snippet berikut berbentuk apa?',
				code: `- name: Set NTP server\n  ios_config:\n    lines:\n      - ntp server 10.0.0.5`,
				code_lang: 'json',
				code_caption: 'cuplikan task Ansible',
				options: [
					'Skrip Python yang dijalankan di server kontrol',
					'Konfigurasi Cisco IOS yang ditulis langsung ke perangkat',
					'Berkas JSON untuk konfigurasi aplikasi web',
					'Task playbook Ansible dengan format YAML'
				],
				correct_answer_index: 3,
				explanation:
					'Struktur `- name:` diikuti nama modul seperti `ios_config` adalah khas sebuah task playbook Ansible yang ditulis dalam YAML. Ansible akan menerjemahkannya menjadi perintah konfigurasi yang dikirim ke perangkat.'
			},
			{
				id: 'network-engineer-b7-q10',
				question: 'Bagaimana praktik terbaik menjalankan otomasi ke perangkat produksi?',
				options: [
					'Uji dulu di lab, jalankan bertahap, dan siapkan jalur rollback',
					'Langsung jalankan ke seluruh perangkat dalam satu waktu',
					'Matikan seluruh logging selama proses berlangsung',
					'Tanpa membuat backup karena skrip sudah dianggap aman'
				],
				correct_answer_index: 0,
				explanation:
					'Pengujian di lab menangkap kesalahan sebelum menyentuh produksi, eksekusi bertahap membatasi dampak bila ada masalah, dan rollback membuat pemulihan cepat. Logging justru tetap diperlukan agar setiap perubahan terlacak.'
			}
		]
	}
];
