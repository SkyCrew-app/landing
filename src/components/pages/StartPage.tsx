import { SignupForm } from '@/components/forms/SignupForm'
import { OFFER, getTier, type BillingCycle, type TierId } from '@/config/offer'
import type { Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { START_QUERY, pathOf } from '@/i18n/routes'
import { signupTexts } from '@/i18n/slices'
import { normalizeAircraft } from '@/lib/pricing'
import { isStripeEnabled } from '@/lib/stripe'

export type SearchParams = Promise<Record<string, string | string[] | undefined>>

/** Sign-up page (/commencer, /en/get-started), preset from the query string of the estimator. */
export async function StartPage({ lang, searchParams }: { lang: Lang; searchParams: SearchParams }) {
  const params = await searchParams
  const one = (key: string) => (Array.isArray(params[key]) ? params[key]?.[0] : params[key])
  const keys = START_QUERY[lang]
  const dict = getDictionary(lang)
  const t = dict.startPage
  const stripeEnabled = isStripeEnabled()
  const tier: TierId = getTier(one(keys.tier) ?? '')?.id ?? 'club'
  const cycle: BillingCycle = one(keys.cycle) === 'yearly' ? 'yearly' : 'monthly'
  const max = stripeEnabled ? OFFER.maxAircraftOnline : 500
  const aircraft = Math.min(max, normalizeAircraft(Number(one(keys.aircraft) ?? 1)))

  return (
    <div className="bg-secondary py-12 md:py-16">
      <div className="container">
        <h1 className="text-balance text-3xl font-bold text-primary md:text-4xl">
          {stripeEnabled ? t.titleCheckout : t.titleRequest}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{stripeEnabled ? t.introCheckout : t.introRequest}</p>
        <div className="mt-10 rounded-xl border border-border bg-white p-6 md:p-8">
          <SignupForm
            lang={lang}
            texts={signupTexts(lang, dict)}
            links={{ terms: pathOf(lang, 'terms'), privacy: pathOf(lang, 'privacy') }}
            stripeEnabled={stripeEnabled}
            initial={{ tier, cycle, aircraft }}
          />
        </div>
      </div>
    </div>
  )
}
