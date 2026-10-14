import { z } from 'zod'
import { OFFER, TIER_IDS } from '@/config/offer'

/** Validation shared by the forms (client) and the API routes (server). */

const trimmed = (min: number, max: number, label: string) =>
  z
    .string({ required_error: `${label} est obligatoire.`, invalid_type_error: `${label} est invalide.` })
    .trim()
    .min(min, min <= 1 ? `${label} est obligatoire.` : `${label} doit contenir au moins ${min} caractères.`)
    .max(max, `${label} ne doit pas dépasser ${max} caractères.`)

const email = z
  .string({ required_error: 'L’adresse e-mail est obligatoire.' })
  .trim()
  .max(254, 'L’adresse e-mail est trop longue.')
  .email('Saisissez une adresse e-mail valide.')

const phone = z
  .string()
  .trim()
  .max(30, 'Le numéro de téléphone est trop long.')
  .regex(/^[+0-9 ().-]*$/, 'Le numéro de téléphone ne doit contenir que des chiffres, espaces et + . - ( ).')
  .optional()
  .or(z.literal(''))

const aircraft = (max: number) =>
  z.coerce
    .number({ invalid_type_error: 'Indiquez un nombre d’avions.' })
    .int('Indiquez un nombre entier d’avions.')
    .min(OFFER.minAircraft, `Au moins ${OFFER.minAircraft} avion.`)
    .max(max, `Au-delà de ${max} avions, écrivez-nous.`)

const tier = z.enum(TIER_IDS, { errorMap: () => ({ message: 'Choisissez une offre.' }) })
const cycle = z.enum(['monthly', 'yearly'], { errorMap: () => ({ message: 'Choisissez mensuel ou annuel.' }) })

/** Hidden field: humans leave it empty, many bots fill it in. */
export const HONEYPOT_FIELD = 'website'

export const contactSchema = z.object({
  name: trimmed(2, 100, 'Le nom'),
  email,
  clubName: z.string().trim().max(120, 'Le nom du club est trop long.').optional().or(z.literal('')),
  message: trimmed(10, 5000, 'Le message'),
})

export const setupRequestSchema = z.object({
  clubName: trimmed(2, 120, 'Le nom du club'),
  contactName: trimmed(2, 100, 'Le nom du contact'),
  email,
  phone,
  aircraft: aircraft(500),
  tier,
  cycle,
  message: z.string().trim().max(5000, 'Le message ne doit pas dépasser 5000 caractères.').optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Cochez la case pour que nous puissions vous recontacter.' }),
  }),
})

export const checkoutSchema = z.object({
  clubName: trimmed(2, 120, 'Le nom du club'),
  contactName: trimmed(2, 100, 'Le nom du contact'),
  email,
  phone,
  aircraft: aircraft(OFFER.maxAircraftOnline),
  tier,
  cycle,
  acceptCgv: z.literal(true, {
    errorMap: () => ({ message: 'Acceptez les conditions générales de vente pour continuer.' }),
  }),
})

export type ContactInput = z.infer<typeof contactSchema>
export type SetupRequestInput = z.infer<typeof setupRequestSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>

/** First error message of each field, for display next to the field. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    if (!out[key]) out[key] = issue.message
  }
  return out
}
