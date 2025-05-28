"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  children: string
  className?: string
  duration?: number
}

export const TypingAnimation = ({ children, className, duration = 20 }: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const text = children

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, duration * 10)

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text, duration])

  return (
    <div className={cn("font-mono relative", className)}>
      <span dangerouslySetInnerHTML={{ __html: displayedText }} />
      <span
        className={`${isComplete ? "animate-blink" : "opacity-0"} absolute -right-3 top-0 h-full w-2 bg-blue-500`}
      ></span>
    </div>
  )
}
