"use client"

import { use } from "react"
import { Cpu } from "lucide-react"
import { DetailLayout } from "@/components/detail-layout"

interface Skill {
  id: string
  title: string
  icon: string
  accent: string
  skills: Array<{ name: string; percentage: string }>
}

const skillCategories: Skill[] = [
  {
    id: "languages-data",
    title: "Languages & Data",
    icon: "cpu",
    accent: "blue",
    skills: [
      { name: "Python", percentage: "95%" },
      { name: "C++", percentage: "85%" },
      { name: "Java", percentage: "85%" },
      { name: "SQL", percentage: "85%" },
    ],
  },
  {
    id: "cloud-platforms",
    title: "Cloud & Platforms",
    icon: "server",
    accent: "green",
    skills: [
      { name: "Microsoft Azure", percentage: "85%" },
      { name: "REST APIs", percentage: "80%" },
      { name: "Flask & FastAPI", percentage: "82%" },
      { name: "Power BI & Tableau", percentage: "78%" },
    ],
  },
  {
    id: "ai-delivery",
    title: "AI & Delivery",
    icon: "grid",
    accent: "purple",
    skills: [
      { name: "Machine Learning", percentage: "85%" },
      { name: "Generative AI", percentage: "80%" },
      { name: "Agile & SDLC", percentage: "80%" },
      { name: "CI/CD & Testing", percentage: "78%" },
    ],
  },
]

const accentColors: Record<string, string> = {
  blue: "blue",
  green: "green",
  purple: "purple",
}

const accentStyles: Record<string, {
  title: string
  progress: string
  percentage: string
}> = {
  blue: {
    title: "text-blue-400",
    progress: "bg-blue-500",
    percentage: "text-blue-400",
  },
  green: {
    title: "text-green-400",
    progress: "bg-green-500",
    percentage: "text-green-400",
  },
  purple: {
    title: "text-purple-400",
    progress: "bg-purple-500",
    percentage: "text-purple-400",
  },
}

export default function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const skillCategory = skillCategories.find((s) => s.id === id)

  if (!skillCategory) {
    return (
      <DetailLayout accentColor="yellow">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4 pixel-text text-red-400">SKILL CATEGORY NOT FOUND</h1>
          <p className="text-gray-300 mb-8">The skill category you're looking for doesn't exist.</p>
        </div>
      </DetailLayout>
    )
  }

  const accent = accentStyles[skillCategory.accent]

  return (
    <DetailLayout accentColor={accentColors[skillCategory.accent] || "yellow"}>
      <div className="max-w-4xl mx-auto text-white">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
              <Cpu className={`h-8 w-8 ${accent.title}`} />
            </div>
            <div>
              <h1 className={`text-5xl md:text-6xl font-bold mb-2 pixel-text ${accent.title}`}>
                {skillCategory.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Skills List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 pixel-text text-yellow-400">SKILL BREAKDOWN</h2>
          <div className="space-y-6">
            {skillCategory.skills.map((skill) => {
              const percentageNum = parseInt(skill.percentage)
              return (
                <div key={skill.name} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                    <span className={`${accent.percentage} font-bold pixel-text`}>{skill.percentage}</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full">
                    <div
                      className={`h-full ${accent.progress} rounded-full transition-all duration-500`}
                      style={{ width: skill.percentage }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">SUMMARY</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            This category represents my proficiency in {skillCategory.title.toLowerCase()}. Each skill is rated based on
            hands-on experience, project implementation, and continuous learning. These metrics reflect my current
            expertise and commitment to staying current with industry best practices.
          </p>
        </div>

        {/* Fun Facts Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-6 pixel-text text-yellow-400">DID YOU KNOW?</h2>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 space-y-4">
            {skillCategory.id === "languages-data" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">🐍 Python Power:</span> Python is named after Monty Python, not the snake! Guido van Rossum 
                  wanted a short, unique name. I use Python daily for projects like SmartPet+ and my upcoming data science work. At 95% proficiency, 
                  I'm fluent in the language that powers everything from Instagram to NASA's space missions!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">💾 SQL Everywhere:</span> SQL (Structured Query Language) has been around since the 1970s and 
                  is still the standard for database queries. Every major tech company uses it—Google, Facebook, Amazon. As I prepare for my MCDC Data Science 
                  Internship, SQL will be crucial for analyzing climate data. It's like the universal language of data!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">⚡ C++ Speed:</span> C++ is used in everything from game engines to operating systems because 
                  it's incredibly fast. Learning C++ taught me about memory management and performance optimization—skills that help me write efficient Python 
                  code even when I'm not using C++ directly. It's like training with weights to get faster on the track!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">☕ Java's Reach:</span> Java runs on over 3 billion devices worldwide. From Android apps to 
                  enterprise systems, Java is everywhere. Learning Java gave me a solid foundation in object-oriented programming that I now apply to all my 
                  projects, including my portfolio website built with TypeScript (which has similar concepts)!
                </p>
              </>
            )}
            {skillCategory.id === "cloud-platforms" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-400 font-bold">☁️ Azure in Chicago:</span> Microsoft Azure has major data centers in Chicago, making it 
                  the perfect cloud platform for someone based here. The low latency means my projects (like SmartPet+) can serve Chicago users incredibly 
                  fast. It's like having a home-field advantage in cloud computing!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-400 font-bold">🌐 REST API Reality:</span> REST APIs power the modern web. Every time you use Instagram, 
                  Twitter, or any app, you're using REST APIs. At 80% proficiency, I can build APIs that connect different systems—like connecting Azure 
                  Vision to Flask to OpenAI in SmartPet+. It's all about making different technologies work together!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-400 font-bold">⚡ Flask & FastAPI:</span> Flask is lightweight and perfect for rapid prototyping (like 
                  SmartPet+), while FastAPI is built for high-performance APIs. Using both gives me flexibility—I can build quickly with Flask or scale 
                  with FastAPI. It's like having both sprint speed and endurance in track!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-400 font-bold">📊 Data Visualization:</span> Power BI and Tableau help turn raw data into insights. As a 
                  data science intern-in-training, visualization is crucial for communicating findings. The dashboards I built for my airline crew scheduling 
                  project used similar principles—turning complex optimization results into clear visuals for decision-makers.
                </p>
              </>
            )}
            {skillCategory.id === "ai-delivery" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-purple-400 font-bold">🤖 Machine Learning Journey:</span> Machine learning is everywhere—from Netflix recommendations 
                  to self-driving cars. My 85% proficiency comes from projects like SmartPet+ where I tuned datasets for breed detection and implemented 
                  GPT-4o mini for story generation. It's the same technology that powers ChatGPT, but I'm using it to help pet owners!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-purple-400 font-bold">✨ Generative AI Revolution:</span> Generative AI is transforming industries. I'm using it 
                  in SmartPet+ to create personalized pet stories, but the same technology is being used for drug discovery, content creation, and scientific 
                  research. Being at 80% proficiency means I'm ready to contribute to this AI revolution!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-purple-400 font-bold">🔄 Agile & SDLC:</span> Agile methodology emphasizes iterative development and collaboration—principles 
                  I use daily. Whether I'm working on a ComEd Scholar project with a four-person team or leading research with Braven, I apply Agile principles. 
                  It's like training for a relay race: everyone needs to be in sync, and you iterate to improve!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-purple-400 font-bold">🚀 CI/CD & Testing:</span> Continuous Integration and Continuous Deployment (CI/CD) ensure code 
                  quality and rapid deployment. At 78% proficiency, I understand the importance of automated testing—it's like having a coach review your 
                  form before every race. Good practices prevent problems before they happen!
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </DetailLayout>
  )
}

