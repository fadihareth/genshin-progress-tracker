<script lang="ts">
	import CharacterCard from '$lib/components/characterCard/CharacterCard.svelte';
    import CharacterDetailView from '$lib/components/characterDetailView/CharacterDetailView.svelte';
	import { BuildHeader, Header } from '$lib/components/layout';
	import { buildsState } from '$lib/stores/state.svelte';
    import Sortable from 'sortablejs';

	let selectedBuild: number | null = $state(null);
	let orderedBuilds = $derived(
		Object.values(buildsState).sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id))
	);

    function update(id: number) {
        document.startViewTransition(() => {
             selectedBuild = id;
        });
    }

    function reset() {
        document.startViewTransition(() => {
            selectedBuild = null;
        });
    }

	$effect(() => {
		let gridContainer = document.getElementById('main-grid')!;
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
			}
		});
	});
</script>

<main>
	{#if selectedBuild == null}
            <Header />
            <div
                id="main-grid"
                class="grid gap-6 p-6"
                style="grid-template-columns: repeat(auto-fit, minmax(var(--minWidth-card), 1fr));"
            >
                {#each orderedBuilds as build (build.id)}
                    <div class="relative transition hover:scale-[1.01]" style={`view-transition-name: build-${build.id};`}>
                        <div
                            class="drag-handle absolute right-0.5 bottom-4.5 z-10 h-10 -rotate-45 cursor-grab active:cursor-grabbing"
                        >
                            <img src="src/lib/assets/ui/corner.svg" alt="Handlebar" />
                        </div>
                        <button
                            class="cursor-pointer"
                            onclick={() => {
                                update(build.id);
                            }}
                        >
                            <CharacterCard id={build.id} />
                        </button>
                    </div>
                {/each}
            </div>
	{:else}
        <BuildHeader bind:id={selectedBuild} {update} {reset} />
        <CharacterDetailView bind:id={selectedBuild} />
	{/if}
</main>
