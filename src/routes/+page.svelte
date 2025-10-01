<script lang="ts">
    import { CharacterCard } from '$lib/components/character';
	import { Header } from '$lib/components/layout';
	import { buildsState } from '$lib/stores/state.svelte';
</script>

<Header />

<main class="p-6">
	<div
		class="grid gap-6"
		style="grid-template-columns: repeat(auto-fit, minmax(var(--minWidth-card), 1fr));"
	>
		{#each Object.values(buildsState) as build (build.id)}
			<CharacterCard id={build.id} />
		{/each}
	</div>
</main>
