"use client"

import { use } from "react"
import { Medal, Trophy } from "lucide-react"
import { DetailLayout } from "@/components/detail-layout"

interface Achievement {
  id: string
  title: string
  organization: string
  description: string
  xp: string
  xpProgress: string
  accent: string
  icon: "medal" | "trophy"
  skills?: Array<{ name: string; value: string; color: string }>
}

const achievements: Achievement[] = [
  {
    id: "toefl-grant",
    title: "TOEFL iBT Athletics Excellence Grant",
    organization: "Chicago State University",
    description:
      "Awarded the TOEFL iBT Athletics Excellence Grant in recognition of outstanding athletic performance and academic achievement.",
    xp: "+500 XP",
    xpProgress: "w-4/5",
    accent: "yellow",
    icon: "medal",
  },
  {
    id: "ncaa-athlete",
    title: "NCAA Division I & II Athlete",
    organization: "Chicago State University & Roosevelt University",
    description:
      "Competing at the highest levels of collegiate athletics, representing both Chicago State University (NCAA Division I) and Roosevelt University (NCAA Division II). This dual experience showcases my ability to excel across different competitive environments and adapt to varying levels of competition. As a Division I athlete at Chicago State, I compete against the nation's top collegiate programs, while my Division II experience at Roosevelt University provided foundational training and competitive opportunities that shaped my athletic development.",
    xp: "+400 XP",
    xpProgress: "w-4/5",
    accent: "blue",
    icon: "trophy",
  },
  {
    id: "serbia-national",
    title: "Serbia National Team Member",
    organization: "Serbia Athletics",
    description:
      "Representing Serbia on the international stage as a member of the national track & field team. Competing for my home country brings immense pride and responsibility, as I represent Serbian athletics in international competitions. This honor reflects years of dedication to the sport and recognition of my performance at the highest levels. Being part of the national team means training alongside Serbia's elite athletes and competing in events that showcase the best of Serbian track & field talent on the world stage.",
    xp: "+450 XP",
    xpProgress: "w-4/5",
    accent: "green",
    icon: "trophy",
  },
  {
    id: "athletic-skills",
    title: "Athletic Skills & Attributes",
    organization: "Chicago State University",
    description:
      "Comprehensive athletic profile showcasing key performance metrics and training achievements across multiple disciplines.",
    xp: "+1000 XP",
    xpProgress: "w-full",
    accent: "red",
    icon: "trophy",
    skills: [
      { name: "Speed", value: "w-4/5", color: "bg-red-500" },
      { name: "Endurance", value: "w-3/4", color: "bg-yellow-500" },
      { name: "Technique", value: "w-4/5", color: "bg-green-500" },
      { name: "Strength", value: "w-3/5", color: "bg-blue-500" },
      { name: "Agility", value: "w-4/5", color: "bg-purple-500" },
      { name: "Mental Focus", value: "w-full", color: "bg-pink-500" },
    ],
  },
]

const accentColors: Record<string, string> = {
  yellow: "yellow",
  green: "green",
  red: "red",
  blue: "blue",
}

const accentStyles: Record<string, {
  title: string
  progress: string
  xp: string
}> = {
  yellow: {
    title: "text-yellow-400",
    progress: "bg-yellow-400",
    xp: "text-yellow-400",
  },
  green: {
    title: "text-green-500",
    progress: "bg-green-500",
    xp: "text-green-500",
  },
  red: {
    title: "text-red-500",
    progress: "bg-red-500",
    xp: "text-red-500",
  },
  blue: {
    title: "text-blue-400",
    progress: "bg-blue-500",
    xp: "text-blue-400",
  },
}

export default function AchievementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const achievement = achievements.find((a) => a.id === id)

  if (!achievement) {
    return (
      <DetailLayout accentColor="yellow">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4 pixel-text text-red-400">ACHIEVEMENT NOT FOUND</h1>
          <p className="text-gray-300 mb-8">The achievement you're looking for doesn't exist.</p>
        </div>
      </DetailLayout>
    )
  }

  const accent = accentStyles[achievement.accent]
  const IconComponent = achievement.icon === "medal" ? Medal : Trophy

  return (
    <DetailLayout accentColor={accentColors[achievement.accent] || "yellow"}>
      <div className="max-w-4xl mx-auto text-white">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
              <IconComponent className={`h-8 w-8 ${accent.title}`} />
            </div>
            <div>
              <h1 className={`text-5xl md:text-6xl font-bold mb-2 pixel-text ${accent.title}`}>
                {achievement.title}
              </h1>
              <p className="text-xl text-gray-300">{achievement.organization}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">DESCRIPTION</h2>
          <p className="text-lg text-gray-200 leading-relaxed">{achievement.description}</p>
        </div>

        {/* XP Progress */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">EXPERIENCE GAINED</h2>
          <div className="flex items-center gap-4">
            <span className={`${accent.xp} font-bold pixel-text`}>{achievement.xp}</span>
            <div className="h-4 bg-gray-700 rounded-full flex-1 max-w-md">
              <div className={`h-full ${accent.progress} rounded-full ${achievement.xpProgress}`}></div>
            </div>
          </div>
        </div>

        {/* Skills */}
        {achievement.skills && achievement.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">SKILL METRICS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievement.skills.map((skill) => (
                <div key={skill.name} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-white">{skill.name}</h3>
                  </div>
                  <div className="h-4 bg-gray-700 rounded-full">
                    <div className={`h-full ${skill.color} rounded-full ${skill.value}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fun Facts Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-6 pixel-text text-yellow-400">DID YOU KNOW?</h2>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 space-y-4">
            {achievement.id === "toefl-grant" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">🏆 TOEFL Excellence:</span> The TOEFL iBT Athletics Excellence Grant recognizes students 
                  who excel both academically and athletically. Being awarded this grant means I'm part of an elite group of scholar-athletes who prove 
                  that you don't have to choose between sports and academics—you can excel at both!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">🌍 International Recognition:</span> TOEFL (Test of English as a Foreign Language) is taken 
                  by millions of students worldwide. The fact that I received an athletics excellence grant shows that my track & field achievements are 
                  recognized on an international scale—even though I'm competing in Chicago!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">💪 Dual Excellence:</span> Balancing a 4.0 GPA with Division I athletics is like running 
                  two races simultaneously. The discipline required for both is immense, but the rewards—like this grant—make it all worth it. Plus, the 
                  mental toughness I've developed in track helps me tackle complex coding problems!
                </p>
              </>
            )}
            {achievement.id === "ncaa-athlete" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">🏆 Dual Division Experience:</span> Competing in both NCAA Division I and Division II is 
                  relatively rare and demonstrates exceptional versatility. Division I represents the pinnacle of collegiate athletics with the most 
                  competitive programs, while Division II offers a different competitive environment. My experience across both divisions has taught me 
                  to adapt quickly to different levels of competition—a skill that translates directly to my academic and professional work!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">⚡ Chicago State Division I:</span> Chicago State University competes in the NCAA Division I, 
                  the highest level of collegiate athletics. As a Division I athlete, I'm racing against some of the best athletes in the country, including 
                  future Olympians and professional athletes. The intensity and competition level here is unmatched, pushing me to perform at my absolute best.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">📚 Roosevelt Division II Foundation:</span> My time at Roosevelt University in Division II 
                  provided crucial foundational training and competitive experience. Division II athletics emphasize the balance between academics and athletics, 
                  which perfectly aligned with my goal of maintaining a 4.0 GPA while competing. This foundation prepared me for the increased demands of 
                  Division I competition.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-blue-400 font-bold">🎯 Transfer Success:</span> Successfully transitioning from Division II to Division I athletics 
                  while maintaining academic excellence demonstrates resilience and adaptability. Just like transferring between universities, I had to adapt 
                  to new training methods, higher competition levels, and increased expectations—all while keeping my grades perfect!
                </p>
              </>
            )}
            {achievement.id === "serbia-national" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-500 font-bold">🇷🇸 National Pride:</span> Representing Serbia on the international stage is one of the 
                  highest honors in athletics. Serbia has a rich track & field tradition, and being selected for the national team means I'm among the 
                  country's elite athletes. This recognition reflects years of dedication, training, and competitive excellence.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-500 font-bold">🌍 International Competition:</span> As a member of the Serbia National Team, I compete in 
                  international events that bring together athletes from around the world. This experience has broadened my perspective, teaching me to 
                  appreciate different training methodologies and competitive approaches from various countries.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-500 font-bold">🏃 From Serbia to Chicago:</span> Being an international student-athlete means I represent 
                  Serbia even while studying in the United States. This dual identity—competing for Serbia internationally while representing Chicago State 
                  in NCAA competitions—showcases my ability to balance multiple commitments and excel in different contexts.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-green-500 font-bold">💪 Elite Training Environment:</span> Training with the Serbia National Team means working 
                  alongside the country's best athletes and coaches. This elite environment pushes me to new levels of performance and provides access to 
                  world-class training facilities and methodologies that I bring back to my collegiate training.
                </p>
              </>
            )}
            {achievement.id === "athletic-skills" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-red-500 font-bold">🧠 Mental Focus at 100%:</span> My mental focus score being at 100% isn't just for show—it's 
                  the result of years of training. In track, a split-second loss of focus can cost you the race. In coding, the same focus helps me catch 
                  bugs before they become problems. It's the same skill, different arena!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-red-500 font-bold">⚡ Speed in Everything:</span> My speed training in track has taught me to work efficiently 
                  under pressure. When I'm coding, I write clean, fast code. When I'm distributing laptops as a Digital Navigator, I work quickly to help 
                  more people. Speed isn't just about running—it's about maximizing impact!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-red-500 font-bold">🎯 Technique Matters:</span> In track, perfect technique can make the difference between 
                  winning and losing. In coding, following best practices and clean code principles is the difference between maintainable code and 
                  technical debt. The same attention to detail applies to both!
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-red-500 font-bold">💪 Strength & Endurance:</span> Track training builds both explosive strength (for sprints) 
                  and endurance (for longer races). Similarly, my work requires both: the strength to tackle complex problems and the endurance to see 
                  long projects through—like maintaining a 4.0 GPA across multiple semesters!
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </DetailLayout>
  )
}

