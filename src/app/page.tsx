import { Contact } from '@/components/home/Contact'
import { Faq } from '@/components/home/Faq'
import { Features } from '@/components/home/Features'
import { Hero } from '@/components/home/Hero'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Mobile } from '@/components/home/Mobile'
import { Pricing } from '@/components/home/Pricing'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Mobile />
      <HowItWorks />
      <Pricing />
      <Faq />
      <Contact />
    </>
  )
}
