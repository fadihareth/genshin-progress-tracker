<script lang="ts">
	import { charactersById } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { MenuButton } from '../ui';
	import { LevelSection, WeaponSection } from './components';
	import { bgColors } from '$lib/constants';

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

<div
	class={`relative flex h-100 overflow-hidden rounded-xl ${bgColors[character.element]} text-genshin-gold shadow-xl`}
>
	<div class="absolute inset-2 z-0 rounded-xl border-2 border-genshin-gold/30"></div>
	<div
		class="z-10 h-full w-2/5 [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_1.0)_75%,_transparent_100%)]"
	>
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
		<div class="z-1 flex justify-between">
			<div class="grid grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-2">
				<p class="col-span-2 text-sm">Character</p>
				<LevelSection title="Level" bind:curr={build.currLevel} target={build.targetLevel} />
				<LevelSection
					title="Attack"
					bind:curr={build.currTalent1Level}
					target={build.targetTalent1Level}
				/>
				<LevelSection
					title="Skill"
					bind:curr={build.currTalent2Level}
					target={build.targetTalent2Level}
				/>
				<LevelSection
					title="Burst"
					bind:curr={build.currTalent3Level}
					target={build.targetTalent3Level}
				/>
			</div>
			<WeaponSection bind:curr={build.currWeaponLevel} target={build.targetWeaponLevel} />
		</div>
	</div>
</div>
