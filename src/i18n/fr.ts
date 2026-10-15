/**
 * Texts of the site in French (default language). src/i18n/en.ts must have exactly the same keys
 * (a unit test checks it). `{name}` placeholders are filled by `fmt()` and must match too.
 * The legal pages are full documents: they live in src/components/legal/content/.
 */
const fr = {
  meta: {
    siteTitle: 'SkyCrew – logiciel de gestion d’aéroclub',
    siteDescription:
      'SkyCrew est le logiciel en ligne des aéroclubs : réservations payées sur le compte prépayé des membres, flotte, maintenance, incidents, licences, plans de vol, carnet de vol et instruction.',
    ogImageAlt: 'SkyCrew, le logiciel de gestion d’aéroclub : calendrier des réservations',
    start: { title: 'Équiper mon club', description: 'Choisissez l’offre SkyCrew et le nombre d’avions de votre aéroclub.' },
    startThanks: { title: 'Abonnement enregistré' },
    startCancelled: { title: 'Paiement annulé' },
    legalNotice: { title: 'Mentions légales', description: 'Éditeur, hébergeur et informations légales du site SkyCrew.' },
    terms: {
      title: 'Conditions générales de vente',
      description: 'Conditions générales de vente de l’abonnement SkyCrew pour les aéroclubs.',
    },
    privacy: {
      title: 'Confidentialité et cookies',
      description:
        'Comment SkyCrew traite les données personnelles du site et de l’application, et quels cookies sont utilisés.',
    },
    notFound: { title: 'Page introuvable' },
  },

  common: {
    skipLink: 'Aller au contenu',
    homeLabel: 'SkyCrew, accueil',
    backHome: 'Retour à l’accueil',
    newTab: 'nouvel onglet',
  },

  header: {
    mainNav: 'Navigation principale',
    nav: {
      features: 'Fonctionnalités',
      how: 'Comment ça marche',
      pricing: 'Tarifs',
      faq: 'Questions',
      contact: 'Contact',
    },
    login: 'Se connecter',
    cta: 'Équiper mon club',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    language: 'Langue du site',
  },

  footer: {
    tagline: 'Le logiciel de gestion en ligne des aéroclubs.',
    siteHeading: 'Le site',
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    faq: 'Questions fréquentes',
    contact: 'Contact',
    clubHeading: 'Votre club',
    cta: 'Équiper mon club',
    login: 'Se connecter à SkyCrew',
    manage: 'Gérer mon abonnement',
    legalHeading: 'Informations légales',
    legalNotice: 'Mentions légales',
    terms: 'Conditions générales de vente',
    privacy: 'Confidentialité et cookies',
  },

  hero: {
    eyebrow: 'Logiciel de gestion d’aéroclub',
    title: 'Votre aéroclub en ligne, de la réservation au carnet de vol',
    text: 'Les membres réservent un avion et le paient sur leur compte prépayé. Le club suit sa flotte, la maintenance, les licences et ses finances. Les instructeurs suivent leurs élèves. Sur ordinateur comme sur téléphone.',
    pricingCta: 'Voir les tarifs',
    featuresCta: 'Découvrir les fonctionnalités',
    note: 'En français et en anglais. Captures prises dans l’application, avec des données de démonstration.',
    dashboardAlt:
      'Tableau de bord d’un pilote : météo de l’aérodrome, prochaines réservations, vols récents et heures de vol',
    phoneAlt: 'Calendrier des réservations sur téléphone : créneaux libres de chaque avion',
  },

  features: {
    title: 'Ce que SkyCrew fait pour votre club',
    intro:
      'Les fonctions décrites ici sont celles de l’application telle qu’elle est aujourd’hui, illustrées par des captures réelles.',
    tierBadge: 'Offre Club + École',
    blocks: {
      bookings: {
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
          'Création d’une réservation : avion, créneau et prix estimé débité du solde',
          'Page Mon compte : historique des transactions et factures téléchargeables',
        ],
      },
      rules: {
        id: 'regles-du-club',
        title: 'Un calendrier qui applique les règles du club',
        intro:
          'Le calendrier affiche une ligne par avion et une colonne par heure d’ouverture. Ce qui n’est pas permis est refusé, avec un message qui explique pourquoi.',
        points: [
          'Horaires d’ouverture, jours de fermeture et maintenance hebdomadaire réglés par le club.',
          'Un avion ne peut pas être réservé deux fois, ni un pilote être sur deux vols en même temps.',
          'Réserver seul demande une licence validée, valable jusqu’à la fin du vol et d’un type accepté par le club. Sinon, un instructeur est obligatoire.',
          'Un avion en maintenance ou immobilisé n’est pas réservable : la disponibilité est à jour pour tous les membres.',
        ],
        shots: ['Calendrier des réservations : une ligne par avion, un avion indisponible signalé'],
      },
      flightPlans: {
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
          'Détail d’un plan de vol : aérodromes, météo, carburant estimé et carte de la route',
          'Profil vertical et journal de navigation d’un plan de vol',
        ],
      },
      fleet: {
        id: 'flotte-maintenance',
        title: 'Flotte, maintenance et incidents',
        intro:
          'L’état réel de chaque avion se voit dans le calendrier, et un avion qui ne doit pas voler ne peut pas être réservé.',
        points: [
          'Maintenances planifiées avec type, technicien, coût et documents ; l’avion est bloqué pendant la période.',
          'Une maintenance qui chevauche des réservations existantes est refusée : personne ne découvre le jour même que son avion est au hangar.',
          'Tout membre peut signaler un incident, à la clôture d’un vol ou à tout moment. Un incident de gravité élevée immobilise l’avion et prévient les membres qui l’ont réservé.',
          'Audits de sécurité avec modèles d’éléments à vérifier ; un audit non conforme immobilise aussi l’avion, jusqu’à sa remise en service.',
        ],
        shots: [
          'Liste des maintenances : avion, type, statut, période, technicien et coût',
          'Liste des incidents déclarés sur les avions, avec gravité et statut',
        ],
      },
      admin: {
        id: 'administration',
        title: 'Le bureau du club garde la main',
        intro: 'Les administrateurs règlent le club, tiennent les comptes et gardent une trace de leurs actions.',
        points: [
          'Finances : encaissements réels (carte, PayPal, espèces, chèques, virements), dépenses, revenus et coûts par avion, prévisions, export Excel.',
          'Écritures manuelles sur le compte d’un membre, avec mode de règlement et motif visibles par le membre.',
          'Correction ou suppression d’un vol clôturé, modification ou annulation de la réservation d’un membre : tout est inscrit au journal des actions.',
          'Membres invités par e-mail, rôles, désactivation d’un compte avec remboursement de ses réservations à venir.',
        ],
        shots: ['Finances du club : revenus, dépenses et résultat net, avec leur évolution'],
      },
      training: {
        id: 'instruction',
        title: 'L’instruction reliée aux réservations',
        intro: 'Les instructeurs planifient leurs cours, réservent l’avion au nom de l’élève et suivent sa progression.',
        points: [
          'Vol avec instructeur : l’instructeur est prévenu et peut décliner ; l’élève est alors remboursé intégralement.',
          'Cours planifiés : l’avion réservé pour un cours est déplacé avec lui, prix recalculé.',
          'Compétences validées par l’instructeur, commentaires et note du cours par l’élève.',
          'E-learning (leçons en texte, vidéo et documents) et évaluations à choix unique avec score requis.',
        ],
        shots: ['Cours d’un instructeur : élèves, statut, compétences validées et notes'],
      },
    },
    extrasTitle: 'Et aussi',
    extras: {
      licences: {
        title: 'Licences et rappels',
        text: 'Licences avec justificatifs, validées par un administrateur. Rappels 60, 30 et 7 jours avant l’expiration, et récapitulatif mensuel aux administrateurs.',
      },
      checklists: {
        title: 'Checklists avant vol',
        text: 'Modèles préparés par le club, cochés point par point par le pilote, enregistrés au fur et à mesure.',
      },
      finance: {
        title: 'Finances',
        text: 'Encaissements, dépenses, coûts et revenus par avion, prévisions, rapport mensuel automatique et export Excel.',
      },
      actionLog: {
        title: 'Journal des actions',
        text: 'Qui a fait quoi et quand : écritures manuelles, rôles changés, réservations modifiées, vols corrigés, avions immobilisés…',
      },
      notifications: {
        title: 'Notifications et e-mails',
        text: 'Réservation confirmée ou annulée, solde, licence qui expire, avion immobilisé, vol à clôturer. Chaque membre choisit s’il reçoit les e-mails.',
      },
      news: { title: 'Actualités du club', text: 'Articles réservés aux membres, avec ajout à l’agenda pour les événements.' },
      twoFactor: {
        title: 'Double authentification',
        text: 'Code à 6 chiffres d’une application d’authentification, en plus du mot de passe.',
      },
      languages: { title: 'Français et anglais', text: 'Chaque membre choisit sa langue, utilisée aussi pour ses e-mails.' },
      phone: {
        title: 'Sur téléphone',
        text: 'Pages adaptées au téléphone, et ajout à l’écran d’accueil sans passer par un magasin d’applications.',
      },
      roles: {
        title: 'Rôles',
        text: 'Administrateur, pilote, instructeur, technicien : chacun ne voit que les pages de son rôle.',
      },
    },
  },

  mobile: {
    title: 'Au club comme au parking avion, sur téléphone',
    text: 'Sur téléphone, le calendrier présente les créneaux libres de chaque avion. Les membres réservent, rechargent leur solde, consultent leur plan de vol et cochent leur checklist depuis leur poche.',
    phones: {
      dashboard: { alt: 'Tableau de bord sur téléphone : météo et actions rapides', caption: 'Tableau de bord' },
      calendar: { alt: 'Créneaux libres de chaque avion sur téléphone', caption: 'Créneaux libres' },
      account: { alt: 'Solde du compte et recharge sur téléphone', caption: 'Solde et recharge' },
      flightPlan: { alt: 'Plan de vol sur téléphone : départ, arrivée, météo et carburant', caption: 'Plan de vol' },
    },
  },

  how: {
    title: 'Comment ça marche',
    steps: [
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
    ],
    note: 'Il n’y a pas d’import automatique de données aujourd’hui : les avions se saisissent dans l’application et les membres sont invités par e-mail.',
  },

  tiers: {
    club: {
      name: 'Club',
      summary: 'Pour gérer les réservations, la flotte et les membres.',
      features: [
        'Réservations en ligne, payées sur le compte prépayé du membre',
        'Factures PDF pour chaque recharge et chaque réservation',
        'Flotte, maintenance, incidents et immobilisation des avions',
        'Audits de sécurité',
        'Membres, rôles, licences et rappels d’expiration',
        'Plans de vol (journal de navigation, météo, carte)',
        'Clôture des vols et carnet de vol',
        'Checklists avant vol',
        'Finances du club et export Excel',
        'Journal des actions des administrateurs',
        'Double authentification, français et anglais, utilisable sur téléphone',
      ],
    },
    'club-ecole': {
      name: 'Club + École',
      summary: 'Pour les clubs qui forment des élèves pilotes.',
      features: [
        'Tout ce que contient l’offre Club',
        'Vols avec instructeur liés aux réservations',
        'Cours planifiés par les instructeurs',
        'Progression des élèves et compétences validées',
        'E-learning : cours, leçons et quiz',
        'Évaluations avec score requis',
      ],
    },
  },

  pricing: {
    title: 'Tarifs',
    intro: 'Un forfait mensuel pour le club, plus un montant par avion. Le nombre de membres n’entre pas dans le prix.',
    perMonth: 'HT / mois',
    perAircraft: '+ {price} HT par avion et par mois',
    yearly: 'À l’année : {months} mois facturés au lieu de 12.',
    choose: 'Choisir l’offre {tier}',
    trial: 'Souscription en ligne : {days} jours d’essai gratuit, rien n’est prélevé avant la fin de l’essai.',
    renewal: 'Abonnement mensuel ou annuel, renouvelé automatiquement, résiliable pour la fin de la période en cours.',
    /**
     * VAT line shown under every price. TODO (owner): if your company is not liable for VAT
     * (franchise en base), replace it with « TVA non applicable, art. 293 B du CGI » (and the
     * English one in en.ts).
     */
    vatMention: 'Prix hors taxes : la TVA au taux en vigueur s’ajoute sur la facture.',
  },

  offer: {
    tierLegend: 'Offre',
    tierPrice: '{flat} HT / mois + {perAircraft} HT par avion',
    aircraftLabel: 'Nombre d’avions',
    fewer: 'Un avion de moins',
    more: 'Un avion de plus',
    billingLegend: 'Facturation',
    monthly: 'Mensuelle',
    monthlyHint: 'Sans engagement au-delà du mois en cours',
    yearly: 'Annuelle',
    yearlyHint: '{months} mois offerts',
    aircraftOne: '{count} avion',
    aircraftMany: '{count} avions',
    summary: '{tier}, {aircraft}, facturation {cycle}',
    cycleMonthly: 'mensuelle',
    cycleYearly: 'annuelle',
    perMonth: 'HT / mois',
    perYear: 'HT / an',
    monthlyEquivalent: 'soit {price} HT par mois',
  },

  estimator: {
    title: 'Estimer le prix pour votre club',
    tooManyBefore: 'Au-delà de {max} avions,',
    tooManyLink: 'écrivez-nous',
    tooManyAfter: 'pour préparer la mise en place.',
    cta: 'Continuer avec ces choix',
  },

  faq: {
    title: 'Questions fréquentes',
    items: [
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
    ],
    stop: {
      q: 'Que se passe-t-il si nous arrêtons ?',
      a: 'L’abonnement s’arrête à la fin de la période en cours. Avant la fermeture de votre espace, nous vous remettons, sur demande, une copie des données de votre club. Le détail est dans les',
      link: 'conditions générales de vente',
      after: '.',
    },
    trial: {
      q: 'Est-ce que je paie pendant l’essai ?',
      withTrial:
        'Non. À la souscription en ligne, votre carte est enregistrée par Stripe mais rien n’est prélevé pendant {days} jours. Si vous résiliez avant la fin de l’essai, vous ne payez rien.',
      withoutTrial: 'Le premier paiement a lieu à la souscription.',
    },
  },

  contact: {
    title: 'Une question ?',
    text: 'Sur les fonctions, la mise en place ou les tarifs : écrivez-nous, nous répondons par e-mail.',
    direct: 'Ou directement à',
  },

  forms: {
    optional: '(facultatif)',
    fixFields: 'Certains champs sont à corriger.',
    failed: 'L’envoi a échoué. Réessayez dans quelques minutes.',
    offline: 'Connexion impossible. Vérifiez votre accès à Internet et réessayez.',
    sending: 'Envoi…',
    honeypot: 'Site web',
  },

  contactForm: {
    label: 'Formulaire de contact',
    name: 'Votre nom',
    email: 'Adresse e-mail',
    club: 'Nom du club',
    message: 'Message',
    privacyBefore: 'Votre message et vos coordonnées servent uniquement à vous répondre. Voir la',
    privacyLink: 'politique de confidentialité',
    submit: 'Envoyer le message',
    sentTitle: 'Message envoyé.',
    sentText: 'Merci, nous vous répondons par e-mail.',
    another: 'Envoyer un autre message',
  },

  startPage: {
    titleCheckout: 'Équiper mon club',
    titleRequest: 'Demander la mise en place',
    introCheckout:
      'Choisissez votre offre, indiquez les coordonnées du club, puis réglez l’abonnement sur la page de paiement de Stripe.',
    introRequest:
      'Choisissez votre offre et laissez-nous vos coordonnées : nous vous recontactons pour créer l’espace de votre club.',
  },

  signup: {
    labelCheckout: 'Souscription',
    labelRequest: 'Demande de mise en place',
    switched:
      'Le paiement en ligne n’est pas disponible pour le moment. Envoyez-nous votre demande : nous vous recontactons pour la mise en place.',
    offerHeading: '1. Votre offre',
    clubHeading: '2. Votre club',
    clubName: 'Nom du club',
    contactName: 'Votre nom',
    phone: 'Téléphone',
    email: 'Adresse e-mail',
    emailHintCheckout: 'Les factures et l’accès du premier administrateur y seront envoyés.',
    emailHintRequest: 'Nous vous recontactons à cette adresse.',
    message: 'Message',
    messageHint: 'Ce que vous voulez nous dire : date souhaitée, questions…',
    summary: 'Récapitulatif',
    trial: '{days} jours d’essai : rien n’est prélevé avant la fin de l’essai.',
    renewal: 'Renouvellement automatique, résiliable pour la fin de la période en cours.',
    afterPayment: 'Après le paiement, nous créons l’espace de votre club et vous envoyons l’accès du premier administrateur.',
    acceptBefore: 'J’accepte les',
    acceptLink: 'conditions générales de vente',
    acceptAfter: '(nouvel onglet), au nom du club que je représente.',
    requestNote:
      'Le paiement en ligne n’est pas encore ouvert : cette demande nous est transmise, nous vous recontactons pour la mise en place et la facturation. Rien n’est facturé à cette étape.',
    consentBefore: 'J’accepte que SkyCrew utilise ces informations pour me recontacter au sujet de cette demande (voir la',
    consentLink: 'politique de confidentialité',
    consentAfter: ', nouvel onglet).',
    redirecting: 'Redirection vers le paiement…',
    toPayment: 'Continuer vers le paiement',
    request: 'Demander la mise en place',
    stripeNote: 'Le paiement se fait sur la page sécurisée de Stripe. Votre numéro de carte n’est jamais transmis à SkyCrew.',
    sentTitle: 'Demande envoyée.',
    sentText:
      'Merci. Nous vous recontactons à l’adresse {email} pour préparer l’espace de votre club. Rien ne vous a été facturé.',
  },

  thanks: {
    title: 'Merci, votre abonnement est enregistré',
    club: 'Club :',
    tier: 'Offre :',
    access: 'Nous créons l’espace de votre club et envoyons l’accès du premier administrateur',
    accessTo: 'à',
    receipts: 'Stripe vous envoie le reçu et les factures par e-mail.',
    trial: 'Rien n’est prélevé pendant les {days} jours d’essai.',
    pendingTitle: 'Paiement en cours de vérification',
    pendingText:
      'Nous n’avons pas pu confirmer ce paiement depuis cette page. Si vous avez reçu le reçu de Stripe par e-mail, votre abonnement est bien enregistré et nous vous recontactons. Sinon, écrivez-nous.',
    writeUs: 'Nous écrire',
  },

  cancelled: {
    title: 'Paiement annulé',
    text: 'Vous avez quitté la page de paiement : aucun abonnement n’a été créé et rien n’a été débité.',
    resume: 'Reprendre la souscription',
    ask: 'Poser une question',
  },

  notFound: {
    title: 'Page introuvable',
    text: 'Cette page n’existe pas ou a été déplacée.',
  },

  legal: {
    effectiveFrom: 'En vigueur à compter du :',
    /** Shown on top of the translated legal pages only (with a link to the French page); empty in French. */
    prevails: '',
    prevailsLink: '',
  },

  validation: {
    required: '{label} est obligatoire.',
    invalid: '{label} est invalide.',
    min: '{label} doit contenir au moins {min} caractères.',
    max: '{label} ne doit pas dépasser {max} caractères.',
    labels: {
      name: 'Le nom',
      message: 'Le message',
      clubName: 'Le nom du club',
      contactName: 'Le nom du contact',
    },
    emailRequired: 'L’adresse e-mail est obligatoire.',
    emailTooLong: 'L’adresse e-mail est trop longue.',
    emailInvalid: 'Saisissez une adresse e-mail valide.',
    phoneTooLong: 'Le numéro de téléphone est trop long.',
    phoneChars: 'Le numéro de téléphone ne doit contenir que des chiffres, espaces et + . - ( ).',
    aircraftNumber: 'Indiquez un nombre d’avions.',
    aircraftInteger: 'Indiquez un nombre entier d’avions.',
    aircraftMin: 'Au moins {min} avion.',
    aircraftMax: 'Au-delà de {max} avions, écrivez-nous.',
    tier: 'Choisissez une offre.',
    cycle: 'Choisissez mensuel ou annuel.',
    clubNameTooLong: 'Le nom du club est trop long.',
    messageTooLong: 'Le message ne doit pas dépasser {max} caractères.',
    consent: 'Cochez la case pour que nous puissions vous recontacter.',
    acceptCgv: 'Acceptez les conditions générales de vente pour continuer.',
  },

  api: {
    tooMany: 'Trop d’envois depuis votre connexion. Réessayez dans quelques minutes.',
    unsupported: 'Format de requête non pris en charge.',
    tooLong: 'Le message est trop long.',
    invalid: 'Requête invalide.',
    fixFields: 'Certains champs sont à corriger.',
    notConfigured: 'L’envoi de messages n’est pas encore configuré sur ce site. Écrivez-nous directement par e-mail.',
    notDelivered: 'Le message n’a pas pu être transmis. Réessayez dans quelques minutes.',
    stripeDisabled: 'Le paiement en ligne n’est pas disponible. Envoyez-nous une demande de mise en place.',
    checkoutFailed: 'Le paiement n’a pas pu être préparé. Réessayez dans quelques minutes ou écrivez-nous.',
  },

  stripe: {
    flatLine: 'SkyCrew {tier} – abonnement {period}',
    aircraftLine: 'SkyCrew {tier} – avion ({period})',
    monthly: 'mensuel',
    yearly: 'annuel',
  },
}

export default fr
