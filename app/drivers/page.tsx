"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Suspense, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AnimatedChartWrapper } from "@/components/charts/animated-chart-wrapper"

async function DriversContent() {
  // Mock drivers data - in production, fetch from API
  const drivers = [
    { id: 1, name: "Lewis Hamilton", team: "Mercedes", wins: 103, points: 4433, nationality: "British" },
    { id: 2, name: "Max Verstappen", team: "Red Bull", wins: 63, points: 2723, nationality: "Dutch" },
    { id: 3, name: "Sebastian Vettel", team: "Aston Martin", wins: 53, points: 3028, nationality: "German" },
    { id: 4, name: "Alain Prost", team: "McLaren", wins: 51, points: 798, nationality: "French" },
    { id: 5, name: "Ayrton Senna", team: "McLaren", wins: 41, points: 610, nationality: "Brazilian" },
    { id: 6, name: "Nigel Mansell", team: "Williams", wins: 31, points: 529, nationality: "British" },
    { id: 7, name: "Juan Manuel Fangio", team: "Alfa Romeo", wins: 24, points: 245, nationality: "Argentine" },
    { id: 8, name: "Michael Schumacher", team: "Ferrari", wins: 91, points: 1566, nationality: "German" },
  ]

  return <DriversGrid drivers={drivers} />
}

function DriversGrid({ drivers }: { drivers: any[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"wins" | "points" | "name">("wins")

  const filteredAndSorted = useMemo(() => {
    const result = drivers.filter(
      (d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.team.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    result.sort((a, b) => {
      if (sortBy === "wins") return b.wins - a.wins
      if (sortBy === "points") return b.points - a.points
      return a.name.localeCompare(b.name)
    })

    return result
  }, [searchTerm, sortBy, drivers])

  // Chart data for top drivers
  const chartData = drivers.slice(0, 8).map((d) => ({
    name: d.name.split(" ")[1] || d.name,
    wins: d.wins,
    points: d.points / 100, // Scale for visibility
  }))

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black mb-2 neon-red">DRIVERS</h1>
        <p className="text-text-muted mb-8">All-time legends and current competitors</p>
      </motion.div>

      {/* Top Drivers Visualization */}
      <AnimatedChartWrapper title="Top Drivers by Wins" delay={0.1}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
            <XAxis dataKey="name" tick={{ fill: "#a0a0a0", fontSize: 12 }} />
            <YAxis tick={{ fill: "#a0a0a0", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff0a0a" }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar
              dataKey="wins"
              fill="#ff0a0a"
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </AnimatedChartWrapper>

      {/* Filter & Sort Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="glass rounded-lg p-4 mb-8 flex flex-col sm:flex-row gap-4 mt-8"
      >
        <input
          type="text"
          placeholder="Search drivers, teams, nationality..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 bg-surface rounded border border-border text-white placeholder-text-muted focus:outline-none focus:border-ferrari-red"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 bg-surface rounded border border-border text-white focus:outline-none focus:border-ferrari-red"
        >
          <option value="wins">Sort by Wins</option>
          <option value="points">Sort by Points</option>
          <option value="name">Sort by Name</option>
        </select>
      </motion.div>

      {/* Results Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-text-muted text-sm mb-4"
      >
        Showing {filteredAndSorted.length} of {drivers.length} drivers
      </motion.p>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAndSorted.map((driver, idx) => (
          <motion.a
            key={driver.id}
            href={`/driver/${driver.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="glass rounded-lg p-6 hover:bg-surface-light/50 transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg group-hover:text-papaya transition-colors">{driver.name}</h3>
                <p className="text-xs text-text-muted">{driver.team}</p>
              </div>
              <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center">
                <span className="neon-red font-bold text-sm">{driver.id}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-text-muted">Wins</span>
                <span className="neon-red font-bold">{driver.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-text-muted">Points</span>
                <span className="neon-papaya font-bold">{driver.points}</span>
              </div>
              <div className="text-xs text-text-muted pt-2 border-t border-border">{driver.nationality}</div>
            </div>
          </motion.a>
        ))}
      </div>

      {filteredAndSorted.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <p className="text-text-muted">No drivers found matching your search.</p>
        </motion.div>
      )}
    </div>
  )
}

export default function DriversPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="p-8 text-center">Loading drivers...</div>}>
          <DriversContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
