import { Avatar } from "@/components/avatar";
import type React from "react";

export const HeroSection = () => {
	return (
		<div className="flex flex-col md:flex-row items-center justify-center md:gap-16">
			<Avatar />
			<div className="text-center md:text-left md:max-w-xl mt-8 md:mt-0">
				<h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white font-bold">
					Hi, I'm Théo
				</h1>
				<div className="flex justify-center md:justify-normal text-white gap-3 mt-2 text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold">
					Developer
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
					A performance-driven developer, I leverage
					<span className="font-semibold"> AI tools </span>
					extensively to maximize efficiency and stay ahead of the tech curve.
					Specialized in{" "}
					<span className="text-amber-500 font-semibold"> blockchain</span>,
					<span className="text-purple-500 font-semibold"> fullstack </span>
					and
					<span className="text-indigo-400 font-semibold"> DevOps</span>, I can
					build and operate complex, end to end systems in fast evolving
					environments.
				</p>
			</div>
		</div>
	);
};
