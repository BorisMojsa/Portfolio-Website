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
    const cloudCount = 8 // Increased number of clouds for better coverage

    // Create clouds with different sizes, positions and speeds
    for (let i = 0; i < cloudCount; i++) {
      // Spread clouds more vertically across the sky
      const verticalPosition = 20 + (i / cloudCount) * (canvas.height * 0.4);
      const verticalVariation = Math.random() * 40 - 20; // Add some randomness
      
      clouds.push({
        x: Math.random() * canvas.width,
        y: verticalPosition + verticalVariation, // More vertical spread
        width: 30 + Math.random() * 70, // Varied cloud sizes
        height: 15 + Math.random() * 20,
        speed: 0.3 + Math.random() * 0.4, // Slower and more varied speeds
        type: Math.floor(Math.random() * 3), // Different cloud types
      })
    }

    // Tree properties
    const trees = []
    const treeCount = 15 // Increased number of trees for better coverage

    // Create trees with different sizes and positions
    for (let i = 0; i < treeCount; i++) {
      trees.push({
        x: Math.random() * canvas.width,
        yOffset: Math.random() * 30 - 15, // Random vertical offset (-15 to 15px)
        size: 3 + Math.random() * 4, // Larger random size (3-7)
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

      // Frame 1 - Running position 1
      spriteCtx.fillStyle = "#FF0000" // Red shirt
      spriteCtx.fillRect(5, 4, 10, 10) // Torso (centered at x=10)
      spriteCtx.fillStyle = "#0000FF" // Blue shorts
      spriteCtx.fillRect(5, 14, 10, 6) // Shorts
      spriteCtx.fillStyle = "#FFFFFF" // White skin tone
      // Legs always connect to shorts (y=20)
      // Left leg (extended back)
      spriteCtx.fillRect(7, 20, 3, 8)  // Upper leg (fixed position)
      // Right leg (extended forward)
      spriteCtx.fillRect(11, 20, 3, 8)  // Upper leg (fixed position)
      // Shoes (animate these up/down)
      spriteCtx.fillStyle = "#333333" // Dark gray for shoes
      spriteCtx.fillRect(6, 28, 4, 2)  // Left shoe (down position)
      spriteCtx.fillRect(10, 26, 4, 2) // Right shoe (slightly up)
      // Head
      spriteCtx.fillStyle = headColor
      spriteCtx.fillRect(7, 0, 6, 4) // Head

      // Frame 2 - Running position 2
      spriteCtx.fillStyle = "#FF0000"
      spriteCtx.fillRect(5 + runnerWidth, 4, 10, 10)
      spriteCtx.fillStyle = "#0000FF"
      spriteCtx.fillRect(5 + runnerWidth, 14, 10, 6)
      spriteCtx.fillStyle = "#FFFFFF"
      // Legs (fixed positions)
      spriteCtx.fillRect(7 + runnerWidth, 20, 3, 8)  // Left leg
      spriteCtx.fillRect(11 + runnerWidth, 20, 3, 8) // Right leg
      // Shoes (left up, right down)
      spriteCtx.fillStyle = "#333333"
      spriteCtx.fillRect(6 + runnerWidth, 25, 4, 2)  // Left shoe (up)
      spriteCtx.fillRect(10 + runnerWidth, 28, 4, 2) // Right shoe (down)
      // Head
      spriteCtx.fillStyle = headColor
      spriteCtx.fillRect(7 + runnerWidth, 0, 6, 4)

      // Frame 3 - Running position 3
      spriteCtx.fillStyle = "#FF0000"
      spriteCtx.fillRect(5 + runnerWidth * 2, 4, 10, 10)
      spriteCtx.fillStyle = "#0000FF"
      spriteCtx.fillRect(5 + runnerWidth * 2, 14, 10, 6)
      spriteCtx.fillStyle = "#FFFFFF"
      // Legs (fixed positions)
      spriteCtx.fillRect(7 + runnerWidth * 2, 20, 3, 8)  // Left leg
      spriteCtx.fillRect(11 + runnerWidth * 2, 20, 3, 8) // Right leg
      // Shoes (left down, right up)
      spriteCtx.fillStyle = "#333333"
      spriteCtx.fillRect(6 + runnerWidth * 2, 28, 4, 2)  // Left shoe (down)
      spriteCtx.fillRect(10 + runnerWidth * 2, 25, 4, 2) // Right shoe (up)
      // Head
      spriteCtx.fillStyle = headColor
      spriteCtx.fillRect(7 + runnerWidth * 2, 0, 6, 4)
      
      // Frame 4 - Running position 4 (mirror of frame 2)
      spriteCtx.fillStyle = "#FF0000"
      spriteCtx.fillRect(5 + runnerWidth * 3, 4, 10, 10)
      spriteCtx.fillStyle = "#0000FF"
      spriteCtx.fillRect(5 + runnerWidth * 3, 14, 10, 6)
      spriteCtx.fillStyle = "#FFFFFF"
      // Legs (fixed positions)
      spriteCtx.fillRect(7 + runnerWidth * 3, 20, 3, 8)  // Left leg
      spriteCtx.fillRect(11 + runnerWidth * 3, 20, 3, 8) // Right leg
      // Shoes (left up, right down)
      spriteCtx.fillStyle = "#333333"
      spriteCtx.fillRect(6 + runnerWidth * 3, 25, 4, 2)  // Left shoe (up)
      spriteCtx.fillRect(10 + runnerWidth * 3, 28, 4, 2) // Right shoe (down)
      // Head
      spriteCtx.fillStyle = headColor
      spriteCtx.fillRect(7 + runnerWidth * 3, 0, 6, 4)
    }

    // Draw a detailed retro pixel cloud
    const drawCloud = (x, y, width, height, type) => {
      // Round to nearest pixel for crisp edges
      x = Math.floor(x)
      y = Math.floor(y)
      width = Math.max(20, Math.floor(width)) // Ensure minimum size
      height = Math.max(10, Math.floor(height))
      
      // Cloud colors - primarily white with subtle gray accents
      const cloudColors = [
        '#FFFFFF', // Pure white (main)
        '#F0F0F0', // Very light gray (subtle shadows)
        '#E0E0E0'  // Light gray (accent)
      ]
      
      // Start with the lightest color as base
      ctx.fillStyle = cloudColors[0] // White base
      
      // Different cloud types for variety
      if (type === 0) {
        // Detailed fluffy cloud with multiple layers
        // Main white body with rounded corners
        ctx.fillStyle = cloudColors[0]
        
        // Draw main cloud segments with slight overlap
        const segments = [
          // Main body
          { x: 0.1, y: 0.2, w: 0.8, h: 0.7 },
          // Top bump
          { x: 0.2, y: -0.2, w: 0.6, h: 0.6 },
          // Side bump right
          { x: 0.6, y: 0.1, w: 0.4, h: 0.7 },
          // Side bump left
          { x: -0.1, y: 0.2, w: 0.3, h: 0.5 }
        ]
        
        // Draw main white segments
        segments.forEach(seg => {
          ctx.fillRect(
            x + Math.floor(seg.x * width),
            y + Math.floor(seg.y * height),
            Math.ceil(seg.w * width),
            Math.ceil(seg.h * height)
          )
        })
        
        // Add subtle highlights
        ctx.fillStyle = cloudColors[0] // White highlight
        segments.forEach(seg => {
          ctx.fillRect(
            x + Math.floor(seg.x * width) + 1,
            y + Math.floor(seg.y * height) + 1,
            Math.max(1, Math.ceil(seg.w * width) - 2),
            Math.max(1, Math.ceil(seg.h * height) - 2)
          )
        })
        
        // Add subtle shadow at bottom
        ctx.fillStyle = cloudColors[2] // Light gray shadow
        ctx.fillRect(
          x + 2,
          y + height * 0.7,
          width * 0.8,
          height * 0.15
        )
        
        // Add some small details
        ctx.fillStyle = cloudColors[1]
        // Small top highlight
        ctx.fillRect(
          x + width * 0.3,
          y - height * 0.1,
          width * 0.3,
          1
        )
        
      } else if (type === 1) {
        // Detailed wispy cloud with flowing segments
        ctx.fillStyle = cloudColors[0]
        
        // Draw main segments with varied heights and overlaps
        const segments = [
          // Base segments
          { x: 0, y: 0.3, w: 0.25, h: 0.5 },
          { x: 0.2, y: 0.1, w: 0.3, h: 0.7 },
          { x: 0.4, y: 0.2, w: 0.35, h: 0.6 },
          { x: 0.6, y: 0, w: 0.35, h: 0.8 },
          { x: 0.8, y: 0.25, w: 0.2, h: 0.55 }
        ]
        
        // Draw main white segments with slight overlap
        segments.forEach(seg => {
          ctx.fillRect(
            x + Math.floor(seg.x * width),
            y + Math.floor(seg.y * height),
            Math.ceil(seg.w * width) + 1, // +1 for overlap
            Math.ceil(seg.h * height)
          )
        })
        
        // Add highlights to top of each segment
        ctx.fillStyle = cloudColors[0]
        segments.forEach(seg => {
          // Top highlight
          ctx.fillRect(
            x + Math.floor(seg.x * width) + 1,
            y + Math.floor(seg.y * height) + 1,
            Math.max(1, Math.ceil(seg.w * width) - 2),
            1
          )
          // Left edge highlight
          ctx.fillRect(
            x + Math.floor(seg.x * width) + 1,
            y + Math.floor(seg.y * height) + 1,
            1,
            Math.max(1, Math.ceil(seg.h * height) - 1)
          )
        })
        
        // Add subtle shadows between segments
        ctx.fillStyle = cloudColors[2]
        for (let i = 0; i < segments.length - 1; i++) {
          const seg1 = segments[i]
          const seg2 = segments[i + 1]
          
          // Shadow where segments meet
          const shadowY = Math.max(seg1.y, seg2.y) + 0.2
          const shadowHeight = Math.min(seg1.h, seg2.h) * 0.6
          
          if (shadowY < seg1.y + seg1.h && shadowY < seg2.y + seg2.h) {
            ctx.fillRect(
              x + Math.floor(seg1.x * width + seg1.w * width) - 2,
              y + Math.floor(shadowY * height),
              3,
              Math.ceil(shadowHeight * height)
            )
          }
        }
        
      } else {
        // Detailed puffy cloud with depth
        // Main white body with rounded corners
        ctx.fillStyle = cloudColors[0]
        
        // Draw main cloud shape with multiple layers
        const mainBody = { x: 0.05, y: 0.1, w: 0.9, h: 0.8 }
        const topBump = { x: 0.2, y: -0.1, w: 0.6, h: 0.5 }
        const sideBump1 = { x: -0.1, y: 0.2, w: 0.3, h: 0.6 }
        const sideBump2 = { x: 0.8, y: 0.15, w: 0.3, h: 0.65 }
        
        // Draw all parts
        ;[mainBody, topBump, sideBump1, sideBump2].forEach(part => {
          ctx.fillRect(
            x + Math.floor(part.x * width),
            y + Math.floor(part.y * height),
            Math.ceil(part.w * width),
            Math.ceil(part.h * height)
          )
        })
        
        // Add highlights
        ctx.fillStyle = cloudColors[0]
        // Top highlight
        ctx.fillRect(
          x + Math.floor(width * 0.3),
          y + 1,
          Math.ceil(width * 0.4),
          1
        )
        // Side highlights
        ctx.fillRect(
          x + 1,
          y + Math.floor(height * 0.4),
          1,
          Math.ceil(height * 0.3)
        )
        ctx.fillRect(
          x + width - 2,
          y + Math.floor(height * 0.3),
          1,
          Math.ceil(height * 0.4)
        )
        
        // Add subtle shadows
        ctx.fillStyle = cloudColors[2]
        // Bottom shadow
        ctx.fillRect(
          x + 3,
          y + Math.floor(height * 0.8),
          width - 6,
          2
        )
        // Side shadows
        ctx.fillRect(
          x + 2,
          y + Math.floor(height * 0.7),
          1,
          Math.ceil(height * 0.1)
        )
        ctx.fillRect(
          x + width - 3,
          y + Math.floor(height * 0.65),
          1,
          Math.ceil(height * 0.15)
        )
      }
    }

    // Draw classic pixelated trees
    const drawTree = (x, y, size, type) => {
      // Round to nearest pixel for crisp edges
      x = Math.floor(x)
      y = Math.floor(y)

      // Scale factors based on size
      const scale = size * 3 // Increased scale for larger trees
      const trunkHeight = size * 3
      const trunkWidth = size * 1.5

      // Draw tree top (triangle shape)
      const treeHeight = scale * 3 // Taller trees
      const baseWidth = scale * 2.5 // Wider base
      
      // Position the tree top above the trunk
      const treeTopY = y - trunkHeight - treeHeight

      // Draw the main triangle (point at top, wide at bottom)
      ctx.fillStyle = treeDarkColor
      for (let i = 0; i < treeHeight; i++) {
        // Calculate width at current height (wider at bottom)
        const width = baseWidth * (i / treeHeight)
        ctx.fillRect(
          Math.floor(x - width/2),
          Math.floor(treeTopY + i),
          Math.ceil(width),
          1
        )
      }
      
      // Add highlight on one side for depth
      ctx.fillStyle = treeLightColor
      for (let i = 0; i < treeHeight; i++) {
        const width = (baseWidth * (i / treeHeight)) * 0.6
        ctx.fillRect(
          Math.floor(x - baseWidth * 0.2),
          Math.floor(treeTopY + i),
          Math.ceil(width * 0.7),
          1
        )
      }
      
      // Draw tree trunk (centered under the tree)
      ctx.fillStyle = treeTrunkColor
      ctx.fillRect(
        x - trunkWidth/2,
        y - trunkHeight,
        trunkWidth,
        trunkHeight
      )
    }

    // Draw track field with classic pixelated style
    const drawTrack = () => {
      // Sky - fill entire canvas first
      ctx.fillStyle = skyColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw distant mountains
      const mountainColors = [
        '#3a5f0b',  // Dark green
        '#2c4a0a',  // Darker green
        '#1e3307'   // Darkest green
      ] as const;
      
      // Draw multiple layers of mountains with parallax
      for (let layer = 0; layer < 3; layer++) {
        const segmentWidth = 150 - (layer * 30); // Wider segments for closer mountains
        const segments = Math.ceil(canvas.width / segmentWidth) + 2;
        const baseY = Math.floor(canvas.height * 0.6); // Fixed Y position at grass line
        const maxHeight = 60 - (layer * 15);
        
        // Slower movement for distant mountains
        const offset = (animationFrameCount * 0.1 * (layer + 1)) % (segmentWidth * 2);
        
        ctx.fillStyle = mountainColors[layer];
        
        for (let i = -1; i < segments; i++) {
          const x = (i * segmentWidth) - offset;
          const height = maxHeight * (0.8 + Math.sin(i * 1.2) * 0.2); // Fixed height variation
          
          // Draw triangle mountain
          ctx.beginPath();
          ctx.moveTo(x, baseY);
          ctx.lineTo(x + segmentWidth * 0.5, baseY - height);
          ctx.lineTo(x + segmentWidth, baseY);
          ctx.closePath();
          ctx.fill();
          
          // Add snow caps to the closest mountains
          if (layer === 0) {
            const snowHeight = 4;
            ctx.fillStyle = '#f0f0f0';
            ctx.beginPath();
            ctx.moveTo(x + segmentWidth * 0.45, baseY - height + snowHeight);
            ctx.lineTo(x + segmentWidth * 0.5, baseY - height);
            ctx.lineTo(x + segmentWidth * 0.55, baseY - height + snowHeight);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = mountainColors[layer];
          }
        }
      }

      // Clouds - drawn with pixel-perfect edges
      for (const cloud of clouds as Array<{x: number, y: number, width: number, height: number, speed: number, type: number}>) {
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

      // Draw trees on grass with random positions
      for (const tree of trees as Array<{x: number, yOffset: number, size: number, type: number}>) {
        // Position trees on the grass with some vertical variation
        const treeY = grassY + grassHeight / 2 + tree.yOffset
        drawTree(tree.x, treeY, tree.size, tree.type)
        
        // Move trees at the same speed
        tree.x -= 1.5 // Fixed speed for all trees
        if (tree.x < -100) {
          tree.x = canvas.width + 50
          tree.yOffset = Math.random() * 30 - 15 // New random vertical position
        }
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

    // Track animation frames for mountain movement and animation
    let animationFrameCount = 0;

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
      if (animationFrameCount % 8 === 0) {
        currentFrame = (currentFrame + 1) % spriteFrames
      }

      animationFrameCount++
      requestAnimationFrame(animate)
    }

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
