import { createBrowserClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';
import type { Session, User } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface Profile {
	id: string;
	email: string | null;
	full_name: string | null;
	target_scope: string | null;
	avatar_url: string | null;
	created_at?: string;
	updated_at?: string;
}

let client: SupabaseClient | null = null;

/** Client Supabase (browser) — dibuat sekali, menyimpan session di cookie supabase-ssr. */
export function supabase(): SupabaseClient {
	if (!client) client = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
	return client;
}

export const authUser = writable<User | null>(null);
export const authProfile = writable<Profile | null>(null);
export const authLoading = writable<boolean>(true);

/** Access token untuk memanggil API Elysia (endpoint /api/progress). */
export async function accessToken(): Promise<string | null> {
	try {
		const { data } = await supabase().auth.getSession();
		return data.session?.access_token ?? null;
	} catch {
		return null;
	}
}

async function loadProfile(id: string) {
	try {
		const { data, error } = await supabase()
			.from('profiles')
			.select('id,email,full_name,target_scope,avatar_url,created_at,updated_at')
			.eq('id', id)
			.maybeSingle();
		authProfile.set(error ? null : ((data as Profile) ?? null));
	} catch {
		authProfile.set(null);
	}
}

/** Pantau perubahan sesi. Mengembalikan fungsi cleanup untuk onMount. */
export function initAuth(): () => void {
	const sb = supabase();

	void sb.auth
		.getSession()
		.then(({ data }) => {
			const user = data.session?.user ?? null;
			authUser.set(user);
			if (user) void loadProfile(user.id);
		})
		.finally(() => authLoading.set(false));

	const { data: subscription } = sb.auth.onAuthStateChange((event, session) => {
		const user = session?.user ?? null;
		authUser.set(user);
		// jangan await di dalam callback (rawan deadlock) — tunda satu tick
		if (user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION')) {
			setTimeout(() => void loadProfile(user.id), 0);
		} else if (!user) {
			authProfile.set(null);
		}
	});

	return () => subscription.subscription.unsubscribe();
}

export async function signOut(): Promise<void> {
	try {
		await supabase().auth.signOut();
	} finally {
		authUser.set(null);
		authProfile.set(null);
	}
}

export function displayName(user: User | null, profile: Profile | null): string {
	return (
		profile?.full_name ||
		(user?.user_metadata?.full_name as string | undefined) ||
		user?.email ||
		'Pengguna'
	);
}

export function initials(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (!parts.length) return 'DP';
	const first = parts[0][0] ?? '';
	const second = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : (parts[0][1] ?? '');
	return (first + second).toUpperCase();
}

export type { Session };
