import type { Scope } from './types';

export const scopes: Scope[] = [
	{
		id: 'software-engineer',
		title: 'Software Engineer',
		category: 'Engineering & Dev',
		description:
			'Fondasi arsitektur sistem, algoritma, desain pola, dan metodologi rekayasa perangkat lunak skala enterprise.',
		icon: 'terminal',
		est_time: '~4 Jam',
		popularity: 88,
		difficulty: 3
	},
	{
		id: 'ui-ux-designer',
		title: 'UI/UX Designer',
		category: 'Desain',
		description:
			'Riset pengguna, wireframing, prototyping interaktif, design system, dan usability testing aplikasi digital.',
		icon: 'pen',
		est_time: '~4 Jam',
		popularity: 74,
		difficulty: 2
	},
	{
		id: 'frontend-developer',
		title: 'Frontend Developer',
		category: 'Engineering & Dev',
		description:
			'Kuasai HTML modern, CSS tingkat lanjut, JavaScript modern, Tailwind CSS, dan ekosistem React/Next.js.',
		icon: 'code',
		est_time: '~4 Jam',
		popularity: 96,
		difficulty: 2
	},
	{
		id: 'backend-developer',
		title: 'Backend Developer',
		category: 'Engineering & Dev',
		description:
			'Membangun REST API performa tinggi, GraphQL, arsitektur database relasional & NoSQL, serta autentikasi aman.',
		icon: 'server',
		est_time: '~4 Jam',
		popularity: 92,
		difficulty: 4
	},
	{
		id: 'data-analyst',
		title: 'Data Analyst',
		category: 'Data & Network',
		description:
			'Eksplorasi data dengan SQL, Python (Pandas), statistik bisnis, serta visualisasi interaktif via Tableau & PowerBI.',
		icon: 'chart',
		est_time: '~4 Jam',
		popularity: 71,
		difficulty: 3
	},
	{
		id: 'cloud-engineer',
		title: 'Cloud Engineer',
		category: 'Engineering & Dev',
		description:
			'Deploy dan orkestrasi infrastruktur berbasis AWS/GCP, container Docker, Kubernetes, dan pipeline CI/CD otomatis.',
		icon: 'cloud',
		est_time: '~4 Jam',
		popularity: 79,
		difficulty: 4
	},
	{
		id: 'network-engineer',
		title: 'Network Engineer',
		category: 'Data & Network',
		description:
			'Konfigurasi protokol jaringan TCP/IP, VLAN, routing BGP/OSPF, keamanan perimeter firewall, dan monitoring jaringan.',
		icon: 'network',
		est_time: '~4 Jam',
		popularity: 66,
		difficulty: 5
	}
];

export const categories = [
	'All Scope',
	'Engineering & Dev',
	'Data & Network',
	'Desain'
] as const;
