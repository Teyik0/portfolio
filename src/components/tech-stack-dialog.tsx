'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface TechItem {
  name: string;
  icon: string;
  darkIcon?: string;
  category: string;
  url?: string;
}

const techStackData: Record<string, TechItem[]> = {
  TypeScript: [
    {
      name: 'TypeScript',
      icon: 'https://svgl.app/library/typescript.svg',
      category: 'Language',
      url: 'https://www.typescriptlang.org/',
    },
    {
      name: 'React',
      icon: 'https://svgl.app/library/react_light.svg',
      darkIcon: 'https://svgl.app/library/react_dark.svg',
      category: 'Library',
      url: 'https://react.dev/',
    },
    {
      name: 'Next.js',
      icon: 'https://svgl.app/library/nextjs.svg',
      darkIcon: 'https://svgl.app/library/nextjs_dark.svg',
      category: 'Framework',
      url: 'https://nextjs.org/',
    },
    {
      name: 'Qwik',
      icon: 'https://svgl.app/library/qwik.svg',
      category: 'Framework',
      url: 'https://qwik.builder.io/',
    },
    {
      name: 'Node.js',
      icon: 'https://svgl.app/library/nodejs.svg',
      category: 'Runtime',
      url: 'https://nodejs.org/',
    },
    {
      name: 'Bun',
      icon: 'https://svgl.app/library/bun.svg',
      category: 'Runtime',
      url: 'https://bun.sh/',
    },
    {
      name: 'Prisma',
      icon: 'https://svgl.app/library/prisma.svg',
      darkIcon: 'https://svgl.app/library/prisma_dark.svg',
      category: 'ORM',
      url: 'https://www.prisma.io/',
    },
    {
      name: 'Tailwind CSS',
      icon: 'https://svgl.app/library/tailwindcss.svg',
      category: 'Framework',
      url: 'https://tailwindcss.com/',
    },
  ],
  Python: [
    {
      name: 'Python',
      icon: 'https://svgl.app/library/python.svg',
      category: 'Language',
      url: 'https://www.python.org/',
    },
    {
      name: 'Pydantic',
      icon: 'https://svgl.app/library/pydantic.svg',
      category: 'Library',
      url: 'https://docs.pydantic.dev/',
    },
    {
      name: 'UV',
      icon: 'https://svgl.app/library/uv.svg',
      category: 'Tool',
      url: 'https://docs.astral.sh/uv/',
    },
    {
      name: 'Ruff',
      icon: 'https://svgl.app/library/ruff.svg',
      category: 'Linter',
      url: 'https://docs.astral.sh/ruff/',
    },
    {
      name: 'Pytest',
      icon: 'https://svgl.app/library/pytest.svg',
      category: 'Testing',
      url: 'https://pytest.org/',
    },
    {
      name: 'Pandas',
      icon: 'https://svgl.app/library/pandas.svg',
      category: 'Library',
      url: 'https://pandas.pydata.org/',
    },
    {
      name: 'NumPy',
      icon: 'https://svgl.app/library/numpy.svg',
      category: 'Library',
      url: 'https://numpy.org/',
    },
  ],
  Blockchain: [
    {
      name: 'Viem',
      icon: 'https://svgl.app/library/viem.svg',
      category: 'Library',
      url: 'https://viem.sh/',
    },
    {
      name: 'Solidity',
      icon: 'https://svgl.app/library/solidity.svg',
      category: 'Language',
      url: 'https://soliditylang.org/',
    },
    {
      name: 'Hardhat',
      icon: 'https://svgl.app/library/hardhat.svg',
      category: 'Framework',
      url: 'https://hardhat.org/',
    },
    {
      name: 'Foundry',
      icon: 'https://svgl.app/library/foundry.svg',
      category: 'Framework',
      url: 'https://getfoundry.sh/',
    },
    {
      name: 'Wagmi',
      icon: 'https://svgl.app/library/wagmi.svg',
      category: 'Library',
      url: 'https://wagmi.sh/',
    },
    {
      name: 'MetaMask',
      icon: 'https://svgl.app/library/metamask.svg',
      category: 'Wallet',
      url: 'https://metamask.io/',
    },
    {
      name: 'Anchor Framework',
      icon: 'https://svgl.app/library/anchor.svg',
      category: 'Framework',
      url: 'https://www.anchor-lang.com/',
    },
  ],
  Infrastructure: [
    {
      name: 'Vercel',
      icon: 'https://svgl.app/library/vercel.svg',
      darkIcon: 'https://svgl.app/library/vercel_dark.svg',
      category: 'Hosting',
      url: 'https://vercel.com/',
    },
    {
      name: 'Netlify',
      icon: 'https://svgl.app/library/netlify.svg',
      category: 'Hosting',
      url: 'https://www.netlify.com/',
    },
    {
      name: 'Railway',
      icon: 'https://svgl.app/library/railway.svg',
      darkIcon: 'https://svgl.app/library/railway_dark.svg',
      category: 'Hosting',
      url: 'https://railway.app/',
    },
    {
      name: 'Supabase',
      icon: 'https://svgl.app/library/supabase.svg',
      category: 'Backend',
      url: 'https://supabase.com/',
    },
    {
      name: 'AWS',
      icon: 'https://svgl.app/library/aws.svg',
      darkIcon: 'https://svgl.app/library/aws_dark.svg',
      category: 'Cloud',
      url: 'https://aws.amazon.com/',
    },
  ],
  DevOps: [
    {
      name: 'Docker',
      icon: 'https://svgl.app/library/docker.svg',
      category: 'Container',
      url: 'https://www.docker.com/',
    },
    {
      name: 'Kubernetes',
      icon: 'https://svgl.app/library/kubernetes.svg',
      category: 'Orchestration',
      url: 'https://kubernetes.io/',
    },
    {
      name: 'GitHub Actions',
      icon: 'https://svgl.app/library/github-actions.svg',
      category: 'CI/CD',
      url: 'https://github.com/features/actions',
    },
    {
      name: 'Git',
      icon: 'https://svgl.app/library/git.svg',
      category: 'Version Control',
      url: 'https://git-scm.com/',
    },
    {
      name: 'GitHub',
      icon: 'https://svgl.app/library/github.svg',
      darkIcon: 'https://svgl.app/library/github_dark.svg',
      category: 'Platform',
      url: 'https://github.com/',
    },
    {
      name: 'GitLab',
      icon: 'https://svgl.app/library/gitlab.svg',
      category: 'Platform',
      url: 'https://gitlab.com/',
    },
    {
      name: 'Terraform',
      icon: 'https://svgl.app/library/terraform.svg',
      category: 'IaC',
      url: 'https://www.terraform.io/',
    },
    {
      name: 'Jenkins',
      icon: 'https://svgl.app/library/jenkins.svg',
      category: 'CI/CD',
      url: 'https://www.jenkins.io/',
    },
  ],
  Others: [
    {
      name: 'Go',
      icon: 'https://svgl.app/library/go.svg',
      category: 'Language',
      url: 'https://golang.org/',
    },
    {
      name: 'C',
      icon: 'https://svgl.app/library/c.svg',
      category: 'Language',
      url: 'https://en.wikipedia.org/wiki/C_(programming_language)',
    },
    {
      name: 'C++',
      icon: 'https://svgl.app/library/cpp.svg',
      category: 'Language',
      url: 'https://isocpp.org/',
    },
    {
      name: 'Java',
      icon: 'https://svgl.app/library/java.svg',
      category: 'Language',
      url: 'https://www.java.com/',
    },
    {
      name: 'Groovy',
      icon: 'https://svgl.app/library/groovy.svg',
      category: 'Language',
      url: 'https://groovy-lang.org/',
    },
  ],
};

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
  const [isDark, setIsDark] = useState(false);

  // Check if user prefers dark mode
  React.useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDark(darkMode);
    };

    checkDarkMode();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);

    return () => mediaQuery.removeEventListener('change', checkDarkMode);
  }, []);

  const iconSrc = isDark && tech.darkIcon ? tech.darkIcon : tech.icon;

  return (
    <motion.button
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col items-center space-y-2 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
      initial={{ opacity: 0, y: 20 }}
      onClick={() =>
        tech.url && window.open(tech.url, '_blank', 'noopener,noreferrer')
      }
      transition={{ delay: index * 0.05, duration: 0.3 }}
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {imageError ? (
        <div className="flex size-8 items-center justify-center rounded bg-white/20 font-bold text-white text-xs">
          {tech.name.charAt(0)}
        </div>
      ) : (
        <div className="size-8 transition-transform duration-300 group-hover:scale-110">
          <Image
            alt={`${tech.name} logo`}
            className="size-8"
            height={32}
            onError={() => setImageError(true)}
            src={iconSrc}
            width={32}
          />
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

const CategorySection = ({
  title,
  technologies,
  isOpen,
  onToggle,
}: {
  title: string;
  technologies: TechItem[];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="space-y-3">
      <button
        className={`flex w-full items-center justify-between rounded-lg border bg-gradient-to-r p-3 text-left transition-all duration-300 hover:shadow-md ${categoryColors[title as keyof typeof categoryColors]}`}
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
    TypeScript: true, // Start with TypeScript open
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
