import type { Metadata } from 'next'
import Link from 'next/link'
import { Fill, LegalPage } from '@/components/legal/LegalPage'
import { LEGAL } from '@/config/legal'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Éditeur, hébergeur et informations légales du site SkyCrew.',
  alternates: { canonical: '/mentions-legales' },
}

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        Le site et le service SkyCrew sont édités par <Fill>{LEGAL.companyName}</Fill>, <Fill>{LEGAL.legalForm}</Fill>,
        immatriculée sous le numéro <Fill>{LEGAL.siren}</Fill>, dont le siège social est situé <Fill>{LEGAL.address}</Fill>.
      </p>
      <p>
        Numéro de TVA intracommunautaire : <Fill>{LEGAL.vatNumber}</Fill>.
        <br />
        Contact : <Fill>{LEGAL.contactEmail}</Fill>, ou le{' '}
        <Link href="/#contact">formulaire de contact</Link>.
      </p>

      <h2>Directeur de la publication</h2>
      <p>
        <Fill>{LEGAL.publicationDirector}</Fill>.
      </p>

      <h2>Hébergement</h2>
      <p>
        <Fill>{LEGAL.host.name}</Fill>, <Fill>{LEGAL.host.address}</Fill>, <Fill>{LEGAL.host.contact}</Fill>.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, captures d’écran, logos et éléments graphiques du site appartiennent à l’éditeur. Toute reproduction
        sans autorisation est interdite, sauf courte citation mentionnant la source.
      </p>
      <p>
        Les captures d’écran présentées sur le site sont prises dans l’application SkyCrew avec des données de
        démonstration : les personnes, avions et montants qui y figurent sont fictifs.
      </p>

      <h2>Données personnelles et cookies</h2>
      <p>
        Ce site ne dépose pas de cookie et n’utilise pas d’outil de mesure d’audience. Le traitement des données personnelles
        est décrit dans la <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
    </LegalPage>
  )
}
