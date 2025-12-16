'use client'

import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  from: number
  to: number
  duration?: number
  suffix?: string
  format?: (n: number) => string
}

export function Counter({ from, to, duration = 2, suffix = '', format }: CounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const start = Date.now()
    const diff = to - from

    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / (duration * 1000), 1)
      setCount(Math.floor(from + diff * progress))
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, from, to, duration])

  const displayValue = format ? format(count) : count.toLocaleString()

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  )
}
