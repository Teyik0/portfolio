"use client"

import { motion } from "framer-motion"
import { Code, Database, Globe, Cpu, Shield, Zap } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Globe className="w-8 h-8" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend Development",
    icon: <Database className="w-8 h-8" />,
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Blockchain & Web3",
    icon: <Shield className="w-8 h-8" />,
    skills: ["Solidity", "Web3.js", "Ethers.js", "Smart Contracts", "DeFi"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "DevOps & Cloud",
    icon: <Cpu className="w-8 h-8" />,
    skills: ["Docker", "AWS", "Vercel", "CI/CD", "Kubernetes"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Programming Languages",
    icon: <Code className="w-8 h-8" />,
    skills: ["JavaScript", "TypeScript", "Python", "Solidity", "Rust"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Tools & Technologies",
    icon: <Zap className="w-8 h-8" />,
    skills: ["Git", "VS Code", "Figma", "Postman", "MetaMask"],
    color: "from-indigo-500 to-purple-500",
  },
]

export const SkillsSection = () => {
  return (
    <section id="skills" className="min-h-screen py-20 px-4 bg-gray-950 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Skills & Expertise</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Technologies and tools I use to bring ideas to life</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 h-full hover:border-gray-700 transition-all duration-300">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                  <div className="text-white">{category.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{category.title}</h3>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-center justify-between py-2 px-3 bg-gray-800/50 rounded-md">
                      <span className="text-gray-300">{skill}</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
