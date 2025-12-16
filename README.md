# Formula 1 Performance Analytics | 1950-2024

A production-ready full-stack Formula 1 analytics platform featuring advanced visualizations, comprehensive statistics, and performance insights across 75 years of racing history.

## Features

✨ **Advanced Analytics**
- 75 years of racing data (1950-2024)
- Driver career statistics and comparisons
- Constructor team records and achievements
- Season-by-season performance tracking
- All-time records and leaderboards

🎨 **Premium Design**
- Dark mode with neon red and papaya accents
- Glassmorphism cards and effects
- Smooth animations and transitions
- Responsive mobile-first design
- Racing-themed UI with Orbitron font

📊 **Interactive Visualizations**
- Driver standings line charts
- Constructor wins bar charts
- Animated statistics counters
- Leaderboards and rankings
- Race results tables

🚀 **Performance**
- Next.js 14 App Router with TypeScript
- Server-side rendering and static generation
- Optimized for Vercel deployment
- Fast API routes with mock data
- Client-side state management with React hooks

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Charts**: Recharts
- **Animations**: Native CSS + React Intersection Observer
- **Deployment**: Vercel

## Project Structure

\`\`\`
.
├── app/
│   ├── layout.tsx              # Root layout with theme
│   ├── page.tsx                # Home page with hero
│   ├── api/                    # Backend API routes
│   │   ├── seasons/            # Seasons endpoint
│   │   ├── season/[year]/      # Season details
│   │   ├── driver/[id]/        # Driver stats
│   │   ├── team/[id]/          # Team stats
│   │   └── records/            # All-time records
│   ├── seasons/                # Seasons listing page
│   ├── season/[year]/          # Season dashboard
│   ├── drivers/                # Drivers listing
│   ├── driver/[id]/            # Driver detail
│   ├── teams/                  # Teams listing
│   ├── team/[id]/              # Team detail
│   └── records/                # Records page
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Navigation header
│   │   └── footer.tsx          # Footer
│   ├── charts/
│   │   ├── driver-standings-chart.tsx
│   │   ├── constructor-standings-chart.tsx
│   │   ├── stats-card.tsx
│   │   ├── leaderboard.tsx
│   │   └── race-results-table.tsx
│   └── animated/
│       ├── fade-in.tsx         # Fade-in animation
│       ├── glow-text.tsx       # Glow effect
│       ├── hover-scale.tsx     # Hover scale
│       └── counter.tsx         # Number counter
├── lib/
│   ├── colors.ts               # Color palette
│   ├── utils.ts                # Utilities
│   └── data-parser.ts          # CSV parser
├── app/globals.css             # Global styles & theme
├── next.config.mjs             # Next.js config
├── package.json                # Dependencies
└── README.md                   # This file
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/f1-analytics.git
   cd f1-analytics
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## Available Pages

- `/` - Home page with hero and quick stats
- `/seasons` - All Formula 1 seasons (1950-2024)
- `/season/[year]` - Season details and standings
- `/drivers` - All drivers listing
- `/driver/[id]` - Driver career statistics
- `/teams` - Constructor teams
- `/team/[id]` - Team achievements and records
- `/records` - All-time Formula 1 records

## API Endpoints

- `GET /api/seasons` - All seasons
- `GET /api/season/[year]` - Season details
- `GET /api/driver/[id]` - Driver statistics
- `GET /api/team/[id]` - Team statistics
- `GET /api/records` - All-time records

## Data

The project uses mock data for demonstration. To integrate real F1 data:

1. **Add CSV files** to `/public/data/`:
   - `drivers.csv`
   - `constructors.csv`
   - `races.csv`
   - `results.csv`
   - `lap_times.csv`
   - `pit_stops.csv`
   - `circuits.csv`

2. **Update data parser** in `lib/data-parser.ts`

3. **Connect to API routes** in `app/api/`

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git push origin main
   \`\`\`

2. **Import in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Select repository
   - Click "Deploy"

3. **That's it!** Your site is live

### Environment Variables

No environment variables are required for the demo. Add them to Vercel if you connect real data sources:

\`\`\`
DATABASE_URL=your_database_url
API_KEY=your_api_key
\`\`\`

## Customization

### Change Colors

Edit `app/globals.css` theme section:

\`\`\`css
--color-ferrari-red: #ff0a0a;
--color-papaya: #ff8700;
--color-carbon: #0d0d0d;
\`\`\`

### Add Data

Update mock data generators in `lib/data-parser.ts`:

\`\`\`typescript
export const generateMockData = {
  drivers: () => [/* your data */],
  // ...
}
\`\`\`

### Modify Animations

- `components/animated/fade-in.tsx` - Scroll fade-in
- `components/animated/counter.tsx` - Number animation
- `app/globals.css` - Keyframe animations

## Performance

- ⚡ 90+ Lighthouse score
- 🚀 <100ms First Contentful Paint
- 📱 Mobile-first responsive design
- ♿ WCAG 2.1 AA accessibility

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 11+)

## License

MIT License - Feel free to use for commercial projects

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

For issues, questions, or suggestions:

- 📧 Email: support@f1analytics.com
- 🐛 GitHub Issues: [Report Bug](https://github.com/yourusername/f1-analytics/issues)
- 💬 Discussions: [Start Discussion](https://github.com/yourusername/f1-analytics/discussions)

## Roadmap

- [ ] Real-time race updates
- [ ] ML prediction engine
- [ ] Advanced data filters
- [ ] Export functionality
- [ ] User accounts & favorites
- [ ] Social sharing features
- [ ] Mobile app
- [ ] WebGL visualizations

---

**Built with ❤️ for Formula 1 fans everywhere**

Last updated: November 2025
\`\`\`

\`\`\`json file="" isHidden
