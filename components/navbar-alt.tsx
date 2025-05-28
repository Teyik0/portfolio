"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export const sections = ["home", "projects", "skills", "contact"]

// Alternative navbar design with individual floating pills
export const NavbarAlt = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => document.getElementById(section))
      const currentSection = sectionElements.findIndex((element, index) => {
        if (!element) return false
        const rect = element.getBoundingClientRect()
        const nextElement = sectionElements[index + 1]
        const nextRect = nextElement?.getBoundingClientRect()

        if (!nextRect) {
          return rect.top <= 100
        }

        return rect.top <= 100 && nextRect.top > 100
      })

      if (currentSection !== -1) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index])
    if (!element) return

    element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
    >
      <ul className="flex items-center gap-3">
        {sections.map((section, index) => (
          <motion.li
            key={section}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => scrollToSection(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                "relative px-5 py-2.5 text-sm font-medium transition-all duration-300",
                "bg-white/5 backdrop-blur-md rounded-full",
                "border border-white/10",
                activeSection === index ? "text-white" : "text-white/60",
              )}
            >
              {/* Animated border gradient */}
              <AnimatePresence>
                {(hoveredIndex === index || activeSection === index) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        activeSection === index
                          ? "linear-gradient(45deg, #8b5cf6, #3b82f6)"
                          : "linear-gradient(45deg, #8b5cf6, #3b82f6)",
                      padding: "1px",
                    }}
                  >
                    <div className="h-full w-full rounded-full bg-black/80 backdrop-blur-md" />
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="relative z-10 capitalize">{section}</span>

              {/* Glow effect on active */}
              {activeSection === index && (
                <motion.div
                  layoutId="glow"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-md -z-10"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  )
}
