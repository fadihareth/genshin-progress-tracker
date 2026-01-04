<script lang="ts">
	import { LazyImage } from '$lib/components/ui';
	let {
		isComplete = $bindable(),
		labelProps,
		iconProps
	}: {
		isComplete: boolean;
		labelProps: { label: string, tags?: string };
		iconProps?: { icon?: string; alt?: string; tags?: string };
	} = $props();

	function handleClick() {
		isComplete = !isComplete;
	}
</script>

<button
	class={`relative flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border-2 text-xl shadow-md ${isComplete && 'opacity-30'}`}
	onclick={handleClick}
>
	{#if iconProps?.icon}
		<LazyImage
			src={iconProps.icon}
			alt={iconProps.alt}
			className={`pointer-events-none absolute object-contain select-none ${iconProps.tags || ''}`}
		/>
		<span class={`absolute ${labelProps.tags} -bottom-3 z-10 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}>
			{labelProps.label}
		</span>
	{:else}
		<span class="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{labelProps.label}</span>
	{/if}
</button>
