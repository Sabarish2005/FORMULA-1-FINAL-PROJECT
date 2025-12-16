export interface PredictionResult {
  predictedChampion: {
    driverId: number
    name: string
    probability: number
    avgPointsPerRace: number
  }
  topThreeConstructors: {
    constructorId: number
    name: string
    probability: number
    expectedPoints: number
  }[]
  topTenDrivers: {
    driverId: number
    name: string
    probability: number
    expectedPoints: number
  }[]
  confidenceScore: number
}

interface DriverFeatures {
  driverId: number
  careerWins: number
  careerPoles: number
  careerPodiums: number
  avgPointsPerRace: number
  consistency: number
  recentForm: number
}

const MOCK_PREDICTIONS: PredictionResult = {
  predictedChampion: {
    driverId: 1,
    name: "Max Verstappen",
    probability: 35,
    avgPointsPerRace: 18.5,
  },
  topThreeConstructors: [
    {
      constructorId: 1,
      name: "Red Bull Racing",
      probability: 40,
      expectedPoints: 456,
    },
    {
      constructorId: 2,
      name: "Mercedes",
      probability: 30,
      expectedPoints: 380,
    },
    {
      constructorId: 3,
      name: "Ferrari",
      probability: 30,
      expectedPoints: 370,
    },
  ],
  topTenDrivers: [
    { driverId: 1, name: "Max Verstappen", probability: 35, expectedPoints: 444 },
    { driverId: 2, name: "Lando Norris", probability: 25, expectedPoints: 330 },
    { driverId: 3, name: "Lewis Hamilton", probability: 15, expectedPoints: 240 },
    { driverId: 4, name: "Charles Leclerc", probability: 12, expectedPoints: 210 },
    { driverId: 5, name: "George Russell", probability: 8, expectedPoints: 150 },
    { driverId: 6, name: "Carlos Sainz", probability: 3, expectedPoints: 80 },
    { driverId: 7, name: "Fernando Alonso", probability: 2, expectedPoints: 60 },
    { driverId: 8, name: "Oscar Piastri", probability: 2, expectedPoints: 50 },
    { driverId: 9, name: "Nico Hulkenberg", probability: 1, expectedPoints: 30 },
    { driverId: 10, name: "Pierre Gasly", probability: 1, expectedPoints: 20 },
  ],
  confidenceScore: 0.65,
}

export async function predictSeason(_year: number): Promise<PredictionResult> {
  // Return mock predictions - CSV data loading is not available in edge runtime
  return MOCK_PREDICTIONS
}

export async function predictDriver(_driverId: number, _year: number) {
  const prediction = await predictSeason(_year)
  return {
    driverId: _driverId,
    name: "Driver",
    expectedChampionshipRank: 5,
    winProbability: 10,
    expectedPoints: 200,
    prediction,
  }
}
