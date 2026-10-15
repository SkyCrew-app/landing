'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { Logo } from '@/components/Logo'
import { APP_URL } from '@/config/site'
import type { Lang } from '@/i18n/config'
import { pathOf, sectionHref, type SectionKey } from '@/i18n/routes'
import type { HeaderTexts } from '@/i18n/slices'

const SECTIONS: SectionKey[] = ['features', 'how', 'pricing', 'faq', 'contact']

export function SiteHeader({ lang, texts }: { lang: Lang; texts: HeaderTexts }) {
  const t = texts.header
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const links = SECTIONS.map((key) => ({ href: sectionHref(lang, key), label: t.nav[key] }))
  const start = pathOf(lang, 'start')

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href={pathOf(lang, 'home')} className="flex items-center gap-2 rounded-md text-xl font-bold text-primary" aria-label={texts.homeLabel}>
          <Logo className="h-7 w-7" />
          SkyCrew
        </Link>

        <nav aria-label={t.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="rounded-sm text-sm font-medium text-foreground/80 hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch lang={lang} label={t.language} />
          <div className="hidden items-center gap-3 lg:flex">
            {APP_URL && (
              <a href={APP_URL} className="rounded-sm text-sm font-medium text-foreground/80 hover:text-primary">
                {t.login}
              </a>
            )}
            <Button asChild>
              <Link href={start}>{t.cta}</Link>
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label={t.mainNav} className="border-t border-border bg-white lg:hidden">
          <ul className="container flex flex-col py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block py-3 text-base font-medium" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            {APP_URL && (
              <li>
                <a href={APP_URL} className="block py-3 text-base font-medium">
                  {t.login}
                </a>
              </li>
            )}
            <li className="py-3">
              <Button asChild className="w-full" size="lg">
                <Link href={start} onClick={() => setOpen(false)}>
                  {t.cta}
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
