import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pathOf } from '@/i18n/routes'

export function NotFoundPage({ lang }: { lang: Lang }) {
  const dict = getDictionary(lang)
  return (
    <div className="container max-w-2xl py-20">
      <h1 className="text-3xl font-bold text-primary">{dict.notFound.title}</h1>
      <p className="mt-4 text-muted-foreground">{dict.notFound.text}</p>
      <Button asChild className="mt-8">
        <Link href={pathOf(lang, 'home')}>{dict.common.backHome}</Link>
      </Button>
    </div>
  )
}
