<script lang="ts">
	let {
		percent = 0,
		tone = 'neutral',
		height = 'h-1.5'
	}: { percent?: number; tone?: 'neutral' | 'ok' | 'warn' | 'info'; height?: string } = $props();

	const color = $derived(
		tone === 'ok'
			? 'bg-ok shadow-[0_0_8px_var(--c-ok-line)]'
			: tone === 'warn'
				? 'bg-warn shadow-[0_0_8px_var(--c-warn-line)]'
				: tone === 'info'
					? 'bg-info shadow-[0_0_8px_var(--c-info-line)]'
					: 'bg-ink-3'
	);
</script>

<div class="w-full {height} bg-raised rounded-full overflow-hidden">
	<div
		class="h-full {color} rounded-full transition-[width] duration-700 ease-out"
		style="width: {Math.max(0, Math.min(100, percent))}%"
	></div>
</div>
