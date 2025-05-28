import type React from "react"
import "./globals.css"
import { Navbar } from "@/components/navbar"

export const metadata = {
  title: "Theo - Portfolio 2025",
  description: "Discover my portfolio",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body id="home">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
