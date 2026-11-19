<script lang="ts">
	import { ArrowLeft, ArrowRight, Lock, CircleCheck, Play, Trophy, Zap, Target } from '@lucide/svelte';
	import ScopeIcon from '$lib/components/ScopeIcon.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { progress, statsFor, isUnlocked, isCompleted, scopeProgress, totalXp, PASS_SCORE } from '$lib/services/progress';

	let { data } = $props();

	const stats = $derived(statsFor($progress, data.scope));
	const p = $derived(scopeProgress($progress, data.scope.id));
	const avgScore = $derived(stats.avgScore);
</script>

<svelte:head>
	<title>Roadmap {data.scope.title} — DevPath</title>
</svelte:head>

<div class="px-4 md:px-8 py-8 max-w-4xl mx-auto animate-fade">
	<a
		href="/"
		class="inline-flex items-center gap-2 text-sm text-ink-3 hover:text-ink transition-colors mb-6"
	>
		<ArrowLeft size={15} /> Katalog
	</a>

	<!-- Ringkasan scope -->
	<div class="rounded-xl bg-surface border border-line p-6 mb-8">
		<div class="flex flex-wrap items-start justify-between gap-4">
			<div class="flex items-start gap-4 min-w-0">
				<div class="w-12 h-12 rounded-lg bg-elevated border border-line grid place-items-center text-ink shrink-0">
					<ScopeIcon icon={data.scope.icon} size={22} />
				</div>
				<div class="min-w-0">
					<div class="flex items-center gap-2 mb-1 flex-wrap">
						<span class="label px-2 py-0.5 rounded-xs bg-elevated border border-line text-ink-2"
							>{data.scope.category}</span
						>
						<span class="label text-ink-4">{data.modules.length} Bab • {data.scope.est_time}</span>
					</div>
					<h1 class="text-title text-ink font-semibold">{data.scope.title}</h1>
					<p class="text-sm text-ink-3 mt-1 max-w-xl">{data.scope.description}</p>
				</div>
			</div>
			<div class="text-right shrink-0">
				<p class="text-[28px] leading-8 font-bold text-ink mono">{stats.percent}%</p>
				<p class="label text-ink-4 mt-0.5">{stats.completed}/{stats.total} bab selesai</p>
			</div>
		</div>

		<div class="mt-5">
			<ProgressBar percent={stats.percent} tone={stats.status === 'completed' ? 'ok' : stats.status === 'in-progress' ? 'warn' : 'neutral'} height="h-2" />
		</div>

		<div class="mt-5 grid grid-cols-3 gap-3">
			<div class="rounded-lg bg-elevated border border-line px-3 py-2.5">
				<p class="label text-ink-4 flex items-center gap-1.5"><Target size={11} /> Rata-rata</p>
				<p class="mono text-sm font-semibold text-ink mt-1">{avgScore || '—'}{avgScore ? '/100' : ''}</p>
			</div>
			<div class="rounded-lg bg-elevated border border-line px-3 py-2.5">
				<p class="label text-ink-4 flex items-center gap-1.5"><Zap size={11} /> XP</p>
				<p class="mono text-sm font-semibold text-warn mt-1">+{p.xp} XP</p>
			</div>
			<div class="rounded-lg bg-elevated border border-line px-3 py-2.5">
				<p class="label text-ink-4 flex items-center gap-1.5"><Trophy size={11} /> Total XP</p>
				<p class="mono text-sm font-semibold text-ink mt-1">{totalXp($progress)} XP</p>
			</div>
		</div>
	</div>

	<!-- Node list -->
	<h2 class="label text-ink-3 mb-4">Alur Belajar · {data.modules.length} Bab Terstruktur</h2>

	<ol class="relative space-y-4">
		{#each data.modules as mod, i (mod.id)}
			{@const unlocked = isUnlocked($progress, data.scope.id, mod.bab_number)}
			{@const done = isCompleted($progress, data.scope.id, mod.bab_number)}
			{@const score = p.scores[String(mod.bab_number)] ?? 0}
			<li class="relative pl-0 sm:pl-14 animate-rise" style="animation-delay: {i * 60}ms">
				<!-- nomor node -->
				<div
					class="hidden sm:grid absolute left-0 top-0 w-10 h-10 rounded-full place-items-center mono text-sm font-semibold border {done
						? 'bg-ok text-canvas border-ok'
						: unlocked
							? 'bg-ink text-canvas border-ink'
							: 'bg-elevated text-ink-4 border-line'}"
				>
					{#if done}
						<CircleCheck size={18} strokeWidth={2.2} />
					{:else if unlocked}
						{mod.bab_number}
					{:else}
						<Lock size={15} strokeWidth={2} />
					{/if}
				</div>
				{#if i < data.modules.length - 1}
					<div class="hidden sm:block absolute left-5 top-10 bottom-[-1rem] w-px bg-line"></div>
				{/if}

				<div
					class="rounded-xl border p-5 transition-all {done
						? 'bg-surface border-ok/30'
						: unlocked
							? 'bg-surface border-line hover:border-line-strong'
							: 'bg-surface/60 border-line opacity-70'}"
				>
					<div class="flex flex-wrap items-start justify-between gap-3">
						<div class="min-w-0">
							<div class="flex items-center gap-2 flex-wrap mb-1.5">
								<span class="label px-2 py-0.5 rounded-xs {done ? 'bg-ok-tint text-ok border border-ok-line' : 'bg-elevated border border-line text-ink-3'}"
									>Bab {mod.bab_number}</span
								>
								{#if done}
									<span class="label text-ok">Selesai • Skor {score}</span>
								{:else if unlocked}
									<span class="label text-info">Terbuka</span>
								{:else}
									<span class="label text-ink-4">Terkunci</span>
								{/if}
							</div>
							<h3 class="text-[17px] leading-6 font-semibold text-ink">{mod.title}</h3>
							<p class="text-sm text-ink-3 mt-1">{mod.subtitle} • {mod.quiz.length} soal kuis</p>
							{#if !unlocked}
								<p class="text-xs text-ink-4 mt-2 flex items-center gap-1.5">
									<Lock size={12} /> Raih skor ≥ {PASS_SCORE} di Bab {mod.bab_number - 1} untuk
									membuka bab ini
								</p>
							{/if}
						</div>

						<div class="shrink-0">
							{#if unlocked}
								<a
									href="/belajar/{data.scope.id}/{mod.bab_number}"
									class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] {done
										? 'bg-elevated border border-line text-ink hover:bg-raised'
										: 'bg-ink text-canvas hover:opacity-90'}"
								>
									{#if done}
										<span>Ulangi Materi</span>
										<ArrowRight size={15} />
									{:else}
										<Play size={14} />
										<span>Mulai Bab {mod.bab_number}</span>
									{/if}
								</a>
							{:else}
								<span
									class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-elevated border border-line text-ink-4 cursor-not-allowed"
								>
									<Lock size={14} /> Terkunci
								</span>
							{/if}
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ol>

	<div class="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface border border-line p-5">
		<div class="flex items-center gap-3">
			<div class="w-9 h-9 rounded-lg bg-ok-tint border border-ok-line text-ok grid place-items-center">
				<Trophy size={17} />
			</div>
			<div>
				<p class="text-sm font-semibold text-ink">Target Lencana</p>
				<p class="text-xs text-ink-3">{data.scope.title} Specialist I</p>
			</div>
		</div>
		<a
			href="/belajar/{data.scope.id}/{stats.current}"
			class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-canvas text-sm font-semibold hover:opacity-90 transition-all"
		>
			{stats.completed === 0
				? 'Mulai Bab 1'
				: stats.status === 'completed'
					? 'Ulangi dari Bab 1'
					: `Lanjut Bab ${stats.current}`}
			<ArrowRight size={15} />
		</a>
	</div>
</div>
