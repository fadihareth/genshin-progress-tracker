<script lang="ts">
	import { charactersById } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { bgGradientColors } from '$lib/constants';

	let { id = $bindable() }: { id: number } = $props();
	let build = $derived(buildsState[id]);
	let character = $derived(charactersById[buildsState[id].character]);
</script>

<div
	class={`h-screen w-full bg-linear-to-b from-genshin-blue from-5% ${bgGradientColors[character.element]}`}
>
	<img src={character.profileImage} alt={character.name} class="h-100 w-full object-contain" />
</div>
