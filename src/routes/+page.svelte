<script lang="ts">
    import Sortable from 'sortablejs';
    import CharacterCard from '$lib/components/characterCard/CharacterCard.svelte';
	import { Header } from '$lib/components/layout';
	import { buildsState } from '$lib/stores/state.svelte';

    let gridContainer: HTMLElement;
    let orderedBuilds = $derived(
        Object.values(buildsState).sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id))
    );

    $effect(() => {
        Sortable.create(gridContainer, {
			animation: 200,
			handle: '.drag-handle',
			ghostClass: 'opacity-0',
			onEnd: (evt) => {
				const movedItem = orderedBuilds[evt.oldIndex!];
				if (!movedItem) return;

				// Remove the item from its old position
				const newOrder = [...orderedBuilds];
				newOrder.splice(evt.oldIndex!, 1);
				newOrder.splice(evt.newIndex!, 0, movedItem);

				// Update all order values
				newOrder.forEach((build, index) => (build.order = index));

				// Reflect in global state
				for (const build of newOrder) {
					buildsState[build.id] = build;
				}
			},
		});
    })
</script>

<Header />

<main class="p-6">
	<div
        bind:this={gridContainer}
		class="grid gap-6"
		style="grid-template-columns: repeat(auto-fit, minmax(var(--minWidth-card), 1fr));"
	>
		{#each orderedBuilds as build (build.id)}
            <div class="relative">
                <div class="h-10 z-10 absolute -bottom-4 -right-6 rotate-135 drag-handle cursor-grab active:cursor-grabbing">
                    <img src="src/lib/assets/ui/corner.svg" alt="" />
                </div>
			    <CharacterCard id={build.id} />
            </div>
		{/each}
	</div>
</main>
