<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';

	let { size = 16 }: { size?: number } = $props();

	let dark = $state(true);

	function apply(theme: 'dark' | 'light') {
		dark = theme === 'dark';
		document.documentElement.classList.toggle('dark', dark);
		document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
		try {
			localStorage.setItem('devpath:theme', theme);
		} catch {
			/* abaikan */
		}
	}

	$effect(() => {
		if (typeof document === 'undefined') return;
		dark = document.documentElement.classList.contains('dark');
	});
</script>

<button
	type="button"
	onclick={() => apply(dark ? 'light' : 'dark')}
	aria-label={dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
	class="w-9 h-9 grid place-items-center rounded-lg border border-line bg-surface text-ink-2 hover:text-ink hover:border-line-strong transition-colors"
>
	{#if dark}
		<Sun {size} strokeWidth={1.75} />
	{:else}
		<Moon {size} strokeWidth={1.75} />
	{/if}
</button>
