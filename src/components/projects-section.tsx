"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "DeFi Trading Platform",
    description:
      "A decentralized trading platform built with React, Web3, and smart contracts. Features real-time price feeds and automated trading strategies.",
    tech: ["React", "TypeScript", "Solidity", "Web3.js"],
    github: "https://github.com/Teyik0/defi-platform",
    demo: "https://defi-platform-demo.vercel.app",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Blockchain Analytics Dashboard",
    description:
      "Real-time blockchain analytics dashboard with transaction monitoring, wallet tracking, and market insights.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Chart.js"],
    github: "https://github.com/Teyik0/blockchain-analytics",
    demo: "https://blockchain-analytics-demo.vercel.app",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "NFT Marketplace",
    description:
      "Full-stack NFT marketplace with minting, trading, and auction features. Built with modern web technologies.",
    tech: ["React", "Express", "MongoDB", "IPFS"],
    github: "https://github.com/Teyik0/nft-marketplace",
    demo: "https://nft-marketplace-demo.vercel.app",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export const Projects = () => {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 bg-black relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my latest work in blockchain, web development, and decentralized applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 h-full">
                <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{project.title}</CardTitle>
                  <CardDescription className="text-gray-400">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
