import { LEGAL, isPlaceholder } from '@/config/legal'

/** A value from src/config/legal.ts; placeholders still to fill in are highlighted. */
export function Fill({ children }: { children: string }) {
  return isPlaceholder(children) ? <mark className="placeholder-todo">{children}</mark> : <>{children}</>
}

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <h1 className="text-balance text-3xl font-bold text-primary md:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        En vigueur à compter du : <Fill>{LEGAL.effectiveDate}</Fill>
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
