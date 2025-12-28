<script lang="ts">
    import { LazyImage } from "$lib/components/ui";
	let {
		complete,
		target,
		icon,
		alt,
		tags
	}: { complete?: boolean; target?: number; icon?: string; alt?: string; tags?: string } = $props();
</script>

<div
	class={`relative flex h-15 w-15 items-center justify-center rounded-full border-2 text-2xl shadow-md ${complete && 'opacity-30'}`}
>
	{#if icon}
		<LazyImage
			src={icon}
			{alt}
			className={`pointer-events-none absolute object-contain select-none ${tags}`}
		/>
		{#if target}
			<span
				class={`absolute ${target < 10 ? 'right-0' : '-right-3'} -bottom-3 z-10 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}
			>
				{target}
			</span>
		{/if}
	{:else if target !== undefined}
		<span class="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">R{target}</span>
	{/if}
</div>


