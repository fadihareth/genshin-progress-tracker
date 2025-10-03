<script lang="ts">
	import { charactersById } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { MenuButton } from '../ui';
	import { LevelSection, TalentsSection } from '$lib/components/card';

	let { id }: { id: number } = $props();
	let build = $derived(buildsState[id]);
	let character = charactersById[buildsState[id].character];

	function onSelect(option: String) {
		switch (option) {
			case 'Remove Build': {
				delete buildsState[id];
				break;
			}
			default: {
				console.log('Invalid option');
			}
		}
	}
</script>

<div class="relative flex h-80 overflow-hidden rounded-xl bg-genshin-blue text-genshin-gold shadow-md">
    <div
        class="absolute inset-2 rounded-xl border-2 border-genshin-gold/30 z-0"
    ></div>
    <div class="z-10 h-full w-2/5 [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_1.0)_75%,_transparent_100%)]">
        <img src={character.profileImage} alt={character.name} class="h-full w-full object-cover" />
    </div>

    <div class="flex flex-1 flex-col gap-1 p-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-1">
                <img
                    src={`/src/lib/assets/elements/${character.element}.svg`}
                    alt={`${character.element} Element`}
                    class="h-12.5 w-12.5"
                />
                <h2 class="text-3xl">{character.name}</h2>
            </div>
            <MenuButton {onSelect} />
        </div>
        <!-- <LevelSection bind:curr={build.currLevel} target={build.targetLevel} /> -->
    </div>
</div>
