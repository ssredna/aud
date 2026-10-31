import { describe, expect, it } from 'vitest';
import { formatLiveAge } from './age';

describe('live age from 03:53 in Norway', () => {
	it.each([
		['2026-08-19T03:52:59+02:00[Europe/Oslo]', 'Ikke født ennå', ''],
		['2026-08-19T03:53:00+02:00[Europe/Oslo]', '0 dager', '0 timer og 0 minutter'],
		['2026-08-20T03:53:00+02:00[Europe/Oslo]', '1 dag', '0 timer og 0 minutter'],
		['2026-08-26T03:53:00+02:00[Europe/Oslo]', '1 uke', '0 timer og 0 minutter'],
		['2026-09-05T03:52:59+02:00[Europe/Oslo]', '2 uker og 2 dager', '23 timer og 59 minutter'],
		['2026-09-05T03:53:00+02:00[Europe/Oslo]', '2 uker og 3 dager', '0 timer og 0 minutter'],
		['2026-09-05T04:54:00+02:00[Europe/Oslo]', '2 uker og 3 dager', '1 time og 1 minutt'],
		['2026-09-19T03:53:00+02:00[Europe/Oslo]', '1 måned', '0 timer og 0 minutter'],
		['2026-10-25T03:53:00+01:00[Europe/Oslo]', '2 måneder og 6 dager', '0 timer og 0 minutter'],
		[
			'2027-03-28T03:53:00+02:00[Europe/Oslo]',
			'7 måneder, 1 uke og 2 dager',
			'0 timer og 0 minutter'
		],
		['2027-08-19T03:53:00+02:00[Europe/Oslo]', '1 år', '0 timer og 0 minutter'],
		[
			'2028-03-01T03:53:00+01:00[Europe/Oslo]',
			'1 år, 6 måneder, 1 uke og 4 dager',
			'0 timer og 0 minutter'
		]
	])('%s → %s, %s', (timestamp, age, time) => {
		expect(formatLiveAge(timestamp)).toEqual({ age, time });
	});
});

describe('live age in weeks', () => {
	it.each([
		['2026-08-19T03:52:59+02:00[Europe/Oslo]', 'Ikke født ennå', ''],
		['2026-08-19T03:53:00+02:00[Europe/Oslo]', '0 dager', '0 timer og 0 minutter'],
		['2026-08-26T03:52:59+02:00[Europe/Oslo]', '6 dager', '23 timer og 59 minutter'],
		['2026-08-26T03:53:00+02:00[Europe/Oslo]', '1 uke', '0 timer og 0 minutter'],
		['2026-09-19T03:53:00+02:00[Europe/Oslo]', '4 uker og 3 dager', '0 timer og 0 minutter'],
		['2026-10-25T03:53:00+01:00[Europe/Oslo]', '9 uker og 4 dager', '0 timer og 0 minutter'],
		['2027-08-19T03:53:00+02:00[Europe/Oslo]', '52 uker og 1 dag', '0 timer og 0 minutter']
	])('%s → %s, %s', (timestamp, age, time) => {
		expect(formatLiveAge(timestamp, 'weeks')).toEqual({ age, time });
	});
});
