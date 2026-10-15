import { Contact } from '@/components/home/Contact'
import { Faq } from '@/components/home/Faq'
import { Features } from '@/components/home/Features'
import { Hero } from '@/components/home/Hero'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Mobile } from '@/components/home/Mobile'
import { Pricing } from '@/components/home/Pricing'
import type { Lang } from '@/i18n/config'

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <Features lang={lang} />
      <Mobile lang={lang} />
      <HowItWorks lang={lang} />
      <Pricing lang={lang} />
      <Faq lang={lang} />
      <Contact lang={lang} />
    </>
  )
}
