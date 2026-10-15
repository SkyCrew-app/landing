import { getTier } from '@/config/offer'
import { getDictionary } from '@/i18n'
import { formRoute } from '@/lib/form-route'
import { computePrice, formatEuros } from '@/lib/pricing'

export const runtime = 'nodejs'

/** "Demander la mise en place": used while online payment is not configured. */
export const POST = formRoute(
  'request',
  (schemas) => schemas.setupRequest,
  (data) => {
    const tier = getTier(data.tier)!
    const price = computePrice(tier, data.aircraft, data.cycle)
    // The owner reads French: tier names come from the French dictionary.
    const tierName = getDictionary('fr').tiers[tier.id].name
    return {
      title: 'Demande de mise en place d’un espace club',
      replyTo: data.email,
      fields: [
        ['Club', data.clubName],
        ['Contact', data.contactName],
        ['E-mail', data.email],
        ['Téléphone', data.phone],
        ['Offre', `${tierName} (${data.cycle === 'yearly' ? 'annuel' : 'mensuel'})`],
        ['Avions', data.aircraft],
        ['Prix affiché', `${formatEuros(price.totalCents)} HT / ${data.cycle === 'yearly' ? 'an' : 'mois'}`],
        ['Consentement au recontact', 'oui'],
      ],
      body: data.message || undefined,
    }
  },
)
