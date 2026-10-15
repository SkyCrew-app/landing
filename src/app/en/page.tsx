import type { Metadata } from 'next'
import { HomePage } from '@/components/pages/HomePage'
import { pageMetadata } from '@/i18n/metadata'

export const metadata: Metadata = pageMetadata('en', 'home')

export default function Home() {
  return <HomePage lang="en" />
}
