import {
  BadgeCheck,
  BookOpenCheck,
  Bell,
  ClipboardCheck,
  History,
  Languages,
  LineChart,
  Newspaper,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { Screenshot } from '@/components/Screenshot'
import type { Lang } from '@/i18n/config'
import { getDictionary, type Dictionary } from '@/i18n'
import { sectionId } from '@/i18n/routes'
import { screensFor, type ScreenName } from '@/lib/screens'
import { cn } from '@/lib/utils'

type BlockKey = keyof Dictionary['features']['blocks']
type ExtraKey = keyof Dictionary['features']['extras']

/** Order of the feature blocks and their captures; the texts are in the dictionaries. */
const BLOCKS: { key: BlockKey; shots: ScreenName[]; schoolTier?: boolean }[] = [
  { key: 'bookings', shots: ['reservationPrix', 'compteFactures'] },
  { key: 'rules', shots: ['calendrier'] },
  { key: 'flightPlans', shots: ['planDeVol', 'planDeVolNavigation'] },
  { key: 'fleet', shots: ['maintenance', 'incidents'] },
  { key: 'admin', shots: ['finances'] },
  { key: 'training', shots: ['instructionCours'], schoolTier: true },
]

const EXTRAS: { key: ExtraKey; icon: LucideIcon }[] = [
  { key: 'licences', icon: BadgeCheck },
  { key: 'checklists', icon: ClipboardCheck },
  { key: 'finance', icon: LineChart },
  { key: 'actionLog', icon: History },
  { key: 'notifications', icon: Bell },
  { key: 'news', icon: Newspaper },
  { key: 'twoFactor', icon: ShieldCheck },
  { key: 'languages', icon: Languages },
  { key: 'phone', icon: Smartphone },
  { key: 'roles', icon: BookOpenCheck },
]

export function Features({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).features
  const screens = screensFor(lang)
  return (
    <section id={sectionId(lang, 'features')} aria-labelledby="features-title" className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <h2 id="features-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.intro}</p>
        </div>

        <div className="mt-14 space-y-20 md:space-y-28">
          {BLOCKS.map((layout, index) => {
            const block = t.blocks[layout.key]
            return (
              <article key={layout.key} id={block.id} className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
                <div className={cn(index % 2 === 1 && 'lg:order-2')}>
                  {layout.schoolTier && (
                    <p className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{t.tierBadge}</p>
                  )}
                  <h3 className="text-balance text-xl font-bold text-foreground sm:text-2xl">{block.title}</h3>
                  <p className="mt-3 text-muted-foreground">{block.intro}</p>
                  <ul className="mt-5 space-y-3">
                    {block.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-5">
                  {layout.shots.map((shot, shotIndex) => (
                    <Screenshot key={shot} src={screens[shot]} alt={block.shots[shotIndex]} />
                  ))}
                </div>
              </article>
            )
          })}
        </div>

        <h3 className="mt-24 text-xl font-bold sm:text-2xl">{t.extrasTitle}</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXTRAS.map(({ key, icon: Icon }) => (
            <li key={key} className="rounded-lg border border-border bg-white p-5">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mt-3 font-semibold">{t.extras[key].title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.extras[key].text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
