<script lang="ts">
	import { CircleIcon } from '.';
	import { allowOnlyNumbers } from '$lib/util';

	let {
		title,
        iconProps,
		curr = $bindable(),
		target = $bindable()
	}: { title: string; iconProps: any; curr: number; target: number } = $props();

	function handleFocusOut() {
		if (target == null) {
			target = 90;
		} else if (target == 0) {
			target = 1;
		}
		if (curr == null || curr == 0) {
			curr = 1;
		}
	}

	function clampValues() {
		if (curr > target) {
			curr = target;
		}
		if (target > 90) {
			target = 90;
		}
	}
</script>

<div class={`flex gap-4 items-center text-genshin-white/60 ${curr == target && 'opacity-30'}`}>
    <CircleIcon icon={iconProps.icon} alt={iconProps.alt} tags={iconProps.tags} />
    <p class="text-sm">{title}</p>
</div>
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
    <input
		type="number"
		class="number-textfield border border-genshin-gold/10 transition duration-300
                outline-none focus:border-genshin-gold/50 focus:ring-1"
		bind:value={target}
		min={curr}
		max="90"
		onbeforeinput={allowOnlyNumbers}
		onblur={handleFocusOut}
		oninput={clampValues}
	/>
</div>
