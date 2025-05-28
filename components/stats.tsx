"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, Calendar, Code } from "lucide-react";
import type { JSX } from "react";

type Stat = {
	icon: JSX.Element;
	label: string;
	value: string;
};

const stats: Stat[] = [
	{
		icon: <Calendar className="h-4 w-4 text-blue-400" />,
		label: "Experience",
		value: "5+ years",
	},
	{
		icon: <Code className="h-4 w-4 text-amber-500" />,
		label: "Projects",
		value: "20+ completed",
	},
	{
		icon: <Briefcase className="h-4 w-4 text-green-400" />,
		label: "Clients",
		value: "15+ satisfied",
	},
	{
		icon: <Award className="h-4 w-4 text-purple-400" />,
		label: "Technologies",
		value: "30+ mastered",
	},
];

export const QuickStats = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.4 }}
			className="relative"
		>
			<div className="relative p-5 w-[280px] border border-white/20 bg-white/5 backdrop-blur-md rounded-3xl">
				{/* Header */}
				<div className="text-center mb-4">
					<h3 className="text-sm font-medium text-white/90">Quick Stats</h3>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 gap-3">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
							className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10
                         border border-white/10 hover:border-white/20 transition-all duration-300
                         group"
						>
							<div className="flex items-center gap-3">
								<div className="text-white/80 group-hover:text-white transition-colors">
									{stat.icon}
								</div>
								<div className="text-xs text-white/80 group-hover:text-white transition-colors">
									{stat.label}
								</div>
							</div>
							<div className="text-xs font-semibold text-white">
								{stat.value}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
};
