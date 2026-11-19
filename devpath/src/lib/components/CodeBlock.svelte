<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-python';
	import 'prismjs/components/prism-sql';
	import 'prismjs/components/prism-bash';
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-go';
	import 'prismjs/components/prism-css';
	import { Copy, Check } from '@lucide/svelte';

	let {
		code = '',
		lang = 'javascript',
		caption = ''
	}: { code?: string; lang?: string; caption?: string } = $props();

	let copied = $state(false);

	const grammarFor = (name: string) =>
		(Prism.languages[name] ??
			Prism.languages.markup ??
			Prism.languages.javascript) as Prism.Grammar;

	const html = $derived.by(() => {
		try {
			return Prism.highlight(code, grammarFor(lang), lang);
		} catch {
			return code.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);
		}
	});

	const langLabel = $derived(
		({ javascript: 'JavaScript', typescript: 'TypeScript', python: 'Python', sql: 'SQL', bash: 'Bash', json: 'JSON', html: 'HTML', css: 'CSS', go: 'Go' })[
			lang
		] ?? lang
	);

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			/* clipboard tidak tersedia */
		}
	}
</script>

{#if code}
	<figure class="my-6 rounded-lg border border-line overflow-hidden bg-code-bg animate-rise">
		<div class="flex items-center justify-between gap-3 h-9 px-3 bg-code-head border-b border-line">
			<div class="flex items-center gap-2 min-w-0">
				<span class="flex gap-1.5 shrink-0">
					<span class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80"></span>
					<span class="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80"></span>
					<span class="w-2.5 h-2.5 rounded-full bg-[#28c840]/80"></span>
				</span>
				<span class="label text-ink-3 truncate">{caption || langLabel}</span>
			</div>
			<div class="flex items-center gap-2 shrink-0">
				<span class="label text-ink-4 hidden sm:inline">{langLabel}</span>
				<button
					type="button"
					onclick={copy}
					class="inline-flex items-center gap-1.5 px-2 py-1 rounded-xs text-ink-3 hover:text-ink hover:bg-raised transition-colors label"
					aria-label="Salin kode"
				>
					{#if copied}
						<Check size={13} /> Tersalin
					{:else}
						<Copy size={13} /> Salin
					{/if}
				</button>
			</div>
		</div>
		<pre
			class="overflow-x-auto p-4 text-[13px] leading-[1.7] font-mono text-ink-2"><code
				class="language-{lang}">{@html html}</code
			></pre>
	</figure>
{/if}

<style>
	pre::-webkit-scrollbar {
		height: 8px;
	}
	pre::-webkit-scrollbar-thumb {
		background: #27272a;
		border-radius: 999px;
	}
</style>
