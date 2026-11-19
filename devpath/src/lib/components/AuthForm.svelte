<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { onMount, untrack } from 'svelte';
	import {
		ArrowRight,
		CircleAlert,
		Check,
		LoaderCircle,
		Lock,
		Mail,
		User
	} from '@lucide/svelte';
	import { supabase, authUser, authProfile } from '$lib/services/supabase';
	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

	let {
		mode = 'login',
		initialError = null
	}: { mode?: 'login' | 'register'; initialError?: string | null } = $props();

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirm = $state('');
	let showPassword = $state(false);

	let busy = $state(false);
	let error = $state<string | null>(null);
	let success = $state<string | null>(null);
	/** null = belum dicek, true = provider Google aktif, false = belum diaktifkan. */
	let googleReady = $state<boolean | null>(null);

	const isRegister = $derived(mode === 'register');

	const tabClass = (active: boolean) =>
		active
			? 'bg-ink text-canvas shadow-[0_1px_2px_rgba(0,0,0,.22)]'
			: 'text-ink-3 hover:text-ink hover:bg-ink/5';

	const googleOffMessage =
		'Login Google belum diaktifkan di proyek Supabase. Aktifkan provider Google (Client ID & Secret) di Dashboard → Authentication → Providers, lalu tambahkan URL /auth/callback ke Redirect URLs.';

	const messages: Record<string, string> = {
		'Invalid login credentials': 'Email atau password salah.',
		'Email not confirmed': 'Email belum dikonfirmasi. Silakan cek inbox kamu.',
		'User already registered': 'Email sudah terdaftar. Gunakan tab Masuk.',
		'User already exists': 'Email sudah terdaftar. Gunakan tab Masuk.',
		'Signup requires a valid password': 'Password minimal 6 karakter.',
		'Password should be at least 6 characters': 'Password minimal 6 karakter.',
		'Password is too weak': 'Password terlalu lemah.',
		'Signups not allowed for this instance': 'Pendaftaran sedang ditutup.',
		'Anonymous signins are disabled': 'Login anonim dinonaktifkan.',
		'Unsupported provider': googleOffMessage,
		'provider is not enabled': googleOffMessage,
		'access_denied': 'Permintaan login dibatalkan.',
		'invalid flow state': 'Sesi login kedaluwarsa. Coba lagi dari awal.',
		'flow state': 'Sesi login kedaluwarsa. Coba lagi dari awal.',
		'code_challenge': 'Sesi login kedaluwarsa. Coba lagi dari awal.',
		'rate limit exceeded': 'Terlalu banyak percobaan. Coba lagi beberapa saat lagi.'
	};

	function mapError(raw: string): string {
		for (const key of Object.keys(messages)) {
			if (raw.toLowerCase().includes(key.toLowerCase())) return messages[key];
		}
		return raw;
	}

	// pesan error OAuth dibawa dari /login?error=… (lihat routes/auth/callback)
	error = untrack(() => (initialError ? mapError(initialError) : null));

	onMount(() => {
		void (async () => {
			try {
				const res = await fetch(`${PUBLIC_SUPABASE_URL}/auth/v1/settings`, {
					headers: { apikey: PUBLIC_SUPABASE_ANON_KEY }
				});
				const json = await res.json();
				googleReady = Boolean(json?.external?.google);
			} catch {
				googleReady = null;
			}
		})();
	});

	function validate(): string | null {
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Format email tidak valid.';
		if (password.length < 6) return 'Password minimal 6 karakter.';
		if (isRegister) {
			if (name.trim().length < 2) return 'Nama lengkap minimal 2 karakter.';
			if (password.length < 8) return 'Saat mendaftar, password minimal 8 karakter.';
			if (password !== confirm) return 'Konfirmasi password tidak cocok.';
		}
		return null;
	}

	async function submit(event: Event) {
		event.preventDefault();
		error = null;
		success = null;

		const invalid = validate();
		if (invalid) {
			error = invalid;
			return;
		}

		busy = true;
		try {
			if (isRegister) {
				const { data, error: err } = await supabase().auth.signUp({
					email: email.trim(),
					password,
					options: {
						data: {
							full_name: name.trim(),
							avatar_url: ''
						},
						emailRedirectTo: `${window.location.origin}/auth/callback`
					}
				});
				if (err) {
					error = mapError(err.message);
					return;
				}
				if (data.session) {
					authUser.set(data.session.user);
					success = 'Akun berhasil dibuat — mengalihkan ke katalog…';
					await invalidateAll();
					await goto('/progres');
				} else {
					success =
						'Pendaftaran berhasil! Kami sudah mengirim email konfirmasi — setelah diklik, kembali ke halaman Masuk.';
					password = '';
					confirm = '';
				}
			} else {
				const { data, error: err } = await supabase().auth.signInWithPassword({
					email: email.trim(),
					password
				});
				if (err) {
					error = mapError(err.message);
					return;
				}
				authUser.set(data.session.user);
				success = 'Berhasil masuk — mengalihkan…';
				await invalidateAll();
				await goto('/progres');
			}
		} catch (e) {
			error = e instanceof Error ? mapError(e.message) : 'Terjadi kesalahan. Coba lagi.';
		} finally {
			busy = false;
		}
	}

	async function signInGoogle() {
		error = null;
		success = null;

		if (googleReady === false) {
			error = googleOffMessage;
			return;
		}

		busy = true;
		const { error: err } = await supabase().auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback?next=/progres`
			}
		});
		if (err) {
			error = mapError(err.message);
			busy = false;
		}
	}
</script>

<div class="auth-page min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-14">
	<div class="w-full max-w-[440px]">
		<!-- brand -->
		<div class="text-center mb-7">
			<div
				class="w-11 h-11 rounded-xl mx-auto grid place-items-center border border-line bg-surface"
			>
				<span class="w-2 h-2 rounded-full bg-ok shadow-[0_0_12px_2px_rgba(16,185,129,.5)]"
				></span>
			</div>
			<h1 class="text-[26px] leading-8 font-bold tracking-tight text-ink mt-4">
				{isRegister ? 'Buat akun DevPath' : 'Selamat datang kembali'}
			</h1>
			<p class="text-[14px] leading-6 text-ink-3 mt-2">
				{isRegister
					? 'Simpan progres belajar & skor kuis di semua perangkat.'
					: 'Lanjutkan alur karir IT kamu dari terakhir kali.'}
			</p>
		</div>

		<!-- card -->
		<div class="rounded-2xl border border-line bg-surface overflow-hidden">
			<!-- tabs -->
			<div class="grid grid-cols-2 gap-1 p-1.5 m-3 mb-0 rounded-xl bg-elevated border border-line">
				<a
					href="/login"
					aria-current={mode === 'login' ? 'page' : undefined}
					class="inline-flex items-center justify-center min-h-[36px] px-4 rounded-lg text-[13px] font-semibold transition-all duration-150 active:scale-[.97] {tabClass(
						mode === 'login'
					)}">Masuk</a
				>
				<a
					href="/register"
					aria-current={mode === 'register' ? 'page' : undefined}
					class="inline-flex items-center justify-center min-h-[36px] px-4 rounded-lg text-[13px] font-semibold transition-all duration-150 active:scale-[.97] {tabClass(
						mode === 'register'
					)}">Daftar</a
				>
			</div>

			<form class="p-5 pt-4 space-y-4" onsubmit={submit} novalidate>
				{#if error}
					<div
						class="flex items-start gap-2.5 rounded-lg border border-err-line bg-err-tint px-3 py-2.5 text-[13px] leading-5 text-err animate-fade"
						role="alert"
					>
						<CircleAlert size={15} class="mt-0.5 shrink-0" />
						<span>{error}</span>
					</div>
				{/if}

				{#if success}
					<div
						class="flex items-start gap-2.5 rounded-lg border border-ok-line bg-ok-tint px-3 py-2.5 text-[13px] leading-5 text-ok animate-fade"
						role="status"
					>
						<Check size={15} class="mt-0.5 shrink-0" />
						<span>{success}</span>
					</div>
				{/if}

				{#if isRegister}
					<label class="block">
						<span class="label text-ink-4 mb-1.5 block">Nama Lengkap</span>
						<div class="relative">
							<User
								size={15}
								class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4 pointer-events-none"
							/>
							<input
								bind:value={name}
								type="text"
								autocomplete="name"
								placeholder="Alex Rizky"
								class="w-full rounded-lg bg-elevated border border-line pl-9 pr-3 py-2.5 text-[14px] text-ink placeholder:text-ink-4 outline-none focus:border-line-strong focus:ring-2 focus:ring-ink-4/25 transition-colors"
							/>
						</div>
					</label>
				{/if}

				<label class="block">
					<span class="label text-ink-4 mb-1.5 block">Email</span>
					<div class="relative">
						<Mail
							size={15}
							class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4 pointer-events-none"
						/>
						<input
							bind:value={email}
							type="email"
							autocomplete="email"
							placeholder="kamu@email.com"
							class="w-full rounded-lg bg-elevated border border-line pl-9 pr-3 py-2.5 text-[14px] text-ink placeholder:text-ink-4 outline-none focus:border-line-strong focus:ring-2 focus:ring-ink-4/25 transition-colors"
						/>
					</div>
				</label>

				<label class="block">
					<span class="label text-ink-4 mb-1.5 block">Password</span>
					<div class="relative">
						<Lock
							size={15}
							class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4 pointer-events-none"
						/>
						<input
							bind:value={password}
							type={showPassword ? 'text' : 'password'}
							autocomplete={isRegister ? 'new-password' : 'current-password'}
							placeholder={isRegister ? 'Minimal 8 karakter' : '••••••••'}
							class="w-full rounded-lg bg-elevated border border-line pl-9 pr-10 py-2.5 text-[14px] text-ink placeholder:text-ink-4 outline-none focus:border-line-strong focus:ring-2 focus:ring-ink-4/25 transition-colors"
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

				{#if isRegister}
					<label class="block">
						<span class="label text-ink-4 mb-1.5 block">Konfirmasi Password</span>
						<div class="relative">
							<Lock
								size={15}
								class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4 pointer-events-none"
							/>
							<input
								bind:value={confirm}
								type="password"
								autocomplete="new-password"
								placeholder="Ulangi password"
								class="w-full rounded-lg bg-elevated border border-line pl-9 pr-3 py-2.5 text-[14px] text-ink placeholder:text-ink-4 outline-none focus:border-line-strong focus:ring-2 focus:ring-ink-4/25 transition-colors"
							/>
						</div>
					</label>
				{/if}

				<button
					type="submit"
					disabled={busy}
					class="group w-full min-h-[42px] inline-flex items-center justify-center gap-2 rounded-lg bg-ink text-canvas text-[14px] font-semibold px-4 py-2.5 hover:opacity-90 active:scale-[.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 transition-[opacity,transform] duration-150"
				>
					{#if busy}
						<LoaderCircle size={15} class="animate-spin" />
						<span>{isRegister ? 'Membuat akun…' : 'Memproses…'}</span>
					{:else}
						<span>{isRegister ? 'Buat Akun' : 'Masuk'}</span>
						<ArrowRight
							size={15}
							class="transition-transform duration-150 group-hover:translate-x-0.5"
						/>
					{/if}
				</button>

				<div class="flex items-center gap-3 py-1">
					<span class="h-px flex-1 bg-line"></span>
					<span class="label text-ink-4">atau</span>
					<span class="h-px flex-1 bg-line"></span>
				</div>

				<button
					type="button"
					onclick={signInGoogle}
					disabled={busy}
					class="w-full min-h-[42px] inline-flex items-center justify-center gap-2.5 rounded-lg bg-elevated border border-line text-ink text-[14px] font-medium px-4 py-2.5 hover:border-line-strong active:scale-[.98] disabled:opacity-60 disabled:active:scale-100 transition-[border-color,transform] duration-150"
				>
					<svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
						<path
							fill="#FFC107"
							d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z"
						/>
						<path
							fill="#FF3D00"
							d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
						/>
						<path
							fill="#4CAF50"
							d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
						/>
						<path
							fill="#1976D2"
							d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.2 5.2C36.9 40.2 44 35 44 24c0-1.3-.1-2.7-.4-3.9z"
						/>
					</svg>
					Masuk dengan Google
				</button>

				{#if googleReady === false}
					<p class="text-[12px] leading-5 text-warn text-center">
						Provider Google belum diaktifkan di proyek Supabase — klik tombol untuk melihat
						langkah aktivasinya.
					</p>
				{/if}
			</form>
		</div>

		<p class="text-[12.5px] leading-5 text-ink-4 text-center mt-4 px-2">
			{#if isRegister}
				Sudah punya akun?
				<a href="/login" class="text-ink hover:underline">Masuk di sini</a>. Dengan mendaftar
				kamu menyetujui penyimpanan progres secara lokal & cloud.
			{:else}
				Progres tetap tersimpan lokal bila belum login.
				<a href="/register" class="text-ink hover:underline">Buat akun gratis</a>.
			{/if}
		</p>
	</div>
</div>

<style>
	.auth-page {
		background:
			radial-gradient(900px 420px at 50% -10%, color-mix(in srgb, var(--c-ink) 6%, transparent), transparent 70%),
			var(--c-canvas);
	}
</style>
