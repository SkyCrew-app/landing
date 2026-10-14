'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FormMessage, Honeypot, TextAreaField, TextField, usePost } from '@/components/forms/fields'
import { contactSchema, fieldErrors } from '@/lib/schemas'

const EMPTY = { name: '', email: '', clubName: '', message: '' }

export function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [trap, setTrap] = useState('')
  const { state, setState, errors, setErrors, post } = usePost()
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status === 'success' || state.status === 'error') messageRef.current?.focus()
  }, [state.status])

  const set = (key: keyof typeof EMPTY) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: event.target.value }))

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const checked = contactSchema.safeParse(values)
    if (!checked.success) {
      setErrors(fieldErrors(checked.error))
      setState({ status: 'error', message: 'Certains champs sont à corriger.' })
      return
    }
    const result = await post('/api/contact', { ...checked.data, website: trap })
    if (result?.ok) setValues(EMPTY)
  }

  if (state.status === 'success') {
    return (
      <div ref={messageRef} tabIndex={-1}>
        <FormMessage kind="success">
          <p className="font-semibold">Message envoyé.</p>
          <p className="mt-1">Merci, nous vous répondons par e-mail.</p>
          <button type="button" className="mt-3 font-medium text-primary underline" onClick={() => setState({ status: 'idle' })}>
            Envoyer un autre message
          </button>
        </FormMessage>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5" aria-label="Formulaire de contact">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="contact-name" label="Votre nom" required autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} />
        <TextField id="contact-email" label="Adresse e-mail" type="email" required autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} />
      </div>
      <TextField id="contact-club" label="Nom du club" autoComplete="organization" value={values.clubName} onChange={set('clubName')} error={errors.clubName} />
      <TextAreaField id="contact-message" label="Message" required rows={5} value={values.message} onChange={set('message')} error={errors.message} />
      <Honeypot value={trap} onChange={setTrap} />
      <p className="text-xs text-muted-foreground">
        Votre message et vos coordonnées servent uniquement à vous répondre. Voir la{' '}
        <Link href="/confidentialite" className="text-primary underline">
          politique de confidentialité
        </Link>
        .
      </p>
      {state.status === 'error' && (
        <div ref={messageRef} tabIndex={-1}>
          <FormMessage kind="error">{state.message}</FormMessage>
        </div>
      )}
      <Button type="submit" size="lg" disabled={state.status === 'sending'} className="w-full sm:w-auto">
        {state.status === 'sending' ? 'Envoi…' : 'Envoyer le message'}
      </Button>
    </form>
  )
}
