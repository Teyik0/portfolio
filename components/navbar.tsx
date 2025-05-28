"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { smoothScrollTo } from "@/utils/smooth-scroll"

export const sections = ["home", "projects", "contact"]

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)

      // Update active section based on scroll position
      const sectionElements = sections.map((section) => document.getElementById(section))
      const currentSection = sectionElements.findIndex((element, index) => {
        if (!element) return false
        const rect = element.getBoundingClientRect()

        // Adjust the threshold to better detect when a section is in view
        return rect.top <= 150 && rect.bottom >= 150
      })

      if (currentSection !== -1) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    smoothScrollTo(sections[index])
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300"
    >
      <div className="relative">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-full border border-white/10" />

        {/* Navigation items */}
        <ul className="relative flex items-center justify-end gap-4 px-4 py-2">
          {sections.map((section, index) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(index)}
                className={cn(
                  "relative px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full",
                  "hover:text-white hover:scale-110 hover:shadow-glow",
                  activeSection === index ? "text-white" : "text-white/60",
                )}
              >
                {/* Animated background for active item */}
                {activeSection === index && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}

                {/* Hover effect */}
                <span className="relative z-10 capitalize">{section}</span>

                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-transparent"
                  whileHover={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
                    transition: { duration: 0.2 },
                  }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Animated glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl -z-10 animate-pulse" />
      </div>
    </motion.nav>
  )
}
