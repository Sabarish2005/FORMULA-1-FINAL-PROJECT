'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { colors } from '@/lib/colors'

interface ConstructorData {
  name: string
  wins: number
  points: number
}

interface ConstructorChartProps {
  data: ConstructorData[]
}

export function ConstructorStandingsChart({ data }: ConstructorChartProps) {
  return (
    <div className="glass rounded-lg p-6 w-full">
      <h3 className="text-lg font-bold mb-4 neon-red">Constructor Wins</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis dataKey="name" stroke={colors.textMuted} angle={-45} textAnchor="end" height={80} />
          <YAxis stroke={colors.textMuted} />
          <Tooltip contentStyle={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }} />
          <Bar dataKey="wins" fill={colors.primary} isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
