import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OFFER, getTier } from '@/config/offer'
import type { Lang } from '@/i18n/config'
import { fmt, getDictionary } from '@/i18n'
import { pathOf, sectionHref } from '@/i18n/routes'
import { getStripe } from '@/lib/stripe'
import type { SearchParams } from '@/components/pages/StartPage'

/** Return page after Stripe Checkout. Shows what Stripe confirms, nothing taken from the URL. */
export async function ThanksPage({ lang, searchParams }: { lang: Lang; searchParams: SearchParams }) {
  const params = await searchParams
  const dict = getDictionary(lang)
  const t = dict.thanks
  const sessionId = typeof params.session_id === 'string' ? params.session_id : null
  let summary: { club?: string; tier?: string; email?: string } | null = null
  let complete = false

  const stripe = getStripe()
  if (stripe && sessionId && /^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      complete = session.status === 'complete'
      const tier = getTier(session.metadata?.tier ?? '')
      summary = {
        club: session.metadata?.club_name,
        tier: tier ? dict.tiers[tier.id].name : undefined,
        email: session.customer_details?.email ?? session.customer_email ?? undefined,
      }
    } catch {
      summary = null
    }
  }

  return (
    <div className="container max-w-2xl py-16 md:py-24">
      {complete ? (
        <>
          <CheckCircle2 className="h-12 w-12 text-success" aria-hidden="true" />
          <h1 className="mt-4 text-3xl font-bold text-primary">{t.title}</h1>
          {summary && (
            <p className="mt-4 text-lg">
              {summary.club ? <>{t.club} <strong>{summary.club}</strong>. </> : null}
              {summary.tier ? <>{t.tier} <strong>{summary.tier}</strong>.</> : null}
            </p>
          )}
          <ul className="mt-6 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              {t.access}
              {summary?.email ? <> {t.accessTo} <strong className="text-foreground">{summary.email}</strong></> : null}.
            </li>
            <li>{t.receipts}</li>
            {OFFER.trialDays > 0 && <li>{fmt(t.trial, { days: OFFER.trialDays })}</li>}
          </ul>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-primary">{t.pendingTitle}</h1>
          <p className="mt-4 text-muted-foreground">{t.pendingText}</p>
        </>
      )}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href={pathOf(lang, 'home')}>{dict.common.backHome}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={sectionHref(lang, 'contact')}>{t.writeUs}</Link>
        </Button>
      </div>
    </div>
  )
}
