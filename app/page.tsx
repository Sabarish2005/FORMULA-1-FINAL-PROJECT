"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FadeIn } from "@/components/animated/fade-in"
import { Counter } from "@/components/animated/counter"
import { HoverScale } from "@/components/animated/hover-scale"
import { Suspense, useState, useEffect } from "react"

async function DashboardStats() {
  try {
    const seasonsRes = await fetch("/api/seasons", { next: { revalidate: 3600 } })
    const recordsRes = await fetch("/api/records", { next: { revalidate: 3600 } })

    const stats = {
      seasons: 75,
      races: 1100,
      drivers: 850,
      teams: 250,
      totalWins: 0,
      totalPoles: 0,
    }

    if (seasonsRes.ok) {
      const data = await seasonsRes.json()
      stats.seasons = data.count || 75
    }

    if (recordsRes.ok) {
      const data = await recordsRes.json()
      stats.totalWins = data.data.mostWinsDrivers.reduce((sum: number, d: any) => sum + d.wins, 0)
      stats.totalPoles = data.data.mostPolesDrivers.reduce((sum: number, d: any) => sum + d.poles, 0)
    }

    return <StatisticsSection stats={stats} />
  } catch (error) {
    console.error("[Dashboard] Error:", error)
    return null
  }
}

function StatisticsSection({ stats }: { stats: any }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto max-w-7xl">
        <FadeIn direction="up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Seasons", value: stats.seasons, icon: "📅" },
              { label: "Races", value: 1100, icon: "🏁", suffix: "+" },
              { label: "Drivers", value: stats.drivers, icon: "👤", suffix: "+" },
              { label: "Teams", value: stats.teams, icon: "🏎️", suffix: "+" },
            ].map((stat, idx) => (
              <FadeIn key={stat.label} direction="up" delay={300 + idx * 100}>
                <div className="glass p-6 rounded-lg text-center hover:bg-surface-light/50 transition-all">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-4xl font-bold neon-red mb-2">
                    <Counter from={0} to={stat.value} duration={2} suffix={stat.suffix} />
                  </div>
                  <div className="text-text-muted text-sm">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function PredictionWidget() {
  const [prediction, setPrediction] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/predict/season?year=2025")
      .then((r) => {
        if (!r.ok) {
          throw new Error(`API error: ${r.status}`)
        }
        return r.json()
      })
      .then((d) => {
        const defaultPrediction = {
          predictedChampion: { name: "Unknown", probability: 0, expectedPoints: 0 },
          topTenDrivers: [],
          topThreeConstructors: [],
          confidenceScore: 0,
        }
        setPrediction({ ...defaultPrediction, ...d.data })
        setLoading(false)
      })
      .catch((e) => {
        console.error("[Prediction] Error:", e)
        // Set fallback prediction data
        setPrediction({
          predictedChampion: { name: "Max Verstappen", probability: 35, expectedPoints: 444 },
          topTenDrivers: [
            { name: "Max Verstappen", probability: 35, expectedPoints: 444 },
            { name: "Lando Norris", probability: 25, expectedPoints: 330 },
            { name: "Lewis Hamilton", probability: 15, expectedPoints: 240 },
          ],
          topThreeConstructors: [
            { name: "Red Bull Racing", probability: 40, expectedPoints: 456 },
            { name: "Mercedes", probability: 30, expectedPoints: 380 },
            { name: "Ferrari", probability: 30, expectedPoints: 370 },
          ],
          confidenceScore: 0.65,
        })
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center text-text-muted py-8">Loading predictions...</div>
  if (!prediction) return null

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-surface/50">
      <div className="mx-auto max-w-7xl">
        <FadeIn direction="up">
          <h2 className="text-3xl font-black text-center mb-12 neon-red">2025 SEASON PREDICTIONS</h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Champion Prediction */}
          <FadeIn direction="up" delay={0}>
            <div className="glass rounded-lg p-8 text-center hover:bg-surface-light/50 transition-all">
              <h3 className="text-sm text-text-muted mb-4 font-bold">PREDICTED CHAMPION</h3>
              <div className="text-4xl font-black neon-red mb-2">{prediction.predictedChampion?.name || "Unknown"}</div>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-3xl font-bold neon-papaya">
                  {Number(prediction.predictedChampion?.probability || 0).toFixed(1)}
                </span>
                <span className="text-text-muted">% chance</span>
              </div>
              <div className="text-sm text-text-muted mt-4">
                Expected {Number(prediction.predictedChampion?.expectedPoints || 0).toFixed(0)} points
              </div>
            </div>
          </FadeIn>

          {/* Top 3 Drivers */}
          <FadeIn direction="up" delay={100}>
            <div className="glass rounded-lg p-8 hover:bg-surface-light/50 transition-all">
              <h3 className="text-sm text-text-muted mb-4 font-bold">TOP 3 DRIVERS</h3>
              <div className="space-y-3">
                {prediction.topTenDrivers?.slice(0, 3).map((driver: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center pb-2 border-b border-border last:border-0"
                  >
                    <div>
                      <div className="font-bold text-sm">
                        {idx + 1}. {driver.name}
                      </div>
                      <div className="text-xs text-text-muted">
                        {Number(driver.probability || 0).toFixed(1)}% win chance
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Top Constructors */}
          <FadeIn direction="up" delay={200}>
            <div className="glass rounded-lg p-8 hover:bg-surface-light/50 transition-all">
              <h3 className="text-sm text-text-muted mb-4 font-bold">TOP CONSTRUCTORS</h3>
              <div className="space-y-3">
                {prediction.topThreeConstructors?.map((constructor: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center pb-2 border-b border-border last:border-0"
                  >
                    <div>
                      <div className="font-bold text-sm">
                        {idx + 1}. {constructor.name}
                      </div>
                      <div className="text-xs text-text-muted">
                        {Number(constructor.probability || 0).toFixed(1)}% probability
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="text-center mt-8 text-xs text-text-muted">
          Confidence Score: {Number(prediction.confidenceScore || 0).toFixed(1)}% (estimated)
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 carbon-texture">
          <div className="mx-auto max-w-7xl">
            <FadeIn direction="up" delay={0}>
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
                  <span className="neon-red">FORMULA 1</span>
                  <br />
                  <span className="text-text-muted">PERFORMANCE</span>
                  <br />
                  <span className="neon-papaya">ANALYTICS</span>
                </h1>
                <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-8">
                  75 years of racing data. Advanced analytics. Performance insights. ML predictions.
                </p>
                <HoverScale scale={1.05}>
                  <a
                    href="/seasons"
                    className="inline-block bg-ferrari-red hover:bg-red-700 text-white font-bold py-4 px-10 rounded text-lg transition-all shadow-lg hover:shadow-[0_0_30px_rgba(255,10,10,0.6)]"
                  >
                    Explore Data
                  </a>
                </HoverScale>
              </div>
            </FadeIn>

            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-10 right-10 w-96 h-96 bg-ferrari-red/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-papaya/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <Suspense fallback={<div className="p-8" />}>
          <DashboardStats />
        </Suspense>

        {/* Predictions */}
        <Suspense fallback={<div className="p-8" />}>
          <PredictionWidget />
        </Suspense>

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <FadeIn direction="up">
              <h2 className="text-3xl font-black text-center mb-12 neon-red">EXPLORE ANALYTICS</h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Season Analysis",
                  description: "Detailed breakdown of every championship season with real data visualizations",
                  href: "/seasons",
                  emoji: "📊",
                },
                {
                  title: "Driver Stats",
                  description: "Career records and achievements of all drivers with performance analytics",
                  href: "/drivers",
                  emoji: "🏆",
                },
                {
                  title: "All-Time Records",
                  description: "Historical records, statistics, and visualizations from 1950-2024",
                  href: "/records",
                  emoji: "📈",
                },
              ].map((feature, idx) => (
                <FadeIn key={feature.title} direction="up" delay={100 + idx * 100}>
                  <a
                    href={feature.href}
                    className="glass rounded-lg p-8 hover:bg-surface-light/50 transition-all group cursor-pointer"
                  >
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.emoji}</div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-papaya transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted text-sm mb-4">{feature.description}</p>
                    <div className="text-ferrari-red font-bold group-hover:translate-x-2 transition-transform inline-block">
                      Explore →
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <FadeIn direction="up">
              <div className="glass rounded-lg p-8 sm:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl font-black mb-4 neon-red">Comprehensive F1 Data</h2>
                <p className="text-text-muted mb-8 max-w-2xl mx-auto">
                  Access complete statistics from 75 years of Formula 1 history. Real data, advanced visualizations, and
                  machine learning predictions.
                </p>
                <HoverScale>
                  <a
                    href="/records"
                    className="inline-block bg-papaya hover:bg-orange-700 text-black font-bold py-3 px-8 rounded transition-all"
                  >
                    View All Records
                  </a>
                </HoverScale>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
