import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Estimator } from '@/components/home/Estimator'
import { OFFER, TIERS } from '@/config/offer'
import { formatEuros } from '@/lib/pricing'

export function Pricing() {
  return (
    <section id="tarifs" aria-labelledby="pricing-title" className="bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <h2 id="pricing-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Tarifs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un forfait mensuel pour le club, plus un montant par avion. Le nombre de membres n’entre pas dans le prix.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {TIERS.map((tier) => (
            <article key={tier.id} className="flex flex-col rounded-xl border border-border bg-white p-6 md:p-8" aria-labelledby={`tier-${tier.id}`}>
              <h3 id={`tier-${tier.id}`} className="text-xl font-bold">
                {tier.name}
              </h3>
              <p className="mt-1 text-muted-foreground">{tier.summary}</p>
              <p className="mt-6">
                <span className="text-4xl font-bold text-primary">{formatEuros(tier.monthlyFlatCents)}</span>{' '}
                <span className="text-muted-foreground">HT / mois</span>
              </p>
              <p className="mt-1 font-medium">+ {formatEuros(tier.monthlyPerAircraftCents)} HT par avion et par mois</p>
              <p className="mt-1 text-sm text-muted-foreground">
                À l’année : {OFFER.monthsBilledPerYear} mois facturés au lieu de 12.
              </p>
              <ul className="mt-6 flex-1 space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8">
                <Link href={`/commencer?offre=${tier.id}`}>Choisir l’offre {tier.name}</Link>
              </Button>
            </article>
          ))}
        </div>

        <ul className="mt-6 space-y-1 text-sm text-muted-foreground">
          <li>{OFFER.vatMention}</li>
          {OFFER.trialDays > 0 && (
            <li>
              Souscription en ligne : {OFFER.trialDays} jours d’essai gratuit, rien n’est prélevé avant la fin de l’essai.
            </li>
          )}
          <li>Abonnement mensuel ou annuel, renouvelé automatiquement, résiliable pour la fin de la période en cours.</li>
        </ul>

        <Estimator />
      </div>
    </section>
  )
}
