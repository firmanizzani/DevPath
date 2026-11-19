<script lang="ts">
	import { ArrowRight, Layers, Database, Server, Palette, ShieldCheck, Zap } from '@lucide/svelte';
	import { TOTAL_MODULES, TOTAL_QUESTIONS, TOTAL_SCOPES } from '$lib/data';

	const flow = [
		{ title: 'Pilih Scope', desc: 'Tentukan alur karir yang ingin kamu kuasai dari 7 pilihan.' },
		{ title: 'Baca Materi', desc: 'Penjelasan ringkas, contoh kode, diagram, dan 3 poin kunci.' },
		{ title: 'Kerjakan Kuis', desc: '10 soal pilihan ganda per bab — dikumpulkan setelah semua terjawab.' },
		{ title: 'Lihat Skor & Unlock', desc: 'Raih skor ≥ 70 untuk langsung membuka bab berikutnya.' }
	];

	const stack = [
		{ icon: Layers, name: 'SvelteKit + Tailwind', desc: 'Frontend responsif, dark/light mode, animasi transisi halus.' },
		{ icon: Server, name: 'Elysia.js (Bun)', desc: 'Backend API ringan untuk menyajikan modul & kuis.' },
		{ icon: Database, name: 'Supabase + Drizzle ORM', desc: 'PostgreSQL & Storage dengan skema terdefinisi rapi.' },
		{ icon: Palette, name: 'Obsidian Synth Design', desc: 'Palet obsidian, aksen semantik, tipografi Geist + JetBrains Mono.' }
	];

	const faqs = [
		{
			q: 'Apakah DevPath benar-benar gratis?',
			a: 'Ya. 100% open learning — semua materi, kuis, dan progres bisa diakses tanpa transaksi pembayaran.'
		},
		{
			q: 'Perlu buat akun untuk belajar?',
			a: 'Tidak. Belajar langsung bisa dari Bab 1 dengan progres tersimpan di LocalStorage. Opsional: buat akun gratis supaya progres tersinkron di semua perangkat.'
		},
		{
			q: 'Berapa lama menyelesaikan satu alur karir?',
			a: 'Setiap scope berisi 7 bab dan 70 soal, estimasi ±4 jam untuk diselesaikan santai.'
		},
		{
			q: 'Bagaimana sistem unlock bab bekerja?',
			a: 'Bab 1 selalu terbuka. Bab selanjutnya terbuka otomatis begitu kamu menyelesaikan kuis bab sebelumnya dengan skor minimal 70 (7 dari 10 soal benar). Di bawah angka itu, bab berikutnya tetap terkunci — pelajari lagi materinya, lalu ulangi kuis.'
		}
	];
</script>

<svelte:head>
	<title>Tentang — DevPath</title>
</svelte:head>

<div class="px-4 md:px-8 py-12 max-w-4xl mx-auto animate-fade">
	<p class="label text-ink-4 mb-3">Tentang Platform</p>
	<h1 class="text-display-sm md:text-display text-ink font-bold tracking-tight">
		DevPath — belajar IT dengan <span class="text-ink-3">alur yang jelas</span>
	</h1>
	<p class="text-[16px] leading-[26px] text-ink-3 mt-5">
		DevPath menyusun 7 career path populer menjadi 7 bab terstruktur per path (49 bab, 490 soal): kamu
		membaca materi ringkas, mengerjakan kuis interaktif, lalu raih skor ≥ 70 untuk membuka bab
		berikutnya. Tanpa ribet, tanpa bayar, tanpa harus login.
	</p>

	<div class="grid grid-cols-3 gap-4 mt-8">
		{#each [
			{ n: TOTAL_SCOPES, l: 'Career Paths' },
			{ n: TOTAL_MODULES, l: 'Bab Terstruktur' },
			{ n: TOTAL_QUESTIONS, l: 'Soal Kuis' }
		] as item (item.l)}
			<div class="rounded-xl bg-surface border border-line p-4 text-center">
				<p class="text-2xl font-bold text-ink mono">{item.n}</p>
				<p class="label text-ink-4 mt-1">{item.l}</p>
			</div>
		{/each}
	</div>

	<h2 class="text-[24px] font-semibold text-ink tracking-tight mt-14 mb-5">Alur Belajar</h2>
	<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
		{#each flow as step, i (step.title)}
			<div class="rounded-xl bg-surface border border-line p-5">
				<span class="label text-info mono">0{i + 1}</span>
				<h3 class="text-[16px] font-semibold text-ink mt-2">{step.title}</h3>
				<p class="text-[13px] leading-5 text-ink-3 mt-1.5">{step.desc}</p>
			</div>
		{/each}
	</div>

	<h2 class="text-[24px] font-semibold text-ink tracking-tight mt-14 mb-5">Dibangun Dengan</h2>
	<div class="grid sm:grid-cols-2 gap-4">
		{#each stack as item (item.name)}
			{@const Icon = item.icon}
			<div class="rounded-xl bg-surface border border-line p-5 flex gap-4">
				<span class="w-10 h-10 rounded-lg bg-elevated border border-line grid place-items-center text-ink shrink-0">
					<Icon size={18} />
				</span>
				<div>
					<h3 class="text-[15px] font-semibold text-ink">{item.name}</h3>
					<p class="text-[13px] leading-5 text-ink-3 mt-1">{item.desc}</p>
				</div>
			</div>
		{/each}
	</div>

	<h2 class="text-[24px] font-semibold text-ink tracking-tight mt-14 mb-5">Pertanyaan Umum</h2>
	<div class="space-y-3">
		{#each faqs as f (f.q)}
			<details class="group rounded-xl bg-surface border border-line p-5 open:border-line-strong">
				<summary class="flex items-center justify-between gap-4 cursor-pointer list-none text-[15px] font-medium text-ink">
					{f.q}
					<span class="text-ink-4 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
				</summary>
				<p class="text-[14px] leading-6 text-ink-3 mt-3">{f.a}</p>
			</details>
		{/each}
	</div>

	<div class="mt-14 rounded-xl border border-ok-line bg-ok-tint p-6 flex flex-wrap items-center justify-between gap-4">
		<div class="flex items-start gap-3">
			<span class="w-9 h-9 rounded-lg bg-ok-tint border border-ok-line text-ok grid place-items-center shrink-0">
				<ShieldCheck size={17} />
			</span>
			<div>
				<h3 class="text-[16px] font-semibold text-ink">Siap mulai?</h3>
				<p class="text-sm text-ink-3 mt-1">Bab 1 selalu terbuka — langsung saja belajar sekarang.</p>
			</div>
		</div>
		<a href="/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-canvas text-sm font-semibold hover:opacity-90 transition-all">
			Jelajahi Katalog <ArrowRight size={15} />
		</a>
	</div>
</div>
