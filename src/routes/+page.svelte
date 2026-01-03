<script lang="ts">
	import { CharacterCard, Header } from '$lib/components';
	import { buildsState } from '$lib/stores/state.svelte';

	let orderedBuilds = $derived(
		Object.values(buildsState).sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id))
	);
</script>

<main>
	<Header />
	<div
		class="grid gap-6 p-6"
		style="grid-template-columns: repeat(auto-fit, minmax(var(--minWidth-card), 1fr));"
	>
		{#each orderedBuilds as build (build.id)}
			<CharacterCard id={build.id} />
		{/each}
	</div>
</main>
