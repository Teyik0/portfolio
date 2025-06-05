import { HeroSection } from "./hero-section";
import { SkillsSection } from "./skills-section";

export default function Home() {
	return (
		<main className="flex flex-col w-full justify-center min-h-screen pt-24 px-4 md:px-0 md:pt-0">
			<div className="flex-1 flex flex-col justify-center">
				<HeroSection />
				<SkillsSection />
			</div>
		</main>
	);
}
