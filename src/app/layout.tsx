import type React from "react";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import RadialGradient from "@/components/ui/radial-gradient";
import { Vortex } from "@/components/ui/vortex";

export const metadata = {
	title: "Teyik0 - Portfolio 2025",
	description: "Discover my portfolio",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body className="font-mono relative h-screen m-0 p-0 overflow-x-hidden">
				<Vortex
					backgroundColor="black"
					rangeY={100}
					particleCount={200}
					baseHue={80}
					className="flex flex-col min-h-screen w-full md:justify-center md:items-center"
				>
					<div className="flex-shrink-0">
						<Navbar />
					</div>
					{children}
				</Vortex>
				<RadialGradient size={700} />
			</body>
		</html>
	);
}
