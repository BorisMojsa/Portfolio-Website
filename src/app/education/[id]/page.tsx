"use client"

import { use } from "react"
import { BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DetailLayout } from "@/components/detail-layout"

interface Education {
  id: string
  institution: string
  degree: string
  location?: string
  dateRange: string
  gpa: string
  honors?: string[]
  focusAreas?: string[]
  highlights?: string[]
  progress?: string
}

const education: Education[] = [
  {
    id: "roosevelt",
    institution: "Roosevelt University",
    degree: "Bachelor of Science in Computer Science · Minor in Mathematics",
    dateRange: "Expected Graduation: May 2027",
    gpa: "4.00",
    honors: [
      "Athletic Leadership Award",
      "Roosevelt Academic Scholarship",
      "Dean Scholar Award",
    ],
    focusAreas: [
      "Intelligent Systems",
      "Statistics",
      "Data Mining",
    ],
    progress: "64%",
  },
  {
    id: "chicago-state",
    institution: "Chicago State University",
    degree: "Bachelor of Science in Computer Science · Minor in Mathematics",
    dateRange: "Summer 2023 – Spring 2025",
    gpa: "4.00",
    honors: [
      "ComEd Future of Energy Scholar (2025)",
      "TOEFL iBT Athletics Excellence Grant",
      "Dean's List (Spring & Fall 2024)",
      "President's List (Spring 2025)",
    ],
    highlights: [
      "Completed 64 / 120 credit hours prior to transferring",
      "NCAA Division I track athlete",
    ],
    focusAreas: [
      "Data Structures",
      "Object Oriented Programming",
      "Software Engineering",
      "Discrete Mathematics",
      "Probability & Statistics",
    ],
  },
]

export default function EducationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const edu = education.find((e) => e.id === id)

  if (!edu) {
    return (
      <DetailLayout accentColor="yellow">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4 pixel-text text-red-400">EDUCATION NOT FOUND</h1>
          <p className="text-gray-300 mb-8">The education entry you're looking for doesn't exist.</p>
        </div>
      </DetailLayout>
    )
  }

  return (
    <DetailLayout accentColor="yellow">
      <div className="max-w-4xl mx-auto text-white">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 pixel-text text-yellow-400">
                {edu.institution}
              </h1>
              <p className="text-xl text-gray-300">{edu.degree}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-gray-300 mb-4">
            <span>{edu.dateRange}</span>
            {edu.location && (
              <>
                <span>•</span>
                <span>{edu.location}</span>
              </>
            )}
            <span>•</span>
            <span className="text-yellow-400 font-bold">GPA: {edu.gpa}</span>
          </div>
        </div>

        {/* Honors & Awards / Scholarships & Awards */}
        {edu.honors && edu.honors.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 pixel-text text-green-400">
              {edu.id === "roosevelt" ? "SCHOLARSHIPS & AWARDS" : "HONORS & AWARDS"}
            </h2>
            <ul className="space-y-2">
              {edu.honors.map((honor, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-200">
                  <span className="text-green-400 font-bold mt-1">→</span>
                  <span className="text-lg">{honor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Focus Areas */}
        {edu.focusAreas && edu.focusAreas.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 pixel-text text-green-400">FOCUS AREAS</h2>
            <div className="flex flex-wrap gap-2">
              {edu.focusAreas.map((area) => (
                <Badge key={area} variant="outline" className="border-gray-500 text-base px-3 py-1">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {edu.highlights && edu.highlights.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 pixel-text text-green-400">HIGHLIGHTS</h2>
            <ul className="space-y-2">
              {edu.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-200">
                  <span className="text-green-400 font-bold mt-1">→</span>
                  <span className="text-lg">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Progress */}
        {edu.progress && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">PROGRESS</h2>
            <div className="flex items-center gap-4">
              <span className="text-yellow-400 font-bold pixel-text">PROGRESS:</span>
              <div className="h-4 bg-gray-700 rounded-full flex-1 max-w-md">
                <div className="h-full bg-gradient-to-r from-green-500 to-yellow-400 rounded-full w-[64%]"></div>
              </div>
              <span className="text-yellow-400 font-bold pixel-text">{edu.progress}</span>
            </div>
            <div className="mt-2 text-sm text-gray-400 text-center">77 / 120 credits</div>
          </div>
        )}

        {/* Fun Facts Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-6 pixel-text text-yellow-400">DID YOU KNOW?</h2>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 space-y-4">
            {edu.id === "chicago-state" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">🎓 Chicago State University:</span> Founded in 1867, CSU is one of the oldest public 
                  universities in Illinois. I completed 64 credit hours here before transferring to Roosevelt, building a strong foundation in data structures, 
                  software engineering, and discrete mathematics.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">🏃 Division I Athletics:</span> Competing as an NCAA Division I track athlete at Chicago State 
                  while maintaining a 4.0 GPA taught me invaluable time management and discipline. These skills are crucial in data science where you're 
                  juggling multiple projects, deadlines, and datasets.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">📊 Foundation Building:</span> The coursework I completed at Chicago State—from data structures 
                  to probability & statistics—provided the mathematical and computational foundation that I'm now building upon at Roosevelt. Every algorithm 
                  and statistical analysis relies on these fundamentals.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">🔄 Transfer Journey:</span> Completing 64 credit hours with a perfect 4.0 GPA before transferring 
                  demonstrates my ability to maintain excellence through transitions. This adaptability is essential in tech where change is constant.
                </p>
              </>
            )}
            {edu.id === "roosevelt" && (
              <>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">🏛️ Roosevelt University:</span> Named after President Franklin D. Roosevelt, this university 
                  has a strong commitment to social justice and community engagement. I'm currently completing my degree here, focusing on intelligent systems, 
                  statistics, and data mining—areas that directly align with my data science and machine learning goals.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">📊 Current Focus:</span> My coursework at Roosevelt is building on the foundation I established 
                  at Chicago State, with a deeper dive into advanced topics like intelligent systems and data mining. This progression is preparing me for 
                  my MCDC Data Science Internship and future roles in the field.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-yellow-400 font-bold">🏆 Academic Excellence:</span> Maintaining a 4.0 GPA while balancing athletics, community work, 
                  and research demonstrates the same discipline I bring to track & field, applied to academics. Consistency and focus are key to success in 
                  both arenas.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </DetailLayout>
  )
}

