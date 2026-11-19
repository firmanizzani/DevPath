<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { hydrateProgress } from '$lib/services/progress';
	import { authUser, initAuth } from '$lib/services/supabase';
	import { bootstrapSync } from '$lib/services/progressSync';

	let { children } = $props();

	onMount(() => {
		hydrateProgress();

		const stopAuth = initAuth();
		let syncedUser: string | null = null;

		const stopWatch = authUser.subscribe((user) => {
			if (user?.id && user.id !== syncedUser) {
				syncedUser = user.id;
				void bootstrapSync();
			} else if (!user) {
				syncedUser = null;
			}
		});

		return () => {
			stopAuth();
			stopWatch();
		};
	});

	onNavigate((navigation) => {
		if (typeof document === 'undefined' || !('startViewTransition' in document)) return;
		return new Promise((resolve) => {
			const doc = document as Document & {
				startViewTransition: (cb: () => Promise<void> | void) => { ready: Promise<void> };
			};
			doc.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>DevPath</title>
	<link rel="icon" type="image/svg+xml" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1 pt-16">{@render children()}</main>
	<Footer />
</div>
