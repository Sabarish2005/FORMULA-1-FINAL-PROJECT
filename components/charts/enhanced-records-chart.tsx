"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts"
import { colors } from "@/lib/colors"
import { AnimatedChartWrapper } from "./animated-chart-wrapper"

interface RecordsChartProps {
  data: any[]
  dataKey: string
  title: string
  color?: string
  layout?: "horizontal" | "vertical"
  delay?: number
}

export function EnhancedRecordsChart({
  data,
  dataKey,
  title,
  color = colors.primary,
  layout = "vertical",
  delay = 0,
}: RecordsChartProps) {
  const COLORS = ["#ff0a0a", "#ff8700", "#4f46e5", "#06b6d4", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"]

  return (
    <AnimatedChartWrapper title={title} delay={delay} className="mb-8">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout={layout}>
          <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
          {layout === "vertical" ? (
            <>
              <XAxis type="number" tick={{ fill: "#a0a0a0", fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "#a0a0a0", fontSize: 11 }} width={120} />
            </>
          ) : (
            <>
              <XAxis
                dataKey="name"
                tick={{ fill: "#a0a0a0", fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis tick={{ fill: "#a0a0a0", fontSize: 12 }} />
            </>
          )}
          <Tooltip
            contentStyle={{ backgroundColor: "#1a1a1a", border: `1px solid ${color}` }}
            labelStyle={{ color: "#fff" }}
          />
          <Bar
            dataKey={dataKey}
            fill={color}
            radius={layout === "vertical" ? [0, 8, 8, 0] : [8, 8, 0, 0]}
            isAnimationActive={true}
            animationDuration={1500}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AnimatedChartWrapper>
  )
}
