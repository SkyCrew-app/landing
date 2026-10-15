import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/site'
import { LANGS } from '@/i18n/config'
import { PAGES } from '@/i18n/routes'

export default function robots(): MetadataRoute.Robots {
  const returnPages = LANGS.flatMap((lang) => [PAGES.startThanks[lang], PAGES.startCancelled[lang]])
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', ...returnPages] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
