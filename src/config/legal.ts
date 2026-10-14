/**
 * Facts about the publisher that only the owner knows. Every value that still starts with
 * "[À COMPLÉTER" is shown as is on the legal pages (mentions légales, CGV, confidentialité)
 * and must be filled in before the site takes real subscriptions.
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

export function isPlaceholder(value: string): boolean {
  return value.startsWith('[À COMPLÉTER')
}
