"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Runner sprite properties need to be defined before resize logic
    const runnerWidth = 32
    const runnerHeight = 32
    const spriteFrames = 4
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

    // Classic retro game colors - limited palette
    const skyColor = "#5CBCFF" // Classic blue sky
    const trackColor = "#B86F50" // Classic brown track
    const laneColor = "#FFFFFF" // White lane markers
    const grassColor = "#5EBC3F" // Classic green grass
    const treeDarkColor = "#2A7302" // Dark green for trees
    const treeLightColor = "#52A549" // Light green for trees
    const treeTrunkColor = "#7D5B24" // Brown for tree trunks
    const mountainDarkColor = "#3A4F6A" // Distant mountain base
    const mountainLightColor = "#5C7B9C" // Highlight shade for mountains
    const mountainSnowColor = "#FFFFFF" // Snow caps for mountains

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
        size: Math.floor(Math.random() * 3) + 1, // 1, 2, or 3 (small, medium, large)
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

      // Create a classic pixel runner with 4 frames
      const headColor = "#F5DEB3" // Beige color for head

      // Frame 1
      spriteCtx.fillStyle = "#FF0000" // Red shirt
      spriteCtx.fillRect(4, 4, 10, 10) // Torso
      spriteCtx.fillStyle = "#0000FF" // Blue shorts
      spriteCtx.fillRect(4, 14, 10, 6) // Shorts
      spriteCtx.fillStyle = "#FFFFFF" // White skin tone
      spriteCtx.fillRect(6, 20, 3, 8) // Left leg down
      spriteCtx.fillRect(12, 20, 3, 8) // Right leg back
      spriteCtx.fillStyle = headColor // Beige head
      spriteCtx.fillRect(6, 0, 6, 4) // Head

      // Frame 2
      spriteCtx.fillStyle = "#FF0000" // Red shirt
      spriteCtx.fillRect(4 + runnerWidth, 4, 10, 10) // Torso
      spriteCtx.fillStyle = "#0000FF" // Blue shorts
      spriteCtx.fillRect(4 + runnerWidth, 14, 10, 6) // Shorts
      spriteCtx.fillStyle = "#FFFFFF" // White skin tone
      spriteCtx.fillRect(6 + runnerWidth, 20, 3, 6) // Left leg up
      spriteCtx.fillRect(12 + runnerWidth, 20, 3, 8) // Right leg down
      spriteCtx.fillStyle = headColor // Beige head
      spriteCtx.fillRect(6 + runnerWidth, 0, 6, 4) // Head

      // Frame 3
      spriteCtx.fillStyle = "#FF0000" // Red shirt
      spriteCtx.fillRect(4 + runnerWidth * 2, 4, 10, 10) // Torso
      spriteCtx.fillStyle = "#0000FF" // Blue shorts
      spriteCtx.fillRect(4 + runnerWidth * 2, 14, 10, 6) // Shorts
      spriteCtx.fillStyle = "#FFFFFF" // White skin tone
      spriteCtx.fillRect(6 + runnerWidth * 2, 20, 3, 8) // Left leg back
      spriteCtx.fillRect(12 + runnerWidth * 2, 20, 3, 6) // Right leg up
      spriteCtx.fillStyle = headColor // Beige head
      spriteCtx.fillRect(6 + runnerWidth * 2, 0, 6, 4) // Head

      // Frame 4
      spriteCtx.fillStyle = "#FF0000" // Red shirt
      spriteCtx.fillRect(4 + runnerWidth * 3, 4, 10, 10) // Torso
      spriteCtx.fillStyle = "#0000FF" // Blue shorts
      spriteCtx.fillRect(4 + runnerWidth * 3, 14, 10, 6) // Shorts
      spriteCtx.fillStyle = "#FFFFFF" // White skin tone
      spriteCtx.fillRect(6 + runnerWidth * 3, 20, 3, 8) // Left leg down
      spriteCtx.fillRect(12 + runnerWidth * 3, 20, 3, 8) // Right leg down
      spriteCtx.fillStyle = headColor // Beige head
      spriteCtx.fillRect(6 + runnerWidth * 3, 0, 6, 4) // Head
    }

    // Draw a classic pixelated cloud
    const drawCloud = (x, y, width, height, type) => {
      // Round to nearest pixel for crisp edges
      x = Math.floor(x)
      y = Math.floor(y)
      width = Math.floor(width)
      height = Math.floor(height)

      ctx.fillStyle = "#FFFFFF"

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
      ctx.fillStyle = "#D0D0D0"
      const shadowHeight = Math.max(2, Math.floor(height * 0.3))
      ctx.fillRect(x, y + height - shadowHeight, width, shadowHeight)
    }

    const drawMountain = (x, baseWidth, height, baseY) => {
      x = Math.floor(x)
      baseWidth = Math.floor(baseWidth)
      height = Math.floor(height)
      baseY = Math.floor(baseY)

      ctx.fillStyle = mountainDarkColor
      for (let i = 0; i < height; i++) {
        const progress = 1 - i / height
        const rowWidth = Math.max(1, Math.floor(baseWidth * progress))
        const yOffset = baseY - i
        ctx.fillRect(Math.floor(x - rowWidth / 2), yOffset, rowWidth, 1)
      }

      ctx.fillStyle = mountainLightColor
      for (let i = 0; i < height; i++) {
        const progress = 1 - i / height
        const rowWidth = Math.max(1, Math.floor((baseWidth * progress) * 0.35))
        const yOffset = baseY - i
        ctx.fillRect(Math.floor(x - rowWidth / 2), yOffset, rowWidth, 1)
      }

      // Snow cap near the top
      const snowHeight = Math.max(6, Math.floor(height * 0.2))
      ctx.fillStyle = mountainSnowColor
      for (let i = 0; i < snowHeight; i++) {
        const mountainRowIndex = height - 1 - i
        const progress = 1 - mountainRowIndex / height
        const rowWidth = Math.max(1, Math.floor(baseWidth * progress))
        const yOffset = baseY - mountainRowIndex
        ctx.fillRect(Math.floor(x - rowWidth / 2), yOffset, rowWidth, 1)
      }
    }

    // Draw classic pixelated trees
    const drawTree = (x, y, size, type) => {
      // Round to nearest pixel for crisp edges
      x = Math.floor(x)
      y = Math.floor(y)

      // Scale factors based on size
      const scale = size * 4
      const trunkHeight = size * 8
      const trunkWidth = size * 3

      // Draw tree trunk - simple rectangle
      ctx.fillStyle = treeTrunkColor
      ctx.fillRect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight)

      // Draw tree top based on type
      if (type === 0) {
        // Classic triangular tree (like in old games)
        ctx.fillStyle = treeDarkColor

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
        ctx.fillStyle = treeLightColor
        for (let i = 0; i < treeHeight; i++) {
          const progress = (i + 1) / treeHeight
          const rowWidth = (treeWidth * progress) / 3
          const width = Math.max(1, Math.floor(rowWidth))
          const yOffset = Math.floor(y - trunkHeight - treeHeight + i)
          ctx.fillRect(Math.floor(x - width / 2), yOffset, width, 1)
        }
      } else {
        // Blocky pixel tree (like in Minecraft or older games)
        ctx.fillStyle = treeDarkColor

        // Main block
        const blockSize = scale * 3
        ctx.fillRect(x - blockSize / 2, y - trunkHeight - blockSize, blockSize, blockSize)

        // Top block (smaller)
        ctx.fillStyle = treeLightColor
        const topSize = blockSize * 0.7
        ctx.fillRect(x - topSize / 2, y - trunkHeight - blockSize - topSize * 0.7, topSize, topSize * 0.7)
      }
    }

    // Draw track field with classic pixelated style
    const drawTrack = () => {
      // Sky - fill entire canvas first
      ctx.fillStyle = skyColor
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
      ctx.fillStyle = grassColor
      ctx.fillRect(0, grassY, vw, grassHeight)

      // Draw trees on grass
      for (const tree of trees) {
        // Position trees on the grass
        const minBaseY = grassY + grassHeight * 0.2
        const maxBaseY = grassY + grassHeight * 0.95
        const treeY = minBaseY + tree.verticalFactor * (maxBaseY - minBaseY)
        drawTree(tree.x, treeY, tree.size, tree.type)

        // Move trees left to enhance motion effect
        tree.x -= treeSpeed

        // Respawn trees once they leave the viewport
        const maxTreeWidth = tree.size * 16 // Covers widest triangular tree
        if (tree.x < -maxTreeWidth) {
          tree.x = vw + Math.random() * vw * 0.5
          tree.size = Math.floor(Math.random() * 3) + 1
          tree.type = Math.floor(Math.random() * 2)
          tree.verticalFactor = Math.random()
        }
      }

      // Track - classic brown
      ctx.fillStyle = trackColor
      ctx.fillRect(0, Math.floor(vh * 0.7), vw, Math.floor(vh * 0.3))

      // Lane markers - classic white lines
      ctx.fillStyle = laneColor
      for (let i = 0; i < 8; i++) {
        const yPos = Math.floor(vh * (0.7 + i * 0.025))
        ctx.fillRect(0, yPos, vw, 2) // Thinner lines for more pixelated look
      }

    }

    // Animation loop with optimized rendering
    let frameCount = 0
    const animate = () => {
      ctx.clearRect(0, 0, vw, vh)

      // Draw the track
      drawTrack()

      // Draw the runner - scaled up for better visibility
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

      // Update runner position
      runnerX += 3
      if (runnerX > vw) {
        runnerX = -runnerWidth * 2
      }

      // Update animation frame - slower for better visibility
      if (frameCount % 8 === 0) {
        currentFrame = (currentFrame + 1) % spriteFrames
      }

      frameCount++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])

  // Update the canvas element to ensure pixel-perfect rendering
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{
        imageRendering: "crisp-edges",
      }}
    />
  )
}
