import type { Metadata } from 'next'
import { SiteShell } from '@/components/SiteShell'
import { layoutMetadata } from '@/i18n/metadata'

export const metadata: Metadata = layoutMetadata('fr')

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="fr">{children}</SiteShell>
}
