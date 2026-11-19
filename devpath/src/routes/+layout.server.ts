import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user, supabase } = locals;

	if (!user) return { user: null, profile: null };

	const { data } = await supabase
		.from('profiles')
		.select('id,email,full_name,target_scope,avatar_url,created_at,updated_at')
		.eq('id', user.id)
		.maybeSingle();

	return {
		user: {
			id: user.id,
			email: user.email ?? '',
			name:
				(data?.full_name as string | null) ||
				(user.user_metadata?.full_name as string | undefined) ||
				user.email ||
				'',
			avatar_url: (user.user_metadata?.avatar_url as string | undefined) ?? null
		},
		profile: data ?? null
	};
};
