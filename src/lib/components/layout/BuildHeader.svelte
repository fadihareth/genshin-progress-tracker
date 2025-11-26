<script lang="ts">
	import { charactersById } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { IconCircleArrowLeftFilled } from '@tabler/icons-svelte';

	let {
		id = $bindable(),
		update,
		reset
	}: { id: number | null; update: (id: number) => void; reset: () => void } = $props();

	let orderedBuilds = $derived(
		Object.values(buildsState).sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id))
	);
</script>

<header
	class="hidescrollbar sticky top-0 z-50 m-4 flex items-center justify-between gap-6 overflow-x-scroll rounded-full bg-genshin-blue/90 px-10 py-2 shadow-md backdrop-blur"
>
	<button onclick={reset}>
		<IconCircleArrowLeftFilled size={36} class="fill-genshin-white" />
	</button>
	<div class="flex gap-6">
		{#each orderedBuilds as build (build.id)}
			<button
				onclick={() => {
					update(build.id);
				}}
				class="h-11 w-11"
			>
				<img
					src={charactersById[build.character].iconImage}
					alt="icon"
					class={`h-11 w-11 rounded-full border-2 ${id === build.id ? 'border-genshin-gold' : 'border-gray-500'}`}
				/>
			</button>
		{/each}
	</div>
</header>
