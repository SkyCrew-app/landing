import type Stripe from 'stripe'
import { getTier } from '@/config/offer'
import { formatEuros } from '@/lib/pricing'
import type { OwnerMessage } from '@/lib/notify'

/** Stripe events this site listens to (configure the same list on the webhook endpoint). */
export const HANDLED_EVENTS = [
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_failed',
] as const

const tierName = (id?: string | null) => (id && getTier(id)?.name) || id || '—'
const cycleName = (cycle?: string | null) => (cycle === 'yearly' ? 'annuel' : cycle === 'monthly' ? 'mensuel' : cycle || '—')
const date = (unix?: number | null) =>
  unix ? new Date(unix * 1000).toLocaleDateString('fr-FR', { timeZone: 'Europe/Paris' }) : undefined
const dashboard = (livemode: boolean, path: string) =>
  `https://dashboard.stripe.com/${livemode ? '' : 'test/'}${path}`
const idOf = (value: string | { id: string } | null | undefined) =>
  typeof value === 'string' ? value : value?.id

const STATUS: Record<string, string> = {
  trialing: 'période d’essai',
  active: 'actif',
  past_due: 'paiement en retard',
  unpaid: 'impayé',
  canceled: 'résilié',
  incomplete: 'paiement à finaliser',
  incomplete_expired: 'paiement non finalisé',
  paused: 'en pause',
}

/** Message for the owner, or null for an event that needs no notification. */
export function describeEvent(event: Stripe.Event): OwnerMessage | null {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const m = session.metadata ?? {}
      return {
        title: 'Nouvel abonnement SkyCrew : espace club à mettre en place',
        replyTo: m.contact_email || session.customer_details?.email || undefined,
        fields: [
          ['Club', m.club_name],
          ['Offre', `${tierName(m.tier)} (${cycleName(m.cycle)})`],
          ['Avions', m.aircraft],
          ['Contact', m.contact_name],
          ['E-mail', m.contact_email || session.customer_details?.email],
          ['Téléphone', m.contact_phone],
          ['Montant HT de la période', session.amount_subtotal != null ? formatEuros(session.amount_subtotal) : undefined],
          ['Montant TTC de la période', session.amount_total != null ? formatEuros(session.amount_total) : undefined],
          ['CGV acceptées le', m.cgv_accepted_at],
          ['Abonnement', idOf(session.subscription) ? dashboard(event.livemode, `subscriptions/${idOf(session.subscription)}`) : undefined],
          ['Mode', event.livemode ? 'réel' : 'test'],
        ],
      }
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const m = sub.metadata ?? {}
      const previous = (event.data.previous_attributes ?? {}) as Partial<Stripe.Subscription>
      let title: string
      // A subscription taken on the site is already reported by checkout.session.completed;
      // one created by hand in the Stripe dashboard is reported here.
      if (event.type === 'customer.subscription.created') {
        if (m.club_name) return null
        title = 'Abonnement créé dans Stripe'
      } else if (event.type === 'customer.subscription.deleted') title = 'Abonnement résilié (terminé)'
      else if (sub.cancel_at_period_end && previous.cancel_at_period_end === false) title = 'Résiliation demandée (fin de période)'
      else if (!sub.cancel_at_period_end && previous.cancel_at_period_end === true) title = 'Résiliation annulée par le client'
      else if (previous.status && previous.status !== sub.status) title = `Abonnement : ${STATUS[previous.status] ?? previous.status} → ${STATUS[sub.status] ?? sub.status}`
      else if (previous.items) title = 'Abonnement modifié (offre ou nombre d’avions)'
      // Renewals and other routine changes are not worth a message.
      else return null
      const aircraftItem = sub.items?.data?.find((item) => (item.quantity ?? 1) > 1) ?? sub.items?.data?.[1]
      return {
        title: `${title} : ${m.club_name || 'club inconnu'}`,
        replyTo: m.contact_email || undefined,
        fields: [
          ['Club', m.club_name],
          ['Offre', m.tier ? `${tierName(m.tier)} (${cycleName(m.cycle)})` : undefined],
          ['Avions facturés', aircraftItem?.quantity ?? m.aircraft],
          ['Statut', STATUS[sub.status] ?? sub.status],
          ['Fin de l’essai', date(sub.trial_end)],
          ['Prend fin le', date(sub.cancel_at ?? sub.ended_at)],
          ['Contact', m.contact_email],
          ['Abonnement', dashboard(event.livemode, `subscriptions/${sub.id}`)],
          ['Mode', event.livemode ? 'réel' : 'test'],
        ],
      }
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      return {
        title: 'Échec de paiement d’une facture SkyCrew',
        replyTo: invoice.customer_email || undefined,
        fields: [
          ['Client', invoice.customer_name || invoice.customer_email],
          ['Montant TTC', invoice.amount_due != null ? formatEuros(invoice.amount_due) : undefined],
          ['Facture', invoice.hosted_invoice_url || undefined],
          ['Mode', event.livemode ? 'réel' : 'test'],
        ],
      }
    }
    default:
      return null
  }
}
