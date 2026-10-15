import type { Metadata } from 'next'
import { TermsEn } from '@/components/legal/content/TermsEn'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('en', 'terms', getDictionary('en').meta.terms)

export default function Terms() {
  return <TermsEn />
}
