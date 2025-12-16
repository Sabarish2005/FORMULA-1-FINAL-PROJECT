'use client'

interface RaceResult {
  position: number
  driver: string
  team: string
  points: number
  gap?: string
}

interface RaceResultsTableProps {
  title: string
  results: RaceResult[]
}

export function RaceResultsTable({ title, results }: RaceResultsTableProps) {
  return (
    <div className="glass rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-bold neon-red">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-sm font-semibold text-text-muted">Pos</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-text-muted">Driver</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-text-muted">Team</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-text-muted">Points</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-text-muted">Gap</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, idx) => (
              <tr key={idx} className="border-b border-border/50 hover:bg-surface-light/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold neon-red">{result.position}</td>
                <td className="px-6 py-4 text-sm font-medium">{result.driver}</td>
                <td className="px-6 py-4 text-sm text-text-muted">{result.team}</td>
                <td className="px-6 py-4 text-sm font-bold text-right neon-red">{result.points}</td>
                <td className="px-6 py-4 text-sm text-right text-text-muted">{result.gap || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
