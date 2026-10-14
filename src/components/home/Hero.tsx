import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Screenshot } from '@/components/Screenshot'
import { SCREENS } from '@/lib/screens'

export function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-secondary to-white" aria-labelledby="hero-title">
      <div className="container grid items-center gap-12 pb-4 pt-12 md:py-20 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Logiciel de gestion d’aéroclub</p>
          <h1 id="hero-title" className="mt-3 text-balance text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Votre aéroclub en ligne, de la réservation au carnet de vol
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Les membres réservent un avion et le paient sur leur compte prépayé. Le club suit sa flotte, la maintenance,
            les licences et ses finances. Les instructeurs suivent leurs élèves. Sur ordinateur comme sur téléphone.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/#tarifs">Voir les tarifs</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#fonctionnalites">Découvrir les fonctionnalités</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">En français et en anglais. Captures prises dans l’application, avec des données de démonstration.</p>
        </div>

        <div className="relative sm:pb-10 sm:pr-16">
          <Screenshot
            src={SCREENS.tableauDeBord}
            alt="Tableau de bord d’un pilote : météo de l’aérodrome, prochaines réservations, vols récents et heures de vol"
            priority
            sizes="(min-width: 1024px) 620px, 100vw"
          />
          <Screenshot
            phone
            src={SCREENS.mobileCalendrier}
            alt="Calendrier des réservations sur téléphone : créneaux libres de chaque avion"
            className="absolute -bottom-2 right-0 hidden w-36 sm:block md:w-44"
            priority
            sizes="176px"
          />
        </div>
      </div>
    </section>
  )
}
