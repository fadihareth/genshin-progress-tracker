<script lang="ts">
	import Select from 'svelte-select';

	let {
		value = $bindable(),
		id,
		items
	}: { value: string | null; id: string; items: string[] } = $props();
</script>

<label for={id} class="text-gray-600">{id}</label>
<form autocomplete="off">
	<Select id bind:value {items} placeholder="Select" clearable={false} />
</form>
