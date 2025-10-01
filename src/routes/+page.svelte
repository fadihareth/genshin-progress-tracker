<script lang="ts">
    import Card from '$lib/components/Card.svelte';
	import Header from '$lib/components/Header.svelte';
	import { buildsState } from '$lib/stores/state.svelte';
</script>

<Header />

<main class="p-6">
	<div
		class="grid gap-6"
		style="grid-template-columns: repeat(auto-fit, minmax(var(--minWidth-card), 1fr));"
	>
		{#each Object.keys(buildsState) as id}
			<Card {id} />
		{/each}
	</div>
</main>
