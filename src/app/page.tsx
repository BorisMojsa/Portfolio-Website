"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Medal, Trophy, Mail, ExternalLink, Cpu, BookOpen, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
  rain: Array.from({ length: 36 }, (_, index) => ({
    left: `${(index * 2.7) % 100}%`,
    delay: `${(index % 12) * 0.2}s`,
    duration: `${2.4 + (index % 6) * 0.2}s`,
    scale: 0.8 + ((index % 3) * 0.2),
  })),
  snow: Array.from({ length: 32 }, (_, index) => ({
    left: `${(index * 3.4) % 100}%`,
    delay: `${(index % 10) * 0.35}s`,
    duration: `${5 + (index % 5)}s`,
    scale: 0.6 + ((index % 4) * 0.15),
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
}: {
  activeSeason: SeasonTheme
  seasons: SeasonTheme[]
  nextSeason: SeasonTheme
}) => (
  <div
    className="absolute top-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-md border border-white/30 bg-black/60 px-3 py-2 shadow-lg backdrop-blur-sm sm:left-auto sm:right-6 sm:translate-x-0"
    style={{ boxShadow: "0 12px 0 rgba(0, 0, 0, 0.35)" }}
  >
    <span
      className="pixel-text text-xs"
      style={{ color: activeSeason.accentColor }}
    >
      {activeSeason.name.toUpperCase()}
    </span>
    <div className="flex items-center gap-1">
      {seasons.map((season) => (
        <span
          key={`indicator-${season.id}`}
          className="block h-2 w-2 rounded-sm border border-white/40 transition-all"
          style={{
            background: activeSeason.id === season.id ? season.accentColor : "transparent",
            opacity: activeSeason.id === season.id ? 1 : 0.25,
          }}
        ></span>
      ))}
    </div>
    <span className="hidden text-[10px] text-white/70 sm:inline">
      NEXT →
      <span className="ml-1" style={{ color: nextSeason.accentColor }}>
        {nextSeason.name.toUpperCase()}
      </span>
    </span>
  </div>
)

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
        "A web application that uses machine learning to identify pet breeds from images and automatically generates playful stories about them.",
      longDescription:
        "SmartPet+ brings together computer vision and creative AI to help new pet owners learn about their companions in a fun way. I designed the full stack experience — from the Flask backend to the responsive interface — and orchestrated cloud services to keep inference fast and reliable.",
      image: "/placeholder.svg?height=200&width=400",
      accent: "green",
      categories: ["web"],
      technologies: ["Python", "Flask", "OpenAI", "Azure"],
      completionClass: "w-full",
      featured: true,
      highlights: [
        "Deployed Azure Computer Vision and GPT models for real-time responses",
        "Built role-based upload workflow so households can share one login",
        "Added accessibility-friendly narration for visually impaired owners",
      ],
    },
    {
      id: "airline-crew",
      title: "Airline Crew Scheduling",
      subtitle: "Optimization using Genetic Algorithms",
      description:
        "Research project focused on evolving optimal crew rosters to minimize delays and overtime while respecting union constraints.",
      longDescription:
        "I modeled the crew scheduling challenge as a combinatorial optimization problem and implemented a custom genetic algorithm to explore feasible rosters. The work benchmarked crossover and mutation strategies, revealing a 17% improvement over greedy baselines on historical airline data.",
      image: "/placeholder.svg?height=200&width=400",
      accent: "blue",
      categories: ["research"],
      technologies: ["Genetic Algorithms", "Data Analysis", "Optimization"],
      completionClass: "w-full",
      highlights: [
        "Crafted constraint encodings for FAA safety and rest requirements",
        "Implemented adaptive mutation rates to escape local minima",
        "Visualized schedule stability metrics for leadership reviews",
      ],
    },
    {
      id: "smartpet-ai",
      title: "SmartPet+ AI Model",
      subtitle: "Machine learning model for pet breed identification",
      description:
        "The standalone AI component that processes uploaded photos, predicts the most likely breed, and powers story prompts.",
      longDescription:
        "This model distills transfer learning techniques on top of a vision backbone to keep training time modest. I curated a clean dataset, fine-tuned classification layers, and wrapped the result in a lightweight inference API that slots into the primary SmartPet+ application.",
      image: "/placeholder.svg?height=200&width=400",
      accent: "purple",
      categories: ["ai"],
      technologies: ["Azure Computer Vision", "Machine Learning", "Image Processing"],
      completionClass: "w-3/4",
      highlights: [
        "Achieved 94% top-1 accuracy across 60 common breeds",
        "Reduced inference latency to under 400ms using model quantization",
        "Automated evaluation harness using user-provided validation photos",
      ],
    },
  ]

  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [seasonIndex, setSeasonIndex] = useState(0)

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

  const renderProjectCard = (project: Project) => {
    const accent = accentStyles[project.accent]

    return (
      <Card
        key={project.id}
        className={`bg-gray-800 border-2 ${accent.border} overflow-hidden hover-animate ${accent.hoverGlow}`}
      >
        <div className="h-48 bg-gray-700 relative">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={200}
            className="object-cover w-full h-full"
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
            onClick={() => setActiveProject(project)}
          >
            View Details
          </Button>
          {project.externalLink ? (
            <Button size="icon" variant="ghost" className="hover-scale" asChild>
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} in a new tab`}
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
          ) : (
            <Button size="icon" variant="ghost" className="hover-scale opacity-60" disabled>
              <ExternalLink className="h-5 w-5" />
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }

  const getProjectsForTab = (tab: "all" | ProjectCategory) =>
    tab === "all" ? projects : projects.filter((project) => project.categories.includes(tab))

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SeasonEffects season={activeSeason} />
      <SeasonIndicator activeSeason={activeSeason} seasons={SEASON_THEMES} nextSeason={nextSeason} />
      <div className="relative z-10 flex min-h-screen flex-col text-white [&_p]:text-shadow [&_h1]:text-shadow [&_h2]:text-shadow [&_h3]:text-shadow [&_span]:text-shadow">
        {/* Pixel art header decoration */}

      {/* Navigation */}
      <header className="container mx-auto px-4 py-6 z-10">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter pixel-text">
            BORIS_MOJSA
          </Link>
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
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center bg-transparent">
        <div className="relative mb-8 hover-scale">
          <div className="absolute inset-0 border-4 border-yellow-400 rounded-full transform translate-x-2 translate-y-2"></div>
          <div className="relative z-10 w-40 h-40 rounded-full overflow-hidden border-4 border-white">
            <Image
              src="/placeholder.svg?height=160&width=160"
              alt="Boris Mojsa"
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 pixel-text">
          <span className="text-yellow-400">BORIS</span>
          <span className="text-red-500">MOJSA</span>
        </h1>
        <p className="max-w-2xl text-xl mb-8">
          <span className="text-green-500 font-bold pixel-text">COMPUTER SCIENCE STUDENT</span> •{" "}
          <span className="text-red-500 font-bold pixel-text">TRACK & FIELD ATHLETE</span>
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge className="bg-yellow-400 text-black px-3 py-1 text-sm hover-scale">Python</Badge>
          <Badge className="bg-red-500 px-3 py-1 text-sm hover-scale">C++</Badge>
          <Badge className="bg-green-500 text-black px-3 py-1 text-sm hover-scale">Java</Badge>
          <Badge className="bg-blue-500 px-3 py-1 text-sm hover-scale">REST APIs</Badge>
          <Badge className="bg-purple-500 px-3 py-1 text-sm hover-scale">Flask</Badge>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-none border-b-4 border-yellow-600 hover:translate-y-1 transition-transform hover-scale">
            <a href="#projects" target="_blank" rel="noopener noreferrer">
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
        <div className="mt-16 grid grid-cols-5 gap-2">
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
            <div className="space-y-4 text-lg">
              <p>
                Hello! I'm Boris Mojsa, a Computer Science student at Chicago State University with a minor in
                Mathematics. I'm passionate about technology and track & field, bringing the same discipline and
                determination to both arenas.
              </p>
              <p>
                With a perfect 4.0 GPA, I balance rigorous academics with competitive athletics. My technical journey
                focuses on software development, data analysis, and algorithm optimization, while my athletic pursuits
                have earned me the TOEFL iBT Athletics Excellence Grant.
              </p>
              <p>
                I'm dedicated to using my technical skills to create innovative solutions that make a positive impact,
                whether through community-focused digital literacy initiatives or cutting-edge research projects.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <Badge className="bg-red-500 hover:bg-red-600">Problem Solver</Badge>
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Team Leader</Badge>
              <Badge className="bg-green-500 hover:bg-green-600">Athlete</Badge>
              <Badge className="bg-blue-500 hover:bg-blue-600">Developer</Badge>
              <Badge className="bg-purple-500 hover:bg-purple-600">Researcher</Badge>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 border-4 border-dashed border-green-400 transform rotate-3"></div>
            <div className="relative bg-gray-800 p-8 transform -rotate-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center hover-scale">
                  <BookOpen className="text-yellow-400 mb-2 h-8 w-8" />
                  <span className="text-sm">GPA</span>
                  <span className="text-xl font-bold">4.0/4.0</span>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center hover-scale">
                  <Trophy className="text-yellow-400 mb-2 h-8 w-8" />
                  <span className="text-sm">Honors</span>
                  <span className="text-xl font-bold">Dean's List</span>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center hover-scale">
                  <Cpu className="text-yellow-400 mb-2 h-8 w-8" />
                  <span className="text-sm">Tech Skills</span>
                  <span className="text-xl font-bold">10+ Languages</span>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center hover-scale">
                  <Award className="text-yellow-400 mb-2 h-8 w-8" />
                  <span className="text-sm">Scholarships</span>
                  <span className="text-xl font-bold">ComEd Scholar</span>
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

          <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl border-2 border-yellow-400 relative hover-animate hover-glow-yellow">
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
                <h3 className="text-2xl font-bold mb-2">Chicago State University</h3>
                <p className="text-yellow-400 mb-4">Bachelor of Science in Computer Science, Minor in Mathematics</p>
                <p className="text-gray-300 mb-2">Expected Graduation: May 2027</p>
                <p className="text-gray-300 mb-4">GPA: 4.0</p>

                <h4 className="font-bold text-lg mb-2 text-green-400">Honors & Awards</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>TOEFL iBT Athletics Excellence Grant</li>
                  <li>ComEd Scholar</li>
                  <li>Dean's List (Spring 2024)</li>
                </ul>

                <h4 className="font-bold text-lg mb-2 text-green-400">Relevant Coursework</h4>
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
                    Calculus 1
                  </Badge>
                  <Badge variant="outline" className="border-gray-500">
                    Calculus 2
                  </Badge>
                  <Badge variant="outline" className="border-gray-500">
                    Calculus 3
                  </Badge>
                </div>

                <div className="mt-6 flex items-center">
                  <div className="mr-4 text-yellow-400 font-bold">PROGRESS</div>
                  <div className="h-4 bg-gray-700 rounded-full flex-1">
                    <div className="h-full bg-gradient-to-r from-green-500 to-yellow-400 rounded-full w-1/4"></div>
                  </div>
                  <div className="ml-4 text-yellow-400 font-bold">25%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="container mx-auto px-4 py-20 bg-transparent">
        <h2 className="text-4xl font-bold mb-12 pixel-text text-red-400 text-center">EXPERIENCE & LEADERSHIP</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience 1 */}
          <Card className="bg-gray-800 border-2 border-red-500 overflow-hidden hover-animate hover-glow-red">
            <CardHeader className="bg-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-red-400">Student Digital Navigator</CardTitle>
                  <CardDescription>Chicago State University</CardDescription>
                </div>
                <Badge className="bg-green-500">Current</Badge>
              </div>
              <CardDescription className="text-gray-300">February 2024 - Present</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>
                    Conducted 20+ workshops and trained 150+ community members on essential technology skills while
                    distributing 400+ laptops
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>
                    Expanded digital inclusion by reaching 10+ neighborhoods and providing 150+ one-on-one training
                    sessions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>
                    Promoted digital literacy by engaging 2,000+ participants through outreach and training efforts
                  </span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-red-400 font-bold mr-2">XP GAINED:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-red-500 rounded-full w-4/5"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience 2 */}
          <Card className="bg-gray-800 border-2 border-yellow-500 overflow-hidden hover-animate hover-glow-yellow">
            <CardHeader className="bg-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-yellow-400">Team Leader</CardTitle>
                  <CardDescription>U.S. Department of Energy Cyber Force Competition</CardDescription>
                </div>
                <Badge className="bg-gray-500">2023</Badge>
              </div>
              <CardDescription className="text-gray-300">November 2023</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">→</span>
                  <span>Participated in a national cybersecurity event hosted by the Department of Energy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">→</span>
                  <span>
                    Gained foundational skills in network security, penetration testing, and incident response
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">→</span>
                  <span>Developed risk management expertise through hands-on projects and guided learning</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-yellow-400 font-bold mr-2">XP GAINED:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-yellow-500 rounded-full w-3/5"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience 3 */}
          <Card className="bg-gray-800 border-2 border-green-500 overflow-hidden hover-animate hover-glow-green">
            <CardHeader className="bg-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-green-400">Braven Accelerator Fellow</CardTitle>
                  <CardDescription>Chicago, Illinois</CardDescription>
                </div>
                <Badge className="bg-green-500">Current</Badge>
              </div>
              <CardDescription className="text-gray-300">January 2024 - Present</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>
                    Participating in a career development and leadership accelerator to enhance professional skills
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Developing networking abilities and problem-solving through team-based projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Completing workshops on communication, career planning, and data-driven decision-making</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-green-400 font-bold mr-2">XP GAINED:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-green-500 rounded-full w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience 4 */}
          <Card className="bg-gray-800 border-2 border-blue-500 overflow-hidden hover-animate hover-glow-blue">
            <CardHeader className="bg-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-blue-400">Youth for the Dialogue</CardTitle>
                  <CardDescription>UNDP & Ana and Vlade Divac Foundation</CardDescription>
                </div>
                <Badge className="bg-gray-500">2023</Badge>
              </div>
              <CardDescription className="text-gray-300">March 2023 - August 2023</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  <span>Led community engagement initiatives to promote youth inclusion and equality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  <span>
                    Organized discussions on social justice and policymaking, fostering active youth participation
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  <span>Implemented projects to strengthen dialogue between young people and local institutions</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-blue-400 font-bold mr-2">XP GAINED:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-blue-500 rounded-full w-3/4"></div>
                </div>
              </div>
            </CardContent>
          </Card>
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

        <Dialog open={Boolean(activeProject)} onOpenChange={(open) => (!open ? setActiveProject(null) : undefined)}>
          <DialogContent className="max-w-3xl border border-purple-500 bg-gray-900 text-white">
            {activeProject ? (
              <div className="space-y-6">
                <DialogHeader>
                  <DialogTitle className={`text-3xl font-bold ${accentStyles[activeProject.accent].dialogAccent}`}>
                    {activeProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-300">
                    {activeProject.subtitle}
                  </DialogDescription>
                </DialogHeader>

                <div className="relative h-48 w-full overflow-hidden rounded-md border border-gray-800">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    width={800}
                    height={320}
                    className="object-cover w-full h-full"
                  />
                </div>

                <p className="text-gray-200 leading-relaxed">{activeProject.longDescription}</p>

                {activeProject.highlights ? (
                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-purple-300">Highlights</h4>
                    <ul className="list-disc space-y-2 pl-5 text-gray-300">
                      {activeProject.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div>
                  <h4 className="mb-3 text-lg font-semibold text-purple-300">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className={accentStyles[activeProject.accent].badge}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-gray-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  {activeProject.externalLink ? (
                    <Button
                      asChild
                      variant="outline"
                      className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white hover-scale"
                    >
                      <a href={activeProject.externalLink} target="_blank" rel="noopener noreferrer">
                        Open Project <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <span className="text-sm text-gray-500">Project link coming soon.</span>
                  )}

                  <Button
                    onClick={() => setActiveProject(null)}
                    className="bg-purple-500 text-white hover:bg-purple-600 hover-scale"
                  >
                    Back to Portfolio
                  </Button>
                </div>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </section>

      {/* Track & Field Achievements */}
      <section id="achievements" className="container mx-auto px-4 py-20 bg-transparent">
        <h2 className="text-4xl font-bold mb-12 pixel-text text-yellow-400 text-center">TRACK & FIELD ACHIEVEMENTS</h2>

        <div className="relative">
          {/* Track field decoration */}
          <div className="absolute inset-0 bg-gray-800 rounded-xl overflow-hidden">
            <div className="h-full w-full bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-green-500/20"></div>
          </div>

          <div className="relative z-10 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/80 p-6 rounded-xl border-l-4 border-yellow-400 hover-animate hover-glow-yellow">
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

              <div className="bg-gray-800/80 p-6 rounded-xl border-l-4 border-green-500 hover-animate hover-glow-green">
                <div className="flex items-start gap-4">
                  <Trophy className="text-green-500 h-12 w-12 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Track & Field Team Member</h3>
                    <p className="text-gray-300 mb-4">Chicago State University</p>
                    <p className="text-sm text-gray-400">
                      Active member of the Chicago State University Track & Field team, representing the university in
                      collegiate competitions.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-green-500 font-bold">+350 XP</span>
                      <div className="ml-4 h-2 bg-gray-700 rounded-full flex-1 max-w-xs">
                        <div className="h-full bg-green-500 rounded-full w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/80 p-6 rounded-xl border-l-4 border-red-500 md:col-span-2 hover-animate hover-glow-red">
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
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 text-lg rounded-none border-b-4 border-yellow-600 hover:translate-y-1 transition-transform hover-scale">
                VIEW ATHLETIC PROFILE <ArrowRight className="ml-2" />
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
            <Card className="bg-gray-800 border-2 border-blue-500 hover-animate hover-glow-blue">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Cpu className="h-6 w-6 text-blue-400" />
                  <CardTitle className="text-xl text-blue-400">Programming Languages</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Python</span>
                      <span className="text-sm font-medium text-blue-400">90%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full w-[90%] progress-fill"></div>
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
                      <span className="text-sm font-medium text-blue-400">80%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full w-[80%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">JavaScript</span>
                      <span className="text-sm font-medium text-blue-400">75%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full w-[75%] progress-fill"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-2 border-green-500 hover-animate hover-glow-green">
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
                  <CardTitle className="text-xl text-green-400">Web Development</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Flask</span>
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
                      <span className="text-sm font-medium">HTML/CSS</span>
                      <span className="text-sm font-medium text-green-400">75%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-green-500 rounded-full w-[75%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Database Management</span>
                      <span className="text-sm font-medium text-green-400">70%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-green-500 rounded-full w-[70%] progress-fill"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-2 border-purple-500 hover-animate hover-glow-purple">
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
                  <CardTitle className="text-xl text-purple-400">Other Skills</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Data Analysis</span>
                      <span className="text-sm font-medium text-purple-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full w-[85%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cloud Computing</span>
                      <span className="text-sm font-medium text-purple-400">75%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full w-[75%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Agile Methodology</span>
                      <span className="text-sm font-medium text-purple-400">70%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full w-[70%] progress-fill"></div>
                    </div>
                  </div>
                  <div className="progress-bar-animate">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Testing & Troubleshooting</span>
                      <span className="text-sm font-medium text-purple-400">80%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full w-[80%] progress-fill"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Get In Touch</h3>
              <p className="mb-6 text-gray-300">
                Have a question or want to work together? Drop me a message and I'll get back to you as soon as
                possible!
              </p>

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

              <div className="mt-8">
                <h4 className="font-bold mb-2 text-yellow-400">Connect With Me:</h4>
                <div className="flex gap-4">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover-scale"
                  >
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
                      className="h-5 w-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover-scale"
                  >
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
                      className="h-5 w-5"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover-scale"
                  >
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
                      className="h-5 w-5"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-yellow-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover-scale"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-yellow-400">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover-scale"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-yellow-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover-scale"
                    placeholder="Enter your message"
                  />
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-none border-b-4 border-green-700 hover:translate-y-1 transition-transform hover-scale">
                  SEND MESSAGE
                </Button>
              </form>
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
    </div>
  </div>
  )
}
