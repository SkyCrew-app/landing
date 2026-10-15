import Link from 'next/link'
import { Fill, LegalPage } from '@/components/legal/LegalPage'
import { legalFor } from '@/config/legal'
import { getDictionary } from '@/i18n'
import { pathOf, sectionHref } from '@/i18n/routes'

/** English translation of LegalNoticeFr (the French version prevails). */
export function LegalNoticeEn() {
  const LEGAL = legalFor('en')
  return (
    <LegalPage lang="en" title={getDictionary('en').meta.legalNotice.title} frenchHref={pathOf('fr', 'legalNotice')}>
      <h2>Publisher of the website</h2>
      <p>
        The SkyCrew website and service are published by <Fill>{LEGAL.companyName}</Fill>, <Fill>{LEGAL.legalForm}</Fill>,
        registered under number <Fill>{LEGAL.siren}</Fill>, with its registered office at <Fill>{LEGAL.address}</Fill>.
      </p>
      <p>
        EU VAT number: <Fill>{LEGAL.vatNumber}</Fill>.
        <br />
        Contact: <Fill>{LEGAL.contactEmail}</Fill>, or the <Link href={sectionHref('en', 'contact')}>contact form</Link>.
      </p>

      <h2>Publication director</h2>
      <p>
        <Fill>{LEGAL.publicationDirector}</Fill>.
      </p>

      <h2>Hosting</h2>
      <p>
        <Fill>{LEGAL.host.name}</Fill>, <Fill>{LEGAL.host.address}</Fill>, <Fill>{LEGAL.host.contact}</Fill>.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The texts, screenshots, logos and graphic elements of this website belong to the publisher. Any reproduction
        without permission is prohibited, except for short quotations citing the source.
      </p>
      <p>
        The screenshots shown on this website are taken in the SkyCrew application with demo data: the people, aircraft
        and amounts shown are fictitious.
      </p>

      <h2>Personal data and cookies</h2>
      <p>
        This website does not set any cookies and does not use any audience measurement tool. The processing of personal
        data is described in the <Link href={pathOf('en', 'privacy')}>privacy policy</Link>.
      </p>
    </LegalPage>
  )
}
