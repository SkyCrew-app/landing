import type { Metadata } from 'next'
import { LegalNoticeEn } from '@/components/legal/content/LegalNoticeEn'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('en', 'legalNotice', getDictionary('en').meta.legalNotice)

export default function LegalNotice() {
  return <LegalNoticeEn />
}
