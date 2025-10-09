<script lang="ts">
    import { allowOnlyNumbers } from "$lib/util";
	import LevelSection from "./LevelSection.svelte";
	let { curr = $bindable(), target }: { curr: number; target: number } = $props();

	function handleFocusOut() {
		if (curr == null) {
			curr = 1;
		}
	}

	function clampValues() {
		if (curr > target) {
			curr = target;
		}
	}
</script>

<div class={`flex flex-1 flex-col items-center gap-1 ${curr == target && 'section-complete'}`}>
	<p class="text-sm">Weapon</p>
    <div class="relative">
		<input
			type="number"
			class="number-textfield z-10 h-20 w-20 rounded-full border-4 
                   border-genshin-gold 
                   text-genshin-white text-center text-4xl font-bold shadow-lg
                   focus:ring-4 focus:ring-genshin-gold/50
                   outline-none transition-all duration-300"
			bind:value={curr}
			min="1"
			max={target}
			onbeforeinput={allowOnlyNumbers}
			onblur={handleFocusOut}
			oninput={clampValues}
		/>

		<p class="absolute -right-7 -bottom-1 text-sm font-semibold drop-shadow">/ {target}</p>
	</div>
</div>
