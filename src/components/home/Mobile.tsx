import { Screenshot } from '@/components/Screenshot'
import { SCREENS } from '@/lib/screens'

const PHONES = [
  { src: SCREENS.mobileTableauDeBord, alt: 'Tableau de bord sur téléphone : météo et actions rapides', caption: 'Tableau de bord' },
  { src: SCREENS.mobileCalendrier, alt: 'Créneaux libres de chaque avion sur téléphone', caption: 'Créneaux libres' },
  { src: SCREENS.mobileCompte, alt: 'Solde du compte et recharge sur téléphone', caption: 'Solde et recharge' },
  { src: SCREENS.mobilePlanDeVol, alt: 'Plan de vol sur téléphone : départ, arrivée, météo et carburant', caption: 'Plan de vol' },
]

export function Mobile() {
  return (
    <section aria-labelledby="mobile-title" className="bg-secondary py-16 md:py-24">
      <div className="container">
        <h2 id="mobile-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl">
          Au club comme au parking avion, sur téléphone
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Sur téléphone, le calendrier présente les créneaux libres de chaque avion. Les membres réservent, rechargent
          leur solde, consultent leur plan de vol et cochent leur checklist depuis leur poche.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {PHONES.map((phone) => (
            <li key={phone.caption} className="mx-auto w-full max-w-[220px]">
              <Screenshot phone src={phone.src} alt={phone.alt} sizes="(min-width: 768px) 220px, 45vw" />
              <p className="mt-3 text-center text-sm font-medium">{phone.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
