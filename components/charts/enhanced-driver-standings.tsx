"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { colors } from "@/lib/colors"
import { AnimatedChartWrapper } from "./animated-chart-wrapper"

interface DriverChartData {
  race: string
  [driverName: string]: string | number
}

interface EnhancedDriverStandingsProps {
  data: DriverChartData[]
  drivers: { drivername: string }[]
  delay?: number
}

export function EnhancedDriverStandings({ data, drivers, delay = 0 }: EnhancedDriverStandingsProps) {
  const chartColors = [colors.primary, colors.accent, "#00d9ff", "#00ff88", "#ff6b9d", "#ffd700", "#00ccff", "#ff9500"]

  return (
    <AnimatedChartWrapper title="Driver Standings Progression" delay={delay}>
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
              animationDuration={1500}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </AnimatedChartWrapper>
  )
}
