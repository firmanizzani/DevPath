<script lang="ts">
	import type { DiagramKind } from '$lib/data/types';

	let { kind }: { kind: DiagramKind } = $props();

	const surface = 'var(--c-elevated)';
	const border = 'var(--c-line-strong)';
	const ink = 'var(--c-ink)';
	const ink2 = 'var(--c-ink-3)';
	const accent = 'var(--c-info)';
	const ok = 'var(--c-ok)';
	const line = 'var(--c-line)';
</script>

<div class="w-full overflow-hidden rounded-lg border border-line bg-surface">
	<svg
		viewBox="0 0 720 300"
		role="img"
		aria-label="Diagram ilustrasi materi"
		class="w-full h-auto block"
		preserveAspectRatio="xMidYMid meet"
	>
		{#if kind === 'client-server'}
			<rect x="30" y="110" width="160" height="86" rx="8" fill={surface} stroke={border} />
			<text x="110" y="142" text-anchor="middle" fill={ink} font-size="15" font-weight="600" font-family="var(--font-sans)">CLIENT</text>
			<text x="110" y="164" text-anchor="middle" fill={ink2} font-size="11" font-family="var(--font-mono)">browser / app</text>
			<text x="110" y="182" text-anchor="middle" fill={ink2} font-size="11" font-family="var(--font-mono)">localhost:3000</text>

			<rect x="530" y="110" width="160" height="86" rx="8" fill={surface} stroke={border} />
			<text x="610" y="142" text-anchor="middle" fill={ink} font-size="15" font-weight="600" font-family="var(--font-sans)">SERVER</text>
			<text x="610" y="164" text-anchor="middle" fill={ink2} font-size="11" font-family="var(--font-mono)">api + database</text>
			<text x="610" y="182" text-anchor="middle" fill={ink2} font-size="11" font-family="var(--font-mono)">:8080</text>

			<circle cx="360" cy="153" r="54" fill={surface} stroke={border} stroke-dasharray="4 4" />
			<text x="360" y="150" text-anchor="middle" fill={ink} font-size="13" font-weight="600" font-family="var(--font-sans)">INTERNET</text>
			<text x="360" y="170" text-anchor="middle" fill={ink2} font-size="11" font-family="var(--font-mono)">TCP/IP</text>

			<defs>
				<marker id="dp-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
					<path d="M0 0 L9 4.5 L0 9 z" fill={accent} />
				</marker>
				<marker id="dp-arrow-back" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
					<path d="M0 0 L9 4.5 L0 9 z" fill={ok} />
				</marker>
			</defs>
			<line x1="192" y1="132" x2="524" y2="132" stroke={accent} stroke-width="2" marker-end="url(#dp-arrow)" />
			<text x="360" y="122" text-anchor="middle" fill={accent} font-size="12" font-family="var(--font-mono)">HTTP REQUEST · GET / POST</text>
			<line x1="528" y1="176" x2="196" y2="176" stroke={ok} stroke-width="2" marker-end="url(#dp-arrow-back)" />
			<text x="360" y="198" text-anchor="middle" fill={ok} font-size="12" font-family="var(--font-mono)">HTTP RESPONSE · 200 OK</text>
		{:else if kind === 'http-cycle'}
			{#each ['DNS Lookup', 'TCP Handshake', 'HTTP Request', 'Proses Server', 'HTTP Response'] as step, i}
				{@const x = 20 + i * 140}
				<rect x={x} y="118" width="120" height="72" rx="8" fill={surface} stroke={border} />
				<text x={x + 60} y="146" text-anchor="middle" fill={accent} font-size="12" font-family="var(--font-mono)">0{i + 1}</text>
				<text x={x + 60} y="170" text-anchor="middle" fill={ink} font-size="12.5" font-weight="500" font-family="var(--font-sans)">{step}</text>
				{#if i < 4}
					<line x1={x + 122} y1="154" x2={x + 136} y2="154" stroke={ink2} stroke-width="2" />
					<path d="M{x + 136} 149 L{x + 142} 154 L{x + 136} 159 Z" fill={ink2} />
				{/if}
			{/each}
			<text x="360" y="235" text-anchor="middle" fill={ink2} font-size="12" font-family="var(--font-mono)">siklus satu request halaman web, dari lookup nama sampai render</text>
		{:else if kind === 'osi'}
			{#each ['7 · Application', '6 · Presentation', '5 · Session', '4 · Transport', '3 · Network', '2 · Data Link', '1 · Physical'] as layer, i}
				{@const y = 20 + i * 36}
				<rect x="40" y={y} width="330" height="30" rx="6" fill={surface} stroke={line} />
				<rect x="40" y={y} width="4" height="30" rx="2" fill={i < 4 ? accent : ok} />
				<text x="58" y={y + 20} fill={ink} font-size="13" font-weight="500" font-family="var(--font-mono)">{layer}</text>
			{/each}
			<rect x="430" y="20" width="250" height="132" rx="8" fill="none" stroke={accent} stroke-dasharray="5 4" />
			<text x="555" y="46" text-anchor="middle" fill={accent} font-size="13" font-weight="600" font-family="var(--font-sans)">Lapisan Aplikasi (TCP/IP)</text>
			<text x="555" y="70" text-anchor="middle" fill={ink2} font-size="11.5" font-family="var(--font-mono)">HTTP · DNS · SSH · TLS</text>
			<text x="555" y="92" text-anchor="middle" fill={ink2} font-size="11.5" font-family="var(--font-mono)">PDU: data</text>
			<rect x="430" y="166" width="250" height="114" rx="8" fill="none" stroke={ok} stroke-dasharray="5 4" />
			<text x="555" y="192" text-anchor="middle" fill={ok} font-size="13" font-weight="600" font-family="var(--font-sans)">Lapisan Transport &amp; Jaringan</text>
			<text x="555" y="216" text-anchor="middle" fill={ink2} font-size="11.5" font-family="var(--font-mono)">TCP / UDP · IP · Routing</text>
			<text x="555" y="238" text-anchor="middle" fill={ink2} font-size="11.5" font-family="var(--font-mono)">PDU: segment · packet</text>
		{:else if kind === 'subnet'}
			<rect x="230" y="24" width="260" height="64" rx="8" fill={surface} stroke={border} />
			<text x="360" y="50" text-anchor="middle" fill={ink} font-size="15" font-weight="600" font-family="var(--font-mono)">192.168.1.0/24</text>
			<text x="360" y="72" text-anchor="middle" fill={ink2} font-size="11.5" font-family="var(--font-mono)">256 alamat · 254 host usable</text>

			<line x1="360" y1="88" x2="360" y2="118" stroke={border} stroke-width="2" />
			<line x1="170" y1="118" x2="550" y2="118" stroke={border} stroke-width="2" />
			<line x1="170" y1="118" x2="170" y2="150" stroke={border} stroke-width="2" />
			<line x1="360" y1="118" x2="360" y2="150" stroke={border} stroke-width="2" />
			<line x1="550" y1="118" x2="550" y2="150" stroke={border} stroke-width="2" />

			{#each [
				{ x: 40, ip: '192.168.1.0/26', sub: '62 host usable', use: 'Divisi Design' },
				{ x: 235, ip: '192.168.1.64/27', sub: '30 host usable', use: 'Divisi Backend' },
				{ x: 430, ip: '192.168.1.96/28', sub: '14 host usable', use: 'Server & Printer' }
			] as node}
				<rect x={node.x} y="150" width="250" height="92" rx="8" fill={surface} stroke={accent} stroke-opacity="0.5" />
				<text x={node.x + 125} y="180" text-anchor="middle" fill={accent} font-size="13.5" font-weight="600" font-family="var(--font-mono)">{node.ip}</text>
				<text x={node.x + 125} y="202" text-anchor="middle" fill={ink} font-size="12" font-family="var(--font-sans)">{node.sub}</text>
				<text x={node.x + 125} y="224" text-anchor="middle" fill={ink2} font-size="11.5" font-family="var(--font-mono)">{node.use}</text>
			{/each}

			<text x="360" y="276" text-anchor="middle" fill={ink2} font-size="12" font-family="var(--font-mono)">network &amp; broadcast address dipotong di tiap subnet (−2 alamat)</text>
		{:else}
			{#each [0, 1, 2, 3] as i}
				{@const x = 40 + i * 165}
				<path
					d="M{x} 110 L{x + 120} 110 L{x + 148} 150 L{x + 120} 190 L{x} 190 L{x + 28} 150 Z"
					fill={i === 0 ? accent : surface}
					fill-opacity={i === 0 ? 0.16 : 1}
					stroke={i === 0 ? accent : border}
				/>
				<text x={x + 74} y="144" text-anchor="middle" fill={accent} font-size="12" font-family="var(--font-mono)">0{i + 1}</text>
				<text x={x + 74} y="168" text-anchor="middle" fill={ink} font-size="13" font-weight="500" font-family="var(--font-sans)">Tahap {i + 1}</text>
			{/each}
			<text x="360" y="240" text-anchor="middle" fill={ink2} font-size="12" font-family="var(--font-mono)">alur berurutan — hasil tahap sebelumnya jadi masukan tahap berikutnya</text>
		{/if}
	</svg>
</div>
