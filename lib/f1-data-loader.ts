import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

// Types for F1 data
export interface Driver {
  driverId: number
  driverRef: string
  number?: number
  code?: string
  forename: string
  surname: string
  dob?: string
  nationality: string
}

export interface Constructor {
  constructorId: number
  constructorRef: string
  name: string
  nationality: string
}

export interface Race {
  raceId: number
  year: number
  round: number
  circuitId: number
  name: string
  date: string
  time?: string
}

export interface Result {
  resultId: number
  raceId: number
  driverId: number
  constructorId: number
  number?: number
  grid: number
  position?: number
  positionText: string
  positionOrder: number
  points: number
  laps: number
  time?: string
  milliseconds?: number
  fastestLap?: number
  rank?: number
  fastestLapTime?: string
  fastestLapSpeed?: string
  statusId: number
}

export interface Circuit {
  circuitId: number
  circuitRef: string
  name: string
  location: string
  country: string
  lat?: number
  lng?: number
  alt?: number
}

export interface Season {
  year: number
  url?: string
}

export interface QualiResult {
  qualifyId: number
  raceId: number
  driverId: number
  constructorId: number
  number: number
  position?: number
  q1?: string
  q2?: string
  q3?: string
}

// Singleton cache
let cachedData: {
  drivers: Map<number, Driver>
  constructors: Map<number, Constructor>
  races: Race[]
  results: Result[]
  circuits: Map<number, Circuit>
  seasons: Season[]
  qualifying: QualiResult[]
} | null = null

function parseCsvFile<T>(fileName: string): T[] {
  try {
    const filePath = path.join(process.cwd(), "public", "data", fileName)

    if (!fs.existsSync(filePath)) {
      console.warn(`[F1 Data] CSV file not found: ${fileName}`)
      return []
    }

    const fileContent = fs.readFileSync(filePath, "utf-8")
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      cast: (value, context) => {
        // Auto-convert numeric fields
        if (context.header) return value
        if (value === "" || value === null) return null
        if (!isNaN(Number(value)) && value !== "") return Number(value)
        return value
      },
    })

    return records as T[]
  } catch (error) {
    console.error(`[F1 Data] Error parsing ${fileName}:`, error)
    return []
  }
}

function generateMockData() {
  const mockDrivers = new Map<number, Driver>([
    [1, { driverId: 1, driverRef: "hamilton", forename: "Lewis", surname: "Hamilton", nationality: "British" }],
    [2, { driverId: 2, driverRef: "verstappen", forename: "Max", surname: "Verstappen", nationality: "Dutch" }],
    [3, { driverId: 3, driverRef: "alonso", forename: "Fernando", surname: "Alonso", nationality: "Spanish" }],
    [4, { driverId: 4, driverRef: "leclerc", forename: "Charles", surname: "Leclerc", nationality: "Monegasque" }],
    [5, { driverId: 5, driverRef: "sainz", forename: "Carlos", surname: "Sainz", nationality: "Spanish" }],
  ])

  const mockConstructors = new Map<number, Constructor>([
    [1, { constructorId: 1, constructorRef: "mercedes", name: "Mercedes", nationality: "German" }],
    [2, { constructorId: 2, constructorRef: "red_bull", name: "Red Bull Racing", nationality: "Austrian" }],
    [3, { constructorId: 3, constructorRef: "ferrari", name: "Ferrari", nationality: "Italian" }],
    [4, { constructorId: 4, constructorRef: "mclaren", name: "McLaren", nationality: "British" }],
  ])

  const mockCircuits = new Map<number, Circuit>([
    [1, { circuitId: 1, circuitRef: "monza", name: "Monza", location: "Monza", country: "Italy" }],
    [2, { circuitId: 2, circuitRef: "silverstone", name: "Silverstone", location: "Silverstone", country: "UK" }],
  ])

  const mockRaces: Race[] = Array.from({ length: 20 }, (_, i) => ({
    raceId: i + 1,
    year: 2024,
    round: i + 1,
    circuitId: (i % 2) + 1,
    name: `Grand Prix ${i + 1}`,
    date: "2024-01-01",
  }))

  const mockResults: Result[] = []
  const mockSeasons: Season[] = Array.from({ length: 75 }, (_, i) => ({
    year: 1950 + i,
  }))

  return {
    drivers: mockDrivers,
    constructors: mockConstructors,
    races: mockRaces,
    results: mockResults,
    circuits: mockCircuits,
    seasons: mockSeasons,
    qualifying: [],
  }
}

export async function loadF1Data() {
  // Return cached data if available
  if (cachedData) {
    return cachedData
  }

  try {
    // Load all CSV files
    const drivers = parseCsvFile<Driver>("drivers.csv")
    const constructors = parseCsvFile<Constructor>("constructors.csv")
    const races = parseCsvFile<Race>("races.csv")
    const results = parseCsvFile<Result>("results.csv")
    const circuits = parseCsvFile<Circuit>("circuits.csv")
    const seasons = parseCsvFile<Season>("seasons.csv")
    const qualifying = parseCsvFile<QualiResult>("qualifying.csv")

    // Check if we got any real data
    const hasRealData = drivers.length > 0 || races.length > 0 || results.length > 0

    if (!hasRealData) {
      console.warn("[F1 Data] No CSV files found, using mock data")
      cachedData = generateMockData()
      return cachedData
    }

    // Create maps for O(1) lookups
    const driverMap = new Map(drivers.map((d) => [d.driverId, d]))
    const constructorMap = new Map(constructors.map((c) => [c.constructorId, c]))
    const circuitMap = new Map(circuits.map((c) => [c.circuitId, c]))

    cachedData = {
      drivers: driverMap,
      constructors: constructorMap,
      races,
      results,
      circuits: circuitMap,
      seasons,
      qualifying,
    }

    return cachedData
  } catch (error) {
    console.error("[F1 Data] Error loading data, using mock data:", error)
    cachedData = generateMockData()
    return cachedData
  }
}

// Helper functions
export async function getSeasonRaces(year: number) {
  const data = await loadF1Data()
  return data.races.filter((r) => r.year === year).sort((a, b) => a.round - b.round)
}

export async function getDriverStandings(year: number) {
  const data = await loadF1Data()
  const races = await getSeasonRaces(year)

  if (races.length === 0) {
    return []
  }

  const raceIds = new Set(races.map((r) => r.raceId))

  const seasonResults = data.results.filter((r) => raceIds.has(r.raceId))

  const standings: Record<number, { driverId: number; points: number; wins: number; poles: number }> = {}

  seasonResults.forEach((result) => {
    if (!standings[result.driverId]) {
      standings[result.driverId] = { driverId: result.driverId, points: 0, wins: 0, poles: 0 }
    }
    standings[result.driverId].points += result.points
    if (result.positionOrder === 1) standings[result.driverId].wins++
  })

  const quali = data.qualifying.filter((q) => raceIds.has(q.raceId))
  quali.forEach((q) => {
    if (q.position === 1 && standings[q.driverId]) {
      standings[q.driverId].poles++
    }
  })

  return Object.values(standings)
    .sort((a, b) => b.points - a.points)
    .map((standing) => ({
      ...standing,
      driver: data.drivers.get(standing.driverId),
    }))
}

export async function getConstructorStandings(year: number) {
  const data = await loadF1Data()
  const races = await getSeasonRaces(year)

  if (races.length === 0) {
    return []
  }

  const raceIds = new Set(races.map((r) => r.raceId))

  const seasonResults = data.results.filter((r) => raceIds.has(r.raceId))

  const standings: Record<number, { constructorId: number; points: number; wins: number }> = {}

  seasonResults.forEach((result) => {
    if (!standings[result.constructorId]) {
      standings[result.constructorId] = { constructorId: result.constructorId, points: 0, wins: 0 }
    }
    standings[result.constructorId].points += result.points
    if (result.positionOrder === 1) standings[result.constructorId].wins++
  })

  return Object.values(standings)
    .sort((a, b) => b.points - a.points)
    .map((standing) => ({
      ...standing,
      constructor: data.constructors.get(standing.constructorId),
    }))
}

export async function getDriverCareerStats(driverId: number) {
  const data = await loadF1Data()
  const driverResults = data.results.filter((r) => r.driverId === driverId)

  const stats = {
    wins: driverResults.filter((r) => r.positionOrder === 1).length,
    podiums: driverResults.filter((r) => r.positionOrder <= 3).length,
    points: driverResults.reduce((sum, r) => sum + r.points, 0),
    races: driverResults.length,
    dnfs: driverResults.filter((r) => !r.position || r.position === null).length,
  }

  return stats
}

export async function getConstructorCareerStats(constructorId: number) {
  const data = await loadF1Data()
  const constructorResults = data.results.filter((r) => r.constructorId === constructorId)

  const stats = {
    wins: constructorResults.filter((r) => r.positionOrder === 1).length,
    championships: 0, // Would need season-based logic
    points: constructorResults.reduce((sum, r) => sum + r.points, 0),
    races: constructorResults.length,
  }

  return stats
}

export async function getAllTimeRecords() {
  const data = await loadF1Data()

  // Most wins by driver
  const driverWins = new Map<number, number>()
  data.results.forEach((r) => {
    if (r.positionOrder === 1) {
      driverWins.set(r.driverId, (driverWins.get(r.driverId) || 0) + 1)
    }
  })

  // Most wins by constructor
  const constructorWins = new Map<number, number>()
  data.results.forEach((r) => {
    if (r.positionOrder === 1) {
      constructorWins.set(r.constructorId, (constructorWins.get(r.constructorId) || 0) + 1)
    }
  })

  // Most poles by driver
  const driverPoles = new Map<number, number>()
  data.qualifying.forEach((q) => {
    if (q.position === 1) {
      driverPoles.set(q.driverId, (driverPoles.get(q.driverId) || 0) + 1)
    }
  })

  return {
    driverWins: Array.from(driverWins.entries())
      .map(([driverId, wins]) => ({ driverId, wins, driver: data.drivers.get(driverId) }))
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 20),
    constructorWins: Array.from(constructorWins.entries())
      .map(([constructorId, wins]) => ({ constructorId, wins, constructor: data.constructors.get(constructorId) }))
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 15),
    driverPoles: Array.from(driverPoles.entries())
      .map(([driverId, poles]) => ({ driverId, poles, driver: data.drivers.get(driverId) }))
      .sort((a, b) => b.poles - a.poles)
      .slice(0, 20),
  }
}
