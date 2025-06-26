import { Avatar } from '@/components/avatar';

export const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:gap-16">
      <Avatar />
      <div className="mt-8 text-center md:mt-0 md:max-w-xl md:text-left">
        <h1 className="font-bold text-3xl text-white lg:text-4xl xl:text-5xl 2xl:text-6xl">
          Hi, I'm Théo
        </h1>
        <div className="mt-2 flex justify-center gap-3 font-semibold text-sm text-white md:justify-normal lg:text-base xl:text-lg 2xl:text-xl">
          Developer
          <span className="text-amber-500 underline underline-offset-2">
            fullstack
          </span>
          {' / '}
          <span className="text-indigo-400 underline underline-offset-2">
            blockchain
          </span>
          {' / '}
          <span className="text-purple-500 underline underline-offset-2">
            devops
          </span>
        </div>
        <p className="mt-4 text-white/80 text-xs lg:mt-6 lg:text-sm xl:text-base 2xl:text-lg">
          A performance-driven developer, I leverage
          <span className="font-semibold"> AI tools </span>
          extensively to maximize efficiency and stay ahead of the tech curve.
          Specialized in{' '}
          <span className="font-semibold text-indigo-400"> blockchain</span>,
          <span className="font-semibold text-amber-500"> fullstack </span>
          and
          <span className="font-semibold text-purple-500"> DevOps</span>, I can
          build and operate complex end to end systems in fast evolving
          environments.
        </p>
      </div>
    </div>
  );
};
