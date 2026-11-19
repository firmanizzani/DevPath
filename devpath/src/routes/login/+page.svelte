<script lang="ts">
	import AuthForm from '$lib/components/AuthForm.svelte';
	import { page } from '$app/state';

	const oauthError = $derived(
		page.url.searchParams.get('error') ?? page.url.searchParams.get('error_description')
	);
</script>

<AuthForm mode="login" initialError={oauthError} />
