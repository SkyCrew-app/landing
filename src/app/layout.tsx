import type { Metadata, Viewport } from 'next'
import { SITE_NAME, SITE_URL } from '@/config/site'
import './globals.css'

/**
 * Pass-through root layout: <html lang> is rendered by the layout of each language,
 * src/app/(fr)/layout.tsx and src/app/en/layout.tsx (and by not-found.tsx, for unknown URLs).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
