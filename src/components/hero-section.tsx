"use client";

import { Avatar } from "@/components/avatar";
import { MainSkills } from "@/components/main-skills";
import RadialGradient from "@/components/ui/radial-gradient";
import { Vortex } from "@/components/ui/vortex";
import { ProjectCarousel } from "./project-carousel";
import { QuickStats } from "./stats";

import type React from "react";

import { useMediaQuery } from "@/hooks/use-media-query"; // This import should now work
import { blockchainProjects, fullstackProjects } from "@/lib/projects";
import { BarChart2, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlockchainConnector } from "./blockchain-connector";
import { BlockchainNode } from "./blockchain-node";

export const HeroSection = () => {
	const isMediumScreen = useMediaQuery("(min-width: 768px)");
	const containerRef = useRef<HTMLDivElement>(null);
	const nodeRefs = {
		projects: useRef<HTMLDivElement>(null),
		tech: useRef<HTMLDivElement>(null),
		stats: useRef<HTMLDivElement>(null),
	};
	const [connectorPaths, setConnectorPaths] = useState<any[]>([]);

	useEffect(() => {
		if (!isMediumScreen || !containerRef.current) {
			setConnectorPaths([]);
			return;
		}

		const getPortPosition = (
			nodeRef: React.RefObject<HTMLDivElement>,
			side: "top" | "right" | "bottom" | "left",
		) => {
			if (!nodeRef.current || !containerRef.current) return { x: 0, y: 0 };
			const nodeRect = nodeRef.current.getBoundingClientRect();
			const containerRect = containerRef.current.getBoundingClientRect();
			// Port visual size is 6px, offset by 3px from edge
			const portOffset = 3; // This is the visual offset of the port indicator from the node's edge

			// Calculate center of the node relative to the container
			const nodeCenterX =
				nodeRect.left - containerRect.left + nodeRect.width / 2;
			const nodeCenterY =
				nodeRect.top - containerRect.top + nodeRect.height / 2;

			// Calculate edge positions relative to the container
			const nodeTop = nodeRect.top - containerRect.top;
			const nodeRight = nodeRect.right - containerRect.left;
			const nodeBottom = nodeRect.bottom - containerRect.top;
			const nodeLeft = nodeRect.left - containerRect.left;

			switch (side) {
				case "top":
					return {
						x: nodeCenterX,
						y: nodeTop - portOffset,
					};
				case "right":
					return {
						x: nodeRight + portOffset,
						y: nodeCenterY,
					};
				case "bottom":
					return {
						x: nodeCenterX,
						y: nodeBottom + portOffset,
					};
				case "left":
					return {
						x: nodeLeft - portOffset,
						y: nodeCenterY,
					};
				default:
					return { x: 0, y: 0 };
			}
		};

		const calculatePaths = () => {
			const p = nodeRefs.projects.current;
			const t = nodeRefs.tech.current;
			const s = nodeRefs.stats.current;

			if (p && t && s && containerRef.current) {
				const projRight = getPortPosition(nodeRefs.projects!, "right");
				const techLeft = getPortPosition(nodeRefs.tech!, "left");
				const techRight = getPortPosition(nodeRefs.tech!, "right");
				const statsLeft = getPortPosition(nodeRefs.stats!, "left");

				// A slightly curved path example
				const projToTechPath = `M ${projRight.x} ${projRight.y} C ${projRight.x} ${projRight.y}, ${techLeft.x} ${techLeft.y}, ${techLeft.x} ${techLeft.y}`;
				const techToStatsPath = `M ${techRight.x} ${techRight.y} C ${techRight.x + 40} ${techRight.y}, ${statsLeft.x - 40} ${statsLeft.y}, ${statsLeft.x} ${statsLeft.y}`;

				setConnectorPaths([
					{
						id: "p-t",
						path: projToTechPath,
						color: "stroke-sky-500",
						animated: true,
						thickness: 2.5,
					},
					{
						id: "t-s",
						path: techToStatsPath,
						color: "stroke-purple-600",
						animated: true,
						thickness: 2.5,
					},
				]);
			}
		};

		const debouncedCalculatePaths = () => {
			requestAnimationFrame(calculatePaths);
		};

		debouncedCalculatePaths();
		window.addEventListener("resize", debouncedCalculatePaths);

		// Optional: Observe nodes for attribute changes if their size might change dynamically
		// For simplicity, this is omitted here but can be added if nodes resize due to content changes

		return () => {
			window.removeEventListener("resize", debouncedCalculatePaths);
		};
	}, [isMediumScreen, nodeRefs.projects, nodeRefs.tech, nodeRefs.stats]); // Added all nodeRefs to dependency array

	const nodeCommonClass = "w-full max-w-[280px] md:max-w-none";

	return (
		<section className="relative max-h-screen h-screen overflow-hidden flex flex-col justify-center">
			<Vortex
				backgroundColor="black"
				rangeY={100}
				particleCount={200}
				baseHue={80}
				className="flex flex-col md:justify-center md:items-center overflow-scroll md:overflow-hidden"
			>
				<div className="md:container mx-auto px-4">
					{/* Side by side layout for avatar and text */}
					<div className="flex flex-col md:flex-row items-center justify-center md:gap-16 mt-16 md:mt-0">
						<Avatar />

						<div className="text-center md:text-left md:max-w-xl">
							<h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white font-bold">
								Hi, I'm Théo
							</h1>

							<div className="flex justify-center md:justify-normal text-white gap-3 mt-2 text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold">
								Developer{" "}
								<span className="text-purple-500 underline underline-offset-2">
									fullstack
								</span>
								{" / "}
								<span className="text-amber-500 underline underline-offset-2">
									blockchain
								</span>
								{" / "}
								<span className="text-indigo-400 underline underline-offset-2">
									devops
								</span>
							</div>
							<p className="mt-4 lg:mt-6 text-white/80 text-xs lg:text-sm xl:text-base 2xl:text-lg">
								A performance-driven developer, I leverage{" "}
								<span className="font-semibold">AI tools</span> extensively to
								maximize efficiency and stay ahead of the tech curve.
								Specialized in{" "}
								<span className="text-amber-500 font-semibold">blockchain</span>
								, I also bring strong{" "}
								<span className="text-purple-500 font-semibold">fullstack</span>{" "}
								and{" "}
								<span className="text-indigo-400 font-semibold">DevOps</span>{" "}
								skills, enabling me to build and operate complex, end-to-end
								systems in fast-evolving environments.
							</p>
						</div>
					</div>

					{/* Blockchain Nodes Section */}
					<div
						ref={containerRef}
						className="relative flex justify-center mt-16 md:mt-0"
					>
						{/* Desktop Layout (MD and up) */}
						<div className="hidden md:flex flex-row items-center gap-10 lg:gap-16 py-4 relative">
							<div ref={nodeRefs.projects}>
								<BlockchainNode
									nodeTitle="Blockchain - Projects"
									nodeId="0xP7A2"
									accentColorClass="bg-sky-500"
									icon={<Layers size={14} />}
									portPositions={["right"]}
									className={nodeCommonClass}
								>
									<ProjectCarousel projects={blockchainProjects} />
								</BlockchainNode>
							</div>

							<div ref={nodeRefs.tech}>
								<MainSkills portPositions={["right", "left"]} />
							</div>

							<div ref={nodeRefs.stats}>
								<BlockchainNode
									nodeTitle="Backend & Fullstack"
									nodeId="0xS9F5"
									accentColorClass="bg-amber-500"
									icon={<BarChart2 size={14} />}
									portPositions={["left"]}
									className={nodeCommonClass}
								>
									<ProjectCarousel projects={fullstackProjects} />
								</BlockchainNode>
							</div>
						</div>
						{isMediumScreen && connectorPaths.length > 0 && (
							<BlockchainConnector paths={connectorPaths} />
						)}

						{/* Mobile Layout (Stacked) */}
						<div className="md:hidden flex flex-col w-full items-center gap-12 mb-12">
							<BlockchainNode
								nodeTitle="Featured Projects"
								nodeId="0xP7A2m"
								accentColorClass="bg-sky-500"
								icon={<Layers size={14} />}
								className="w-full sm:min-h-80"
							>
								<ProjectCarousel projects={blockchainProjects} />
							</BlockchainNode>

							<MainSkills />

							<BlockchainNode
								nodeTitle="Quick Stats"
								nodeId="0xS9F5m"
								accentColorClass="bg-amber-500"
								icon={<BarChart2 size={14} />}
								className="w-full sm:min-h-80"
							>
								<ProjectCarousel projects={fullstackProjects} />
							</BlockchainNode>
						</div>
					</div>
				</div>
			</Vortex>
			<RadialGradient size={700} />
		</section>
	);
};
