import type { TierId } from '@/config/offer'
import type { Lang } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

/**
 * Parts of a dictionary handed to client components as props, so the browser only downloads the
 * texts it shows, in one language.
 */

export interface OfferTexts {
  lang: Lang
  offer: Dictionary['offer']
  tierNames: Record<TierId, string>
  vatMention: string
}

export function offerTexts(lang: Lang, t: Dictionary): OfferTexts {
  return {
    lang,
    offer: t.offer,
    tierNames: { club: t.tiers.club.name, 'club-ecole': t.tiers['club-ecole'].name },
    vatMention: t.pricing.vatMention,
  }
}

export interface ContactFormTexts {
  forms: Dictionary['forms']
  form: Dictionary['contactForm']
  validation: Dictionary['validation']
}

export function contactFormTexts(t: Dictionary): ContactFormTexts {
  return { forms: t.forms, form: t.contactForm, validation: t.validation }
}

export interface SignupTexts {
  forms: Dictionary['forms']
  signup: Dictionary['signup']
  validation: Dictionary['validation']
  offer: OfferTexts
}

export function signupTexts(lang: Lang, t: Dictionary): SignupTexts {
  return { forms: t.forms, signup: t.signup, validation: t.validation, offer: offerTexts(lang, t) }
}

export interface EstimatorTexts {
  estimator: Dictionary['estimator']
  offer: OfferTexts
}

export function estimatorTexts(lang: Lang, t: Dictionary): EstimatorTexts {
  return { estimator: t.estimator, offer: offerTexts(lang, t) }
}

export interface HeaderTexts {
  header: Dictionary['header']
  homeLabel: string
}

export function headerTexts(t: Dictionary): HeaderTexts {
  return { header: t.header, homeLabel: t.common.homeLabel }
}
