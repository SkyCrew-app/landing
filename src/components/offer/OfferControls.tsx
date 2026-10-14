'use client'

import { useId } from 'react'
import { Minus, Plus } from 'lucide-react'
import { OFFER, TIERS, type BillingCycle, type TierId } from '@/config/offer'
import { computePrice, formatEuros, normalizeAircraft } from '@/lib/pricing'
import { cn } from '@/lib/utils'

export interface OfferChoice {
  tier: TierId
  aircraft: number
  cycle: BillingCycle
}

const optionClass =
  'flex cursor-pointer items-start gap-3 rounded-lg border-2 border-border bg-white p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring'

/** Offer, number of aircraft and billing period. Used by the estimator and the sign-up form. */
export function OfferControls({
  value,
  onChange,
  maxAircraft = 500,
  errors = {},
}: {
  value: OfferChoice
  onChange: (next: OfferChoice) => void
  maxAircraft?: number
  errors?: Record<string, string>
}) {
  const id = useId()
  const set = (patch: Partial<OfferChoice>) => onChange({ ...value, ...patch })
  const setAircraft = (n: number) => set({ aircraft: Math.min(maxAircraft, normalizeAircraft(n)) })

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-3 font-semibold">Offre</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {TIERS.map((tier) => (
            <label key={tier.id} className={optionClass}>
              <input
                type="radio"
                name={`${id}-tier`}
                value={tier.id}
                checked={value.tier === tier.id}
                onChange={() => set({ tier: tier.id })}
                className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
              />
              <span>
                <span className="block font-semibold">{tier.name}</span>
                <span className="block text-sm text-muted-foreground">
                  {formatEuros(tier.monthlyFlatCents)} HT / mois + {formatEuros(tier.monthlyPerAircraftCents)} HT par avion
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${id}-aircraft`} className="mb-3 block font-semibold">
          Nombre d’avions
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-input bg-white hover:bg-secondary disabled:opacity-50"
            onClick={() => setAircraft(value.aircraft - 1)}
            disabled={value.aircraft <= OFFER.minAircraft}
            aria-label="Un avion de moins"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <input
            id={`${id}-aircraft`}
            name="aircraft"
            type="number"
            inputMode="numeric"
            min={OFFER.minAircraft}
            max={maxAircraft}
            value={value.aircraft}
            onChange={(event) => setAircraft(Number(event.target.value))}
            aria-invalid={errors.aircraft ? true : undefined}
            aria-describedby={errors.aircraft ? `${id}-aircraft-error` : undefined}
            className="h-11 w-24 rounded-md border border-input bg-white px-3 text-center text-base"
          />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-input bg-white hover:bg-secondary disabled:opacity-50"
            onClick={() => setAircraft(value.aircraft + 1)}
            disabled={value.aircraft >= maxAircraft}
            aria-label="Un avion de plus"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        {errors.aircraft && (
          <p id={`${id}-aircraft-error`} className="mt-2 text-sm text-destructive">
            {errors.aircraft}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="mb-3 font-semibold">Facturation</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ['monthly', 'Mensuelle', 'Sans engagement au-delà du mois en cours'],
              ['yearly', 'Annuelle', `${12 - OFFER.monthsBilledPerYear} mois offerts`],
            ] as const
          ).map(([cycle, label, hint]) => (
            <label key={cycle} className={optionClass}>
              <input
                type="radio"
                name={`${id}-cycle`}
                value={cycle}
                checked={value.cycle === cycle}
                onChange={() => set({ cycle })}
                className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
              />
              <span>
                <span className="block font-semibold">{label}</span>
                <span className="block text-sm text-muted-foreground">{hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

/** Total for the chosen period, computed from src/config/offer.ts only. */
export function PriceSummary({ value, className }: { value: OfferChoice; className?: string }) {
  const tier = TIERS.find((t) => t.id === value.tier)!
  const price = computePrice(tier, value.aircraft, value.cycle)
  const per = value.cycle === 'yearly' ? 'an' : 'mois'
  return (
    <div className={cn('rounded-lg bg-primary p-5 text-primary-foreground', className)} aria-live="polite">
      <p className="text-sm opacity-90">
        {tier.name}, {price.aircraft} avion{price.aircraft > 1 ? 's' : ''}, facturation {value.cycle === 'yearly' ? 'annuelle' : 'mensuelle'}
      </p>
      <p className="mt-1 text-3xl font-bold">
        {formatEuros(price.totalCents)} <span className="text-base font-medium">HT / {per}</span>
      </p>
      <p className="mt-1 text-sm opacity-90">
        {formatEuros(price.flatCents)} + {price.aircraft} × {formatEuros(price.perAircraftCents)}
        {value.cycle === 'yearly' && <> · soit {formatEuros(price.monthlyEquivalentCents)} HT par mois</>}
      </p>
      <p className="mt-3 text-xs opacity-90">{OFFER.vatMention}</p>
    </div>
  )
}
