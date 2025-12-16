import type { Metadata, Viewport } from 'next'
import { Orbitron } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'F1 Performance Analytics | 1950-2024',
  description: 'Advanced Formula 1 analytics, statistics, and performance visualizations across 75 years of racing history.',
  icons: {
    icon: '/favicon.ico',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ff0a0a',
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.className} bg-carbon text-white antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-carbon via-slate-950 to-carbon">
          {children}
        </div>
      </body>
    </html>
  )
}
