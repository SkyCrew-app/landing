'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CheckboxField, FormMessage, FormTextsProvider, Honeypot, TextAreaField, TextField, usePost } from '@/components/forms/fields'
import { OfferControls, PriceSummary, type OfferChoice } from '@/components/offer/OfferControls'
import { OFFER } from '@/config/offer'
import type { Lang } from '@/i18n/config'
import { fmt } from '@/i18n/fmt'
import type { SignupTexts } from '@/i18n/slices'
import { buildSchemas, fieldErrors } from '@/lib/schemas'

type Mode = 'checkout' | 'request'

/**
 * Sign-up of a club. With Stripe configured: details, then Stripe Checkout (Stripe collects the
 * card, never this site). Without: a request sent to the owner, who sets the club up by hand.
 */
export function SignupForm({
  lang,
  texts,
  links,
  stripeEnabled,
  initial,
}: {
  lang: Lang
  texts: SignupTexts
  /** Terms of sale and privacy pages, in the page's language. */
  links: { terms: string; privacy: string }
  stripeEnabled: boolean
  initial: OfferChoice
}) {
  const t = texts.signup
  const schemas = useMemo(() => buildSchemas(texts.validation), [texts.validation])
  const [mode, setMode] = useState<Mode>(stripeEnabled ? 'checkout' : 'request')
  const [offer, setOffer] = useState<OfferChoice>(initial)
  const [contact, setContact] = useState({ clubName: '', contactName: '', email: '', phone: '', message: '' })
  const [acceptCgv, setAcceptCgv] = useState(false)
  const [consent, setConsent] = useState(false)
  const [trap, setTrap] = useState('')
  const [switched, setSwitched] = useState(false)
  const { state, setState, errors, setErrors, post } = usePost(texts.forms, lang)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status === 'error' || state.status === 'success') statusRef.current?.focus()
  }, [state])

  const maxAircraft = mode === 'checkout' ? OFFER.maxAircraftOnline : 500
  const set = (key: keyof typeof contact) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setContact((c) => ({ ...c, [key]: event.target.value }))

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (mode === 'checkout') {
      const payload = { ...contact, ...offer, acceptCgv }
      const checked = schemas.checkout.safeParse(payload)
      if (!checked.success) {
        setErrors(fieldErrors(checked.error))
        setState({ status: 'error', message: texts.forms.fixFields })
        return
      }
      const result = await post('/api/checkout', { ...checked.data, website: trap })
      if (result?.ok && typeof result.data.url === 'string') {
        setState({ status: 'sending' })
        window.location.assign(result.data.url)
      } else if (result?.data.code === 'stripe_disabled') {
        // Payment was switched off on the server meanwhile: offer the request instead.
        setMode('request')
        setSwitched(true)
        setState({ status: 'idle' })
      }
      return
    }

    const payload = { ...contact, ...offer, consent }
    const checked = schemas.setupRequest.safeParse(payload)
    if (!checked.success) {
      setErrors(fieldErrors(checked.error))
      setState({ status: 'error', message: texts.forms.fixFields })
      return
    }
    await post('/api/request', { ...checked.data, website: trap })
  }

  if (mode === 'request' && state.status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1}>
        <FormMessage kind="success">
          <p className="font-semibold">{t.sentTitle}</p>
          <p className="mt-1">{fmt(t.sentText, { email: contact.email })}</p>
        </FormMessage>
      </div>
    )
  }

  return (
    <FormTextsProvider value={texts.forms}>
    <form onSubmit={onSubmit} noValidate className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr]" aria-label={mode === 'checkout' ? t.labelCheckout : t.labelRequest}>
      <div className="space-y-10">
        {switched && (
          <FormMessage kind="error">{t.switched}</FormMessage>
        )}

        <section aria-labelledby="signup-offer">
          <h2 id="signup-offer" className="mb-5 text-xl font-bold">
            {t.offerHeading}
          </h2>
          <OfferControls value={offer} onChange={setOffer} texts={texts.offer} maxAircraft={maxAircraft} errors={errors} />
        </section>

        <section aria-labelledby="signup-club" className="space-y-5">
          <h2 id="signup-club" className="text-xl font-bold">
            {t.clubHeading}
          </h2>
          <TextField id="clubName" label={t.clubName} required autoComplete="organization" value={contact.clubName} onChange={set('clubName')} error={errors.clubName} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="contactName" label={t.contactName} required autoComplete="name" value={contact.contactName} onChange={set('contactName')} error={errors.contactName} />
            <TextField id="phone" label={t.phone} type="tel" autoComplete="tel" value={contact.phone} onChange={set('phone')} error={errors.phone} />
          </div>
          <TextField
            id="email"
            label={t.email}
            type="email"
            required
            autoComplete="email"
            value={contact.email}
            onChange={set('email')}
            error={errors.email}
            hint={mode === 'checkout' ? t.emailHintCheckout : t.emailHintRequest}
          />
          {mode === 'request' && (
            <TextAreaField
              id="message"
              label={t.message}
              rows={4}
              value={contact.message}
              onChange={set('message')}
              error={errors.message}
              hint={t.messageHint}
            />
          )}
        </section>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start" aria-label={t.summary}>
        <PriceSummary value={offer} texts={texts.offer} />

        {mode === 'checkout' ? (
          <>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {OFFER.trialDays > 0 && <li>{fmt(t.trial, { days: OFFER.trialDays })}</li>}
              <li>{t.renewal}</li>
              <li>{t.afterPayment}</li>
            </ul>
            <CheckboxField id="acceptCgv" checked={acceptCgv} onChange={setAcceptCgv} error={errors.acceptCgv}>
              {t.acceptBefore}{' '}
              <Link href={links.terms} target="_blank" className="font-medium text-primary underline">
                {t.acceptLink}
              </Link>{' '}
              {t.acceptAfter}
            </CheckboxField>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">{t.requestNote}</p>
            <CheckboxField id="consent" checked={consent} onChange={setConsent} error={errors.consent}>
              {t.consentBefore}{' '}
              <Link href={links.privacy} target="_blank" className="font-medium text-primary underline">
                {t.consentLink}
              </Link>
              {t.consentAfter}
            </CheckboxField>
          </>
        )}

        <Honeypot value={trap} onChange={setTrap} />

        {state.status === 'error' && (
          <div ref={statusRef} tabIndex={-1}>
            <FormMessage kind="error">{state.message}</FormMessage>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={state.status === 'sending'}>
          {mode === 'checkout' ? (
            <>
              <Lock aria-hidden="true" />
              {state.status === 'sending' ? t.redirecting : t.toPayment}
            </>
          ) : state.status === 'sending' ? (
            texts.forms.sending
          ) : (
            t.request
          )}
        </Button>
        {mode === 'checkout' && (
          <p className="text-xs text-muted-foreground">{t.stripeNote}</p>
        )}
      </aside>
    </form>
    </FormTextsProvider>
  )
}
