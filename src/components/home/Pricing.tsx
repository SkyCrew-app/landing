import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Estimator } from '@/components/home/Estimator'
import { OFFER, TIERS } from '@/config/offer'
import type { Lang } from '@/i18n/config'
import { fmt, getDictionary } from '@/i18n'
import { START_QUERY, pathOf, sectionId } from '@/i18n/routes'
import { estimatorTexts } from '@/i18n/slices'
import { formatEuros } from '@/lib/pricing'

export function Pricing({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang)
  const t = dict.pricing
  const euros = (cents: number) => formatEuros(cents, lang)
  return (
    <section id={sectionId(lang, 'pricing')} aria-labelledby="pricing-title" className="bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <h2 id="pricing-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.intro}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {TIERS.map((tier) => {
            const text = dict.tiers[tier.id]
            return (
              <article key={tier.id} className="flex flex-col rounded-xl border border-border bg-white p-6 md:p-8" aria-labelledby={`tier-${tier.id}`}>
                <h3 id={`tier-${tier.id}`} className="text-xl font-bold">
                  {text.name}
                </h3>
                <p className="mt-1 text-muted-foreground">{text.summary}</p>
                <p className="mt-6">
                  <span className="text-4xl font-bold text-primary">{euros(tier.monthlyFlatCents)}</span>{' '}
                  <span className="text-muted-foreground">{t.perMonth}</span>
                </p>
                <p className="mt-1 font-medium">{fmt(t.perAircraft, { price: euros(tier.monthlyPerAircraftCents) })}</p>
                <p className="mt-1 text-sm text-muted-foreground">{fmt(t.yearly, { months: OFFER.monthsBilledPerYear })}</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {text.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="mt-8">
                  <Link href={`${pathOf(lang, 'start')}?${START_QUERY[lang].tier}=${tier.id}`}>{fmt(t.choose, { tier: text.name })}</Link>
                </Button>
              </article>
            )
          })}
        </div>

        <ul className="mt-6 space-y-1 text-sm text-muted-foreground">
          <li>{t.vatMention}</li>
          {OFFER.trialDays > 0 && <li>{fmt(t.trial, { days: OFFER.trialDays })}</li>}
          <li>{t.renewal}</li>
        </ul>

        <Estimator lang={lang} texts={estimatorTexts(lang, dict)} />
      </div>
    </section>
  )
}
