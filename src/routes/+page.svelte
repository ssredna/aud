<script lang="ts">
	import { onMount } from 'svelte';
	import { formatLiveAge, nowInNorway } from '#lib/age.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let currentTime = $state<string | null>(null);
	const age = $derived(formatLiveAge(currentTime ?? data.now));

	function refresh() {
		currentTime = nowInNorway();
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
	<div aria-live="polite" aria-atomic="true">
		<h1><span>Aud er</span>{age.age}</h1>
		{#if age.time}
			<p>{age.time}</p>
		{/if}
	</div>
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
	h1 span {
		display: block;
		margin-bottom: 1rem;
		font-size: clamp(1.25rem, 3vw, 2rem);
		letter-spacing: normal;
		color: #607064;
	}
	p {
		margin: 1rem 0 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(1.25rem, 3vw, 2rem);
		line-height: 1.4;
		text-align: center;
		color: #607064;
	}
</style>
