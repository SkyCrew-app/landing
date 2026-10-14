import Link from 'next/link'
import { OFFER } from '@/config/offer'

const QUESTIONS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Faut-il installer quelque chose ?',
    a: 'Non. SkyCrew s’utilise dans le navigateur, sur ordinateur, tablette ou téléphone. Sur téléphone, les membres peuvent l’ajouter à leur écran d’accueil.',
  },
  {
    q: 'Comment les membres paient-ils leurs vols ?',
    a: 'Chaque membre a un solde prépayé. Il le recharge par carte ou PayPal, ce qui suppose un compte Stripe ou PayPal ouvert au nom du club : l’argent va directement au club. Le club peut aussi créditer un solde à la main pour un règlement en espèces, par chèque ou par virement. Le prix de chaque réservation est débité du solde au moment de réserver.',
  },
  {
    q: 'Le vol est-il facturé sur le temps de vol réel ?',
    a: 'Non : c’est la durée réservée qui est payée (tarif horaire de l’avion × durée). Si le vol change avant son début, le membre modifie sa réservation et la différence lui est remboursée sur son solde.',
  },
  {
    q: 'Pouvons-nous importer nos données actuelles ?',
    a: 'Pas automatiquement aujourd’hui. Les avions se saisissent dans l’application (immatriculation, modèle, tarif horaire, heures au compteur) et les membres sont invités par e-mail.',
  },
  {
    q: 'Quelle différence entre Club et Club + École ?',
    a: 'Club + École ajoute tout ce qui sert à former des élèves : vols avec instructeur, cours planifiés, compétences validées, e-learning et évaluations. Le prix par avion est le même.',
  },
  {
    q: 'Y a-t-il des SMS ?',
    a: 'Non. SkyCrew prévient les membres par des notifications dans l’application et par e-mail.',
  },
  {
    q: 'Que se passe-t-il si nous arrêtons ?',
    a: (
      <>
        L’abonnement s’arrête à la fin de la période en cours. Avant la fermeture de votre espace, nous vous remettons, sur
        demande, une copie des données de votre club. Le détail est dans les{' '}
        <Link className="text-primary underline" href="/cgv">
          conditions générales de vente
        </Link>
        .
      </>
    ),
  },
  {
    q: 'Est-ce que je paie pendant l’essai ?',
    a:
      OFFER.trialDays > 0
        ? `Non. À la souscription en ligne, votre carte est enregistrée par Stripe mais rien n’est prélevé pendant ${OFFER.trialDays} jours. Si vous résiliez avant la fin de l’essai, vous ne payez rien.`
        : 'Le premier paiement a lieu à la souscription.',
  },
]

export function Faq() {
  return (
    <section id="questions" aria-labelledby="faq-title" className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <h2 id="faq-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
          Questions fréquentes
        </h2>
        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-white">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm font-semibold">
                {item.q}
                <span className="text-xl leading-none text-primary transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="mt-3 text-muted-foreground">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
