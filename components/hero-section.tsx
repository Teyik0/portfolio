import Avatar from "@/components/avatar";
import { MainSkills } from "@/components/main-skills";
import RadialGradient from "@/components/ui/radial-gradient";
import { Vortex } from "@/components/ui/vortex";
import { ProjectCarousel } from "./project-carousel";
import { QuickStats } from "./stats";
export const HeroSection = () => {
	return (
		<section className="relative max-h-screen h-screen overflow-hidden flex flex-col justify-center">
			<Vortex
				backgroundColor="black"
				rangeY={100}
				particleCount={200}
				baseHue={80}
				className="flex flex-col justify-center items-center"
			>
				<div className="container mx-auto px-4 mt-16">
					{/* Side by side layout for avatar and text */}
					<div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
						<Avatar />

						<div className="text-center md:text-left max-w-xl">
							<h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white font-bold">
								Hi, I'm Théo
							</h1>

							<div className="flex text-white gap-3 mt-2 text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold">
								<span>Developer fullstack / </span>
								<span className="text-amber-500 underline underline-offset-2">
									blockchain
								</span>
								{" / "}
								<span className="text-blue-400 underline underline-offset-2">
									AI
								</span>
							</div>
							<p className="mt-4 lg:mt-6 text-white/80 text-xs lg:text-sm xl:text-base 2xl:text-lg">
								A performance-oriented developer, I use{" "}
								<span className="text-blue-400">AI tools</span> for maximum
								efficiency and to stay technologically current. I specialize in{" "}
								<span className="text-amber-500">blockchain</span>, actively
								exploring this rapidly innovating field.
							</p>
						</div>
					</div>

					<div className="flex justify-around mt-16 items-center">
						<ProjectCarousel />
						<MainSkills />
						<QuickStats />
					</div>
				</div>
			</Vortex>
			<RadialGradient size={700} />
		</section>
	);
};
