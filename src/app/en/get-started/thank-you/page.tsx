import type { Metadata } from 'next'
import { ThanksPage } from '@/components/pages/ThanksPage'
import type { SearchParams } from '@/components/pages/StartPage'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/i18n/metadata'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = pageMetadata('en', 'startThanks', { ...getDictionary('en').meta.startThanks, index: false })

export default function ThankYou({ searchParams }: { searchParams: SearchParams }) {
  return <ThanksPage lang="en" searchParams={searchParams} />
}
