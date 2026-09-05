import { nowInNorway } from '$lib/age';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ now: nowInNorway() });
