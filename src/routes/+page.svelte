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
		{#each Object.keys(buildsState) as id}
			<CharacterCard {id} />
		{/each}
	</div>
</main>
