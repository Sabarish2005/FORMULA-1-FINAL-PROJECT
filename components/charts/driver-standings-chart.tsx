'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { colors } from '@/lib/colors'

interface DriverChartData {
  race: string
  [driverName: string]: string | number
}

interface DriverStandingsChartProps {
  data: DriverChartData[]
  drivers: { drivername: string }[]
}

export function DriverStandingsChart({ data, drivers }: DriverStandingsChartProps) {
  const chartColors = [
    colors.primary,
    colors.accent,
    '#00d9ff',
    '#00ff88',
    '#ff6b9d',
    '#ffd700',
    '#00ccff',
    '#ff9500',
  ]

  return (
    <div className="glass rounded-lg p-6 w-full">
      <h3 className="text-lg font-bold mb-4 neon-red">Driver Standings Progression</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis dataKey="race" stroke={colors.textMuted} />
          <YAxis stroke={colors.textMuted} />
          <Tooltip contentStyle={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }} />
          <Legend />
          {drivers.slice(0, 5).map((driver, idx) => (
            <Line
              key={driver.drivername}
              type="monotone"
              dataKey={driver.drivername}
              stroke={chartColors[idx % chartColors.length]}
              dot={false}
              isAnimationActive={true}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
