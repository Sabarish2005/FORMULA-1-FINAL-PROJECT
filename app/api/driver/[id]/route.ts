import { loadF1Data, getDriverCareerStats } from "@/lib/f1-data-loader"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const driverId = Number.parseInt(id)

    const data = await loadF1Data()
    const driver = data.drivers.get(driverId)

    if (!driver) {
      return Response.json({ success: false, error: "Driver not found" }, { status: 404 })
    }

    const careerStats = await getDriverCareerStats(driverId)

    // Get seasons active
    const seasonYears = new Set<number>()
    data.results.forEach((r) => {
      if (r.driverId === driverId) {
        const race = data.races.find((race) => race.raceId === r.raceId)
        if (race) seasonYears.add(race.year)
      }
    })

    return Response.json({
      success: true,
      data: {
        driverId,
        forename: driver.forename,
        surname: driver.surname,
        nationality: driver.nationality,
        dob: driver.dob,
        code: driver.code,
        ...careerStats,
        seasons: Array.from(seasonYears).length,
      },
    })
  } catch (error) {
    console.error("[API] Error fetching driver data:", error)
    return Response.json({ success: false, error: "Failed to fetch driver data" }, { status: 500 })
  }
}
