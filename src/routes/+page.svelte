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
        selectedBuild = id;
        window.scrollTo(0, 0);
    }

    function reset() {
        selectedBuild = null;
    }

	$effect(() => {
		const gridContainer = document.getElementById('main-grid')!;
		const sortable = Sortable.create(gridContainer, {
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

        return () => {
            sortable?.destroy();
        };
	});
</script>

<main>
	<div style="display: {selectedBuild === null ? 'block' : 'none'};">
            <Header />
            <div
                id="main-grid"
                class="grid gap-6 p-6"
                style="grid-template-columns: repeat(auto-fit, minmax(var(--minWidth-card), 1fr));"
            >
                {#each orderedBuilds as build (build.id)}
                    <div class="relative transition hover:scale-[1.01]">
                        <div
                            class="drag-handle pointer-none absolute right-0.5 bottom-4.5 z-10 h-10 -rotate-45 cursor-grab active:cursor-grabbing"
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
	</div>

    <div style="display: {selectedBuild !== null ? 'block' : 'none'};">
        <BuildHeader bind:id={selectedBuild} {update} {reset} />
        <CharacterDetailView bind:id={selectedBuild} />
    </div>
</main>
