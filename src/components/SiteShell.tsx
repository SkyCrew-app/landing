import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import type { Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { headerTexts } from '@/i18n/slices'

/** <html> and <body> of one language: each language has its own layout, so `lang` is always right. */
export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const t = getDictionary(lang)
  return (
    <html lang={lang}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenu"
          className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {t.common.skipLink}
        </a>
        <SiteHeader lang={lang} texts={headerTexts(t)} />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  )
}
