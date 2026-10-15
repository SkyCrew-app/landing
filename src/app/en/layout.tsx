import type { Metadata } from 'next'
import { SiteShell } from '@/components/SiteShell'
import { layoutMetadata } from '@/i18n/metadata'

export const metadata: Metadata = layoutMetadata('en')

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>
}
