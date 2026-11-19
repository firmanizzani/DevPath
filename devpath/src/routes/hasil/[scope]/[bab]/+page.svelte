<script lang="ts">
	import {
		ArrowRight,
		ArrowLeft,
		Check,
		X,
		Clock,
		Zap,
		Trophy,
		Unlock,
		Share2,
		RotateCcw,
		Target,
		Terminal
	} from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { progress, totalXp, statsFor, passed, PASS_SCORE, BABS_PER_SCOPE } from '$lib/services/progress';
	import { readResult, formatDuration, type QuizResult } from '$lib/services/result';
	import { nextModule } from '$lib/data';

	let { data } = $props();

	let result = $state<QuizResult | null>(null);
	let checked = $state(false);

	onMount(() => {
		const stored = readResult();
		result =
			stored && stored.scope_id === data.scope.id && stored.bab_number === data.mod.bab_number
				? stored
				: null;
		checked = true;
	});

	const pass = $derived(passed(result?.score ?? 0));
	const next = $derived(nextModule(data.scope.id, data.mod.bab_number));
	const stats = $derived(statsFor($progress, data.scope));
	const level = $derived(Math.floor(totalXp($progress) / 500) + 1);
	const xpGained = $derived(result?.score ?? 0);
	const accuracy = $derived(
		result && result.total ? Math.round((result.correct / result.total) * 100) : 0
	);
	const avgSeconds = $derived(
		result ? Math.max(1, Math.round(result.time_ms / 1000 / Math.max(1, result.total))) : 0
	);

	const R = 96;
	const C = 2 * Math.PI * R;
	const dash = $derived(C * (1 - (result?.score ?? 0) / 100));

	function roman(n: number) {
		return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][n - 1] ?? 'I';
	}
</script>

<svelte:head>
	<title>Hasil Kuis Bab {data.mod.bab_number} — {data.scope.title} · DevPath</title>
</svelte:head>

{#if !checked}
	<div class="py-24 text-center text-ink-4 label">Menyiapkan hasil kuis…</div>
{:else if !result}
	<div class="px-4 md:px-8 py-20 max-w-lg mx-auto text-center animate-fade">
		<div class="w-14 h-14 rounded-full bg-elevated border border-line grid place-items-center mx-auto text-ink-3">
			<Terminal size={22} />
		</div>
		<h1 class="text-title text-ink mt-5">Belum ada hasil untuk disimpan</h1>
		<p class="text-sm text-ink-3 mt-2">
			Hasil kuis tersimpan sementara di browser setelah kamu menyelesaikan seluruh soal.
		</p>
		<div class="flex items-center justify-center gap-3 mt-6">
			<a href="/roadmap/{data.scope.id}" class="px-5 py-2.5 rounded-lg bg-surface border border-line text-sm text-ink-2">
				Roadmap
			</a>
			<a href="/kuis/{data.scope.id}/{data.mod.bab_number}" class="px-5 py-2.5 rounded-lg bg-ink text-canvas text-sm font-semibold">
				Kerjakan Kuis
			</a>
		</div>
	</div>
{:else}
	<div class="px-4 md:px-8 py-10 max-w-5xl mx-auto animate-fade">
		<!-- hero -->
		<div class="text-center">
			<div class="flex flex-wrap items-center justify-center gap-2 mb-5">
				<span class="label px-3 py-1 rounded-xs bg-ok-tint text-ok border border-ok-line inline-flex items-center gap-2">
					<span class="w-1.5 h-1.5 rounded-full bg-ok animate-pulse"></span>
					Modul {String(data.mod.bab_number).padStart(2, '0')} {pass ? 'Selesai Dengan Baik' : 'Belum Tuntas'}
				</span>
				<span class="label px-3 py-1 rounded-xs bg-elevated border border-line text-ink-3"
					>Kuis Terverifikasi · {data.mod.subtitle}</span
				>
			</div>

			<h1 class="text-display-sm md:text-display text-ink font-bold tracking-tight max-w-3xl mx-auto">
				{#if pass}
					Selamat! Kamu Berhasil Menyelesaikan Kuis Bab {data.mod.bab_number}
				{:else}
					Semangat! Skormu Belum Lolos Ambang {PASS_SCORE}
				{/if}
			</h1>
			<p class="max-w-2xl mx-auto text-[15px] leading-[24px] text-ink-3 mt-4">
				{#if pass}
					Pemahamanmu tentang “{data.mod.title}” sudah memenuhi standar minimum kelulusan
					({Math.round((PASS_SCORE / 100) * (result?.total ?? 10))} dari {result?.total ?? 10} soal benar).
					Bab berikutnya kini terbuka di roadmap.
				{:else}
					Kamu butuh minimal skor {PASS_SCORE} untuk membuka bab berikutnya. Pelajari lagi materinya,
					lalu ulangi kuis — pembahasan setiap soal di bawah bisa kamu baca sekarang.
				{/if}
			</p>

			<!-- ring -->
			<div class="relative w-[240px] h-[240px] mx-auto mt-9">
				<svg viewBox="0 0 240 240" class="w-full h-full -rotate-90">
					<circle cx="120" cy="120" r={R} fill="none" stroke="var(--c-raised)" stroke-width="14" />
					<circle
						cx="120"
						cy="120"
						r={R}
						fill="none"
						stroke={pass ? 'var(--c-ok)' : 'var(--c-warn)'}
						stroke-width="14"
						stroke-linecap="round"
						stroke-dasharray={C}
						stroke-dashoffset={dash}
						style="transition: stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1); filter: drop-shadow(0 0 10px {pass
							? 'var(--c-ok-line)'
							: 'var(--c-warn-line)'});"
					/>
				</svg>
				<div class="absolute inset-0 grid place-items-center">
					<div class="text-center">
						<p class="text-[54px] leading-none font-bold text-ink mono">
							{result.score}<span class="text-[22px] text-ink-3">%</span>
						</p>
						<span
							class="label mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border {pass
								? 'bg-ok-tint text-ok border-ok-line'
								: 'bg-warn-tint text-warn border-warn-line'}"
						>
							{#if pass}<Check size={12} strokeWidth={3} /> Lulus!{:else}<RotateCcw size={12} /> Ulangi{/if}
						</span>
						<p class="label text-ink-4 mt-3">Standar Kelulusan: {PASS_SCORE}% ({Math.round((PASS_SCORE / 100) * result.total)}/{result.total} benar)</p>
					</div>
				</div>
			</div>
		</div>

		<!-- stat cards -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 stagger">
			<div class="rounded-xl bg-surface border border-line p-4">
				<div class="flex items-center justify-between mb-3">
					<span class="w-8 h-8 rounded-md bg-ok-tint border border-ok-line text-ok grid place-items-center">
						<Target size={15} />
					</span>
					<span class="label px-2 py-0.5 rounded-xs bg-ok-tint text-ok border border-ok-line">{accuracy}% Akurasi</span>
				</div>
				<p class="label text-ink-4">Jawaban Benar</p>
				<p class="text-xl font-bold text-ink mono mt-1">{result.correct} / {result.total} Soal</p>
				<p class="text-xs text-ink-3 mt-1">{result.total - result.correct} perlu diulang</p>
			</div>

			<div class="rounded-xl bg-surface border border-line p-4">
				<div class="flex items-center justify-between mb-3">
					<span class="w-8 h-8 rounded-md bg-elevated border border-line text-ink-2 grid place-items-center">
						<Clock size={15} />
					</span>
					<span class="label px-2 py-0.5 rounded-xs bg-elevated border border-line text-ink-3">Fokus</span>
				</div>
				<p class="label text-ink-4">Waktu Pengerjaan</p>
				<p class="text-xl font-bold text-ink mono mt-1">{formatDuration(result.time_ms)}</p>
				<p class="text-xs text-ink-3 mt-1">rata-rata ~{avgSeconds} dtk/soal</p>
			</div>

			<div class="rounded-xl bg-surface border border-line p-4">
				<div class="flex items-center justify-between mb-3">
					<span class="w-8 h-8 rounded-md bg-warn-tint border border-warn-line text-warn grid place-items-center">
						<Zap size={15} />
					</span>
					<span class="label px-2 py-0.5 rounded-xs bg-warn-tint text-warn border border-warn-line">Level {level}</span>
				</div>
				<p class="label text-ink-4">XP Diperoleh</p>
				<p class="text-xl font-bold text-ink mono mt-1">+{xpGained} XP</p>
				<p class="text-xs text-ink-3 mt-1">total {totalXp($progress)} XP</p>
			</div>

			<div class="rounded-xl bg-surface border border-line p-4">
				<div class="flex items-center justify-between mb-3">
					<span class="w-8 h-8 rounded-md grid place-items-center {pass
						? 'bg-ok-tint border border-ok-line text-ok'
						: 'bg-warn-tint border border-warn-line text-warn'}">
						<Trophy size={15} />
					</span>
					<span class="label px-2 py-0.5 rounded-xs border inline-flex items-center gap-1 {pass
						? 'bg-ok-tint text-ok border-ok-line'
						: 'bg-warn-tint text-warn border-warn-line'}">
						<Unlock size={11} /> {pass ? 'Unlocked' : 'Locked'}
					</span>
				</div>
				<p class="label text-ink-4">Lencana Baru</p>
				<p class="text-[15px] font-bold text-ink mt-1 truncate">{data.scope.title} Explorer {roman(data.mod.bab_number)}</p>
				<p class="text-xs text-ink-3 mt-1">{pass ? `Akreditasi ${data.mod.subtitle}` : `Skor minimal ${PASS_SCORE} untuk membuka`}</p>
			</div>
		</div>

		<!-- bab berikutnya -->
		{#if next}
			<section class="mt-6 rounded-xl border {pass ? 'border-ok-line' : 'border-line'} overflow-hidden">
				<div class="flex items-center gap-3 px-5 py-3 border-b {pass ? 'border-ok-line bg-ok-tint' : 'border-line bg-surface'}">
					<span class="label px-2 py-0.5 rounded-xs {pass ? 'bg-ok text-canvas' : 'bg-warn text-canvas'}">
						{pass ? 'Konten Baru Terbuka' : 'Bab Berikutnya Terkunci'}
					</span>
					<span class="label text-ink-3">
						{pass ? 'Modul Lanjutan Tersedia' : `Skor belum mencapai ${PASS_SCORE} — ulangi kuis untuk membuka`}
					</span>
				</div>

				<div class="grid md:grid-cols-[1fr_auto] gap-6 p-6 bg-surface">
					<div class="min-w-0">
						<h2 class="text-[24px] leading-8 font-bold text-ink tracking-tight">Bab {next.bab_number}: {next.title}</h2>
						<p class="text-sm leading-[22px] text-ink-3 mt-2 max-w-2xl">{next.subtitle} · lanjutkan alur belajar kamu tanpa kehilangan momentum.</p>
						<div class="flex flex-wrap items-center gap-2 mt-4">
							<span class="label px-2.5 py-1 rounded-xs bg-elevated border border-line text-ink-3">{BABS_PER_SCOPE} Bab total</span>
							<span class="label px-2.5 py-1 rounded-xs bg-elevated border border-line text-ink-3">{next.quiz.length} Kuis Interaktif</span>
							<span class="label px-2.5 py-1 rounded-xs bg-elevated border border-line text-ink-3">{data.scope.est_time}</span>
						</div>
						<div class="grid sm:grid-cols-3 gap-3 mt-5">
							{#each ['Penjelasan ringkas', 'Contoh kode nyata', 'Poin kunci & pembahasan'] as item (item)}
								<span class="flex items-center gap-2 text-[13px] text-ink-2">
									<Check size={14} class="text-ok shrink-0" strokeWidth={2.5} /> {item}
								</span>
							{/each}
						</div>
					</div>

					<div class="rounded-lg border border-line bg-code-bg p-4 min-w-[260px] self-start">
						<div class="flex items-center justify-between mb-3">
							<span class="label text-ink-4">devpath:~/modul-{String(next.bab_number).padStart(2, '0')}</span>
						<span class="label px-1.5 py-0.5 rounded-xs {pass ? 'bg-ok-tint text-ok border border-ok-line' : 'bg-warn-tint text-warn border border-warn-line'}"
							>{pass ? 'READY' : 'LOCKED'}</span
						>
						</div>
						<pre class="text-[12px] leading-6 font-mono text-ink-3 overflow-x-auto"><code>$ npm run start:dev
[progress] bab {data.mod.bab_number}: {result.score}%
[status] {pass ? 'next module unlocked' : `skor belum ${PASS_SCORE} — bab terkunci`}
[routes] {pass ? `/belajar/${data.scope.id}/${next.bab_number}` : `/kuis/${data.scope.id}/${data.mod.bab_number}`}</code></pre>
						<a
							href={pass ? `/belajar/${data.scope.id}/${next.bab_number}` : `/kuis/${data.scope.id}/${data.mod.bab_number}`}
							class="mt-4 w-full py-2.5 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all {pass
								? 'bg-ink text-canvas hover:opacity-90'
								: 'bg-elevated border border-line text-ink hover:bg-raised'}"
						>
							{pass ? 'Lanjut ke Bab Berikutnya' : 'Ulangi Kuis untuk Buka Bab'}
							{#if pass}<ArrowRight size={15} />{:else}<RotateCcw size={15} />{/if}
						</a>
					</div>
				</div>
			</section>
		{/if}

		<!-- review soal -->
		<section class="mt-10" id="review">
			<div class="flex flex-wrap items-end justify-between gap-3 mb-4">
				<div>
					<h2 class="text-[20px] font-semibold text-ink">Tinjau Pertanyaan Kuis</h2>
					<p class="text-sm text-ink-3 mt-1">
						Evaluasi mendalam pemahamanmu atas Modul {String(data.mod.bab_number).padStart(2, '0')} · {data.mod.title}
					</p>
				</div>
				<span class="label text-ink-4">{result.total} Evaluasi Terverifikasi</span>
			</div>

			<ol class="space-y-3">
				{#each data.mod.quiz as question, i (question.id)}
					{@const jawaban = result.answers[i] ?? -1}
					{@const benar = jawaban === question.correct_answer_index}
					<li class="rounded-xl bg-surface border {benar ? 'border-line' : 'border-err-line'} p-4">
						<div class="flex flex-wrap items-start gap-4">
							<span
								class="w-8 h-8 shrink-0 rounded-md border grid place-items-center mono text-sm font-semibold {benar
									? 'bg-elevated border-line text-ink-2'
									: 'bg-err-tint border-err-line text-err'}"
							>
								{i + 1}
							</span>
							<div class="flex-1 min-w-0">
								<p class="text-[15px] font-semibold text-ink leading-6">{question.question}</p>

								<!-- empat pilihan ganda + status jawaban -->
								<ol class="mt-3 space-y-2">
									{#each question.options as option, oi}
										{@const kunci = oi === question.correct_answer_index}
										{@const pilihanKu = oi === jawaban}
										<li
											class="flex items-start gap-2.5 rounded-lg border px-3 py-2 text-sm leading-[22px] {kunci
												? 'border-ok-line bg-ok-tint/70 text-ink'
												: pilihanKu
													? 'border-err-line bg-err-tint/70 text-ink'
													: 'border-line bg-elevated/50 text-ink-2'}"
										>
											<span
												class="w-5 h-5 shrink-0 mt-px rounded border grid place-items-center mono text-[11px] font-semibold {kunci
													? 'bg-ok border-ok text-canvas'
													: pilihanKu
														? 'bg-err border-err text-canvas'
														: 'bg-surface border-line text-ink-4'}"
											>
												{'ABCD'[oi]}
											</span>
											<span class="flex-1 min-w-0">{option}</span>
											{#if kunci}
												<span
													class="label px-1.5 py-0.5 rounded-xs shrink-0 inline-flex items-center gap-1 bg-ok text-canvas"
												>
													<Check size={10} strokeWidth={3} /> Jawaban benar
												</span>
											{:else if pilihanKu}
												<span
													class="label px-1.5 py-0.5 rounded-xs shrink-0 inline-flex items-center gap-1 bg-err text-canvas"
												>
													<X size={10} strokeWidth={3} /> Jawabanku
												</span>
											{/if}
										</li>
									{/each}
								</ol>

								<p class="text-[13px] leading-5 text-ink-3 mt-2.5">
									<b class="text-ink-2 font-semibold">Pembahasan:</b> {question.explanation}
								</p>
							</div>
							<span
								class="label px-2.5 py-1 rounded-xs shrink-0 inline-flex items-center gap-1.5 {benar
									? 'bg-ok-tint text-ok border border-ok-line'
									: 'bg-err-tint text-err border border-err-line'}"
							>
								{#if benar}<Check size={11} strokeWidth={3} /> Benar{:else}<X size={11} strokeWidth={3} /> Perlu Penguatan{/if}
							</span>
						</div>
					</li>
				{/each}
			</ol>
		</section>

		<!-- action row -->
		<div class="mt-8 flex flex-wrap items-center justify-between gap-4">
			<div class="flex flex-wrap items-center gap-3">
				<a
					href="#review"
					class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-line text-sm text-ink-2 hover:text-ink transition-colors"
				>
					<RotateCcw size={15} /> Tinjau Ulang Jawaban
				</a>
				<button
					type="button"
					onclick={() => navigator.clipboard?.writeText(window.location.href)}
					class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-line text-sm text-ink-2 hover:text-ink transition-colors"
				>
					<Share2 size={15} /> Bagikan Lencana
				</button>
			</div>

			<div class="flex flex-wrap items-center gap-3">
				<a
					href="/roadmap/{data.scope.id}"
					class="inline-flex items-center gap-2 text-sm text-ink-3 hover:text-ink transition-colors"
				>
					<ArrowLeft size={15} /> Kembali ke Roadmap
				</a>
				{#if next && pass}
					<a
						href="/belajar/{data.scope.id}/{next.bab_number}"
						class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-canvas text-sm font-semibold hover:opacity-90 transition-all active:scale-[0.98]"
					>
						Mulai Bab {next.bab_number} Sekarang <ArrowRight size={15} />
					</a>
				{:else if !pass}
					<a
						href="/kuis/{data.scope.id}/{data.mod.bab_number}"
						class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-canvas text-sm font-semibold hover:opacity-90 transition-all"
					>
						<RotateCcw size={15} /> Ulangi Kuis
					</a>
				{:else}
					<a
						href="/"
						class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-canvas text-sm font-semibold hover:opacity-90 transition-all"
					>
						Pilih Alur Lain <ArrowRight size={15} />
					</a>
				{/if}
			</div>
		</div>
	</div>
{/if}
