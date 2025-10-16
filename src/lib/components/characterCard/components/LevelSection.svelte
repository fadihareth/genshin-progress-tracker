<script lang="ts">
	import { allowOnlyNumbers } from '$lib/util';
	let {
		title,
		curr = $bindable(),
		target
	}: { title: string; curr: number; target: number } = $props();

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

<p class={`text-sm ${curr == target && 'opacity-30'}`}>{title}</p>
<div class={`flex items-center gap-2 text-genshin-white ${curr == target && 'opacity-30'}`}>
	<input
		type="number"
		class="number-textfield border border-genshin-gold/10 transition duration-300
                outline-none focus:border-genshin-gold/50 focus:ring-1"
		bind:value={curr}
		min="1"
		max={target}
		onbeforeinput={allowOnlyNumbers}
		onblur={handleFocusOut}
		oninput={clampValues}
	/>
	<img
		src="/src/lib/assets/ui/arrow-right.svg"
		alt="arrow"
		class="w-4 [mask-image:linear-gradient(to_left,_rgba(0,_0,_0,_1.0)_25%,_transparent_100%)]"
	/>
	<p class="text-sm font-semibold">{target}</p>
</div>
