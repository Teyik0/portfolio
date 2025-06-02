"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { BunSvg } from "@/lib/icons/bun";
import { NextjsSvg } from "@/lib/icons/nextjs";
import { PrismaSvg } from "@/lib/icons/prisma";
import { TypeScriptSvg } from "@/lib/icons/typescript";
import { motion } from "framer-motion";
import React, { type ReactElement, type SVGProps } from "react";
import { PortIndicator } from "./blockchain-node";

const mainSkills = [
	{
		icon: <BunSvg />,
	},
	{
		icon: <PrismaSvg />,
	},
	{
		icon: <TypeScriptSvg />,
	},
	{
		icon: <NextjsSvg />,
	},
] satisfies { icon: ReactElement<SVGProps<SVGSVGElement>> }[];

const allSkills = [
	"React",
	"Vue.js",
	"HTML/CSS",
	"Tailwind CSS",
	"Framer Motion",
	"Redux",
	"GraphQL",
	"Node.js",
	"Express",
	"Django",
	"FastAPI",
	"PostgreSQL",
	"MongoDB",
	"Redis",
	"Docker",
	"Kubernetes",
	"AWS",
	"CI/CD",
	"Terraform",
	"GitHub Actions",
	"Vercel",
	"Solidity",
	"Web3.js",
	"Ethers.js",
	"Smart Contracts",
	"DeFi",
	"NFTs",
	"Hardhat",
	"Git",
	"VS Code",
	"Figma",
	"Postman",
	"Jira",
	"Notion",
	"Slack",
];

export const MainSkills = ({
	portPositions = [],
}: {
	portPositions?: ("top" | "right" | "bottom" | "left")[]; // Sides where connectors can attach
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{
				duration: 0.5,
				ease: [0.25, 1, 0.5, 1],
				delay: Math.random() * 0.3,
			}}
			className="w-full max-w-[280px] md:max-w-none relative overflow-hidden p-6 grid grid-cols-2 gap-16 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl"
		>
			{/* Central lines */}
			<div
				className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 pointer-events-none
					                bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.20)_40%,rgba(255,255,255,0.20)_60%,transparent)]"
			/>
			<div
				className="absolute left-1/2 top-1/2 w-[calc(100%-2rem)] h-px -translate-x-1/2 -translate-y-1/2 pointer-events-none
					                bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.20)_40%,rgba(255,255,255,0.20)_60%,transparent)]"
			/>

			{/* Subtle gradient border effect */}
			<div className="absolute inset-0 rounded-2xl p-px pointer-events-none">
				<div className="absolute -inset-px rounded-2xl bg-linear-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 animate-gradient-x" />
			</div>

			<Dialog>
				<DialogTrigger asChild>
					<button
						type="button"
						className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-xs flex justify-center items-center z-10
  													bg-linear-to-r from-neutral-900/90 via-neutral-700/90 to-neutral-900/90 cursor-pointer
  													hover:from-neutral-800/80 hover:via-neutral-600/70 hover:to-neutral-800/80
  													backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/20 transition-all duration-300
  													shadow-lg hover:shadow-white/5 w-max"
					>
						{">"} Tech Stacks
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] bg-black/80 backdrop-blur-md border-white/20 text-white">
					<DialogHeader>
						<DialogTitle>All Skills & Technologies</DialogTitle>
						<DialogDescription className="text-white/70">
							A comprehensive list of technologies and methodologies I work
							with.
						</DialogDescription>
					</DialogHeader>
					<div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 py-2 max-h-[250px] overflow-y-auto">
						{allSkills.map((skill) => (
							<div
								key={skill}
								className="p-1 bg-white/10 rounded text-[10px] text-center text-white/80"
							>
								{skill}
							</div>
						))}
					</div>
				</DialogContent>
			</Dialog>

			{mainSkills.map((skill, index) => (
				<motion.div
					key={`${skill.icon.type}-${index}`}
					className="flex flex-col items-center text-center group"
				>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						whileHover={{ scale: 1.1, rotate: 5 }}
						whileTap={{ scale: 0.95 }}
						className="text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
					>
						{React.cloneElement(skill.icon, {
							className: "xl:size-16 size-16",
						})}
					</motion.div>
				</motion.div>
			))}

			{/* Connection Ports */}
			{portPositions.map((side) => (
				<PortIndicator
					key={side}
					side={side}
					accentColorClass="bg-emerald-500 z-50"
				/>
			))}
		</motion.div>
	);
};
