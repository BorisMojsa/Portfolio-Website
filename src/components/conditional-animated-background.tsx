"use client"

import { usePathname } from "next/navigation"
import { AnimatedBackground } from "./animated-background"

export function ConditionalAnimatedBackground() {
  const pathname = usePathname()
  
  // Only show animated background on the home page
  const isHomePage = pathname === "/"
  
  if (!isHomePage) {
    return null
  }
  
  return <AnimatedBackground />
}

