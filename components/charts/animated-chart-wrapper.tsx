"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedChartWrapperProps {
  children: ReactNode
  title: string
  className?: string
  delay?: number
}

export function AnimatedChartWrapper({ children, title, className = "", delay = 0 }: AnimatedChartWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`glass rounded-lg p-6 w-full ${className}`}
    >
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
        className="text-lg font-bold mb-4 neon-red"
      >
        {title}
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
