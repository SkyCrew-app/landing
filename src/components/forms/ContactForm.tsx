'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FormMessage, FormTextsProvider, Honeypot, TextAreaField, TextField, usePost } from '@/components/forms/fields'
import type { Lang } from '@/i18n/config'
import type { ContactFormTexts } from '@/i18n/slices'
import { buildSchemas, fieldErrors } from '@/lib/schemas'

const EMPTY = { name: '', email: '', clubName: '', message: '' }

export function ContactForm({ lang, texts, privacyHref }: { lang: Lang; texts: ContactFormTexts; privacyHref: string }) {
  const t = texts.form
  const schema = useMemo(() => buildSchemas(texts.validation).contact, [texts.validation])
  const [values, setValues] = useState(EMPTY)
  const [trap, setTrap] = useState('')
  const { state, setState, errors, setErrors, post } = usePost(texts.forms, lang)
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status === 'success' || state.status === 'error') messageRef.current?.focus()
  }, [state.status])

  const set = (key: keyof typeof EMPTY) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: event.target.value }))

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const checked = schema.safeParse(values)
    if (!checked.success) {
      setErrors(fieldErrors(checked.error))
      setState({ status: 'error', message: texts.forms.fixFields })
      return
    }
    const result = await post('/api/contact', { ...checked.data, website: trap })
    if (result?.ok) setValues(EMPTY)
  }

  if (state.status === 'success') {
    return (
      <div ref={messageRef} tabIndex={-1}>
        <FormMessage kind="success">
          <p className="font-semibold">{t.sentTitle}</p>
          <p className="mt-1">{t.sentText}</p>
          <button type="button" className="mt-3 font-medium text-primary underline" onClick={() => setState({ status: 'idle' })}>
            {t.another}
          </button>
        </FormMessage>
      </div>
    )
  }

  return (
    <FormTextsProvider value={texts.forms}>
      <form onSubmit={onSubmit} noValidate className="relative space-y-5" aria-label={t.label}>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField id="contact-name" label={t.name} required autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} />
          <TextField id="contact-email" label={t.email} type="email" required autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} />
        </div>
        <TextField id="contact-club" label={t.club} autoComplete="organization" value={values.clubName} onChange={set('clubName')} error={errors.clubName} />
        <TextAreaField id="contact-message" label={t.message} required rows={5} value={values.message} onChange={set('message')} error={errors.message} />
        <Honeypot value={trap} onChange={setTrap} />
        <p className="text-xs text-muted-foreground">
          {t.privacyBefore}{' '}
          <Link href={privacyHref} className="text-primary underline">
            {t.privacyLink}
          </Link>
          .
        </p>
        {state.status === 'error' && (
          <div ref={messageRef} tabIndex={-1}>
            <FormMessage kind="error">{state.message}</FormMessage>
          </div>
        )}
        <Button type="submit" size="lg" disabled={state.status === 'sending'} className="w-full sm:w-auto">
          {state.status === 'sending' ? texts.forms.sending : t.submit}
        </Button>
      </form>
    </FormTextsProvider>
  )
}
