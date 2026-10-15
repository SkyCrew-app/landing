import type { Metadata } from 'next'
import { CancelledPage } from '@/components/pages/CancelledPage'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('en', 'startCancelled', { ...getDictionary('en').meta.startCancelled, index: false })

export default function Cancelled() {
  return <CancelledPage lang="en" />
}
