import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Conditions d&apos;utilisation</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptation des conditions</h2>
          <p className="mb-4">
            En utilisant SkyCrew, vous acceptez d&apos;être lié par ces conditions d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser notre service.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">2. Description du service</h2>
          <p className="mb-4">
            SkyCrew est une plateforme de gestion d&apos;aéroclub qui offre des fonctionnalités telles que la gestion de flotte, la réservation d&apos;avions, le suivi des membres et la facturation.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">3. Responsabilités de l&apos;utilisateur</h2>
          <p className="mb-4">
            Vous êtes responsable de maintenir la confidentialité de votre compte et de toutes les activités qui s&apos;y déroulent. Vous vous engagez à utiliser le service conformément à toutes les lois et réglementations applicables.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">4. Modifications du service</h2>
          <p className="mb-4">
            Nous nous réservons le droit de modifier ou d&apos;interrompre le service à tout moment, avec ou sans préavis.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">5. Limitation de responsabilité</h2>
          <p className="mb-4">
            SkyCrew ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le service.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
