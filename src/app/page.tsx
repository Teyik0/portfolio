import { HeroSection } from './hero-section';
import { SkillsSection } from './skills-section';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col justify-center px-4 pt-24 md:px-0 md:pt-0">
      <div className="flex flex-1 flex-col justify-center">
        <HeroSection />
        <SkillsSection />
      </div>
    </main>
  );
}
