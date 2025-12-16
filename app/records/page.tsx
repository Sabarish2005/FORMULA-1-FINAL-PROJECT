"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Suspense, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AnimatedChartWrapper } from "@/components/charts/animated-chart-wrapper"
import { motion } from "framer-motion"

async function RecordsContent() {
  try {
    const response = await fetch("/api/records", {
      next: { revalidate: 3600 },
    })

    let recordsData = {
      mostWinsDrivers: [],
      mostWinsConstructors: [],
      mostPolesDrivers: [],
    }

    if (response.ok) {
      const data = await response.json()
      recordsData = data.data || recordsData
    }

    return <RecordsVisualization data={recordsData} />
  } catch (error) {
    console.error("[Records] Error:", error)
    return <div className="p-8 text-center">Failed to load records</div>
  }
}

function RecordsVisualization({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState("wins")
  const [resultsCount, setResultsCount] = useState(15)

  const COLORS = ["#ff0a0a", "#ff8700", "#4f46e5", "#06b6d4", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"]

  const winsChartData = data.mostWinsDrivers.slice(0, resultsCount).map((item: any) => ({
    name: item.name,
    wins: item.wins,
  }))

  const constructorWinsData = data.mostWinsConstructors.slice(0, resultsCount).map((item: any) => ({
    name: item.name,
    wins: item.wins,
  }))

  const polesChartData = data.mostPolesDrivers.slice(0, resultsCount).map((item: any) => ({
    name: item.name,
    poles: item.poles,
  }))

  const winsVsPolesData = data.mostWinsDrivers.slice(0, 10).map((driver: any) => {
    const poles = data.mostPolesDrivers.find((p: any) => p.driverId === driver.driverId)?.poles || 0
    return {
      name: driver.name.split(" ")[1] || driver.name,
      wins: driver.wins,
      poles: poles,
    }
  })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black mb-2 neon-red">ALL-TIME RECORDS</h1>
        <p className="text-text-muted">Formula 1 history's greatest achievements (1950-2024)</p>
      </motion.div>

      {/* Results Count Control */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="glass rounded-lg p-4 mb-8 flex gap-4 items-center flex-wrap"
      >
        <span className="text-text-muted">Show:</span>
        <div className="flex gap-2">
          {[10, 15, 20].map((count) => (
            <motion.button
              key={count}
              onClick={() => setResultsCount(count)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded font-bold transition-all ${
                resultsCount === count ? "bg-ferrari-red text-white" : "glass hover:bg-surface-light/50"
              }`}
            >
              Top {count}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-2 mb-8 overflow-x-auto pb-2"
      >
        {[
          { id: "wins", label: "Most Wins" },
          { id: "poles", label: "Most Poles" },
          { id: "constructors", label: "Constructor Wins" },
          { id: "comparison", label: "Wins vs Poles" },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id ? "bg-ferrari-red text-white" : "glass hover:bg-surface-light/50"
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Driver Wins Chart */}
      {activeTab === "wins" && (
        <AnimatedChartWrapper title={`Most Race Wins (Top ${resultsCount})`} delay={0.3}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={winsChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis type="number" tick={{ fill: "#a0a0a0", fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "#a0a0a0", fontSize: 11 }} width={120} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff0a0a" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar
                dataKey="wins"
                fill="#ff0a0a"
                radius={[0, 8, 8, 0]}
                isAnimationActive={true}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Top 5 Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-text-muted">Position</th>
                  <th className="text-left py-3 px-4 text-text-muted">Driver</th>
                  <th className="text-left py-3 px-4 text-text-muted">Wins</th>
                </tr>
              </thead>
              <tbody>
                {data.mostWinsDrivers.slice(0, 5).map((driver: any, idx: number) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                    className="border-b border-border/30 hover:bg-surface-light/30"
                  >
                    <td className="py-3 px-4 font-bold">{idx + 1}</td>
                    <td className="py-3 px-4">{driver.name}</td>
                    <td className="py-3 px-4 neon-red font-bold">{driver.wins}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </AnimatedChartWrapper>
      )}

      {/* Pole Positions Chart */}
      {activeTab === "poles" && (
        <AnimatedChartWrapper title={`Most Pole Positions (Top ${resultsCount})`} delay={0.3}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={polesChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis type="number" tick={{ fill: "#a0a0a0", fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "#a0a0a0", fontSize: 11 }} width={120} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff8700" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar
                dataKey="poles"
                fill="#ff8700"
                radius={[0, 8, 8, 0]}
                isAnimationActive={true}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </AnimatedChartWrapper>
      )}

      {/* Constructor Wins Chart */}
      {activeTab === "constructors" && (
        <AnimatedChartWrapper title={`Constructor Race Wins (Top ${resultsCount})`} delay={0.3}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={constructorWinsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#a0a0a0", fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
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
      )}

      {/* Comparison Chart */}
      {activeTab === "comparison" && (
        <AnimatedChartWrapper title="Wins vs Pole Positions (Top 10)" delay={0.3}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={winsVsPolesData}>
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
                radius={[8, 0, 0, 0]}
                isAnimationActive={true}
                animationDuration={1500}
              />
              <Bar
                dataKey="poles"
                fill="#ff8700"
                radius={[8, 0, 0, 0]}
                isAnimationActive={true}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </AnimatedChartWrapper>
      )}

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-12">
        {[
          {
            label: "Total Races Won",
            value: data.mostWinsDrivers.reduce((sum: number, d: any) => sum + d.wins, 0),
            color: "neon-red",
            subtext: `${data.mostWinsDrivers.length} drivers with wins`,
          },
          {
            label: "Total Poles",
            value: data.mostPolesDrivers.reduce((sum: number, d: any) => sum + d.poles, 0),
            color: "neon-papaya",
            subtext: `${data.mostPolesDrivers.length} drivers with poles`,
          },
          {
            label: "Constructor Wins",
            value: data.mostWinsConstructors.reduce((sum: number, c: any) => sum + c.wins, 0),
            color: "neon-red",
            subtext: `${data.mostWinsConstructors.length} constructors`,
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
            className="glass rounded-lg p-6"
          >
            <h3 className="text-sm text-text-muted mb-2">{stat.label}</h3>
            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
            <p className="text-xs text-text-muted mt-2">{stat.subtext}</p>
          </motion.div>
        ))}
      </div>

      {/* Top Drivers Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="glass rounded-lg p-6"
      >
        <h2 className="text-lg font-bold mb-4 neon-red">Top 10 Drivers by Wins</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-text-muted">Rank</th>
                <th className="text-left py-3 px-4 text-text-muted">Driver</th>
                <th className="text-left py-3 px-4 text-text-muted">Wins</th>
              </tr>
            </thead>
            <tbody>
              {data.mostWinsDrivers.slice(0, 10).map((driver: any, idx: number) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1 + idx * 0.05 }}
                  className="border-b border-border/30 hover:bg-surface-light/30 transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-ferrari-red">#{idx + 1}</td>
                  <td className="py-3 px-4 font-medium">{driver.name}</td>
                  <td className="py-3 px-4 neon-red font-bold">{driver.wins}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default function RecordsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="p-8 text-center">Loading records...</div>}>
          <RecordsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
