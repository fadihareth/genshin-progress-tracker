<script lang="ts">
	import { onMount } from 'svelte';
	import { CharacterCard, Header } from '$lib/components';
	import { buildsState } from '$lib/stores/state.svelte';
	import { fetchBuilds } from '$lib/api/builds';

	let loading = $state(true);
	let error = $state<string | null>(null);

	let orderedBuilds = $derived(
		Object.values(buildsState).sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id))
	);

	onMount(async () => {
		try {
			loading = true;
			const builds = await fetchBuilds();
			// Clear existing builds and populate with fetched ones
			Object.keys(buildsState).forEach((key) => delete buildsState[key]);
			builds.forEach((build) => {
				buildsState[build.id] = build;
			});
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to fetch builds';
			console.error('Error loading builds:', err);
		} finally {
			loading = false;
		}
	});
</script>

<main>
	<Header />
	{#if loading}
		<div class="text-genshin-gold flex items-center justify-center p-6">
			<p>Loading builds...</p>
		</div>
	{:else if error}
		<div class="flex items-center justify-center p-6">
			<p class="text-red-500">Error: {error}</p>
		</div>
	{:else}
		<div
			class="grid gap-6 p-6"
			style="grid-template-columns: repeat(auto-fit, minmax(var(--minWidth-card), 1fr));"
		>
			{#each orderedBuilds as build (build.id)}
				<CharacterCard id={build.id} />
			{/each}
		</div>
	{/if}
</main>
