<script lang="ts">
	import { charactersById } from '$lib/stores/data';
    import { buildsState } from '$lib/stores/state.svelte';

    let { id }: { id: string } = $props();

	let character = charactersById[buildsState[id].character];
	var isHovered = $state(false);
</script>

<div
	aria-hidden="true"
	class="flex h-80 overflow-hidden rounded-xl bg-white shadow-md transition-transform duration-300 ease-out"
	onmouseenter={() => {
		isHovered = true;
	}}
	onmouseleave={() => {
		isHovered = false;
	}}
>
	<div class="relative h-full w-2/5">
		<img src={character.profileImage} alt={character.name} class="h-full w-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-r from-transparent from-50% to-white to-100%"></div>
	</div>

	<div class="flex flex-1 flex-col gap-1 p-4">
		<div class="flex items-center gap-1">
			<img
				src={`/src/lib/assets/elements/${character.element}.svg`}
				alt={`${character.element} Element`}
				class="h-12.5 w-12.5"
			/>
			<h2 class="text-3xl font-bold">{character.name}</h2>
		</div>
        <p>Level: {buildsState[id].currLevel} / {buildsState[id].targetLevel}</p>
        <button onclick={() => {
            buildsState[id].currLevel += 10
        }}>
            Click Here
        </button>
	</div>
</div>
