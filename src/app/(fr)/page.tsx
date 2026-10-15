import type { Metadata } from 'next'
import { HomePage } from '@/components/pages/HomePage'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('fr', 'home')

export default function Accueil() {
  return <HomePage lang="fr" />
}
