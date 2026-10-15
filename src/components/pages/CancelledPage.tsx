import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pathOf, sectionHref } from '@/i18n/routes'

export function CancelledPage({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).cancelled
  return (
    <div className="container max-w-2xl py-16 md:py-24">
      <h1 className="text-3xl font-bold text-primary">{t.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{t.text}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href={pathOf(lang, 'start')}>{t.resume}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={sectionHref(lang, 'contact')}>{t.ask}</Link>
        </Button>
      </div>
    </div>
  )
}
