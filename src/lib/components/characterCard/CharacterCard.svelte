<script lang="ts">
	import { charactersById, talentsByName } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { ArtifactIcons, CircleIcon } from './components';
	import { LazyImage, MenuButton } from '../ui';
	import { bgColors } from '$lib/constants';
	import fitty from 'fitty';

	let { id }: { id: number } = $props();
	let build = $derived(buildsState[id]);
	let character = charactersById[buildsState[id].character];

	let textEl: HTMLElement;
	$effect(() => {
		fitty(textEl, {
			minSize: 10,
			maxSize: 20,
			multiLine: false
		});
	});

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
	class={`relative flex h-75 rounded-xl ${bgColors[character.element]} text-genshin-gold shadow-xl`}
>
	<div class="absolute inset-2 z-0 rounded-xl border-2 border-genshin-gold/30"></div>
	<div class="fadeout-right z-10 h-full w-2/5">
		<LazyImage src={character.profileImage} alt={character.name} className="h-full w-full" />
	</div>

	<div class="z-1 flex flex-1 flex-col gap-y-2 p-4">
		<div class="flex items-center justify-between">
			<h2 bind:this={textEl} class="h-9">{character.name}</h2>
			<MenuButton {onSelect} />
		</div>
		<div
			class="grid gap-y-4 pb-4"
			style="grid-template-columns: repeat(auto-fit, minmax(79px, 1fr));"
		>
			<CircleIcon
				curr={build.currLevel}
				target={build.targetLevel}
				icon="src/lib/assets/icons/level.webp"
				alt="Level Icon"
				tags="p-2"
			/>
			<CircleIcon
				curr={build.currWeaponLevel}
				target={build.targetWeaponLevel}
				icon={`src/lib/assets/icons/weapon.webp`}
				alt="Weapon Icon"
				tags="p-2"
			/>
			<CircleIcon curr={build.currWeaponRefine} target={build.targetWeaponRefine} />
			<CircleIcon
				curr={build.currTalent1Level}
				target={build.targetTalent1Level}
				icon={character.attackTalentImage}
				alt="Attack Talent Icon"
			/>
			<CircleIcon
				curr={build.currTalent2Level}
				target={build.targetTalent2Level}
				icon={talentsByName[character.name].skillImage}
				alt="Skill Talent Icon"
			/>
			<CircleIcon
				curr={build.currTalent3Level}
				target={build.targetTalent3Level}
				icon={talentsByName[character.name].burstImage}
				alt="Burst Talent Icon"
			/>
		</div>
		<ArtifactIcons />
	</div>
</div>
