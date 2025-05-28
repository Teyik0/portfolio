"use client"

import { motion } from "framer-motion"
import { Code, Braces, Zap, Terminal } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import React from "react"

const mainSkills = [
  {
    name: "Bun.js",
    icon: <Zap className="h-8 w-8" />,
    color: "from-amber-500 to-yellow-500",
    description: "JavaScript runtime & toolkit",
  },
  {
    name: "Next.js",
    icon: <Braces className="h-8 w-8" />,
    color: "from-gray-500 to-gray-700",
    description: "React framework for production",
  },
  {
    name: "TypeScript",
    icon: <Code className="h-8 w-8" />,
    color: "from-blue-500 to-blue-700",
    description: "Typed JavaScript at scale",
  },
  {
    name: "Python",
    icon: <Terminal className="h-8 w-8" />,
    color: "from-green-500 to-blue-500",
    description: "Versatile programming language",
  },
]

const allSkills = [
  {
    category: "Frontend",
    skills: ["React", "Vue.js", "HTML/CSS", "Tailwind CSS", "Framer Motion", "Redux", "GraphQL"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Django", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "GitHub Actions", "Vercel"],
  },
  {
    category: "Blockchain",
    skills: ["Solidity", "Web3.js", "Ethers.js", "Smart Contracts", "DeFi", "NFTs", "Hardhat"],
  },
  {
    category: "Tools",
    skills: ["Git", "VS Code", "Figma", "Postman", "Jira", "Notion", "Slack"],
  },
]

export const MainSkills = () => {
  return (
    <div className="mt-16 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative"
      >
        {/* Glass background */}
        <div className="absolute right-0 top-0 bottom-0 w-auto max-w-xs bg-white/5 backdrop-blur-md rounded-2xl border border-white/10" />

        <div className="relative p-4 grid grid-cols-2 gap-3 max-w-xs ml-auto mr-0 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden">
          {/* Subtle gradient border effect */}
          <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
            <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 animate-gradient-x"></div>
          </div>

          {/* See All Skills Button - Centered */}
          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-2.5 rounded-full border border-white/20 transition-all duration-300 shadow-lg hover:shadow-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                See All Skills
              </motion.button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl mb-6">All Skills & Technologies</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {allSkills.map((category) => (
                  <div key={category.category} className="space-y-3">
                    <h3 className="text-xl font-semibold text-white/90">{category.category}</h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill) => (
                        <li key={skill} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-white/80">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {mainSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex flex-col items-center text-center p-2 group"
            >
              <motion.div
                className={cn("p-2 rounded-lg bg-gradient-to-r mb-2", skill.color)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300">
                  {React.cloneElement(skill.icon as React.ReactElement, { className: "h-6 w-6" })}
                </div>
              </motion.div>
              <h3 className="text-white font-medium text-sm">{skill.name}</h3>
              <p className="text-white/60 text-xs mt-0.5">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
