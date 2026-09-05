import { describe, expect, it } from 'vitest';
import { formatAge } from './age';

describe('age in Norwegian', () => {
	it.each([
		['2026-08-18', 'Ikke født ennå'],
		['2026-08-19', '0 dager'],
		['2026-08-20', '1 dag'],
		['2026-08-26', '1 uke'],
		['2026-09-05', '2 uker og 3 dager'],
		['2026-09-18', '4 uker og 2 dager'],
		['2026-09-19', '1 måned'],
		['2026-12-07', '3 måneder, 2 uker og 4 dager'],
		['2027-03-18', '6 måneder, 3 uker og 6 dager'],
		['2027-03-19', '7 måneder'],
		['2027-08-19', '1 år'],
		['2028-03-01', '1 år, 6 måneder, 1 uke og 4 dager']
	])('%s → %s', (date, expected) => {
		expect(formatAge(date)).toBe(expected);
	});
});
