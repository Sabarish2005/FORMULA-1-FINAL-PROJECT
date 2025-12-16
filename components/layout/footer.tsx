"use client"

import { useState, useEffect } from "react"

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2025)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="border-t border-border bg-surface glass-dark mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 neon-red">F1 ANALYTICS</h3>
            <p className="text-text-muted text-sm">75 years of racing data visualized.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a href="/" className="hover:text-ferrari-red transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/seasons" className="hover:text-ferrari-red transition-colors">
                  Seasons
                </a>
              </li>
              <li>
                <a href="/drivers" className="hover:text-ferrari-red transition-colors">
                  Drivers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Analytics</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a href="/records" className="hover:text-ferrari-red transition-colors">
                  Records
                </a>
              </li>
              <li>
                <a href="/teams" className="hover:text-ferrari-red transition-colors">
                  Teams
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Data</h4>
            <p className="text-sm text-text-muted">Updated regularly with latest F1 statistics.</p>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-text-muted">
          <p>&copy; {currentYear} Formula 1 Performance Analytics. All rights reserved.</p>
          <p>Racing data from 1950 to 2024</p>
        </div>
      </div>
    </footer>
  )
}
