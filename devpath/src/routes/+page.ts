import type { PageLoad } from './$types';
import { fetchScopes } from '$lib/services/content';

export const load: PageLoad = async () => {
	const result = await fetchScopes();
	return { scopes: result.data, source: result.source };
};
