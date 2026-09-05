<script lang="ts">
	import { onMount } from 'svelte';
	import { formatAge, todayInNorway } from '$lib/age';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let currentDate = $state<string | null>(null);
	const age = $derived(formatAge(currentDate ?? data.today));

	function refresh() {
		currentDate = todayInNorway();
	}

	onMount(() => {
		refresh();
		const interval = setInterval(refresh, 1000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Alder</title>
	<meta name="description" content="Barnets alder, dag for dag." />
</svelte:head>

<svelte:window onfocus={refresh} />
<svelte:document onvisibilitychange={refresh} />

<main>
	<h1 aria-live="polite" aria-atomic="true">{age}</h1>
</main>

<style>
	:global(body) {
		margin: 0;
		background: #faf8f3;
		color: #35463b;
	}
	main {
		min-height: 100svh;
		display: grid;
		place-items: center;
		box-sizing: border-box;
		padding: 2rem;
	}
	h1 {
		max-width: 20ch;
		margin: 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(2.5rem, 7vw, 5.5rem);
		font-weight: 400;
		line-height: 1.2;
		letter-spacing: -0.035em;
		text-align: center;
		text-wrap: balance;
	}
</style>
