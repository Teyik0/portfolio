"use client";

import { cn } from "@/lib/utils";

import { motion } from "framer-motion";

interface ConnectionPath {
	id: string;
	path: string; // SVG path d attribute: "M x1 y1 L x2 y2" or "M x1 y1 Q cx cy x2 y2" etc.
	color?: string; // e.g., "stroke-sky-500"
	thickness?: number;
	animated?: boolean;
	animationSpeed?: number; // Slower is larger number
	showArrow?: boolean;
}

interface BlockchainConnectorProps {
	paths: ConnectionPath[];
	className?: string;
}

export const BlockchainConnector = ({
	paths,
	className,
}: BlockchainConnectorProps) => {
	return (
		<svg
			className={cn(
				"absolute inset-0 w-full h-full pointer-events-none z-50",
				className,
			)}
			xmlns="http://www.w3.org/2000/svg"
			overflow="visible" // Ensure markers are visible
		>
			<title>Connector</title>
			<defs>
				<marker
					id="dynamicArrowhead"
					markerWidth="5" // Smaller arrowhead
					markerHeight="3.5"
					refX="4.5"
					refY="1.75"
					orient="auto"
					// fill property will be inherited from the path's stroke
				>
					<polygon points="0 0, 5 1.75, 0 3.5" />
				</marker>
			</defs>
			{paths.map((conn) => (
				<g key={conn.id}>
					<motion.path
						d={conn.path}
						className={cn(conn.color || "stroke-slate-600", "fill-none")}
						strokeWidth={conn.thickness || 1.5}
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{ pathLength: 1, opacity: 0.7 }}
						transition={{
							duration: 0.8,
							delay: 0.5 + Math.random() * 0.4,
							ease: "circOut",
						}}
						markerEnd={conn.showArrow ? "url(#dynamicArrowhead)" : undefined}
						style={
							conn.showArrow
								? {
										stroke:
											conn.color?.replace("stroke-", "") || "currentColor",
									}
								: {}
						}
					/>
					{conn.animated && (
						<motion.path
							d={conn.path}
							className={cn(conn.color || "stroke-slate-400", "fill-none")}
							strokeWidth={(conn.thickness || 1.5) + 1} // Slightly thicker for pulse
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
							transition={{
								duration: (conn.animationSpeed || 2) * 0.6, // Faster pulse
								delay: 0.8 + Math.random() * 0.4,
								repeat: Number.POSITIVE_INFINITY,
								repeatType: "loop",
								ease: "easeInOut",
								times: [0, 0.5, 1], // Control opacity keyframes for pulse
							}}
							style={{ filter: "blur(1px)" }}
						/>
					)}
				</g>
			))}
		</svg>
	);
};
