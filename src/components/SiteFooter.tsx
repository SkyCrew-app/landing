import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { APP_URL, STRIPE_PORTAL_LOGIN_URL } from '@/config/site'
import type { Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pathOf, sectionHref } from '@/i18n/routes'

const linkClass = 'text-muted-foreground hover:text-primary'

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).footer
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-primary">
            <Logo className="h-6 w-6" />
            SkyCrew
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{t.tagline}</p>
        </div>

        <nav aria-labelledby="footer-site">
          <h2 id="footer-site" className="text-sm font-semibold">
            {t.siteHeading}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className={linkClass} href={sectionHref(lang, 'features')}>{t.features}</Link></li>
            <li><Link className={linkClass} href={sectionHref(lang, 'pricing')}>{t.pricing}</Link></li>
            <li><Link className={linkClass} href={sectionHref(lang, 'faq')}>{t.faq}</Link></li>
            <li><Link className={linkClass} href={sectionHref(lang, 'contact')}>{t.contact}</Link></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-account">
          <h2 id="footer-account" className="text-sm font-semibold">
            {t.clubHeading}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className={linkClass} href={pathOf(lang, 'start')}>{t.cta}</Link></li>
            {APP_URL && (
              <li><a className={linkClass} href={APP_URL}>{t.login}</a></li>
            )}
            {STRIPE_PORTAL_LOGIN_URL && (
              <li><a className={linkClass} href={STRIPE_PORTAL_LOGIN_URL}>{t.manage}</a></li>
            )}
          </ul>
        </nav>

        <nav aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="text-sm font-semibold">
            {t.legalHeading}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className={linkClass} href={pathOf(lang, 'legalNotice')}>{t.legalNotice}</Link></li>
            <li><Link className={linkClass} href={pathOf(lang, 'terms')}>{t.terms}</Link></li>
            <li><Link className={linkClass} href={pathOf(lang, 'privacy')}>{t.privacy}</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="container py-5 text-xs text-muted-foreground">© {new Date().getFullYear()} SkyCrew</p>
      </div>
    </footer>
  )
}
