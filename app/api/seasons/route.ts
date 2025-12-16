import { loadF1Data } from "@/lib/f1-data-loader"

export async function GET() {
  try {
    const data = await loadF1Data()

    let seasons: { year: number }[] = []

    if (data.races.length > 0) {
      seasons = Array.from(new Set(data.races.map((r) => r.year)))
        .sort((a, b) => b - a)
        .map((year) => ({ year }))
    } else if (data.seasons.length > 0) {
      seasons = data.seasons.map((s) => ({ year: s.year })).sort((a, b) => b.year - a.year)
    } else {
      // Final fallback: generate years 1950-2024
      seasons = Array.from({ length: 75 }, (_, i) => ({
        year: 2024 - i,
      }))
    }

    return Response.json({
      success: true,
      data: seasons,
      count: seasons.length,
    })
  } catch (error) {
    console.error("[API] Error fetching seasons:", error)
    const fallbackSeasons = Array.from({ length: 75 }, (_, i) => ({
      year: 2024 - i,
    }))
    return Response.json({
      success: true,
      data: fallbackSeasons,
      count: fallbackSeasons.length,
    })
  }
}
