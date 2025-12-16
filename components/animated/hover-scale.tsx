'use client'

interface HoverScaleProps {
  children: React.ReactNode
  scale?: number
}

export function HoverScale({ children, scale = 1.05 }: HoverScaleProps) {
  return (
    <div
      style={{
        transition: 'transform 0.3s ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `scale(${scale})`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {children}
    </div>
  )
}
