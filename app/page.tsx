import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { Projects } from "@/components/projects-section";

export default function Home() {
	return (
		<main>
			<HeroSection />
			<Projects />
			<ContactSection />
		</main>
	);
}
