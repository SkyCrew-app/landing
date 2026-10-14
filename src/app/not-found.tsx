import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container max-w-2xl py-20">
      <h1 className="text-3xl font-bold text-primary">Page introuvable</h1>
      <p className="mt-4 text-muted-foreground">Cette page n’existe pas ou a été déplacée.</p>
      <Button asChild className="mt-8">
        <Link href="/">Retour à l’accueil</Link>
      </Button>
    </div>
  )
}
