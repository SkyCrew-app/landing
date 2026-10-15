/**
 * Facts about the publisher that only the owner knows. Every value that still starts with
 * "[À COMPLÉTER" (or "[TO COMPLETE" in LEGAL_EN_TEXT, below) is shown as is, highlighted, on the
 * legal pages of both languages and must be filled in before the site takes real subscriptions.
 *
 * TODO (owner): fill in every field below, then rebuild and redeploy.
 */

const todo = (what: string) => `[À COMPLÉTER : ${what}]`

export const LEGAL = {
  /** Brand name used throughout the site. */
  brand: 'SkyCrew',
  companyName: todo('raison sociale de l’éditeur'),
  legalForm: todo('forme juridique et capital social (ex. SAS au capital de … €)'),
  siren: todo('numéro SIREN / RCS et ville d’immatriculation'),
  address: todo('adresse du siège social'),
  vatNumber: todo('numéro de TVA intracommunautaire'),
  publicationDirector: todo('nom du directeur de la publication'),
  /** Address for support, legal and personal-data requests. */
  contactEmail: todo('adresse e-mail de contact et de support'),
  host: {
    name: todo('nom de l’hébergeur du site et de l’application'),
    address: todo('adresse de l’hébergeur'),
    contact: todo('téléphone ou site web de l’hébergeur'),
    /** Where the servers are (country), for the privacy page. */
    location: todo('pays où sont situés les serveurs (ex. France)'),
  },
  emailProvider: todo('prestataire d’envoi des e-mails (ex. Brevo, Mailjet…) et pays'),
  /** Tool receiving the site's notifications (OWNER_NOTIFY_WEBHOOK_URL), e.g. Discord. */
  notificationChannel: todo('outil qui reçoit les messages du site (ex. Discord, États-Unis) et/ou boîte e-mail'),
  /** How long the host keeps the server's technical logs. */
  logRetention: todo('durée de conservation des journaux techniques du serveur (ex. 12 mois)'),
  /** Commitment written in the CGV about backups of the club's data. */
  backups: todo('fréquence et durée de conservation des sauvegardes (ex. quotidienne, conservée 14 jours)'),
  /** Support hours and response time written in the CGV. */
  support: todo('modalités du support (canal, jours ouvrés, délai de réponse indicatif)'),
  /** Court with jurisdiction for disputes between professionals. */
  court: todo('tribunal compétent (ex. Tribunal de commerce de …)'),
  /** Date from which the CGV and prices apply. */
  effectiveDate: todo('date d’entrée en vigueur des CGV et des tarifs'),
} as const

const todoEn = (what: string) => `[TO COMPLETE: ${what}]`

/**
 * The same facts for the English legal pages, only where the value is a sentence or a word that
 * needs translating; everything else (names, numbers, addresses) is taken from LEGAL.
 *
 * TODO (owner): fill these in too, in English.
 */
export const LEGAL_EN_TEXT = {
  hostLocation: todoEn('country where the servers are located (e.g. France)'),
  emailProvider: todoEn('e-mail sending provider (e.g. Brevo, Mailjet…) and country'),
  notificationChannel: todoEn('tool receiving the site’s messages (e.g. Discord, United States) and/or mailbox'),
  logRetention: todoEn('retention period of the server’s technical logs (e.g. 12 months)'),
  backups: todoEn('backup frequency and retention (e.g. daily, kept for 14 days)'),
  support: todoEn('support terms (channel, business days, indicative response time)'),
  court: todoEn('competent court (e.g. Tribunal de commerce de …)'),
  effectiveDate: todoEn('effective date of the terms of sale and prices'),
}

/** Publisher facts for the legal pages of a language. */
export function legalFor(lang: 'fr' | 'en') {
  if (lang === 'fr') return LEGAL
  const en = LEGAL_EN_TEXT
  return {
    ...LEGAL,
    host: { ...LEGAL.host, location: en.hostLocation },
    emailProvider: en.emailProvider,
    notificationChannel: en.notificationChannel,
    logRetention: en.logRetention,
    backups: en.backups,
    support: en.support,
    court: en.court,
    effectiveDate: en.effectiveDate,
  }
}

export function isPlaceholder(value: string): boolean {
  return value.startsWith('[À COMPLÉTER') || value.startsWith('[TO COMPLETE')
}
