import { Screenshot } from '@/components/Screenshot'
import type { Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { screensFor, type ScreenName } from '@/lib/screens'

const PHONES: { key: 'dashboard' | 'calendar' | 'account' | 'flightPlan'; screen: ScreenName }[] = [
  { key: 'dashboard', screen: 'mobileTableauDeBord' },
  { key: 'calendar', screen: 'mobileCalendrier' },
  { key: 'account', screen: 'mobileCompte' },
  { key: 'flightPlan', screen: 'mobilePlanDeVol' },
]

export function Mobile({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).mobile
  const screens = screensFor(lang)
  return (
    <section aria-labelledby="mobile-title" className="bg-secondary py-16 md:py-24">
      <div className="container">
        <h2 id="mobile-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t.text}</p>
        <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {PHONES.map(({ key, screen }) => (
            <li key={key} className="mx-auto w-full max-w-[220px]">
              <Screenshot phone src={screens[screen]} alt={t.phones[key].alt} sizes="(min-width: 768px) 220px, 45vw" />
              <p className="mt-3 text-center text-sm font-medium">{t.phones[key].caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
