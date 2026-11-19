<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import {
		Check,
		ChevronRight,
		LoaderCircle,
		LogOut,
		RotateCcw,
		Save,
		Lock,
		TriangleAlert,
		User
	} from '@lucide/svelte';
	import { progress, resetAll, totalXp } from '$lib/services/progress';
	import { resetRemoteProgress } from '$lib/services/progressSync';
	import { authProfile, signOut, supabase } from '$lib/services/supabase';

	const user = $derived(page.data.user);
	const profile = $derived(page.data.profile);

	let fullName = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let showPassword = $state(false);
	let hydrated = $state(false);
	let busy = $state(false);
	let success = $state<string | null>(null);
	let error = $state<string | null>(null);

	$effect(() => {
		if (profile && !hydrated) {
			fullName = profile.full_name ?? '';
			hydrated = true;
		}
	});

	const xp = $derived(totalXp($progress));
	const doneCount = $derived(
		Object.values($progress.scopes).reduce((sum, p) => sum + p.completed.length, 0)
	);

	const authMessages: Record<string, string> = {
		'password should be at least 6 characters': 'Password baru minimal 8 karakter.',
		'signup requires a valid password': 'Password baru minimal 8 karakter.',
		'new password should be different': 'Password baru tidak boleh sama dengan password lama.',
		'invalid login credentials': 'Password lama salah. Coba lagi.',
		'secure password change': 'Supabase meminta konfirmasi password lama. Coba ganti dari email reset.',
		'requires password confirmation': 'Konfirmasi password tidak cocok.',
		'rate limit exceeded': 'Terlalu banyak percobaan. Tunggu beberapa saat lalu coba lagi.',
		'no session': 'Sesi kamu sudah berakhir. Masuk kembali lalu ulangi.'
	};

	function mapAuthError(raw: string): string {
		for (const key of Object.keys(authMessages)) {
			if (raw.toLowerCase().includes(key.toLowerCase())) return authMessages[key];
		}
		return raw;
	}

	async function save(event: Event) {
		event.preventDefault();
		if (!user) return;
		success = null;
		error = null;

		if (newPassword || confirmPassword) {
			if (newPassword.length < 8) {
				error = 'Password baru minimal 8 karakter.';
				return;
			}
			if (newPassword !== confirmPassword) {
				error = 'Konfirmasi password baru tidak cocok.';
				return;
			}
		}

		busy = true;
		try {
			const { error: err } = await supabase().from('profiles').upsert(
				{
					id: user.id,
					email: user.email,
					full_name: fullName.trim(),
					updated_at: new Date().toISOString()
				},
				{ onConflict: 'id' }
			);

			if (err) {
				error = err.message;
				return;
			}

			let passwordChanged = false;
			if (newPassword) {
				const { error: perr } = await supabase().auth.updateUser({ password: newPassword });
				if (perr) {
					error = mapAuthError(perr.message);
					return;
				}
				passwordChanged = true;
				newPassword = '';
				confirmPassword = '';
			}

			success = passwordChanged
				? 'Profil & password berhasil diperbarui.'
				: 'Profil berhasil diperbarui.';
			authProfile.update((p) => ({
				...(p ?? { id: user.id, email: user.email, full_name: null, target_scope: null, avatar_url: null }),
				full_name: fullName.trim()
			}));
			await invalidateAll();
		} catch (e) {
			error = e instanceof Error ? mapAuthError(e.message) : 'Terjadi kesalahan. Coba lagi.';
		} finally {
			busy = false;
		}
	}

	async function doReset() {
		if (!confirm('Hapus semua progres belajar & skor kuis (lokal dan di akun)?')) return;
		resetAll();
		if (user) await resetRemoteProgress();
		success = 'Progres belajar direset.';
		error = null;
	}

	async function doLogout() {
		await signOut();
		await invalidateAll();
		goto('/');
	}
</script>

<div class="px-4 md:px-8 py-12 max-w-3xl mx-auto animate-fade">
	<p class="label text-ink-4 mb-3">Pengaturan Akun</p>
	<h1 class="text-display-sm md:text-display text-ink font-bold tracking-tight">Pengaturan</h1>

	{#if !user}
		<div class="mt-8 rounded-xl bg-surface border border-line p-8 text-center">
			<div
				class="w-12 h-12 rounded-full bg-elevated border border-line grid place-items-center mx-auto text-ink-3"
			>
				<User size={20} />
			</div>
			<h2 class="text-[17px] font-semibold text-ink mt-4">Kamu belum masuk</h2>
			<p class="text-sm text-ink-3 mt-1.5">
				Masuk untuk menyimpan profil dan progres belajar di awan.
			</p>
			<div class="flex items-center justify-center gap-2 mt-5">
				<a
					href="/login"
					class="px-4 py-2 rounded-lg bg-ink text-canvas text-sm font-semibold hover:opacity-90 transition-opacity"
					>Masuk</a
				>
				<a
					href="/register"
					class="px-4 py-2 rounded-lg border border-line text-sm font-medium text-ink-2 hover:text-ink hover:border-line-strong transition-colors"
					>Daftar</a
				>
			</div>
		</div>
	{:else}
		{#if success}
			<div
				class="mt-6 flex items-center gap-2.5 rounded-lg border border-ok-line bg-ok-tint px-3.5 py-2.5 text-[13.5px] text-ok"
				role="status"
			>
				<Check size={15} /> {success}
			</div>
		{/if}
		{#if error}
			<div
				class="mt-6 flex items-center gap-2.5 rounded-lg border border-err-line bg-err-tint px-3.5 py-2.5 text-[13.5px] text-err"
				role="alert"
			>
				<TriangleAlert size={15} /> {error}
			</div>
		{/if}

		<!-- Profil -->
		<section class="mt-6 rounded-xl bg-surface border border-line p-6">
			<h2 class="text-[16px] font-semibold text-ink">Profil</h2>
			<p class="text-[13px] text-ink-3 mt-1">Informasi dasar yang menemani progres belajarmu.</p>

			<form class="mt-5 space-y-4" onsubmit={save}>
				<label class="block">
					<span class="label text-ink-4 mb-1.5 block">Nama Lengkap</span>
					<input
						bind:value={fullName}
						type="text"
						autocomplete="name"
						placeholder="Nama kamu"
						class="w-full rounded-lg bg-elevated border border-line px-3 py-2.5 text-sm text-ink placeholder:text-ink-4 outline-none focus:border-ink-4 focus:ring-2 focus:ring-ink/15 transition-colors"
					/>
				</label>

				<label class="block">
					<span class="label text-ink-4 mb-1.5 block">Email</span>
					<input
						type="email"
						value={user.email}
						disabled
						class="w-full rounded-lg bg-surface border border-line px-3 py-2.5 text-sm text-ink-3 cursor-not-allowed"
					/>
				</label>

				<div class="border-t border-line pt-4 mt-1">
					<h3 class="text-[13.5px] font-semibold text-ink">Ganti Password</h3>
					<p class="text-[12.5px] leading-5 text-ink-4 mt-1 mb-3.5">
						Kosongkan bila tidak ingin mengganti. Hash-nya disimpan otomatis ke kolom
						<code class="mono text-[12px]">profiles.password_hash</code>.
					</p>

					<label class="block">
						<span class="label text-ink-4 mb-1.5 block">Password Baru</span>
						<div class="relative">
							<Lock
								size={15}
								class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4 pointer-events-none"
							/>
							<input
								bind:value={newPassword}
								type={showPassword ? 'text' : 'password'}
								autocomplete="new-password"
								placeholder="Minimal 8 karakter"
								class="w-full rounded-lg bg-elevated border border-line pl-9 pr-10 py-2.5 text-sm text-ink placeholder:text-ink-4 outline-none focus:border-ink-4 focus:ring-2 focus:ring-ink/15 transition-colors"
							/>
							<button
								type="button"
								onclick={() => (showPassword = !showPassword)}
								class="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-4 hover:text-ink transition-colors"
								aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
							>
								{#if showPassword}
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
										stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
										><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path
											d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
										/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line
											x1="2"
											x2="22"
											y1="2"
											y2="22"
										/></svg
									>
								{:else}
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
										stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
										><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg
									>
								{/if}
							</button>
						</div>
					</label>

					<label class="block mt-3.5">
						<span class="label text-ink-4 mb-1.5 block">Ulangi Password Baru</span>
						<div class="relative">
							<Lock
								size={15}
								class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4 pointer-events-none"
							/>
							<input
								bind:value={confirmPassword}
								type={showPassword ? 'text' : 'password'}
								autocomplete="new-password"
								placeholder="Ulangi password baru"
								class="w-full rounded-lg bg-elevated border border-line pl-9 pr-3 py-2.5 text-sm text-ink placeholder:text-ink-4 outline-none focus:border-ink-4 focus:ring-2 focus:ring-ink/15 transition-colors"
							/>
						</div>
					</label>
				</div>

				<button
					type="submit"
					disabled={busy}
					class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-ink text-canvas text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity"
				>
					{#if busy}<LoaderCircle size={15} class="animate-spin" />{:else}<Save size={15} /> Simpan
					Perubahan{/if}
				</button>
			</form>
		</section>

		<!-- Ringkasan -->
		<section class="mt-4 rounded-xl bg-surface border border-line p-6">
			<h2 class="text-[16px] font-semibold text-ink">Ringkasan Belajar</h2>
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
				<div class="rounded-lg bg-elevated border border-line p-3.5">
					<p class="label text-ink-4">Total XP</p>
					<p class="mono text-lg font-bold text-warn mt-1">{xp}</p>
				</div>
				<div class="rounded-lg bg-elevated border border-line p-3.5">
					<p class="label text-ink-4">Bab Selesai</p>
					<p class="mono text-lg font-bold text-ink mt-1">{doneCount}/28</p>
				</div>
				<div class="rounded-lg bg-elevated border border-line p-3.5">
					<p class="label text-ink-4">Penyimpanan</p>
					<p class="mono text-[13px] font-bold text-ok mt-1.5">Awan + Lokal</p>
				</div>
			</div>
			<a
				href="/progres"
				class="inline-flex items-center gap-1.5 text-[13.5px] text-ink-3 hover:text-ink transition-colors mt-4"
			>
				Lihat progres lengkap <ChevronRight size={14} />
			</a>
		</section>

		<!-- Zona berbahaya -->
		<section class="mt-4 rounded-xl bg-surface border border-err-line p-6">
			<h2 class="text-[16px] font-semibold text-err">Zona Berbahaya</h2>
			<p class="text-[13px] text-ink-3 mt-1">
				Menghapus progres tidak bisa dibatalkan dan berlaku di semua perangkat.
			</p>
			<div class="flex flex-wrap items-center gap-2.5 mt-4">
				<button
					type="button"
					onclick={doReset}
					class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-err-line bg-err-tint text-err text-sm font-semibold hover:bg-err/15 transition-colors"
				>
					<RotateCcw size={15} /> Reset progres belajar
				</button>
				<button
					type="button"
					onclick={doLogout}
					class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-line text-ink-2 text-sm font-medium hover:text-ink hover:border-line-strong transition-colors"
				>
					<LogOut size={15} /> Keluar dari akun
				</button>
			</div>
		</section>
	{/if}
</div>
