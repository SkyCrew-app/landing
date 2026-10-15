import { OFFER, type BillingCycle, type Tier } from '@/config/offer'
import { LOCALES, type Lang } from '@/i18n/config'

export interface PriceBreakdown {
  /** Flat part for the chosen period, excluding VAT, in cents. */
  flatCents: number
  /** Per-aircraft unit price for the chosen period, excluding VAT, in cents. */
  perAircraftCents: number
  aircraft: number
  /** Total for the chosen period, excluding VAT, in cents. */
  totalCents: number
  /** Total brought back to one month, excluding VAT, in cents (for comparison). */
  monthlyEquivalentCents: number
  cycle: BillingCycle
}

/** Clamps a number of aircraft to a whole number, at least the minimum. */
export function normalizeAircraft(value: number): number {
  if (!Number.isFinite(value)) return OFFER.minAircraft
  return Math.max(OFFER.minAircraft, Math.floor(value))
}

/** Price of a tier for one billing period: flat fee + per-aircraft fee; a year is N months. */
export function computePrice(tier: Tier, aircraftCount: number, cycle: BillingCycle): PriceBreakdown {
  const aircraft = normalizeAircraft(aircraftCount)
  const months = cycle === 'yearly' ? OFFER.monthsBilledPerYear : 1
  const flatCents = tier.monthlyFlatCents * months
  const perAircraftCents = tier.monthlyPerAircraftCents * months
  const totalCents = flatCents + perAircraftCents * aircraft
  return {
    flatCents,
    perAircraftCents,
    aircraft,
    totalCents,
    monthlyEquivalentCents: Math.round(totalCents / (cycle === 'yearly' ? 12 : 1)),
    cycle,
  }
}

/** "39 €" or "1 234,50 €" in French, "€39" or "€1,234.50" in English. */
export function formatEuros(cents: number, lang: Lang = 'fr'): string {
  const whole = cents % 100 === 0
  return new Intl.NumberFormat(LOCALES[lang].intl, {
    style: 'currency',
    currency: OFFER.currency.toUpperCase(),
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100)
}
