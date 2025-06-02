"use client";

import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import { Briefcase, Code, TrendingUp, Zap } from "lucide-react"; // Changed icons
import type { JSX } from "react";

type Stat = {
	icon: JSX.Element;
	label: string;
	value: string;
	colorClass: string;
};

const stats: Stat[] = [
	{
		icon: <TrendingUp size={14} />,
		label: "Experience",
		value: "5+ Yrs", // Abbreviated
		colorClass: "text-sky-400",
	},
	{
		icon: <Code size={14} />,
		label: "Projects",
		value: "20+",
		colorClass: "text-emerald-400",
	},
	{
		icon: <Briefcase size={14} />,
		label: "Clients",
		value: "15+",
		colorClass: "text-amber-400",
	},
	{
		icon: <Zap size={14} />, // Changed icon
		label: "Techs", // Abbreviated
		value: "30+",
		colorClass: "text-purple-400",
	},
];

export const QuickStats = () => {
	return (
		<div className="h-full flex flex-col justify-center p-1">
			<div className="space-y-1.5">
				{stats.map((stat, index) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, x: -15 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3, delay: 0.1 + index * 0.07 }}
						className="flex items-center justify-between p-1.5 rounded-md bg-slate-800/50 group hover:bg-slate-700/70 transition-colors"
					>
						<div className="flex items-center gap-2">
							<span
								className={cn(
									"transition-colors",
									stat.colorClass,
									"group-hover:brightness-125",
								)}
							>
								{stat.icon}
							</span>
							<span className="text-[10px] text-slate-400 group-hover:text-slate-200 transition-colors">
								{stat.label}
							</span>
						</div>
						<span className="text-[10px] font-medium text-slate-200 group-hover:text-white transition-colors">
							{stat.value}
						</span>
					</motion.div>
				))}
			</div>
		</div>
	);
};
