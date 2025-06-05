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
			<body id="home" className="font-mono">
				<Vortex
					backgroundColor="black"
					rangeY={100}
					particleCount={200}
					baseHue={80}
					className="relative h-screen flex flex-col md:justify-center md:items-center overflow-scroll md:overflow-hidden"
				>
					<Navbar />
					{children}
					<RadialGradient size={700} />
				</Vortex>
			</body>
		</html>
	);
}
