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

<header
	class="sticky top-0 z-50 m-4 flex items-center justify-between rounded-full bg-genshin-blue/90 shadow-md backdrop-blur"
>
	<div class="flex gap-6 px-10 py-2">
		<button onclick={reset}>
			<IconCircleArrowLeftFilled size={36} class="fill-genshin-white" />
		</button>
		<div class="hidescrollbar flex gap-6 overflow-x-scroll">
			{#each orderedBuilds as build (build.id)}
                <div class="flex flex-col items-center gap-2">
                    <button
                        onclick={() => {
                            update(build.id);
                        }}
                        style={`view-transition-name: build-${build.id};`}
                    >
                        <img
                            src={charactersById[build.character].iconImage}
                            alt="icon"
                            class={`h-11 w-11 rounded-full border-2 ${id === build.id ? 'border-genshin-gold' : 'border-gray-500'}`}
                        />
                    </button>
                    {#if id === build.id}
                        <div class="h-0 w-6 border-1 border-genshin-gold"></div>
                    {/if}
                </div>
			{/each}
		</div>
	</div>
</header>
