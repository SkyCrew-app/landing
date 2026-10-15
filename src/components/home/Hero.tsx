import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Screenshot } from '@/components/Screenshot'
import type { Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { sectionHref } from '@/i18n/routes'
import { screensFor } from '@/lib/screens'

export function Hero({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).hero
  const screens = screensFor(lang)
  return (
    <section className="overflow-hidden bg-gradient-to-b from-secondary to-white" aria-labelledby="hero-title">
      <div className="container grid items-center gap-12 pb-4 pt-12 md:py-20 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{t.eyebrow}</p>
          <h1 id="hero-title" className="mt-3 text-balance text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{t.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={sectionHref(lang, 'pricing')}>{t.pricingCta}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={sectionHref(lang, 'features')}>{t.featuresCta}</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{t.note}</p>
        </div>

        <div className="relative sm:pb-10 sm:pr-16">
          <Screenshot src={screens.tableauDeBord} alt={t.dashboardAlt} priority sizes="(min-width: 1024px) 620px, 100vw" />
          <Screenshot
            phone
            src={screens.mobileCalendrier}
            alt={t.phoneAlt}
            className="absolute -bottom-2 right-0 hidden w-36 sm:block md:w-44"
            priority
            sizes="176px"
          />
        </div>
      </div>
    </section>
  )
}
