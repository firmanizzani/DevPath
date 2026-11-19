<script lang="ts">
	import { Terminal, Spline, Code, Server, ChartColumnIncreasing, Cloud, Network } from '@lucide/svelte';

	let { icon, size = 20, class: klass = '' }: { icon: string; size?: number; class?: string } =
		$props();

	const map: Record<string, typeof Terminal> = {
		terminal: Terminal,
		pen: Spline,
		code: Code,
		server: Server,
		chart: ChartColumnIncreasing,
		cloud: Cloud,
		network: Network
	};

	const Icon = $derived(map[icon] ?? Terminal);
</script>

<Icon {size} class={klass} strokeWidth={1.75} />
