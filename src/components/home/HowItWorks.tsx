const STEPS = [
  {
    title: 'Vous choisissez votre offre',
    text: 'Club ou Club + École, selon le nombre d’avions de votre flotte, au mois ou à l’année.',
  },
  {
    title: 'Nous créons l’espace de votre club',
    text: 'Chaque club a son propre espace. Nous vous envoyons l’accès du premier administrateur.',
  },
  {
    title: 'Vous réglez le club',
    text: 'Horaires d’ouverture, jours de fermeture, maintenance hebdomadaire, licences acceptées. Vous ajoutez vos avions et leur tarif horaire.',
  },
  {
    title: 'Vos membres arrivent',
    text: 'Vous les invitez par e-mail. Ils choisissent leur mot de passe, rechargent leur solde et réservent.',
  },
]

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" aria-labelledby="how-title" className="py-16 md:py-24">
      <div className="container">
        <h2 id="how-title" className="text-balance text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
          Comment ça marche
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="relative rounded-lg border border-border bg-white p-6">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          Il n’y a pas d’import automatique de données aujourd’hui : les avions se saisissent dans l’application et les
          membres sont invités par e-mail.
        </p>
      </div>
    </section>
  )
}
