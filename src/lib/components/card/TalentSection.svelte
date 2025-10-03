<script lang="ts">
	let {
		label,
		curr = $bindable(),
		target = $bindable()
	}: { label: string; curr: number; target: number } = $props();

	function allowOnlyNumbers(e: InputEvent) {
		if (e.inputType.startsWith('delete')) return;
		if (e.data && !/^\d+$/.test(e.data)) {
			e.preventDefault();
		}
	}

	function handleFocusOut() {
		if (target == null) {
			target = 90;
		}
		if (curr == null) {
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

<div class={`flex flex-col items-center ${curr == target && "section-complete"}`}>
	<div class="flex items-center gap-1">
        <input
            type="number"
            class="number-textfield"
            bind:value={curr}
            min="1"
            max={target}
            onbeforeinput={allowOnlyNumbers}
            onblur={handleFocusOut}
            oninput={clampValues}
        />
        <span class="text-lg">/</span>
        <input
            type="number"
            class="number-textfield"
            bind:value={target}
            min={curr}
            max="10"
            onbeforeinput={allowOnlyNumbers}
            onblur={handleFocusOut}
            oninput={clampValues}
        />
    </div>
	<p class="text-sm">{label}</p>
</div>
