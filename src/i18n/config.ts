/**
 * Languages of the site. French is the default and keeps the URLs it always had (/, /commencer…);
 * English lives under /en. No redirection by browser language: a URL always shows the same page.
 */
export const LANGS = ['fr', 'en'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'fr'

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value)
}

/** Language of an API request: `?lang=en` on the URL, French otherwise. */
export function langOfRequest(request: Request): Lang {
  try {
    const value = new URL(request.url).searchParams.get('lang')
    return isLang(value) ? value : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

/** BCP 47 locale for Intl formatting and Open Graph. */
export const LOCALES: Record<Lang, { intl: string; og: string; stripe: 'fr' | 'en' }> = {
  fr: { intl: 'fr-FR', og: 'fr_FR', stripe: 'fr' },
  en: { intl: 'en-GB', og: 'en_GB', stripe: 'en' },
}

/** Request header set by src/middleware.ts on /en URLs, read by the "page not found" page. */
export const LANG_HEADER = 'x-skycrew-lang'
