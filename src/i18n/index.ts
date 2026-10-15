import type { Lang } from '@/i18n/config'
import en from '@/i18n/en'
import fr from '@/i18n/fr'

export type Dictionary = typeof fr

const DICTIONARIES: Record<Lang, Dictionary> = { fr, en }

/** Texts of a language. Server components call it directly; client components get slices as props. */
export function getDictionary(lang: Lang): Dictionary {
  return DICTIONARIES[lang]
}

export { fmt } from '@/i18n/fmt'

export type { Lang } from '@/i18n/config'
