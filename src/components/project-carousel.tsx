"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
	title: string;
	description: string;
	githubUrl?: string;
	liveUrl?: string;
	tags: string[];
	image?: string;
};

const projects: Project[] = [
	{
		title: "DeFi Dashboard",
		description:
			"Blockchain analytics platform with real-time data visualization",
		githubUrl: "https://github.com/yourusername/defi-dashboard",
		liveUrl: "https://defi-dashboard.example.com",
		tags: ["React", "Web3", "Ethers.js"],
		image: "/placeholder.svg?height=120&width=200&query=blockchain%20dashboard",
	},
	{
		title: "AI Code Assistant",
		description: "Developer tool that uses AI to suggest code improvements",
		githubUrl: "https://github.com/yourusername/ai-code-assistant",
		tags: ["Python", "TensorFlow", "NLP"],
		image: "/placeholder.svg?height=120&width=200&query=ai%20code%20assistant",
	},
	{
		title: "NFT Marketplace",
		description: "Platform for creating and trading digital collectibles",
		liveUrl: "https://nft-marketplace.example.com",
		tags: ["Next.js", "Solidity", "IPFS"],
		image: "/placeholder.svg?height=120&width=200&query=nft%20marketplace",
	},
];

export const ProjectCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	// Auto-advance carousel
	useEffect(() => {
		const interval = setInterval(() => {
			if (!isAnimating) {
				setDirection(1);
				setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [isAnimating]);

	const handlePrevious = () => {
		if (isAnimating) return;
		setDirection(-1);
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + projects.length) % projects.length,
		);
	};

	const handleNext = () => {
		if (isAnimating) return;
		setDirection(1);
		setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
	};

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 200 : -200,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? 200 : -200,
			opacity: 0,
		}),
	};

	const currentProject = projects[currentIndex];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.3 }}
		>
			<div className="relative p-5 w-[300px] h-[300px] border border-white/20 bg-white/5 backdrop-blur-md rounded-3xl">
				{/* Header */}
				<div className="text-center mb-4">
					<h3 className="text-sm font-medium text-white/90">Projects</h3>
					<span className="text-[8px] text-white/50 font-mono">
						0x3a8c...2e9d7
					</span>
				</div>

				{/* Carousel */}
				<div className="relative h-[130px] overflow-hidden">
					<AnimatePresence
						initial={false}
						custom={direction}
						mode="wait"
						onExitComplete={() => setIsAnimating(false)}
					>
						<motion.div
							key={currentIndex}
							custom={direction}
							variants={variants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: { type: "spring", stiffness: 300, damping: 30 },
								opacity: { duration: 0.2 },
							}}
							onAnimationStart={() => setIsAnimating(true)}
							onAnimationComplete={() => setIsAnimating(false)}
							className="absolute w-full"
						>
							<div className="p-3 rounded-xl bg-white/5 border border-white/10">
								<div className="flex justify-between items-start">
									<h4 className="text-sm font-semibold text-white/90">
										{currentProject.title}
									</h4>
									<div className="flex gap-2">
										{currentProject.githubUrl && (
											<Link
												href={currentProject.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Github
													size={16}
													className="text-white/60 hover:text-white transition-colors"
												/>
											</Link>
										)}
										{currentProject.liveUrl && (
											<Link
												href={currentProject.liveUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<ExternalLink
													size={16}
													className="text-white/60 hover:text-white transition-colors"
												/>
											</Link>
										)}
									</div>
								</div>
								<p className="text-xs text-white/70 mt-1">
									{currentProject.description}
								</p>
								<div className="flex flex-wrap gap-1 mt-2">
									{currentProject.tags.map((tag) => (
										<span
											key={tag}
											className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/70"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Navigation Arrows */}
				<button
					type="button"
					onClick={handlePrevious}
					className="absolute left-0 translate-x-4 p-1 rounded-full bg-black/30 text-white/70 hover:text-white
					           hover:bg-black/50 transition-all z-50"
					aria-label="Previous project"
				>
					<ChevronLeft size={20} />
				</button>
				<button
					type="button"
					onClick={handleNext}
					className="absolute right-0 -translate-x-4 p-1 rounded-full bg-black/30 text-white/70 hover:text-white
					           hover:bg-black/50 transition-all z-50"
					aria-label="Next project"
				>
					<ChevronRight size={20} />
				</button>

				{/* Carousel Indicators */}
				<div className="flex justify-center gap-1 mt-3">
					{projects.map((project, index) => (
						<button
							type="button"
							key={project.title}
							onClick={() => {
								if (isAnimating) return;
								setDirection(index > currentIndex ? 1 : -1);
								setCurrentIndex(index);
							}}
							className={`w-2 h-2 rounded-full transition-all ${
								index === currentIndex ? "bg-white/80 w-4" : "bg-white/30"
							}`}
							aria-label={`Go to project ${index + 1}`}
						/>
					))}
				</div>

				{/* Contact links at bottom */}
				<div className="mt-4 pt-3 border-t border-white/10 flex justify-center gap-4">
					<Link
						href="https://github.com/yourusername"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 text-white">
							<Github size={18} />
						</div>
					</Link>
					<Link href="mailto:your.email@example.com">
						<div className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 text-white">
							<motion.svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Email Logo</title>
								<rect width="20" height="16" x="2" y="4" rx="2" />
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
							</motion.svg>
						</div>
					</Link>
					<Link
						href="https://linkedin.com/in/yourusername"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 text-white">
							<motion.svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Linkedin Logo</title>
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
								<rect width="4" height="12" x="2" y="9" />
								<circle cx="4" cy="4" r="2" />
							</motion.svg>
						</div>
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
