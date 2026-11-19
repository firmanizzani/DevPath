<script lang="ts">
	import { apiStatus } from '$lib/services/content';
</script>

<footer class="w-full border-t border-line bg-canvas mt-16">
	<div class="px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
		<div class="flex items-center gap-2">
			<span class="w-2 h-2 rounded-full bg-ok animate-pulse"></span>
			<span class="label text-ink-2">All systems operational</span>
			{#if apiStatus.enabled}
				<span class="label text-ink-4 ml-2">• api {apiStatus.base}</span>
			{/if}
		</div>
		<p class="text-xs text-ink-4 text-center">
			© 2025 DevPath. Platform Pembelajaran IT Terstruktur.
		</p>
		<div class="flex items-center gap-5">
			{#each ['Status', 'Dokumentasi', 'Komunitas', 'Bantuan'] as link (link)}
				<a href="/tentang" class="text-xs text-ink-3 hover:text-ink transition-colors">{link}</a>
			{/each}
		</div>
	</div>
</footer>
