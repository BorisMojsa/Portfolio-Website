import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ConditionalAnimatedBackground } from "@/components/conditional-animated-background"

export const metadata = {
  title: "Boris Mojsa - Computer Science Student & Track Athlete",
  description: "Personal website of Boris Mojsa, Computer Science student and Track & Field athlete",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ConditionalAnimatedBackground />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
