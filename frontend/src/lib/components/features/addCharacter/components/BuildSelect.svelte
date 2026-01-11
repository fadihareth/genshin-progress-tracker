<script lang="ts">
	import Select from 'svelte-select';

	let {
		value = $bindable(),
		id,
		items,
		icon
	}: { value: string | null; id: string; items: string[]; icon?: string | any } = $props();

	let newVal = $derived(value ? { value: value, label: value } : null);
</script>

<div class="flex items-center gap-2">
	{#if icon}
		{#if typeof icon === 'string'}
			<img src={icon} alt={`${id} icon`} class="h-8 w-8" />
		{:else}
			{@const Icon = icon}
			<Icon class="text-gray-600" size={28} />
		{/if}
	{/if}
	<label for={id} class="text-gray-600">{id}</label>
</div>
<form autocomplete="off">
	<Select id bind:justValue={value} value={newVal} {items} placeholder="Select" clearable={false} />
</form>
