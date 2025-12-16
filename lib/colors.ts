export const colors = {
  primary: '#ff0a0a',      // Ferrari Red
  accent: '#ff8700',       // McLaren Papaya
  background: '#0d0d0d',   // Carbon
  surface: '#1a1a1a',      // Dark Grey
  surfaceLight: '#2d2d2d', // Mid Grey
  border: '#404040',       // Light Grey
  text: '#ffffff',
  textMuted: '#a0a0a0',
} as const

export type ThemeColors = typeof colors
