'use client'

import { usePathname } from 'next/navigation'
import { LANGS, type Lang } from '@/i18n/config'
import { switchPath } from '@/i18n/routes'
import { cn } from '@/lib/utils'

const NAMES: Record<Lang, { short: string; long: string }> = {
  fr: { short: 'FR', long: 'Français' },
  en: { short: 'EN', long: 'English' },
}

/**
 * FR / EN: each link goes to the same page in that language (the home page when the current page
 * has no counterpart). Plain links (full page load): each language has its own <html lang>.
 */
export function LanguageSwitch({ lang, label, className }: { lang: Lang; label: string; className?: string }) {
  const pathname = usePathname() ?? '/'
  return (
    <ul aria-label={label} className={cn('flex items-center rounded-md border border-border text-xs font-semibold', className)}>
      {LANGS.map((code) => {
        const current = code === lang
        return (
          <li key={code}>
            <a
              href={current ? pathname : switchPath(pathname, code)}
              hrefLang={code}
              lang={code}
              aria-current={current ? 'true' : undefined}
              className={cn(
                'flex h-8 min-w-9 items-center justify-center rounded-[5px] px-2',
                current ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-primary',
              )}
            >
              <span aria-hidden="true">{NAMES[code].short}</span>
              <span className="sr-only">{NAMES[code].long}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
