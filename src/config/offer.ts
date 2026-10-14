/**
 * SkyCrew offer: tiers and prices. The site, the estimator and the Stripe checkout all read
 * this file and nothing else.
 *
 * TODO (owner): the amounts below are PROVISIONAL. Set the real prices, then rebuild and
 * redeploy the site. If you create the prices in Stripe instead, put their ids in the
 * environment (see .env.example) and keep these amounts identical to the Stripe ones:
 * the site displays these, Stripe charges its own.
 */

export type TierId = 'club' | 'club-ecole'
export type BillingCycle = 'monthly' | 'yearly'

export interface Tier {
  id: TierId
  name: string
  /** One line under the tier name. */
  summary: string
  /** Monthly flat fee, excluding VAT, in cents. */
  monthlyFlatCents: number
  /** Monthly fee per aircraft, excluding VAT, in cents. */
  monthlyPerAircraftCents: number
  /** What the tier includes, as shown on the site. */
  features: string[]
}

export const OFFER = {
  currency: 'eur',
  /** Prices are shown and charged excluding VAT; VAT is added on the invoice. */
  taxLabel: 'HT',
  /** A year costs this many months: 10 means two months free. */
  monthsBilledPerYear: 10,
  minAircraft: 1,
  /** Largest fleet accepted by the online sign-up; above it, the site asks to get in touch. */
  maxAircraftOnline: 60,
  /**
   * Free trial, in days, given to every new subscription taken on the site: the card is
   * registered, nothing is charged before the end of the trial, and a cancellation before
   * that date costs nothing. 0 disables it. The CGV quote this value.
   */
  trialDays: 14,
  /**
   * VAT line shown under every price. TODO (owner): if your company is not liable for VAT
   * (franchise en base), replace it with « TVA non applicable, art. 293 B du CGI ».
   */
  vatMention: 'Prix hors taxes : la TVA au taux en vigueur s’ajoute sur la facture.',
} as const

const CLUB_FEATURES = [
  'Réservations en ligne, payées sur le compte prépayé du membre',
  'Factures PDF pour chaque recharge et chaque réservation',
  'Flotte, maintenance, incidents et immobilisation des avions',
  'Audits de sécurité',
  'Membres, rôles, licences et rappels d’expiration',
  'Plans de vol (journal de navigation, météo, carte)',
  'Clôture des vols et carnet de vol',
  'Checklists avant vol',
  'Finances du club et export Excel',
  'Journal des actions des administrateurs',
  'Double authentification, français et anglais, utilisable sur téléphone',
]

export const TIERS: Tier[] = [
  {
    id: 'club',
    name: 'Club',
    summary: 'Pour gérer les réservations, la flotte et les membres.',
    monthlyFlatCents: 3900,
    monthlyPerAircraftCents: 600,
    features: CLUB_FEATURES,
  },
  {
    id: 'club-ecole',
    name: 'Club + École',
    summary: 'Pour les clubs qui forment des élèves pilotes.',
    monthlyFlatCents: 6900,
    monthlyPerAircraftCents: 600,
    features: [
      'Tout ce que contient l’offre Club',
      'Vols avec instructeur liés aux réservations',
      'Cours planifiés par les instructeurs',
      'Progression des élèves et compétences validées',
      'E-learning : cours, leçons et quiz',
      'Évaluations avec score requis',
    ],
  },
]

export const TIER_IDS = TIERS.map((tier) => tier.id) as [TierId, ...TierId[]]

export function getTier(id: string): Tier | undefined {
  return TIERS.find((tier) => tier.id === id)
}
