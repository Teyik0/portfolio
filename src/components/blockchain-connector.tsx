'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ConnectionPath {
  id: string;
  path: string; // SVG path d attribute: "M x1 y1 L x2 y2" or "M x1 y1 Q cx cy x2 y2" etc.
  color?: string; // e.g., "stroke-sky-500"
  thickness?: number;
  animated?: boolean;
  animationSpeed?: number; // Slower is larger number
}

interface BlockchainConnectorProps {
  paths: ConnectionPath[];
  className?: string;
}

export const BlockchainConnector = ({
  paths,
  className,
}: BlockchainConnectorProps) => {
  return (
    <svg
      className={cn(
        'pointer-events-none absolute inset-0 z-50 h-full w-full',
        className
      )}
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg" // Ensure markers are visible
    >
      <title>Connector</title>
      {paths.map((conn) => (
        <g key={conn.id}>
          <motion.path
            animate={{ pathLength: 1, opacity: 0.7 }}
            className={cn(conn.color || 'stroke-slate-600', 'fill-none')}
            d={conn.path}
            initial={{ pathLength: 0, opacity: 0 }}
            strokeWidth={conn.thickness || 1.5}
            transition={{
              duration: 0.8,
              delay: 0.5 + Math.random() * 0.4,
              ease: 'circOut',
            }}
          />
          {conn.animated && (
            <motion.path
              animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
              className={cn(conn.color || 'stroke-slate-400', 'fill-none')}
              d={conn.path} // Slightly thicker for pulse
              initial={{ pathLength: 0, opacity: 0 }}
              strokeWidth={(conn.thickness || 1.5) + 1}
              style={{ filter: 'blur(1px)' }}
              transition={{
                duration: (conn.animationSpeed || 2) * 0.6, // Faster pulse
                delay: 0.8 + Math.random() * 0.4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
                ease: 'easeInOut',
                times: [0, 0.5, 1], // Control opacity keyframes for pulse
              }}
            />
          )}
        </g>
      ))}
    </svg>
  );
};
