'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react'; // Added Layers icon
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import type { Project } from '@/lib/projects';

export const ProjectCarousel = ({ projects }: { projects: Project[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  }, [projects.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  }, [projects.length]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const currentProject = projects[currentIndex];

  useEffect(() => {
    const timer = setTimeout(() => handleNext(), 8000);
    return () => clearTimeout(timer);
  }, [handleNext]);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="relative mt-1 flex-grow overflow-hidden">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            animate="center"
            className="absolute flex h-full w-full flex-col items-center justify-center"
            custom={direction}
            exit="exit"
            initial="enter"
            key={currentIndex}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 25,
              duration: 0.3,
            }}
            variants={variants}
          >
            <div className="relative w-full rounded-xl bg-slate-800/50 p-2">
              <h4 className="truncate text-center font-semibold text-slate-100 text-xs">
                {currentProject.title}
              </h4>
              <p className="mt-2 h-8 overflow-hidden text-center text-slate-400 text-xs leading-snug">
                {currentProject.shortDesc}
              </p>
              <div className="mt-1.5 flex flex-wrap justify-center gap-1">
                {currentProject.tags.map((tag) => (
                  <span
                    className="rounded-sm bg-slate-700 px-1 py-0.5 text-[10px] text-slate-300 md:text-[8px] lg:text-[10px]"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="-top-0.25 absolute left-2 z-50 mt-2 flex items-center justify-center gap-1.5">
                {currentProject.githubUrl && (
                  <Link
                    className="text-slate-400 transition-colors hover:text-sky-400"
                    href={currentProject.githubUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Github size={16} />
                  </Link>
                )}
                {currentProject.liveUrl && (
                  <Link
                    className="text-slate-400 transition-colors hover:text-sky-400"
                    href={currentProject.liveUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <ExternalLink size={16} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="z-0 flex items-center justify-between px-1 pt-1">
        <button
          aria-label="Previous project"
          className="rounded-full p-1 text-slate-400 transition-all hover:bg-slate-700/50 hover:text-white"
          onClick={handlePrevious}
          type="button"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1">
          {projects.map((project, index) => (
            <button
              aria-label={`Go to project ${index + 1}`}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'scale-125 bg-sky-500'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              key={project.title}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              type="button"
            />
          ))}
        </div>
        <button
          aria-label="Next project"
          className="rounded-full p-1 text-slate-400 transition-all hover:bg-slate-700/50 hover:text-white"
          onClick={handleNext}
          type="button"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
