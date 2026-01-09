<script lang="ts">
	let { isComplete = $bindable(), label, children }: { isComplete: boolean; label: string, children?: any } = $props();

	function handleClick() {
		isComplete = !isComplete;
	}
</script>

<button
	class={`flex cursor-pointer items-center gap-2 z-10 transition duration-150 ${isComplete && 'opacity-30'}`}
	onclick={handleClick}
>
	<div class={`relative h-3.5 w-3.5 rounded-full border-2 border-genshin-gold`}>
		{#if isComplete}
			<div class="bg-genshin-gold h-1.5 w-1.5 rounded-full absolute top-0.5 left-0.5"></div>
		{/if}
	</div>
	<div class="flex gap-1 items-center">
		{#if children !== undefined}
			{@render children()}
		{/if}
		<p class="text-sm">{label}</p>
	</div>
</button>
