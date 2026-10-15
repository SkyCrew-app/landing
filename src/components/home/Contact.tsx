import { ContactForm } from '@/components/forms/ContactForm'
import { LEGAL, isPlaceholder } from '@/config/legal'
import type { Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pathOf, sectionId } from '@/i18n/routes'
import { contactFormTexts } from '@/i18n/slices'

export function Contact({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang)
  const t = dict.contact
  const email = isPlaceholder(LEGAL.contactEmail) ? null : LEGAL.contactEmail
  return (
    <section id={sectionId(lang, 'contact')} aria-labelledby="contact-title" className="bg-secondary py-16 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 id="contact-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.text}</p>
          {email && (
            <p className="mt-4">
              {t.direct}{' '}
              <a className="font-medium text-primary underline" href={`mailto:${email}`}>
                {email}
              </a>
              .
            </p>
          )}
        </div>
        <div className="rounded-xl border border-border bg-white p-6 md:p-8">
          <ContactForm lang={lang} texts={contactFormTexts(dict)} privacyHref={pathOf(lang, 'privacy')} />
        </div>
      </div>
    </section>
  )
}
