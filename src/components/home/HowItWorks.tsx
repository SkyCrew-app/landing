import type { Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { sectionId } from '@/i18n/routes'

export function HowItWorks({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).how
  return (
    <section id={sectionId(lang, 'how')} aria-labelledby="how-title" className="py-16 md:py-24">
      <div className="container">
        <h2 id="how-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
          {t.title}
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, index) => (
            <li key={step.title} className="relative rounded-lg border border-border bg-white p-6">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">{t.note}</p>
      </div>
    </section>
  )
}
