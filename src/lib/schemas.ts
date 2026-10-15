import { z } from 'zod'
import { OFFER, TIER_IDS } from '@/config/offer'
import { fmt } from '@/i18n/fmt'
import type { Dictionary } from '@/i18n'

/**
 * Validation shared by the forms (client) and the API routes (server). The messages come from the
 * `validation` part of a dictionary: the forms pass the slice of their page's language (so the
 * browser does not download every dictionary), the API routes use `schemasFor(lang)`
 * (src/lib/schemas-by-lang.ts).
 */

/** Hidden field: humans leave it empty, many bots fill it in. */
export const HONEYPOT_FIELD = 'website'

const MESSAGE_MAX = 5000

export function buildSchemas(t: Dictionary['validation']) {
  const trimmed = (min: number, max: number, label: string) =>
    z
      .string({ required_error: fmt(t.required, { label }), invalid_type_error: fmt(t.invalid, { label }) })
      .trim()
      .min(min, min <= 1 ? fmt(t.required, { label }) : fmt(t.min, { label, min }))
      .max(max, fmt(t.max, { label, max }))

  const email = z
    .string({ required_error: t.emailRequired, invalid_type_error: t.emailInvalid })
    .trim()
    .max(254, t.emailTooLong)
    .email(t.emailInvalid)

  const phone = z
    .string()
    .trim()
    .max(30, t.phoneTooLong)
    .regex(/^[+0-9 ().-]*$/, t.phoneChars)
    .optional()
    .or(z.literal(''))

  const aircraft = (max: number) =>
    z.coerce
      .number({ invalid_type_error: t.aircraftNumber })
      .int(t.aircraftInteger)
      .min(OFFER.minAircraft, fmt(t.aircraftMin, { min: OFFER.minAircraft }))
      .max(max, fmt(t.aircraftMax, { max }))

  const tier = z.enum(TIER_IDS, { errorMap: () => ({ message: t.tier }) })
  const cycle = z.enum(['monthly', 'yearly'], { errorMap: () => ({ message: t.cycle }) })
  const message = z.string().trim().max(MESSAGE_MAX, fmt(t.messageTooLong, { max: MESSAGE_MAX })).optional().or(z.literal(''))

  const contact = z.object({
    name: trimmed(2, 100, t.labels.name),
    email,
    clubName: z.string().trim().max(120, t.clubNameTooLong).optional().or(z.literal('')),
    message: trimmed(10, MESSAGE_MAX, t.labels.message),
  })

  const setupRequest = z.object({
    clubName: trimmed(2, 120, t.labels.clubName),
    contactName: trimmed(2, 100, t.labels.contactName),
    email,
    phone,
    aircraft: aircraft(500),
    tier,
    cycle,
    message,
    consent: z.literal(true, { errorMap: () => ({ message: t.consent }) }),
  })

  const checkout = z.object({
    clubName: trimmed(2, 120, t.labels.clubName),
    contactName: trimmed(2, 100, t.labels.contactName),
    email,
    phone,
    aircraft: aircraft(OFFER.maxAircraftOnline),
    tier,
    cycle,
    acceptCgv: z.literal(true, { errorMap: () => ({ message: t.acceptCgv }) }),
  })

  return { contact, setupRequest, checkout }
}

export type Schemas = ReturnType<typeof buildSchemas>

export type ContactInput = z.infer<Schemas['contact']>
export type SetupRequestInput = z.infer<Schemas['setupRequest']>
export type CheckoutInput = z.infer<Schemas['checkout']>

/** First error message of each field, for display next to the field. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    if (!out[key]) out[key] = issue.message
  }
  return out
}
