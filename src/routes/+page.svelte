<script lang="ts">
	import { CharacterCard, Header } from '$lib/components';
	import { buildsState } from '$lib/stores/state.svelte';

	let orderedBuilds = $derived(
		Object.values(buildsState).sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id))
	);
</script>

<main>
	<Header />
    <div class="flex flex-col gap-6 p-6">
        {#each orderedBuilds as build (build.id)}
            <CharacterCard id={build.id} />
        {/each}
    </div>
</main>
