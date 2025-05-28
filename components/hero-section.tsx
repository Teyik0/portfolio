import Avatar from "@/components/avatar"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { Vortex } from "@/components/ui/vortex"
import RadialGradient from "@/components/ui/radial-gradient"
import { MainSkills } from "@/components/main-skills"

export const HeroSection = () => {
  return (
    <section className="relative max-h-screen h-screen overflow-hidden flex flex-col justify-center" id="home">
      <Vortex
        backgroundColor="black"
        rangeY={100}
        particleCount={200}
        baseHue={80}
        className="flex flex-col justify-center items-center"
      >
        <div className="container mx-auto px-4">
          {/* Side by side layout for avatar and text */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <Avatar />

            <div className="text-center md:text-left max-w-xl font-mono">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white">
                Hi, I'm{" "}
                <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                  Théo
                </span>
              </h1>
              <TypingAnimation
                duration={30}
                className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white mt-2 font-mono border-r-2 border-blue-500"
              >
                Developer <span className="text-green-500">fullstack</span> / <span className="text-blue-400">AI</span>{" "}
                / <span className="text-amber-500">blockchain</span>
              </TypingAnimation>
              <p className="mt-4 lg:mt-6 text-white/80 text-sm lg:text-base xl:text-lg 2xl:text-xl">
                &quot;Leveraging <span className="text-blue-400">cutting-edge AI tools</span> to build innovative
                solutions while exploring the limitless potential of{" "}
                <span className="text-amber-500">blockchain technology</span>. The intersection of AI and decentralized
                systems is where the <span className="text-green-500">future of technology</span> truly begins.&quot;
              </p>
            </div>
          </div>

          {/* Main Skills Section */}
          <MainSkills />
        </div>
      </Vortex>
      <RadialGradient size={700} />
    </section>
  )
}
