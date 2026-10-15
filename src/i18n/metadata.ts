import type { Metadata } from 'next'
import { SITE_NAME } from '@/config/site'
import { LANGS, LOCALES, type Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { PAGES, type PageKey } from '@/i18n/routes'

/** hreflang alternates of a page: both languages, French as the default (x-default). */
export function languageAlternates(key: PageKey): Record<string, string> {
  const out: Record<string, string> = {}
  for (const lang of LANGS) out[lang] = PAGES[key][lang]
  out['x-default'] = PAGES[key].fr
  return out
}

/**
 * Open Graph image of a language (src/app/opengraph-image.png, src/app/en/opengraph-image.png).
 * Named explicitly: a page that sets its own `openGraph` would otherwise lose the image.
 */
function ogImage(lang: Lang) {
  return {
    url: lang === 'en' ? '/en/opengraph-image.png' : '/opengraph-image.png',
    width: 1200,
    height: 630,
    alt: getDictionary(lang).meta.ogImageAlt,
  }
}

/** Metadata shared by every page of a language (set on its layout). */
export function layoutMetadata(lang: Lang): Metadata {
  const t = getDictionary(lang).meta
  return {
    title: { default: t.siteTitle, template: `%s – ${SITE_NAME}` },
    description: t.siteDescription,
    openGraph: {
      type: 'website',
      locale: LOCALES[lang].og,
      alternateLocale: LANGS.filter((other) => other !== lang).map((other) => LOCALES[other].og),
      siteName: SITE_NAME,
      title: t.siteTitle,
      description: t.siteDescription,
      images: [ogImage(lang)],
    },
  }
}

/**
 * Metadata of one page: title, description, canonical URL, hreflang alternates and Open Graph,
 * in the page's language. `robots: false` for pages that must not be indexed.
 */
export function pageMetadata(
  lang: Lang,
  key: PageKey,
  page: { title?: string; description?: string; index?: boolean } = {},
): Metadata {
  const t = getDictionary(lang).meta
  const description = page.description ?? t.siteDescription
  const metadata: Metadata = {
    ...(page.title ? { title: page.title } : {}),
    description,
    alternates: { canonical: PAGES[key][lang], languages: languageAlternates(key) },
    openGraph: {
      type: 'website',
      locale: LOCALES[lang].og,
      alternateLocale: LANGS.filter((other) => other !== lang).map((other) => LOCALES[other].og),
      siteName: SITE_NAME,
      title: page.title ? `${page.title} – ${SITE_NAME}` : t.siteTitle,
      description,
      url: PAGES[key][lang],
      images: [ogImage(lang)],
    },
  }
  if (page.index === false) metadata.robots = { index: false }
  return metadata
}
