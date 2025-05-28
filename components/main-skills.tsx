"use client";

import {
	Dialog,
	DialogContent,
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
	{
		category: "Frontend",
		skills: [
			"React",
			"Vue.js",
			"HTML/CSS",
			"Tailwind CSS",
			"Framer Motion",
			"Redux",
			"GraphQL",
		],
	},
	{
		category: "Backend",
		skills: [
			"Node.js",
			"Express",
			"Django",
			"FastAPI",
			"PostgreSQL",
			"MongoDB",
			"Redis",
		],
	},
	{
		category: "DevOps",
		skills: [
			"Docker",
			"Kubernetes",
			"AWS",
			"CI/CD",
			"Terraform",
			"GitHub Actions",
			"Vercel",
		],
	},
	{
		category: "Blockchain",
		skills: [
			"Solidity",
			"Web3.js",
			"Ethers.js",
			"Smart Contracts",
			"DeFi",
			"NFTs",
			"Hardhat",
		],
	},
	{
		category: "Tools",
		skills: ["Git", "VS Code", "Figma", "Postman", "Jira", "Notion", "Slack"],
	},
];

export const MainSkills = () => {
	return (
		<div className="mt-16 relative flex justify-center">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className="relative"
			>
				<div
					className="relative p-6 grid grid-cols-2 gap-16 max-w-xs border border-white/20 bg-white/5 backdrop-blur-md rounded-3xl
				            shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden"
				>
					<div
						className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 pointer-events-none
					                bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.20)_40%,rgba(255,255,255,0.20)_60%,transparent)]"
					/>
					<div
						className="absolute left-1/2 top-1/2 w-[calc(100%-2rem)] h-px -translate-x-1/2 -translate-y-1/2 pointer-events-none
					                bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.20)_40%,rgba(255,255,255,0.20)_60%,transparent)]"
					/>

					{/* Subtle gradient border effect */}
					<div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
						<div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 animate-gradient-x" />
					</div>

					<Dialog>
						<DialogTrigger asChild>
							<button
								type="button"
								className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-xs flex justify-center items-center z-10
  													bg-gradient-to-r from-neutral-900/90 via-neutral-700/90 to-neutral-900/90
  													hover:from-neutral-800/80 hover:via-neutral-600/70 hover:to-neutral-800/80
  													backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/20 transition-all duration-300
  													shadow-lg hover:shadow-white/5 w-max"
							>
								{">"} Tech Stacks
							</button>
						</DialogTrigger>
						<DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
							<DialogHeader>
								<DialogTitle className="text-2xl mb-6">
									All Skills & Technologies
								</DialogTitle>
							</DialogHeader>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
								{allSkills.map((category) => (
									<div key={category.category} className="space-y-3">
										<h3 className="text-xl font-semibold text-white/90">
											{category.category}
										</h3>
										<ul className="space-y-2">
											{category.skills.map((skill) => (
												<li key={skill} className="flex items-center">
													<div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
													<span className="text-white/80">{skill}</span>
												</li>
											))}
										</ul>
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
									className: "h-12 w-12",
								})}
							</motion.div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
};
