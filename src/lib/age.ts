import { Temporal } from '@js-temporal/polyfill';

export const birthDate = Temporal.PlainDate.from('2026-08-19');

export function todayInNorway(): string {
	return Temporal.Now.plainDateISO('Europe/Oslo').toString();
}

export function formatAge(date: string): string {
	const today = Temporal.PlainDate.from(date);
	if (Temporal.PlainDate.compare(today, birthDate) < 0) return 'Ikke født ennå';
	const { years, months, days } = birthDate.until(today, { largestUnit: 'years' });
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
