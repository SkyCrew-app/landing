import { describe, expect, it } from 'vitest'
import { OFFER, TIERS, getTier } from '@/config/offer'
import { computePrice, formatEuros, normalizeAircraft } from '@/lib/pricing'

const club = getTier('club')!
const ecole = getTier('club-ecole')!

describe('computePrice', () => {
  it('adds the flat fee and the per-aircraft fee for a month', () => {
    const price = computePrice(club, 4, 'monthly')
    expect(price.totalCents).toBe(club.monthlyFlatCents + 4 * club.monthlyPerAircraftCents)
    expect(price.flatCents).toBe(club.monthlyFlatCents)
    expect(price.perAircraftCents).toBe(club.monthlyPerAircraftCents)
  })

  it('bills a year as monthsBilledPerYear months', () => {
    const month = computePrice(ecole, 7, 'monthly')
    const year = computePrice(ecole, 7, 'yearly')
    expect(year.totalCents).toBe(month.totalCents * OFFER.monthsBilledPerYear)
    expect(year.monthlyEquivalentCents).toBe(Math.round(year.totalCents / 12))
  })

  it('charges at least the minimum number of aircraft', () => {
    expect(computePrice(club, 0, 'monthly').aircraft).toBe(OFFER.minAircraft)
    expect(computePrice(club, -3, 'monthly').aircraft).toBe(OFFER.minAircraft)
    expect(computePrice(club, Number.NaN, 'monthly').aircraft).toBe(OFFER.minAircraft)
    expect(normalizeAircraft(2.9)).toBe(2)
  })

  it('matches the provisional prices of the owner (39 € + 6 €/avion, 69 € + 6 €/avion)', () => {
    expect(computePrice(club, 1, 'monthly').totalCents).toBe(4500)
    expect(computePrice(ecole, 5, 'yearly').totalCents).toBe((6900 + 5 * 600) * 10)
  })

  it('has one tier per id', () => {
    expect(new Set(TIERS.map((t) => t.id)).size).toBe(TIERS.length)
  })
})

describe('formatEuros', () => {
  it('formats in French, without cents when round', () => {
    expect(formatEuros(3900).replace(/\s/g, ' ')).toBe('39 €')
    expect(formatEuros(123450).replace(/\s/g, ' ')).toBe('1 234,50 €')
  })
  it('formats in English for the English pages', () => {
    expect(formatEuros(3900, 'en')).toBe('€39')
    expect(formatEuros(123450, 'en')).toBe('€1,234.50')
  })
})
