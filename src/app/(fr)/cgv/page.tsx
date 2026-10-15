import type { Metadata } from 'next'
import { TermsFr } from '@/components/legal/content/TermsFr'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('fr', 'terms', getDictionary('fr').meta.terms)

export default function Cgv() {
  return <TermsFr />
}
