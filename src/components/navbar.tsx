"use client";

import { GitHubSvg } from "@/lib/icons/github";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const sections = ["portfolio"] as const;
export type Section = (typeof sections)[number];

const NavBarLogo = () => (
	<div className="relative w-5 h-5 flex items-center justify-center">
		<span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 top-0 left-1/2 transform -translate-x-1/2 opacity-80" />
		<span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 left-0 top-1/2 transform -translate-y-1/2 opacity-80" />
		<span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 right-0 top-1/2 transform -translate-y-1/2 opacity-80" />
		<span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 bottom-0 left-1/2 transform -translate-x-1/2 opacity-80" />
	</div>
);

const NavLink = ({
	name,
	activeSection,
	setActiveSection,
	isMobile = false,
}: {
	name: Section;
	activeSection: Section;
	setActiveSection: React.Dispatch<React.SetStateAction<Section>>;
	isMobile?: boolean;
}) => (
	<button
		type="button"
		onClick={() => {
			smoothScrollTo(name);
			setActiveSection(name);
		}}
		className={`relative capitalize px-4 py-2 text-xs border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300
		rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 cursor-pointer
		${isMobile ? "w-full min-w-[200px]" : "sm:px-3 w-full sm:w-auto"}`}
	>
		{name}
		<motion.div
			className="absolute inset-0 rounded-full border border-transparent"
			whileHover={{
				borderColor: "rgba(255, 255, 255, 0.3)",
				scale: 1.05,
				boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
				transition: { duration: 0.2 },
			}}
		/>
		{activeSection === name && (
			<motion.div
				layoutId={isMobile ? "activeSectionMobile" : "activeSection"}
				className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full"
				transition={{ type: "spring", duration: 0.6 }}
			/>
		)}
	</button>
);

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
	const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [activeSection, setActiveSection] = useState<Section>(sections[0]);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		if (shapeTimeoutRef.current) {
			clearTimeout(shapeTimeoutRef.current);
		}

		if (isOpen) {
			setHeaderShapeClass("rounded-xl");
		} else {
			shapeTimeoutRef.current = setTimeout(() => {
				setHeaderShapeClass("rounded-full");
			}, 300);
		}

		return () => {
			if (shapeTimeoutRef.current) {
				clearTimeout(shapeTimeoutRef.current);
			}
		};
	}, [isOpen]);

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (isOpen && !target.closest('header')) {
				closeMenu();
			}
		};

		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<motion.header
			className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center px-6 py-3 backdrop-blur-sm ${headerShapeClass}
                  border border-[#333] bg-[#1f1f1f57] w-[calc(100%-2rem)] sm:w-auto transition-[border-radius] duration-300 ease-in-out`}
		>
			<div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
				<div className="flex items-center">
					<NavBarLogo />
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden sm:flex items-center gap-2 sm:gap-3">
					{sections.map((section) => (
						<NavLink
							key={section}
							name={section}
							activeSection={activeSection}
							setActiveSection={setActiveSection}
						/>
					))}
					<Link
						href="https://github.com/Teyik0"
						className="relative ml-4"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubSvg className="size-8" />
						<motion.div
							className="absolute inset-0 rounded-full"
							whileHover={{
								borderColor: "rgba(255, 255, 255, 0.3)",
								scale: 1.5,
								boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
								transition: { duration: 0.2 },
							}}
						/>
					</Link>
				</nav>

				{/* Mobile Menu Button */}
				<button
					type="button"
					className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white focus:outline-none transition-colors duration-200"
					onClick={toggleMenu}
					aria-label={isOpen ? "Close Menu" : "Open Menu"}
					aria-expanded={isOpen}
				>
					<motion.div
						animate={{ rotate: isOpen ? 180 : 0 }}
						transition={{ duration: 0.2 }}
					>
						{isOpen ? (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						)}
					</motion.div>
				</button>
			</div>

			{/* Mobile Navigation Menu */}
			<motion.div
				className="sm:hidden w-full overflow-hidden"
				initial={false}
				animate={{
					height: isOpen ? "auto" : 0,
					opacity: isOpen ? 1 : 0,
				}}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
				}}
			>
				<div className="flex flex-col items-center space-y-3 pt-4 pb-2">
					{sections.map((section) => (
						<div key={section} onClick={closeMenu}>
							<NavLink
								name={section}
								activeSection={activeSection}
								setActiveSection={setActiveSection}
								isMobile={true}
							/>
						</div>
					))}

					{/* Mobile GitHub Link */}
					<Link
						href="https://github.com/Teyik0"
						className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-full border border-[#333] bg-[rgba(31,31,31,0.62)] min-w-[200px] justify-center"
						target="_blank"
						rel="noopener noreferrer"
						onClick={closeMenu}
					>
						<GitHubSvg className="size-5" />
						<span className="text-xs">GitHub</span>
					</Link>
				</div>
			</motion.div>

			{/* Background Glow */}
			<div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl -z-10 animate-pulse" />
		</motion.header>
	);
}
