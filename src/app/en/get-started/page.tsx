import type { Metadata } from 'next'
import { StartPage, type SearchParams } from '@/components/pages/StartPage'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/i18n/metadata'

// Read at each request: the page shows the payment only while Stripe is configured on the server.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = pageMetadata('en', 'start', getDictionary('en').meta.start)

export default function GetStarted({ searchParams }: { searchParams: SearchParams }) {
  return <StartPage lang="en" searchParams={searchParams} />
}
