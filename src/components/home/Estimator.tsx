'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { OfferControls, PriceSummary, type OfferChoice } from '@/components/offer/OfferControls'
import { OFFER } from '@/config/offer'
import type { Lang } from '@/i18n/config'
import { fmt } from '@/i18n/fmt'
import { START_QUERY, pathOf, sectionHref } from '@/i18n/routes'
import type { EstimatorTexts } from '@/i18n/slices'

export function Estimator({ lang, texts }: { lang: Lang; texts: EstimatorTexts }) {
  const t = texts.estimator
  const [choice, setChoice] = useState<OfferChoice>({ tier: 'club', aircraft: 4, cycle: 'monthly' })
  const tooMany = choice.aircraft > OFFER.maxAircraftOnline
  const keys = START_QUERY[lang]
  const query = new URLSearchParams({ [keys.tier]: choice.tier, [keys.aircraft]: String(choice.aircraft), [keys.cycle]: choice.cycle })

  return (
    <div className="mt-14 rounded-xl border border-border bg-white p-6 md:p-8" aria-labelledby="estimator-title">
      <h3 id="estimator-title" className="text-xl font-bold">
        {t.title}
      </h3>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <OfferControls value={choice} onChange={setChoice} texts={texts.offer} />
        <div className="flex flex-col gap-4">
          <PriceSummary value={choice} texts={texts.offer} />
          {tooMany ? (
            <p className="text-sm">
              {fmt(t.tooManyBefore, { max: OFFER.maxAircraftOnline })}{' '}
              <Link className="font-medium text-primary underline" href={sectionHref(lang, 'contact')}>
                {t.tooManyLink}
              </Link>{' '}
              {t.tooManyAfter}
            </p>
          ) : (
            <Button asChild size="lg">
              <Link href={`${pathOf(lang, 'start')}?${query.toString()}`}>{t.cta}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
