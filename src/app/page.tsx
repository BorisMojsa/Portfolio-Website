"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { PointerEvent as ReactPointerEvent, RefObject } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Medal, Trophy, Mail, ExternalLink, Cpu, BookOpen, Award, Linkedin, Github, ArrowUp, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type SeasonId = "summer" | "fall" | "winter" | "spring"
type SeasonOverlayType = "rain" | "snow" | "leaves" | "petals"

interface SeasonOverlayConfig {
  type: SeasonOverlayType
  color: string
}

interface SeasonSkyObject {
  type: "sun" | "moon"
  size: number
  color: string
  glow: string
  ring?: string
}

interface SeasonPalette {
  sky: string
  grass: string
  track: string
  lane: string
  treeDark: string
  treeLight: string
  treeTrunk: string
  mountainDark: string
  mountainLight: string
  mountainSnow: string
  cloud: string
  cloudShadow: string
}

interface SeasonTheme {
  id: SeasonId
  name: string
  accentColor: string
  skyObject: SeasonSkyObject
  overlay?: SeasonOverlayConfig
  palette: SeasonPalette
}

const OVERLAY_POSITIONS: Record<SeasonOverlayType, Array<{ left: string; delay: string; duration: string; scale: number }>> = {
  rain: Array.from({ length: 48 }, (_, index) => ({
    left: `${(index * 2.7) % 100}%`,
    delay: `${(index % 12) * 0.2}s`,
    duration: `${2.4 + (index % 6) * 0.2}s`,
    scale: 1 + (index % 3) * 0.25,
  })),
  snow: Array.from({ length: 48 }, (_, index) => ({
    left: `${(index * 3.4) % 100}%`,
    delay: `${(index % 10) * 0.35}s`,
    duration: `${5 + (index % 5)}s`,
    scale: 0.9 + (index % 4) * 0.2,
  })),
  leaves: Array.from({ length: 28 }, (_, index) => ({
    left: `${(index * 4.1) % 100}%`,
    delay: `${(index % 8) * 0.35}s`,
    duration: `${4 + (index % 5) * 0.4}s`,
    scale: 0.8 + ((index % 3) * 0.2),
  })),
  petals: Array.from({ length: 30 }, (_, index) => ({
    left: `${(index * 3.1) % 100}%`,
    delay: `${(index % 9) * 0.3}s`,
    duration: `${5 + (index % 5) * 0.35}s`,
    scale: 0.75 + ((index % 4) * 0.15),
  })),
}

const OVERLAY_CLASS_MAP: Record<SeasonOverlayType, string> = {
  rain: "rain-drop",
  snow: "snow-flake",
  leaves: "leaf-drop",
  petals: "petal-drop",
}

const SEASON_THEMES: SeasonTheme[] = [
  {
    id: "summer",
    name: "Summer",
    accentColor: "#ffe066",
    skyObject: {
      type: "sun",
      size: 140,
      color: "#ffe066",
      glow: "rgba(255, 224, 102, 0.55)",
      ring: "#ffcf33",
    },
    palette: {
      sky: "#62b8ff",
      grass: "#5ebc3f",
      track: "#b86f50",
      lane: "#ffffff",
      treeDark: "#2a7302",
      treeLight: "#52a549",
      treeTrunk: "#7d5b24",
      mountainDark: "#3a4f6a",
      mountainLight: "#5c7b9c",
      mountainSnow: "#ffffff",
      cloud: "#ffffff",
      cloudShadow: "#d0d0d0",
    },
  },
  {
    id: "fall",
    name: "Fall",
    accentColor: "#ffb347",
    skyObject: {
      type: "sun",
      size: 120,
      color: "#ffc65c",
      glow: "rgba(255, 198, 92, 0.55)",
      ring: "#ff8c42",
    },
    overlay: {
      type: "leaves",
      color: "#ff9f45",
    },
    palette: {
      sky: "#ffb347",
      grass: "#d77a2b",
      track: "#8a4b21",
      lane: "#ffe8cc",
      treeDark: "#8e3b0c",
      treeLight: "#d1701d",
      treeTrunk: "#744019",
      mountainDark: "#4c3529",
      mountainLight: "#7b5642",
      mountainSnow: "#f2e2d2",
      cloud: "#ffe3c2",
      cloudShadow: "#ffcfa3",
    },
  },
  {
    id: "winter",
    name: "Winter",
    accentColor: "#d7ecff",
    skyObject: {
      type: "moon",
      size: 130,
      color: "#f5f7ff",
      glow: "rgba(215, 236, 255, 0.6)",
      ring: "#b1c4e4",
    },
    overlay: {
      type: "snow",
      color: "#ffffff",
    },
    palette: {
      sky: "#6c9bde",
      grass: "#d7e3f3",
      track: "#a3b8d6",
      lane: "#f8fbff",
      treeDark: "#8ea4c4",
      treeLight: "#c5d4eb",
      treeTrunk: "#718096",
      mountainDark: "#2d3e58",
      mountainLight: "#4c6a92",
      mountainSnow: "#f8fbff",
      cloud: "#ffffff",
      cloudShadow: "#e2ecf9",
    },
  },
  {
    id: "spring",
    name: "Spring",
    accentColor: "#ffbadd",
    skyObject: {
      type: "sun",
      size: 130,
      color: "#ffd7a8",
      glow: "rgba(255, 215, 168, 0.55)",
      ring: "#ff9acd",
    },
    overlay: {
      type: "petals",
      color: "#ff9acd",
    },
    palette: {
      sky: "#9fd7ff",
      grass: "#6ddc7c",
      track: "#c47a60",
      lane: "#ffe8f4",
      treeDark: "#3e8d5f",
      treeLight: "#8fe5a7",
      treeTrunk: "#805a3a",
      mountainDark: "#324963",
      mountainLight: "#577089",
      mountainSnow: "#f5f8ff",
      cloud: "#f4f8ff",
      cloudShadow: "#ffe6f3",
    },
  },
]

const SeasonOverlay = ({ overlay }: { overlay?: SeasonOverlayConfig }) => {
  if (!overlay) {
    return null
  }

  const positions = OVERLAY_POSITIONS[overlay.type]

  return (
    <div className="season-overlay">
      {positions.map((position, index) => (
        <span
          key={`${overlay.type}-${index}`}
          className={OVERLAY_CLASS_MAP[overlay.type]}
          style={{
            left: position.left,
            animationDelay: position.delay,
            animationDuration: position.duration,
            transform: `scale(${position.scale})`,
            color: overlay.color,
          }}
        />
      ))}
    </div>
  )
}

const SeasonSkyObjectView = ({ object }: { object: SeasonSkyObject }) => (
  <div
    className="absolute top-10 right-[10%] pointer-events-none transition-all"
    style={{ width: object.size, height: object.size, transitionDuration: "1600ms" }}
  >
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 rounded-full opacity-60"
        style={{
          background: object.glow,
          filter: "blur(24px)",
        }}
      ></div>
      <div
        className="absolute inset-[8%] rounded-full"
        style={{
          background: object.ring ?? object.color,
          boxShadow: "0 6px 0 rgba(0, 0, 0, 0.25)",
        }}
      ></div>
      <div
        className="absolute inset-[20%] flex items-center justify-center"
        style={{
          background: object.color,
          borderRadius: object.type === "moon" ? "38%" : "9999px",
          boxShadow: "inset -6px -6px 0 rgba(0, 0, 0, 0.15)",
        }}
      >
        {object.type === "moon" ? (
          <div className="grid grid-cols-2 gap-1 w-2/3">
            <span className="block h-3 rounded-sm bg-white/40"></span>
            <span className="block h-2 rounded-sm bg-white/30"></span>
            <span className="block h-2 rounded-sm bg-white/30"></span>
            <span className="block h-3 rounded-sm bg-white/25"></span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 w-2/3">
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} className="block h-2 rounded-sm bg-white/30"></span>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)

const SeasonEffects = ({ season }: { season: SeasonTheme }) => (
  <div className="pointer-events-none absolute inset-0 z-0">
    <div
      className="absolute inset-0 opacity-35 mix-blend-screen"
      style={{
        background: `radial-gradient(120% 120% at 50% 0%, ${season.palette.sky}88 0%, transparent 65%)`,
      }}
    ></div>
    <SeasonSkyObjectView object={season.skyObject} />
    <SeasonOverlay overlay={season.overlay} />
  </div>
)

const SeasonIndicator = ({
  activeSeason,
  seasons,
  nextSeason,
  className,
}: {
  activeSeason: SeasonTheme
  seasons: SeasonTheme[]
  nextSeason: SeasonTheme
  className?: string
}) => {
  // Convert hex to rgba with transparency
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <div
      className={cn(
        "z-20 flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm shadow-md backdrop-blur-md",
        className,
      )}
      style={{ 
        backgroundColor: hexToRgba(activeSeason.accentColor, 0.4),
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
      }}
    >
    <span
      className="pixel-text text-xs font-bold text-white"
      style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
    >
      {activeSeason.name.toUpperCase()}
    </span>
    <div className="flex items-center gap-1">
      {seasons.map((season) => (
        <span
          key={`indicator-${season.id}`}
          className="block h-1.5 w-1.5 rounded-full transition-all"
          style={{
            backgroundColor: activeSeason.id === season.id ? season.accentColor : "rgba(255, 255, 255, 0.4)",
          }}
        ></span>
      ))}
    </div>
    <span className="text-xs text-white sm:inline" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
      NEXT →
      <span className="ml-1 font-bold" style={{ color: nextSeason.accentColor }}>
        {nextSeason.name.toUpperCase()}
      </span>
    </span>
  </div>
  )
}

const clamp = (value: number, min: number, max: number) => {
  const upperBound = Math.max(min, max)
  return Math.min(Math.max(value, min), upperBound)
}

type IndicatorBounds = {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

const DraggableSeasonIndicator = ({
  activeSeason,
  seasons,
  nextSeason,
  anchorRef,
}: {
  activeSeason: SeasonTheme
  seasons: SeasonTheme[]
  nextSeason: SeasonTheme
  anchorRef?: RefObject<HTMLElement>
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<HTMLButtonElement | null>(null)
  const pointerOffset = useRef({ x: 0, y: 0 })
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 32, y: 32 })
  const [isDragging, setIsDragging] = useState(false)
  const [hasLockedPosition, setHasLockedPosition] = useState(false)
  const [lastDragPosition, setLastDragPosition] = useState<{ x: number; y: number } | null>(null)

  const getBounds = useCallback((): IndicatorBounds => {
    const horizontalMargin = 12
    const verticalMargin = 12

    if (typeof window === "undefined") {
      return {
        minX: horizontalMargin,
        maxX: horizontalMargin,
        minY: verticalMargin,
        maxY: verticalMargin,
      }
    }

    const container = containerRef.current
    const width = container?.offsetWidth ?? 0
    const height = container?.offsetHeight ?? 0

    const minX = horizontalMargin
    const minY = verticalMargin

    const docWidth = Math.max(document.documentElement.scrollWidth, window.innerWidth)
    const docHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight)

    const viewportMaxX = Math.max(minX, docWidth - width - horizontalMargin)
    let viewportMaxY = Math.max(minY, docHeight - height - verticalMargin)

    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      const aboutRect = aboutSection.getBoundingClientRect()
      const aboutTop = aboutRect.top + window.scrollY
      const maxAllowed = aboutTop - height - 24
      viewportMaxY = Math.min(viewportMaxY, Math.max(minY, maxAllowed))
    }

    return {
      minX,
      maxX: viewportMaxX,
      minY,
      maxY: viewportMaxY,
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    if (hasLockedPosition) {
      return
    }

    const anchor = anchorRef?.current
    const container = containerRef.current

    if (!anchor || !container) {
      return
    }

    const rect = anchor.getBoundingClientRect()
    const bounds = getBounds()
    const containerHeight = container.offsetHeight

    const targetX = clamp(rect.right + window.scrollX + 16, bounds.minX, bounds.maxX)
    const baseY =
      containerHeight > 0
        ? rect.top + window.scrollY + rect.height / 2 - containerHeight / 2
        : rect.top + window.scrollY
    const targetY = clamp(baseY, bounds.minY, bounds.maxY)

    const lockedPosition = { x: targetX, y: targetY }
    setPosition(lockedPosition)
    setLastDragPosition(lockedPosition)
    setHasLockedPosition(true)
  }, [anchorRef, getBounds, hasLockedPosition])

  const startDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!containerRef.current) {
      return
    }

    event.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    pointerOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    setIsDragging(true)
    setHasLockedPosition(true)
    setLastDragPosition(position)
    handleRef.current?.setPointerCapture(event.pointerId)
  }

  const onDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isDragging || typeof window === "undefined") {
      return
    }

    event.preventDefault()
    const bounds = getBounds()
    const nextPosition = {
      x: clamp(event.clientX + window.scrollX - pointerOffset.current.x, bounds.minX, bounds.maxX),
      y: clamp(event.clientY + window.scrollY - pointerOffset.current.y, bounds.minY, bounds.maxY),
    }
    setPosition(nextPosition)
    setLastDragPosition(nextPosition)
  }

  const stopDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isDragging) {
      return
    }

    event.preventDefault()
    setIsDragging(false)
    handleRef.current?.releasePointerCapture(event.pointerId)
    if (lastDragPosition) {
      setPosition(lastDragPosition)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "hidden sm:flex absolute z-30 flex-col items-center select-none transition-all duration-200 ease-out",
        isDragging ? "cursor-grabbing" : "cursor-default",
      )}
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      <SeasonIndicator activeSeason={activeSeason} seasons={seasons} nextSeason={nextSeason} />
      <button
        ref={handleRef}
        type="button"
        aria-label="Drag season indicator"
        onPointerDown={startDrag}
        onPointerMove={onDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        className={cn(
          "relative mt-2 block h-3 -translate-x-1/2 transform rounded-full bg-white/20 backdrop-blur-sm transition-colors touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
          isDragging ? "cursor-grabbing" : "cursor-grab hover:bg-white/30",
        )}
        style={{
          left: "50%",
          width: "calc(100% + 18px)",
          boxShadow: "0 6px 14px rgba(0, 0, 0, 0.3)",
        }}
      >
        <span className="sr-only">Drag season indicator</span>
      </button>
    </div>
  )
}

export default function Home() {
  type ProjectCategory = "web" | "ai" | "research"
  type ProjectAccent = "green" | "blue" | "purple"

  interface Project {
    id: string
    title: string
    subtitle: string
    description: string
    longDescription: string
    image: string
    accent: ProjectAccent
    categories: ProjectCategory[]
    technologies: string[]
    completionClass: string
    featured?: boolean
    highlights?: string[]
    externalLink?: string
  }

  const accentStyles: Record<ProjectAccent, {
    border: string
    hoverGlow: string
    title: string
    badge: string
    button: string
    progress: string
    dialogAccent: string
  }> = {
    green: {
      border: "border-green-500",
      hoverGlow: "hover-glow-green",
      title: "text-green-400",
      badge: "border-green-500 text-green-500",
      button: "border-green-500 text-green-500 hover:bg-green-500 hover:text-black",
      progress: "bg-green-500",
      dialogAccent: "text-green-400",
    },
    blue: {
      border: "border-blue-500",
      hoverGlow: "hover-glow-blue",
      title: "text-blue-400",
      badge: "border-blue-500 text-blue-500",
      button: "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
      progress: "bg-blue-500",
      dialogAccent: "text-blue-400",
    },
    purple: {
      border: "border-purple-500",
      hoverGlow: "hover-glow-purple",
      title: "text-purple-400",
      badge: "border-purple-500 text-purple-500",
      button: "border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white",
      progress: "bg-purple-500",
      dialogAccent: "text-purple-400",
    },
  }

  const projectTabs: Array<{ id: "all" | ProjectCategory; label: string }> = [
    { id: "all", label: "All" },
    { id: "web", label: "Web Dev" },
    { id: "ai", label: "AI/ML" },
    { id: "research", label: "Research" },
  ]

  const projects: Project[] = [
    {
      id: "smartpet",
      title: "SmartPet+",
      subtitle: "AI-powered pet breed identification and story generation",
      description:
        "Real-time Flask web app that classifies pet breeds with Azure Vision and spins up GPT-powered care stories instantly.",
      longDescription:
        "SmartPet+ orchestrates Azure Computer Vision, Flask, and OpenAI GPT-4o mini to help new owners understand their pets. I engineered the inference pipeline, tuned datasets for consistent breed detection, and choreographed prompt flows that return playful narratives and care routines in seconds.",
      image: "/images/smartpet.png",
      accent: "green",
      categories: ["web"],
      technologies: ["Python", "Flask", "OpenAI", "Azure", "REST APIs"],
      completionClass: "w-full",
      featured: true,
      highlights: [
        "Conducted dataset tuning and transfer learning to improve top-1 accuracy across 60+ breeds.",
        "Integrated OpenAI GPT-4o mini to auto-generate personalized care tips and story beats per pet.",
        "Deployed responsive UI and REST endpoints that keep upload-to-story latency under one second.",
      ],
    },
    {
      id: "airline-crew",
      title: "Airline Crew Scheduling",
      subtitle: "Optimization using Genetic Algorithms",
      description:
        "Academic research using evolutionary strategies to reduce crew scheduling conflicts and operating costs.",
      longDescription:
        "I modeled the crew scheduling challenge as a combinatorial optimization problem and implemented custom genetic algorithm operators to search valid rosters. The work benchmarked crossover and mutation strategies, surfaced 17% efficiency gains over greedy baselines, and visualized staffing stability for airline leadership review.",
      image: "/images/airline-crew.png",
      accent: "blue",
      categories: ["research"],
      technologies: ["Genetic Algorithms", "Python", "Data Analysis", "Optimization"],
      completionClass: "w-full",
      highlights: [
        "Encoded FAA safety and rest regulations directly into chromosome fitness scoring.",
        "Tested adaptive mutation rates that unlocked faster convergence on feasible rosters.",
        "Built dashboards showcasing crew utilization, overtime reduction, and on-time performance.",
      ],
    },
    {
      id: "portfolio",
      title: "Terminal-Style Portfolio",
      subtitle: "Retro-inspired interactive personal website",
      description:
        "CLI-themed portfolio built with Next.js and TypeScript that spotlights projects with pixel art animations and command prompts.",
      longDescription:
        "I designed and coded my personal portfolio from scratch, leaning into a retro arcade aesthetic with terminal-inspired navigation. The build uses Next.js App Router, Zustand-driven interactions, and custom shaders to animate pixel art environments that change with the season. The experience doubles as a sandbox for experimenting with AI-assisted content pipelines and accessibility best practices.",
      image: "/images/terminalportfolio.png",
      accent: "purple",
      categories: ["web"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      completionClass: "w-[90%]",
      highlights: [
        "Crafted pixel-perfect animations and CLI prompts that reinforce the retro game narrative.",
        "Implemented responsive motion controls and dialog components for accessible interactivity.",
        "Set up AI-assisted content pipelines to keep project data, resume insights, and achievements in sync.",
      ],
    },
  ]

  const [seasonIndex, setSeasonIndex] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const borisLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeasonIndex((prev) => (prev + 1) % SEASON_THEMES.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const activeSeason = SEASON_THEMES[seasonIndex]
  const nextSeason = SEASON_THEMES[(seasonIndex + 1) % SEASON_THEMES.length]

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    window.dispatchEvent(new CustomEvent("seasonChange", { detail: activeSeason }))
  }, [activeSeason])

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const renderProjectCard = (project: Project) => {
    const accent = accentStyles[project.accent]

    return (
      <Link
        key={project.id}
        href={`/projects/${project.id}`}
        className="block"
      >
        <Card
          className={`bg-gray-800 border-2 ${accent.border} overflow-hidden hover-animate ${accent.hoverGlow} cursor-pointer`}
        >
          <div className="h-64 md:h-80 bg-gray-700 relative overflow-hidden isolate">
            <Image
              src={project.image}
              alt=""
              fill
              aria-hidden="true"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover scale-110 blur-sm opacity-60"
            />
            <div className="absolute inset-0 bg-gray-900/30"></div>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain z-10"
              style={{ objectPosition: 'center' }}
            />
            {project.featured ? (
              <div className="absolute top-2 right-2">
                <Badge className="bg-yellow-400 text-black">Featured</Badge>
              </div>
            ) : null}
          </div>
          <CardHeader>
            <CardTitle className={`text-xl ${accent.title}`}>{project.title}</CardTitle>
            <CardDescription>{project.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className={accent.badge}>
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex items-center">
              <span className={`${accent.title} font-bold mr-2`}>COMPLETION:</span>
              <div className="h-2 bg-gray-700 rounded-full flex-1">
                <div className={`h-full ${accent.progress} rounded-full ${project.completionClass}`}></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              className={`${accent.button} hover-scale`}
            >
              View Details
            </Button>
            {project.externalLink ? (
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover-scale" 
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  window.open(project.externalLink, '_blank', 'noopener,noreferrer')
                }}
                aria-label={`Open ${project.title} in a new tab`}
              >
                <ExternalLink className="h-5 w-5" />
              </Button>
            ) : (
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover-scale opacity-60" 
                disabled
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-5 w-5" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </Link>
    )
  }

  const getProjectsForTab = (tab: "all" | ProjectCategory) =>
    tab === "all" ? projects : projects.filter((project) => project.categories.includes(tab))

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SeasonEffects season={activeSeason} />
      <div className="relative z-10 flex min-h-screen flex-col text-white [&_p]:text-shadow [&_h1]:text-shadow [&_h2]:text-shadow [&_h3]:text-shadow [&_span]:text-shadow">
        {/* Pixel art header decoration */}

      {/* Navigation */}
      <header className="container mx-auto px-4 py-6 z-10 relative">
        <nav className="flex justify-between items-start">
          <div className="flex flex-col">
            <Link
              ref={borisLinkRef}
              href="/"
              className="text-2xl font-bold tracking-tighter pixel-text"
            >
              BORIS_MOJSA
            </Link>
            <div className="mt-2">
              <SeasonIndicator
                activeSeason={activeSeason}
                seasons={SEASON_THEMES}
                nextSeason={nextSeason}
              />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#about" className="hover:text-yellow-400 transition-colors pixel-shift">
              About
            </Link>
            <Link href="#education" className="hover:text-yellow-400 transition-colors pixel-shift">
              Education
            </Link>
            <Link href="#experience" className="hover:text-yellow-400 transition-colors pixel-shift">
              Experience
            </Link>
            <Link href="#projects" className="hover:text-yellow-400 transition-colors pixel-shift">
              Projects
            </Link>
            <Link href="#achievements" className="hover:text-yellow-400 transition-colors pixel-shift">
              Track & Field
            </Link>
            <Link href="#contact" className="hover:text-yellow-400 transition-colors pixel-shift">
              Contact
            </Link>
          </div>
          <Button variant="outline" className="md:hidden" aria-label="Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>
        </nav>
        <SeasonIndicator
          activeSeason={activeSeason}
          seasons={SEASON_THEMES}
          nextSeason={nextSeason}
          className="mt-4 w-full max-w-xs mx-auto sm:hidden"
        />
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-20 flex flex-col items-center text-center bg-transparent">
        <div className="relative mb-10 hover-scale">
          <div className="absolute inset-0 border-4 border-yellow-400 rounded-full transform translate-x-3 translate-y-3"></div>
          <div className="relative z-10 w-48 h-48 rounded-full overflow-hidden border-4 border-white">
            <Image
              src="/images/headshot-2025.png"
              alt="Boris Mojsa"
              width={192}
              height={192}
              className="object-cover"
              priority
            />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 pixel-text">
          <span className="text-yellow-400">BORIS</span>
          <span className="text-red-500">MOJSA</span>
        </h1>
        <p className="max-w-3xl text-lg md:text-xl mb-3">
          <span className="text-green-500 font-bold pixel-text">Chicago-Based</span>{" "}
          <span className="text-white font-bold pixel-text">•</span>{" "}
          <span className="text-yellow-400 font-bold pixel-text">Serbian</span>{" "}
          <span className="text-white font-bold pixel-text">•</span>{" "}
          <span className="text-blue-500 font-bold pixel-text">Data Science & Software Engineering</span>
        </p>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          <Badge className="bg-yellow-400 text-black px-2.5 py-1 text-xs md:text-sm hover-scale">Python</Badge>
          <Badge className="bg-red-500 px-2.5 py-1 text-xs md:text-sm hover-scale">SQL</Badge>
          <Badge className="bg-green-500 text-black px-2.5 py-1 text-xs md:text-sm hover-scale">Azure</Badge>
          <Badge className="bg-blue-500 px-2.5 py-1 text-xs md:text-sm hover-scale">Generative AI</Badge>
          <Badge className="bg-purple-500 px-2.5 py-1 text-xs md:text-sm hover-scale">Community Impact</Badge>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-none border-b-4 border-yellow-600 hover:translate-y-1 transition-transform hover-scale">
            <a href="#projects">
              VIEW PROJECTS <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-bold px-6 py-3 rounded-none border-b-4 hover:translate-y-1 transition-transform hover-scale"
          >
            <a href="#contact">
              CONTACT ME <Mail className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Pixel art decorations */}
        <div className="mt-12 grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-full h-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-sm hover-scale"
            ></div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20 bg-transparent">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6 pixel-text text-green-400">ABOUT ME</h2>
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-slate-900/55 backdrop-blur-md border border-white/15 shadow-lg"></div>
              <div className="relative space-y-4 rounded-2xl border border-white/10 bg-white/6 px-6 py-6 text-lg shadow-inner">
                <p>
                  Hey yall I'm Boris Mojsa, a Chicago-based computer science student (with a mathematics minor✨),
                  focused on data science, machine learning, and software engineering. I’m especially interested in how
                  complex systems behave, and in turning messy, real-world problems into clean, reliable solutions.
                </p>
                <p>
                  I’m an international student from Serbia, which does intail I'm a competitive athlete, which has
                  shaped how I approach my work: disciplined, consistent, and comfortable with long feedback loops. That
                  mindset carries into my technical projects, from building data pipelines and experimenting with models
                  to translating ambiguous problems into scalable systems.
                </p>
                <p>
                  I recently completed a Data Science Internship with the SCALES Open Knowledge Network (via MCDC),
                  where I worked on applied research and real-world data systems at the intersection of technology and
                  public knowledge. Alongside this, I’ve been involved in civic-tech and community-focused work,
                  learning how thoughtful engineering decisions can create impact beyond just performance metrics.
                </p>
                <p>
                  I’m quietly ambitious, highly curious, and motivated by progress over hype. I’m currently seeking
                  internships and early-career roles in data science, machine learning, or software engineering, where I
                  can continue learning fast, contributing meaningfully, and building systems that perform under
                  pressure.
                </p>
            </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <Badge className="bg-red-500 hover:bg-red-600">Data Science</Badge>
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Machine Learning</Badge>
              <Badge className="bg-green-500 hover:bg-green-600">Software Engineering</Badge>
              <Badge className="bg-blue-500 hover:bg-blue-600">Python + SQL</Badge>
              <Badge className="bg-purple-500 hover:bg-purple-600">Runner ☕️</Badge>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 border-4 border-dashed border-green-400 transform rotate-3"></div>
            <div className="relative bg-gray-800 p-8 transform -rotate-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center hover-scale">
                  <BookOpen className="text-yellow-400 mb-2 h-8 w-8" />
                  <span className="text-sm">GPA</span>
                  <span className="text-xl font-bold">4.00 / 4.00</span>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center hover-scale">
                  <Trophy className="text-yellow-400 mb-2 h-8 w-8" />
                  <span className="text-sm">Honors</span>
                  <span className="text-xl font-bold text-center leading-snug">Dean&apos;s &amp; President&apos;s Lists</span>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center hover-scale">
                  <Heart className="text-yellow-400 mb-2 h-8 w-8" />
                  <span className="text-sm">Hobbies</span>
                  <span className="text-xl font-bold text-center leading-snug">Running • Coffee • Escape Rooms</span>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center hover-scale">
                  <Award className="text-yellow-400 mb-2 h-8 w-8" />
                  <span className="text-sm">Scholarships</span>
                  <span className="text-xl font-bold text-center leading-snug">ComEd &amp; TOEFL AEG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections with background-color adjustments */}
      <section id="education" className="py-20 bg-transparent">
        {/* Education content remains the same */}
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 pixel-text text-yellow-400 text-center">EDUCATION</h2>

          <Link href="/education/roosevelt" className="block">
          <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl border-2 border-yellow-400 relative hover-animate hover-glow-yellow cursor-pointer">
            {/* Pixel art decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 bg-yellow-400 transform -translate-x-2 -translate-y-2"></div>
            <div className="absolute top-0 right-0 w-4 h-4 bg-yellow-400 transform translate-x-2 -translate-y-2"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-yellow-400 transform -translate-x-2 translate-y-2"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-400 transform translate-x-2 translate-y-2"></div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-yellow-400" />
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-2xl font-bold mb-2">Roosevelt University</h3>
                <p className="text-yellow-400 mb-4">Bachelor of Science in Computer Science · Minor in Mathematics</p>
                <p className="text-gray-300 mb-2">Expected Graduation: May 2027</p>
                <p className="text-gray-300 mb-4">GPA: 4.00</p>

                <h4 className="font-bold text-lg mb-2 text-green-400">Scholarships & Awards</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300 space-y-1">
                  <li>Athletic Leadership Award</li>
                  <li>Roosevelt Academic Scholarship</li>
                  <li>Dean Scholar Award</li>
                </ul>

                <h4 className="font-bold text-lg mb-2 text-green-400">Focus Areas</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-gray-500">
                    Intelligent Systems
                  </Badge>
                  <Badge variant="outline" className="border-gray-500">
                    Statistics
                  </Badge>
                  <Badge variant="outline" className="border-gray-500">
                    Data Mining
                  </Badge>
                </div>

                <div className="mt-6 flex items-center">
                  <div className="mr-4 text-yellow-400 font-bold">PROGRESS</div>
                  <div className="h-4 bg-gray-700 rounded-full flex-1">
                    <div className="h-full bg-gradient-to-r from-green-500 to-yellow-400 rounded-full w-[64%]"></div>
                  </div>
                  <div className="ml-4 text-yellow-400 font-bold">64%</div>
                </div>
                <div className="mt-2 text-sm text-gray-400 text-center">77 / 120 credits</div>

                <div className="mt-10 pt-8 border-t border-yellow-500/40">
                  <h3 className="text-2xl font-bold mb-2">Chicago State University</h3>
                  <p className="text-yellow-400 mb-4">Bachelor of Science in Computer Science · Minor in Mathematics</p>
                  <p className="text-gray-300 mb-2">Summer 2023 – Spring 2025</p>
                  <p className="text-gray-300 mb-4">GPA: 4.00</p>

                  <h4 className="font-bold text-lg mb-2 text-green-400">Honors & Awards</h4>
                  <ul className="list-disc list-inside mb-4 text-gray-300 space-y-1">
                    <li>ComEd Future of Energy Scholar (2025)</li>
                    <li>TOEFL iBT Athletics Excellence Grant</li>
                    <li>Dean&apos;s List (Spring &amp; Fall 2024)</li>
                    <li>President&apos;s List (Spring 2025)</li>
                  </ul>

                  <h4 className="font-bold text-lg mb-2 text-green-400">Highlights</h4>
                  <ul className="list-disc list-inside mb-4 text-gray-300 space-y-1">
                    <li>Completed 64 / 120 credit hours prior to transferring</li>
                    <li>NCAA Division I track athlete</li>
                  </ul>

                  <h4 className="font-bold text-lg mb-2 text-green-400">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-gray-500">
                      Data Structures
                    </Badge>
                    <Badge variant="outline" className="border-gray-500">
                      Object Oriented Programming
                    </Badge>
                    <Badge variant="outline" className="border-gray-500">
                      Software Engineering
                    </Badge>
                    <Badge variant="outline" className="border-gray-500">
                      Discrete Mathematics
                    </Badge>
                    <Badge variant="outline" className="border-gray-500">
                      Probability &amp; Statistics
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Link>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="container mx-auto px-4 py-20 bg-transparent">
        <h2 className="text-4xl font-bold mb-12 pixel-text text-red-400 text-center">EXPERIENCE & LEADERSHIP</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience */}
          <Link href="/experience/mcdc-intern" className="block">
          <Card className="bg-gray-800 border-2 border-blue-500 overflow-hidden hover-animate hover-glow-blue cursor-pointer">
            <CardHeader className="bg-gray-700">
              <div>
                <CardTitle className="text-xl text-blue-400">Incoming MCDC Data Science Intern</CardTitle>
                <CardDescription>Scales Open Knowledge Network (SCALES-OKN)</CardDescription>
              </div>
              <CardDescription className="text-gray-300">June 2025 – August 2025 · Chicago, Illinois</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  <span>Selected for the DOE-backed MCDC internship focused on open climate data innovation.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  <span>Training on knowledge graph tooling that powers the SCALES open knowledge network.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  <span>Collaborating with faculty mentors to scope analytics pipelines using Python, SQL, and Azure.</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-blue-400 font-bold mr-2">XP LOADING:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-blue-500 rounded-full w-2/5"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          </Link>

          {/* Experience */}
          <Link href="/experience/digital-navigator" className="block">
          <Card className="bg-gray-800 border-2 border-red-500 overflow-hidden hover-animate hover-glow-red cursor-pointer">
            <CardHeader className="bg-gray-700">
              <div>
                <CardTitle className="text-xl text-red-400">Student Digital Navigator</CardTitle>
                <CardDescription>Chicago State University</CardDescription>
              </div>
              <CardDescription className="text-gray-300">February 2024 – August 2025 · Chicago, Illinois</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Improved digital access by distributing 400+ laptops and hotspots to residents across the city.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Ran 20+ workshops and trained 150+ community members on essential productivity and safety skills.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Scaled one-on-one coaching to 150+ sessions spanning 10+ neighborhoods, reaching 2,000+ participants.</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-red-400 font-bold mr-2">XP GAINED:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-red-500 rounded-full w-5/6"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          </Link>

          {/* Experience */}
          <Link href="/experience/comed-scholar" className="block">
          <Card className="bg-gray-800 border-2 border-yellow-500 overflow-hidden hover-animate hover-glow-yellow cursor-pointer">
            <CardHeader className="bg-gray-700">
              <div>
                <CardTitle className="text-xl text-yellow-400">Project Manager · ComEd Scholar</CardTitle>
                <CardDescription>ComEd Future of Energy Scholar Program</CardDescription>
              </div>
              <CardDescription className="text-gray-300">January 2025 – May 2025 · Chicago, Illinois</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">→</span>
                  <span>Co-led the four-person &ldquo;Endless Bio Cycle&rdquo; concept converting restaurant waste oil into ASTM-grade biodiesel.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">→</span>
                  <span>Modeled scenarios showing 43% diesel savings when repurposing in-house feedstock and 20% savings when purchasing oil.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">→</span>
                  <span>Pitched the operational and emissions impact to ComEd engineers, mentors, and peer scholars.</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-yellow-400 font-bold mr-2">XP GAINED:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-yellow-500 rounded-full w-4/5"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          </Link>

          {/* Experience */}
          <Link href="/experience/cyberforce" className="block">
          <Card className="bg-gray-800 border-2 border-purple-500 overflow-hidden hover-animate hover-glow-purple cursor-pointer">
            <CardHeader className="bg-gray-700">
              <div>
                <CardTitle className="text-xl text-purple-400">Team Leader</CardTitle>
                <CardDescription>U.S. Department of Energy CyberForce Competition</CardDescription>
              </div>
              <CardDescription className="text-gray-300">November 2023 · Chicago, Illinois</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">→</span>
                  <span>Ranked within the top 10% of 100+ national teams safeguarding critical infrastructure simulations.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">→</span>
                  <span>Directed live incident response, penetration testing, and threat hunting under competition pressure.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">→</span>
                  <span>Strengthened zero-trust access models and red-team/blue-team coordination playbooks.</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-purple-400 font-bold mr-2">XP GAINED:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-purple-500 rounded-full w-3/4"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          </Link>

          {/* Experience */}
          <Link href="/experience/braven-researcher" className="block">
          <Card className="bg-gray-800 border-2 border-green-500 overflow-hidden hover-animate hover-glow-green cursor-pointer">
            <CardHeader className="bg-gray-700">
              <div>
                <CardTitle className="text-xl text-green-400">Lead Researcher</CardTitle>
                <CardDescription>Braven Accelerator · Chicago State University</CardDescription>
              </div>
              <CardDescription className="text-gray-300">January 2025 – May 2025 · Chicago, Illinois</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Directed a five-member capstone team exploring outreach strategies for the Chicago Sky Foundation.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Conducted 15 interviews and analyzed 50+ survey responses to spotlight three major awareness gaps.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Designed the &ldquo;Skybound&rdquo; mentorship program projected to reach 200+ students and lift event turnout 50%.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Presented findings to Braven leadership coaches, Chicago Sky Foundation representatives, and industry mentors.</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-green-400 font-bold mr-2">XP GAINED:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-green-500 rounded-full w-4/5"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          </Link>

          {/* Experience */}
          <Link href="/experience/youth-dialogue" className="block">
          <Card className="bg-gray-800 border-2 border-cyan-500 overflow-hidden hover-animate hover-glow-blue cursor-pointer">
            <CardHeader className="bg-gray-700">
              <div>
                <CardTitle className="text-xl text-cyan-300">Youth for the Dialogue</CardTitle>
                <CardDescription>UNDP &amp; Ana and Vlade Divac Foundation</CardDescription>
              </div>
              <CardDescription className="text-gray-300">March 2023 – August 2023 · Belgrade, Serbia</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-300 mr-2">→</span>
                  <span>Led UNDP-backed community forums elevating youth voices in policymaking and social justice.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-300 mr-2">→</span>
                  <span>Coordinated initiatives that strengthened trust between young residents and local institutions.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-300 mr-2">→</span>
                  <span>Delivered inclusive programming that advanced civic engagement and intercultural dialogue.</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-cyan-300 font-bold mr-2">XP GAINED:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-cyan-500 rounded-full w-3/4"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          </Link>

          {/* Experience */}
          <Link href="/experience/m-opovo" className="block">
          <Card className="bg-gray-800 border-2 border-orange-500 overflow-hidden hover-animate hover-glow-orange cursor-pointer">
            <CardHeader className="bg-gray-700">
              <div>
                <CardTitle className="text-xl text-orange-400">Co-Founder &amp; Operations Manager</CardTitle>
                <CardDescription>M Opovo</CardDescription>
              </div>
              <CardDescription className="text-gray-300">May 2024 – Present · Opovo, Serbia</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">→</span>
                  <span>Managed end-to-end business operations and digital marketing, generating $50,000 annual revenue through automated systems and multi-channel campaigns.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">→</span>
                  <span>Developed an e-commerce platform using Next.js and TypeScript, automating order processing with payment integrations and inventory tracking.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">→</span>
                  <span>Optimized marketing campaigns and sales operations, managing 3 tons of honey annually with A/B testing and conversion rate analysis.</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-orange-400 font-bold mr-2">XP GAINED:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-orange-500 rounded-full w-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 pixel-text text-purple-400 text-center">MY PROJECTS</h2>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-800 p-1">
                {projectTabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-purple-500 hover-scale">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {projectTabs.map((tab) => {
              const tabProjects = getProjectsForTab(tab.id)
              const emptyMessage =
                tab.id === "all"
                  ? "New projects are on the way — check back soon for fresh builds."
                  : `More ${tab.label.toLowerCase()} projects coming soon.`

              return (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  {tabProjects.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {tabProjects.map((project) => renderProjectCard(project))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-purple-500/60 bg-gray-900/60 p-8 text-center text-gray-300">
                      {emptyMessage}
                    </div>
                  )}
                </TabsContent>
              )
            })}
          </Tabs>

          <div className="mt-12 text-center">
            <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-6 text-lg rounded-none border-b-4 border-purple-700 hover:translate-y-1 transition-transform hover-scale">
              <a href="#projects">
                VIEW ALL PROJECTS <ArrowRight className="ml-2" />
              </a>
            </Button>
          </div>
        </div>

      </section>

      {/* Track & Field Achievements */}
      <section id="achievements" className="container mx-auto px-4 py-20 bg-transparent">
        <h2 className="text-4xl font-bold mb-12 pixel-text text-yellow-400 text-center">TRACK & FIELD ACHIEVEMENTS</h2>

        <div className="relative">
          {/* Track field decoration */}
          <div className="absolute inset-0 bg-gray-800 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-green-500/20"></div>
          </div>

          <div className="relative z-10 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/achievements/toefl-grant" className="block">
              <div className="bg-gray-800/80 p-6 rounded-xl border-l-4 border-yellow-400 hover-animate hover-glow-yellow cursor-pointer">
                <div className="flex items-start gap-4">
                  <Medal className="text-yellow-400 h-12 w-12 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">TOEFL iBT Athletics Excellence Grant</h3>
                    <p className="text-gray-300 mb-4">Chicago State University</p>
                    <p className="text-sm text-gray-400">
                      Awarded the TOEFL iBT Athletics Excellence Grant in recognition of outstanding athletic
                      performance and academic achievement.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-yellow-400 font-bold">+500 XP</span>
                      <div className="ml-4 h-2 bg-gray-700 rounded-full flex-1 max-w-xs">
                        <div className="h-full bg-yellow-400 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Link>

              <Link href="/achievements/ncaa-athlete" className="block">
              <div className="bg-gray-800/80 p-6 rounded-xl border-l-4 border-blue-500 hover-animate hover-glow-blue cursor-pointer">
                <div className="flex items-start gap-4">
                  <Trophy className="text-blue-500 h-12 w-12 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">NCAA Division I & II Athlete</h3>
                    <p className="text-gray-300 mb-4">Chicago State University & Roosevelt University</p>
                    <p className="text-sm text-gray-400">
                      Competing at the highest levels of collegiate athletics across both Division I and Division II programs.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-blue-500 font-bold">+400 XP</span>
                      <div className="ml-4 h-2 bg-gray-700 rounded-full flex-1 max-w-xs">
                        <div className="h-full bg-blue-500 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Link>

              <Link href="/achievements/serbia-national" className="block">
              <div className="bg-gray-800/80 p-6 rounded-xl border-l-4 border-green-500 hover-animate hover-glow-green cursor-pointer">
                <div className="flex items-start gap-4">
                  <Trophy className="text-green-500 h-12 w-12 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Serbia National Team Member</h3>
                    <p className="text-gray-300 mb-4">Serbia Athletics</p>
                    <p className="text-sm text-gray-400">
                      Representing Serbia on the international stage as a member of the national track & field team.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-green-500 font-bold">+450 XP</span>
                      <div className="ml-4 h-2 bg-gray-700 rounded-full flex-1 max-w-xs">
                        <div className="h-full bg-green-500 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Link>

              <Link href="/achievements/athletic-skills" className="block">
              <div className="bg-gray-800/80 p-6 rounded-xl border-l-4 border-red-500 hover-animate hover-glow-red cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500 h-8 w-8"
                    >
                      <path d="M19.5 9.5 12 4 4.5 9.5M4.5 14.5 12 20l7.5-5.5M4.5 9.5v5M19.5 9.5v5M12 4v16"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Athletic Skills & Attributes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <h4 className="font-bold text-red-400 mb-2">Speed</h4>
                        <div className="h-4 bg-gray-700 rounded-full">
                          <div className="h-full bg-red-500 rounded-full w-4/5"></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-400 mb-2">Endurance</h4>
                        <div className="h-4 bg-gray-700 rounded-full">
                          <div className="h-full bg-yellow-500 rounded-full w-3/4"></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-400 mb-2">Technique</h4>
                        <div className="h-4 bg-gray-700 rounded-full">
                          <div className="h-full bg-green-500 rounded-full w-4/5"></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-400 mb-2">Strength</h4>
                        <div className="h-4 bg-gray-700 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full w-3/5"></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-400 mb-2">Agility</h4>
                        <div className="h-4 bg-gray-700 rounded-full">
                          <div className="h-full bg-purple-500 rounded-full w-4/5"></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-pink-400 mb-2">Mental Focus</h4>
                        <div className="h-4 bg-gray-700 rounded-full">
                          <div className="h-full bg-pink-500 rounded-full w-5/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </div>

            <div className="mt-12 text-center">
              <Button 
                asChild
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 text-lg rounded-none border-b-4 border-yellow-600 hover:translate-y-1 transition-transform hover-scale"
              >
                <a 
                  href="https://worldathletics.org/athletes/serbia/boris-mojsa-14882855" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  VIEW ATHLETIC PROFILE <ArrowRight className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 pixel-text text-blue-400 text-center">TECHNICAL SKILLS</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/skills/languages-data" className="block">
            <Card className="bg-gray-800 border-2 border-blue-500 hover-animate hover-glow-blue cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Cpu className="h-6 w-6 text-blue-400" />
                  <CardTitle className="text-xl text-blue-400">Languages &amp; Data</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Python</span>
                      <span className="text-sm font-medium text-blue-400">95%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full w-[95%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">C++</span>
                      <span className="text-sm font-medium text-blue-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full w-[85%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Java</span>
                      <span className="text-sm font-medium text-blue-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full w-[85%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">SQL</span>
                      <span className="text-sm font-medium text-blue-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full w-[85%] progress-fill"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Link>

            <Link href="/skills/cloud-platforms" className="block">
            <Card className="bg-gray-800 border-2 border-green-500 hover-animate hover-glow-green cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-green-400"
                  >
                    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                    <path d="M13 5v14"></path>
                  </svg>
                  <CardTitle className="text-xl text-green-400">Cloud &amp; Platforms</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Microsoft Azure</span>
                      <span className="text-sm font-medium text-green-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-green-500 rounded-full w-[85%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">REST APIs</span>
                      <span className="text-sm font-medium text-green-400">80%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-green-500 rounded-full w-[80%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Flask &amp; FastAPI</span>
                      <span className="text-sm font-medium text-green-400">82%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-green-500 rounded-full w-[82%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Power BI &amp; Tableau</span>
                      <span className="text-sm font-medium text-green-400">78%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-green-500 rounded-full w-[78%] progress-fill"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Link>

            <Link href="/skills/ai-delivery" className="block">
            <Card className="bg-gray-800 border-2 border-purple-500 hover-animate hover-glow-purple cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-purple-400"
                  >
                    <path d="M12 2H2v10h10V2Z"></path>
                    <path d="M12 12H2v10h10V12Z"></path>
                    <path d="M22 2h-10v10h10V2Z"></path>
                    <path d="M12 12h10v10H12V12Z"></path>
                  </svg>
                  <CardTitle className="text-xl text-purple-400">AI &amp; Delivery</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Machine Learning</span>
                      <span className="text-sm font-medium text-purple-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full w-[85%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Generative AI</span>
                      <span className="text-sm font-medium text-purple-400">80%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full w-[80%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Agile &amp; SDLC</span>
                      <span className="text-sm font-medium text-purple-400">80%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full w-[80%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">CI/CD &amp; Testing</span>
                      <span className="text-sm font-medium text-purple-400">78%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full w-[78%] progress-fill"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Link>
          </div>
        </div>
      </section>

      <section id="certifications" className="container mx-auto px-4 py-20 bg-transparent">
        <h2 className="text-4xl font-bold mb-12 pixel-text text-yellow-300 text-center">CERTIFICATIONS &amp; INTERESTS</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-800 border-2 border-yellow-400 hover-animate hover-glow-yellow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Medal className="h-6 w-6 text-yellow-300" />
                <CardTitle className="text-xl text-yellow-300">Certifications</CardTitle>
              </div>
              <CardDescription>Keeping credentials fresh to unlock new quests.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white">CompTIA Security+</p>
                    <p className="text-sm text-gray-400">CompTIA · In Progress</p>
                  </div>
                  <Badge className="bg-blue-500">Security</Badge>
                </li>
                <li className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white">AWS Solutions Architect Associate</p>
                    <p className="text-sm text-gray-400">Amazon Web Services · In Progress</p>
                  </div>
                  <Badge className="bg-orange-500">Cloud</Badge>
                </li>
                <li className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white">Artificial Intelligence Fundamentals</p>
                    <p className="text-sm text-gray-400">IBM SkillsBuild · Issued July 2024</p>
                  </div>
                  <Badge className="bg-yellow-400 text-black">AI</Badge>
                </li>
                <li className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white">Fundamentals of Digital Marketing</p>
                    <p className="text-sm text-gray-400">Google Digital Garage · Issued Dec 2022</p>
                  </div>
                  <Badge className="bg-red-500">IAB Europe</Badge>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-2 border-red-500 hover-animate hover-glow-red">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-red-400" />
                <CardTitle className="text-xl text-red-400">Soft Skill Power-Ups</CardTitle>
              </div>
              <CardDescription>Attributes that keep team morale and momentum high.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Analytical Thinking & Problem-Solving",
                  "Client-Facing Communication & Storytelling",
                  "Cross-functional Collaboration & Team Leadership",
                  "Adaptability & Strategic Prioritization",
                  "Presentation Design & Facilitation",
                ].map((skill) => (
                  <li key={skill} className="flex items-start gap-2">
                    <span className="text-red-400">→</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-2 border-green-500 hover-animate hover-glow-green">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-green-400" />
                <CardTitle className="text-xl text-green-400">Player Two Interests</CardTitle>
              </div>
              <CardDescription>Topics I explore when I’m not debugging code or sprinting 400m.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "AI-Driven Consulting",
                  "Machine Learning in Legal Tech",
                  "Digital Transformation",
                  "Track & Field",
                  "Design Thinking",
                  "Human-Centric Tech",
                  "Stock Market Analysis",
                ].map((interest) => (
                  <Badge key={interest} variant="outline" className="border-green-400 text-green-300 hover-scale">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20 bg-transparent">
        <h2 className="text-4xl font-bold mb-12 pixel-text text-green-400 text-center">CONTACT ME</h2>

        <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl border-2 border-green-500 relative">
          {/* Pixel art decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 bg-green-500 transform -translate-x-2 -translate-y-2"></div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 transform translate-x-2 -translate-y-2"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-green-500 transform -translate-x-2 translate-y-2"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 transform translate-x-2 translate-y-2"></div>

          <div className="max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Get In Touch</h3>
              <p className="mb-6 text-gray-300">
                Have a question or want to work together? Reach out through any of the channels below!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-black" />
                    </div>
                    <span>mojsaboris@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-black"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <span>(773) 310-9612</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-black"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <span>Chicago, IL</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-yellow-400">Connect With Me:</h4>
                  <div className="flex gap-4">
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="rounded-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover-scale"
                    >
                      <a
                        href="https://www.linkedin.com/in/borismojsa/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="rounded-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover-scale"
                    >
                      <a
                        href="https://github.com/BorisMojsa"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="rounded-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover-scale"
                    >
                      <a href="mailto:mojsaboris@gmail.com" aria-label="Email Boris">
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold tracking-tighter pixel-text text-yellow-400">
                BORIS_MOJSA
              </Link>
              <p className="text-sm text-gray-400 mt-1">
                Computer Science Student. Track & Field Athlete. © {new Date().getFullYear()}
              </p>
            </div>
            <nav className="flex gap-6">
              <Link href="#about" className="text-sm hover:text-yellow-400 transition-colors pixel-shift">
                About
              </Link>
              <Link href="#education" className="text-sm hover:text-yellow-400 transition-colors pixel-shift">
                Education
              </Link>
              <Link href="#experience" className="text-sm hover:text-yellow-400 transition-colors pixel-shift">
                Experience
              </Link>
              <Link href="#projects" className="text-sm hover:text-yellow-400 transition-colors pixel-shift">
                Projects
              </Link>
              <Link href="#contact" className="text-sm hover:text-yellow-400 transition-colors pixel-shift">
                Contact
              </Link>
            </nav>
          </div>

          {/* Pixel art footer decoration */}
          <div className="mt-8 grid grid-cols-10 gap-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-sm hover-scale"
              ></div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 mt-8 pixel-text">PRESS START TO CONTINUE...</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={cn(
          "fixed bottom-8 right-8 z-50 p-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-lg transition-all duration-300 hover-scale border-4 border-yellow-600",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        style={{ boxShadow: "0 6px 0 rgba(0, 0, 0, 0.3)" }}
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  </div>
  )
}
