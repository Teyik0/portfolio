'use client';

import { BarChart2, Layers } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BlockchainConnector } from '@/components/blockchain-connector';
import { BlockchainNode } from '@/components/blockchain-node';
import { MainSkills } from '@/components/main-skills';
import { ProjectCarousel } from '@/components/project-carousel';
import { useMediaQuery } from '@/hooks/use-media-query';
import { blockchainProjects, fullstackProjects } from '@/lib/projects';

export const SkillsSection = () => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)');
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = {
    projects: useRef<HTMLDivElement>(null),
    tech: useRef<HTMLDivElement>(null),
    stats: useRef<HTMLDivElement>(null),
  };
  const [connectorPaths, setConnectorPaths] = useState<any[]>([]);

  useEffect(() => {
    if (!(isMediumScreen && containerRef.current)) {
      setConnectorPaths([]);
      return;
    }

    const getPortPosition = (
      nodeRef: React.RefObject<HTMLDivElement>,
      side: 'top' | 'right' | 'bottom' | 'left'
    ) => {
      if (!(nodeRef.current && containerRef.current)) {
        return { x: 0, y: 0 };
      }
      const nodeRect = nodeRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      // Port visual size is 6px, offset by 3px from edge
      const portOffset = 3; // This is the visual offset of the port indicator from the node's edge

      // Calculate center of the node relative to the container
      const nodeCenterX =
        nodeRect.left - containerRect.left + nodeRect.width / 2;
      const nodeCenterY =
        nodeRect.top - containerRect.top + nodeRect.height / 2;

      // Calculate edge positions relative to the container
      const nodeTop = nodeRect.top - containerRect.top;
      const nodeRight = nodeRect.right - containerRect.left;
      const nodeBottom = nodeRect.bottom - containerRect.top;
      const nodeLeft = nodeRect.left - containerRect.left;

      switch (side) {
        case 'top':
          return {
            x: nodeCenterX,
            y: nodeTop - portOffset,
          };
        case 'right':
          return {
            x: nodeRight + portOffset,
            y: nodeCenterY,
          };
        case 'bottom':
          return {
            x: nodeCenterX,
            y: nodeBottom + portOffset,
          };
        case 'left':
          return {
            x: nodeLeft - portOffset,
            y: nodeCenterY,
          };
        default:
          return { x: 0, y: 0 };
      }
    };

    const calculatePaths = () => {
      const p = nodeRefs.projects.current;
      const t = nodeRefs.tech.current;
      const s = nodeRefs.stats.current;

      if (p && t && s && containerRef.current) {
        const projRight = getPortPosition(nodeRefs.projects!, 'right');
        const techLeft = getPortPosition(nodeRefs.tech!, 'left');
        const techRight = getPortPosition(nodeRefs.tech!, 'right');
        const statsLeft = getPortPosition(nodeRefs.stats!, 'left');

        // A slightly curved path example
        const projToTechPath = `M ${projRight.x} ${projRight.y} C ${projRight.x} ${projRight.y}, ${techLeft.x} ${techLeft.y}, ${techLeft.x} ${techLeft.y}`;
        const techToStatsPath = `M ${techRight.x} ${techRight.y} C ${techRight.x + 40} ${techRight.y}, ${statsLeft.x - 40} ${statsLeft.y}, ${statsLeft.x} ${statsLeft.y}`;

        setConnectorPaths([
          {
            id: 'p-t',
            path: projToTechPath,
            color: 'stroke-sky-500',
            animated: true,
            thickness: 2.5,
          },
          {
            id: 't-s',
            path: techToStatsPath,
            color: 'stroke-purple-600',
            animated: true,
            thickness: 2.5,
          },
        ]);
      }
    };

    const debouncedCalculatePaths = () => {
      requestAnimationFrame(calculatePaths);
    };

    debouncedCalculatePaths();
    window.addEventListener('resize', debouncedCalculatePaths);

    // Optional: Observe nodes for attribute changes if their size might change dynamically
    // For simplicity, this is omitted here but can be added if nodes resize due to content changes

    return () => {
      window.removeEventListener('resize', debouncedCalculatePaths);
    };
  }, [isMediumScreen, nodeRefs.projects, nodeRefs.tech, nodeRefs.stats]); // Added all nodeRefs to dependency array

  const nodeCommonClass = 'w-full max-w-[280px] md:max-w-none';

  return (
    <div
      className="relative mt-16 flex justify-center md:mt-0"
      ref={containerRef}
    >
      {/* Desktop Layout (MD and up) */}
      <div className="relative hidden flex-row items-center gap-10 py-4 md:flex lg:gap-16">
        <div ref={nodeRefs.projects}>
          <BlockchainNode
            accentColorClass="bg-sky-500"
            className={nodeCommonClass}
            icon={<Layers size={14} />}
            nodeId="0xP7A2"
            nodeTitle="Blockchain - Projects"
            portPositions={['right']}
          >
            <ProjectCarousel projects={blockchainProjects} />
          </BlockchainNode>
        </div>

        <div ref={nodeRefs.tech}>
          <MainSkills portPositions={['right', 'left']} />
        </div>

        <div ref={nodeRefs.stats}>
          <BlockchainNode
            accentColorClass="bg-amber-500"
            className={nodeCommonClass}
            icon={<BarChart2 size={14} />}
            nodeId="0xS9F5"
            nodeTitle="Backend / Fullstack"
            portPositions={['left']}
          >
            <ProjectCarousel projects={fullstackProjects} />
          </BlockchainNode>
        </div>
      </div>
      {isMediumScreen && connectorPaths.length > 0 && (
        <BlockchainConnector paths={connectorPaths} />
      )}

      {/* Mobile Layout (Stacked) */}
      <div className="mb-12 flex w-full flex-col items-center gap-12 md:hidden">
        <BlockchainNode
          accentColorClass="bg-sky-500"
          className="w-full sm:min-h-80"
          icon={<Layers size={14} />}
          nodeId="0xP7A2m"
          nodeTitle="Blockchain - Projects"
        >
          <ProjectCarousel projects={blockchainProjects} />
        </BlockchainNode>

        <MainSkills />

        <BlockchainNode
          accentColorClass="bg-amber-500"
          className="w-full sm:min-h-80"
          icon={<BarChart2 size={14} />}
          nodeId="0xS9F5m"
          nodeTitle="Backend / Fullstack"
        >
          <ProjectCarousel projects={fullstackProjects} />
        </BlockchainNode>
      </div>
    </div>
  );
};
