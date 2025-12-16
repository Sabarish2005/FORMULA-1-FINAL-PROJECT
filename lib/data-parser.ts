// Simple CSV parser utility
export function parseCSV(content: string): Record<string, any>[] {
  const lines = content.trim().split('\n')
  if (lines.length < 2) return []
  
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim())
    const obj: Record<string, any> = {}
    
    headers.forEach((header, index) => {
      const value = values[index] || ''
      // Try to convert to number if possible
      obj[header] = isNaN(Number(value)) || value === '' ? value : Number(value)
    })
    
    return obj
  })
}

// Mock data generators for F1 analytics
export const generateMockData = {
  drivers: (): Record<string, any>[] => [
    { driverid: 1, drivername: 'Lewis Hamilton', nationality: 'British', pointstotal: 433, wins: 103, podiums: 194, poles: 103 },
    { driverid: 2, drivername: 'Michael Schumacher', nationality: 'German', pointstotal: 1566, wins: 91, podiums: 155, poles: 68 },
    { driverid: 3, drivername: 'Sebastian Vettel', nationality: 'German', pointstotal: 3028, wins: 53, podiums: 122, poles: 57 },
    { driverid: 4, drivername: 'Alain Prost', nationality: 'French', pointstotal: 798.5, wins: 51, podiums: 106, poles: 33 },
    { driverid: 5, drivername: 'Ayrton Senna', nationality: 'Brazilian', pointstotal: 610, wins: 41, podiums: 64, poles: 65 },
    { driverid: 6, drivername: 'Juan Manuel Fangio', nationality: 'Argentine', pointstotal: 245, wins: 24, podiums: 35, poles: 29 },
    { driverid: 7, drivername: 'Max Verstappen', nationality: 'Dutch', pointstotal: 2723, wins: 63, podiums: 129, poles: 38 },
    { driverid: 8, drivername: 'Nigel Mansell', nationality: 'British', pointstotal: 529, wins: 31, podiums: 59, poles: 32 },
  ],
  
  constructors: (): Record<string, any>[] => [
    { constructorid: 1, name: 'Ferrari', nationality: 'Italian', wins: 242, pointstotal: 10124 },
    { constructorid: 2, name: 'McLaren', nationality: 'British', wins: 183, pointstotal: 8123 },
    { constructorid: 3, name: 'Mercedes', nationality: 'German', wins: 246, pointstotal: 7892 },
    { constructorid: 4, name: 'Red Bull Racing', nationality: 'Austrian', wins: 112, pointstotal: 5621 },
    { constructorid: 5, name: 'Williams', nationality: 'British', wins: 114, pointstotal: 6123 },
    { constructorid: 6, name: 'Lotus', nationality: 'British', wins: 79, pointstotal: 3456 },
    { constructorid: 7, name: 'Brabham', nationality: 'British', wins: 35, pointstotal: 1892 },
    { constructorid: 8, name: 'Alfa Romeo', nationality: 'Italian', wins: 47, pointstotal: 2341 },
  ],
  
  races: (season: number = 2024): Record<string, any>[] => [
    { raceid: 1, racedate: '2024-03-03', racename: 'Bahrain Grand Prix', circuitid: 1, winner: 1, season },
    { raceid: 2, racedate: '2024-03-24', racename: 'Saudi Arabian Grand Prix', circuitid: 2, winner: 2, season },
    { raceid: 3, racedate: '2024-04-07', racename: 'Australian Grand Prix', circuitid: 3, winner: 1, season },
    { raceid: 4, racedate: '2024-04-21', racename: 'Japanese Grand Prix', circuitid: 4, winner: 3, season },
    { raceid: 5, racedate: '2024-05-05', racename: 'Miami Grand Prix', circuitid: 5, winner: 1, season },
  ],
  
  circuits: (): Record<string, any>[] => [
    { circuitid: 1, circuitname: 'Bahrain International Circuit', location: 'Sakhir', country: 'Bahrain', latitude: 26.0345, longitude: 50.5106 },
    { circuitid: 2, circuitname: 'Jeddah Corniche Circuit', location: 'Jeddah', country: 'Saudi Arabia', latitude: 21.5438, longitude: 39.1089 },
    { circuitid: 3, circuitname: 'Albert Park Circuit', location: 'Melbourne', country: 'Australia', latitude: -37.8497, longitude: 144.9688 },
    { circuitid: 4, circuitname: 'Suzuka Circuit', location: 'Suzuka', country: 'Japan', latitude: 34.8427, longitude: 136.6415 },
    { circuitid: 5, circuitname: 'Miami International Autodrome', location: 'Miami', country: 'USA', latitude: 25.9511, longitude: -80.2388 },
  ],
  
  seasons: (): Record<string, any>[] => {
    const seasons = []
    for (let year = 1950; year <= 2024; year++) {
      seasons.push({
        year,
        races: Math.floor(Math.random() * 20) + 10,
        worldchampion: 1,
      })
    }
    return seasons
  },
}
