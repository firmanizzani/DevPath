<script lang="ts">
	import {
		ArrowLeft,
		ArrowRight,
		Lock,
		Check,
		Lightbulb,
		UserRound,
		CalendarDays,
		ShieldCheck,
		ThumbsUp,
		Share2,
		BookOpen,
		ListChecks
	} from '@lucide/svelte';
	import RichText from '$lib/components/RichText.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { progress, isUnlocked, statsFor, PASS_SCORE } from '$lib/services/progress';
	import { goto } from '$app/navigation';

	let { data } = $props();

	const stats = $derived(statsFor($progress, data.scope));
	const unlocked = $derived(isUnlocked($progress, data.scope.id, data.mod.bab_number));
	const prevModule = $derived(
		data.mod.bab_number > 1
			? `/belajar/${data.scope.id}/${data.mod.bab_number - 1}`
			: `/roadmap/${data.scope.id}`
	);
	const minutes = $derived(
		Math.max(
			3,
			Math.round(
				data.mod.explanation.split(/\s+/).length / 180 +
					(data.mod.key_points.join(' ').split(/\s+/).length / 220)
			)
		)
	);

	const visualAlt = $derived(
		(data.mod.diagram_caption ?? `Bab ${data.mod.bab_number}: ${data.mod.title}`).replace(
			/^Gambar [\d.]+:\s*/,
			''
		)
	);

	const READ_KEY = 'devpath:read:v1';
	let marked = $state(false);
	let liked = $state(false);
	let copied = $state(false);

	$effect(() => {
		try {
			const set = new Set<string>(JSON.parse(localStorage.getItem(READ_KEY) ?? '[]'));
			marked = set.has(`${data.scope.id}:${data.mod.bab_number}`);
		} catch {
			marked = false;
		}
	});

	function toggleMarked() {
		marked = !marked;
		try {
			const set = new Set<string>(JSON.parse(localStorage.getItem(READ_KEY) ?? '[]'));
			const key = `${data.scope.id}:${data.mod.bab_number}`;
			marked ? set.add(key) : set.delete(key);
			localStorage.setItem(READ_KEY, JSON.stringify([...set]));
		} catch {
			/* abaikan */
		}
	}

	async function share() {
		try {
			await navigator.clipboard.writeText(window.location.href);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			/* abaikan */
		}
	}
</script>

{#if !unlocked}
	<div class="px-4 md:px-8 py-20 max-w-lg mx-auto text-center animate-fade">
		<div class="w-14 h-14 rounded-full bg-elevated border border-line grid place-items-center mx-auto text-ink-3">
			<Lock size={22} />
		</div>
		<h1 class="text-title text-ink mt-5">Bab ini masih terkunci</h1>
		<p class="text-sm text-ink-3 mt-2">
			Raih skor minimal {PASS_SCORE} pada kuis Bab {data.mod.bab_number - 1} terlebih dahulu, lalu bab
			ini otomatis terbuka.
		</p>
		<a
			href="/roadmap/{data.scope.id}"
			class="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-ink text-canvas text-sm font-semibold"
		>
			<ArrowLeft size={15} /> Kembali ke Roadmap
		</a>
	</div>
{:else}
	<!-- strip progres -->
	<div class="sticky top-16 z-30 bg-canvas/92 backdrop-blur-xl border-b border-line">
		<div class="px-4 md:px-8 py-2.5 flex items-center gap-4">
			<div class="flex items-center gap-2.5 shrink-0">
				<span class="label text-ink-3">Bab {data.mod.bab_number} dari {stats.total}</span>
				<span class="label px-2 py-0.5 rounded-xs bg-warn-tint text-warn border border-warn-line"
					>({stats.percent}% Selesai)</span
				>
				<span class="label text-ink-4 hidden sm:inline">• Sedang Berjalan</span>
			</div>
			<div class="flex-1 hidden sm:block max-w-xs">
				<ProgressBar percent={stats.percent} tone="warn" height="h-1" />
			</div>
			<span class="label text-ink-4 ml-auto flex items-center gap-1.5">
				<BookOpen size={12} /> ~{minutes} Menit Membaca
			</span>
		</div>
	</div>

	<div class="px-4 md:px-8 py-8 max-w-3xl mx-auto animate-fade">
		<!-- breadcrumb -->
		<nav class="flex items-center gap-2 text-[13px] text-ink-4 mb-8 flex-wrap">
			<a href="/roadmap/{data.scope.id}" class="hover:text-ink transition-colors inline-flex items-center gap-1.5">
				<ArrowLeft size={13} /> Roadmap
			</a>
			<span>/</span>
			<a href="/roadmap/{data.scope.id}" class="hover:text-ink transition-colors">{data.scope.title}</a>
			<span>/</span>
			<span class="text-ink-2">Bab {data.mod.bab_number}</span>
		</nav>

		<!-- header materi -->
		<div class="flex items-center gap-2 flex-wrap mb-4">
			<span class="label px-2.5 py-1 rounded-xs bg-info-tint text-info border border-info-line"
				>{data.scope.title} · Modul {String(data.mod.bab_number).padStart(2, '0')}</span
			>
			<span class="label px-2.5 py-1 rounded-xs bg-elevated border border-line text-ink-3"
				>{data.mod.subtitle}</span
			>
		</div>

		<h1 class="text-display-sm md:text-[40px] md:leading-[48px] font-bold tracking-tight text-ink">
			Bab {data.mod.bab_number}: {data.mod.title}
		</h1>

		<div class="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[13px] text-ink-3">
			<span class="flex items-center gap-1.5"><UserRound size={13} /> Ditinjau oleh <b class="text-ink-2 font-medium">Tim Engineering DevPath</b></span>
			<span class="flex items-center gap-1.5"><CalendarDays size={13} /> Diperbarui 2025</span>
			<span class="flex items-center gap-1.5"><ShieldCheck size={13} /> Standar Kurikulum Terbuka</span>
		</div>

		<div class="h-px bg-line my-7"></div>

		<!-- materi -->
		<article class="rt-wrap">
			<RichText text={data.mod.explanation} dropCap={true} />

			{#if data.mod.image_url}
				<figure class="my-8">
					<img
						src={data.mod.image_url}
						alt={visualAlt}
						loading="lazy"
						width="960"
						height="540"
						class="w-full h-auto rounded-xl border border-line bg-ink/40"
					/>
					{#if data.mod.diagram_caption}
						<figcaption class="text-[13px] text-ink-3 mt-3 flex gap-2">
							<span class="text-info shrink-0">◈</span>
							<span><RichText text={data.mod.diagram_caption} /></span>
						</figcaption>
					{/if}
				</figure>
			{:else if data.mod.diagram}
				<figure class="my-8">
					<Diagram kind={data.mod.diagram} />
					{#if data.mod.diagram_caption}
						<figcaption class="text-[13px] text-ink-3 mt-3 flex gap-2">
							<span class="text-info shrink-0">◈</span>
							<span><RichText text={data.mod.diagram_caption} /></span>
						</figcaption>
					{/if}
				</figure>
			{/if}

			{#each data.mod.sections ?? [] as section (section.heading)}
				<section class="mt-9">
					<h2 class="text-[22px] leading-8 font-semibold text-ink tracking-tight mb-3">
						{section.heading}
					</h2>
					<RichText text={section.body} />
				</section>
			{/each}

			{#if data.mod.code_snippet}
				<h2 class="text-[22px] leading-8 font-semibold text-ink tracking-tight mt-9 mb-1 flex items-center gap-2">
					Contoh Praktik
				</h2>
				<CodeBlock
					code={data.mod.code_snippet}
					lang={data.mod.code_lang ?? 'javascript'}
					caption={data.mod.code_caption ?? ''}
				/>
			{/if}

			<!-- poin kunci -->
			<section class="mt-9 rounded-xl border border-ok-line bg-ok-tint/60 overflow-hidden">
				<div class="flex items-center justify-between gap-3 px-5 py-4 border-b border-ok-line/70">
					<div class="flex items-center gap-3">
						<span class="w-8 h-8 rounded-lg bg-ok-tint border border-ok-line grid place-items-center text-ok">
							<Lightbulb size={16} />
						</span>
						<div>
							<h3 class="text-[15px] font-semibold text-ink leading-5">
								Poin Kunci (Key Takeaways)
							</h3>
							<p class="text-[12px] text-ink-3 leading-4 mt-0.5">
								Ringkasan konsep fundamental yang wajib diasah sebelum kuis.
							</p>
						</div>
					</div>
					<span class="label px-2 py-0.5 rounded-xs bg-ok-tint text-ok border border-ok-line shrink-0"
						>Essential</span
					>
				</div>
				<ol class="p-5 space-y-3.5">
					{#each data.mod.key_points as point, i (i)}
						<li class="flex gap-3 items-start">
							<span class="w-5 h-5 rounded-full bg-ok text-canvas grid place-items-center shrink-0 mt-0.5">
								<Check size={12} strokeWidth={3} />
							</span>
							<p class="text-[15px] leading-[24px] text-ink-2">
								<span class="mono text-ok font-semibold mr-1.5">{i + 1}.</span>
								<RichText text={point} />
							</p>
						</li>
					{/each}
				</ol>
			</section>
		</article>

		<!-- interaksi -->
		<div class="mt-6 rounded-xl bg-surface border border-line p-4 flex flex-wrap items-center justify-between gap-3">
			<p class="text-sm text-ink-3 max-w-md">
				Sudah paham materi ini? Tandai sudah dibaca, lalu lanjut ke kuis untuk mengunci progres.
			</p>
			<div class="flex items-center gap-2">
				<button
					type="button"
					onclick={() => (liked = !liked)}
					class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors {liked
						? 'bg-ok-tint border-ok-line text-ok'
						: 'bg-elevated border-line text-ink-3 hover:text-ink'}"
				>
					<ThumbsUp size={14} /> <span class="mono">{liked ? 143 : 142}</span>
				</button>
				<button
					type="button"
					onclick={share}
					class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-elevated border border-line text-ink-3 hover:text-ink text-sm transition-colors"
				>
					<Share2 size={14} /> {copied ? 'Tersalin' : 'Bagikan'}
				</button>
			</div>
		</div>
	</div>

	<!-- action bar -->
	<div class="sticky bottom-0 z-30 bg-canvas/92 backdrop-blur-xl border-t border-line">
		<div class="px-4 md:px-8 py-3 flex items-center justify-between gap-3 max-w-5xl mx-auto">
			<a
				href={prevModule}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-line text-ink-2 hover:text-ink text-sm font-medium transition-colors"
			>
				<ArrowLeft size={15} /> <span class="hidden sm:inline">Bab Sebelumnya</span>
			</a>

			<button
				type="button"
				onclick={toggleMarked}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors {marked
					? 'bg-ok-tint border border-ok-line text-ok'
					: 'bg-surface border border-line text-ink-2 hover:text-ink'}"
			>
				<span
					class="w-4 h-4 rounded-[3px] border grid place-items-center {marked
						? 'bg-ok border-ok text-canvas'
						: 'border-line-strong'}"
				>
					{#if marked}<Check size={11} strokeWidth={3} />{/if}
				</span>
				<span class="hidden sm:inline">Tandai Bab {data.mod.bab_number} Selesai Dibaca</span>
				<span class="sm:hidden">Tandai Dibaca</span>
			</button>

			<button
				type="button"
				onclick={() => goto(`/kuis/${data.scope.id}/${data.mod.bab_number}`)}
				class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-canvas text-sm font-semibold hover:opacity-90 transition-all active:scale-[0.98]"
			>
				<ListChecks size={15} />
				<span>Lanjut ke Kuis ({data.mod.quiz.length} Soal)</span>
				<ArrowRight size={15} />
			</button>
		</div>
	</div>
{/if}
