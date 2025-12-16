"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Suspense, useState, useEffect } from "react"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AnimatedChartWrapper } from "@/components/charts/animated-chart-wrapper"
import { motion } from "framer-motion"

interface SeasonData {
  year: number
  races: any[]
  driverStandings: any[]
  constructorStandings: any[]
  totalRaces: number
}

function SeasonContent({ year }: { year: string }) {
  const [seasonData, setSeasonData] = useState<SeasonData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSeasonData = async () => {
      try {
        const response = await fetch(`/api/season/${year}`)

        if (!response.ok) {
          throw new Error("Failed to fetch season data")
        }

        const data = await response.json()
        setSeasonData(data.data)
      } catch (err) {
        console.error("[Season Page] Error:", err)
        setError("Failed to load season data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSeasonData()
  }, [year])

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-ferrari-red"></div>
        <p className="mt-4 text-text-muted">Loading season data...</p>
      </div>
    )
  }

  if (error || !seasonData) {
    return (
      <div className="p-8 text-center glass rounded-lg mx-auto max-w-2xl mt-12">
        <h2 className="text-2xl font-bold neon-red mb-4">Error Loading Data</h2>
        <p className="text-text-muted mb-4">{error || "Failed to load season data. Please try again later."}</p>
        <a
          href="/seasons"
          className="inline-block px-6 py-3 bg-ferrari-red text-white rounded-lg font-bold hover:bg-ferrari-red/80 transition-colors"
        >
          Back to Seasons
        </a>
      </div>
    )
  }

  return <SeasonVisualization data={seasonData} />
}

function SeasonVisualization({ data }: { data: SeasonData }) {
  const driverPointsData = data.driverStandings.slice(0, 10).map((d) => ({
    name: d.name || "Unknown",
    points: d.points,
  }))

  const constructorPointsData = data.constructorStandings.slice(0, 8).map((c) => ({
    name: c.name || "Unknown",
    points: c.points,
  }))

  const winsData = data.driverStandings
    .slice(0, 10)
    .filter((d: any) => d.wins > 0)
    .map((d) => ({
      name: d.name || "Unknown",
      wins: d.wins,
    }))

  const raceCalendarData = data.races.map((r: any, idx: number) => ({
    round: r.round,
    name: r.name.length > 20 ? r.name.substring(0, 20) + "..." : r.name,
    date: new Date(r.date).toLocaleDateString(),
  }))

  const COLORS = ["#ff0a0a", "#ff8700", "#4f46e5", "#06b6d4", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <a href="/seasons" className="text-sm text-papaya hover:underline mb-4 inline-block">
          ← Back to all seasons
        </a>
        <h1 className="text-4xl font-black mb-2 neon-red">{data.year} SEASON</h1>
        <p className="text-text-muted">Championship statistics and analytics</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Total Races", value: data.totalRaces, color: "neon-red" },
          { label: "Drivers", value: data.driverStandings.length, color: "neon-papaya" },
          { label: "Constructors", value: data.constructorStandings.length, color: "neon-red" },
          { label: "Champion Points", value: data.driverStandings[0]?.points || 0, color: "neon-papaya" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="glass p-6 rounded-lg"
          >
            <div className="text-sm text-text-muted mb-2">{stat.label}</div>
            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Driver Standings Chart */}
      <AnimatedChartWrapper title="Driver Standings" delay={0.2}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={driverPointsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
            <XAxis dataKey="name" tick={{ fill: "#a0a0a0", fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
            <YAxis tick={{ fill: "#a0a0a0", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff0a0a" }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar
              dataKey="points"
              fill="#ff0a0a"
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </AnimatedChartWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-8">
        {/* Constructor Standings */}
        <AnimatedChartWrapper title="Constructor Standings" delay={0.3}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={constructorPointsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis dataKey="name" tick={{ fill: "#a0a0a0", fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fill: "#a0a0a0", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff8700" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar
                dataKey="points"
                fill="#ff8700"
                radius={[8, 8, 0, 0]}
                isAnimationActive={true}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </AnimatedChartWrapper>

        {/* Wins Distribution */}
        {winsData.length > 0 && (
          <AnimatedChartWrapper title="Race Wins Distribution" delay={0.4}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={winsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name.split(" ")[1]}: ${entry.wins}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="wins"
                  isAnimationActive={true}
                  animationDuration={1500}
                >
                  {winsData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff0a0a" }}
                  labelStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </AnimatedChartWrapper>
        )}
      </div>

      {/* Top Drivers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass rounded-lg p-6 mb-8"
      >
        <h2 className="text-lg font-bold mb-4 neon-red">Top Drivers - {data.year}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-text-muted">Position</th>
                <th className="text-left py-3 px-4 text-text-muted">Driver</th>
                <th className="text-left py-3 px-4 text-text-muted">Points</th>
                <th className="text-left py-3 px-4 text-text-muted">Wins</th>
                <th className="text-left py-3 px-4 text-text-muted">Poles</th>
              </tr>
            </thead>
            <tbody>
              {data.driverStandings.slice(0, 10).map((driver: any, idx: number) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                  className="border-b border-border/30 hover:bg-surface-light/30 transition-colors"
                >
                  <td className="py-3 px-4 font-bold">{idx + 1}</td>
                  <td className="py-3 px-4">{driver.name}</td>
                  <td className="py-3 px-4 neon-red font-bold">{driver.points}</td>
                  <td className="py-3 px-4">{driver.wins}</td>
                  <td className="py-3 px-4">{driver.poles}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Race Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="glass rounded-lg p-6"
      >
        <h2 className="text-lg font-bold mb-4 neon-papaya">Race Calendar - {data.year}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {raceCalendarData.map((race: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + idx * 0.03 }}
              className="p-4 bg-surface-light/30 rounded border border-border/30 hover:border-papaya/50 transition-colors"
            >
              <div className="text-sm text-text-muted mb-1">Round {race.round}</div>
              <div className="font-bold text-white">{race.name}</div>
              <div className="text-xs text-text-muted mt-2">{race.date}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

interface PageProps {
  params: { year: string }
}

export default function SeasonPage({ params }: PageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="p-8 text-center">Loading season data...</div>}>
          <SeasonContent year={params.year} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
