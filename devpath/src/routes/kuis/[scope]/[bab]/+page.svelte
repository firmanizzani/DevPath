<script lang="ts">
	import {
		X,
		ArrowRight,
		ArrowLeft,
		Check,
		Lock,
		Trophy,
		MessageSquare,
		BookMarked,
		Send,
		ListChecks
	} from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import {
		isUnlocked,
		markCompleted,
		progress,
		passed,
		PASS_SCORE,
		QUESTIONS_PER_BAB
	} from '$lib/services/progress';
	import { saveResult } from '$lib/services/result';
	import { nextModule } from '$lib/data';
	import { postQuizSubmit } from '$lib/services/content';

	let { data } = $props();

	const nextBab = $derived(nextModule(data.scope.id, data.mod.bab_number));

	function roman(n: number) {
		return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][n - 1] ?? 'I';
	}

	let idx = $state(0);
	let answers = $state<Record<number, number>>({});
	let submitting = $state(false);
	const startedAt = Date.now();

	const questions = $derived(data.mod.quiz);
	const total = $derived(questions.length);
	const q = $derived(questions[idx]);
	const chosen = $derived(answers[idx]);
	const answeredCount = $derived(Object.keys(answers).length);
	const allAnswered = $derived(answeredCount >= total);
	const percent = $derived(Math.round((answeredCount / total) * 100));
	const unlocked = $derived(isUnlocked($progress, data.scope.id, data.mod.bab_number));
	const remaining = $derived(Math.max(0, total - answeredCount));

	function pick(i: number) {
		answers = { ...answers, [idx]: i };
	}

	function gotoQ(n: number) {
		if (n >= 0 && n < total) idx = n;
	}

	function stepNext() {
		if (idx < total - 1) {
			idx += 1;
			return;
		}
		if (allAnswered) void finish();
	}

	async function finish() {
		if (submitting || !allAnswered) return;
		submitting = true;
		try {
			const answerList = questions.map((_, i) => answers[i] ?? -1);
			let correct = questions.filter(
				(question, i) => answers[i] === question.correct_answer_index
			).length;
			let score = Math.round((correct / total) * 100);

			// Penilaian oleh server (simpan ke user_progress bila >= PASS_SCORE) — fallback lokal.
			const remote = await postQuizSubmit(data.mod.id, answerList);
			if (remote) {
				score = remote.score;
				correct = remote.correct;
			}

			saveResult({
				scope_id: data.scope.id,
				bab_number: data.mod.bab_number,
				score,
				correct,
				total,
				answers: answerList,
				time_ms: Date.now() - startedAt,
				at: Date.now()
			});
			markCompleted(data.scope.id, data.mod.bab_number, score);

			if (passed(score)) {
				void import('$lib/services/progressSync').then(({ pushCompletion }) =>
					pushCompletion(data.scope.id, data.mod.bab_number, score, true)
				);
			}

			await goto(`/hasil/${data.scope.id}/${data.mod.bab_number}`);
		} finally {
			submitting = false;
		}
	}

	function exitQuiz() {
		if (answeredCount === 0 || confirm('Keluar dari kuis? Jawaban yang sudah dipilih akan hilang.')) {
			goto(`/roadmap/${data.scope.id}`);
		}
	}

	function onKey(event: KeyboardEvent) {
		const tag = (event.target as HTMLElement | null)?.tagName;
		if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
		if (event.key === 'Enter') {
			event.preventDefault();
			stepNext();
			return;
		}
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			if (idx > 0) idx -= 1;
			return;
		}
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			stepNext();
			return;
		}
		if (['1', '2', '3', '4'].includes(event.key)) pick(Number(event.key) - 1);
	}

	const letters = ['A', 'B', 'C', 'D'];
</script>

<svelte:window onkeydown={onKey} />

{#if !unlocked}
	<div class="px-4 md:px-8 py-20 max-w-lg mx-auto text-center animate-fade">
		<div class="w-14 h-14 rounded-full bg-elevated border border-line grid place-items-center mx-auto text-ink-3">
			<Lock size={22} />
		</div>
		<h1 class="text-title text-ink mt-5">Kuis masih terkunci</h1>
		<p class="text-sm text-ink-3 mt-2">
			Raih skor minimal {PASS_SCORE} ({Math.round((PASS_SCORE / 100) * QUESTIONS_PER_BAB)} dari {QUESTIONS_PER_BAB} soal benar) pada bab
			sebelumnya untuk membuka kuis ini.
		</p>
		<a href="/roadmap/{data.scope.id}" class="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-ink text-canvas text-sm font-semibold">
			Kembali ke Roadmap
		</a>
	</div>
{:else}
	<!-- top bar -->
	<div class="sticky top-16 z-30 bg-canvas/92 backdrop-blur-xl border-b border-line">
		<div class="px-4 md:px-8 py-2.5 flex items-center gap-4">
			<nav class="hidden md:flex items-center gap-2 text-[13px] text-ink-4 shrink-0">
				<a href="/roadmap/{data.scope.id}" class="hover:text-ink transition-colors">{data.scope.title}</a>
				<span>/</span>
				<span class="text-ink-3">Modul {String(data.mod.bab_number).padStart(2, '0')}</span>
				<span>/</span>
				<span class="text-ink">Kuis Evaluasi</span>
			</nav>

			<div class="flex items-center gap-3 mx-auto w-full max-w-sm">
				<span class="label text-ink-2 whitespace-nowrap">{answeredCount}/{total} terjawab</span>
				<div class="flex-1"><ProgressBar percent={percent} tone="info" height="h-1.5" /></div>
				<span class="label text-ink-3 mono w-9 text-right">{percent}%</span>
			</div>

			<button
				type="button"
				onclick={exitQuiz}
				class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-line text-ink-2 hover:text-ink text-[13px] font-medium transition-colors shrink-0"
			>
				<X size={14} /> <span class="hidden sm:inline">Keluar Kuis</span>
			</button>
		</div>
	</div>

	<div class="px-4 md:px-8 py-8 max-w-4xl mx-auto animate-fade">
		<!-- header kuis + pagination -->
		<div class="rounded-xl bg-surface border border-line p-5 mb-6">
			<div class="flex flex-wrap items-start justify-between gap-4">
				<div class="min-w-0">
					<p class="label text-ink-4 mb-2">
						Modul {String(data.mod.bab_number).padStart(2, '0')} · {data.mod.subtitle}
					</p>
					<h1 class="text-[22px] leading-7 font-semibold text-ink">
						Kuis Bab {data.mod.bab_number}: {data.mod.title}
					</h1>
					<p class="text-[13px] text-ink-3 mt-2 flex flex-wrap items-center gap-2">
						<span class="label px-2 py-0.5 rounded-xs bg-elevated border border-line text-ink-2"
							>{total} Soal · Skor lulus ≥ {PASS_SCORE}%</span
						>
						<span class="text-ink-4">Kumpulkan setelah semua soal terjawab.</span>
					</p>
				</div>
				<div class="w-full md:w-auto min-w-0 md:shrink-0">
					<p class="label text-ink-4 mb-2 text-right">Nomor Soal</p>
					<div class="flex flex-wrap items-center gap-1.5 justify-end">
						{#each questions as _, i (i)}
							{@const isAnswered = answers[i] !== undefined}
							{@const isNow = i === idx}
							<button
								type="button"
								onclick={() => gotoQ(i)}
								aria-label="Buka soal {i + 1}"
								aria-current={isNow ? 'true' : undefined}
								class="w-8 h-8 rounded-md grid place-items-center text-[12px] mono font-semibold border transition-all {isNow
									? 'bg-warn text-canvas border-warn scale-105'
									: isAnswered
										? 'bg-ink text-canvas border-ink hover:opacity-80'
										: 'bg-elevated text-ink-4 border-line hover:border-line-strong'}"
							>
								{i + 1}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- pertanyaan -->
		{#key idx}
		<article class="rounded-xl bg-surface border border-line p-6 md:p-8 animate-rise">
			<div class="flex flex-wrap items-center justify-between gap-3 mb-5">
				<span class="label inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-warn-tint text-warn border border-warn-line">
					<span class="w-1.5 h-1.5 rounded-full bg-warn"></span>
					Soal #{String(idx + 1).padStart(2, '0')} · {data.mod.subtitle}
				</span>
				<span class="label text-ink-4">{q.id}</span>
			</div>

			<h2 class="text-[24px] md:text-[28px] leading-[36px] font-bold tracking-tight text-ink mb-6">
				<RichText text={q.question} />
			</h2>

			{#if q.code}
				<CodeBlock code={q.code} lang={q.code_lang ?? 'javascript'} caption={q.code_caption ?? ''} />
			{/if}

			<div class="space-y-3">
				{#each q.options as option, i (i)}
					{@const isChosen = chosen === i}
					<button
						type="button"
						onclick={() => pick(i)}
						class="w-full text-left rounded-lg border p-4 flex items-start gap-4 transition-all {isChosen
							? 'bg-elevated border-line-strong'
							: 'bg-surface border-line hover:border-line-strong hover:bg-elevated/60'}"
					>
						<span
							class="w-9 h-9 shrink-0 rounded-md border grid place-items-center mono text-sm font-semibold {isChosen
								? 'bg-ink text-canvas border-ink'
								: 'bg-elevated border-line text-ink-2'}"
						>
							{letters[i]}
						</span>
						<span class="flex-1 min-w-0">
							<span class="flex flex-wrap items-center justify-between gap-2">
								<span class="text-[16px] font-semibold text-ink">{option}</span>
								{#if isChosen}
									<span class="label text-ink-3 hidden sm:inline inline-flex items-center gap-1">
										<Check size={11} strokeWidth={3} /> Dipilih
									</span>
								{:else}
									<span class="label text-ink-4 hidden sm:inline">Tekan {letters[i]}</span>
								{/if}
							</span>
						</span>
					</button>
				{/each}
			</div>
		</article>
		{/key}

		<!-- action bar -->
		<div class="mt-5 rounded-xl bg-surface border border-line p-4 flex flex-wrap items-center justify-between gap-4">
			<div class="flex flex-wrap items-center gap-5">
				<div class="flex items-center gap-3">
					<span class="w-8 h-8 rounded-md {allAnswered ? 'bg-ok-tint border border-ok-line text-ok' : 'bg-warn-tint border border-warn-line text-warn'} grid place-items-center">
						<ListChecks size={15} />
					</span>
					<div>
						<p class="label text-ink-4">Jawaban Terkumpul</p>
						<p class="mono text-sm font-semibold text-ink">
							{answeredCount} / {total} soal
							{#if !allAnswered}<span class="text-warn">({remaining} belum dijawab)</span>{/if}
						</p>
					</div>
				</div>
				<div class="flex items-center gap-2 text-[13px]">
					<span class="w-1.5 h-1.5 rounded-full bg-info"></span>
					<span class="text-ink-3">Ambang kelulusan: <b class="mono text-ink">{Math.round((PASS_SCORE / 100) * QUESTIONS_PER_BAB)}/{QUESTIONS_PER_BAB} benar ({PASS_SCORE}%)</b></span>
				</div>
			</div>

			<div class="flex items-center gap-3">
				<button
					type="button"
					onclick={() => gotoQ(idx - 1)}
					disabled={idx === 0}
					class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-line text-sm font-semibold text-ink-2 hover:text-ink transition-all disabled:opacity-40 disabled:cursor-not-allowed"
				>
					<ArrowLeft size={15} /> Sebelumnya
				</button>

				{#if idx < total - 1}
					<button
						type="button"
						onclick={stepNext}
						class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] bg-ink text-canvas hover:opacity-90"
					>
						Selanjutnya ({idx + 2}/{total})
						<ArrowRight size={15} />
					</button>
				{:else}
					<button
						type="button"
						onclick={finish}
						disabled={!allAnswered || submitting}
						class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed {allAnswered
							? 'bg-ink text-canvas hover:opacity-90'
							: 'bg-raised text-ink-4'}"
					>
						{#if submitting}
							Menghitung skor…
						{:else}
							Kumpulkan Jawaban ({answeredCount}/{total})
						{/if}
						<Send size={15} />
					</button>
				{/if}
			</div>
		</div>

		{#if idx === total - 1 && !allAnswered}
			<p class="mt-3 text-[13px] text-ink-4 flex items-center gap-1.5">
				<Lock size={13} /> Masih ada {remaining} soal belum dijawab — gunakan nomor di atas untuk
				melompat ke soal yang kosong.
			</p>
		{/if}

		<!-- info tambahan -->
		<div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
			<div class="rounded-xl bg-surface border border-line p-4">
				<p class="label text-ink-4 flex items-center gap-1.5 mb-2"><BookMarked size={12} /> Modul Berikutnya</p>
				<p class="text-sm font-medium text-ink-2 truncate">
					{#if nextBab}
						Bab {nextBab.bab_number} · {nextBab.title}
					{:else}
						Selesai — cek lencana kamu
					{/if}
				</p>
			</div>
			<div class="rounded-xl bg-surface border border-line p-4">
				<p class="label text-ink-4 flex items-center gap-1.5 mb-2"><Trophy size={12} /> Target Lencana</p>
				<p class="text-sm font-medium text-ink-2 truncate">{data.scope.title} Specialist {roman(data.mod.bab_number)}</p>
			</div>
			<div class="rounded-xl bg-surface border border-line p-4">
				<p class="label text-ink-4 flex items-center gap-1.5 mb-2"><MessageSquare size={12} /> Diskusi Komunitas</p>
				<p class="text-sm font-medium text-ink-2">{12 + data.mod.bab_number * 3} pembelajar membahas soal ini</p>
			</div>
		</div>
	</div>
{/if}
