<script lang="ts">
	import { ArrowRight, Play, BookOpen, CircleCheck } from '@lucide/svelte';
	import type { Scope } from '$lib/data/types';
	import type { ScopeStats } from '$lib/services/progress';
	import ScopeIcon from './ScopeIcon.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import { questionsOfScope } from '$lib/data';

	let { scope, stats }: { scope: Scope; stats: ScopeStats } = $props();

	const questions = $derived(questionsOfScope(scope.id));
	const tone = $derived(stats.status === 'completed' ? 'ok' : stats.status === 'in-progress' ? 'warn' : 'neutral');
	const hoverBorder = $derived(
		stats.status === 'completed'
			? 'hover:border-ok/40'
			: stats.status === 'in-progress'
				? 'hover:border-warn/40'
				: 'hover:border-line-strong'
	);
	const statusLabel = $derived(
		stats.status === 'completed'
			? `${stats.percent}% Selesai (Bab ${stats.total}/${stats.total})`
			: stats.status === 'in-progress'
				? `${stats.percent}% Selesai (Bab ${stats.completed}/${stats.total})`
				: 'Belum dimulai'
	);
	const statusColor = $derived(
		stats.status === 'completed'
			? 'text-ok'
			: stats.status === 'in-progress'
				? 'text-warn'
				: 'text-ink-3'
	);
</script>

<article
	class="scope-card group flex flex-col justify-between rounded-xl bg-surface border border-line p-6 transition-[border-color,box-shadow,transform] duration-200 {hoverBorder} hover:-translate-y-0.5"
>
	<div class="flex flex-col">
		<div class="flex items-center justify-between gap-3 mb-4">
			<div
				class="w-11 h-11 rounded-lg bg-elevated border border-line text-ink flex items-center justify-center group-hover:border-line-strong transition-colors"
			>
				<ScopeIcon icon={scope.icon} size={21} />
			</div>
			<span class="label px-2.5 py-1 rounded-sm bg-elevated border border-line text-ink-2"
				>{scope.category}</span
			>
		</div>

		<h2 class="text-[20px] leading-7 font-semibold text-ink tracking-tight mb-1">{scope.title}</h2>
		<p class="scope-description text-sm leading-[22px] text-ink-3 mb-4 line-clamp-3">{scope.description}</p>

		<div class="flex items-center gap-2 text-[12px] mono text-ink-3 mb-6">
			<BookOpen size={13} strokeWidth={1.75} />
			<span>{stats.total} Bab • {questions} Kuis • {scope.est_time}</span>
		</div>
	</div>

	<div class="flex flex-col gap-2 pt-4 border-t border-line/70">
		<div class="flex items-center justify-between text-xs">
			<span class="font-medium flex items-center gap-1.5 {statusColor}">
				<span class="w-1.5 h-1.5 rounded-full bg-current"></span>
				{statusLabel}
			</span>
			<span class="mono {statusColor}">{stats.completed}/{stats.total}</span>
		</div>

		<ProgressBar percent={stats.percent} {tone} />

		<a
			href="/roadmap/{scope.id}"
			class="scope-action mt-2 w-full py-2.5 px-4 rounded-lg bg-ink text-canvas hover:opacity-90 font-semibold text-sm flex items-center justify-center gap-1.5 transition-[opacity,transform] active:scale-[0.98]"
			aria-label="{stats.status === 'completed' ? 'Ulangi Belajar' : stats.status === 'in-progress' ? 'Lanjutkan Belajar' : 'Mulai Belajar'} {scope.title}"
		>
			{#if stats.status === 'completed'}
				<span>Ulangi Belajar</span>
				<CircleCheck size={16} strokeWidth={2} />
			{:else if stats.status === 'in-progress'}
				<span>Lanjutkan Belajar</span>
				<ArrowRight size={16} strokeWidth={2} />
			{:else}
				<span>Mulai Belajar</span>
				<Play size={15} strokeWidth={2} />
			{/if}
		</a>
	</div>
</article>

<style>
	.scope-card {
		height: 100%;
	}

	.scope-card:hover {
		box-shadow: 0 8px 20px -14px rgb(0 0 0 / 0.18);
	}

	.scope-card:focus-within {
		border-color: var(--c-line-strong);
	}

	.scope-action {
		min-height: 42px;
	}

	.scope-action:focus-visible {
		outline: 2px solid var(--c-ink);
		outline-offset: 3px;
	}

	@media (min-width: 768px) {
		.scope-description {
			min-height: 66px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scope-card:hover,
		.scope-action:active {
			transform: none;
		}
	}
</style>
