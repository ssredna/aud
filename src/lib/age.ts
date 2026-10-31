import { Temporal } from '@js-temporal/polyfill';

export const birthDate = Temporal.PlainDate.from('2026-08-19');
export const birthTime = birthDate.toZonedDateTime({
	timeZone: 'Europe/Oslo',
	plainTime: '03:53'
});

export function nowInNorway(): string {
	return Temporal.Now.zonedDateTimeISO('Europe/Oslo').toString();
}

export type AgeUnit = 'months' | 'weeks';

export function formatLiveAge(
	timestamp: string,
	unit: AgeUnit = 'months'
): { age: string; time: string } {
	const now = Temporal.ZonedDateTime.from(timestamp).withTimeZone('Europe/Oslo');
	if (Temporal.ZonedDateTime.compare(now, birthTime) < 0) {
		return { age: 'Ikke født ennå', time: '' };
	}
	const duration = birthTime.until(now, {
		largestUnit: unit === 'weeks' ? 'weeks' : 'years',
		smallestUnit: 'minutes'
	});
	const { hours, minutes } = duration;
	return {
		age: formatCalendarAge(duration),
		time: `${hours} ${hours === 1 ? 'time' : 'timer'} og ${minutes} ${minutes === 1 ? 'minutt' : 'minutter'}`
	};
}

function formatCalendarAge({ years, months, weeks, days }: Temporal.Duration): string {
	const parts = [
		[years, 'år', 'år'],
		[months, 'måned', 'måneder'],
		[weeks + Math.floor(days / 7), 'uke', 'uker'],
		[days % 7, 'dag', 'dager']
	] as const;
	const labels = parts
		.filter(([value]) => value > 0)
		.map(([value, singular, plural]) => `${value} ${value === 1 ? singular : plural}`);
	return labels.length
		? new Intl.ListFormat('nb', { type: 'conjunction' }).format(labels)
		: '0 dager';
}
