"use client"

import { useEffect, useRef, useState } from "react"

type AnimatedPalette = {
  sky: string
  grass: string
  track: string
  lane: string
  treeDark: string
  treeLight: string
  treeTrunk: string
  mountainDark: string
  mountainLight: string
  mountainSnow: string
  cloud: string
  cloudShadow: string
}

const defaultPalette: AnimatedPalette = {
  sky: "#62b8ff",
  grass: "#5ebc3f",
  track: "#b86f50",
  lane: "#ffffff",
  treeDark: "#2a7302",
  treeLight: "#52a549",
  treeTrunk: "#7d5b24",
  mountainDark: "#3a4f6a",
  mountainLight: "#5c7b9c",
  mountainSnow: "#ffffff",
  cloud: "#ffffff",
  cloudShadow: "#d0d0d0",
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const paletteRef = useRef<AnimatedPalette>(defaultPalette)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.warn("Canvas ref not available")
      // Fallback: hide loading if canvas isn't available
      setTimeout(() => setIsLoading(() => false), 1000)
      return
    }

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) {
      console.warn("Canvas context not available")
      // Fallback: hide loading if context isn't available
      setTimeout(() => setIsLoading(() => false), 1000)
      return
    }

    const handleSeasonChange = (event: Event) => {
      const detail = (event as CustomEvent<{ palette?: AnimatedPalette }>).detail
      if (detail?.palette) {
        paletteRef.current = {
          ...paletteRef.current,
          ...detail.palette,
        }
      }
    }

    window.addEventListener("seasonChange", handleSeasonChange)

    // Runner sprite properties need to be defined before resize logic
    const runnerWidth = 32
    const runnerHeight = 40
    const spriteFrames = 6
    let currentFrame = 0
    let runnerX = -runnerWidth
    let runnerY = 0 // Position on track (set after first resize)

    // Set canvas to full screen with enhanced pixel ratio for crisp rendering
    let vw = 0
    let vh = 0
    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1
      vw = window.innerWidth
      vh = window.innerHeight
      canvas.width = vw * pixelRatio
      canvas.height = vh * pixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      // Apply scaling once at resize for better performance
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      // Disable anti-aliasing for pixel-perfect rendering
      ctx.imageSmoothingEnabled = false
    }

    resizeCanvas()
    runnerY = vh * 0.7 - runnerHeight
    const onResize = () => {
      resizeCanvas()
      runnerY = vh * 0.7 - runnerHeight
    }
    window.addEventListener("resize", onResize)

    // Cloud properties with classic pixelated style
    const clouds = [] as Array<{ x: number; y: number; width: number; height: number; speed: number; type: number }>
    const cloudCount = 5

    // Create clouds with different sizes and speeds
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * vw,
        y: 30 + Math.random() * 160,
        width: 40 + Math.random() * 60, // Smaller, more pixelated clouds
        height: 20 + Math.random() * 15,
        speed: 0.5 + Math.random() * 0.3,
        type: Math.floor(Math.random() * 3), // Different cloud types
      })
    }

    // Tree properties
    const treeSpeed = 1.5 // Noticeably slower than runner speed for parallax
    const mountainSpeed = 0.3 // Far distance parallax movement
    const mountains = [] as Array<{ x: number; baseWidth: number; height: number }>
    const mountainCount = 6

    for (let i = 0; i < mountainCount; i++) {
      mountains.push({
        x: Math.random() * vw,
        baseWidth: 140 + Math.random() * 160,
        height: 90 + Math.random() * 90,
      })
    }

    const trees = [] as Array<{
      x: number
      size: number
      type: number
      verticalFactor: number
    }>
    const treeCount = 10

    // Create trees with different sizes
    for (let i = 0; i < treeCount; i++) {
      trees.push({
        x: Math.random() * vw,
        size: Math.floor(Math.random() * 3) + 2, // 2, 3, or 4 (no tiny trees)
        type: Math.floor(Math.random() * 2), // 0 or 1 (different tree types)
        verticalFactor: Math.random(), // Random vertical placement within grass
      })
    }

    // Create improved pixel runner sprite
    const runnerSprite = document.createElement("canvas")
    runnerSprite.width = runnerWidth * spriteFrames
    runnerSprite.height = runnerHeight
    const spriteCtx = runnerSprite.getContext("2d")

    if (spriteCtx) {
      // Clear the context with transparent pixels
      spriteCtx.clearRect(0, 0, runnerSprite.width, runnerSprite.height)
      spriteCtx.imageSmoothingEnabled = false // Disable anti-aliasing for pixel art

      // Create a detailed retro-style pixel runner with 6 frames
      const headColor = "#F5DEB3" // Beige color for head
      const skinColor = "#FFDBAC" // Slightly darker skin for arms/legs
      const shirtColor = "#FF0000" // Red shirt
      const shortsColor = "#0000FF" // Blue shorts
      const shoeColor = "#000000" // Black shoes

      // Helper function to draw a frame
      const drawFrame = (frameOffset: number, leftLegY: number, rightLegY: number, leftArmAngle: number, rightArmAngle: number, leftLegAngle: number, rightLegAngle: number) => {
        const x = frameOffset
        
        // Head (more detailed)
        spriteCtx.fillStyle = headColor
        spriteCtx.fillRect(x + 10, 2, 12, 10) // Head
        // Eyes
        spriteCtx.fillStyle = "#000000"
        spriteCtx.fillRect(x + 12, 5, 2, 2) // Left eye
        spriteCtx.fillRect(x + 18, 5, 2, 2) // Right eye
        // Hair
        spriteCtx.fillStyle = "#3D2817"
        spriteCtx.fillRect(x + 10, 2, 12, 3) // Hair on top
        
        // Torso (shirt)
        spriteCtx.fillStyle = shirtColor
        spriteCtx.fillRect(x + 8, 12, 16, 12) // Torso
        
        // Arms (static - no movement)
        spriteCtx.fillStyle = skinColor
        // Left arm - always in same position
        spriteCtx.fillRect(x + 4, 16, 4, 8) // Left arm
        // Right arm - always in same position
        spriteCtx.fillRect(x + 24, 16, 4, 8) // Right arm
        
        // Shorts
        spriteCtx.fillStyle = shortsColor
        spriteCtx.fillRect(x + 8, 24, 16, 6) // Shorts
        
        // Legs (running animation)
        spriteCtx.fillStyle = skinColor
        // Left leg
        spriteCtx.fillRect(x + 10, 30, 4, leftLegY) // Left leg
        // Right leg
        spriteCtx.fillRect(x + 18, 30, 4, rightLegY) // Right leg
        
        // Shoes
        spriteCtx.fillStyle = shoeColor
        spriteCtx.fillRect(x + 9, 30 + leftLegY, 6, 3) // Left shoe
        spriteCtx.fillRect(x + 17, 30 + rightLegY, 6, 3) // Right shoe
      }

      // Frame 1: Left leg forward, right leg back
      drawFrame(0, 8, 6, 0, 0, 8, 6)
      
      // Frame 2: Transition
      drawFrame(runnerWidth, 7, 7, 0, 0, 7, 7)
      
      // Frame 3: Right leg forward, left leg back
      drawFrame(runnerWidth * 2, 6, 8, 0, 0, 6, 8)
      
      // Frame 4: Transition
      drawFrame(runnerWidth * 3, 7, 7, 0, 0, 7, 7)
      
      // Frame 5: Left leg forward again (slight variation)
      drawFrame(runnerWidth * 4, 8, 6, 0, 0, 8, 6)
      
      // Frame 6: Right leg forward (slight variation)
      drawFrame(runnerWidth * 5, 6, 8, 0, 0, 6, 8)
    }

    // Draw a classic pixelated cloud
    const drawCloud = (x: number, y: number, width: number, height: number, type: number) => {
      const palette = paletteRef.current
      // Round to nearest pixel for crisp edges
      x = Math.floor(x)
      y = Math.floor(y)
      width = Math.floor(width)
      height = Math.floor(height)

      ctx.fillStyle = palette.cloud

      // Different cloud types for variety but keeping them simple and pixelated
      if (type === 0) {
        // Simple rectangular cloud with 2 bumps
        ctx.fillRect(x, y, width, height)
        ctx.fillRect(x + width * 0.25, y - height * 0.5, width * 0.2, height * 0.5)
        ctx.fillRect(x + width * 0.6, y - height * 0.3, width * 0.25, height * 0.3)
      } else if (type === 1) {
        // Cloud made of 3 connected blocks
        const blockWidth = width / 3
        const blockHeight = height

        ctx.fillRect(x, y, blockWidth, blockHeight)
        ctx.fillRect(x + blockWidth * 0.8, y - height * 0.3, blockWidth, blockHeight * 1.3)
        ctx.fillRect(x + blockWidth * 1.6, y, blockWidth, blockHeight)
      } else {
        // Simple pixelated cloud shape
        ctx.fillRect(x, y, width, height)
        ctx.fillRect(x - width * 0.2, y + height * 0.3, width * 0.2, height * 0.4)
        ctx.fillRect(x + width, y + height * 0.2, width * 0.2, height * 0.5)
      }

      // Add subtle gray underside for retro depth
      ctx.fillStyle = palette.cloudShadow
      const shadowHeight = Math.max(2, Math.floor(height * 0.3))
      ctx.fillRect(x, y + height - shadowHeight, width, shadowHeight)
    }

    const drawMountain = (x: number, baseWidth: number, height: number, baseY: number) => {
      const palette = paletteRef.current
      x = Math.floor(x)
      baseWidth = Math.floor(baseWidth)
      height = Math.floor(height)
      baseY = Math.floor(baseY)

      ctx.fillStyle = palette.mountainDark
      for (let i = 0; i < height; i++) {
        const progress = 1 - i / height
        const rowWidth = Math.max(1, Math.floor(baseWidth * progress))
        const yOffset = baseY - i
        ctx.fillRect(Math.floor(x - rowWidth / 2), yOffset, rowWidth, 1)
      }

      ctx.fillStyle = palette.mountainLight
      for (let i = 0; i < height; i++) {
        const progress = 1 - i / height
        const rowWidth = Math.max(1, Math.floor((baseWidth * progress) * 0.35))
        const yOffset = baseY - i
        ctx.fillRect(Math.floor(x - rowWidth / 2), yOffset, rowWidth, 1)
      }

      // Snow cap near the top
      const snowHeight = Math.max(6, Math.floor(height * 0.2))
      ctx.fillStyle = palette.mountainSnow
      for (let i = 0; i < snowHeight; i++) {
        const mountainRowIndex = height - 1 - i
        const progress = 1 - mountainRowIndex / height
        const rowWidth = Math.max(1, Math.floor(baseWidth * progress))
        const yOffset = baseY - mountainRowIndex
        ctx.fillRect(Math.floor(x - rowWidth / 2), yOffset, rowWidth, 1)
      }
    }

    // Draw classic pixelated trees
    const drawTree = (x: number, y: number, size: number, type: number) => {
      const palette = paletteRef.current
      // Round to nearest pixel for crisp edges
      x = Math.floor(x)
      y = Math.floor(y)

      // Scale factors based on size
      const scale = size * 4
      const trunkHeight = size * 8
      const trunkWidth = size * 3

      // Draw tree trunk - simple rectangle
      ctx.fillStyle = palette.treeTrunk
      ctx.fillRect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight)

      // Draw tree top based on type
      if (type === 0) {
        // Classic triangular tree (like in old games)
        ctx.fillStyle = palette.treeDark

        // Simple triangle shape
        const treeWidth = scale * 4
        const treeHeight = scale * 5

        // Draw as a series of widening rectangles to create upright triangle
        for (let i = 0; i < treeHeight; i++) {
          const progress = (i + 1) / treeHeight
          const rowWidth = treeWidth * progress
          const width = Math.max(1, Math.floor(rowWidth))
          const yOffset = Math.floor(y - trunkHeight - treeHeight + i)
          ctx.fillRect(Math.floor(x - width / 2), yOffset, width, 1)
        }

        // Add a highlight stripe for depth
        ctx.fillStyle = palette.treeLight
        for (let i = 0; i < treeHeight; i++) {
          const progress = (i + 1) / treeHeight
          const rowWidth = (treeWidth * progress) / 3
          const width = Math.max(1, Math.floor(rowWidth))
          const yOffset = Math.floor(y - trunkHeight - treeHeight + i)
          ctx.fillRect(Math.floor(x - width / 2), yOffset, width, 1)
        }
      } else {
        // Blocky pixel tree (like in Minecraft or older games)
        ctx.fillStyle = palette.treeDark

        // Main block
        const blockSize = scale * 3
        ctx.fillRect(x - blockSize / 2, y - trunkHeight - blockSize, blockSize, blockSize)

        // Top block (smaller)
        ctx.fillStyle = palette.treeLight
        const topSize = blockSize * 0.7
        ctx.fillRect(x - topSize / 2, y - trunkHeight - blockSize - topSize * 0.7, topSize, topSize * 0.7)
      }
    }

    // Draw track field with classic pixelated style
    const drawTrack = () => {
      // Sky - fill entire canvas first
      const palette = paletteRef.current

      ctx.fillStyle = palette.sky
      ctx.fillRect(0, 0, vw, vh)

      const grassY = Math.floor(vh * 0.6)
      const grassHeight = Math.floor(vh * 0.1)

      // Mountains - subtle parallax in the distance
      const mountainBaseY = grassY
      for (const mountain of mountains) {
        drawMountain(mountain.x, mountain.baseWidth, mountain.height, mountainBaseY)
        mountain.x -= mountainSpeed

        if (mountain.x + mountain.baseWidth / 2 < 0) {
          mountain.x = vw + Math.random() * vw * 0.5
          mountain.baseWidth = 140 + Math.random() * 160
          mountain.height = 90 + Math.random() * 90
        }
      }

      // Clouds - drawn with pixel-perfect edges
      for (const cloud of clouds) {
        drawCloud(cloud.x, cloud.y, cloud.width, cloud.height, cloud.type)
        // Move clouds
        cloud.x -= cloud.speed
        // Wrap clouds around
        if (cloud.x + cloud.width < 0) {
          cloud.x = vw
          cloud.y = 30 + Math.random() * 160
          cloud.type = Math.floor(Math.random() * 3)
        }
      }

      // Grass field - classic green
      ctx.fillStyle = palette.grass
      ctx.fillRect(0, grassY, vw, grassHeight)

      // Calculate tree positions and sort by Y position for proper depth
      // In canvas coordinates, Y increases downward:
      // - Smaller Y = higher on screen = farther away = should be drawn first (behind)
      // - Larger Y = lower on screen = closer to viewer = should be drawn last (in front)
      const treePositions = trees.map((tree) => {
        const minBaseY = grassY + grassHeight * 0.2
        const maxBaseY = grassY + grassHeight * 0.95
        const treeY = minBaseY + tree.verticalFactor * (maxBaseY - minBaseY)
        return { tree, treeY }
      })

      // Sort by Y position in ascending order (smaller Y = farther = draw first, larger Y = closer = draw last)
      treePositions.sort((a, b) => a.treeY - b.treeY)

      // Draw trees on grass (sorted by depth)
      for (const { tree, treeY } of treePositions) {
        drawTree(tree.x, treeY, tree.size, tree.type)

        // Move trees left to enhance motion effect
        tree.x -= treeSpeed

        // Respawn trees once they leave the viewport
        const maxTreeWidth = tree.size * 16 // Covers widest triangular tree
        if (tree.x < -maxTreeWidth) {
          tree.x = vw + Math.random() * vw * 0.5
          tree.size = Math.floor(Math.random() * 3) + 2
          tree.type = Math.floor(Math.random() * 2)
          tree.verticalFactor = Math.random()
        }
      }

      // Track - classic brown
      ctx.fillStyle = palette.track
      ctx.fillRect(0, Math.floor(vh * 0.7), vw, Math.floor(vh * 0.3))

      // Lane markers - classic white lines
      ctx.fillStyle = palette.lane
      for (let i = 0; i < 8; i++) {
        const yPos = Math.floor(vh * (0.7 + i * 0.025))
        ctx.fillRect(0, yPos, vw, 2) // Thinner lines for more pixelated look
      }

    }

    // Animation loop with optimized rendering
    let frameCount = 0
    let firstFrameDrawn = false
    const animate = () => {
      try {
        ctx.clearRect(0, 0, vw, vh)

        // Draw the track
        drawTrack()

        // Draw the runner - scaled up for better visibility
        // Only draw if sprite context exists
        if (spriteCtx) {
          ctx.drawImage(
            runnerSprite,
            currentFrame * runnerWidth,
            0,
            runnerWidth,
            runnerHeight,
            Math.floor(runnerX),
            Math.floor(runnerY),
            runnerWidth * 2,
            runnerHeight * 2,
          )
        }

        // Update runner position - 1.5x faster
        runnerX += 3
        if (runnerX > vw + runnerWidth * 2) {
          runnerX = -runnerWidth * 2
        }

        // Update animation frame - adjust speed for smooth animation
        if (frameCount % 6 === 0) {
          currentFrame = (currentFrame + 1) % spriteFrames
        }

        frameCount++

        // Hide loading after first frame is drawn
        if (!firstFrameDrawn) {
          firstFrameDrawn = true
          // Wait for the frame to be painted, then hide loading
          setTimeout(() => {
            console.log("Hiding loading screen")
            setIsLoading((prev) => {
              console.log("Setting isLoading to false, previous value:", prev)
              return false
            })
          }, 100)
        }

        requestAnimationFrame(animate)
      } catch (error) {
        console.error("Animation error:", error)
        // If there's an error, still hide loading after a delay
        setTimeout(() => {
          setIsLoading(() => false)
        }, 500)
      }
    }

    // Start animation
    console.log("Starting animation")
    animate()

    // Fallback: hide loading after max 2 seconds even if animation fails
    const fallbackTimeout = setTimeout(() => {
      console.log("Fallback: hiding loading screen")
      setIsLoading((prev) => {
        console.log("Fallback: Setting isLoading to false, previous value:", prev)
        return false
      })
    }, 2000)

    return () => {
      clearTimeout(fallbackTimeout)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("seasonChange", handleSeasonChange)
    }
  }, [])

  // Update the canvas element to ensure pixel-perfect rendering
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-yellow-400 pixel-text text-sm">LOADING TRACK...</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          imageRendering: "crisp-edges",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </>
  )
}
