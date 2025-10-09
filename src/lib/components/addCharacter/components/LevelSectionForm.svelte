<script lang="ts">
	let { curr = $bindable(), target = $bindable() }: { curr: number; target: number } = $props();

	function allowOnlyNumbers(e: InputEvent) {
		if (e.inputType.startsWith('delete')) return;
		if (e.data && !/^\d+$/.test(e.data)) {
			e.preventDefault();
		}
	}

	function handleFocusOut() {
		if (target == null) {
			target = 90;
		} else if (target == 0) {
			target = 1;
		}
		if (curr == null || curr == 0) {
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

<div class="flex flex-col gap-2 rounded-md p-2">
    <p class="text-xl font-medium text-gray-600">Level</p>
    <div class="flex items-center gap-3">
        <input
            type="number"
            class="number-textfield border border-gray-600"
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
            class="number-textfield border border-gray-600"
            bind:value={target}
            min={curr}
            max="90"
            onbeforeinput={allowOnlyNumbers}
            onblur={handleFocusOut}
            oninput={clampValues}
        />
    </div>
</div>
