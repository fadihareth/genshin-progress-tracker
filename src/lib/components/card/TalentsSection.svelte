<script lang="ts">
	import type { CharacterBuild } from '$lib/models/CharacterBuild.svelte';
	import { HideView } from '../ui';
	import { TalentSection } from '.';

	let { build = $bindable() }: { build: CharacterBuild } = $props();
</script>

<HideView bind:isVisible={build.trackingTalents}>
	<div class="flex items-center gap-2">
		<p class="section-label">Talents</p>
		<TalentSection
			label={'Attack'}
			bind:curr={build.currTalent1Level}
			bind:target={build.targetTalent1Level}
		/>
		<TalentSection
			label={'Skill'}
			bind:curr={build.currTalent2Level}
			bind:target={build.targetTalent2Level}
		/>
		<TalentSection
			label={'Burst'}
			bind:curr={build.currTalent3Level}
			bind:target={build.targetTalent3Level}
		/>
	</div>
</HideView>
