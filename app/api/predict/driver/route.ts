export const dynamic = "force-dynamic"

import { predictDriver } from "@/lib/ml-predictor"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const driverId = Number.parseInt(searchParams.get("driverId") || "0")
    const year = Number.parseInt(searchParams.get("year") || "2025")

    if (!driverId || driverId < 1) {
      return Response.json(
        { success: false, error: "Invalid driver ID" },
        { status: 400 }
      )
    }

    const prediction = await predictDriver(driverId, year)

    return new Response(
      JSON.stringify({
        success: true,
        data: prediction,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    )
  } catch (error) {
    console.error("[Predict Driver API Error]:", error)
    return Response.json(
      { success: false, error: "Failed to predict driver" },
      { status: 500 }
    )
  }
}
