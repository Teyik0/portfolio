import { Navbar } from "@/components/navbar";
import type React from "react";
import "./globals.css";

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
				<Navbar />
				{children}
			</body>
		</html>
	);
}
