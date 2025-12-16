'use client'

interface StatsCardProps {
  title: string
  value: string | number
  unit?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down'
}

export function StatsCard({ title, value, unit, icon, trend }: StatsCardProps) {
  return (
    <div className="glass rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-text-muted text-sm font-medium mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold neon-red">{value}</span>
            {unit && <span className="text-text-muted text-sm">{unit}</span>}
          </div>
        </div>
        {icon && <div className="text-papaya">{icon}</div>}
      </div>
      {trend && (
        <div className="mt-4 text-sm">
          <span className={trend === 'up' ? 'text-green-400' : 'text-red-400'}>
            {trend === 'up' ? '↑' : '↓'} {Math.floor(Math.random() * 20)}%
          </span>
        </div>
      )}
    </div>
  )
}
