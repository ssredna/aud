import { todayInNorway } from '$lib/age';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ today: todayInNorway() });
