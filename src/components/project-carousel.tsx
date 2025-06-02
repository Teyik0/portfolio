"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"; // Added Layers icon
import Link from "next/link";
import { useState } from "react";

type Project = {
	title: string;
	shortDesc: string;
	githubUrl?: string;
	liveUrl?: string;
	tags: string[];
};

const projects: Project[] = [
	{
		title: "DeFi Analytics",
		shortDesc: "Real-time blockchain data viz.",
		githubUrl: "#",
		liveUrl: "#",
		tags: ["React", "Web3"],
	},
	{
		title: "AI Code Assist",
		shortDesc: "AI-powered code suggestions.",
		githubUrl: "#",
		tags: ["Python", "AI"],
	},
	{
		title: "NFT Platform",
		shortDesc: "Digital collectible marketplace.",
		liveUrl: "#",
		tags: ["Next.js", "Solidity"],
	},
];

export const ProjectCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);

	const handlePrevious = () => {
		setDirection(-1);
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + projects.length) % projects.length,
		);
	};

	const handleNext = () => {
		setDirection(1);
		setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
	};

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 100 : -100,
			opacity: 0,
			scale: 0.95,
		}),
		center: {
			x: 0,
			opacity: 1,
			scale: 1,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? 100 : -100,
			opacity: 0,
			scale: 0.95,
		}),
	};

	const currentProject = projects[currentIndex];

	// Auto-advance (optional, can be distracting in a busy UI)
	// useEffect(() => {
	//   const timer = setTimeout(() => handleNext(), 5000);
	//   return () => clearTimeout(timer);
	// }, [currentIndex]);

	return (
		<div className="h-full flex flex-col justify-between">
			<div className="relative flex-grow overflow-hidden mt-1">
				<AnimatePresence initial={false} custom={direction} mode="wait">
					<motion.div
						key={currentIndex}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							type: "spring",
							stiffness: 200,
							damping: 25,
							duration: 0.3,
						}}
						className="absolute w-full h-full flex flex-col items-center justify-center"
					>
						<div className="p-2 w-full">
							<h4 className="text-xs font-semibold text-slate-100 truncate text-center">
								{currentProject.title}
							</h4>
							<p className="text-[10px] text-slate-400 mt-0.5 leading-snug text-center h-6 overflow-hidden">
								{currentProject.shortDesc}
							</p>
							<div className="flex flex-wrap gap-1 mt-1.5 justify-center">
								{currentProject.tags.map((tag) => (
									<span
										key={tag}
										className="text-[8px] px-1 py-0.5 rounded-sm bg-slate-700 text-slate-300"
									>
										{tag}
									</span>
								))}
							</div>
							<div className="flex justify-center gap-3 mt-2">
								{currentProject.githubUrl && (
									<Link
										href={currentProject.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-slate-400 hover:text-sky-400 transition-colors"
									>
										<Github size={12} />
									</Link>
								)}
								{currentProject.liveUrl && (
									<Link
										href={currentProject.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-slate-400 hover:text-sky-400 transition-colors"
									>
										<ExternalLink size={12} />
									</Link>
								)}
							</div>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Navigation */}
			<div className="flex items-center justify-between px-1 pt-1">
				<button
					type="button"
					onClick={handlePrevious}
					className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
					aria-label="Previous project"
				>
					<ChevronLeft size={16} />
				</button>
				<div className="flex gap-1">
					{projects.map((project, index) => (
						<button
							type="button"
							key={project.title}
							onClick={() => {
								setDirection(index > currentIndex ? 1 : -1);
								setCurrentIndex(index);
							}}
							className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
								index === currentIndex
									? "bg-sky-500 scale-125"
									: "bg-slate-600 hover:bg-slate-500"
							}`}
							aria-label={`Go to project ${index + 1}`}
						/>
					))}
				</div>
				<button
					type="button"
					onClick={handleNext}
					className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
					aria-label="Next project"
				>
					<ChevronRight size={16} />
				</button>
			</div>
		</div>
	);
};
