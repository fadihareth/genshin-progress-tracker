<script lang="ts">
	import LazyImage from '$lib/components/ui/LazyImage.svelte';
	import type { Character } from '$lib/models/Character';
	import type { CharacterBuild } from '$lib/models/CharacterBuild.svelte';
	import { talentsByName } from '$lib/stores/data';
	import { ChecklistItem } from '.';

	let { build = $bindable(), character }: { build: CharacterBuild; character: Character } =
		$props();
</script>

<div class="flex flex-col gap-2">
	<ChecklistItem bind:isComplete={build.levelComplete} label={`Level: ${build.targetLevel}`} />
	<ChecklistItem
		bind:isComplete={build.constellationComplete}
		label={`Constellation: ${build.targetConstellation}`}
	/>
	<p class={build.talentComplete() ? 'opacity-30' : ''}>Talents</p>
	<div class="flex flex-col gap-2">
		<ChecklistItem
			bind:isComplete={build.talent1LevelComplete}
			label={`Attack: ${build.targetTalent1Level}`}
		>
			<LazyImage
				src={character.attackTalentImage}
				alt="Attack Talent Icon"
				className="h-10 w-10 rounded-full border-2 shadow-md mr-1"
			/>
		</ChecklistItem>
		<ChecklistItem
			bind:isComplete={build.talent2LevelComplete}
			label={`Skill: ${build.targetTalent2Level}`}
		>
			<LazyImage
				src={talentsByName[character.name].skillImage}
				alt="Skill Talent Icon"
				className="h-10 w-10 rounded-full border-2 shadow-md mr-1"
			/>
		</ChecklistItem>
        <ChecklistItem
			bind:isComplete={build.talent3LevelComplete}
			label={`Burst: ${build.targetTalent3Level}`}
		>
			<LazyImage
				src={talentsByName[character.name].burstImage}
				alt="Burst Talent Icon"
				className="h-10 w-10 rounded-full border-2 shadow-md mr-1"
			/>
		</ChecklistItem>
	</div>
</div>
