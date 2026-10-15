import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { NotFoundPage } from '@/components/pages/NotFoundPage'
import { SiteShell } from '@/components/SiteShell'
import { DEFAULT_LANG, LANG_HEADER, isLang, type Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'

/** Language of the unknown URL: English under /en (tagged by src/middleware.ts), French elsewhere. */
async function requestLang(): Promise<Lang> {
  const value = (await headers()).get(LANG_HEADER)
  return isLang(value) ? value : DEFAULT_LANG
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await requestLang()
  return { title: getDictionary(lang).meta.notFound.title, robots: { index: false } }
}

export default async function NotFound() {
  const lang = await requestLang()
  return (
    <SiteShell lang={lang}>
      <NotFoundPage lang={lang} />
    </SiteShell>
  )
}
