import type { Lang } from '@/i18n/config'

/** Name of the visitor's language in the owner's notifications (which stay in French). */
export const VISITOR_LANGUAGE: Record<Lang, string> = { fr: 'français', en: 'anglais' }

/** The "Langue du visiteur" line added to every notification sent from a visitor's form. */
export function visitorLanguageField(lang: Lang): [string, string] {
  return ['Langue du visiteur', VISITOR_LANGUAGE[lang]]
}
