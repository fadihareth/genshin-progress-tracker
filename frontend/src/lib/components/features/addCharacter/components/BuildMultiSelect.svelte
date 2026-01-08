<script lang="ts">
	import Select from 'svelte-select';

	let {
		value = $bindable(),
		id,
		options,
		max
	}: {
		value: string[];
		id: string;
		options: string[];
		max: number;
	} = $props();

	const items = $derived(value?.length === max ? [] : [...options]);
</script>

<label for={id} class="text-gray-600">{id}</label>
<form autocomplete="off">
	<Select
		id
		bind:value
		{items}
		multiple
		clearable={false}
		closeListOnChange={false}
		placeholder="Select"
	/>
</form>