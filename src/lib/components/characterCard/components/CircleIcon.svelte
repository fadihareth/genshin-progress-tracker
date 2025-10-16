<script lang="ts">
	let {
		curr,
		target,
		icon,
		alt,
		tags
	}: { curr?: number; target?: number; icon?: string; alt?: string; tags?: string } = $props();
</script>

<div
	class={`relative flex h-15 w-15 items-center justify-center rounded-full border-2 text-2xl shadow-md ${curr == target && 'opacity-30'}`}
>
	{#if icon}
		<img
			src={icon}
			{alt}
			class={`pointer-events-none absolute object-contain select-none ${tags}`}
		/>
		{#if curr}
			<span
				class={`absolute ${curr < 10 ? 'right-0' : '-right-3'} -bottom-3 z-10 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}
			>
				{curr}
			</span>
		{/if}
	{:else if curr !== undefined}
		<span class="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">R{curr}</span>
	{/if}
</div>
