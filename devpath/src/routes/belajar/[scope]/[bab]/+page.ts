import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getScope, getModule, BABS_PER_SCOPE } from '$lib/data';
import { fetchModule } from '$lib/services/content';

export const load: PageLoad = async ({ params }) => {
	const scope = getScope(params.scope);
	if (!scope) error(404, 'Alur karir tidak ditemukan');

	const babNumber = Number(params.bab);
	if (!Number.isInteger(babNumber) || babNumber < 1 || babNumber > BABS_PER_SCOPE) {
		error(404, 'Bab tidak ditemukan');
	}

	const result = await fetchModule(scope.id, babNumber);
	const mod = result.data;
	if (!mod) error(404, 'Materi tidak ditemukan');

	return { scope, mod, source: result.source };
};
