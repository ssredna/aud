import { Temporal } from '@js-temporal/polyfill';

export const birthDate = Temporal.PlainDate.from('2026-08-19');
export const birthTime = birthDate.toZonedDateTime({
	timeZone: 'Europe/Oslo',
	plainTime: '03:53'
});

export function nowInNorway(): string {
	return Temporal.Now.zonedDateTimeISO('Europe/Oslo').toString();
}

export function formatLiveAge(timestamp: string): { age: string; time: string } {
	const now = Temporal.ZonedDateTime.from(timestamp).withTimeZone('Europe/Oslo');
	if (Temporal.ZonedDateTime.compare(now, birthTime) < 0) {
		return { age: 'Ikke født ennå', time: '' };
	}
	const duration = birthTime.until(now, { largestUnit: 'years', smallestUnit: 'minutes' });
	const { hours, minutes } = duration;
	return {
		age: formatCalendarAge(duration),
		time: `${hours} ${hours === 1 ? 'time' : 'timer'} og ${minutes} ${minutes === 1 ? 'minutt' : 'minutter'}`
	};
}

export function formatAge(date: string): string {
	const today = Temporal.PlainDate.from(date);
	if (Temporal.PlainDate.compare(today, birthDate) < 0) return 'Ikke født ennå';
	return formatCalendarAge(birthDate.until(today, { largestUnit: 'years' }));
}

function formatCalendarAge({ years, months, days }: Temporal.Duration): string {
	const parts = [
		[years, 'år', 'år'],
		[months, 'måned', 'måneder'],
		[Math.floor(days / 7), 'uke', 'uker'],
		[days % 7, 'dag', 'dager']
	] as const;
	const labels = parts
		.filter(([value]) => value > 0)
		.map(([value, singular, plural]) => `${value} ${value === 1 ? singular : plural}`);
	return labels.length
		? new Intl.ListFormat('nb', { type: 'conjunction' }).format(labels)
		: '0 dager';
}
