import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Politique de confidentialité</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold mt-6 mb-4">1. Collecte d&apos;informations</h2>
          <p className="mb-4">
            Nous collectons des informations lorsque vous vous inscrivez sur notre site, vous connectez à votre compte, effectuez une réservation ou remplissez un formulaire.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">2. Utilisation des informations</h2>
          <p className="mb-4">
            Les informations que nous collectons sont utilisées pour personnaliser votre expérience, améliorer notre site web, améliorer le service client et traiter les transactions.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">3. Protection des informations</h2>
          <p className="mb-4">
            Nous mettons en œuvre diverses mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">4. Divulgation à des tiers</h2>
          <p className="mb-4">
            Nous ne vendons, n&apos;échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela n&apos;inclut pas les tierces parties de confiance qui nous aident à exploiter notre site web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">5. Consentement</h2>
          <p className="mb-4">
            En utilisant notre site, vous consentez à notre politique de confidentialité.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
