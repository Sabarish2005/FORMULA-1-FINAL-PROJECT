"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Suspense, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Season {
  year: number
}

function SeasonsGrid({ seasons }: { seasons: Season[] }) {
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null)

  const decades = [
    { label: "1950s", start: 1950, end: 1959 },
    { label: "1960s", start: 1960, end: 1969 },
    { label: "1970s", start: 1970, end: 1979 },
    { label: "1980s", start: 1980, end: 1989 },
    { label: "1990s", start: 1990, end: 1999 },
    { label: "2000s", start: 2000, end: 2009 },
    { label: "2010s", start: 2010, end: 2019 },
    { label: "2020s", start: 2020, end: 2029 },
  ]

  const filteredSeasons = selectedDecade
    ? seasons.filter((s) => {
        const decade = decades.find((d) => d.label === selectedDecade)
        if (!decade) return false
        return s.year >= decade.start && s.year <= decade.end
      })
    : seasons

  const sortedFilteredSeasons = [...filteredSeasons].sort((a, b) => b.year - a.year)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-black mb-2 neon-red"
      >
        FORMULA 1 SEASONS
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-text-muted mb-8"
      >
        1950–2024 Championship History
      </motion.p>

      {/* Decade Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedDecade(null)}
          className={`px-4 py-2 rounded font-bold transition-all ${
            selectedDecade === null ? "bg-ferrari-red text-white" : "glass hover:bg-surface-light/50"
          }`}
        >
          All Years ({seasons.length})
        </motion.button>
        {decades.map((d) => {
          const decadeCount = seasons.filter((s) => s.year >= d.start && s.year <= d.end).length
          return (
            <motion.button
              key={d.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDecade(d.label)}
              className={`px-4 py-2 rounded font-bold transition-all ${
                selectedDecade === d.label ? "bg-papaya text-black" : "glass hover:bg-surface-light/50"
              }`}
            >
              {d.label} ({decadeCount})
            </motion.button>
          )
        })}
      </motion.div>

      {selectedDecade && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-text-muted mb-4">
          Showing {sortedFilteredSeasons.length} season{sortedFilteredSeasons.length !== 1 ? "s" : ""} from{" "}
          {selectedDecade}
        </motion.p>
      )}

      {/* Seasons Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-16"
      >
        {sortedFilteredSeasons.map((season, idx) => (
          <motion.a
            key={season.year}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + idx * 0.02 }}
            href={`/season/${season.year}`}
            className="glass rounded-lg p-4 hover:bg-surface-light/50 transition-all group cursor-pointer text-center"
          >
            <div className="text-2xl font-black neon-red group-hover:glow-red">{season.year}</div>
            <div className="text-xs text-text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              View details →
            </div>
          </motion.a>
        ))}
      </motion.div>

      {sortedFilteredSeasons.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 glass rounded-lg">
          <p className="text-text-muted">No seasons found for the selected decade.</p>
        </motion.div>
      )}

      {/* Statistics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold mb-8 neon-red">HISTORICAL OVERVIEW</h2>
        <div className="glass rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl font-black neon-red mb-2">{seasons.length}</div>
              <p className="text-text-muted">Championship seasons (1950-2024)</p>
            </div>
            <div>
              <div className="text-4xl font-black neon-papaya mb-2">1100+</div>
              <p className="text-text-muted">Total races held</p>
            </div>
            <div>
              <div className="text-4xl font-black neon-red mb-2">850+</div>
              <p className="text-text-muted">Drivers across all time</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function SeasonsContentLoader() {
  const [seasons, setSeasons] = useState<Season[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const allYears = Array.from({ length: 75 }, (_, i) => ({
          year: 1950 + i,
        }))

        console.log("[v0] Generated all seasons:", allYears.length)
        setSeasons(allYears)
      } catch (err) {
        console.error("[Seasons] Error:", err)
        const fallbackYears = Array.from({ length: 75 }, (_, i) => ({
          year: 1950 + i,
        }))
        setSeasons(fallbackYears)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSeasons()
  }, [])

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-ferrari-red"></div>
        <p className="mt-4 text-text-muted">Loading seasons...</p>
      </div>
    )
  }

  return <SeasonsGrid seasons={seasons} />
}

export default function SeasonsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="p-8 text-center">Loading seasons...</div>}>
          <SeasonsContentLoader />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
