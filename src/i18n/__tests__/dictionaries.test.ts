import { describe, expect, it } from 'vitest'
import { LANGS } from '@/i18n/config'
import en from '@/i18n/en'
import fr from '@/i18n/fr'
import { fmt } from '@/i18n'
import { PAGES, SECTIONS, langOfPath, pageOfPath, sectionHref, switchPath } from '@/i18n/routes'

type Leaf = { path: string; value: unknown }

/** Every leaf of a dictionary with its path, array items included ("faq.items.2.q"). */
function leaves(value: unknown, path = ''): Leaf[] {
  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) => leaves(child, path ? `${path}.${key}` : key))
  }
  return [{ path, value }]
}

const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort()

// Keys allowed to be empty in French: the "French version prevails" line only shows on translations.
const EMPTY_IN_FRENCH = new Set(['legal.prevails', 'legal.prevailsLink'])

describe('dictionaries', () => {
  const frLeaves = leaves(fr)
  const enLeaves = leaves(en)

  it('have exactly the same keys (array lengths included) in both languages', () => {
    expect(enLeaves.map((l) => l.path)).toEqual(frLeaves.map((l) => l.path))
  })

  it('only hold non-empty strings', () => {
    for (const { path, value } of frLeaves) {
      expect(typeof value, `fr ${path}`).toBe('string')
      if (!EMPTY_IN_FRENCH.has(path)) expect((value as string).trim(), `fr ${path}`).not.toBe('')
    }
    for (const { path, value } of enLeaves) {
      expect(typeof value, `en ${path}`).toBe('string')
      expect((value as string).trim(), `en ${path}`).not.toBe('')
    }
  })

  it('use the same placeholders in both languages', () => {
    const enByPath = new Map(enLeaves.map((l) => [l.path, l.value as string]))
    for (const { path, value } of frLeaves) {
      expect(placeholders(enByPath.get(path)!), path).toEqual(placeholders(value as string))
    }
  })

  it('keep anchors unique within a language', () => {
    for (const dict of [fr, en]) {
      const ids = [...Object.values(dict.features.blocks).map((b) => b.id), ...Object.values(SECTIONS).map((s) => s[dict === fr ? 'fr' : 'en'])]
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('show prices excluding VAT in English', () => {
    expect(en.pricing.perMonth).toMatch(/excl\. VAT/)
    expect(en.offer.tierPrice).toMatch(/excl\. VAT/)
  })

  it('fills placeholders', () => {
    expect(fmt('{count} avions, {count} fois, {other}', { count: 3 })).toBe('3 avions, 3 fois, {other}')
  })
})

describe('routes', () => {
  it('keep the French URLs and put English under /en', () => {
    expect(PAGES.home).toEqual({ fr: '/', en: '/en' })
    expect(PAGES.start.fr).toBe('/commencer')
    for (const page of Object.values(PAGES)) {
      expect(page.en === '/en' || page.en.startsWith('/en/')).toBe(true)
      expect(page.fr.startsWith('/en')).toBe(false)
    }
  })

  it('switch to the same page in the other language, or the home page for an unknown path', () => {
    for (const [key, page] of Object.entries(PAGES)) {
      for (const from of LANGS) {
        for (const to of LANGS) expect(switchPath(page[from], to), `${key} ${from}→${to}`).toBe(page[to])
        expect(pageOfPath(page[from])).toEqual({ key, lang: from })
        expect(langOfPath(page[from])).toBe(from)
      }
    }
    expect(switchPath('/en/terms/', 'fr')).toBe('/cgv')
    expect(switchPath('/nowhere', 'en')).toBe('/en')
    expect(langOfPath('/english-club')).toBe('fr')
  })

  it('link to the home sections in each language', () => {
    expect(sectionHref('fr', 'pricing')).toBe('/#tarifs')
    expect(sectionHref('en', 'pricing')).toBe('/en#pricing')
  })
})
