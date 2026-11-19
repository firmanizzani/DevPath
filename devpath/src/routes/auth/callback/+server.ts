import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/** Callback OAuth (Google) — menukar code dengan sesi lalu kembali ke aplikasi. */
export const GET: RequestHandler = async ({ url, locals }) => {
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/';
	const providerError =
		url.searchParams.get('error') ?? url.searchParams.get('error_description');

	// Google/Supabase menolak (mis. provider nonaktif, access_denied, state kedaluwarsa)
	if (providerError) {
		redirect(303, `/login?error=${encodeURIComponent(providerError)}`);
	}

	if (code) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);
		if (!error) redirect(303, next.startsWith('/') && !next.startsWith('//') ? next : '/');
		redirect(303, `/login?error=${encodeURIComponent(error.message)}`);
	}

	redirect(303, `/login?error=${encodeURIComponent('Sesi login Google tidak ditemukan. Silakan coba lagi.')}`);
};
