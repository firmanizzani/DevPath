<script lang="ts">
	import { page } from '$app/state';
	import { goto, invalidateAll } from '$app/navigation';
	import {
		Search,
		ChevronDown,
		Menu,
		X,
		RotateCcw,
		Zap,
		LogOut,
		Settings,
		ChartColumnIncreasing
	} from '@lucide/svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import logo from '$lib/assets/favicon.svg';
	import { progress, resetAll, totalXp } from '$lib/services/progress';
	import { signOut, initials } from '$lib/services/supabase';

	let q = $state('');
	let mobileOpen = $state(false);
	let profileOpen = $state(false);

	const path = $derived(page.url.pathname);
	const xp = $derived(totalXp($progress));

	const user = $derived(page.data.user ?? null);
	const profile = $derived(page.data.profile ?? null);
	const userName = $derived(
		user ? profile?.full_name || user.name || user.email || 'Pengguna' : ''
	);

	const nav = [
		{ href: '/', label: 'Katalog' },
		{ href: '/progres', label: 'Progres Saya' },
		{ href: '/tentang', label: 'Tentang' }
	];

	function isActive(href: string) {
		return href === '/' ? path === '/' : path.startsWith(href);
	}

	function onSearch(event: Event) {
		event.preventDefault();
		mobileOpen = false;
		const value = q.trim();
		goto(value ? `/?q=${encodeURIComponent(value)}` : '/');
	}

	async function doReset() {
		profileOpen = false;
		if (!confirm('Hapus semua progres belajar & skor kuis?')) return;
		resetAll();
		const { resetRemoteProgress } = await import('$lib/services/progressSync');
		if (user) await resetRemoteProgress();
	}

	async function doLogout() {
		profileOpen = false;
		mobileOpen = false;
		await signOut();
		await invalidateAll();
		goto('/');
	}
</script>

<header class="fixed top-0 inset-x-0 z-50 bg-canvas/90 backdrop-blur-xl border-b border-line">
	<div class="h-16 px-4 md:px-8 flex items-center justify-between gap-4">
		<div class="flex items-center gap-3 shrink-0">
			<a href="/" class="flex items-center gap-2.5 group" data-sveltekit-reload={false}>
				<img src={logo} alt="" width="32" height="32" class="w-8 h-8 shrink-0" />
				<span class="text-[17px] font-bold tracking-tight text-ink">DevPath</span>
			</a>
			<span class="hidden sm:inline label px-2 py-1 rounded-xs bg-elevated border border-line text-ink-2"
				>PRO</span
			>
		</div>

		<form
			onsubmit={onSearch}
			class="hidden md:flex flex-1 max-w-md items-center bg-surface rounded-lg px-3 py-2 border border-line focus-within:border-line-strong transition-colors"
		>
			<Search size={16} class="text-ink-4 mr-2 shrink-0" strokeWidth={1.75} />
			<input
				bind:value={q}
				type="search"
				placeholder="Cari alur karir..."
				aria-label="Cari alur karir"
				class="bg-transparent border-none outline-none text-sm text-ink placeholder:text-ink-4 w-full"
			/>
			<kbd class="label text-ink-4 bg-elevated px-1.5 py-0.5 rounded-xs border border-line select-none"
				>⌘K</kbd
			>
		</form>

		<div class="flex items-center gap-2 shrink-0">
			<nav class="hidden lg:flex items-center gap-1">
				{#each nav as item (item.href)}
					<a
						href={item.href}
						class="px-3 py-1.5 rounded-lg text-sm transition-colors {isActive(item.href)
							? 'bg-ink text-canvas font-semibold'
							: 'text-ink-3 hover:text-ink font-medium'}">{item.label}</a
					>
				{/each}
			</nav>

			<ThemeToggle />

			{#if user}
				<div class="relative hidden sm:block">
					<button
						type="button"
						onclick={() => (profileOpen = !profileOpen)}
						class="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg border border-line bg-surface hover:border-line-strong transition-colors"
						aria-expanded={profileOpen}
						aria-label="Menu akun"
					>
						<span
							class="w-7 h-7 rounded-md bg-elevated border border-line grid place-items-center text-[11px] font-semibold text-ink-2 mono"
							>{initials(userName)}</span
						>
						<span class="text-sm font-medium text-ink-2 hidden md:block max-w-[110px] truncate"
							>{userName}</span
						>
						<ChevronDown size={14} class="text-ink-4" />
					</button>

					{#if profileOpen}
						<button
							type="button"
							class="fixed inset-0 z-10 cursor-default"
							aria-label="Tutup menu"
							onclick={() => (profileOpen = false)}
						></button>
						<div
							class="absolute right-0 top-11 z-20 w-64 rounded-lg bg-surface border border-line-strong p-3 animate-fade"
							style="box-shadow: 0 12px 32px -4px rgba(0,0,0,.6)"
						>
							<p class="text-sm font-semibold text-ink truncate">{userName}</p>
							<p class="label text-ink-4 mt-0.5 truncate">{user.email}</p>

							<div
								class="mt-2 flex items-center justify-between px-2 py-2 rounded-xs bg-elevated border border-line"
							>
								<span class="label text-ink-3 flex items-center gap-1.5"><Zap size={12} /> XP</span>
								<span class="mono text-sm font-semibold text-warn">{xp} XP</span>
							</div>

							<a
								href="/progres"
								onclick={() => (profileOpen = false)}
								class="mt-2 w-full flex items-center gap-2 px-2 py-2 rounded-xs text-sm text-ink-2 hover:text-ink hover:bg-elevated transition-colors"
							>
								<ChartColumnIncreasing size={14} /> Progres Saya
							</a>
							<a
								href="/pengaturan"
								onclick={() => (profileOpen = false)}
								class="w-full flex items-center gap-2 px-2 py-2 rounded-xs text-sm text-ink-2 hover:text-ink hover:bg-elevated transition-colors"
							>
								<Settings size={14} /> Pengaturan
							</a>
							<button
								type="button"
								onclick={doReset}
								class="w-full flex items-center gap-2 px-2 py-2 rounded-xs text-sm text-err hover:bg-err-tint transition-colors"
							>
								<RotateCcw size={14} /> Reset progres belajar
							</button>

							<div class="h-px bg-line my-1.5"></div>

							<button
								type="button"
								onclick={doLogout}
								class="w-full flex items-center gap-2 px-2 py-2 rounded-xs text-sm text-ink-2 hover:text-ink hover:bg-elevated transition-colors"
							>
								<LogOut size={14} /> Keluar
							</button>
						</div>
					{/if}
				</div>
			{:else}
				<div class="hidden sm:flex items-center gap-2">
					<a
						href="/login"
						class="px-3 py-1.5 rounded-lg text-sm font-medium text-ink-2 hover:text-ink border border-transparent hover:border-line transition-colors"
						>Masuk</a
					>
					<a
						href="/register"
						class="px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-ink text-canvas hover:opacity-90 transition-opacity"
						>Daftar</a
					>
				</div>
			{/if}

			<button
				type="button"
				onclick={() => (mobileOpen = !mobileOpen)}
				class="lg:hidden w-9 h-9 grid place-items-center rounded-lg border border-line bg-surface text-ink-2"
				aria-label="Buka menu"
			>
				{#if mobileOpen}<X size={18} />{:else}<Menu size={18} />{/if}
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div class="lg:hidden border-t border-line px-4 py-4 space-y-3 bg-canvas animate-fade">
			<form onsubmit={onSearch} class="flex items-center bg-surface rounded-lg px-3 py-2 border border-line">
				<Search size={16} class="text-ink-4 mr-2" />
				<input
					bind:value={q}
					type="search"
					placeholder="Cari alur karir..."
					class="bg-transparent border-none outline-none text-sm text-ink placeholder:text-ink-4 w-full"
				/>
			</form>
			<div class="flex flex-col gap-1">
				{#each nav as item (item.href)}
					<a
						href={item.href}
						onclick={() => (mobileOpen = false)}
						class="px-3 py-2 rounded-lg text-sm {isActive(item.href)
							? 'bg-ink text-canvas font-semibold'
							: 'text-ink-2 font-medium'}">{item.label}</a
					>
				{/each}
			</div>

			{#if user}
				<div class="pt-3 border-t border-line flex flex-col gap-1">
					<a
						href="/pengaturan"
						onclick={() => (mobileOpen = false)}
						class="px-3 py-2 rounded-lg text-sm text-ink-2 font-medium inline-flex items-center gap-2"
					>
						<Settings size={14} /> Pengaturan
					</a>
					<button
						type="button"
						onclick={doLogout}
						class="px-3 py-2 rounded-lg text-sm text-ink-2 font-medium inline-flex items-center gap-2 text-left"
					>
						<LogOut size={14} /> Keluar
					</button>
				</div>
			{:else}
				<div class="pt-3 border-t border-line flex items-center gap-2">
					<a
						href="/login"
						onclick={() => (mobileOpen = false)}
						class="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-ink-2 border border-line text-center"
						>Masuk</a
					>
					<a
						href="/register"
						onclick={() => (mobileOpen = false)}
						class="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-ink text-canvas text-center"
						>Daftar</a
					>
				</div>
			{/if}
		</div>
	{/if}
</header>
