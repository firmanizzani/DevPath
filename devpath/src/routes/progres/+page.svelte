<script lang="ts">
	import { ArrowRight, Trophy, Zap, CircleCheck, BookOpen, RotateCcw } from '@lucide/svelte';
	import { page } from '$app/state';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import ScopeIcon from '$lib/components/ScopeIcon.svelte';
	import { scopes, TOTAL_MODULES, TOTAL_QUESTIONS } from '$lib/data';
	import { progress, statsFor, totalXp, resetAll, currentBab, BABS_PER_SCOPE } from '$lib/services/progress';
	import { resetRemoteProgress } from '$lib/services/progressSync';

	const user = $derived(page.data.user ?? null);

	const stats = $derived(scopes.map((s) => ({ scope: s, stat: statsFor($progress, s) })));
	const totalCompleted = $derived(stats.reduce((sum, s) => sum + s.stat.completed, 0));
	const xp = $derived(totalXp($progress));
	const scores = $derived(
		Object.values($progress.scopes).flatMap((p) => Object.values(p.scores ?? {}))
	);
	const avg = $derived(
		scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
	);
	const level = $derived(Math.floor(xp / 500) + 1);

	async function doReset() {
		const message = user
			? 'Hapus semua progres belajar di akun ini dan di perangkat ini?'
			: 'Hapus semua progres belajar di perangkat ini?';
		if (!confirm(message)) return;
		resetAll();
		if (user) await resetRemoteProgress();
	}
</script>

<svelte:head>
	<title>Progres Saya — DevPath</title>
</svelte:head>

<div class="px-4 md:px-8 py-10 max-w-5xl mx-auto animate-fade">
	<div class="flex flex-wrap items-end justify-between gap-4 mb-8">
		<div>
			<p class="label text-ink-4 mb-2">Dashboard Pembelajaran</p>
			<h1 class="text-display-sm md:text-[40px] md:leading-[48px] font-bold tracking-tight text-ink">
				Progres Saya
			</h1>
			<p class="text-sm text-ink-3 mt-3 max-w-xl">
				{#if user}
					Progres tersimpan di akun DevPath-mu (Supabase) dan dicadangkan lokal — bisa dilanjutkan
					di perangkat mana pun. Raih skor ≥ 70 di kuis bab untuk membuka bab berikutnya.
				{:else}
					Semua progres disimpan lokal di browser (LocalStorage) — tanpa login, tanpa bayar. Masuk
					untuk menyinkronkan progres ke semua perangkat. Raih skor ≥ 70 di kuis bab untuk
					membuka bab berikutnya.
				{/if}
			</p>
		</div>
		<button
			type="button"
			onclick={doReset}
			class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-line text-sm text-ink-2 hover:text-err hover:border-err-line transition-colors"
		>
			<RotateCcw size={15} /> Reset progres
		</button>
	</div>

	<!-- ringkasan -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 stagger">
		<div class="rounded-xl bg-surface border border-line p-4">
			<div class="flex items-center justify-between mb-3">
				<span class="w-8 h-8 rounded-md bg-ok-tint border border-ok-line text-ok grid place-items-center">
					<BookOpen size={15} />
				</span>
				<span class="label text-ink-4">/ {TOTAL_MODULES}</span>
			</div>
			<p class="label text-ink-4">Bab Selesai</p>
			<p class="text-xl font-bold text-ink mono mt-1">{totalCompleted}</p>
		</div>
		<div class="rounded-xl bg-surface border border-line p-4">
			<div class="flex items-center justify-between mb-3">
				<span class="w-8 h-8 rounded-md bg-warn-tint border border-warn-line text-warn grid place-items-center">
					<Zap size={15} />
				</span>
				<span class="label px-2 py-0.5 rounded-xs bg-warn-tint text-warn border border-warn-line">Level {level}</span>
			</div>
			<p class="label text-ink-4">Total XP</p>
			<p class="text-xl font-bold text-ink mono mt-1">{xp} XP</p>
		</div>
		<div class="rounded-xl bg-surface border border-line p-4">
			<div class="flex items-center justify-between mb-3">
				<span class="w-8 h-8 rounded-md bg-info-tint border border-info-line text-info grid place-items-center">
					<Trophy size={15} />
				</span>
				<span class="label text-ink-4">/ 100</span>
			</div>
			<p class="label text-ink-4">Rata-rata Skor</p>
			<p class="text-xl font-bold text-ink mono mt-1">{avg || '—'}</p>
		</div>
		<div class="rounded-xl bg-surface border border-line p-4">
			<div class="flex items-center justify-between mb-3">
				<span class="w-8 h-8 rounded-md bg-elevated border border-line text-ink-2 grid place-items-center">
					<CircleCheck size={15} />
				</span>
				<span class="label text-ink-4">/ {TOTAL_QUESTIONS}</span>
			</div>
			<p class="label text-ink-4">Soal Tersedia</p>
			<p class="text-xl font-bold text-ink mono mt-1">{TOTAL_QUESTIONS}</p>
		</div>
	</div>

	<!-- per scope -->
	<h2 class="label text-ink-3 mb-4">Status Tiap Alur Karir</h2>
	<div class="space-y-3">
		{#each stats as { scope, stat } (scope.id)}
			{@const tone = stat.status === 'completed' ? 'ok' : stat.status === 'in-progress' ? 'warn' : 'neutral'}
			<div class="rounded-xl bg-surface border border-line p-4 flex flex-wrap items-center gap-4">
				<div class="w-10 h-10 rounded-lg bg-elevated border border-line grid place-items-center text-ink shrink-0">
					<ScopeIcon icon={scope.icon} size={19} />
				</div>

				<div class="flex-1 min-w-[200px]">
					<div class="flex items-center justify-between gap-3 mb-1.5">
						<p class="text-[15px] font-semibold text-ink">{scope.title}</p>
						<span class="label {stat.status === 'completed' ? 'text-ok' : stat.status === 'in-progress' ? 'text-warn' : 'text-ink-4'}">
							{stat.status === 'completed'
								? 'Selesai'
								: stat.status === 'in-progress'
									? `Bab ${stat.completed}/${stat.total}`
									: 'Belum dimulai'}
						</span>
					</div>
					<ProgressBar percent={stat.percent} {tone} />
					<p class="text-xs text-ink-4 mt-2 mono">
						{stat.avgScore ? `Rata-rata skor ${stat.avgScore} · ` : ''}{scope.est_time} · {BABS_PER_SCOPE} bab
					</p>
				</div>

				<a
					href="/roadmap/{scope.id}"
					class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 {stat.status === 'not-started'
						? 'bg-ink text-canvas hover:opacity-90'
						: 'bg-elevated border border-line text-ink hover:bg-raised'}"
				>
					{stat.status === 'not-started' ? 'Mulai' : 'Lanjut Bab ' + currentBab($progress, scope.id)}
					<ArrowRight size={14} />
				</a>
			</div>
		{/each}
	</div>
</div>
