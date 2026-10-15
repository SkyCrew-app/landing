# SkyCrew – site de présentation

Site public de SkyCrew (Next.js 15, React 19, Tailwind) : présentation du produit, tarifs, souscription
d’un club par Stripe Checkout (ou demande de mise en place quand Stripe n’est pas configuré), formulaire
de contact et pages légales.

## À compléter avant la mise en ligne

1. **Prix** : `src/config/offer.ts` (offres, forfait, prix par avion, essai, mention de TVA). Les montants
   actuels sont provisoires.
2. **Informations légales** : `src/config/legal.ts`. Chaque valeur `[À COMPLÉTER : …]` s’affiche telle quelle,
   surlignée, sur `/mentions-legales`, `/cgv` et `/confidentialite` et leurs versions anglaises ; les valeurs
   rédigées (sauvegardes, support, durées…) sont aussi à remplir en anglais dans `LEGAL_EN_TEXT` (`[TO COMPLETE: …]`).
3. **Variables d’environnement** : voir `.env.example` et ci-dessous.

## Langues

Le français reste la langue par défaut, à ses adresses habituelles ; l’anglais est sous `/en` :

| Français | Anglais |
|---|---|
| `/` | `/en` |
| `/commencer` (`/merci`, `/annule`) | `/en/get-started` (`/thank-you`, `/cancelled`) |
| `/mentions-legales` | `/en/legal-notice` |
| `/cgv` | `/en/terms` |
| `/confidentialite` | `/en/privacy` |

- Les textes sont dans `src/i18n/fr.ts` et `src/i18n/en.ts` (mêmes clés, vérifiées par un test). Les pages
  légales sont des documents à part : `src/components/legal/content/` (la version anglaise renvoie à la française,
  qui fait foi).
- Les adresses de chaque page dans les deux langues sont dans `src/i18n/routes.ts` : le sélecteur FR / EN de l’en-tête,
  les liens `hreflang`, les URL canoniques et le sitemap s’en servent.
- Aucune redirection selon la langue du navigateur : une adresse affiche toujours la même page.
- Les formulaires envoient `?lang=` aux routes `/api/*`, qui répondent dans cette langue ; Stripe Checkout s’ouvre
  dans la langue du visiteur et y revient. Les notifications au propriétaire restent en français et indiquent
  « Langue du visiteur ».

## Développement

```bash
npm ci
cp .env.example .env.local   # puis remplir
npm run dev                  # http://localhost:3000
npm test                     # tests unitaires (prix, Stripe, webhook, formulaires)
npm run build && npm start   # version de production
```

## Variables d’environnement

| Variable | Où | Rôle |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | construction | Adresse publique du site (liens canoniques, sitemap, retours Stripe) |
| `NEXT_PUBLIC_APP_URL` | construction | Adresse de l’application ; vide = lien « Se connecter » masqué |
| `NEXT_PUBLIC_STRIPE_PORTAL_LOGIN_URL` | construction | Lien de connexion au portail client Stripe ; vide = lien masqué |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | exécution | Les deux sont nécessaires pour proposer le paiement en ligne. Sinon `/commencer` affiche le formulaire « Demander la mise en place » et `POST /api/checkout` répond 503 |
| `STRIPE_AUTOMATIC_TAX` ou `STRIPE_TAX_RATE_ID` | exécution | TVA : Stripe Tax (`true`) ou un taux fixe créé dans Stripe (`txr_…`). Aucun des deux = aucune TVA ajoutée |
| `STRIPE_PRICE_<OFFRE>_<PÉRIODE>_<PARTIE>` | exécution | Facultatif : ids de prix Stripe (8 variables, voir `.env.example`). Sinon les prix viennent de `src/config/offer.ts` |
| `OWNER_NOTIFY_WEBHOOK_URL` | exécution | Webhook recevant `{"content": "…"}` (un webhook de salon Discord convient) |
| `OWNER_NOTIFY_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` | exécution | Copie des notifications par e-mail, si `SMTP_HOST` et `OWNER_NOTIFY_EMAIL` sont renseignés |

Les variables `NEXT_PUBLIC_*` sont figées **à la construction** : reconstruire après les avoir changées.
Les autres sont lues à l’exécution et ne quittent jamais le serveur. Il faut au moins un canal de
notification (webhook ou SMTP), sinon les formulaires répondent que l’envoi n’est pas configuré.

## Déploiement

Le site est une application Node (pas un export statique) : il a des routes serveur (`/api/*`) et la page
`/commencer` est rendue à chaque requête.

### Sur un hôte Node (VPS, PaaS)

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://www.exemple.fr NEXT_PUBLIC_APP_URL=https://app.exemple.fr npm run build
PORT=3000 npm start   # avec les variables serveur dans l’environnement
```

Placer un proxy HTTPS devant (nginx, Caddy). Le proxy doit **remplacer** l’en-tête `X-Forwarded-For` par
l’adresse du visiteur (nginx : `proxy_set_header X-Forwarded-For $remote_addr;`) : la limite d’envois des
formulaires s’en sert. Cette limite est en mémoire : elle repart à zéro au redémarrage et n’est pas
partagée entre plusieurs instances.

### Avec Docker

Exemple de `Dockerfile` (non fourni dans le dépôt) :

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_STRIPE_PORTAL_LOGIN_URL
RUN npm run build && npm prune --omit=dev

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "start"]
```

Puis `docker run -p 127.0.0.1:3000:3000 --env-file .env.production image`.

## Mise en place de Stripe

1. **Compte** : activer le compte Stripe (informations de la société, IBAN). Tester d’abord avec les clés
   de test (`sk_test_…`).
2. **TVA** : soit activer Stripe Tax et mettre `STRIPE_AUTOMATIC_TAX=true`, soit créer un taux de taxe
   (TVA 20 %, *exclusive*) et mettre son id dans `STRIPE_TAX_RATE_ID`.
3. **Produits et prix** (facultatif) : sans rien créer, le site envoie les prix de `src/config/offer.ts` à
   Stripe à chaque souscription. Pour les gérer dans Stripe, créer pour chaque offre et chaque période
   deux prix récurrents (forfait ; par avion) et renseigner les 8 variables `STRIPE_PRICE_…`, en gardant
   les mêmes montants que dans `offer.ts` (le site affiche ceux d’`offer.ts`).
4. **Webhook** : Développeurs › Webhooks › Ajouter un point de terminaison
   `https://<votre site>/api/stripe/webhook`, avec les événements `checkout.session.completed`,
   `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`,
   `invoice.payment_failed`. Copier le secret de signature (`whsec_…`) dans `STRIPE_WEBHOOK_SECRET`.
   Si la notification au propriétaire échoue, la route répond 500 et Stripe renvoie l’événement plus tard.
   Test en local : `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
5. **Portail client** : Paramètres › Facturation › Portail client : autoriser la résiliation (à la fin de
   la période) et la mise à jour du moyen de paiement, activer le **lien de connexion** et le mettre dans
   `NEXT_PUBLIC_STRIPE_PORTAL_LOGIN_URL`. Stripe envoie alors un code à l’adresse de l’abonné : aucun
   accès au compte ne passe par ce site.
6. **E-mails Stripe** : activer l’envoi des reçus et des factures aux clients, et les rappels avant
   renouvellement.

Après une souscription, le propriétaire reçoit un message « Nouvel abonnement… : espace club à mettre en
place » et crée l’espace du club à la main.

## Captures d’écran

Les images de `public/screens/` sont des captures de l’application avec les données de démonstration
(thème clair, ordinateur 1440 × 900 et téléphone 390 × 844), en français et, avec le suffixe `-en`, avec
l’application passée en anglais pour les pages anglaises. Les refaire quand les écrans changent, et mettre à jour
`src/lib/screens.ts` si les noms changent. L’image de partage anglaise est `src/app/en/opengraph-image.png`.
