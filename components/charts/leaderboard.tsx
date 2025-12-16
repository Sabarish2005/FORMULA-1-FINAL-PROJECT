'use client'

interface LeaderboardItem {
  rank: number
  name: string
  value: number
  secondary?: number
}

interface LeaderboardProps {
  title: string
  items: LeaderboardItem[]
  showSecondary?: boolean
  secondaryLabel?: string
}

export function Leaderboard({ title, items, showSecondary, secondaryLabel }: LeaderboardProps) {
  return (
    <div className="glass rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4 neon-red">{title}</h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between pb-3 border-b border-border last:border-b-0">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-sm neon-red">{item.rank}</span>
              </div>
              <span className="font-medium truncate">{item.name}</span>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 ml-2">
              <div className="text-right">
                <div className="font-bold neon-red">{item.value}</div>
                {showSecondary && item.secondary && (
                  <div className="text-xs text-text-muted">{secondaryLabel}: {item.secondary}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
