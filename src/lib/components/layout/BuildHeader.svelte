<script lang="ts">
	import { charactersById } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
    import { IconCircleArrowLeftFilled } from '@tabler/icons-svelte';

	let {
		id = $bindable(),
		update,
		reset
	}: { id: number; update: (id: number) => void; reset: () => void } = $props();

	let orderedBuilds = $derived(
		Object.values(buildsState).sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id))
	);
</script>

<header class="sticky top-0 z-50 m-4 flex items-center justify-between rounded-full bg-genshin-blue/90 shadow-md backdrop-blur">
	<div class="flex gap-10 py-4 px-10">
		<button onclick={reset}>
            <IconCircleArrowLeftFilled size={42} class="fill-genshin-white" />
        </button>
		<div class="hidescrollbar flex gap-10 overflow-x-scroll">
			{#each orderedBuilds as build (build.id)}
				<button
					onclick={() => {
						update(build.id);
					}}
                    style={`view-transition-name: build-${build.id};`}
				>
					<img
						src={charactersById[build.character].iconImage}
						alt="icon"
						class={`w-15 h-15 rounded-full border-genshin-gold ${id == build.id && 'border-2'}`}
					/>
				</button>
			{/each}
		</div>
	</div>
</header>
