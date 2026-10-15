import type { Dictionary } from '@/i18n'

/**
 * Texts of the site in English. Same keys and placeholders as src/i18n/fr.ts (checked by a unit
 * test). Same rule as in French: describe only what the application does today.
 */
const en: Dictionary = {
  meta: {
    siteTitle: 'SkyCrew – flying club management software',
    siteDescription:
      'SkyCrew is online software for flying clubs: bookings paid from members’ prepaid balance, fleet, maintenance, incidents, licences, flight plans, logbook and flight training.',
    ogImageAlt: 'SkyCrew, flying club management software: the booking calendar',
    start: { title: 'Get started', description: 'Choose the SkyCrew plan and the number of aircraft of your flying club.' },
    startThanks: { title: 'Subscription confirmed' },
    startCancelled: { title: 'Payment cancelled' },
    legalNotice: { title: 'Legal notice', description: 'Publisher, host and legal information about the SkyCrew website.' },
    terms: {
      title: 'Terms of sale',
      description: 'Terms of sale of the SkyCrew subscription for flying clubs.',
    },
    privacy: {
      title: 'Privacy and cookies',
      description: 'How SkyCrew handles personal data on this website and in the application, and which cookies are used.',
    },
    notFound: { title: 'Page not found' },
  },

  common: {
    skipLink: 'Skip to content',
    homeLabel: 'SkyCrew, home',
    backHome: 'Back to the home page',
    newTab: 'opens in a new tab',
  },

  header: {
    mainNav: 'Main navigation',
    nav: {
      features: 'Features',
      how: 'How it works',
      pricing: 'Pricing',
      faq: 'FAQ',
      contact: 'Contact',
    },
    login: 'Log in',
    cta: 'Get started',
    openMenu: 'Open the menu',
    closeMenu: 'Close the menu',
    language: 'Site language',
  },

  footer: {
    tagline: 'Online management software for flying clubs.',
    siteHeading: 'Website',
    features: 'Features',
    pricing: 'Pricing',
    faq: 'Frequently asked questions',
    contact: 'Contact',
    clubHeading: 'Your club',
    cta: 'Get started',
    login: 'Log in to SkyCrew',
    manage: 'Manage my subscription',
    legalHeading: 'Legal information',
    legalNotice: 'Legal notice',
    terms: 'Terms of sale',
    privacy: 'Privacy and cookies',
  },

  hero: {
    eyebrow: 'Flying club management software',
    title: 'Your flying club online, from booking to logbook',
    text: 'Members book an aircraft and pay for it from their prepaid balance. The club keeps track of its fleet, maintenance, licences and finances. Instructors follow their students’ progress. On a computer or on a phone.',
    pricingCta: 'See pricing',
    featuresCta: 'Explore the features',
    note: 'In English and French. Screenshots taken in the application, with demo data.',
    dashboardAlt: 'A pilot’s dashboard: airfield weather, upcoming bookings, recent flights and flight hours',
    phoneAlt: 'Booking calendar on a phone: free slots for each aircraft',
  },

  features: {
    title: 'What SkyCrew does for your club',
    intro: 'Everything described here is what the application does today, shown with real screenshots.',
    tierBadge: 'Club + School plan',
    blocks: {
      bookings: {
        id: 'bookings-and-balance',
        title: 'Bookings paid in advance, refunded to the cent',
        intro:
          'Every member has a prepaid account. The price of a flight is known before confirming, and a booking can never take the balance below zero.',
        points: [
          'Price = the aircraft’s hourly rate × the booked duration, shown before confirming and taken from the balance when booking.',
          'Change of aircraft or time: the price is recalculated and the difference is charged or refunded.',
          'Cancellation up to the start time: exactly the amount paid is credited back, free of charge.',
          'Top-up by card or PayPal, or a credit entered by an administrator for cash, cheques and bank transfers.',
          'A PDF invoice for every top-up and every booking, which the member can download.',
        ],
        shots: [
          'Creating a booking: aircraft, time slot and estimated price taken from the balance',
          'My account page: transaction history and downloadable invoices',
        ],
      },
      rules: {
        id: 'club-rules',
        title: 'A calendar that enforces the club’s rules',
        intro:
          'The calendar shows one row per aircraft and one column per opening hour. Anything not allowed is refused, with a message explaining why.',
        points: [
          'Opening hours, closing days and weekly maintenance set by the club.',
          'An aircraft cannot be booked twice, and a pilot cannot be on two flights at the same time.',
          'Booking solo requires an approved licence, valid until the end of the flight and of a type the club accepts. Otherwise an instructor is required.',
          'An aircraft under maintenance or grounded cannot be booked: availability is up to date for every member.',
        ],
        shots: ['Booking calendar: one row per aircraft, with an unavailable aircraft flagged'],
      },
      flightPlans: {
        id: 'flight-plans',
        title: 'Flight plans and logbook',
        intro: 'The flight plan is prepared from the booking. Closing the flight fills in the logbook.',
        points: [
          'Automatic generation or manual preparation: route on the map, navigation log, fuel, wind and airfield weather.',
          'Operational flight plan (OFP) ready to print.',
          'A reminder the day before when a flight has no plan or its route is incomplete.',
          'Closing the flight records the flight time in the pilot’s logbook, the aircraft’s hours and the instructor’s hours. The logbook can be exported as a PDF.',
        ],
        shots: [
          'Flight plan details: airfields, weather, estimated fuel and route map',
          'Vertical profile and navigation log of a flight plan',
        ],
      },
      fleet: {
        id: 'fleet-and-maintenance',
        title: 'Fleet, maintenance and incidents',
        intro:
          'The real status of every aircraft shows in the calendar, and an aircraft that must not fly cannot be booked.',
        points: [
          'Scheduled maintenance with type, technician, cost and documents; the aircraft is blocked for the whole period.',
          'Maintenance that overlaps existing bookings is refused: nobody finds out on the day that their aircraft is in the hangar.',
          'Any member can report an incident, when closing a flight or at any time. A high-severity incident grounds the aircraft and alerts the members who booked it.',
          'Safety audits with checklist templates; a failed audit also grounds the aircraft until it is returned to service.',
        ],
        shots: [
          'Maintenance list: aircraft, type, status, period, technician and cost',
          'Incidents reported on the aircraft, with severity and status',
        ],
      },
      admin: {
        id: 'administration',
        title: 'The committee stays in control',
        intro: 'Administrators set up the club, keep the accounts and have a record of their actions.',
        points: [
          'Finance: actual takings (card, PayPal, cash, cheques, bank transfers), expenses, revenue and costs per aircraft, forecasts, Excel export.',
          'Manual entries on a member’s account, with the payment method and reason visible to the member.',
          'Correcting or deleting a closed flight, changing or cancelling a member’s booking: everything is recorded in the action log.',
          'Members invited by e-mail, roles, deactivating an account with a refund of its upcoming bookings.',
        ],
        shots: ['Club finance: revenue, expenses and net result, with their trend'],
      },
      training: {
        id: 'training',
        title: 'Flight training linked to bookings',
        intro: 'Instructors schedule their sessions, book the aircraft in the student’s name and follow their progress.',
        points: [
          'Flight with an instructor: the instructor is notified and can decline, in which case the student is refunded in full.',
          'Scheduled sessions: the aircraft booked for a session moves with it, and the price is recalculated.',
          'Skills signed off by the instructor, with comments, and a rating of the session by the student.',
          'E-learning (lessons with text, video and documents) and single-choice assessments with a pass mark.',
        ],
        shots: ['An instructor’s sessions: students, status, skills signed off and ratings'],
      },
    },
    extrasTitle: 'And also',
    extras: {
      licences: {
        title: 'Licences and reminders',
        text: 'Licences with supporting documents, approved by an administrator. Reminders 60, 30 and 7 days before expiry, and a monthly summary for administrators.',
      },
      checklists: {
        title: 'Pre-flight checklists',
        text: 'Templates prepared by the club, ticked off item by item by the pilot and saved as they go.',
      },
      finance: {
        title: 'Finance',
        text: 'Takings, expenses, costs and revenue per aircraft, forecasts, an automatic monthly report and Excel export.',
      },
      actionLog: {
        title: 'Action log',
        text: 'Who did what and when: manual entries, role changes, edited bookings, corrected flights, grounded aircraft…',
      },
      notifications: {
        title: 'Notifications and e-mails',
        text: 'Booking confirmed or cancelled, balance, licence about to expire, aircraft grounded, flight to close. Each member decides whether to receive e-mails.',
      },
      news: { title: 'Club news', text: 'Members-only articles, with “add to calendar” for events.' },
      twoFactor: {
        title: 'Two-factor authentication',
        text: 'A 6-digit code from an authenticator app, on top of the password.',
      },
      languages: { title: 'English and French', text: 'Each member picks their language, which is also used for their e-mails.' },
      phone: {
        title: 'On a phone',
        text: 'Pages designed for phones, and “add to home screen” without going through an app store.',
      },
      roles: {
        title: 'Roles',
        text: 'Administrator, pilot, instructor, technician: everyone only sees the pages for their role.',
      },
    },
  },

  mobile: {
    title: 'At the clubhouse or on the apron, on a phone',
    text: 'On a phone, the calendar lists the free slots of each aircraft. Members book, top up their balance, check their flight plan and tick off their checklist from their pocket.',
    phones: {
      dashboard: { alt: 'Dashboard on a phone: weather and quick actions', caption: 'Dashboard' },
      calendar: { alt: 'Free slots of each aircraft on a phone', caption: 'Free slots' },
      account: { alt: 'Account balance and top-up on a phone', caption: 'Balance and top-up' },
      flightPlan: { alt: 'Flight plan on a phone: departure, arrival, weather and fuel', caption: 'Flight plan' },
    },
  },

  how: {
    title: 'How it works',
    steps: [
      {
        title: 'You choose your plan',
        text: 'Club or Club + School, based on the number of aircraft in your fleet, paid monthly or yearly.',
      },
      {
        title: 'We create your club’s space',
        text: 'Every club has its own space. We send you the first administrator’s access.',
      },
      {
        title: 'You set up the club',
        text: 'Opening hours, closing days, weekly maintenance, accepted licences. You add your aircraft and their hourly rates.',
      },
      {
        title: 'Your members join',
        text: 'You invite them by e-mail. They choose their password, top up their balance and book.',
      },
    ],
    note: 'There is no automatic data import today: aircraft are entered in the application and members are invited by e-mail.',
  },

  tiers: {
    club: {
      name: 'Club',
      summary: 'To manage bookings, the fleet and members.',
      features: [
        'Online bookings, paid from the member’s prepaid account',
        'PDF invoices for every top-up and every booking',
        'Fleet, maintenance, incidents and grounding of aircraft',
        'Safety audits',
        'Members, roles, licences and expiry reminders',
        'Flight plans (navigation log, weather, map)',
        'Flight closing and logbook',
        'Pre-flight checklists',
        'Club finance and Excel export',
        'Log of administrators’ actions',
        'Two-factor authentication, English and French, works on a phone',
      ],
    },
    'club-ecole': {
      name: 'Club + School',
      summary: 'For clubs that train student pilots.',
      features: [
        'Everything in the Club plan',
        'Instructor flights linked to bookings',
        'Sessions scheduled by instructors',
        'Student progress and skills signed off',
        'E-learning: courses, lessons and quizzes',
        'Assessments with a pass mark',
      ],
    },
  },

  pricing: {
    title: 'Pricing',
    intro: 'A monthly flat fee for the club, plus an amount per aircraft. The number of members does not affect the price.',
    perMonth: 'excl. VAT / month',
    perAircraft: '+ {price} excl. VAT per aircraft per month',
    yearly: 'Yearly: {months} months billed instead of 12.',
    choose: 'Choose the {tier} plan',
    trial: 'Online sign-up: {days}-day free trial, nothing is charged before the trial ends.',
    renewal: 'Monthly or yearly subscription, renewed automatically, can be cancelled for the end of the current period.',
    vatMention: 'Prices exclude VAT: VAT at the applicable rate is added to the invoice.',
  },

  offer: {
    tierLegend: 'Plan',
    tierPrice: '{flat} excl. VAT / month + {perAircraft} excl. VAT per aircraft',
    aircraftLabel: 'Number of aircraft',
    fewer: 'One aircraft fewer',
    more: 'One aircraft more',
    billingLegend: 'Billing',
    monthly: 'Monthly',
    monthlyHint: 'No commitment beyond the current month',
    yearly: 'Yearly',
    yearlyHint: '{months} months free',
    aircraftOne: '{count} aircraft',
    aircraftMany: '{count} aircraft',
    summary: '{tier}, {aircraft}, billed {cycle}',
    cycleMonthly: 'monthly',
    cycleYearly: 'yearly',
    perMonth: 'excl. VAT / month',
    perYear: 'excl. VAT / year',
    monthlyEquivalent: 'or {price} excl. VAT per month',
  },

  estimator: {
    title: 'Estimate the price for your club',
    tooManyBefore: 'Above {max} aircraft,',
    tooManyLink: 'write to us',
    tooManyAfter: 'and we will prepare the set-up with you.',
    cta: 'Continue with these choices',
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Do we need to install anything?',
        a: 'No. SkyCrew runs in the browser, on a computer, tablet or phone. On a phone, members can add it to their home screen.',
      },
      {
        q: 'How do members pay for their flights?',
        a: 'Every member has a prepaid balance. They top it up by card or PayPal, which requires a Stripe or PayPal account in the club’s name: the money goes straight to the club. The club can also credit a balance by hand for cash, cheque or bank transfer payments. The price of each booking is taken from the balance when booking.',
      },
      {
        q: 'Is the flight charged on the actual flight time?',
        a: 'No: members pay for the booked duration (the aircraft’s hourly rate × duration). If the flight changes before it starts, the member edits the booking and the difference is refunded to their balance.',
      },
      {
        q: 'Can we import our current data?',
        a: 'Not automatically today. Aircraft are entered in the application (registration, model, hourly rate, hours on the meter) and members are invited by e-mail.',
      },
      {
        q: 'What is the difference between Club and Club + School?',
        a: 'Club + School adds everything needed to train students: instructor flights, scheduled sessions, skills signed off, e-learning and assessments. The price per aircraft is the same.',
      },
      {
        q: 'Are there text messages (SMS)?',
        a: 'No. SkyCrew alerts members with in-app notifications and by e-mail.',
      },
    ],
    stop: {
      q: 'What happens if we stop?',
      a: 'The subscription ends at the end of the current period. Before your space is closed, we give you, on request, a copy of your club’s data. The details are in the',
      link: 'terms of sale',
      after: '.',
    },
    trial: {
      q: 'Do I pay during the trial?',
      withTrial:
        'No. When you sign up online, Stripe saves your card but nothing is charged for {days} days. If you cancel before the trial ends, you pay nothing.',
      withoutTrial: 'The first payment is taken when you sign up.',
    },
  },

  contact: {
    title: 'Any questions?',
    text: 'About the features, the set-up or pricing: write to us and we will reply by e-mail.',
    direct: 'Or directly at',
  },

  forms: {
    optional: '(optional)',
    fixFields: 'Some fields need to be corrected.',
    failed: 'Sending failed. Please try again in a few minutes.',
    offline: 'Unable to connect. Check your Internet connection and try again.',
    sending: 'Sending…',
    honeypot: 'Website',
  },

  contactForm: {
    label: 'Contact form',
    name: 'Your name',
    email: 'E-mail address',
    club: 'Club name',
    message: 'Message',
    privacyBefore: 'Your message and contact details are only used to reply to you. See the',
    privacyLink: 'privacy policy',
    submit: 'Send the message',
    sentTitle: 'Message sent.',
    sentText: 'Thank you, we will reply by e-mail.',
    another: 'Send another message',
  },

  startPage: {
    titleCheckout: 'Get started',
    titleRequest: 'Request a set-up',
    introCheckout:
      'Choose your plan, enter your club’s details, then pay for the subscription on Stripe’s payment page.',
    introRequest: 'Choose your plan and leave us your details: we will get back to you to create your club’s space.',
  },

  signup: {
    labelCheckout: 'Subscription',
    labelRequest: 'Set-up request',
    switched:
      'Online payment is not available at the moment. Send us your request and we will get back to you about the set-up.',
    offerHeading: '1. Your plan',
    clubHeading: '2. Your club',
    clubName: 'Club name',
    contactName: 'Your name',
    phone: 'Phone',
    email: 'E-mail address',
    emailHintCheckout: 'Invoices and the first administrator’s access will be sent there.',
    emailHintRequest: 'We will get back to you at this address.',
    message: 'Message',
    messageHint: 'Anything you would like to tell us: preferred date, questions…',
    summary: 'Summary',
    trial: '{days}-day trial: nothing is charged before the trial ends.',
    renewal: 'Renewed automatically, can be cancelled for the end of the current period.',
    afterPayment: 'After payment, we create your club’s space and send you the first administrator’s access.',
    acceptBefore: 'I accept the',
    acceptLink: 'terms of sale',
    acceptAfter: '(opens in a new tab) on behalf of the club I represent.',
    requestNote:
      'Online payment is not open yet: this request is sent to us, and we will get back to you about the set-up and billing. Nothing is charged at this stage.',
    consentBefore: 'I agree that SkyCrew may use this information to contact me about this request (see the',
    consentLink: 'privacy policy',
    consentAfter: ', opens in a new tab).',
    redirecting: 'Redirecting to payment…',
    toPayment: 'Continue to payment',
    request: 'Request a set-up',
    stripeNote: 'Payment takes place on Stripe’s secure page. Your card number is never sent to SkyCrew.',
    sentTitle: 'Request sent.',
    sentText: 'Thank you. We will contact you at {email} to prepare your club’s space. You have not been charged anything.',
  },

  thanks: {
    title: 'Thank you, your subscription is confirmed',
    club: 'Club:',
    tier: 'Plan:',
    access: 'We are creating your club’s space and will send the first administrator’s access',
    accessTo: 'to',
    receipts: 'Stripe e-mails you the receipt and the invoices.',
    trial: 'Nothing is charged during the {days}-day trial.',
    pendingTitle: 'Payment being checked',
    pendingText:
      'We could not confirm this payment from this page. If you received Stripe’s receipt by e-mail, your subscription is confirmed and we will be in touch. Otherwise, please write to us.',
    writeUs: 'Write to us',
  },

  cancelled: {
    title: 'Payment cancelled',
    text: 'You left the payment page: no subscription was created and nothing was charged.',
    resume: 'Resume the sign-up',
    ask: 'Ask a question',
  },

  notFound: {
    title: 'Page not found',
    text: 'This page does not exist or has moved.',
  },

  legal: {
    effectiveFrom: 'Effective from:',
    prevails:
      'This English translation is provided for convenience. The French version is the only legally binding one and prevails in case of any discrepancy:',
    prevailsLink: 'read the French version',
  },

  validation: {
    required: '{label} is required.',
    invalid: '{label} is invalid.',
    min: '{label} must be at least {min} characters long.',
    max: '{label} must not be longer than {max} characters.',
    labels: {
      name: 'Name',
      message: 'Message',
      clubName: 'Club name',
      contactName: 'Contact name',
    },
    emailRequired: 'E-mail address is required.',
    emailTooLong: 'The e-mail address is too long.',
    emailInvalid: 'Enter a valid e-mail address.',
    phoneTooLong: 'The phone number is too long.',
    phoneChars: 'The phone number may only contain digits, spaces and + . - ( ).',
    aircraftNumber: 'Enter a number of aircraft.',
    aircraftInteger: 'Enter a whole number of aircraft.',
    aircraftMin: 'At least {min} aircraft.',
    aircraftMax: 'Above {max} aircraft, please write to us.',
    tier: 'Choose a plan.',
    cycle: 'Choose monthly or yearly.',
    clubNameTooLong: 'The club name is too long.',
    messageTooLong: 'The message must not be longer than {max} characters.',
    consent: 'Tick the box so that we can contact you.',
    acceptCgv: 'Accept the terms of sale to continue.',
  },

  api: {
    tooMany: 'Too many submissions from your connection. Please try again in a few minutes.',
    unsupported: 'Unsupported request format.',
    tooLong: 'The message is too long.',
    invalid: 'Invalid request.',
    fixFields: 'Some fields need to be corrected.',
    notConfigured: 'Sending messages is not set up on this site yet. Please write to us directly by e-mail.',
    notDelivered: 'The message could not be delivered. Please try again in a few minutes.',
    stripeDisabled: 'Online payment is not available. Send us a set-up request instead.',
    checkoutFailed: 'The payment could not be prepared. Please try again in a few minutes or write to us.',
  },

  stripe: {
    flatLine: 'SkyCrew {tier} – {period} subscription',
    aircraftLine: 'SkyCrew {tier} – aircraft ({period})',
    monthly: 'monthly',
    yearly: 'yearly',
  },
}

export default en
