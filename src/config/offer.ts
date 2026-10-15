/**
 * SkyCrew offer: tiers and prices. The site, the estimator and the Stripe checkout all read
 * their amounts from this file and nothing else (the texts are in src/i18n/).
 *
 * TODO (owner): the amounts below are PROVISIONAL. Set the real prices, then rebuild and
 * redeploy the site. If you create the prices in Stripe instead, put their ids in the
 * environment (see .env.example) and keep these amounts identical to the Stripe ones:
 * the site displays these, Stripe charges its own.
 */

export type TierId = 'club' | 'club-ecole'
export type BillingCycle = 'monthly' | 'yearly'

export interface Tier {
  id: TierId
  /** Monthly flat fee, excluding VAT, in cents. */
  monthlyFlatCents: number
  /** Monthly fee per aircraft, excluding VAT, in cents. */
  monthlyPerAircraftCents: number
}

export const OFFER = {
  currency: 'eur',
  /** A year costs this many months: 10 means two months free. */
  monthsBilledPerYear: 10,
  minAircraft: 1,
  /** Largest fleet accepted by the online sign-up; above it, the site asks to get in touch. */
  maxAircraftOnline: 60,
  /**
   * Free trial, in days, given to every new subscription taken on the site: the card is
   * registered, nothing is charged before the end of the trial, and a cancellation before
   * that date costs nothing. 0 disables it. The CGV quote this value.
   */
  trialDays: 14,
} as const

/**
 * Prices are shown and charged excluding VAT. The names, one-line summaries and feature lists of
 * the tiers, and the VAT line under the prices, are texts: they are in src/i18n/fr.ts and
 * src/i18n/en.ts (`tiers`, `pricing.vatMention`).
 */
export const TIERS: Tier[] = [
  { id: 'club', monthlyFlatCents: 3900, monthlyPerAircraftCents: 600 },
  { id: 'club-ecole', monthlyFlatCents: 6900, monthlyPerAircraftCents: 600 },
]

export const TIER_IDS = TIERS.map((tier) => tier.id) as [TierId, ...TierId[]]

export function getTier(id: string): Tier | undefined {
  return TIERS.find((tier) => tier.id === id)
}
