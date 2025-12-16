import { getAllTimeRecords } from "@/lib/f1-data-loader"

export async function GET() {
  try {
    const records = await getAllTimeRecords()

    return Response.json({
      success: true,
      data: {
        mostWinsDrivers: records.driverWins.map((item, idx) => ({
          position: idx + 1,
          driverId: item.driverId,
          name: item.driver ? `${item.driver.forename} ${item.driver.surname}` : "Unknown",
          wins: item.wins,
        })),
        mostWinsConstructors: records.constructorWins.map((item, idx) => ({
          position: idx + 1,
          constructorId: item.constructorId,
          name: item.constructor?.name || "Unknown",
          wins: item.wins,
        })),
        mostPolesDrivers: records.driverPoles.map((item, idx) => ({
          position: idx + 1,
          driverId: item.driverId,
          name: item.driver ? `${item.driver.forename} ${item.driver.surname}` : "Unknown",
          poles: item.poles,
        })),
      },
    })
  } catch (error) {
    console.error("[API] Error fetching records:", error)
    return Response.json({ success: false, error: "Failed to fetch records" }, { status: 500 })
  }
}
