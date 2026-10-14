import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { APP_URL, STRIPE_PORTAL_LOGIN_URL } from '@/config/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-primary">
            <Logo className="h-6 w-6" />
            SkyCrew
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Le logiciel de gestion en ligne des aéroclubs.</p>
        </div>

        <nav aria-labelledby="footer-site">
          <h2 id="footer-site" className="text-sm font-semibold">
            Le site
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-muted-foreground hover:text-primary" href="/#fonctionnalites">Fonctionnalités</Link></li>
            <li><Link className="text-muted-foreground hover:text-primary" href="/#tarifs">Tarifs</Link></li>
            <li><Link className="text-muted-foreground hover:text-primary" href="/#questions">Questions fréquentes</Link></li>
            <li><Link className="text-muted-foreground hover:text-primary" href="/#contact">Contact</Link></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-account">
          <h2 id="footer-account" className="text-sm font-semibold">
            Votre club
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-muted-foreground hover:text-primary" href="/commencer">Équiper mon club</Link></li>
            {APP_URL && (
              <li><a className="text-muted-foreground hover:text-primary" href={APP_URL}>Se connecter à SkyCrew</a></li>
            )}
            {STRIPE_PORTAL_LOGIN_URL && (
              <li><a className="text-muted-foreground hover:text-primary" href={STRIPE_PORTAL_LOGIN_URL}>Gérer mon abonnement</a></li>
            )}
          </ul>
        </nav>

        <nav aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="text-sm font-semibold">
            Informations légales
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-muted-foreground hover:text-primary" href="/mentions-legales">Mentions légales</Link></li>
            <li><Link className="text-muted-foreground hover:text-primary" href="/cgv">Conditions générales de vente</Link></li>
            <li><Link className="text-muted-foreground hover:text-primary" href="/confidentialite">Confidentialité et cookies</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="container py-5 text-xs text-muted-foreground">© {new Date().getFullYear()} SkyCrew</p>
      </div>
    </footer>
  )
}
