import Link from 'next/link'
import { Fill, LegalPage, ScrollTable } from '@/components/legal/LegalPage'
import { LEGAL } from '@/config/legal'
import { getDictionary } from '@/i18n'
import { pathOf } from '@/i18n/routes'

const PROCESSORS: { name: string; role: string; data: string; where: string }[] = [
  { name: `${LEGAL.host.name}`, role: 'Hébergement du site, de l’application et de sa base de données', data: 'Toutes les données de l’application', where: LEGAL.host.location },
  { name: `${LEGAL.emailProvider}`, role: 'Envoi des e-mails (invitation, mot de passe, notifications)', data: 'Nom, adresse e-mail, contenu des e-mails', where: '—' },
  { name: 'Stripe Payments Europe Ltd (Irlande)', role: 'Paiement de l’abonnement SkyCrew ; recharges par carte des comptes des membres, sur le compte Stripe du club', data: 'Nom, e-mail, adresse de facturation, numéro de TVA, données de paiement (traitées par Stripe seul)', where: 'UE, transferts possibles vers les États-Unis' },
  { name: 'PayPal (Europe) S.à r.l. et Cie, S.C.A. (Luxembourg)', role: 'Recharges des comptes des membres par PayPal, sur le compte PayPal du club', data: 'Montant, identité du payeur chez PayPal', where: 'UE, transferts possibles hors UE' },
  { name: 'Mapbox Inc. (États-Unis)', role: 'Affichage des cartes des plans de vol (chargées par le navigateur)', data: 'Adresse IP, données techniques du navigateur, zone de carte consultée', where: 'États-Unis' },
  { name: 'OpenWeather Ltd (Royaume-Uni)', role: 'Météo du tableau de bord et des plans de vol', data: 'Coordonnées d’aérodromes ; adresse IP lorsque le navigateur interroge le service', where: 'Royaume-Uni (décision d’adéquation)' },
  { name: 'aviationweather.gov (NOAA, États-Unis)', role: 'Observations météo aéronautiques (METAR), interrogées par le serveur', data: 'Codes OACI d’aérodromes, aucune donnée personnelle', where: 'États-Unis' },
  { name: 'API Ninjas (États-Unis)', role: 'Recherche d’aérodromes et météo, interrogées par le serveur', data: 'Noms ou codes d’aérodromes, aucune donnée personnelle', where: 'États-Unis' },
  { name: 'OpenAIP', role: 'Données aéronautiques (aérodromes, espaces aériens), chargées par le navigateur', data: 'Adresse IP, données techniques du navigateur', where: 'Allemagne' },
  { name: 'api-adresse.data.gouv.fr (État français)', role: 'Suggestion d’adresse lors de la saisie du profil', data: 'Texte de l’adresse saisie, adresse IP', where: 'France' },
  { name: 'YouTube (Google), mode « youtube-nocookie »', role: 'Lecture des vidéos intégrées aux cours en ligne', data: 'Adresse IP, données techniques, lecture de la vidéo', where: 'États-Unis' },
]

/** French original (the version that prevails). */
export function PrivacyFr() {
  return (
    <LegalPage lang="fr" title={getDictionary('fr').meta.privacy.title} frenchHref={pathOf('fr', 'privacy')}>
      <p>
        Cette page explique quelles données personnelles sont traitées par ce site et par l’application SkyCrew, par
        qui, pourquoi et combien de temps, et comment exercer vos droits.
      </p>

      <h2>1. Deux situations différentes</h2>
      <ul>
        <li>
          <strong>Sur ce site</strong> (formulaires de contact et de demande, souscription), <Fill>{LEGAL.companyName}</Fill>{' '}
          est responsable du traitement.
        </li>
        <li>
          <strong>Dans l’application SkyCrew d’un club</strong>, c’est le club qui est responsable du traitement des données
          de ses membres. SkyCrew agit comme sous-traitant : elle héberge et traite ces données pour le compte du club, sur
          ses instructions. Les membres s’adressent d’abord à leur club pour exercer leurs droits ; SkyCrew transmet au club
          toute demande qui lui parvient.
        </li>
      </ul>

      <h2>2. Données traitées sur ce site</h2>
      <ScrollTable label="Données traitées sur ce site">
        <thead>
          <tr>
            <th scope="col">Pourquoi</th>
            <th scope="col">Quelles données</th>
            <th scope="col">Base légale</th>
            <th scope="col">Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Répondre à un message (formulaire de contact)</td>
            <td>Nom, e-mail, nom du club, message</td>
            <td>Intérêt légitime à répondre</td>
            <td>3 ans après le dernier échange</td>
          </tr>
          <tr>
            <td>Préparer la mise en place d’un club (demande)</td>
            <td>Nom du club, nom, e-mail, téléphone, offre, nombre d’avions, message</td>
            <td>Mesures précontractuelles à votre demande, et votre accord coché dans le formulaire</td>
            <td>3 ans après le dernier échange, sauf souscription</td>
          </tr>
          <tr>
            <td>Gérer l’abonnement et la facturation</td>
            <td>Nom du club, nom et e-mail du contact, téléphone, adresse de facturation, numéro de TVA, historique des paiements</td>
            <td>Exécution du contrat ; obligations comptables</td>
            <td>Durée de l’abonnement puis 5 ans ; factures 10 ans</td>
          </tr>
          <tr>
            <td>Protéger les formulaires contre les envois abusifs</td>
            <td>Adresse IP</td>
            <td>Intérêt légitime (sécurité)</td>
            <td>En mémoire seulement, quelques minutes</td>
          </tr>
          <tr>
            <td>Journaux techniques du serveur</td>
            <td>Adresse IP, date, page demandée</td>
            <td>Intérêt légitime (sécurité, bon fonctionnement)</td>
            <td><Fill>{LEGAL.logRetention}</Fill></td>
          </tr>
        </tbody>
      </ScrollTable>
      <p>
        Les messages des formulaires sont transmis à l’éditeur par <Fill>{LEGAL.notificationChannel}</Fill>. Les données de
        carte bancaire sont saisies sur la page de paiement de Stripe : elles ne transitent jamais par ce site.
      </p>

      <h2>3. Données traitées dans l’application, pour le compte du club</h2>
      <p>
        Selon l’usage qu’en fait le club : identité et coordonnées des membres (nom, e-mail, téléphone, adresse, date de
        naissance, photo), rôle, licences et justificatifs, réservations, plans de vol, vols et carnet de vol, solde,
        transactions et factures, incidents, checklists, données de formation (cours, compétences, évaluations),
        notifications, préférences, journal des actions des administrateurs, et données de connexion. Ces données sont conservées pendant l’abonnement du club, puis restituées et
        supprimées comme prévu dans les <Link href="/cgv">conditions générales de vente</Link>.
      </p>
      <p>
        <strong>Journal des connexions.</strong> Chaque tentative de connexion à l’application, réussie ou non, et chaque
        déconnexion sont enregistrées dans un journal :
      </p>
      <ul>
        <li>
          <strong>Données</strong> : compte concerné (ou, si aucun compte ne correspond, l’adresse e-mail saisie), date et
          heure, adresse IP, appareil (navigateur, système, type d’appareil) et résultat de la tentative. Jamais le mot de
          passe ni le code de double authentification saisis.
        </li>
        <li>
          <strong>Finalité</strong> : la sécurité des comptes (repérer une connexion suspecte ou des tentatives répétées).
          Les administrateurs du club consultent le journal ; chaque membre voit ses propres dernières connexions dans son
          profil.
        </li>
        <li>
          <strong>Base légale</strong> : intérêt légitime (sécurité du service).
        </li>
        <li>
          <strong>Durée</strong> : 6 mois, puis suppression automatique.
        </li>
      </ul>
      <p>Chaque club dispose de son propre espace, séparé de ceux des autres clubs.</p>

      <h2>4. Sous-traitants et services tiers</h2>
      <ScrollTable label="Sous-traitants et services tiers">
        <thead>
          <tr>
            <th scope="col">Prestataire</th>
            <th scope="col">Rôle</th>
            <th scope="col">Données</th>
            <th scope="col">Localisation</th>
          </tr>
        </thead>
        <tbody>
          {PROCESSORS.map((p) => (
            <tr key={p.role}>
              <td><Fill>{p.name}</Fill></td>
              <td>{p.role}</td>
              <td>{p.data}</td>
              <td><Fill>{p.where}</Fill></td>
            </tr>
          ))}
        </tbody>
      </ScrollTable>

      <h2>5. Transferts hors de l’Union européenne</h2>
      <p>
        Certains prestataires ci-dessus sont situés aux États-Unis ou peuvent y transférer des données (Stripe, PayPal,
        Mapbox, YouTube, API Ninjas, et l’outil de notification s’il s’agit d’un service américain). Ces transferts
        reposent sur le cadre de protection des données UE–États-Unis (Data Privacy Framework) lorsque le prestataire y est
        certifié, et à défaut sur les clauses contractuelles types de la Commission européenne. Le Royaume-Uni bénéficie
        d’une décision d’adéquation.
      </p>

      <h2>6. Cookies et stockage local</h2>
      <p>
        <strong>Ce site</strong> ne dépose aucun cookie et n’utilise aucun outil de mesure d’audience ni de publicité. La
        page de paiement de Stripe, sur le domaine de Stripe, utilise ses propres cookies nécessaires au paiement et à la
        lutte contre la fraude.
      </p>
      <p>
        <strong>L’application SkyCrew</strong> n’utilise que des cookies et un stockage local nécessaires à son
        fonctionnement, qui ne demandent pas de consentement :
      </p>
      <ScrollTable label="Cookies et stockage local de l’application">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Rôle</th>
            <th scope="col">Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>token</td><td>Cookie de session : garde le membre connecté</td><td>2 heures</td></tr>
          <tr><td>email</td><td>Cookie : adresse de connexion du membre, utilisée par la session</td><td>2 heures</td></tr>
          <tr><td>two_factor_challenge</td><td>Cookie : étape de vérification de la double authentification</td><td>5 minutes</td></tr>
          <tr><td>skycrew-language</td><td>Stockage local : langue choisie (français ou anglais)</td><td>Jusqu’à effacement par le membre</td></tr>
          <tr><td>theme</td><td>Stockage local : thème clair, sombre ou système</td><td>Jusqu’à effacement par le membre</td></tr>
        </tbody>
      </ScrollTable>
      <p>
        Les services intégrés à l’application (carte Mapbox, vidéos YouTube en mode « nocookie », données OpenAIP et météo)
        sont chargés par le navigateur et reçoivent à ce titre l’adresse IP du membre.
      </p>

      <h2>7. Sécurité</h2>
      <p>
        Connexions chiffrées (HTTPS), mots de passe stockés sous forme hachée, double authentification proposée à chaque
        membre, accès aux pages selon le rôle, et journal des actions sensibles des administrateurs.
      </p>

      <h2>8. Vos droits</h2>
      <p>
        Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité sur
        vos données, ainsi que du droit de définir des directives sur leur sort après votre décès. Lorsque le traitement
        repose sur votre accord, vous pouvez le retirer à tout moment.
      </p>
      <p>
        Pour les données de ce site : écrivez à <Fill>{LEGAL.contactEmail}</Fill>. Pour les données de l’application :
        adressez-vous à votre club, ou à nous et nous transmettrons. Une réponse vous est apportée dans un délai d’un mois.
      </p>
      <p>
        Vous pouvez aussi adresser une réclamation à la Commission nationale de l’informatique et des libertés (CNIL),
        3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07,{' '}
        <a href="https://www.cnil.fr/fr/plaintes" rel="noopener noreferrer">www.cnil.fr</a>.
      </p>
    </LegalPage>
  )
}
