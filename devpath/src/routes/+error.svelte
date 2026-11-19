<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft } from '@lucide/svelte';
</script>

<div class="px-4 md:px-8 py-20 max-w-lg mx-auto text-center">
	<p class="mono text-sm text-ink-3">{page.status}</p>
	<h1 class="text-title text-ink mt-4">
		{page.status === 404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan'}
	</h1>
	<p class="text-sm text-ink-3 mt-3">
		{page.status === 404
			? 'Alamat ini tidak tersedia. Kembali ke katalog untuk memilih jalur belajar.'
			: 'Halaman belum bisa dimuat. Coba lagi atau kembali ke katalog.'}
	</p>
	<a href="/" class="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-ink text-canvas text-sm font-semibold">
		<ArrowLeft size={15} /> Kembali ke Katalog
	</a>
</div>
