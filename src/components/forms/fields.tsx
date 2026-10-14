'use client'

import { useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { HONEYPOT_FIELD } from '@/lib/schemas'

type Common = {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
}

function describedBy(id: string, error?: string, hint?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
}

function FieldText({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      )}
    </>
  )
}

function LabelText({ label, required }: { label: string; required?: boolean }) {
  return (
    <>
      {label}
      {required ? (
        <span className="text-destructive" aria-hidden="true">
          {' '}
          *
        </span>
      ) : (
        <span className="font-normal text-muted-foreground"> (facultatif)</span>
      )}
    </>
  )
}

export function TextField({
  id,
  label,
  error,
  hint,
  required,
  ...input
}: Common & Omit<React.ComponentProps<'input'>, 'id'>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        <LabelText label={label} required={required} />
      </label>
      <Input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...input}
      />
      <FieldText id={id} error={error} hint={hint} />
    </div>
  )
}

export function TextAreaField({
  id,
  label,
  error,
  hint,
  required,
  ...input
}: Common & Omit<React.ComponentProps<'textarea'>, 'id'>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        <LabelText label={label} required={required} />
      </label>
      <Textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...input}
      />
      <FieldText id={id} error={error} hint={hint} />
    </div>
  )
}

export function CheckboxField({
  id,
  children,
  error,
  checked,
  onChange,
}: {
  id: string
  children: React.ReactNode
  error?: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[hsl(var(--primary))]"
        />
        <label htmlFor={id} className="text-sm">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

/** Field hidden from people (and from assistive technologies); bots tend to fill it in. */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
      <label>
        Site web
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  )
}

export function FormMessage({ kind, children, id }: { kind: 'success' | 'error'; children: React.ReactNode; id?: string }) {
  const Icon = kind === 'success' ? CheckCircle2 : AlertCircle
  return (
    <div
      id={id}
      role={kind === 'error' ? 'alert' : 'status'}
      tabIndex={-1}
      className={
        kind === 'success'
          ? 'flex gap-3 rounded-lg border border-success/40 bg-success/10 p-4 text-sm text-foreground'
          : 'flex gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground'
      }
    >
      <Icon className={kind === 'success' ? 'h-5 w-5 shrink-0 text-success' : 'h-5 w-5 shrink-0 text-destructive'} aria-hidden="true" />
      <div>{children}</div>
    </div>
  )
}

export type SendState =
  | { status: 'idle' | 'sending' | 'success' }
  | { status: 'error'; message: string; code?: string }

export interface PostResult {
  ok: boolean
  status: number
  data: Record<string, unknown>
}

/** POSTs JSON and keeps track of the request state and of the per-field errors returned by the server. */
export function usePost() {
  const [state, setState] = useState<SendState>({ status: 'idle' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function post(url: string, payload: unknown): Promise<PostResult | null> {
    setState({ status: 'sending' })
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await response.json().catch(() => ({}))) as Record<string, unknown>
      if (response.ok && data.ok) {
        setErrors({})
        setState({ status: 'success' })
        return { ok: true, status: response.status, data }
      }
      setErrors((data.errors as Record<string, string>) ?? {})
      setState({
        status: 'error',
        message: typeof data.message === 'string' ? data.message : 'L’envoi a échoué. Réessayez dans quelques minutes.',
        code: typeof data.code === 'string' ? data.code : undefined,
      })
      return { ok: false, status: response.status, data }
    } catch {
      setState({ status: 'error', message: 'Connexion impossible. Vérifiez votre accès à Internet et réessayez.' })
      return null
    }
  }

  return { state, setState, errors, setErrors, post }
}
