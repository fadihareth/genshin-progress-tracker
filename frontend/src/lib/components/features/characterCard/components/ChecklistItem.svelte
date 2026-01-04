<script lang="ts">
	let { isComplete = $bindable(), label, children }: { isComplete: boolean; label: string, children?: any } = $props();

	function handleClick() {
		isComplete = !isComplete;
	}
</script>

<button
	class={`flex cursor-pointer items-center gap-1 z-10 ${isComplete && 'opacity-30'}`}
	onclick={handleClick}
>
	<div class={`relative h-3 w-3 rounded-full border-2 border-genshin-gold ${isComplete && 'bg-genshin-gold/80'}`}></div>
	{#if children !== undefined}
		{@render children()}
	{/if}
	<p class="text-sm">{label}</p>
</button>
