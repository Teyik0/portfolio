'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type TechItem, techStackData } from '@/lib/tech-stack';

const categoryColors = {
  TypeScript: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  Python: 'from-yellow-500/20 to-blue-500/20 border-yellow-500/30',
  Blockchain: 'from-orange-500/20 to-purple-500/20 border-orange-500/30',
  Infrastructure: 'from-green-500/20 to-blue-500/20 border-green-500/30',
  DevOps: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  Others: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
};

const TechIcon = ({ tech, index }: { tech: TechItem; index: number }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.button
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex cursor-pointer flex-col items-center space-y-2 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
      initial={{ opacity: 0, y: 20 }}
      onClick={() =>
        tech.url && window.open(tech.url, '_blank', 'noopener,noreferrer')
      }
      transition={{ delay: index * 0.05, duration: 0.3 }}
      type="button"
    >
      {imageError ? (
        <div className="flex size-8 items-center justify-center rounded bg-white/20 font-bold text-white text-xs">
          {tech.name.charAt(0)}
        </div>
      ) : (
        <div>
          {typeof tech.icon === 'string' ? (
            <div className="size-8 transition-transform duration-300 group-hover:scale-110">
              <Image
                alt={`${tech.name} logo`}
                className="size-8"
                height={32}
                onError={() => setImageError(true)}
                src={tech.icon}
                width={32}
              />
            </div>
          ) : (
            tech.icon
          )}
        </div>
      )}
      <span className="text-center font-medium text-white/90 text-xs group-hover:text-white">
        {tech.name}
      </span>
      <span className="text-center text-[10px] text-white/60">
        {tech.category}
      </span>
    </motion.button>
  );
};

interface CategorySectionProps {
  title: string;
  technologies: TechItem[];
  isOpen: boolean;
  onToggle: () => void;
}

const CategorySection = ({
  title,
  technologies,
  isOpen,
  onToggle,
}: CategorySectionProps) => {
  return (
    <div className="space-y-3">
      <button
        className={`flex w-full cursor-pointer items-center justify-between rounded-lg border bg-gradient-to-r p-3 text-left transition-all duration-300 hover:shadow-md ${categoryColors[title as keyof typeof categoryColors]}`}
        onClick={onToggle}
        type="button"
      >
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-white">{title}</h3>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-white/80 text-xs">
            {technologies.length}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-white/70"
          transition={{ duration: 0.2 }}
        >
          <svg
            className="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>{isOpen ? 'Collapse section' : 'Expand section'}</title>
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </motion.div>
      </button>

      <motion.div
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className="overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3 md:grid-cols-4">
          {technologies.map((tech, index) => (
            <TechIcon index={index} key={tech.name} tech={tech} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const TechStackDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    TypeScript: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => {
      // If the clicked section is already open, close it
      if (prev[section]) {
        return { ...prev, [section]: false };
      }

      // Close all sections and open only the clicked one
      const newState: Record<string, boolean> = {};
      for (const key of Object.keys(techStackData)) {
        newState[key] = key === section;
      }

      return newState;
    });
  };

  const totalTechnologies = Object.values(techStackData).reduce(
    (sum, technologies) => sum + technologies.length,
    0
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-full max-w-4xl border-white/20 bg-black/90 text-white backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <span>Tech Stack</span>
            <span className="rounded-full bg-white/10 px-2 py-1 font-normal text-sm text-white/80">
              {totalTechnologies} technologies
            </span>
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Technologies and tools I work with, organized by category. Click on
            any category to expand or collapse.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
          {Object.entries(techStackData).map(([category, technologies]) => (
            <CategorySection
              isOpen={openSections[category]}
              key={category}
              onToggle={() => toggleSection(category)}
              technologies={technologies}
              title={category}
            />
          ))}
        </div>

        <div className="flex items-center justify-between border-white/10 border-t pt-4 text-white/60 text-xs">
          <span>Icons provided by SVGL</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
