import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"

// Define the experience data type
type Experience = {
  id: string
  title: string
  company: string
  period: string
  isCurrent: boolean
  description: string
  responsibilities: string[]
  achievements: string[]
  skills: string[]
  xp: number
  color: string
}

// Mock experience data - in a real app, this would come from an API or CMS
const experiences: Record<string, Experience> = {
  "comed-scholar": {
    id: "comed-scholar",
    title: "Project Manager",
    company: "ComEd Future of Energy Scholar",
    period: "January 2025 - May 2025",
    isCurrent: false,
    description: "Led a team in developing sustainable energy solutions as part of the ComEd Future of Energy Scholars program, focusing on innovative approaches to energy efficiency and renewable resources.",
    responsibilities: [
      "Designed the \"Endless Bio Cycle\" concept with a 4-person team",
      "Created detailed project plans and timelines for concept development",
      "Coordinated team meetings and delegated tasks effectively",
      "Prepared and delivered presentations to stakeholders"
    ],
    achievements: [
      "Outlined an on-site unit that turns restaurant waste oil into ASTM-grade biodiesel",
      "Built a cost model showing 43% reduction in diesel spending",
      "Presented to ComEd engineers, demonstrating potential to supply ~10% of a restaurant's power needs"
    ],
    skills: ["Project Management", "Team Leadership", "Renewable Energy", "Cost Analysis", "Presentation Skills"],
    xp: 85,
    color: "yellow"
  },
  "digital-navigator": {
    id: "digital-navigator",
    title: "Student Digital Navigator",
    company: "Chicago State University",
    period: "February 2024 - Present",
    isCurrent: true,
    description: "Working to bridge the digital divide by providing technology resources and training to community members, ensuring equal access to digital tools and knowledge.",
    responsibilities: [
      "Distribute laptops and digital devices to community members in need",
      "Conduct digital literacy workshops and training sessions",
      "Provide one-on-one technology assistance",
      "Maintain records of device distribution and training sessions"
    ],
    achievements: [
      "Distributed over 400+ laptops to individuals in need",
      "Conducted 20+ workshops, training over 150+ community members",
      "Expanded digital inclusion to 10+ neighborhoods"
    ],
    skills: ["Digital Literacy", "Community Outreach", "Workshop Facilitation", "Technical Support", "Communication"],
    xp: 75,
    color: "red"
  },
  "cyber-force": {
    id: "cyber-force",
    title: "Team Leader",
    company: "U.S. Department of Energy CyberForce Competition",
    period: "November 2023",
    isCurrent: false,
    description: "Led a team in a national cybersecurity competition focused on protecting critical energy infrastructure, applying technical skills in a high-pressure environment.",
    responsibilities: [
      "Organized and led team preparation sessions",
      "Assigned roles based on team members' strengths",
      "Coordinated communication during the competition",
      "Ensured team remained focused and on-task"
    ],
    achievements: [
      "Led team to a strong performance in the national competition",
      "Successfully defended critical infrastructure systems",
      "Gained hands-on experience with cybersecurity tools and techniques"
    ],
    skills: ["Cybersecurity", "Team Leadership", "Incident Response", "Network Security", "Problem Solving"],
    xp: 90,
    color: "blue"
  },
  "braven-accelerator": {
    id: "braven-accelerator",
    title: "Lead Researcher",
    company: "Braven Accelerator",
    period: "September 2023 - December 2023",
    isCurrent: false,
    description: "Conducted in-depth research on emerging technologies and their applications in solving real-world problems as part of the Braven Accelerator program.",
    responsibilities: [
      "Designed and implemented research methodologies",
      "Collected and analyzed data on technology trends",
      "Prepared detailed reports and presentations",
      "Collaborated with team members on findings"
    ],
    achievements: [
      "Published research on applications of AI in healthcare",
      "Presented findings to industry professionals",
      "Developed recommendations for technology implementation"
    ],
    skills: ["Research", "Data Analysis", "Technical Writing", "Presentation", "Emerging Technologies"],
    xp: 80,
    color: "green"
  },
  "youth-for-the-dialogue": {
    id: "youth-for-the-dialogue",
    title: "Youth Representative & Community Leader",
    company: "Youth for the Dialogue in the Local Community",
    period: "2019 - 2023",
    isCurrent: false,
    description: "Dedicated youth leader focused on fostering community development, social inclusion, and cross-cultural dialogue through various initiatives and programs in collaboration with local organizations.",
    responsibilities: [
      "Founded and led Youth for the Dialogue, an organization promoting understanding among diverse communities",
      "Organized and moderated panel discussions, workshops, and cultural exchange programs",
      "Represented youth interests as a Youth Representative for the Ana and Vlade Divac Foundation",
      "Developed and implemented community projects addressing local needs",
      "Built partnerships with 5+ local and international organizations"
    ],
    achievements: [
      "Successfully organized 15+ community events engaging 600+ participants",
      "Led a team of volunteers in executing impactful community initiatives",
      "Developed and implemented a community project benefiting 100+ people",
      "Created a sustainable platform for youth engagement and cross-cultural dialogue",
      "Established partnerships that expanded the organization's reach and impact"
    ],
    skills: [
      "Leadership", 
      "Community Development", 
      "Public Speaking", 
      "Event Planning", 
      "Team Management",
      "Project Management",
      "Cross-cultural Communication",
      "Partnership Building"
    ],
    xp: 90,
    color: "purple"
  }
}

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const experience = experiences[params.id]

  if (!experience) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-400 mb-4">404</h1>
          <p className="text-xl mb-6">Experience not found</p>
          <Button asChild variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-black">
            <Link href="/#experience">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Experience
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const colorClasses = {
    yellow: {
      border: 'border-yellow-500',
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-400',
      button: 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black',
      progress: 'bg-yellow-500'
    },
    red: {
      border: 'border-red-500',
      bg: 'bg-red-500/10',
      text: 'text-red-400',
      button: 'border-red-500 text-red-500 hover:bg-red-500 hover:text-black',
      progress: 'bg-red-500'
    },
    blue: {
      border: 'border-blue-500',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      button: 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
      progress: 'bg-blue-500'
    },
    green: {
      border: 'border-green-500',
      bg: 'bg-green-500/10',
      text: 'text-green-400',
      button: 'border-green-500 text-green-500 hover:bg-green-500 hover:text-black',
      progress: 'bg-green-500'
    }
  }

  const colors = colorClasses[experience.color as keyof typeof colorClasses] || colorClasses.yellow

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <Link 
            href="/#experience" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Experience
          </Link>
        </div>

        <div className={`bg-gray-800/50 ${colors.border} rounded-lg p-6 md:p-8 backdrop-blur-sm`}>
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 ${colors.text}">{experience.title}</h1>
              <p className="text-2xl text-gray-300 mb-4">{experience.company}</p>
              <div className="flex items-center mb-6">
                <span className="px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}">
                  {experience.period}
                </span>
                {experience.isCurrent && (
                  <span className="ml-3 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                    Current Role
                  </span>
                )}
              </div>
              
              <p className="text-lg text-gray-300 mb-6">{experience.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {experience.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className={`px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Key Responsibilities</h3>
              <ul className="space-y-3">
                {experience.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-1">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">Achievements</h3>
              <ul className="space-y-3">
                {experience.achievements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">Experience Gained</h3>
            <div className="flex items-center">
              <span className="font-mono text-purple-400 mr-4">XP: {experience.xp}/100</span>
              <div className="h-4 bg-gray-700 rounded-full flex-1">
                <div 
                  className={`h-full ${colors.progress} rounded-full`}
                  style={{ width: `${experience.xp}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center sm:text-left">
                Want to learn more about my professional journey?
              </p>
              <div className="flex gap-3">
                <Button asChild variant="outline" className={colors.button}>
                  <Link href="/#experience">
                    View All Experience
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
    </div>
  )
}
