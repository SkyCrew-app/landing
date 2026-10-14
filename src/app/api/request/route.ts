import { getTier } from '@/config/offer'
import { formRoute } from '@/lib/form-route'
import { computePrice, formatEuros } from '@/lib/pricing'
import { setupRequestSchema } from '@/lib/schemas'

export const runtime = 'nodejs'

/** "Demander la mise en place": used while online payment is not configured. */
export const POST = formRoute('request', setupRequestSchema, (data) => {
  const tier = getTier(data.tier)!
  const price = computePrice(tier, data.aircraft, data.cycle)
  return {
    title: 'Demande de mise en place d’un espace club',
    replyTo: data.email,
    fields: [
      ['Club', data.clubName],
      ['Contact', data.contactName],
      ['E-mail', data.email],
      ['Téléphone', data.phone],
      ['Offre', `${tier.name} (${data.cycle === 'yearly' ? 'annuel' : 'mensuel'})`],
      ['Avions', data.aircraft],
      ['Prix affiché', `${formatEuros(price.totalCents)} HT / ${data.cycle === 'yearly' ? 'an' : 'mois'}`],
      ['Consentement au recontact', 'oui'],
    ],
    body: data.message || undefined,
  }
})
