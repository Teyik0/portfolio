export type Project = {
	title: string;
	shortDesc: string;
	githubUrl?: string;
	liveUrl?: string;
	tags: string[];
};

export const blockchainProjects: Project[] = [
	{
		title: "Hello SunChain",
		shortDesc: "Winner of Hackin'Dau, tokenizes solar panel parcels as NFTs.",
		githubUrl: "https://github.com/Teyik0/ctf-solidity",
		liveUrl: "https://hellosunchain.vercel.app",
		tags: ["Solidity", "Next.js", "Typescript", "Wagmi", "Viem"],
	},
	{
		title: "Decentralized Exchange",
		shortDesc: "A decentralized exchange for trading assets.",
		githubUrl: "https://github.com/Yassine94110/dex_pa",
		tags: ["Solidity", "Foundry", "Next.js", "Typescript", "Wagmi", "Viem"],
	},
	{
		title: "NFC Voucher",
		shortDesc: "Create and use enhanced prepaid cards via NFC and Blockchain",
		githubUrl: "https://github.com/Teyik0/nfc-voucher",
		tags: ["Solidity", "Hardhat", "Next.js", "TypeScript", "Wagmi", "Viem"],
	},
	{
		title: "Multisig Wallet",
		shortDesc:
			"A multisig wallet for managing transactions in a more secure and efficient way.",
		githubUrl: "https://github.com/Teyik0/multisig-wallet",
		tags: ["Solidity", "Foundry"],
	},
	{
		title: "Bridgeable GoldToken",
		shortDesc:
			"Transform your crypto into real gold-backed tokens and bridge them across chains with cutting-edge DeFi technology",
		githubUrl: "https://github.com/Teyik0/gold-bridge-vault",
		tags: ["Solidity", "Foundry", "Chainlink CCIP & Oracle"],
	},
	{
		title: "Order Book",
		shortDesc: "A decentralized order book for trading assets.",
		githubUrl: "https://github.com/Teyik0/solidity-order-book",
		tags: ["Solidity", "Foundry"],
	},
	{
		title: "CTF Challenge",
		shortDesc: "Inspired by Oppenzeppelin Ethernaut",
		githubUrl: "https://github.com/Teyik0/ctf-solidity",
		tags: ["Solidity", "Foundry", "Cybersecurity"],
	},
];

export const fullstackProjects: Project[] = [
	{
		title: "Auth API",
		shortDesc: "Sample API-AUTH using Prisma",
		githubUrl: "https://github.com/Teyik0/auth-api-prisma-sample",
		tags: ["Prisma", "Express", "Docker", "CI-CD"],
	},
	{
		title: "Zoo",
		shortDesc: "A zoo management system",
		githubUrl: "https://github.com/Teyik0/car-management",
		tags: ["Next.js", "TypeScript", "Prisma", "Express", "Docker"],
	},
	{
		title: "Spice World",
		shortDesc: "From scratch ecommerce spice platform",
		githubUrl: "https://github.com/Teyik0/spice-world",
		tags: ["Qwik.js", "TypeScript", "Prisma", "Elysia"],
	},
	{
		title: "Image resizer tool",
		shortDesc: "A tool to resize image and convert to webp",
		githubUrl: "https://github.com/Teyik0/image-resizer",
		tags: ["TypeScript", "Bun"],
	},
	{
		title: "GPT Wrapper",
		shortDesc: "A wrapper for OpenAI's GPT API",
		githubUrl: "https://github.com/Teyik0/chatgpt-clone",
		tags: ["Next.js", "TypeScript", "Prisma"],
	},
	{
		title: "Car Management",
		shortDesc: "A car management system",
		githubUrl: "https://github.com/Teyik0/car-management",
		tags: ["Next.js", "TypeScript", "Prisma"],
	},
	{
		title: "Indian Coffee",
		shortDesc: "Indian Coffee restaurant website",
		githubUrl: "https://github.com/Teyik0/indian-coffee",
		tags: ["Next.js", "TypeScript"],
	},
];
