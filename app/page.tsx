import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Medal, Trophy, Mail, ExternalLink, Cpu, BookOpen, Award, Download } from "lucide-react"
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
          <div className="hidden md:flex items-center space-x-8 [&_a]:relative [&_a]:px-1 [&_a]:py-0.5 [&_a]:font-bold [&_a]:transition-all [&_a]:duration-300 [&_a]:hover:scale-110">
            <Link href="#about" className="text-red-500 hover:text-white [text-shadow:0_0_4px_#000,0_0_6px_#000,0_0_10px_#000] hover:[text-shadow:0_0_8px_#fff,0_0_12px_#ff3e3e]">
              About
            </Link>
            <Link href="#achievements" className="text-blue-500 hover:text-white [text-shadow:0_0_4px_#000,0_0_6px_#000,0_0_10px_#000] hover:[text-shadow:0_0_8px_#fff,0_0_12px_#3e9fff]">
              Track & Field
            </Link>
            <Link href="#education" className="text-yellow-400 hover:text-yellow-300 [text-shadow:0_0_4px_#000,0_0_6px_#000,0_0_10px_#000] hover:[text-shadow:0_0_8px_#fff,0_0_12px_#ffeb3b]">
              Education
            </Link>
            <Link href="#experience" className="text-red-500 hover:text-white [text-shadow:0_0_4px_#000,0_0_6px_#000,0_0_10px_#000] hover:[text-shadow:0_0_8px_#fff,0_0_12px_#ff3e3e]">
              Experience
            </Link>
            <Link href="#projects" className="text-blue-500 hover:text-white [text-shadow:0_0_4px_#000,0_0_6px_#000,0_0_10px_#000] hover:[text-shadow:0_0_8px_#fff,0_0_12px_#3e9fff]">
              Projects
            </Link>
            <Link href="#contact" className="text-yellow-400 hover:text-yellow-300 [text-shadow:0_0_4px_#000,0_0_6px_#000,0_0_10px_#000] hover:[text-shadow:0_0_8px_#fff,0_0_12px_#ffeb3b]">
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
        <div className="relative mb-8 hover-scale flex flex-col items-center">
          <div className="relative group">
            <div className="absolute inset-0 border-4 border-yellow-400 rounded-full transform translate-x-2 translate-y-2 group-hover:translate-y-3 transition-transform duration-200"></div>
            <div className="relative z-10 w-40 h-40 rounded-full overflow-hidden border-4 border-white bg-gray-800 group-hover:border-yellow-300 transition-colors duration-200">
              <Image
                src="/deloitte-profile-round.jpg"
                alt="Boris Mojsa"
                width={160}
                height={160}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            
            {/* Retro Game Level Badge */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20 group-hover:scale-110 transition-transform duration-200">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 transform rotate-3 rounded-sm"></div>
                <div className="relative bg-yellow-500 border-2 border-black px-4 py-1 -translate-x-1 -translate-y-1 rounded-sm shadow-[4px_4px_0_0_rgba(0,0,0,0.8)]">
                  <span className="text-black font-mono font-bold text-sm tracking-tight">LVL 21</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* XP Bar */}
          <div className="mt-8 w-full max-w-md relative">
            <div className="flex items-center justify-between w-full mb-1">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <span className="text-yellow-400 font-mono font-bold text-xl tracking-tight relative">
                  <span className="absolute inset-0 text-yellow-900/50 -translate-x-0.5 -translate-y-0.5">21</span>
                  <span className="relative">21</span>
                </span>
              </div>
              <div className="flex-1 mx-2 h-8 bg-gray-800 border-2 border-gray-900 rounded-sm overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ease-out"
                  style={{
                    width: '71%',
                    boxShadow: 'inset 0 0 4px rgba(0,0,0,0.8)'
                  }}
                >
                  <div className="absolute inset-0 bg-[length:10px_10px] bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] animate-[xpBar_1s_linear_infinite]"></div>
                </div>
                <div className="absolute inset-0 border-2 border-yellow-300 opacity-30 pointer-events-none"></div>
              </div>
              <div className="relative w-8 h-8 flex items-center justify-center">
                <span className="text-yellow-400 font-mono font-bold text-xl tracking-tight relative">
                  <span className="absolute inset-0 text-yellow-900/50 -translate-x-0.5 -translate-y-0.5">22</span>
                  <span className="relative">22</span>
                </span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-yellow-400 font-mono text-sm">XP: 259 / 365</span>
            </div>
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
          <Badge className="bg-yellow-400 text-black px-3 py-1 text-sm hover-scale">Cloud Computing</Badge>
          <Badge className="bg-red-500 px-3 py-1 text-sm hover-scale">Machine Learning</Badge>
          <Badge className="bg-green-500 text-black px-3 py-1 text-sm hover-scale">Web Development</Badge>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          <Link href="#projects" className="group relative inline-block">
            <div className="absolute inset-0 bg-yellow-600 translate-y-2 group-hover:translate-y-1 transition-transform duration-100 rounded-sm"></div>
            <Button className="relative bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-none border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] group-hover:-translate-y-1 transition-all duration-100 hover-scale">
              VIEW PROJECTS <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a 
            href="/resume/Boris-Mojsa-Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-block no-underline"
          >
            <div className="absolute inset-0 bg-green-700 translate-y-2 group-hover:translate-y-1 transition-transform duration-100 rounded-sm"></div>
            <Button
              variant="outline"
              className="relative bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-none border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] group-hover:-translate-y-1 transition-all duration-100 hover-scale cursor-pointer"
            >
              RESUME <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </Button>
          </a>
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
      <section id="about" className="container mx-auto px-4 py-20 bg-transparent relative overflow-hidden">
        
        <div className="relative flex flex-col md:flex-row gap-12 items-center">
          {/* Left side - Text content */}
          <div className="md:w-1/2 relative z-10">
            <div className="p-6 bg-gray-900/80 backdrop-blur-sm border-2 border-green-400 shadow-lg shadow-green-900/30">
              <h2 className="text-4xl font-bold mb-6 pixel-text text-green-400 border-b-2 border-green-500 pb-2 inline-block">ABOUT ME</h2>
              
              <div className="space-y-4 text-lg font-mono">
                <p className="relative pl-6 before:content-['>_'] before:absolute before:left-0 before:text-yellow-400">
                  Hello! I'm <span className="text-yellow-400 font-bold">Boris Mojsa</span>, a Computer Science student at Chicago State University (Expected Graduation: May 2027) with a minor in
                  Mathematics. I bring the same discipline from the track to tech.
                </p>
                <p className="relative pl-6 before:content-['>_'] before:absolute before:left-0 before:text-yellow-400">
                  With a perfect <span className="text-green-400 font-bold">4.0 GPA</span> and recognition on both the <span className="text-yellow-400">Dean's List</span> and <span className="text-yellow-400">President's List</span>, I balance academics with competitive athletics, applying the same
                  determination to software development and algorithm optimization.
                </p>
                <p className="relative pl-6 before:content-['>_'] before:absolute before:left-0 before:text-yellow-400">
                  As a <span className="text-yellow-400">ComEd Scholar</span> and <span className="text-yellow-400">TOEFL iBT AEG</span> recipient, I'm passionate about creating innovative solutions that make an impact, from community initiatives to cutting-edge research in AI and machine learning.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-2">
                <Badge className="bg-red-500/90 hover:bg-red-600 border border-red-400 hover:scale-105 transition-transform">
                  <span className="text-shadow-[0_0_4px_#000]">Problem Solver</span>
                </Badge>
                <Badge className="bg-yellow-400/90 hover:bg-yellow-500 text-black border border-yellow-300 hover:scale-105 transition-transform">
                  <span className="text-shadow-[0_0_2px_#fff]">Team Leader</span>
                </Badge>
                <Badge className="bg-green-500/90 hover:bg-green-600 border border-green-400 hover:scale-105 transition-transform">
                  <span className="text-shadow-[0_0_4px_#000]">Athlete</span>
                </Badge>
                <Badge className="bg-blue-500/90 hover:bg-blue-600 border border-blue-400 hover:scale-105 transition-transform">
                  <span className="text-shadow-[0_0_4px_#000]">Developer</span>
                </Badge>
                <Badge className="bg-purple-500/90 hover:bg-purple-600 border border-purple-400 hover:scale-105 transition-transform">
                  <span className="text-shadow-[0_0_4px_#000]">Researcher</span>
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Right side - Stats */}
          <div className="md:w-1/2 relative">
            <div className="relative bg-gray-900/80 backdrop-blur-sm border-2 border-green-400 p-1">
              <div className="border-2 border-yellow-400 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/80 p-4 border-2 border-gray-700 hover:border-yellow-400 transition-colors hover:bg-gray-700/80 hover-scale">
                    <div className="flex flex-col items-center text-center">
                      <BookOpen className="text-yellow-400 mb-2 h-8 w-8" />
                      <span className="text-sm text-gray-300 mb-1">GPA</span>
                      <span className="text-2xl font-bold text-green-400">4.0/4.0</span>
                    </div>
                  </div>
                  <div className="bg-gray-800/80 p-4 border-2 border-gray-700 hover:border-yellow-400 transition-colors hover:bg-gray-700/80 hover-scale">
                    <div className="flex flex-col items-center text-center">
                      <Trophy className="text-yellow-400 mb-2 h-8 w-8" />
                      <span className="text-sm text-gray-300 mb-1">Honors</span>
                      <span className="text-xl font-bold text-yellow-400">President's List</span>
                    </div>
                  </div>
                  <div className="bg-gray-800/80 p-4 border-2 border-gray-700 hover:border-yellow-400 transition-colors hover:bg-gray-700/80 hover-scale">
                    <div className="flex flex-col items-center text-center">
                      <Cpu className="text-yellow-400 mb-2 h-8 w-8" />
                      <span className="text-sm text-gray-300 mb-1">Tech Skills</span>
                      <span className="text-xl font-bold text-blue-400">10+ Languages</span>
                    </div>
                  </div>
                  <div className="bg-gray-800/80 p-4 border-2 border-gray-700 hover:border-yellow-400 transition-colors hover:bg-gray-700/80 hover-scale">
                    <div className="flex flex-col items-center text-center">
                      <Award className="text-yellow-400 mb-2 h-8 w-8" />
                      <span className="text-sm text-gray-300 mb-1">Scholarships</span>
                      <span className="text-xl font-bold text-purple-400">ComEd Scholar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pixel art decoration */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 opacity-20"></div>
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Track & Field Section */}
      <section id="achievements" className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 pixel-text text-red-500 text-center">TRACK & FIELD</h2>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            {/* Personal Bests */}
            <div className="bg-gray-800 p-8 rounded-xl border-2 border-red-500 relative hover-animate hover-glow-red">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
                <Trophy className="mr-2" /> Personal Bests
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <span className="font-medium">800m</span>
                  <span className="font-mono text-yellow-400">1:56.09</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <span className="font-medium">1500m</span>
                  <span className="font-mono text-yellow-400">4:18.87</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <span className="font-medium">400m</span>
                  <span className="font-mono text-yellow-400">50.51</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <span className="font-medium">Cross Country (8k)</span>
                  <span className="font-mono text-yellow-400">29:08.5</span>
                </div>
              </div>
            </div>

            {/* Career Highlights */}
            <div className="bg-gray-800 p-8 rounded-xl border-2 border-yellow-400 relative hover-animate hover-glow-yellow">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
                <Medal className="mr-2" /> Career Highlights
              </h3>
              <ul className="space-y-3 list-disc list-inside text-gray-300">
                <li>5x Serbian National Champion (800m)</li>
                <li>4th Place - 2019 Balkan U18 Championships (800m)</li>
                <li>NCAA Division I Collegiate Athlete (Chicago State University)</li>
                <li>TOEFL iBT Athletics Excellence Grant Recipient</li>
                <li>Represented Serbia in international competitions</li>
              </ul>
            </div>
          </div>

          {/* National Championships */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-3xl font-bold mb-6 text-center text-green-400">National Championship Titles</h3>
            <div className="space-y-4">
              <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-yellow-400 hover:border-red-500 transition-colors">
                <h4 className="text-xl font-bold text-yellow-400">2018 Serbian U16 Championship</h4>
                <p className="text-gray-300">🏆 Gold Medal - 800m (2:04.16)</p>
                <p className="text-sm text-gray-400">Military Academy Stadium, Belgrade</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-yellow-400 hover:border-red-500 transition-colors">
                <h4 className="text-xl font-bold text-yellow-400">2019 Serbian U18 Indoor Championship</h4>
                <p className="text-gray-300">🏆 Gold Medal - 800m (2:00.00)</p>
                <p className="text-sm text-gray-400">Belgrade, Serbia</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-yellow-400 hover:border-red-500 transition-colors">
                <h4 className="text-xl font-bold text-yellow-400">2019 Serbian U18 Outdoor Championship</h4>
                <p className="text-gray-300">🏆 Gold Medal - 800m (1:58.61)</p>
                <p className="text-sm text-gray-400">Sremska Mitrovica, Serbia</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-yellow-400 hover:border-red-500 transition-colors">
                <h4 className="text-xl font-bold text-yellow-400">2020 Serbian U18 Indoor Championship</h4>
                <p className="text-gray-300">🏆 Gold Medal - 800m (1:59.82)</p>
                <p className="text-sm text-gray-400">Belgrade, Serbia</p>
              </div>
            </div>
          </div>

          {/* Training Background */}
          <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl border-2 border-green-500">
            <h3 className="text-2xl font-bold mb-4 text-green-400">Training & Development</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-bold text-yellow-400 mb-2">Clubs</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• AK Spartak Opovo (2015-Present)</li>
                  <li>• AK Crvena Zvezda (2021-2022)</li>
                  <li>• Chicago State University Track & Field</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-yellow-400 mb-2">Coaching</h4>
                <p className="text-gray-300">Primary Coach: Nemanja Stojanović (AK Spartak Opovo)</p>
                <p className="text-gray-300 mt-2">"Under Coach Stojanović's guidance, I achieved the best results of my career and developed both as an athlete and individual."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
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
                  <li>President's List (Spring 2025)</li>
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
                    <div className="h-full bg-gradient-to-r from-green-500 to-yellow-400 rounded-full w-1/2"></div>
                  </div>
                  <div className="ml-4 text-yellow-400 font-bold">50%</div>
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
          {/* Experience 1 - ComEd Scholar */}
          <Card className="bg-gray-800 border-2 border-yellow-500 overflow-hidden hover-animate hover-glow-yellow">
            <CardHeader className="bg-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-yellow-400">Project Manager</CardTitle>
                  <CardDescription>ComEd Future of Energy Scholar</CardDescription>
                </div>
                <Badge className="bg-yellow-500">2025</Badge>
              </div>
              <CardDescription className="text-gray-300">January 2025 - May 2025</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">→</span>
                  <span>
                    Designed the "Endless Bio Cycle" concept with a 4-person team, outlining an on-site unit that turns restaurant waste oil into ASTM-grade biodiesel
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">→</span>
                  <span>
                    Built a cost model showing that converting 100+ gal of oil per site each month can cut diesel spending 43% using in-house feedstock
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">→</span>
                  <span>
                    Presented the plan to ComEd engineers, demonstrating how it could supply ~10% of a restaurant's power needs while eliminating disposal fees and emissions
                  </span>
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

          {/* Experience 2 - Digital Navigator */}
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
                  <span className="text-red-400 mr-2">→</span>
                  <span>
                    Improving digital access by distributing over 400+ laptops to individuals in need, ensuring connectivity and resource availability
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">→</span>
                  <span>
                    Increasing digital literacy by conducting over 20+ workshops and training over 150+ community members on essential technology skills
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">→</span>
                  <span>
                    Expanding digital inclusion by reaching over 10+ neighborhoods and providing over 150+ one-on-one training sessions
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

          {/* Experience 3 - Cyber Force Competition */}
          <Card className="bg-gray-800 border-2 border-blue-500 overflow-hidden hover-animate hover-glow-blue">
            <CardHeader className="bg-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-blue-400">Team Leader</CardTitle>
                  <CardDescription>U.S. Department of Energy Cyber Force Competition</CardDescription>
                </div>
                <Badge className="bg-blue-500">2023</Badge>
              </div>
              <CardDescription className="text-gray-300">November 2023</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  <span>Led a team of 4 in a national cyber-physical infrastructure defense simulation, ranking in the top 10% out of 100+ teams</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  <span>
                    Executed real-time threat detection, penetration testing, and incident response against simulated cyber attacks
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  <span>Demonstrated hands-on expertise in network security, red teaming, and risk mitigation in a high-pressure, competitive setting</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center">
                <span className="text-blue-400 font-bold mr-2">XP GAINED:</span>
                <div className="h-2 bg-gray-700 rounded-full flex-1">
                  <div className="h-full bg-yellow-500 rounded-full w-3/5"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience 4 - Braven Accelerator */}
          <Card className="bg-gray-800 border-2 border-green-500 overflow-hidden hover-animate hover-glow-green">
            <CardHeader className="bg-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-green-400">Lead Researcher</CardTitle>
                  <CardDescription>Braven Accelerator</CardDescription>
                </div>
                <Badge className="bg-green-500">2025</Badge>
              </div>
              <CardDescription className="text-gray-300">January 2025 - May 2025</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Led a 5-member capstone team researching ways to boost Chicago Sky Foundation outreach to high-school students</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Conducted 15 interviews and analyzed 50+ survey responses, pinpointing 3 critical awareness gaps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Developed the "Skybound" ambassador-mentorship program, projected to engage 200+ underserved students per school and raise event turnout 50%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  <span>Presented the "Skybound" proposal to a diverse audience of 40+, including Braven leadership, Chicago Sky Foundation representatives, and industry professionals</span>
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

          {/* Experience 5 */}
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

      {/* Certificates Section */}
      <section id="certificates" className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 pixel-text text-yellow-400 text-center">CERTIFICATES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* IBM Certificate */}
            <Card className="bg-gray-800 border-2 border-blue-500 overflow-hidden hover-animate hover-glow-blue">
              <div className="h-48 bg-gray-700 relative flex items-center justify-center">
                <Cpu className="h-16 w-16 text-blue-400" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-blue-400 text-black">Jul 2024</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-blue-400">Artificial Intelligence Fundamentals</CardTitle>
                <CardDescription>IBM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Gained comprehensive understanding of AI fundamentals, including machine learning, neural networks, and AI applications in various industries.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-500 text-blue-500">AI</Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-500">Machine Learning</Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-500">Neural Networks</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Google Certificate */}
            <Card className="bg-gray-800 border-2 border-green-500 overflow-hidden hover-animate hover-glow-green">
              <div className="h-48 bg-gray-700 relative flex items-center justify-center">
                <Award className="h-16 w-16 text-green-400" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-400 text-black">Feb 2022</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-green-400">Fundamentals of Digital Marketing</CardTitle>
                <CardDescription>Google Garage</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Completed comprehensive training on digital marketing essentials, including SEO, social media marketing, and online business strategies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-green-500 text-green-500">Digital Marketing</Badge>
                  <Badge variant="outline" className="border-green-500 text-green-500">SEO</Badge>
                  <Badge variant="outline" className="border-green-500 text-green-500">Social Media</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
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
                {/* Project 1 - SmartPet+ */}
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
                      Built a real-time Flask web app that identifies pet breeds from user photos by orchestrating Python, machine-learning models, REST endpoints, and the Microsoft Azure Computer Vision API.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Python
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Flask
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Azure
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        OpenAI GPT-3.5
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Computer Vision
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
                    <Link href="/projects/smartpet" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-black hover-scale"
                      >
                        View Details
                      </Button>
                    </Link>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost" className="hover-scale">
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </a>
                  </CardFooter>
                </Card>

                {/* Project 2 - Personal Portfolio*/}
                <Card className="bg-gray-800 border-2 border-purple-500 overflow-hidden hover-animate hover-glow-purple">
                  <div className="h-48 bg-gray-700 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Personal Portfolio Website"
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-400 text-black">Latest</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-400">Personal Portfolio Website</CardTitle>
                    <CardDescription>Interactive Developer Portfolio Website</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS, featuring a terminal-style interface, interactive elements, and a retro gaming aesthetic.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="border-purple-500 text-purple-500">
                        Next.js
                      </Badge>
                      <Badge variant="outline" className="border-purple-500 text-purple-500">
                        TypeScript
                      </Badge>
                      <Badge variant="outline" className="border-purple-500 text-purple-500">
                        Tailwind CSS
                      </Badge>
                      <Badge variant="outline" className="border-purple-500 text-purple-500">
                        Vercel
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <span className="text-purple-400 font-bold mr-2">COMPLETION:</span>
                      <div className="h-2 bg-gray-700 rounded-full flex-1">
                        <div className="h-full bg-purple-500 rounded-full w-full"></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href="/projects/portfolio" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-black hover-scale"
                      >
                        View Details
                      </Button>
                    </Link>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost" className="hover-scale">
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </a>
                  </CardFooter>
                </Card>

                {/* Project 2 - Airline Crew Scheduling */}
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
                      Conducted research on optimizing airline crew scheduling by applying genetic algorithms to improve efficiency. Investigated evolutionary algorithms and mathematical models to enhance crew allocation and minimize scheduling conflicts.
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
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        Python
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
                    <Link href="/projects/airline-scheduling" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover-scale"
                      >
                        View Details
                      </Button>
                    </Link>
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
            <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-6 text-lg rounded-none border-b-4 border-purple-700 hover:translate-y-1 transition-transform hover-scale">
              VIEW ALL PROJECTS <ArrowRight className="ml-2" />
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
                  <a
                    href="https://www.linkedin.com/in/borismojsa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover-scale p-2 transition-colors duration-300"
                    aria-label="LinkedIn Profile"
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
                  </a>
                  <a
                    href="https://github.com/BorisMojsa/Portfolio-Website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover-scale p-2 transition-colors duration-300"
                    aria-label="GitHub Profile"
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
                  </a>
                  <a
                    href="https://www.instagram.com/mojjsa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover-scale p-2 transition-colors duration-300"
                    aria-label="Instagram Profile"
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
                  </a>
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
