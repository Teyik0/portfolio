"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type React from "react";

interface BlockchainNodeProps {
	children: React.ReactNode;
	className?: string;
	nodeTitle: string;
	nodeId: string; // Short visual hash or identifier
	accentColorClass?: string; // e.g., "bg-blue-500" for a glow or main color
	icon?: React.ReactNode; // Optional icon for the node type
	portPositions?: ("top" | "right" | "bottom" | "left")[]; // Sides where connectors can attach
}

export const PortIndicator: React.FC<{
	side: string;
	accentColorClass?: string;
}> = ({ side, accentColorClass }) => {
	let positionClasses = "";
	switch (side) {
		case "top":
			positionClasses = "top-[-3px] left-1/2 -translate-x-1/2 h-[6px] w-3";
			break;
		case "right":
			positionClasses = "right-[-3px] top-1/2 -translate-y-1/2 w-[6px] h-3";
			break;
		case "bottom":
			positionClasses = "bottom-[-3px] left-1/2 -translate-x-1/2 h-[6px] w-3";
			break;
		case "left":
			positionClasses = "left-[-3px] top-1/2 -translate-y-1/2 w-[6px] h-3";
			break;
	}
	return (
		<div
			className={cn(
				"absolute rounded-sm opacity-70 group-hover:opacity-100 transition-opacity",
				accentColorClass || "bg-slate-500",
				positionClasses,
			)}
		/>
	);
};

export const BlockchainNode = ({
	children,
	className,
	nodeTitle,
	nodeId,
	accentColorClass = "bg-sky-500",
	icon,
	portPositions = [],
}: BlockchainNodeProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{
				duration: 0.5,
				ease: [0.25, 1, 0.5, 1],
				delay: Math.random() * 0.3,
			}}
			className={cn(
				`group relative flex flex-col bg-slate-900/60 backdrop-blur-md shadow-2xl
         			border border-slate-700/70 hover:border-slate-500/80 transition-colors duration-300 w-full md:w-[270px] h-[240px] rounded-xl overflow-hidden
         			before:absolute before:top-0 before:left-0 before:w-3 before:h-3 before:bg-slate-900/0 before:border-t before:border-l before:border-slate-700/0 before:transform before:-skew-x-[0deg] before:transition-all
         			after:absolute after:bottom-0 after:right-0 after:w-3 after:h-3 after:bg-slate-900/0 after:border-b after:border-r after:border-slate-700/0 after:transform after:-skew-x-[0deg] after:transition-all
         			group-hover:before:border-slate-500/80 group-hover:after:border-slate-500/80`,
				className,
			)}
		>
			<div
				className={cn(
					"flex-shrink-0 flex items-center justify-between p-2.5 border-b border-slate-700/50 relative overflow-hidden",
				)}
			>
				{/* Header with Title, Icon, and Glow */}
				<div className="flex items-center gap-2">
					{icon && (
						<span className="text-slate-400 group-hover:text-white transition-colors">
							{icon}
						</span>
					)}
					<h3 className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
						{nodeTitle}
					</h3>
				</div>
				<span className="text-[9px] text-slate-500 font-mono group-hover:text-slate-400 transition-colors">
					{nodeId}
				</span>
				{/* Accent Glow */}
				<div
					className={cn(
						"absolute left-0 top-0 h-full w-1.5 opacity-60 group-hover:opacity-80 transition-opacity duration-300",
						accentColorClass,
					)}
					style={{ filter: "blur(2px) brightness(1.2)" }}
				/>
				{/* Subtle gradient border effect */}
				<div className="absolute inset-0 rounded-2xl p-px pointer-events-none">
					<div className="absolute -inset-px rounded-2xl bg-linear-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 animate-gradient-x" />
				</div>
			</div>

			{/* Content Area */}
			<div className="flex-grow p-2.5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50">
				{children}
			</div>

			{/* Connection Ports */}
			{portPositions.map((side) => (
				<PortIndicator
					key={side}
					side={side}
					accentColorClass={accentColorClass}
				/>
			))}
		</motion.div>
	);
};
