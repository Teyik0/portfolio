import { HeroSection } from "./hero-section";
import { SkillsSection } from "./skills-section";

export default function Home() {
	return (
		<main className="flex-1 flex flex-col justify-center px-4 md:px-0">
			<HeroSection />
			<SkillsSection />
		</main>
	);
}
