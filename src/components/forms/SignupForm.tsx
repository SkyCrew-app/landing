'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CheckboxField, FormMessage, Honeypot, TextAreaField, TextField, usePost } from '@/components/forms/fields'
import { OfferControls, PriceSummary, type OfferChoice } from '@/components/offer/OfferControls'
import { OFFER } from '@/config/offer'
import { checkoutSchema, fieldErrors, setupRequestSchema } from '@/lib/schemas'

type Mode = 'checkout' | 'request'

/**
 * Sign-up of a club. With Stripe configured: details, then Stripe Checkout (Stripe collects the
 * card, never this site). Without: a request sent to the owner, who sets the club up by hand.
 */
export function SignupForm({ stripeEnabled, initial }: { stripeEnabled: boolean; initial: OfferChoice }) {
  const [mode, setMode] = useState<Mode>(stripeEnabled ? 'checkout' : 'request')
  const [offer, setOffer] = useState<OfferChoice>(initial)
  const [contact, setContact] = useState({ clubName: '', contactName: '', email: '', phone: '', message: '' })
  const [acceptCgv, setAcceptCgv] = useState(false)
  const [consent, setConsent] = useState(false)
  const [trap, setTrap] = useState('')
  const [switched, setSwitched] = useState(false)
  const { state, setState, errors, setErrors, post } = usePost()
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
      const checked = checkoutSchema.safeParse(payload)
      if (!checked.success) {
        setErrors(fieldErrors(checked.error))
        setState({ status: 'error', message: 'Certains champs sont à corriger.' })
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
    const checked = setupRequestSchema.safeParse(payload)
    if (!checked.success) {
      setErrors(fieldErrors(checked.error))
      setState({ status: 'error', message: 'Certains champs sont à corriger.' })
      return
    }
    await post('/api/request', { ...checked.data, website: trap })
  }

  if (mode === 'request' && state.status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1}>
        <FormMessage kind="success">
          <p className="font-semibold">Demande envoyée.</p>
          <p className="mt-1">
            Merci. Nous vous recontactons à l’adresse {contact.email} pour préparer l’espace de votre club. Rien ne vous a été
            facturé.
          </p>
        </FormMessage>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr]" aria-label={mode === 'checkout' ? 'Souscription' : 'Demande de mise en place'}>
      <div className="space-y-10">
        {switched && (
          <FormMessage kind="error">
            Le paiement en ligne n’est pas disponible pour le moment. Envoyez-nous votre demande : nous vous recontactons pour
            la mise en place.
          </FormMessage>
        )}

        <section aria-labelledby="signup-offer">
          <h2 id="signup-offer" className="mb-5 text-xl font-bold">
            1. Votre offre
          </h2>
          <OfferControls value={offer} onChange={setOffer} maxAircraft={maxAircraft} errors={errors} />
        </section>

        <section aria-labelledby="signup-club" className="space-y-5">
          <h2 id="signup-club" className="text-xl font-bold">
            2. Votre club
          </h2>
          <TextField id="clubName" label="Nom du club" required autoComplete="organization" value={contact.clubName} onChange={set('clubName')} error={errors.clubName} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="contactName" label="Votre nom" required autoComplete="name" value={contact.contactName} onChange={set('contactName')} error={errors.contactName} />
            <TextField id="phone" label="Téléphone" type="tel" autoComplete="tel" value={contact.phone} onChange={set('phone')} error={errors.phone} />
          </div>
          <TextField
            id="email"
            label="Adresse e-mail"
            type="email"
            required
            autoComplete="email"
            value={contact.email}
            onChange={set('email')}
            error={errors.email}
            hint={mode === 'checkout' ? 'Les factures et l’accès du premier administrateur y seront envoyés.' : 'Nous vous recontactons à cette adresse.'}
          />
          {mode === 'request' && (
            <TextAreaField
              id="message"
              label="Message"
              rows={4}
              value={contact.message}
              onChange={set('message')}
              error={errors.message}
              hint="Ce que vous voulez nous dire : date souhaitée, questions…"
            />
          )}
        </section>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start" aria-label="Récapitulatif">
        <PriceSummary value={offer} />

        {mode === 'checkout' ? (
          <>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {OFFER.trialDays > 0 && <li>{OFFER.trialDays} jours d’essai : rien n’est prélevé avant la fin de l’essai.</li>}
              <li>Renouvellement automatique, résiliable pour la fin de la période en cours.</li>
              <li>Après le paiement, nous créons l’espace de votre club et vous envoyons l’accès du premier administrateur.</li>
            </ul>
            <CheckboxField id="acceptCgv" checked={acceptCgv} onChange={setAcceptCgv} error={errors.acceptCgv}>
              J’accepte les{' '}
              <Link href="/cgv" target="_blank" className="font-medium text-primary underline">
                conditions générales de vente
              </Link>{' '}
              (nouvel onglet), au nom du club que je représente.
            </CheckboxField>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Le paiement en ligne n’est pas encore ouvert : cette demande nous est transmise, nous vous recontactons pour
              la mise en place et la facturation. Rien n’est facturé à cette étape.
            </p>
            <CheckboxField id="consent" checked={consent} onChange={setConsent} error={errors.consent}>
              J’accepte que SkyCrew utilise ces informations pour me recontacter au sujet de cette demande (voir la{' '}
              <Link href="/confidentialite" target="_blank" className="font-medium text-primary underline">
                politique de confidentialité
              </Link>
              , nouvel onglet).
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
              {state.status === 'sending' ? 'Redirection vers le paiement…' : 'Continuer vers le paiement'}
            </>
          ) : state.status === 'sending' ? (
            'Envoi…'
          ) : (
            'Demander la mise en place'
          )}
        </Button>
        {mode === 'checkout' && (
          <p className="text-xs text-muted-foreground">
            Le paiement se fait sur la page sécurisée de Stripe. Votre numéro de carte n’est jamais transmis à SkyCrew.
          </p>
        )}
      </aside>
    </form>
  )
}
