'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Seasons', href: '/seasons' },
    { label: 'Drivers', href: '/drivers' },
    { label: 'Teams', href: '/teams' },
    { label: 'Records', href: '/records' },
  ]

  return (
    <header className="sticky top-0 z-50 glass-dark border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ferrari-red rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">F1</span>
            </div>
            <span className="text-lg font-bold hidden sm:inline neon-red">ANALYTICS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-muted hover:text-ferrari-red transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-surface-light rounded transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-text-muted hover:text-ferrari-red hover:bg-surface-light rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
