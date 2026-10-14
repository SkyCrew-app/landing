import type { Metadata } from 'next'
import { SignupForm } from '@/components/forms/SignupForm'
import { OFFER, getTier, type BillingCycle, type TierId } from '@/config/offer'
import { normalizeAircraft } from '@/lib/pricing'
import { isStripeEnabled } from '@/lib/stripe'

// Read at each request: the page shows the payment only while Stripe is configured on the server.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Équiper mon club',
  description: 'Choisissez l’offre SkyCrew et le nombre d’avions de votre aéroclub.',
  alternates: { canonical: '/commencer' },
}

type Search = Promise<Record<string, string | string[] | undefined>>

export default async function Commencer({ searchParams }: { searchParams: Search }) {
  const params = await searchParams
  const one = (key: string) => (Array.isArray(params[key]) ? params[key]?.[0] : params[key])
  const stripeEnabled = isStripeEnabled()
  const tier: TierId = getTier(one('offre') ?? '')?.id ?? 'club'
  const cycle: BillingCycle = one('cycle') === 'yearly' ? 'yearly' : 'monthly'
  const max = stripeEnabled ? OFFER.maxAircraftOnline : 500
  const aircraft = Math.min(max, normalizeAircraft(Number(one('avions') ?? 1)))

  return (
    <div className="bg-secondary py-12 md:py-16">
      <div className="container">
        <h1 className="text-balance text-3xl font-bold text-primary md:text-4xl">
          {stripeEnabled ? 'Équiper mon club' : 'Demander la mise en place'}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {stripeEnabled
            ? 'Choisissez votre offre, indiquez les coordonnées du club, puis réglez l’abonnement sur la page de paiement de Stripe.'
            : 'Choisissez votre offre et laissez-nous vos coordonnées : nous vous recontactons pour créer l’espace de votre club.'}
        </p>
        <div className="mt-10 rounded-xl border border-border bg-white p-6 md:p-8">
          <SignupForm stripeEnabled={stripeEnabled} initial={{ tier, cycle, aircraft }} />
        </div>
      </div>
    </div>
  )
}
