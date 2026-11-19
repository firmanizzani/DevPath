<script lang="ts">
	import { page } from '$app/state';
	import { ArrowRight, Compass, Route, Terminal, Layers, BadgeCheck, SlidersHorizontal } from '@lucide/svelte';
	import ScopeCard from '$lib/components/ScopeCard.svelte';
	import type { Scope } from '$lib/data/types';
	import { categories, TOTAL_MODULES, TOTAL_SCOPES, TOTAL_QUESTIONS } from '$lib/data';
	import { progress, statsFor } from '$lib/services/progress';

	let { data } = $props();

	let activeCategory = $state<string>('All Scope');
	let sortBy = $state<'popular' | 'difficulty'>('popular');

	const query = $derived((page.url.searchParams.get('q') ?? '').trim().toLowerCase());

	const filtered = $derived.by(() => {
		let list: Scope[] = data.scopes.filter((s) => {
			const catOk = activeCategory === 'All Scope' || s.category === activeCategory;
			const qOk =
				!query ||
				s.title.toLowerCase().includes(query) ||
				s.description.toLowerCase().includes(query) ||
				s.category.toLowerCase().includes(query);
			return catOk && qOk;
		});
		list = [...list].sort((a, b) =>
			sortBy === 'popular' ? b.popularity - a.popularity : b.difficulty - a.difficulty
		);
		return list;
	});

	const stats = $derived(
		Object.fromEntries(data.scopes.map((s) => [s.id, statsFor($progress, s)]))
	);
</script>

<svelte:head>
	<title>DevPath — Kuasai Keahlian IT dengan Alur Karir Terstruktur</title>
</svelte:head>

<!-- HERO -->
<section class="relative w-full overflow-hidden px-4 md:px-8 py-16 md:py-20 flex flex-col items-center justify-center text-center">
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[260px] bg-ink/[0.04] dark:bg-white/[0.04] rounded-full blur-[140px] pointer-events-none -z-10"
	></div>
	<div class="absolute inset-0 opacity-[0.05] pointer-events-none -z-20 flex items-center justify-center">
		<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern height="40" id="matrix-grid" patternUnits="userSpaceOnUse" width="40">
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1"></path>
					<circle cx="20" cy="20" fill="currentColor" r="1"></circle>
				</pattern>
			</defs>
			<rect fill="url(#matrix-grid)" height="100%" width="100%"></rect>
		</svg>
	</div>

	<div
		class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface border border-line mb-6 animate-rise"
	>
		<span class="flex h-2 w-2 rounded-full bg-ok animate-pulse"></span>
		<span class="text-[11px] mono font-medium text-ink-2 tracking-wide"
			>Platform Terbuka 2025 • Kurikulum Industri Terkini</span
		>
	</div>

	<h1
		class="max-w-4xl text-display-sm md:text-display text-ink font-bold tracking-tight mb-4 animate-rise"
	>
		Kuasai Keahlian IT dengan <br class="hidden sm:inline" />
		<span class="text-ink-3">Alur Karir Terstruktur</span>
	</h1>

	<p class="max-w-2xl text-[16px] leading-[26px] text-ink-3 mb-8 animate-rise">
		Pelajari teknologi mutakhir melalui kurikulum terkurasi, studi kasus nyata, dan panduan langkah
		demi langkah dari praktisi industri terkemuka.
	</p>

	<div class="flex flex-wrap items-center justify-center gap-4 mb-10 animate-rise">
		<a
			href="#katalog"
			class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-ink text-canvas font-semibold text-sm hover:opacity-90 transition-all active:scale-[0.98]"
			style="box-shadow: 0 0 16px -4px var(--c-glow)"
		>
			<Compass size={18} strokeWidth={2} />
			<span>Jelajahi Alur Karir</span>
		</a>
		<a
			href="/progres"
			class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-surface border border-line text-ink font-medium text-sm hover:border-line-strong hover:bg-elevated transition-all"
		>
			<Route size={18} class="text-ink-3" strokeWidth={1.75} />
			<span>Lihat Roadmap Interaktif</span>
		</a>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full stagger">
		<div class="flex items-center gap-4 p-4 rounded-xl bg-surface border border-line text-left">
			<div class="w-11 h-11 rounded-lg bg-elevated border border-line text-ink grid place-items-center shrink-0">
				<Terminal size={21} strokeWidth={1.75} />
			</div>
			<div class="min-w-0">
				<p class="text-[18px] leading-7 font-bold text-ink">{TOTAL_SCOPES} Alur Karir</p>
				<p class="text-xs text-ink-3 truncate">Spesialisasi Populer</p>
			</div>
		</div>
		<div class="flex items-center gap-4 p-4 rounded-xl bg-surface border border-line text-left">
			<div class="w-11 h-11 rounded-lg bg-elevated border border-line text-ink grid place-items-center shrink-0">
				<Layers size={21} strokeWidth={1.75} />
			</div>
			<div class="min-w-0">
				<p class="text-[18px] leading-7 font-bold text-ink">{TOTAL_MODULES} Modul</p>
				<p class="text-xs text-ink-3 truncate">Materi Praktis &amp; Kode</p>
			</div>
		</div>
		<div
			class="flex items-center gap-4 p-4 rounded-xl bg-surface border border-ok/30 text-left"
			style="box-shadow: 0 0 15px -3px var(--c-ok-tint)"
		>
			<div
				class="w-11 h-11 rounded-lg bg-ok-tint border border-ok/30 text-ok grid place-items-center shrink-0"
			>
				<BadgeCheck size={21} strokeWidth={1.75} />
			</div>
			<div class="min-w-0">
				<p class="text-[18px] leading-7 font-bold text-ok">100% Gratis</p>
				<p class="text-xs text-ink-3 truncate">Akses Penuh Selamanya • {TOTAL_QUESTIONS} soal</p>
			</div>
		</div>
	</div>
</section>

<!-- KATALOG -->
<div class="w-full px-4 md:px-8 pb-16 max-w-7xl mx-auto flex flex-col gap-6" id="katalog">
	<div
		class="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-line"
	>
		<div class="flex flex-wrap items-center gap-2">
			{#each categories as cat (cat)}
				<button
					type="button"
					onclick={() => (activeCategory = cat)}
					class="px-4 py-1.5 rounded-lg text-sm transition-all {activeCategory === cat
						? 'bg-ink text-canvas font-semibold'
						: 'bg-elevated border border-line text-ink-3 font-medium hover:text-ink hover:border-line-strong'}"
				>
					{cat}
				</button>
			{/each}
		</div>

		<div class="flex items-center justify-between w-full md:w-auto gap-4 shrink-0">
			<span class="text-[11px] mono text-ink-3 flex items-center gap-2">
				<span class="w-1.5 h-1.5 rounded-full bg-ink"></span>
				<span>Menampilkan {filtered.length} alur karir tersedia</span>
			</span>
			<div
				class="relative flex items-center bg-elevated border border-line rounded-lg px-3 py-1.5 text-ink-3"
			>
				<SlidersHorizontal size={14} class="mr-1.5 text-ink-4" />
				<select
					bind:value={sortBy}
					aria-label="Urutkan"
					class="bg-transparent text-xs outline-none cursor-pointer text-ink"
				>
					<option value="popular">Paling Populer</option>
					<option value="difficulty">Tingkat Kesulitan</option>
				</select>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
		{#each filtered as scope (scope.id)}
			<ScopeCard {scope} stats={stats[scope.id]} />
		{/each}

		<div class="flex flex-col justify-between rounded-xl bg-surface border border-line p-6">
			<div class="flex flex-col">
				<div
					class="w-10 h-10 rounded-lg bg-elevated border border-line flex items-center justify-center text-ink mb-4"
				>
					<Terminal size={19} strokeWidth={1.75} />
				</div>
				<h3 class="text-[18px] leading-7 font-semibold text-ink mb-2">Ingin Alur Khusus Tim?</h3>
				<p class="text-sm leading-[22px] text-ink-3">
					Rancang kurikulum in-house dan pantau capaian seluruh tim rekayasa Anda dalam satu
					dashboard konsol terpadu.
				</p>
			</div>
			<a
				href="/tentang"
				class="mt-6 w-full py-2.5 px-4 rounded-lg bg-elevated border border-line hover:bg-raised text-ink text-sm font-medium flex items-center justify-center gap-2 transition-colors"
			>
				<span>Pelajari DevPath Enterprise</span>
				<ArrowRight size={15} />
			</a>
		</div>
	</div>

	{#if filtered.length === 0}
		<div class="rounded-xl bg-surface border border-line p-10 text-center">
			<p class="text-ink-2 font-medium">Tidak ada alur karir yang cocok.</p>
			<p class="text-sm text-ink-3 mt-1">Coba kata kunci lain atau pilih “All Scope”.</p>
		</div>
	{/if}
</div>
