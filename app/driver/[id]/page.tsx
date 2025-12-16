"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Suspense } from "react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

async function DriverContent({ id }: { id: string }) {
  try {
    const response = await fetch(`/api/driver/${id}`)

    let driverData: any = {
      driverId: id,
      forename: "Unknown",
      surname: "Driver",
      nationality: "Unknown",
      wins: 0,
      podiums: 0,
      points: 0,
      races: 0,
      dnfs: 0,
      seasons: 0,
    }

    if (response.ok) {
      const data = await response.json()
      driverData = data.data || driverData
    }

    return <DriverVisualization driver={driverData} />
  } catch (error) {
    console.error("[Driver Page] Error:", error)
    return <div className="p-8 text-center">Failed to load driver data</div>
  }
}

function DriverVisualization({ driver }: { driver: any }) {
  const winRate = driver.races > 0 ? ((driver.wins / driver.races) * 100).toFixed(1) : 0
  const podiumRate = driver.races > 0 ? ((driver.podiums / driver.races) * 100).toFixed(1) : 0
  const driverName = `${driver.forename} ${driver.surname}`

  // Mock season data
  const seasonData = Array.from({ length: driver.seasons || 10 }, (_, i) => ({
    year: 2024 - (driver.seasons || 10) + i + 1,
    points: Math.floor(Math.random() * 500) + 50,
    wins: Math.floor(Math.random() * 20),
  }))

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Driver Info Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1">
          <div className="glass rounded-lg p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-ferrari-red to-papaya rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-black text-black">F1</span>
            </div>
            <h1 className="text-2xl font-black mb-2 neon-red">{driverName}</h1>
            <p className="text-text-muted mb-4">{driver.nationality}</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 neon-red">CAREER STATISTICS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="glass p-4 rounded">
              <div className="text-sm text-text-muted mb-1">Races</div>
              <div className="text-2xl font-black neon-red">{driver.races}</div>
            </div>
            <div className="glass p-4 rounded">
              <div className="text-sm text-text-muted mb-1">Wins</div>
              <div className="text-2xl font-black neon-papaya">{driver.wins}</div>
            </div>
            <div className="glass p-4 rounded">
              <div className="text-sm text-text-muted mb-1">Podiums</div>
              <div className="text-2xl font-black neon-red">{driver.podiums}</div>
            </div>
            <div className="glass p-4 rounded">
              <div className="text-sm text-text-muted mb-1">Points</div>
              <div className="text-2xl font-black neon-papaya">{driver.points}</div>
            </div>
            <div className="glass p-4 rounded">
              <div className="text-sm text-text-muted mb-1">Seasons</div>
              <div className="text-2xl font-black neon-red">{driver.seasons}</div>
            </div>
            <div className="glass p-4 rounded">
              <div className="text-sm text-text-muted mb-1">DNFs</div>
              <div className="text-2xl font-black neon-red">{driver.dnfs}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 neon-red">Performance Rates</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-text-muted">Win Rate</span>
                <span className="font-bold">{winRate}%</span>
              </div>
              <div className="w-full bg-surface rounded h-3">
                <div className="bg-ferrari-red h-3 rounded" style={{ width: `${Math.min(winRate, 100)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-text-muted">Podium Rate</span>
                <span className="font-bold">{podiumRate}%</span>
              </div>
              <div className="w-full bg-surface rounded h-3">
                <div className="bg-papaya h-3 rounded" style={{ width: `${Math.min(podiumRate, 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 neon-papaya">Career Highlights</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-ferrari-red">→</span>
              <span>{driver.wins} career race wins</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-papaya">→</span>
              <span>{driver.podiums} podium finishes</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-ferrari-red">→</span>
              <span>{driver.seasons} seasons competed</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-papaya">→</span>
              <span>{driver.points} career points</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Season Performance Chart */}
      {seasonData.length > 0 && (
        <div className="glass rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold mb-4 neon-red">Season Points Progression</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={seasonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis dataKey="year" tick={{ fill: "#a0a0a0", fontSize: 12 }} />
              <YAxis tick={{ fill: "#a0a0a0", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff0a0a" }}
                labelStyle={{ color: "#fff" }}
              />
              <Line type="monotone" dataKey="points" stroke="#ff0a0a" dot={{ fill: "#ff0a0a" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Wins by Year */}
      {seasonData.length > 0 && (
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 neon-papaya">Race Wins Per Season</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={seasonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis dataKey="year" tick={{ fill: "#a0a0a0", fontSize: 12 }} />
              <YAxis tick={{ fill: "#a0a0a0", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff8700" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="wins" fill="#ff8700" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function DriverPage({ params }: PageProps) {
  const { id } = await params

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="p-8 text-center">Loading driver data...</div>}>
          <DriverContent id={id} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
