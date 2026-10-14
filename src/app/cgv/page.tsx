import type { Metadata } from 'next'
import Link from 'next/link'
import { Fill, LegalPage, ScrollTable } from '@/components/legal/LegalPage'
import { LEGAL } from '@/config/legal'
import { OFFER, TIERS } from '@/config/offer'
import { formatEuros } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description: 'Conditions générales de vente de l’abonnement SkyCrew pour les aéroclubs.',
  alternates: { canonical: '/cgv' },
}

export default function Cgv() {
  return (
    <LegalPage title="Conditions générales de vente">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions générales de vente (CGV) régissent l’abonnement au service en ligne SkyCrew, logiciel de
        gestion d’aéroclub, conclu entre <Fill>{LEGAL.companyName}</Fill> (« SkyCrew ») et le club qui y souscrit
        (« le Client »), représenté par la personne qui effectue la souscription et déclare avoir le pouvoir de l’engager.
      </p>
      <p>
        Le service s’adresse aux aéroclubs et autres structures aéronautiques, associations ou professionnels. Il n’est pas
        proposé aux consommateurs agissant à titre personnel.
      </p>

      <h2>2. Le service</h2>
      <p>
        SkyCrew met à la disposition du Client un espace en ligne propre au club, accessible par navigateur, comprenant les
        fonctions de l’offre choisie telles que décrites sur la <Link href="/#fonctionnalites">page de présentation</Link>{' '}
        à la date de souscription. SkyCrew peut faire évoluer le service ; une évolution ne peut pas supprimer une fonction
        essentielle de l’offre souscrite sans que le Client puisse résilier sans frais.
      </p>
      <p>
        SkyCrew est un outil d’aide à la gestion. Les plans de vol, la météo, les données aéronautiques, les calculs de
        carburant et les checklists sont des aides : le commandant de bord reste responsable de la préparation et de la
        conduite du vol (NOTAM, météo officielle, documents, navigabilité), et le Client reste responsable de
        l’exploitation de ses aéronefs et du respect de la réglementation.
      </p>

      <h2>3. Souscription</h2>
      <p>
        L’abonnement est souscrit sur le site, en choisissant l’offre, le nombre d’aéronefs et la périodicité, puis en
        réglant sur la page de paiement de notre prestataire Stripe ; ou, lorsque le paiement en ligne n’est pas proposé,
        sur demande suivie d’un échange avec SkyCrew. La souscription vaut acceptation des présentes CGV, matérialisée par
        la case à cocher prévue à cet effet.
      </p>
      <p>
        Après la souscription, SkyCrew crée l’espace du club et transmet l’accès du premier administrateur à l’adresse
        e-mail indiquée.
      </p>

      <h2>4. Prix</h2>
      <p>
        Les prix sont indiqués en euros hors taxes (HT) ; la TVA au taux en vigueur s’y ajoute. Le prix d’une période est
        égal à un forfait par club plus un montant par aéronef déclaré, au minimum {OFFER.minAircraft}. Aux conditions
        affichées à la date d’entrée en vigueur ci-dessus :
      </p>
      <ScrollTable label="Prix des offres">
        <thead>
          <tr>
            <th scope="col">Offre</th>
            <th scope="col">Forfait mensuel HT</th>
            <th scope="col">Par aéronef et par mois HT</th>
          </tr>
        </thead>
        <tbody>
          {TIERS.map((tier) => (
            <tr key={tier.id}>
              <td>{tier.name}</td>
              <td>{formatEuros(tier.monthlyFlatCents)}</td>
              <td>{formatEuros(tier.monthlyPerAircraftCents)}</td>
            </tr>
          ))}
        </tbody>
      </ScrollTable>
      <p>
        L’abonnement annuel est facturé {OFFER.monthsBilledPerYear} fois le prix mensuel. Le prix applicable est celui
        affiché au moment de la souscription. Le nombre d’aéronefs facturés peut être modifié à la demande du Client ; le
        changement s’applique au prorata selon les règles de Stripe ou à la période suivante.
      </p>
      <p>
        SkyCrew peut modifier ses prix pour les périodes à venir en informant le Client par e-mail au moins 30 jours avant
        le renouvellement concerné ; le Client qui refuse le nouveau prix peut résilier avant cette date.
      </p>

      <h2>5. Durée, essai et renouvellement</h2>
      <p>
        L’abonnement est conclu pour une période d’un mois ou d’un an, selon le choix du Client, et se renouvelle
        automatiquement par périodes de même durée, sauf résiliation.
      </p>
      {OFFER.trialDays > 0 && (
        <p>
          Tout abonnement souscrit en ligne commence par une période d’essai gratuite de {OFFER.trialDays} jours : le moyen
          de paiement est enregistré, mais aucun montant n’est prélevé avant la fin de l’essai. Une résiliation pendant
          l’essai met fin à l’abonnement sans aucun frais.
        </p>
      )}
      <p>
        Lorsque le Client est un non-professionnel (par exemple une association n’agissant pas à des fins
        professionnelles), SkyCrew l’informe, par écrit, au plus tôt trois mois et au plus tard un mois avant le terme
        d’un abonnement annuel, de la possibilité de ne pas le reconduire, conformément aux articles L. 215-1 et L. 215-3 du
        Code de la consommation.
      </p>

      <h2>6. Paiement et factures</h2>
      <p>
        Le prix est payable d’avance, au début de chaque période (après l’essai le cas échéant), par carte bancaire ou par
        tout moyen proposé sur la page de paiement de Stripe. SkyCrew n’a jamais accès aux données de carte. Les factures
        sont envoyées par e-mail et restent consultables auprès de SkyCrew.
      </p>
      <p>
        En cas d’échec de paiement, Stripe effectue de nouvelles tentatives et le Client en est informé. Si le paiement
        n’est pas régularisé dans les 15 jours suivant cette information, SkyCrew peut suspendre l’accès au service
        jusqu’au paiement, après un dernier avertissement par e-mail.
      </p>

      <h2>7. Retard de paiement</h2>
      <p>
        Lorsque le Client agit en qualité de professionnel, toute somme non payée à l’échéance porte de plein droit des
        pénalités de retard égales à trois fois le taux d’intérêt légal, ainsi qu’une indemnité forfaitaire pour frais de
        recouvrement de 40 euros, conformément aux articles L. 441-10 et D. 441-5 du Code de commerce. Lorsque le Client est
        un non-professionnel, les sommes impayées portent intérêt au taux légal après mise en demeure.
      </p>

      <h2>8. Résiliation</h2>
      <p>
        Le Client peut résilier à tout moment, par e-mail à <Fill>{LEGAL.contactEmail}</Fill> ou depuis l’espace de
        gestion de l’abonnement lorsqu’il est proposé. La résiliation prend effet à la fin de la période en cours, déjà
        payée, qui n’est pas remboursée ; aucun prélèvement n’a lieu ensuite.
      </p>
      <p>
        SkyCrew peut résilier l’abonnement en cas de manquement grave du Client (impayé persistant, usage illicite ou
        atteinte à la sécurité du service), après une mise en demeure restée sans effet pendant 15 jours, ou pour la fin
        d’une période moyennant un préavis de trois mois.
      </p>

      <h2>9. Disponibilité, maintenance et sauvegardes</h2>
      <p>
        SkyCrew met en œuvre les moyens raisonnables pour que le service soit accessible en permanence, sans garantir une
        disponibilité continue (obligation de moyens). Des interruptions peuvent avoir lieu pour maintenance ou mise à jour ;
        elles sont annoncées à l’avance lorsque c’est possible et placées de préférence en dehors des heures d’activité des
        clubs.
      </p>
      <p>
        Sauvegardes des données du club : <Fill>{LEGAL.backups}</Fill>.
      </p>

      <h2>10. Support</h2>
      <p>
        <Fill>{LEGAL.support}</Fill>.
      </p>

      <h2>11. Données du club et réversibilité</h2>
      <p>
        Les données saisies dans l’espace du club appartiennent au Client. À la fin de l’abonnement, et sur demande du
        Client formulée au plus tard 30 jours après cette fin, SkyCrew lui remet gratuitement une copie de ces données dans
        un format standard et lisible (fichiers CSV ou export de base de données), ainsi que les justificatifs déposés.
      </p>
      <p>
        Passé ce délai, ou après la remise de la copie, l’espace du club et ses données sont supprimés ; les copies de
        sauvegarde disparaissent au terme de leur durée de conservation. SkyCrew conserve seulement ce que la loi l’oblige à
        garder (factures de l’abonnement).
      </p>

      <h2>12. Données personnelles</h2>
      <p>
        Pour les données des membres du club, le Client est responsable du traitement et SkyCrew agit comme sous-traitant,
        selon l’article 28 du RGPD : SkyCrew traite ces données uniquement pour fournir le service et sur instruction du
        Client, en assure la confidentialité et la sécurité, recourt aux sous-traitants listés dans la{' '}
        <Link href="/confidentialite">politique de confidentialité</Link>, aide le Client à répondre aux demandes des
        personnes, l’informe sans délai de toute violation de données, et supprime ou restitue les données à la fin de
        l’abonnement (article 11).
      </p>

      <h2>13. Paiements des membres</h2>
      <p>
        Les recharges des comptes des membres par carte ou PayPal sont encaissées sur un compte Stripe ou PayPal ouvert au
        nom du Client, selon les conditions de ces prestataires. SkyCrew n’est pas partie à ces paiements et ne détient pas
        les fonds des membres.
      </p>

      <h2>14. Responsabilité</h2>
      <p>
        SkyCrew est tenue d’une obligation de moyens. Elle n’est pas responsable des dommages indirects (perte de chiffre
        d’affaires, d’exploitation, de chance), ni des conséquences d’une utilisation non conforme du service, d’une erreur
        de saisie, d’une décision de vol ou d’une indisponibilité due à un tiers (fournisseur d’accès, prestataire de
        paiement, services de cartographie ou de météo). Sauf faute lourde ou dolosive, la responsabilité totale de SkyCrew
        est limitée aux sommes payées par le Client au titre des douze derniers mois.
      </p>
      <p>
        Le Client est responsable de l’usage du service par ses administrateurs et ses membres, de la confidentialité de
        leurs accès et de l’exactitude des données qu’ils saisissent (tarifs, licences, disponibilité des aéronefs…).
      </p>

      <h2>15. Propriété intellectuelle</h2>
      <p>
        SkyCrew reste propriétaire du logiciel. Le Client et ses membres reçoivent, pendant la durée de l’abonnement, un
        droit d’utilisation non exclusif et non transférable du service, pour les besoins du club.
      </p>

      <h2>16. Modification des CGV</h2>
      <p>
        SkyCrew peut modifier les présentes CGV. Les nouvelles conditions sont communiquées au Client par e-mail au moins
        30 jours avant leur application à son abonnement ; le Client qui les refuse peut résilier avant cette date.
      </p>

      <h2>17. Droit applicable et litiges</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de différend, les parties recherchent d’abord une solution
        amiable. À défaut, lorsque le Client est un professionnel, le litige est porté devant <Fill>{LEGAL.court}</Fill> ;
        dans les autres cas, devant la juridiction compétente selon les règles de droit commun.
      </p>
    </LegalPage>
  )
}
