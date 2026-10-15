import { isPlaceholder, legalFor } from '@/config/legal'
import type { Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'

/** A value from src/config/legal.ts; placeholders still to fill in are highlighted. */
export function Fill({ children }: { children: string }) {
  return isPlaceholder(children) ? <mark className="placeholder-todo">{children}</mark> : <>{children}</>
}

export function LegalPage({
  lang,
  title,
  frenchHref,
  children,
}: {
  lang: Lang
  title: string
  /** The French original of a translated page. */
  frenchHref: string
  children: React.ReactNode
}) {
  const t = getDictionary(lang).legal
  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <h1 className="text-balance text-3xl font-bold text-primary md:text-4xl">{title}</h1>
      {t.prevails && (
        <p className="mt-4 rounded-md border border-border bg-secondary p-3 text-sm">
          {t.prevails}{' '}
          <a href={frenchHref} hrefLang="fr" className="font-medium text-primary underline">
            {t.prevailsLink}
          </a>
          .
        </p>
      )}
      <p className="mt-3 text-sm text-muted-foreground">
        {t.effectiveFrom} <Fill>{legalFor(lang).effectiveDate}</Fill>
      </p>
      <div className="legal mt-8">{children}</div>
    </div>
  )
}

/** Wide table that scrolls sideways on small screens (focusable so it scrolls with the keyboard too). */
export function ScrollTable({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 overflow-x-auto" role="region" aria-label={label} tabIndex={0}>
      <table className="min-w-[560px]">{children}</table>
    </div>
  )
}
