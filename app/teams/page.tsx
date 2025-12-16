"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AnimatedChartWrapper } from "@/components/charts/animated-chart-wrapper"

const teams = [
  { id: 1, name: "Ferrari", country: "Italy", founded: 1947, wins: 242, championships: 16, color: "#dc0000" },
  { id: 2, name: "Mercedes", country: "Germany", founded: 1954, wins: 246, championships: 8, color: "#00d2be" },
  { id: 3, name: "McLaren", country: "UK", founded: 1963, wins: 183, championships: 8, color: "#ff8700" },
  { id: 4, name: "Red Bull Racing", country: "Austria", founded: 2005, wins: 112, championships: 4, color: "#0600ef" },
  { id: 5, name: "Williams", country: "UK", founded: 1977, wins: 114, championships: 7, color: "#0082fa" },
  { id: 6, name: "Lotus", country: "UK", founded: 1958, wins: 79, championships: 2, color: "#ffd800" },
  { id: 7, name: "Alfa Romeo", country: "Italy", founded: 1950, wins: 47, championships: 0, color: "#900000" },
  { id: 8, name: "Aston Martin", country: "UK", founded: 1960, wins: 1, championships: 0, color: "#006f62" },
]

function TeamsGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"championships" | "wins" | "name">("championships")

  const filteredAndSorted = useMemo(() => {
    const result = teams.filter(
      (t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.country.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    result.sort((a, b) => {
      if (sortBy === "championships") return b.championships - a.championships
      if (sortBy === "wins") return b.wins - a.wins
      return a.name.localeCompare(b.name)
    })

    return result
  }, [searchTerm, sortBy])

  // Chart data for teams
  const chartData = teams.map((t) => ({
    name: t.name,
    wins: t.wins,
    championships: t.championships,
  }))

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black mb-2 neon-red">CONSTRUCTOR TEAMS</h1>
        <p className="text-text-muted mb-8">Formula 1 teams and their achievements</p>
      </motion.div>

      {/* Teams Wins Visualization */}
      <AnimatedChartWrapper title="Team Victories" delay={0.1}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
            <XAxis dataKey="name" tick={{ fill: "#a0a0a0", fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
            <YAxis tick={{ fill: "#a0a0a0", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff0a0a" }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar
              dataKey="wins"
              fill="#ff8700"
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
          placeholder="Search teams by name or country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 bg-surface rounded border border-border text-white placeholder-text-muted focus:outline-none focus:border-ferrari-red"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 bg-surface rounded border border-border text-white focus:outline-none focus:border-ferrari-red"
        >
          <option value="championships">Sort by Championships</option>
          <option value="wins">Sort by Wins</option>
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
        Showing {filteredAndSorted.length} of {teams.length} teams
      </motion.p>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAndSorted.map((team, idx) => (
          <motion.a
            key={team.id}
            href={`/team/${team.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="glass rounded-lg overflow-hidden group hover:bg-surface-light/50 transition-all cursor-pointer"
          >
            <div className="h-1 group-hover:h-2 transition-all" style={{ backgroundColor: team.color }}></div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-1 group-hover:text-papaya transition-colors">{team.name}</h3>
              <p className="text-xs text-text-muted mb-4">
                {team.country} • Founded {team.founded}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-text-muted">Championships</span>
                  <span className="neon-red font-bold">{team.championships}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-text-muted">Wins</span>
                  <span className="neon-papaya font-bold">{team.wins}</span>
                </div>
              </div>
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
          <p className="text-text-muted">No teams found matching your search.</p>
        </motion.div>
      )}
    </div>
  )
}

export default function TeamsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <TeamsGrid />
      </main>
      <Footer />
    </div>
  )
}
