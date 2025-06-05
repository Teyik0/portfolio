import { HeroSection } from "./hero-section";
import { SkillsSection } from "./skills-section";

export default function Home() {
	return (
		<main className="md:container mx-auto px-4">
			<HeroSection />
			<SkillsSection />
		</main>
	);
}
