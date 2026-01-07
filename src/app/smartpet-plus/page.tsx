"use client"

import { useState, FormEvent, useRef, DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Squares from "@/components/squares"
import { Loader2, Sparkles, Image as ImageIcon, Upload, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AnalysisResult {
  success: boolean
  result?: {
    subject?: string  // The identified breed/subject
    story?: string    // The generated story
    careTips?: string // Care tips (if available)
  }
  error?: string
}

export default function SmartPetPlusPage() {
  const [imageUrl, setImageUrl] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [analyzedImageUrl, setAnalyzedImageUrl] = useState<string | null>(null) // Store analyzed image separately
  const [isDragging, setIsDragging] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024 // 5MB
    if (file.size > MAX_SIZE) {
      setError("Image size must be less than 5MB")
      return
    }

    setSelectedFile(file)
    setImageUrl("") // Clear URL when file is selected
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      let base64Image: string

      if (selectedFile) {
        // Convert file to base64
        const reader = new FileReader()
        base64Image = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => {
            const result = reader.result as string
            // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
            const base64 = result.split(",")[1]
            resolve(base64)
          }
          reader.onerror = reject
          reader.readAsDataURL(selectedFile)
        })
      } else if (imageUrl) {
        // Validate URL
        if (!imageUrl.match(/^https?:\/\/.+\..+/)) {
          throw new Error("Please enter a valid image URL starting with http:// or https://")
        }

        // Fetch image from URL and convert to base64
        const imageResponse = await fetch(imageUrl)
        if (!imageResponse.ok) {
          throw new Error("Failed to fetch image from URL")
        }
        const imageBuffer = await imageResponse.arrayBuffer()
        base64Image = Buffer.from(imageBuffer).toString("base64")
      } else {
        throw new Error("Please select an image file or enter an image URL")
      }

      const response = await fetch("/api/smartpet-plus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      })

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        throw new Error(`Invalid response: ${text.substring(0, 100)}...`)
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image")
      }

      if (!data?.success) {
        setAnalysis(data)
        throw new Error(data?.error || "Failed to analyze image")
      }

      // Store the analyzed image URL so it persists even if upload is removed
      if (previewUrl) {
        setAnalyzedImageUrl(previewUrl)
      } else if (imageUrl) {
        setAnalyzedImageUrl(imageUrl)
      }

      setAnalysis(data)
    } catch (err: unknown) {
      console.error("Error analyzing image:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze image"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Static retro/8-bit style background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950"></div>
        <Squares
          speed={0.34}
          squareSize={30}
          direction="diagonal"
          borderColor="rgba(255, 255, 255, 0.6)"
          hoverFillColor="rgba(34, 197, 94, 0.6)"
          className="absolute inset-0 opacity-35"
        />
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-green-400/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-green-400/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-green-400/30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-green-400/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Main content */}
        <main className="container mx-auto px-4 py-8 pb-20">
          <div className="max-w-4xl mx-auto text-white">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 pixel-text text-green-400">
            SMART PET+
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            AI-Powered Pet Breed Identification & Story Generation
          </p>
          <Badge className="bg-yellow-400 text-black mb-4">LIVE</Badge>
        </div>

        {/* Description */}
        <div className="mb-8 bg-gray-800/50 p-6 rounded-lg border-2 border-green-500">
          <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">HOW IT WORKS</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            Upload a pet image (drag & drop or select from your computer) or paste an image URL, and our AI will identify the breed, generate a personalized story, and provide care tips. Powered by Azure Computer Vision and OpenAI GPT-4o mini.
          </p>
        </div>

        {/* Form */}
        <div className="mb-8 bg-gray-800/50 p-6 rounded-lg border-2 border-green-500">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File Upload Area */}
            <div>
              <label className="block text-green-400 font-bold mb-2 pixel-text">
                UPLOAD PET IMAGE
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                  isDragging
                    ? "border-green-400 bg-green-500/10"
                    : "border-green-500 bg-gray-900/50 hover:border-green-400 hover:bg-gray-900/70"
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={loading}
                />
                {previewUrl ? (
                  <div className="relative">
                    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden border-2 border-green-500">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        clearFile()
                      }}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <X className="mr-2 h-4 w-4" />
                      REMOVE IMAGE
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-green-400" />
                    <div>
                      <p className="text-lg text-gray-300 mb-2">
                        Drag and drop an image here, or click to select
                      </p>
                      <p className="text-sm text-gray-400">
                        Supports: JPG, PNG, GIF, WebP (Max 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="text-gray-400 font-bold pixel-text">OR</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>

            {/* URL Input */}
            <div>
              <label htmlFor="imageUrl" className="block text-green-400 font-bold mb-2 pixel-text">
                PET IMAGE URL
              </label>
              <Input
                id="imageUrl"
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value)
                  if (e.target.value) {
                    clearFile() // Clear file when URL is entered
                  }
                }}
                placeholder="https://example.com/pet-image.jpg"
                className="bg-gray-900 border-2 border-green-500 text-white placeholder:text-gray-500 rounded-none focus:border-green-400 focus:ring-0"
                disabled={loading || !!selectedFile}
              />
            </div>

            <Button
              type="submit"
              disabled={loading || (!selectedFile && !imageUrl)}
              className={cn(
                "w-full font-bold px-6 py-3 rounded-none border-b-4 hover:translate-y-1 transition-transform hover-scale",
                "border-green-500 text-green-500 hover:bg-green-500 hover:text-black",
                (!selectedFile && !imageUrl) && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ANALYZING...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  ANALYZE PET
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-900/50 border-2 border-red-500 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2 pixel-text text-red-400">ERROR</h3>
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Results */}
        {analysis && analysis.success && analysis.result && (
          <div className="space-y-6">
            {/* Pet Image - Use analyzedImageUrl which persists even after upload is removed */}
            {analyzedImageUrl && (
              <div className="relative h-96 md:h-[500px] w-full rounded-lg overflow-hidden border-2 border-gray-700 bg-gray-800">
                <Image
                  src={analyzedImageUrl}
                  alt="Pet"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-contain"
                  onError={() => setError("Failed to load image")}
                />
              </div>
            )}

            {/* Breed/Subject */}
            {analysis.result.subject && (
              <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-green-500">
                <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">BREED IDENTIFIED</h2>
                <Badge className="bg-green-500 text-black text-lg px-4 py-2">
                  {analysis.result.subject}
                </Badge>
              </div>
            )}

            {/* Story */}
            {analysis.result.story && (() => {
              // Parse story to extract fun fact and remove [Story] prefix
              const storyText = analysis.result.story
              const funFactRegex = /\[Fun Fact:\s*([^\]]+)\]/i
              const match = storyText.match(funFactRegex)
              const funFact = match ? match[1].trim() : null
              
              // Remove [Story] prefix and [Fun Fact: ...] part
              let cleanStory = storyText
              if (match) {
                cleanStory = storyText.replace(funFactRegex, '').trim()
              }
              // Remove [Story] prefix if present
              cleanStory = cleanStory.replace(/^\[Story\]\s*/i, '').trim()

              return (
                <>
                  <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-green-500">
                    <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">PET STORY</h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-lg text-gray-200 leading-relaxed">
                        {cleanStory}
                      </p>
                    </div>
                  </div>

                  {/* Fun Fact */}
                  {funFact && (
                    <div className="bg-blue-900/30 border-2 border-blue-500 p-6 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h2 className="text-xl font-bold mb-3 pixel-text text-blue-400">FUN FACT</h2>
                          <p className="text-base text-blue-100 leading-relaxed">
                            {funFact}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )
            })()}

            {/* Care Tips */}
            {analysis.result.careTips && (
              <div className="bg-gray-800/50 p-6 rounded-lg border-2 border-green-500">
                <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">CARE TIPS</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {analysis.result.careTips}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack Info */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-4 pixel-text text-yellow-400">TECH STACK</h2>
          <div className="flex flex-wrap gap-2">
            {["Python", "Flask", "Azure Computer Vision", "OpenAI GPT-4o mini", "REST APIs"].map((tech) => (
              <Badge key={tech} variant="outline" className="border-green-500 text-green-500 text-base px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
          </div>
        </main>
      </div>
    </div>
  )
}
