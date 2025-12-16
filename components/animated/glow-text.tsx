'use client'

interface GlowTextProps {
  children: string
  color?: 'red' | 'papaya'
  animate?: boolean
}

export function GlowText({ children, color = 'red', animate = true }: GlowTextProps) {
  const animationClass = animate ? (color === 'red' ? 'glow-red' : 'glow-papaya') : ''
  
  return (
    <span className={`${animationClass} ${color === 'red' ? 'neon-red' : 'neon-papaya'}`}>
      {children}
    </span>
  )
}
