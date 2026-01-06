"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DetailLayoutProps {
  children: React.ReactNode
  accentColor?: string
}

export function DetailLayout({ children, accentColor = "yellow" }: DetailLayoutProps) {
  const router = useRouter()
  const accentClasses = {
    yellow: "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black",
    green: "border-green-400 text-green-400 hover:bg-green-400 hover:text-black",
    blue: "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white",
    purple: "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white",
    red: "border-red-400 text-red-400 hover:bg-red-400 hover:text-white",
    cyan: "border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black",
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Static retro/8-bit style background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950"></div>
        {/* Pixel grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        ></div>
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-yellow-400/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-yellow-400/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-yellow-400/30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-yellow-400/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header with back button */}
        <header className="container mx-auto px-4 py-6">
          <Button
            variant="outline"
            className={cn(
              "border-2 hover-scale pixel-text font-bold px-6 py-3 rounded-none border-b-4 hover:translate-y-1 transition-transform",
              accentClasses[accentColor as keyof typeof accentClasses] || accentClasses.yellow
            )}
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back()
                return
              }
              router.push("/")
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK
          </Button>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-8 pb-20">
          {children}
        </main>
      </div>
    </div>
  )
}
