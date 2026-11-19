import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getScope, getModule, BABS_PER_SCOPE } from '$lib/data';

export const load: PageLoad = async ({ params }) => {
	const scope = getScope(params.scope);
	if (!scope) error(404, 'Alur karir tidak ditemukan');

	const babNumber = Number(params.bab);
	if (!Number.isInteger(babNumber) || babNumber < 1 || babNumber > BABS_PER_SCOPE) {
		error(404, 'Bab tidak ditemukan');
	}

	const mod = getModule(scope.id, babNumber);
	if (!mod) error(404, 'Kuis tidak ditemukan');

	return { scope, mod };
};
