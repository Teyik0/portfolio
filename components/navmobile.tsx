"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { Menu, X, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { sections } from "./navbar"

const NavbarContext = createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return <NavbarContext.Provider value={{ isOpen, setIsOpen }}>{children}</NavbarContext.Provider>
}

export const NavbarMobileBtn = () => {
  const { isOpen, setIsOpen } = useContext(NavbarContext)

  return (
    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  )
}

export const NavbarMobile = () => {
  const { isOpen, setIsOpen } = useContext(NavbarContext)

  if (!isOpen) return null

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <div className="md:hidden bg-background border-t">
      <nav className="p-4 space-y-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleClick(section)}
            className="block w-full text-left py-2 px-4 hover:bg-accent rounded-md transition-colors capitalize"
          >
            {section}
          </button>
        ))}
        <div className="flex gap-4 pt-4 border-t">
          <Link href="https://github.com/Teyik0" target="_blank" className="p-2">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="https://www.linkedin.com/in/théo-samarasinghe" target="_blank" className="p-2">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </nav>
    </div>
  )
}
