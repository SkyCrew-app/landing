import type { Metadata } from 'next'
import { StartPage, type SearchParams } from '@/components/pages/StartPage'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/i18n/metadata'

// Read at each request: the page shows the payment only while Stripe is configured on the server.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = pageMetadata('fr', 'start', getDictionary('fr').meta.start)

export default function Commencer({ searchParams }: { searchParams: SearchParams }) {
  return <StartPage lang="fr" searchParams={searchParams} />
}
