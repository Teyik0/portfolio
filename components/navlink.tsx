"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { sections } from "./navbar"

type Props = {
  id: number
  children: React.ReactNode
  activeId: number
  setActiveIdAction: React.Dispatch<React.SetStateAction<number>>
}

export const NavLink = ({ children, id, activeId, setActiveIdAction }: Props) => {
  const isActive = activeId === id

  const handleClick = (id: number) => {
    const element = document.getElementById(sections[id])
    if (!element) return

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 800 // Duration in milliseconds
    let startTime: number | null = null

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    requestAnimationFrame(animation)
    setActiveIdAction(id)
  }

  return (
    <li className="relative group cursor-pointer">
      <div
        className={cn(
          "w-full h-full block py-4 px-5 transition-colors",
          "group-hover:text-foreground",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
        onClick={() => handleClick(id)}
      >
        {children}
      </div>
      <div
        className={cn(
          "absolute bottom-0 h-0.5 bg-muted-foreground opacity-0 transition-all duration-500",
          "group-hover:opacity-100 group-hover:w-full",
          isActive ? "opacity-100 w-full" : "w-0",
        )}
      />
    </li>
  )
}
