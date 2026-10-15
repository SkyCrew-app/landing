import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/site'
import { LANGS } from '@/i18n/config'
import { languageAlternates } from '@/i18n/metadata'
import { INDEXED_PAGES, PAGES } from '@/i18n/routes'

const absolute = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`

/** Every indexed page in both languages, each with its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXED_PAGES.flatMap(({ key, changeFrequency, priority }) => {
    const languages = Object.fromEntries(Object.entries(languageAlternates(key)).map(([lang, path]) => [lang, absolute(path)]))
    return LANGS.map((lang) => ({ url: absolute(PAGES[key][lang]), changeFrequency, priority, alternates: { languages } }))
  })
}
