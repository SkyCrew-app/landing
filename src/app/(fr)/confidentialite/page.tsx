import type { Metadata } from 'next'
import { PrivacyFr } from '@/components/legal/content/PrivacyFr'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('fr', 'privacy', getDictionary('fr').meta.privacy)

export default function Confidentialite() {
  return <PrivacyFr />
}
