<script lang="ts">
	let {
		text = '',
		allowInlineMarkup = true,
		dropCap = false
	}: { text?: string; allowInlineMarkup?: boolean; dropCap?: boolean } = $props();

	function escapeHtml(input: string): string {
		return input
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function render(source: string): string {
		const slots: string[] = [];
		let t = source;

		if (allowInlineMarkup) {
			t = t.replace(/<\/?u>/g, (m) => {
				slots.push(m);
				return '\u0000' + String(slots.length - 1) + '\u0000';
			});
		}

		t = escapeHtml(t);
		t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
		t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
		t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');

		if (allowInlineMarkup) {
			t = t.replace(/\u0000(\d+)\u0000/g, (_m, i: string) => slots[Number(i)] ?? '');
		}
		return t;
	}

	const paragraphs = $derived(
		text
			.split(/\n{2,}/)
			.map((p) => p.trim())
			.filter(Boolean)
			.map(render)
	);
</script>

<div class="rt space-y-4 {dropCap ? 'dropcap' : ''}">
	{#each paragraphs as p, i (i)}
		<p class="text-ink-2 leading-relaxed text-[16px]">{@html p}</p>
	{/each}
</div>
