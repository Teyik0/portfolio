'use client';

import { motion } from 'framer-motion';
import type React from 'react';
import { cn } from '@/lib/utils';

interface BlockchainNodeProps {
  children: React.ReactNode;
  className?: string;
  nodeTitle: string;
  nodeId: string; // Short visual hash or identifier
  accentColorClass?: string; // e.g., "bg-blue-500" for a glow or main color
  icon?: React.ReactNode; // Optional icon for the node type
  portPositions?: ('top' | 'right' | 'bottom' | 'left')[]; // Sides where connectors can attach
}

export const PortIndicator: React.FC<{
  side: string;
  accentColorClass?: string;
}> = ({ side, accentColorClass }) => {
  let positionClasses = '';
  switch (side) {
    case 'top':
      positionClasses = 'top-[-3px] left-1/2 -translate-x-1/2 h-[6px] w-3';
      break;
    case 'right':
      positionClasses = 'right-[-3px] top-1/2 -translate-y-1/2 w-[6px] h-3';
      break;
    case 'bottom':
      positionClasses = 'bottom-[-3px] left-1/2 -translate-x-1/2 h-[6px] w-3';
      break;
    case 'left':
      positionClasses = 'left-[-3px] top-1/2 -translate-y-1/2 w-[6px] h-3';
      break;
    default:
      break;
  }
  return (
    <div
      className={cn(
        'absolute rounded-sm opacity-70 transition-opacity group-hover:opacity-100',
        accentColorClass || 'bg-slate-500',
        positionClasses
      )}
    />
  );
};

export const BlockchainNode = ({
  children,
  className,
  nodeTitle,
  nodeId,
  accentColorClass = 'bg-sky-500',
  icon,
  portPositions = [],
}: BlockchainNodeProps) => {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={cn(
        'group before:-skew-x-[0deg] after:-skew-x-[0deg] relative flex h-[240px] w-[270px] flex-col overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900/60 shadow-2xl backdrop-blur-md transition-colors duration-300 before:absolute before:top-0 before:left-0 before:h-3 before:w-3 before:transform before:border-slate-700/0 before:border-t before:border-l before:bg-slate-900/0 before:transition-all after:absolute after:right-0 after:bottom-0 after:h-3 after:w-3 after:transform after:border-slate-700/0 after:border-r after:border-b after:bg-slate-900/0 after:transition-all hover:border-slate-500/80 group-hover:after:border-slate-500/80 group-hover:before:border-slate-500/80 md:h-[200px] md:w-[220px] lg:h-[240px] lg:w-[270px]',
        className
      )}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
        delay: Math.random() * 0.3,
      }}
    >
      <div
        className={cn(
          'relative flex flex-shrink-0 items-center justify-between overflow-hidden border-slate-700/50 border-b p-2.5'
        )}
      >
        {/* Header with Title, Icon, and Glow */}
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-slate-400 transition-colors group-hover:text-white">
              {icon}
            </span>
          )}
          <h3 className="font-semibold text-slate-300 text-xs transition-colors group-hover:text-white">
            {nodeTitle}
          </h3>
        </div>
        <span className="font-mono text-[9px] text-slate-500 transition-colors group-hover:text-slate-400">
          {nodeId}
        </span>
        {/* Accent Glow */}
        <div
          className={cn(
            'absolute top-0 left-0 h-full w-1.5 opacity-60 transition-opacity duration-300 group-hover:opacity-80',
            accentColorClass
          )}
          style={{ filter: 'blur(2px) brightness(1.2)' }}
        />
        {/* Subtle gradient border effect */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl p-px">
          <div className="-inset-px absolute animate-gradient-x rounded-2xl bg-linear-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5" />
        </div>
      </div>

      {/* Content Area */}
      <div className="scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50 flex-grow overflow-y-auto p-2.5">
        {children}
      </div>

      {/* Connection Ports */}
      {portPositions.map((side) => (
        <PortIndicator
          accentColorClass={accentColorClass}
          key={side}
          side={side}
        />
      ))}
    </motion.div>
  );
};
