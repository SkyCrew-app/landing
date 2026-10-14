/** Public addresses of the site and of the application. Both are read at build time. */

const trimSlash = (url: string) => url.replace(/\/+$/, '')

/** Address of this marketing site, used for canonical links, the sitemap and Open Graph. */
export const SITE_URL = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')

/** Address of the SkyCrew application. The "Se connecter" link is hidden while it is unset. */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ? trimSlash(process.env.NEXT_PUBLIC_APP_URL) : null

/**
 * Stripe customer portal login page (Stripe dashboard › Settings › Billing › Customer portal ›
 * "Login link"). Stripe e-mails a one-time code to the subscriber, so no account lookup happens
 * on this site. The "Gérer mon abonnement" link is hidden while it is unset.
 */
export const STRIPE_PORTAL_LOGIN_URL = process.env.NEXT_PUBLIC_STRIPE_PORTAL_LOGIN_URL || null

export const SITE_NAME = 'SkyCrew'
export const SITE_DESCRIPTION =
  'SkyCrew est le logiciel en ligne des aéroclubs : réservations payées sur le compte prépayé des membres, flotte, maintenance, incidents, licences, plans de vol, carnet de vol et instruction.'
