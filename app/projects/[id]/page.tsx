import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"

// Define the project data type
type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  features?: string[]
  challenges?: string[]
  learnings?: string[]
}

// Mock project data - in a real app, this would come from an API or CMS
const projects: Record<string, Project> = {
  "smartpet": {
    id: "smartpet",
    title: "SmartPet+",
    description: "AI-powered pet breed identification and story generation",
    longDescription: "A web application that uses machine learning to identify pet breeds from images and generates AI-powered stories about them. Built with Python, Flask, and Microsoft Azure Computer Vision API.",
    technologies: ["Python", "Flask", "Azure Computer Vision", "OpenAI GPT-3.5", "JavaScript"],
    demoUrl: "#",
    githubUrl: "#",
    features: [
      "Real-time pet breed identification from uploaded images",
      "AI-generated stories about identified pets",
      "Responsive design for all devices",
      "User authentication and image history"
    ],
    challenges: [
      "Optimizing image processing for various file types and sizes",
      "Improving breed identification accuracy",
      "Managing API rate limits"
    ],
    learnings: [
      "Integration of multiple AI services",
      "Performance optimization for ML models in production",
      "Building user-friendly interfaces for AI applications"
    ]
  },
  "portfolio": {
    id: "portfolio",
    title: "Personal Portfolio Website",
    description: "Interactive Developer Portfolio Website",
    longDescription: "A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS, featuring a terminal-style interface, interactive elements, and a retro gaming aesthetic. The site is deployed on Vercel and showcases my projects, skills, and experience.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "#",
    features: [
      "Terminal-style navigation interface",
      "Responsive design with mobile-first approach",
      "Interactive elements and animations",
      "Dark/light theme support"
    ],
    challenges: [
      "Creating a unique user experience with the terminal theme",
      "Optimizing performance for animations",
      "Ensuring accessibility with the unconventional UI"
    ],
    learnings: [
      "Advanced TypeScript patterns",
      "Performance optimization techniques",
      "Accessibility best practices"
    ]
  },
  "airline-scheduling": {
    id: "airline-scheduling",
    title: "Airline Crew Scheduling",
    description: "Optimization using Genetic Algorithms",
    longDescription: "A Python application that uses genetic algorithms to optimize airline crew scheduling, reducing operational costs while considering various constraints such as crew availability, flight schedules, and labor regulations.",
    technologies: ["Python", "NumPy", "Pandas", "Matplotlib", "Genetic Algorithm"],
    demoUrl: "#",
    githubUrl: "#",
    features: [
      "Genetic algorithm implementation for optimization",
      "Constraint handling for real-world scheduling problems",
      "Visualization of scheduling results",
      "Configurable parameters for different scenarios"
    ],
    challenges: [
      "Handling complex constraints in the optimization",
      "Preventing premature convergence in the genetic algorithm",
      "Optimizing performance for large datasets"
    ],
    learnings: [
      "Genetic algorithm design and implementation",
      "Optimization techniques",
      "Performance profiling and optimization"
    ]
  }
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects[params.id]

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-400 mb-4">404</h1>
          <p className="text-xl mb-6">Project not found</p>
          <Button asChild variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-black">
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <Link 
            href="/#projects" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </div>

        <div className="bg-gray-800/50 border-2 border-purple-500 rounded-lg p-6 md:p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 text-purple-400">{project.title}</h1>
              <p className="text-xl text-gray-300">{project.description}</p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              {project.demoUrl && (
                <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-black">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4 text-purple-400">About the Project</h2>
            <p className="text-lg">{project.longDescription}</p>
            
            {project.features && project.features.length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-8 mb-3 text-purple-400">Features</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
            
            {project.challenges && project.challenges.length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-8 mb-3 text-purple-400">Challenges</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </>
            )}
            
            {project.learnings && project.learnings.length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-8 mb-3 text-purple-400">Key Learnings</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {project.learnings.map((learning, index) => (
                    <li key={index}>{learning}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Like what you see? Check out my other projects or get in touch!
            </p>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-black">
                <Link href="/#projects">
                  View All Projects
                </Link>
              </Button>
              <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
                <Link href="/#contact">
                  Contact Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
