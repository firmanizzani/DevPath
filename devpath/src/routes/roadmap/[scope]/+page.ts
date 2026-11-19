import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getScope } from '$lib/data';
import { fetchScopeModules } from '$lib/services/content';

export const load: PageLoad = async ({ params }) => {
	const scope = getScope(params.scope);
	if (!scope) error(404, 'Alur karir tidak ditemukan');

	const result = await fetchScopeModules(scope.id);
	return { scope, modules: result.data, source: result.source };
};
