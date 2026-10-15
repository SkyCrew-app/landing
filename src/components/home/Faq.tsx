import Link from 'next/link'
import { OFFER } from '@/config/offer'
import type { Lang } from '@/i18n/config'
import { fmt, getDictionary } from '@/i18n'
import { pathOf, sectionId } from '@/i18n/routes'

export function Faq({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).faq
  const questions: { q: string; a: React.ReactNode }[] = [
    ...t.items,
    {
      q: t.stop.q,
      a: (
        <>
          {t.stop.a}{' '}
          <Link className="text-primary underline" href={pathOf(lang, 'terms')}>
            {t.stop.link}
          </Link>
          {t.stop.after}
        </>
      ),
    },
    {
      q: t.trial.q,
      a: OFFER.trialDays > 0 ? fmt(t.trial.withTrial, { days: OFFER.trialDays }) : t.trial.withoutTrial,
    },
  ]

  return (
    <section id={sectionId(lang, 'faq')} aria-labelledby="faq-title" className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <h2 id="faq-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
          {t.title}
        </h2>
        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-white">
          {questions.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm font-semibold">
                {item.q}
                <span className="text-xl leading-none text-primary transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="mt-3 text-muted-foreground">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
