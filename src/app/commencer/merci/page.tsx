import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OFFER, getTier } from '@/config/offer'
import { getStripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Abonnement enregistré',
  robots: { index: false },
}

type Search = Promise<Record<string, string | string[] | undefined>>

/** Return page after Stripe Checkout. Shows what Stripe confirms, nothing taken from the URL. */
export default async function Merci({ searchParams }: { searchParams: Search }) {
  const params = await searchParams
  const sessionId = typeof params.session_id === 'string' ? params.session_id : null
  let summary: { club?: string; tier?: string; email?: string } | null = null
  let complete = false

  const stripe = getStripe()
  if (stripe && sessionId && /^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      complete = session.status === 'complete'
      summary = {
        club: session.metadata?.club_name,
        tier: getTier(session.metadata?.tier ?? '')?.name,
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
          <h1 className="mt-4 text-3xl font-bold text-primary">Merci, votre abonnement est enregistré</h1>
          {summary && (
            <p className="mt-4 text-lg">
              {summary.club ? <>Club : <strong>{summary.club}</strong>. </> : null}
              {summary.tier ? <>Offre : <strong>{summary.tier}</strong>.</> : null}
            </p>
          )}
          <ul className="mt-6 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              Nous créons l’espace de votre club et envoyons l’accès du premier administrateur
              {summary?.email ? <> à <strong className="text-foreground">{summary.email}</strong></> : null}.
            </li>
            <li>Stripe vous envoie le reçu et les factures par e-mail.</li>
            {OFFER.trialDays > 0 && <li>Rien n’est prélevé pendant les {OFFER.trialDays} jours d’essai.</li>}
          </ul>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-primary">Paiement en cours de vérification</h1>
          <p className="mt-4 text-muted-foreground">
            Nous n’avons pas pu confirmer ce paiement depuis cette page. Si vous avez reçu le reçu de Stripe par e-mail,
            votre abonnement est bien enregistré et nous vous recontactons. Sinon, écrivez-nous.
          </p>
        </>
      )}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">Retour à l’accueil</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/#contact">Nous écrire</Link>
        </Button>
      </div>
    </div>
  )
}
