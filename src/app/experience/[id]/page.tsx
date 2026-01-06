"use client"

import { use } from "react"
import { Badge } from "@/components/ui/badge"
import { DetailLayout } from "@/components/detail-layout"

interface Experience {
  id: string
  title: string
  organization: string
  location: string
  dateRange: string
  status: string
  statusColor: string
  accent: string
  points: string[]
  xpGained: string
  xpProgress: string
}

const experiences: Experience[] = [
  {
    id: "mcdc-intern",
    title: "Incoming MCDC Data Science Intern",
    organization: "Scales Open Knowledge Network (SCALES-OKN)",
    location: "Chicago, Illinois",
    dateRange: "June 2025 – August 2025",
    status: "Incoming",
    statusColor: "bg-blue-500/80 text-white",
    accent: "blue",
    points: [
      "Selected for the DOE-backed MCDC internship focused on open climate data innovation.",
      "Training on knowledge graph tooling that powers the SCALES open knowledge network.",
      "Collaborating with faculty mentors to scope analytics pipelines using Python, SQL, and Azure.",
    ],
    xpGained: "XP LOADING:",
    xpProgress: "w-2/5",
  },
  {
    id: "digital-navigator",
    title: "Student Digital Navigator",
    organization: "Chicago State University",
    location: "Chicago, Illinois",
    dateRange: "February 2024 – August 2025",
    status: "2024-2025",
    statusColor: "bg-green-500",
    accent: "red",
    points: [
      "Improved digital access by distributing 400+ laptops and hotspots to residents across the city.",
      "Ran 20+ workshops and trained 150+ community members on essential productivity and safety skills.",
      "Scaled one-on-one coaching to 150+ sessions spanning 10+ neighborhoods, reaching 2,000+ participants.",
    ],
    xpGained: "XP GAINED:",
    xpProgress: "w-5/6",
  },
  {
    id: "comed-scholar",
    title: "Project Manager · ComEd Scholar",
    organization: "ComEd Future of Energy Scholar Program",
    location: "Chicago, Illinois",
    dateRange: "January 2025 – May 2025",
    status: "Spring 2025",
    statusColor: "bg-yellow-500/80 text-black",
    accent: "yellow",
    points: [
      "Co-led the four-person \"Endless Bio Cycle\" concept converting restaurant waste oil into ASTM-grade biodiesel.",
      "Modeled scenarios showing 43% diesel savings when repurposing in-house feedstock and 20% savings when purchasing oil.",
      "Pitched the operational and emissions impact to ComEd engineers, mentors, and peer scholars.",
    ],
    xpGained: "XP GAINED:",
    xpProgress: "w-4/5",
  },
  {
    id: "cyberforce",
    title: "Team Leader",
    organization: "U.S. Department of Energy CyberForce Competition",
    location: "Chicago, Illinois",
    dateRange: "November 2023",
    status: "Fall 2023",
    statusColor: "bg-purple-500/70",
    accent: "purple",
    points: [
      "Ranked within the top 10% of 100+ national teams safeguarding critical infrastructure simulations.",
      "Directed live incident response, penetration testing, and threat hunting under competition pressure.",
      "Strengthened zero-trust access models and red-team/blue-team coordination playbooks.",
    ],
    xpGained: "XP GAINED:",
    xpProgress: "w-3/4",
  },
  {
    id: "braven-researcher",
    title: "Lead Researcher",
    organization: "Braven Accelerator · Chicago State University",
    location: "Chicago, Illinois",
    dateRange: "January 2025 – May 2025",
    status: "Spring 2025",
    statusColor: "bg-green-500",
    accent: "green",
    points: [
      "Directed a five-member capstone team exploring outreach strategies for the Chicago Sky Foundation.",
      "Conducted 15 interviews and analyzed 50+ survey responses to spotlight three major awareness gaps.",
      "Designed the \"Skybound\" mentorship program projected to reach 200+ students and lift event turnout 50%.",
      "Presented findings to Braven leadership coaches, Chicago Sky Foundation representatives, and industry mentors.",
    ],
    xpGained: "XP GAINED:",
    xpProgress: "w-4/5",
  },
  {
    id: "youth-dialogue",
    title: "Youth for the Dialogue",
    organization: "UNDP & Ana and Vlade Divac Foundation",
    location: "Belgrade, Serbia",
    dateRange: "March 2023 – August 2023",
    status: "Summer 2023",
    statusColor: "bg-cyan-500/70 text-black",
    accent: "cyan",
    points: [
      "Led UNDP-backed community forums elevating youth voices in policymaking and social justice.",
      "Coordinated initiatives that strengthened trust between young residents and local institutions.",
      "Delivered inclusive programming that advanced civic engagement and intercultural dialogue.",
    ],
    xpGained: "XP GAINED:",
    xpProgress: "w-3/4",
  },
  {
    id: "m-opovo",
    title: "Co-Founder & Operations Manager",
    organization: "M Opovo",
    location: "Opovo, Serbia",
    dateRange: "May 2024 – Present",
    status: "2024-Present",
    statusColor: "bg-orange-500/80 text-white",
    accent: "orange",
    points: [
      "Managed end-to-end business operations and digital marketing, generating $50,000 annual revenue by implementing automated order tracking systems, email/SMS campaigns, social media content strategies, and analytics dashboards.",
      "Developed an e-commerce platform using Next.js and TypeScript (in development), automating order processing by building payment integrations, cart management systems, and inventory tracking workflows.",
      "Optimized marketing campaigns and sales operations, managing 3 tons of honey annually and having revenue growth by coordinating multi-channel marketing (email, SMS, social media), A/B testing content strategies, conversion rate analysis, and customer relationship management.",
    ],
    xpGained: "XP GAINED:",
    xpProgress: "w-full",
  },
]

const accentColors: Record<string, string> = {
  blue: "blue",
  red: "red",
  yellow: "yellow",
  purple: "purple",
  green: "green",
  cyan: "cyan",
  orange: "orange",
}

const accentStyles: Record<string, {
  title: string
  progress: string
  point: string
}> = {
  blue: {
    title: "text-blue-400",
    progress: "bg-blue-500",
    point: "text-blue-400",
  },
  red: {
    title: "text-red-400",
    progress: "bg-red-500",
    point: "text-red-400",
  },
  yellow: {
    title: "text-yellow-400",
    progress: "bg-yellow-500",
    point: "text-yellow-400",
  },
  purple: {
    title: "text-purple-400",
    progress: "bg-purple-500",
    point: "text-purple-400",
  },
  green: {
    title: "text-green-400",
    progress: "bg-green-500",
    point: "text-green-400",
  },
  cyan: {
    title: "text-cyan-300",
    progress: "bg-cyan-500",
    point: "text-cyan-300",
  },
  orange: {
    title: "text-orange-400",
    progress: "bg-orange-500",
    point: "text-orange-400",
  },
}

export default function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const experience = experiences.find((e) => e.id === id)

  if (!experience) {
    return (
      <DetailLayout accentColor="yellow">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4 pixel-text text-red-400">EXPERIENCE NOT FOUND</h1>
          <p className="text-gray-300 mb-8">The experience you're looking for doesn't exist.</p>
        </div>
      </DetailLayout>
    )
  }

  const accent = accentStyles[experience.accent]

  return (
    <DetailLayout accentColor={accentColors[experience.accent] || "yellow"}>
      <div className="max-w-4xl mx-auto text-white">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <h1 className={`text-5xl md:text-6xl font-bold mb-4 pixel-text ${accent.title}`}>
              {experience.title}
            </h1>
            <p className="text-xl text-gray-300 mb-2">{experience.organization}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-gray-300">
            <span>{experience.dateRange}</span>
            <span>•</span>
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Key Responsibilities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">KEY RESPONSIBILITIES</h2>
          <ul className="space-y-4">
            {experience.points.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-200">
                <span className={`${accent.point} font-bold mt-1`}>→</span>
                <span className="text-lg">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* XP Progress */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">EXPERIENCE GAINED</h2>
          <div className="flex items-center gap-4">
            <span className={`${accent.title} font-bold pixel-text`}>{experience.xpGained}</span>
            <div className="h-4 bg-gray-700 rounded-full flex-1 max-w-md">
              <div className={`h-full ${accent.progress} rounded-full ${experience.xpProgress}`}></div>
            </div>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-6 pixel-text text-yellow-400">DID YOU KNOW?</h2>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 space-y-4">
            {experience.id === "mcdc-intern" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">🌍 Climate Data Impact:</span> The SCALES-OKN network I'll be working with is part of a 
                  Department of Energy initiative to make climate data more accessible. Chicago, where I'm based, has committed to 100% renewable energy 
                  by 2035—so the work I'll do here directly impacts my own city's future!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">📊 Data Science in Chicago:</span> Chicago is becoming a major hub for data science, with 
                  companies like Google, Microsoft, and Amazon expanding their data operations here. Starting my data science career in Chicago means 
                  I'm at the epicenter of the industry's growth.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">🎓 MCDC Program:</span> The MCDC (Modeling, Computing, and Data for Climate) program is 
                  specifically designed to train the next generation of climate data scientists. Being selected means I'm part of an elite group working 
                  on one of humanity's biggest challenges—climate change.
                </p>
              </>
            )}
            {experience.id === "digital-navigator" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-red-400 font-bold">💻 Digital Divide Reality:</span> In Chicago, over 200,000 households lack reliable internet 
                  access. The 400+ devices I've distributed represent real families getting connected for the first time. That's more devices than the 
                  population of some small towns!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-red-400 font-bold">🏘️ Chicago Neighborhoods:</span> I've worked across 10+ neighborhoods, from Englewood to 
                  Pilsen. Each community has unique needs, and the 2,000+ participants I've reached represent the diversity that makes Chicago special. 
                  It's like running a marathon—you need endurance, which I've built through track & field!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-red-400 font-bold">📚 Teaching Impact:</span> Training 150+ community members means I've essentially taught a 
                  small college's worth of people. Studies show that teaching others is one of the best ways to learn—which explains why I've maintained 
                  my 4.0 GPA while doing this work!
                </p>
              </>
            )}
            {experience.id === "comed-scholar" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">⚡ Energy Innovation:</span> ComEd serves over 4 million customers in northern Illinois. 
                  Our "Endless Bio Cycle" project could potentially impact thousands of restaurants in Chicago alone. The 43% diesel savings we calculated? 
                  That's like removing hundreds of cars from Chicago's streets every year!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">🌱 Sustainability in Chicago:</span> Chicago has over 7,000 restaurants. If even 10% 
                  adopted our biodiesel concept, we'd be converting thousands of gallons of waste oil into clean energy monthly. As someone who balances 
                  academics and athletics, I understand efficiency—and this project is all about efficient resource use!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">🎯 ComEd Scholars:</span> The ComEd Future of Energy Scholar Program selects only a 
                  handful of students each year. Being chosen meant I was working alongside some of Chicago's brightest minds on real-world energy 
                  challenges—the kind of experience that prepares you for a data science career focused on sustainability.
                </p>
              </>
            )}
            {experience.id === "cyberforce" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-purple-400 font-bold">🛡️ Cyber Competition Scale:</span> The DOE CyberForce Competition is one of the largest 
                  cybersecurity competitions in the U.S., with 100+ teams from universities nationwide. Ranking in the top 10% meant we outperformed 
                  90+ other teams—a feat that requires the same mental focus I use in track & field competitions!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-purple-400 font-bold">⚡ Critical Infrastructure:</span> The competition simulates attacks on power grids, water 
                  systems, and other critical infrastructure. As a Chicago resident, I know how important these systems are—when they fail, entire cities 
                  are affected. Protecting them is like protecting the finish line in a race!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-purple-400 font-bold">🎯 Team Leadership:</span> Leading a cybersecurity team under competition pressure is like 
                  being the anchor in a relay race—everyone depends on you, and the stakes are high. The zero-trust models we implemented are now used 
                  by major corporations, showing that student competitions can produce real-world solutions.
                </p>
              </>
            )}
            {experience.id === "braven-researcher" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-400 font-bold">🏀 Chicago Sky Connection:</span> The Chicago Sky is a WNBA team that's won a championship 
                  and represents excellence in women's sports. Our "Skybound" mentorship program aims to reach 200+ students—that's like filling an entire 
                  section of the Wintrust Arena where the Sky plays!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-400 font-bold">📊 Research Impact:</span> Conducting 15 interviews and analyzing 50+ surveys taught me that 
                  good research is like good code—you need clean data, proper analysis, and clear presentation. The three awareness gaps we identified are 
                  now being addressed by the Chicago Sky Foundation, showing that student research can drive real change.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-400 font-bold">🎓 Braven Accelerator:</span> Braven works with students from underrepresented backgrounds 
                  to help them launch strong careers. As someone who's navigated the transition from Roosevelt to Chicago State while maintaining a 4.0 GPA, 
                  I understand the challenges—and the opportunities—that come with being a first-generation or underrepresented student.
                </p>
              </>
            )}
            {experience.id === "youth-dialogue" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-cyan-300 font-bold">🇷🇸 Belgrade Connection:</span> Belgrade, where I worked with Youth for the Dialogue, is 
                  Serbia's capital and home to over 1.6 million people. Working there gave me a global perspective on youth engagement that I now apply 
                  to my work in Chicago—two cities, one mission: empowering young people.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-cyan-300 font-bold">🌍 UNDP Impact:</span> The United Nations Development Programme (UNDP) operates in 170+ countries. 
                  Being part of a UNDP-backed initiative meant I was contributing to a global movement for youth empowerment. The skills I learned there—facilitation, 
                  community organizing, policy advocacy—are the same skills I use now as a Digital Navigator in Chicago.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-cyan-300 font-bold">🤝 Cross-Cultural Skills:</span> Working in Belgrade taught me how to bridge cultural differences 
                  and find common ground. These skills are invaluable in Chicago, one of America's most diverse cities, where I work with communities from 
                  all over the world. It's like learning to run on different track surfaces—adaptability is key!
                </p>
              </>
            )}
            {experience.id === "m-opovo" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-orange-400 font-bold">🍯 Honey Business Scale:</span> Managing 3 tons of honey annually is like handling 6,000 pounds 
                  of pure gold! That's enough honey to fill over 4,000 standard jars. The logistics of sourcing, processing, and distributing this volume 
                  while maintaining quality taught me operations management in a way that textbooks never could.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-orange-400 font-bold">💻 Tech Meets Agriculture:</span> Building an e-commerce platform for a traditional business 
                  like honey production is where my computer science skills meet real-world entrepreneurship. Using Next.js and TypeScript to automate order 
                  processing means I'm applying the same technologies I use in my data science projects to solve business problems.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-orange-400 font-bold">📈 Revenue Growth:</span> Generating $50,000 in annual revenue as a co-founder while being a 
                  full-time student and athlete demonstrates the same discipline and time management I bring to track & field. It's like running multiple races 
                  simultaneously—you need strategy, endurance, and the ability to adapt quickly.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-orange-400 font-bold">🌍 Serbia to Chicago:</span> Running a business in Opovo, Serbia while studying in Chicago shows 
                  my ability to manage operations across time zones and cultures. This global perspective, combined with my technical skills, makes me uniquely 
                  positioned to work in international tech environments.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </DetailLayout>
  )
}

