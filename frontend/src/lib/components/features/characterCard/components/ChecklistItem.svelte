<script lang="ts">
	let {
		isComplete = $bindable(),
		label,
		children,
		onUpdate = () => {},
	}: {
		isComplete: boolean;
		label: string;
		children?: any;
		onUpdate?: () => void;
	} = $props();

	function handleClick() {
		isComplete = !isComplete;
		onUpdate();
	}
</script>

<button
	class="z-10 flex cursor-pointer items-center gap-2 fade"
	class:opacity-30={isComplete}
	onclick={handleClick}
>
	<div class={`border-genshin-gold relative h-3.5 w-3.5 rounded-full border-2`}>
		{#if isComplete}
			<div class="bg-genshin-gold absolute left-0.5 top-0.5 h-1.5 w-1.5 rounded-full"></div>
		{/if}
	</div>
	<div class="flex items-center gap-1">
		{#if children !== undefined}
			{@render children()}
		{/if}
		<p class="text-sm">{label}</p>
	</div>
</button>
