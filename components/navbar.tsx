"use client";

import { smoothScrollTo } from "@/lib/smooth-scroll";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const sections = ["home", "projects", "contact"] as const;
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
}: {
	name: Section;
	activeSection: Section;
	setActiveSection: React.Dispatch<React.SetStateAction<Section>>;
}) => (
	<button
		type="button"
		onClick={() => {
			smoothScrollTo(name);
			setActiveSection(name);
		}}
		className="relative capitalize px-4 py-2 sm:px-3 text-xs border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300
		rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 w-full sm:w-auto"
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
				layoutId="activeSection"
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

	return (
		<motion.header
			className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center pl-6 pr-6 py-3 backdrop-blur-sm ${headerShapeClass}
                  border border-[#333] bg-[#1f1f1f57] w-[calc(100%-2rem)] sm:w-auto transition-[border-radius] duration-0 ease-in-out`}
		>
			<div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
				<div className="flex items-center">
					<NavBarLogo />
				</div>

				<nav className="hidden sm:flex items-center gap-2 sm:gap-3">
					{sections.map((section) => (
						<NavLink
							key={section}
							name={section}
							activeSection={activeSection}
							setActiveSection={setActiveSection}
						/>
					))}
				</nav>

				<button
					type="button"
					className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
					onClick={toggleMenu}
					aria-label={isOpen ? "Close Menu" : "Open Menu"}
				>
					{isOpen ? (
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Mobile Nav Open</title>
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
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Mobile Nav Close</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
				</button>
			</div>

			<div
				className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                    ${isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
			>
				<div className="flex flex-col items-center space-y-4 mt-4 w-full">
					{sections.map((section) => (
						<NavLink
							key={section}
							name={section}
							activeSection={activeSection}
							setActiveSection={setActiveSection}
						/>
					))}
				</div>
			</div>

			<div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl -z-10 animate-pulse" />
		</motion.header>
	);
}
