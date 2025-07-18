'use client';

import { motion } from 'framer-motion';
import React, { type ReactElement, type SVGProps } from 'react';
import { BunSvg } from '@/lib/icons/bun';
import { NextjsSvg } from '@/lib/icons/nextjs';
import { PrismaSvg } from '@/lib/icons/prisma';
import { TypeScriptSvg } from '@/lib/icons/typescript';
import { PortIndicator } from './blockchain-node';
import { TechStackDialog } from './tech-stack-dialog';

const mainSkills = [
  {
    icon: <BunSvg />,
  },
  {
    icon: <PrismaSvg />,
  },
  {
    icon: <TypeScriptSvg />,
  },
  {
    icon: <NextjsSvg />,
  },
] satisfies { icon: ReactElement<SVGProps<SVGSVGElement>> }[];

export const MainSkills = ({
  portPositions = [],
}: {
  portPositions?: ('top' | 'right' | 'bottom' | 'left')[]; // Sides where connectors can attach
}) => {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative grid h-[240px] w-full grid-cols-2 overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md sm:h-[300px] md:h-[240px] md:w-[240px] lg:h-[270px] lg:w-[270px]"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
        delay: Math.random() * 0.3,
      }}
    >
      {/* Central lines */}
      <div className="-translate-x-1/2 pointer-events-none absolute top-4 bottom-4 left-1/2 w-px bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.20)_40%,rgba(255,255,255,0.20)_60%,transparent)]" />
      <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-px w-[calc(100%-2rem)] bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.20)_40%,rgba(255,255,255,0.20)_60%,transparent)]" />

      {/* Subtle gradient border effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl p-px">
        <div className="-inset-px absolute animate-gradient-x rounded-2xl bg-linear-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5" />
      </div>

      <TechStackDialog>
        <button
          className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-10 flex w-max cursor-pointer items-center justify-center rounded-full border border-white/20 bg-linear-to-r from-neutral-900/90 via-neutral-700/90 to-neutral-900/90 px-3 py-1.5 text-white text-xs shadow-lg backdrop-blur-md transition-all duration-300 hover:from-neutral-800/80 hover:via-neutral-600/70 hover:to-neutral-800/80 hover:shadow-white/5"
          type="button"
        >
          {'>'} Tech Stack
        </button>
      </TechStackDialog>

      {mainSkills.map((skill, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          key={`${skill.icon.type}-${index}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {React.cloneElement(skill.icon, {
            className: 'size-16',
          })}
        </motion.div>
      ))}

      {/* Connection Ports */}
      {portPositions.map((side) => (
        <PortIndicator
          accentColorClass="bg-purple-600 z-50"
          key={side}
          side={side}
        />
      ))}
    </motion.div>
  );
};
