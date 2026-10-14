'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'
import { APP_URL } from '@/config/site'

const LINKS = [
  { href: '/#fonctionnalites', label: 'Fonctionnalités' },
  { href: '/#comment-ca-marche', label: 'Comment ça marche' },
  { href: '/#tarifs', label: 'Tarifs' },
  { href: '/#questions', label: 'Questions' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 rounded-md text-xl font-bold text-primary" aria-label="SkyCrew, accueil">
          <Logo className="h-7 w-7" />
          SkyCrew
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="rounded-sm text-sm font-medium text-foreground/80 hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {APP_URL && (
            <a href={APP_URL} className="rounded-sm text-sm font-medium text-foreground/80 hover:text-primary">
              Se connecter
            </a>
          )}
          <Button asChild>
            <Link href="/commencer">Équiper mon club</Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Navigation principale" className="border-t border-border bg-white lg:hidden">
          <ul className="container flex flex-col py-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block py-3 text-base font-medium" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            {APP_URL && (
              <li>
                <a href={APP_URL} className="block py-3 text-base font-medium">
                  Se connecter
                </a>
              </li>
            )}
            <li className="py-3">
              <Button asChild className="w-full" size="lg">
                <Link href="/commencer" onClick={() => setOpen(false)}>
                  Équiper mon club
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
