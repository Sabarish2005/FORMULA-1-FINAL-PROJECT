import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { StatsCard } from '@/components/charts/stats-card'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function TeamPage({ params }: PageProps) {
  const { id } = await params

  const team = {
    id,
    name: 'Mercedes',
    country: 'Germany',
    founded: 1954,
    championships: 8,
    wins: 246,
    poles: 238,
    fastestLaps: 147,
    drivers: [
      { name: 'Lewis Hamilton', number: 44 },
      { name: 'George Russell', number: 63 },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="glass rounded-lg p-8 text-center">
                <div className="w-24 h-24 bg-cyan-500/20 rounded-lg mx-auto mb-6 flex items-center justify-center border-2 border-cyan-500">
                  <span className="text-2xl font-black text-cyan-400">M</span>
                </div>
                <h1 className="text-2xl font-black mb-2 neon-red">{team.name}</h1>
                <p className="text-text-muted mb-2">Founded {team.founded}</p>
                <p className="text-sm text-text-muted mb-4">{team.country}</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 neon-red">ACHIEVEMENTS</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatsCard title="Championships" value={team.championships} />
                <StatsCard title="Wins" value={team.wins} />
                <StatsCard title="Poles" value={team.poles} />
                <StatsCard title="Fastest Laps" value={team.fastestLaps} />
                <StatsCard title="Drivers" value={team.drivers.length} />
                <StatsCard title="Years Active" value={2024 - team.founded} />
              </div>
            </div>
          </div>

          <div className="glass rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 neon-red">CURRENT DRIVERS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.drivers.map((driver) => (
                <div key={driver.name} className="flex items-center gap-4 pb-4 border-b border-border last:border-0">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center">
                    <span className="neon-red font-bold">{driver.number}</span>
                  </div>
                  <span className="font-medium">{driver.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
