import { loadF1Data, getConstructorCareerStats } from "@/lib/f1-data-loader"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const constructorId = Number.parseInt(id)

    const data = await loadF1Data()
    const constructor = data.constructors.get(constructorId)

    if (!constructor) {
      return Response.json({ success: false, error: "Team not found" }, { status: 404 })
    }

    const careerStats = await getConstructorCareerStats(constructorId)

    // Get seasons active
    const seasonYears = new Set<number>()
    data.results.forEach((r) => {
      if (r.constructorId === constructorId) {
        const race = data.races.find((race) => race.raceId === r.raceId)
        if (race) seasonYears.add(race.year)
      }
    })

    return Response.json({
      success: true,
      data: {
        constructorId,
        name: constructor.name,
        nationality: constructor.nationality,
        ...careerStats,
        seasons: Array.from(seasonYears).length,
      },
    })
  } catch (error) {
    console.error("[API] Error fetching team data:", error)
    return Response.json({ success: false, error: "Failed to fetch team data" }, { status: 500 })
  }
}
