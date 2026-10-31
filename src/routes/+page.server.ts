import { nowInNorway } from '#lib/age.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ now: nowInNorway() });
