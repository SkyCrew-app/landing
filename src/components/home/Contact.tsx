import { ContactForm } from '@/components/forms/ContactForm'
import { LEGAL, isPlaceholder } from '@/config/legal'

export function Contact() {
  const email = isPlaceholder(LEGAL.contactEmail) ? null : LEGAL.contactEmail
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-secondary py-16 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 id="contact-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Une question ?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sur les fonctions, la mise en place ou les tarifs : écrivez-nous, nous répondons par e-mail.
          </p>
          {email && (
            <p className="mt-4">
              Ou directement à{' '}
              <a className="font-medium text-primary underline" href={`mailto:${email}`}>
                {email}
              </a>
              .
            </p>
          )}
        </div>
        <div className="rounded-xl border border-border bg-white p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
