<script lang="ts">
	import { artifactsById, charactersById, talentsByName } from '$lib/stores/data';
	import { buildsState } from '$lib/stores/state.svelte';
	import { CircleIcon, ChecklistItem } from './components';
	import { LazyImage, MenuButton } from '$lib/components';
	import { bgColors } from '$lib/constants';
	import { assets } from '$lib/assets';
	import fitty from 'fitty';
	import {
		IconCrown,
		IconFeather,
		IconFlower,
		IconGlass,
		IconHourglassEmpty
	} from '@tabler/icons-svelte';

	let { id }: { id: number } = $props();
	let build = $derived(buildsState[id]);
	let character = charactersById[buildsState[id].character];

	let textEl: HTMLElement;
	$effect(() => {
		fitty(textEl, {
			minSize: 10,
			maxSize: 22,
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
	class={`relative flex flex-col gap-2 rounded-xl ${bgColors[character.element]} ${build.isComplete() ? 'opacity-30' : ''} text-genshin-gold shadow-xl`}
>
	<div class="absolute inset-2 z-0 rounded-xl border-2 border-genshin-gold/30"></div>
	<div class="flex">
		<div class="fadeout z-10 h-75 w-[300px]">
			<LazyImage
				src={character.profileImage}
				alt={character.name}
				className="h-full w-full"
				placeholder={assets.placeholders.character}
			/>
		</div>
		<div class="flex w-full flex-col gap-2 pt-5 pr-5 pl-5">
			<div class="flex items-end justify-between">
				<h2 bind:this={textEl}>{character.name}</h2>
				<MenuButton {onSelect} />
			</div>
			<ChecklistItem bind:isComplete={build.levelComplete} label={`Level: ${build.targetLevel}`} />
			<ChecklistItem
				bind:isComplete={build.constellationComplete}
				label={`Constellation: ${build.targetConstellation}`}
			/>
			<p class={build.weaponComplete() ? 'opacity-30' : ''}>Weapon</p>
			<ChecklistItem
				bind:isComplete={build.weaponLevelComplete}
				label={`Level: ${build.targetWeaponLevel}`}
			/>
			<ChecklistItem
				bind:isComplete={build.weaponRefineComplete}
				label={`Refine: ${build.targetWeaponRefine}`}
			/>
			<p class={build.talentComplete() ? 'opacity-30' : ''}>Talents</p>
			<div class="flex items-center gap-5">
				<CircleIcon
					bind:isComplete={build.talent1LevelComplete}
					labelProps={{
						label: build.targetTalent1Level,
						tags: Number(build.targetTalent1Level) < 10 ? 'right-0' : '-right-3'
					}}
					iconProps={{ icon: character.attackTalentImage, alt: 'Attack Talent Icon' }}
				/>
				<CircleIcon
					bind:isComplete={build.talent2LevelComplete}
					labelProps={{
						label: build.targetTalent2Level,
						tags: Number(build.targetTalent2Level) < 10 ? 'right-0' : '-right-3'
					}}
					iconProps={{ icon: talentsByName[character.name].skillImage, alt: 'Skill Talent Icon' }}
				/>
				<CircleIcon
					bind:isComplete={build.talent3LevelComplete}
					labelProps={{
						label: build.targetTalent3Level,
						tags: Number(build.targetTalent3Level) < 10 ? 'right-0' : '-right-3'
					}}
					iconProps={{ icon: talentsByName[character.name].burstImage, alt: 'Burst Talent Icon' }}
				/>
			</div>
		</div>
	</div>
	<div class="flex w-full flex-col gap-2 pr-5 pb-5 pl-7">
		<p class={build.artifactsComplete() ? 'opacity-30' : ''}>Artifacts</p>
		<div class="flex gap-5">
			<button
				class={`cursor-pointer rounded-full bg-gray-100/10 hover:bg-gray-200/30 ${build.artifactsComplete() ? 'opacity-30' : ''}`}
				onclick={() => {}}
			>
				<LazyImage
					src={artifactsById[0].image}
					alt="Artifact"
					className="pointer-events-none absolute object-contain select-none w-25 h-25"
				/>
			</button>
			<div class="grid grid-cols-[max-content_1fr] items-center gap-x-10 gap-y-2">
				<ChecklistItem bind:isComplete={build.flowerComplete} label="HP">
					<IconFlower />
				</ChecklistItem>
				<ChecklistItem bind:isComplete={build.gobletComplete} label="PYRO DMG%">
					<IconGlass />
				</ChecklistItem>
				<ChecklistItem bind:isComplete={build.plumeComplete} label="ATK">
					<IconFeather />
				</ChecklistItem>
				<ChecklistItem bind:isComplete={build.circletComplete} label="CRIT RATE%">
					<IconCrown />
				</ChecklistItem>
				<ChecklistItem bind:isComplete={build.sandsComplete} label="ER%">
					<IconHourglassEmpty />
				</ChecklistItem>
			</div>
		</div>
		<div class={`flex items-center gap-2 text-xs ${build.artifactsComplete() ? 'opacity-30' : ''}`}>
			<p>Substats:</p>
			{#each ['CRIT RATE', 'CRIT DMG', 'ER', 'EM'] as substat}
				<p class="rounded-xl bg-gray-100/10 p-2">{substat}</p>
			{/each}
		</div>
	</div>
</div>
