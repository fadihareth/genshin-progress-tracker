<script lang="ts">
    import { LazyImage, Tooltip } from "$lib/components/ui";
    import { baseURL } from "$lib/constants";

    let { name, rarity, amount }: { name: string; rarity: number; amount: number; } = $props();

    function getItemImage(name: string) {
        return `${baseURL}/items/${name.replaceAll(' ', '_').replaceAll(':', '')}.webp`;
    }
</script>

<Tooltip text={name}>
    <div class="flex flex-col gap-0 items-center rounded overflow-hidden shadow">
        <LazyImage
            src={getItemImage(name)}
            alt={name}
            spinnerSize={12}
            className="aspect-square w-full object-cover z-0 rarity-{rarity}"
        />
        <p class="w-full bg-genshin-white/90 text-yellow-950/70 text-xs text-center">{Intl.NumberFormat('en-US').format(amount)}</p>
    </div>
</Tooltip>