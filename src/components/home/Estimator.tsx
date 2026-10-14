'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { OfferControls, PriceSummary, type OfferChoice } from '@/components/offer/OfferControls'
import { OFFER } from '@/config/offer'

export function Estimator() {
  const [choice, setChoice] = useState<OfferChoice>({ tier: 'club', aircraft: 4, cycle: 'monthly' })
  const tooMany = choice.aircraft > OFFER.maxAircraftOnline
  const query = new URLSearchParams({ offre: choice.tier, avions: String(choice.aircraft), cycle: choice.cycle })

  return (
    <div className="mt-14 rounded-xl border border-border bg-white p-6 md:p-8" aria-labelledby="estimator-title">
      <h3 id="estimator-title" className="text-xl font-bold">
        Estimer le prix pour votre club
      </h3>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <OfferControls value={choice} onChange={setChoice} />
        <div className="flex flex-col gap-4">
          <PriceSummary value={choice} />
          {tooMany ? (
            <p className="text-sm">
              Au-delà de {OFFER.maxAircraftOnline} avions,{' '}
              <Link className="font-medium text-primary underline" href="/#contact">
                écrivez-nous
              </Link>{' '}
              pour préparer la mise en place.
            </p>
          ) : (
            <Button asChild size="lg">
              <Link href={`/commencer?${query.toString()}`}>Continuer avec ces choix</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
