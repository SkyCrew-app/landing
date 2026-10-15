import { DEFAULT_LANG, LANGS, type Lang } from '@/i18n/config'

/**
 * Every page in both languages. French keeps its historical URLs; English pages live under /en
 * with English slugs. Add a page here first: the language switch, the hreflang alternates and the
 * sitemap all read this table.
 */
export const PAGES = {
  home: { fr: '/', en: '/en' },
  start: { fr: '/commencer', en: '/en/get-started' },
  startThanks: { fr: '/commencer/merci', en: '/en/get-started/thank-you' },
  startCancelled: { fr: '/commencer/annule', en: '/en/get-started/cancelled' },
  legalNotice: { fr: '/mentions-legales', en: '/en/legal-notice' },
  terms: { fr: '/cgv', en: '/en/terms' },
  privacy: { fr: '/confidentialite', en: '/en/privacy' },
} as const satisfies Record<string, Record<Lang, string>>

export type PageKey = keyof typeof PAGES

/** Pages listed in the sitemap (the Stripe return pages are not). */
export const INDEXED_PAGES: { key: PageKey; changeFrequency: 'monthly' | 'yearly'; priority: number }[] = [
  { key: 'home', changeFrequency: 'monthly', priority: 1 },
  { key: 'start', changeFrequency: 'monthly', priority: 0.8 },
  { key: 'legalNotice', changeFrequency: 'yearly', priority: 0.2 },
  { key: 'terms', changeFrequency: 'yearly', priority: 0.3 },
  { key: 'privacy', changeFrequency: 'yearly', priority: 0.2 },
]

/** Anchors of the home page sections (URL fragments, so they follow the language too). */
export const SECTIONS = {
  features: { fr: 'fonctionnalites', en: 'features' },
  how: { fr: 'comment-ca-marche', en: 'how-it-works' },
  pricing: { fr: 'tarifs', en: 'pricing' },
  faq: { fr: 'questions', en: 'faq' },
  contact: { fr: 'contact', en: 'contact' },
} as const satisfies Record<string, Record<Lang, string>>

export type SectionKey = keyof typeof SECTIONS

/** Query parameters of the sign-up page, preset by the estimator and the pricing cards. */
export const START_QUERY: Record<Lang, { tier: string; aircraft: string; cycle: string }> = {
  fr: { tier: 'offre', aircraft: 'avions', cycle: 'cycle' },
  en: { tier: 'plan', aircraft: 'aircraft', cycle: 'cycle' },
}

export function pathOf(lang: Lang, key: PageKey): string {
  return PAGES[key][lang]
}

export function sectionId(lang: Lang, key: SectionKey): string {
  return SECTIONS[key][lang]
}

/** Link to a section of the home page, e.g. "/#tarifs" or "/en#pricing". */
export function sectionHref(lang: Lang, key: SectionKey): string {
  const home = PAGES.home[lang]
  return `${home === '/' ? '/' : home}#${SECTIONS[key][lang]}`
}

/** Page key of a pathname, or null for a path that is not one of the site's pages. */
export function pageOfPath(pathname: string): { key: PageKey; lang: Lang } | null {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  for (const key of Object.keys(PAGES) as PageKey[]) {
    for (const lang of LANGS) {
      if (PAGES[key][lang] === clean) return { key, lang }
    }
  }
  return null
}

/** Language of a pathname: English under /en, French everywhere else. */
export function langOfPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LANG
}

/** Same page in the other language; the other home page when the path is unknown (404). */
export function switchPath(pathname: string, to: Lang): string {
  const page = pageOfPath(pathname)
  return PAGES[page?.key ?? 'home'][to]
}
