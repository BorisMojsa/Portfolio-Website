"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Set canvas to full screen with enhanced pixel ratio for crisp rendering
    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      // Apply scaling once at resize for better performance
      ctx.scale(pixelRatio, pixelRatio)

      // Disable anti-aliasing for pixel-perfect rendering
      ctx.imageSmoothingEnabled = false
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Classic retro game colors - limited palette
    const skyColor = "#5CBCFF" // Classic blue sky
    const trackColor = "#B86F50" // Classic brown track
    const laneColor = "#FFFFFF" // White lane markers
    const grassColor = "#5EBC3F" // Classic green grass
    const treeDarkColor = "#2A7302" // Dark green for trees
    const treeLightColor = "#52A549" // Light green for trees
    const treeTrunkColor = "#7D5B24" // Brown for tree trunks

    // Cloud properties with classic pixelated style
    const clouds = []
    const cloudCount = 5

    // Create clouds with different sizes and speeds
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: 30 + Math.random() * 60,
        width: 40 + Math.random() * 60, // Smaller, more pixelated clouds
        height: 20 + Math.random() * 15,
        speed: 0.5 + Math.random() * 0.3,
        type: Math.floor(Math.random() * 3), // Different cloud types
      })
    }

    // Tree properties
    const trees = []
    const treeCount = 10

    // Create trees with different sizes
    for (let i = 0; i < treeCount; i++) {
      trees.push({
        x: Math.random() * canvas.width,
        size: Math.floor(Math.random() * 3) + 1, // 1, 2, or 3 (small, medium, large)
        type: Math.floor(Math.random() * 2), // 0 or 1 (different tree types)
      })
    }

    // Runner sprite properties
    const runnerWidth = 32
    const runnerHeight = 32
    const spriteFrames = 4
    let currentFrame = 0
    let runnerX = -runnerWidth
    const runnerY = canvas.height * 0.7 - runnerHeight // Position on track

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

        // Draw as a series of decreasing width rectangles to create triangle
        for (let i = 0; i < treeHeight; i++) {
          const rowWidth = treeWidth * (1 - i / treeHeight)
          ctx.fillRect(
            Math.floor(x - rowWidth / 2),
            Math.floor(y - trunkHeight - treeHeight + i),
            Math.floor(rowWidth),
            1,
          )
        }

        // Add a highlight on one side
        ctx.fillStyle = treeLightColor
        for (let i = 0; i < treeHeight; i++) {
          const rowWidth = (treeWidth * (1 - i / treeHeight)) / 3
          ctx.fillRect(
            Math.floor(x - rowWidth / 2),
            Math.floor(y - trunkHeight - treeHeight + i),
            Math.floor(rowWidth),
            1,
          )
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
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Clouds - drawn with pixel-perfect edges
      for (const cloud of clouds) {
        drawCloud(cloud.x, cloud.y, cloud.width, cloud.height, cloud.type)
        // Move clouds
        cloud.x -= cloud.speed
        // Wrap clouds around
        if (cloud.x + cloud.width < 0) {
          cloud.x = canvas.width
          cloud.y = 30 + Math.random() * 60
          cloud.type = Math.floor(Math.random() * 3)
        }
      }

      // Grass field - classic green
      ctx.fillStyle = grassColor
      const grassY = Math.floor(canvas.height * 0.6)
      const grassHeight = Math.floor(canvas.height * 0.1)
      ctx.fillRect(0, grassY, canvas.width, grassHeight)

      // Draw trees on grass
      for (const tree of trees) {
        // Position trees on the grass
        const treeY = grassY + grassHeight
        drawTree(tree.x, treeY, tree.size, tree.type)
      }

      // Track - classic brown
      ctx.fillStyle = trackColor
      ctx.fillRect(0, Math.floor(canvas.height * 0.7), canvas.width, Math.floor(canvas.height * 0.3))

      // Lane markers - classic white lines
      ctx.fillStyle = laneColor
      for (let i = 0; i < 8; i++) {
        const yPos = Math.floor(canvas.height * (0.7 + i * 0.025))
        ctx.fillRect(0, yPos, canvas.width, 2) // Thinner lines for more pixelated look
      }

      // Finish line pattern - classic checkered pattern
      const finishLineX = Math.floor(canvas.width * 0.8)
      ctx.fillStyle = "#000000"
      const checkSize = 8 // Smaller checks for more pixelated look
      for (let i = 0; i < Math.ceil((canvas.height * 0.3) / checkSize); i++) {
        for (let j = 0; j < 4; j++) {
          if ((i + j) % 2 === 0) {
            ctx.fillRect(
              finishLineX + j * checkSize,
              Math.floor(canvas.height * 0.7) + i * checkSize,
              checkSize,
              checkSize,
            )
          }
        }
      }
    }

    // Animation loop with optimized rendering
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

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
      if (runnerX > canvas.width) {
        runnerX = -runnerWidth * 2
      }

      // Update animation frame - slower for better visibility
      if (frameCount % 8 === 0) {
        currentFrame = (currentFrame + 1) % spriteFrames
      }

      frameCount++
      requestAnimationFrame(animate)
    }

    let frameCount = 0
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Update the canvas element to ensure pixel-perfect rendering
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        imageRendering: "pixelated",
        imageRendering: "-moz-crisp-edges",
        imageRendering: "crisp-edges",
      }}
    />
  )
}
