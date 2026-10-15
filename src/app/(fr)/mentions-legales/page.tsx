import type { Metadata } from 'next'
import { LegalNoticeFr } from '@/components/legal/content/LegalNoticeFr'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('fr', 'legalNotice', getDictionary('fr').meta.legalNotice)

export default function MentionsLegales() {
  return <LegalNoticeFr />
}
