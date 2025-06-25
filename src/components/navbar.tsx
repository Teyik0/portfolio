'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { GitHubSvg } from '@/lib/icons/github';
import { smoothScrollTo } from '@/lib/smooth-scroll';

export const sections = ['portfolio'] as const;
export type Section = (typeof sections)[number];

const NavBarLogo = () => (
  <div className="relative flex h-5 w-5 items-center justify-center">
    <span className="-translate-x-1/2 absolute top-0 left-1/2 h-1.5 w-1.5 transform rounded-full bg-gray-200 opacity-80" />
    <span className="-translate-y-1/2 absolute top-1/2 left-0 h-1.5 w-1.5 transform rounded-full bg-gray-200 opacity-80" />
    <span className="-translate-y-1/2 absolute top-1/2 right-0 h-1.5 w-1.5 transform rounded-full bg-gray-200 opacity-80" />
    <span className="-translate-x-1/2 absolute bottom-0 left-1/2 h-1.5 w-1.5 transform rounded-full bg-gray-200 opacity-80" />
  </div>
);

const NavLink = ({
  name,
  activeSection,
  setActiveSection,
}: {
  name: Section;
  activeSection: Section;
  setActiveSection: React.Dispatch<React.SetStateAction<Section>>;
}) => (
  <button
    className="relative w-full cursor-pointer rounded-full border border-[#333] bg-[rgba(31,31,31,0.62)] px-4 py-2 text-gray-300 text-xs capitalize transition-colors duration-200 hover:border-white/50 hover:text-white sm:w-auto sm:px-3"
    onClick={() => {
      smoothScrollTo(name);
      setActiveSection(name);
    }}
    type="button"
  >
    {name}
    <motion.div
      className="absolute inset-0 rounded-full border border-transparent"
      whileHover={{
        borderColor: 'rgba(255, 255, 255, 0.3)',
        scale: 1.05,
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
        transition: { duration: 0.2 },
      }}
    />
    {activeSection === name && (
      <motion.div
        className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500/20 to-blue-500/20"
        layoutId="activeSection"
        transition={{ type: 'spring', duration: 0.6 }}
      />
    )}
  </button>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeSection, setActiveSection] = useState<Section>(sections[0]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  return (
    <motion.header
      className={`-translate-x-1/2 fixed top-6 left-1/2 z-20 flex transform flex-col items-center rounded-full py-3 pr-6 pl-6 backdrop-blur-xs ${headerShapeClass}border w-[calc(100%-2rem)] border-[#333] bg-[#1f1f1f57] transition-[border-radius] duration-0 ease-in-out sm:w-auto`}
    >
      <div className="flex w-full items-center justify-between gap-x-6 sm:gap-x-8">
        <div className="flex items-center">
          <NavBarLogo />
        </div>

        <nav className="hidden items-center gap-2 sm:flex sm:gap-3">
          {sections.map((section) => (
            <NavLink
              activeSection={activeSection}
              key={section}
              name={section}
              setActiveSection={setActiveSection}
            />
          ))}
          <Link
            className="relative ml-4"
            href="https://github.com/Teyik0"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHubSvg className="size-8" />
            <motion.div
              className="absolute inset-0 rounded-full"
              whileHover={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                scale: 1.5,
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
                transition: { duration: 0.2 },
              }}
            />
          </Link>
        </nav>

        <button
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          className="flex h-8 w-8 items-center justify-center text-gray-300 focus:outline-hidden sm:hidden"
          onClick={toggleMenu}
          type="button"
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile Nav Open</title>
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile Nav Close</title>
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`flex w-full flex-col items-center overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${isOpen ? 'max-h-[1000px] pt-4 opacity-100' : 'pointer-events-none max-h-0 pt-0 opacity-0'}`}
      >
        <div className="mt-4 flex w-full flex-col items-center space-y-4">
          {sections.map((section) => (
            <NavLink
              activeSection={activeSection}
              key={section}
              name={section}
              setActiveSection={setActiveSection}
            />
          ))}
        </div>
      </div>

      <div className="-z-10 absolute inset-0 animate-pulse rounded-full bg-linear-to-r from-purple-500/10 to-blue-500/10 blur-xl" />
    </motion.header>
  );
}
