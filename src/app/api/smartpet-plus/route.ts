import { NextResponse, NextRequest } from "next/server"

const API_TIMEOUT = 55000 // 55 seconds

// Backend API URL - update this to your deployed SmartPetPlus-Backend URL
const SMART_PET_API_URL = process.env.SMART_PET_API_URL || "https://my-personal-website-t7tw.onrender.com/api/analyze"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { image, imageUrl } = body

    let base64Image: string

    // If base64 image is provided directly (from file upload), use it
    if (image) {
      base64Image = image
    } else if (imageUrl) {
      // Validate URL format
      if (!imageUrl.match(/^https?:\/\/.+\..+/)) {
        return NextResponse.json(
          { success: false, error: "Invalid image URL format", result: null },
          { status: 400 }
        )
      }

      // Fetch image from URL and convert to base64
      try {
        const imageResponse = await fetch(imageUrl)
        if (!imageResponse.ok) {
          return NextResponse.json(
            { success: false, error: "Failed to fetch image from URL", result: null },
            { status: 400 }
          )
        }
        const imageBuffer = await imageResponse.arrayBuffer()
        base64Image = Buffer.from(imageBuffer).toString("base64")
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            error: error instanceof Error ? error.message : "Failed to process image URL",
            result: null,
          },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { success: false, error: "No image provided (file or URL required)", result: null },
        { status: 400 }
      )
    }

    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

    try {
      // Forward to Flask API with base64 image
      const response = await fetch(SMART_PET_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(process.env.SMART_PET_SHARED_SECRET
            ? { "X-Shared-Secret": process.env.SMART_PET_SHARED_SECRET }
            : {}),
        },
        body: JSON.stringify({
          image: base64Image,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      let responseData
      const contentType = response.headers.get("content-type")

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json()
      } else {
        const textResponse = await response.text()
        return NextResponse.json(
          {
            success: false,
            error: `Invalid response format: ${textResponse.substring(0, 100)}...`,
            result: null,
          },
          { status: 500 }
        )
      }

      if (!response.ok) {
        return NextResponse.json(
          {
            success: false,
            error: responseData.error || `API Error (${response.status})`,
            result: null,
          },
          { status: response.status }
        )
      }

      return NextResponse.json(responseData)
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === "AbortError") {
        return NextResponse.json(
          {
            success: false,
            error: "Request timeout - the API took too long to respond",
            result: null,
          },
          { status: 504 }
        )
      }
      throw error
    }
  } catch (error) {
    console.error("Error in smartpet-plus route:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
        result: null,
      },
      { status: 500 }
    )
  }
}

