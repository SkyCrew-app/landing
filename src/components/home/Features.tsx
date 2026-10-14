import type { StaticImageData } from 'next/image'
import {
  BadgeCheck,
  BookOpenCheck,
  Bell,
  ClipboardCheck,
  History,
  Languages,
  LineChart,
  Newspaper,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { Screenshot } from '@/components/Screenshot'
import { SCREENS } from '@/lib/screens'
import { cn } from '@/lib/utils'

interface Block {
  id: string
  title: string
  intro: string
  points: string[]
  shots: { src: StaticImageData; alt: string }[]
  tier?: string
}

const BLOCKS: Block[] = [
  {
    id: 'reservations-solde',
    title: 'Des réservations payées d’avance, remboursées au centime près',
    intro:
      'Chaque membre a un compte prépayé. Le prix d’un vol est connu avant de valider, et le solde ne devient jamais négatif à cause d’une réservation.',
    points: [
      'Prix = tarif horaire de l’avion × durée réservée, affiché avant validation et débité du solde à la réservation.',
      'Modification de l’avion ou de l’horaire : le nouveau prix est recalculé, la différence est débitée ou remboursée.',
      'Annulation jusqu’à l’heure de début : exactement le montant payé est recrédité, sans frais.',
      'Recharge par carte bancaire ou PayPal, ou crédit saisi par un administrateur pour les espèces, chèques et virements.',
      'Une facture PDF pour chaque recharge et chaque réservation, téléchargeable par le membre.',
    ],
    shots: [
      { src: SCREENS.reservationPrix, alt: 'Création d’une réservation : avion, créneau et prix estimé débité du solde' },
      { src: SCREENS.compteFactures, alt: 'Page Mon compte : historique des transactions et factures téléchargeables' },
    ],
  },
  {
    id: 'regles-du-club',
    title: 'Un calendrier qui applique les règles du club',
    intro: 'Le calendrier affiche une ligne par avion et une colonne par heure d’ouverture. Ce qui n’est pas permis est refusé, avec un message qui explique pourquoi.',
    points: [
      'Horaires d’ouverture, jours de fermeture et maintenance hebdomadaire réglés par le club.',
      'Un avion ne peut pas être réservé deux fois, ni un pilote être sur deux vols en même temps.',
      'Réserver seul demande une licence validée, valable jusqu’à la fin du vol et d’un type accepté par le club. Sinon, un instructeur est obligatoire.',
      'Un avion en maintenance ou immobilisé n’est pas réservable : la disponibilité est à jour pour tous les membres.',
    ],
    shots: [{ src: SCREENS.calendrier, alt: 'Calendrier des réservations : une ligne par avion, un avion indisponible signalé' }],
  },
  {
    id: 'plans-de-vol',
    title: 'Plans de vol et carnet de vol',
    intro: 'Le plan de vol se prépare à partir de la réservation. La clôture du vol remplit le carnet.',
    points: [
      'Génération automatique ou préparation manuelle : route sur la carte, journal de navigation, carburant, vent et météo des aérodromes.',
      'Plan de vol opérationnel (OFP) prêt à imprimer.',
      'Rappel la veille quand un vol n’a pas de plan ou que la route est incomplète.',
      'Clôturer le vol inscrit le temps de vol au carnet du pilote, aux heures de l’avion et à celles de l’instructeur. Carnet exportable en PDF.',
    ],
    shots: [
      { src: SCREENS.planDeVol, alt: 'Détail d’un plan de vol : aérodromes, météo, carburant estimé et carte de la route' },
      { src: SCREENS.planDeVolNavigation, alt: 'Profil vertical et journal de navigation d’un plan de vol' },
    ],
  },
  {
    id: 'flotte-maintenance',
    title: 'Flotte, maintenance et incidents',
    intro: 'L’état réel de chaque avion se voit dans le calendrier, et un avion qui ne doit pas voler ne peut pas être réservé.',
    points: [
      'Maintenances planifiées avec type, technicien, coût et documents ; l’avion est bloqué pendant la période.',
      'Une maintenance qui chevauche des réservations existantes est refusée : personne ne découvre le jour même que son avion est au hangar.',
      'Tout membre peut signaler un incident, à la clôture d’un vol ou à tout moment. Un incident de gravité élevée immobilise l’avion et prévient les membres qui l’ont réservé.',
      'Audits de sécurité avec modèles d’éléments à vérifier ; un audit non conforme immobilise aussi l’avion, jusqu’à sa remise en service.',
    ],
    shots: [
      { src: SCREENS.maintenance, alt: 'Liste des maintenances : avion, type, statut, période, technicien et coût' },
      { src: SCREENS.incidents, alt: 'Liste des incidents déclarés sur les avions, avec gravité et statut' },
    ],
  },
  {
    id: 'administration',
    title: 'Le bureau du club garde la main',
    intro: 'Les administrateurs règlent le club, tiennent les comptes et gardent une trace de leurs actions.',
    points: [
      'Finances : encaissements réels (carte, PayPal, espèces, chèques, virements), dépenses, revenus et coûts par avion, prévisions, export Excel.',
      'Écritures manuelles sur le compte d’un membre, avec mode de règlement et motif visibles par le membre.',
      'Correction ou suppression d’un vol clôturé, modification ou annulation de la réservation d’un membre : tout est inscrit au journal des actions.',
      'Membres invités par e-mail, rôles, désactivation d’un compte avec remboursement de ses réservations à venir.',
    ],
    shots: [{ src: SCREENS.finances, alt: 'Finances du club : revenus, dépenses et résultat net, avec leur évolution' }],
  },
  {
    id: 'instruction',
    title: 'L’instruction reliée aux réservations',
    tier: 'Offre Club + École',
    intro: 'Les instructeurs planifient leurs cours, réservent l’avion au nom de l’élève et suivent sa progression.',
    points: [
      'Vol avec instructeur : l’instructeur est prévenu et peut décliner ; l’élève est alors remboursé intégralement.',
      'Cours planifiés : l’avion réservé pour un cours est déplacé avec lui, prix recalculé.',
      'Compétences validées par l’instructeur, commentaires et note du cours par l’élève.',
      'E-learning (leçons en texte, vidéo et documents) et évaluations à choix unique avec score requis.',
    ],
    shots: [{ src: SCREENS.instructionCours, alt: 'Cours d’un instructeur : élèves, statut, compétences validées et notes' }],
  },
]

const EXTRAS = [
  { icon: BadgeCheck, title: 'Licences et rappels', text: 'Licences avec justificatifs, validées par un administrateur. Rappels 60, 30 et 7 jours avant l’expiration, et récapitulatif mensuel aux administrateurs.' },
  { icon: ClipboardCheck, title: 'Checklists avant vol', text: 'Modèles préparés par le club, cochés point par point par le pilote, enregistrés au fur et à mesure.' },
  { icon: LineChart, title: 'Finances', text: 'Encaissements, dépenses, coûts et revenus par avion, prévisions, rapport mensuel automatique et export Excel.' },
  { icon: History, title: 'Journal des actions', text: 'Qui a fait quoi et quand : écritures manuelles, rôles changés, réservations modifiées, vols corrigés, avions immobilisés…' },
  { icon: Bell, title: 'Notifications et e-mails', text: 'Réservation confirmée ou annulée, solde, licence qui expire, avion immobilisé, vol à clôturer. Chaque membre choisit s’il reçoit les e-mails.' },
  { icon: Newspaper, title: 'Actualités du club', text: 'Articles réservés aux membres, avec ajout à l’agenda pour les événements.' },
  { icon: ShieldCheck, title: 'Double authentification', text: 'Code à 6 chiffres d’une application d’authentification, en plus du mot de passe.' },
  { icon: Languages, title: 'Français et anglais', text: 'Chaque membre choisit sa langue, utilisée aussi pour ses e-mails.' },
  { icon: Smartphone, title: 'Sur téléphone', text: 'Pages adaptées au téléphone, et ajout à l’écran d’accueil sans passer par un magasin d’applications.' },
  { icon: BookOpenCheck, title: 'Rôles', text: 'Administrateur, pilote, instructeur, technicien : chacun ne voit que les pages de son rôle.' },
]

export function Features() {
  return (
    <section id="fonctionnalites" aria-labelledby="features-title" className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <h2 id="features-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Ce que SkyCrew fait pour votre club
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Les fonctions décrites ici sont celles de l’application telle qu’elle est aujourd’hui, illustrées par des captures réelles.
          </p>
        </div>

        <div className="mt-14 space-y-20 md:space-y-28">
          {BLOCKS.map((block, index) => (
            <article key={block.id} id={block.id} className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={cn(index % 2 === 1 && 'lg:order-2')}>
                {block.tier && (
                  <p className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{block.tier}</p>
                )}
                <h3 className="text-balance text-xl font-bold text-foreground sm:text-2xl">{block.title}</h3>
                <p className="mt-3 text-muted-foreground">{block.intro}</p>
                <ul className="mt-5 space-y-3">
                  {block.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-5">
                {block.shots.map((shot) => (
                  <Screenshot key={shot.alt} src={shot.src} alt={shot.alt} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <h3 className="mt-24 text-xl font-bold sm:text-2xl">Et aussi</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXTRAS.map((extra) => (
            <li key={extra.title} className="rounded-lg border border-border bg-white p-5">
              <extra.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mt-3 font-semibold">{extra.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{extra.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
