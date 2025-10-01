<script lang="ts">
	import type { CharacterBuild } from '$lib/models/CharacterBuild.svelte';
	import { HideView } from '../ui';

	let { build = $bindable() }: { build: CharacterBuild } = $props();

	function allowOnlyNumbers(e: InputEvent) {
		if (e.inputType.startsWith('delete')) return;
		if (e.data && !/^\d+$/.test(e.data)) {
			e.preventDefault();
		}
	}

	function handleFocusOut() {
		if (build.targetLevel == null) {
			build.targetLevel = 90;
		}
		if (build.currLevel == null) {
			build.currLevel = 1;
		}
	}

	function clampValues() {
		if (build.currLevel > build.targetLevel) {
			build.currLevel = build.targetLevel;
		}
		if (build.targetLevel > 90) {
			build.targetLevel = 90;
		}
	}

    function ascendLevel() {
        build.currLevel = Math.min(build.targetLevel, (Math.floor(build.currLevel / 10) * 10) + 10);
    }
</script>

<HideView bind:isVisible={build.trackingLevel}>
	<div class="flex items-center gap-2">
		<p class="section-label">Level</p>
		<input
			type="number"
			class="w-16 rounded px-2 py-1 text-center"
			bind:value={build.currLevel}
			min="1"
			max={build.targetLevel}
			onbeforeinput={allowOnlyNumbers}
			onblur={handleFocusOut}
			oninput={clampValues}
		/>
		<span class="text-lg">/</span>
		<input
			type="number"
			class="w-16 rounded px-2 py-1 text-center"
			bind:value={build.targetLevel}
			min={build.currLevel}
			max="90"
			onbeforeinput={allowOnlyNumbers}
			onblur={handleFocusOut}
			oninput={clampValues}
		/>
		<button class="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600" onclick={ascendLevel}>
			+10
		</button>
	</div>
</HideView>
