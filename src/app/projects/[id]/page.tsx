"use client"

import { use } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DetailLayout } from "@/components/detail-layout"
import { cn } from "@/lib/utils"

type ProjectAccent = "green" | "blue" | "purple"

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  image: string
  accent: ProjectAccent
  categories: string[]
  technologies: string[]
  completionClass: string
  featured?: boolean
  highlights?: string[]
  externalLink?: string
}

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

const accentStyles: Record<ProjectAccent, {
  border: string
  title: string
  badge: string
  button: string
  progress: string
}> = {
  green: {
    border: "border-green-500",
    title: "text-green-400",
    badge: "border-green-500 text-green-500",
    button: "border-green-500 text-green-500 hover:bg-green-500 hover:text-black",
    progress: "bg-green-500",
  },
  blue: {
    border: "border-blue-500",
    title: "text-blue-400",
    badge: "border-blue-500 text-blue-500",
    button: "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    progress: "bg-blue-500",
  },
  purple: {
    border: "border-purple-500",
    title: "text-purple-400",
    badge: "border-purple-500 text-purple-500",
    button: "border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white",
    progress: "bg-purple-500",
  },
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <DetailLayout accentColor="yellow">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4 pixel-text text-red-400">PROJECT NOT FOUND</h1>
          <p className="text-gray-300 mb-8">The project you're looking for doesn't exist.</p>
          <Button asChild variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
            <a href="/">← Back to Portfolio</a>
          </Button>
        </div>
      </DetailLayout>
    )
  }

  const accent = accentStyles[project.accent]
  const accentColorMap: Record<ProjectAccent, string> = {
    green: "green",
    blue: "blue",
    purple: "purple",
  }

  return (
    <DetailLayout accentColor={accentColorMap[project.accent]}>
      <div className="max-w-4xl mx-auto text-white">
        {/* Header */}
        <div className="mb-8">
          {project.featured && (
            <Badge className="bg-yellow-400 text-black mb-4">Featured</Badge>
          )}
          <h1 className={`text-5xl md:text-6xl font-bold mb-4 pixel-text ${accent.title}`}>
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{project.subtitle}</p>
        </div>

        {/* Image */}
        <div className="relative h-96 md:h-[500px] w-full mb-8 rounded-lg overflow-hidden border-2 border-gray-700 bg-gray-800 isolate">
          <Image
            src={project.image}
            alt=""
            fill
            aria-hidden="true"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover scale-110 blur-sm opacity-60"
          />
          <div className="absolute inset-0 bg-gray-900/30"></div>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-contain z-10"
            style={{ objectPosition: 'center' }}
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">DESCRIPTION</h2>
          <p className="text-lg text-gray-200 leading-relaxed">{project.longDescription}</p>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">HIGHLIGHTS</h2>
            <ul className="space-y-3">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-200">
                  <span className={`${accent.title} font-bold mt-1`}>→</span>
                  <span className="text-lg">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">TECH STACK</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className={cn("text-base px-3 py-1", accent.badge)}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Completion */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">PROJECT STATUS</h2>
          <div className="flex items-center gap-4">
            <span className={`${accent.title} font-bold pixel-text`}>COMPLETION:</span>
            <div className="h-4 bg-gray-700 rounded-full flex-1 max-w-md">
              <div className={`h-full ${accent.progress} rounded-full ${project.completionClass}`}></div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-700">
          {project.externalLink ? (
            <Button
              asChild
              variant="outline"
              className={cn("font-bold px-6 py-3 rounded-none border-b-4 hover:translate-y-1 transition-transform hover-scale", accent.button)}
            >
              <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                Open Project <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ) : project.id === "airline-crew" ? (
            <Button
              asChild
              variant="outline"
              className={cn("font-bold px-6 py-3 rounded-none border-b-4 hover:translate-y-1 transition-transform hover-scale", accent.button)}
            >
              <a href="/Boris%20Mojsa%20rad.pdf" target="_blank" rel="noopener noreferrer">
                View Research Paper <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ) : project.id === "smartpet" ? (
            <Button
              asChild
              variant="outline"
              className={cn("font-bold px-6 py-3 rounded-none border-b-4 hover:translate-y-1 transition-transform hover-scale", accent.button)}
            >
              <a href="/smartpet-plus" target="_blank" rel="noopener noreferrer">
                Try SmartPet+ <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ) : (
            <div className="text-gray-400 italic">Project link coming soon.</div>
          )}
        </div>

        {/* Fun Facts Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-6 pixel-text text-yellow-400">DID YOU KNOW?</h2>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 space-y-4">
            {project.id === "smartpet" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-400 font-bold">🐾 Chicago Pet Stats:</span> Chicago is home to over 600,000 dogs and 300,000 cats, 
                  making it one of the most pet-friendly cities in America. Building SmartPet+ here means I'm helping a massive community of pet owners 
                  understand their furry friends better!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-400 font-bold">🤖 AI Fun Fact:</span> The name "Python" for the programming language comes from Monty Python's 
                  Flying Circus, not the snake! Guido van Rossum wanted a short, unique name. As someone who uses Python daily for AI projects like SmartPet+, 
                  I appreciate the humor in the language's origins.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-400 font-bold">⚡ Speed Matters:</span> Getting upload-to-story latency under one second was crucial. 
                  Studies show users abandon web pages if they take more than 3 seconds to load. By keeping SmartPet+ under 1 second, I'm ensuring 
                  pet owners get instant gratification—just like their pets do when they see their food bowl!
                </p>
              </>
            )}
            {project.id === "airline-crew" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">✈️ Aviation Insight:</span> The FAA requires pilots to have at least 10 hours of rest between 
                  shifts. My genetic algorithm project encoded these exact regulations into the fitness function, ensuring every generated schedule respects 
                  both safety and efficiency—something I learned is critical when lives are at stake.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">🧬 Algorithm Origins:</span> Genetic algorithms were inspired by Darwin's theory of evolution. 
                  Just like how I evolved from a student at Roosevelt to a Chicago State scholar-athlete, these algorithms evolve solutions through selection, 
                  crossover, and mutation. The 17% efficiency gain I achieved? That's evolution in action!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">📊 Optimization Reality:</span> Airline crew scheduling is one of the hardest optimization 
                  problems in operations research. There are more possible schedules than atoms in the observable universe! My genetic algorithm approach 
                  finds good solutions in this massive search space—similar to how I navigate balancing a 4.0 GPA, track & field, and community work.
                </p>
              </>
            )}
            {project.id === "portfolio" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-purple-400 font-bold">🎮 Retro Gaming Connection:</span> The pixel art aesthetic in this portfolio isn't just for looks—it's 
                  a nod to my love for classic games. Growing up, I spent hours playing 8-bit games, and now I'm building my career in tech. The retro style 
                  bridges my past passion with my present profession.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-purple-400 font-bold">🏙️ Chicago Tech Scene:</span> Chicago is home to over 4,000 tech companies and has one of the 
                  fastest-growing tech sectors in the U.S. Building this portfolio here connects me to a vibrant community of developers, data scientists, 
                  and innovators—many of whom appreciate the same retro aesthetic I've embraced.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-purple-400 font-bold">⚡ Next.js Power:</span> Next.js powers sites for companies like Netflix, TikTok, and Hulu. 
                  Using the same framework they use makes me feel like I'm part of something bigger—even as a student building a personal portfolio. 
                  Plus, the App Router I used here is the same tech that runs some of the world's most visited websites!
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </DetailLayout>
  )
}
