import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Medal, Trophy, Mail, ExternalLink, Cpu, BookOpen, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-white [&_p]:text-shadow [&_h1]:text-shadow [&_h2]:text-shadow [&_h3]:text-shadow [&_span]:text-shadow">
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
                <TabsTrigger value="all" className="data-[state=active]:bg-purple-500 hover-scale">
                  All
                </TabsTrigger>
                <TabsTrigger value="web" className="data-[state=active]:bg-purple-500 hover-scale">
                  Web Dev
                </TabsTrigger>
                <TabsTrigger value="ai" className="data-[state=active]:bg-purple-500 hover-scale">
                  AI/ML
                </TabsTrigger>
                <TabsTrigger value="research" className="data-[state=active]:bg-purple-500 hover-scale">
                  Research
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Project 1 */}
                <Card className="bg-gray-800 border-2 border-green-500 overflow-hidden hover-animate hover-glow-green">
                  <div className="h-48 bg-gray-700 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="SmartPet+"
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-400 text-black">Featured</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-400">SmartPet+</CardTitle>
                    <CardDescription>AI-powered pet breed identification and story generation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      A web application that uses machine learning to identify pet breeds from images and generates
                      AI-powered stories about them.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Python
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Flask
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        OpenAI
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Azure
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 font-bold mr-2">COMPLETION:</span>
                      <div className="h-2 bg-gray-700 rounded-full flex-1">
                        <div className="h-full bg-green-500 rounded-full w-full"></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black hover-scale"
                    >
                      View Details
                    </Button>
                    <Button size="icon" variant="ghost" className="hover-scale">
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>

                {/* Project 2 */}
                <Card className="bg-gray-800 border-2 border-blue-500 overflow-hidden hover-animate hover-glow-blue">
                  <div className="h-48 bg-gray-700 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Airline Crew Scheduling"
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-400">Airline Crew Scheduling</CardTitle>
                    <CardDescription>Optimization using Genetic Algorithms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Research project on optimizing airline crew scheduling by applying genetic and evolutionary
                      algorithms to improve efficiency.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        Genetic Algorithms
                      </Badge>
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        Data Analysis
                      </Badge>
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        Optimization
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-400 font-bold mr-2">COMPLETION:</span>
                      <div className="h-2 bg-gray-700 rounded-full flex-1">
                        <div className="h-full bg-blue-500 rounded-full w-full"></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover-scale"
                    >
                      View Details
                    </Button>
                    <Button size="icon" variant="ghost" className="hover-scale">
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="web" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Web Projects would go here */}
                <Card className="bg-gray-800 border-2 border-green-500 overflow-hidden hover-animate hover-glow-green">
                  <div className="h-48 bg-gray-700 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="SmartPet+"
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-400">SmartPet+</CardTitle>
                    <CardDescription>AI-powered pet breed identification and story generation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      A web application that uses machine learning to identify pet breeds from images and generates
                      AI-powered stories about them.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Python
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Flask
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        OpenAI
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Azure
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black hover-scale"
                    >
                      View Details
                    </Button>
                    <Button size="icon" variant="ghost" className="hover-scale">
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* AI Projects would go here */}
                <Card className="bg-gray-800 border-2 border-purple-500 overflow-hidden hover-animate hover-glow-purple">
                  <div className="h-48 bg-gray-700 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="AI Project"
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-400">SmartPet+ AI Model</CardTitle>
                    <CardDescription>Machine learning model for pet breed identification</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      The AI component of SmartPet+ that uses computer vision to accurately identify pet breeds from
                      uploaded images.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="border-purple-500 text-purple-500">
                        Azure Computer Vision
                      </Badge>
                      <Badge variant="outline" className="border-purple-500 text-purple-500">
                        Machine Learning
                      </Badge>
                      <Badge variant="outline" className="border-purple-500 text-purple-500">
                        Image Processing
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white hover-scale"
                    >
                      View Details
                    </Button>
                    <Button size="icon" variant="ghost" className="hover-scale">
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="research" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Research Projects would go here */}
                <Card className="bg-gray-800 border-2 border-blue-500 overflow-hidden hover-animate hover-glow-blue">
                  <div className="h-48 bg-gray-700 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Airline Crew Scheduling"
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-400">Airline Crew Scheduling</CardTitle>
                    <CardDescription>Optimization using Genetic Algorithms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Research project on optimizing airline crew scheduling by applying genetic and evolutionary
                      algorithms to improve efficiency.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        Genetic Algorithms
                      </Badge>
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        Data Analysis
                      </Badge>
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        Optimization
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover-scale"
                    >
                      View Details
                    </Button>
                    <Button size="icon" variant="ghost" className="hover-scale">
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-6 text-lg rounded-none border-b-4 border-purple-700 hover:translate-y-1 transition-transform hover-scale">
              <a href="#projects" target="_blank" rel="noopener noreferrer">
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
  )
}
