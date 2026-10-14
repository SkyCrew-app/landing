import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Paiement annulé',
  robots: { index: false },
}

export default function Annule() {
  return (
    <div className="container max-w-2xl py-16 md:py-24">
      <h1 className="text-3xl font-bold text-primary">Paiement annulé</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Vous avez quitté la page de paiement : aucun abonnement n’a été créé et rien n’a été débité.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/commencer">Reprendre la souscription</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/#contact">Poser une question</Link>
        </Button>
      </div>
    </div>
  )
}
