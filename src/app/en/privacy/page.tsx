import type { Metadata } from 'next'
import { PrivacyEn } from '@/components/legal/content/PrivacyEn'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('en', 'privacy', getDictionary('en').meta.privacy)

export default function Privacy() {
  return <PrivacyEn />
}
