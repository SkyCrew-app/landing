import Link from 'next/link'
import { Fill, LegalPage, ScrollTable } from '@/components/legal/LegalPage'
import { legalFor } from '@/config/legal'
import { getDictionary } from '@/i18n'
import { pathOf } from '@/i18n/routes'

/** English translation of PrivacyFr (the French version prevails). */
export function PrivacyEn() {
  const LEGAL = legalFor('en')
  const processors: { name: string; role: string; data: string; where: string }[] = [
    { name: LEGAL.host.name, role: 'Hosting of the website, the application and its database', data: 'All application data', where: LEGAL.host.location },
    { name: LEGAL.emailProvider, role: 'Sending e-mails (invitation, password, notifications)', data: 'Name, e-mail address, content of the e-mails', where: '—' },
    { name: 'Stripe Payments Europe Ltd (Ireland)', role: 'Payment of the SkyCrew subscription; card top-ups of members’ accounts, on the club’s Stripe account', data: 'Name, e-mail, billing address, VAT number, payment data (processed by Stripe alone)', where: 'EU, possible transfers to the United States' },
    { name: 'PayPal (Europe) S.à r.l. et Cie, S.C.A. (Luxembourg)', role: 'PayPal top-ups of members’ accounts, on the club’s PayPal account', data: 'Amount, payer’s identity at PayPal', where: 'EU, possible transfers outside the EU' },
    { name: 'Mapbox Inc. (United States)', role: 'Display of flight plan maps (loaded by the browser)', data: 'IP address, technical browser data, map area viewed', where: 'United States' },
    { name: 'OpenWeather Ltd (United Kingdom)', role: 'Weather on the dashboard and in flight plans', data: 'Airfield coordinates; IP address when the browser queries the service', where: 'United Kingdom (adequacy decision)' },
    { name: 'aviationweather.gov (NOAA, United States)', role: 'Aviation weather observations (METAR), queried by the server', data: 'ICAO airfield codes, no personal data', where: 'United States' },
    { name: 'API Ninjas (United States)', role: 'Airfield search and weather, queried by the server', data: 'Airfield names or codes, no personal data', where: 'United States' },
    { name: 'OpenAIP', role: 'Aeronautical data (airfields, airspace), loaded by the browser', data: 'IP address, technical browser data', where: 'Germany' },
    { name: 'api-adresse.data.gouv.fr (French State)', role: 'Address suggestions when filling in the profile', data: 'Text of the address entered, IP address', where: 'France' },
    { name: 'YouTube (Google), “youtube-nocookie” mode', role: 'Playback of videos embedded in online courses', data: 'IP address, technical data, video playback', where: 'United States' },
  ]

  return (
    <LegalPage lang="en" title={getDictionary('en').meta.privacy.title} frenchHref={pathOf('fr', 'privacy')}>
      <p>
        This page explains which personal data is processed by this website and by the SkyCrew application, by whom, why
        and for how long, and how to exercise your rights.
      </p>

      <h2>1. Two different situations</h2>
      <ul>
        <li>
          <strong>On this website</strong> (contact and request forms, subscription), <Fill>{LEGAL.companyName}</Fill> is
          the controller.
        </li>
        <li>
          <strong>In a club’s SkyCrew application</strong>, the club is the controller of its members’ data. SkyCrew acts
          as processor: it hosts and processes that data on the club’s behalf and on its instructions. Members first
          contact their club to exercise their rights; SkyCrew forwards to the club any request it receives.
        </li>
      </ul>

      <h2>2. Data processed on this website</h2>
      <ScrollTable label="Data processed on this website">
        <thead>
          <tr>
            <th scope="col">Why</th>
            <th scope="col">Which data</th>
            <th scope="col">Legal basis</th>
            <th scope="col">Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Replying to a message (contact form)</td>
            <td>Name, e-mail, club name, message</td>
            <td>Legitimate interest in replying</td>
            <td>3 years after the last exchange</td>
          </tr>
          <tr>
            <td>Preparing a club’s set-up (request)</td>
            <td>Club name, name, e-mail, phone, plan, number of aircraft, message</td>
            <td>Pre-contractual measures at your request, and your consent ticked in the form</td>
            <td>3 years after the last exchange, unless you subscribe</td>
          </tr>
          <tr>
            <td>Managing the subscription and billing</td>
            <td>Club name, contact’s name and e-mail, phone, billing address, VAT number, payment history</td>
            <td>Performance of the contract; accounting obligations</td>
            <td>Duration of the subscription then 5 years; invoices 10 years</td>
          </tr>
          <tr>
            <td>Protecting the forms against abusive submissions</td>
            <td>IP address</td>
            <td>Legitimate interest (security)</td>
            <td>In memory only, a few minutes</td>
          </tr>
          <tr>
            <td>Server technical logs</td>
            <td>IP address, date, page requested</td>
            <td>Legitimate interest (security, proper operation)</td>
            <td><Fill>{LEGAL.logRetention}</Fill></td>
          </tr>
        </tbody>
      </ScrollTable>
      <p>
        Messages from the forms are sent to the publisher via <Fill>{LEGAL.notificationChannel}</Fill>. Card data is
        entered on Stripe’s payment page: it never passes through this website.
      </p>

      <h2>3. Data processed in the application, on behalf of the club</h2>
      <p>
        Depending on how the club uses it: members’ identity and contact details (name, e-mail, phone, address, date of
        birth, photo), role, licences and supporting documents, bookings, flight plans, flights and logbook, balance,
        transactions and invoices, incidents, checklists, training data (sessions, skills, assessments), notifications,
        preferences, log of administrators’ actions, and login data. This data is kept for the duration of the club’s
        subscription, then returned and deleted as set out in the <Link href={pathOf('en', 'terms')}>terms of sale</Link>.
      </p>
      <p>
        <strong>Sign-in log.</strong> Every attempt to sign in to the application, successful or not, and every sign-out
        are recorded in a log:
      </p>
      <ul>
        <li>
          <strong>Data</strong>: the account concerned (or, when no account matches, the e-mail address typed), date and
          time, IP address, device (browser, operating system, type of device) and result of the attempt. Never the
          password or the two-factor code typed.
        </li>
        <li>
          <strong>Purpose</strong>: the security of the accounts (spotting a suspicious sign-in or repeated attempts). The
          club’s administrators read the log; each member sees their own recent sign-ins in their profile.
        </li>
        <li>
          <strong>Legal basis</strong>: legitimate interest (security of the service).
        </li>
        <li>
          <strong>Retention</strong>: 6 months, then deleted automatically.
        </li>
      </ul>
      <p>Each club has its own space, separate from those of other clubs.</p>

      <h2>4. Processors and third-party services</h2>
      <ScrollTable label="Processors and third-party services">
        <thead>
          <tr>
            <th scope="col">Provider</th>
            <th scope="col">Role</th>
            <th scope="col">Data</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {processors.map((p) => (
            <tr key={p.role}>
              <td><Fill>{p.name}</Fill></td>
              <td>{p.role}</td>
              <td>{p.data}</td>
              <td><Fill>{p.where}</Fill></td>
            </tr>
          ))}
        </tbody>
      </ScrollTable>

      <h2>5. Transfers outside the European Union</h2>
      <p>
        Some of the providers above are located in the United States or may transfer data there (Stripe, PayPal, Mapbox,
        YouTube, API Ninjas, and the notification tool if it is a US service). These transfers rely on the EU–US Data
        Privacy Framework where the provider is certified under it, and otherwise on the European Commission’s standard
        contractual clauses. The United Kingdom benefits from an adequacy decision.
      </p>

      <h2>6. Cookies and local storage</h2>
      <p>
        <strong>This website</strong> does not set any cookies and does not use any audience measurement or advertising
        tool. Stripe’s payment page, on Stripe’s domain, uses its own cookies needed for payment and fraud prevention.
      </p>
      <p>
        <strong>The SkyCrew application</strong> only uses cookies and local storage needed for it to work, which do not
        require consent:
      </p>
      <ScrollTable label="Cookies and local storage of the application">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>token</td><td>Session cookie: keeps the member logged in</td><td>2 hours</td></tr>
          <tr><td>email</td><td>Cookie: the member’s login address, used by the session</td><td>2 hours</td></tr>
          <tr><td>two_factor_challenge</td><td>Cookie: two-factor authentication verification step</td><td>5 minutes</td></tr>
          <tr><td>skycrew-language</td><td>Local storage: chosen language (French or English)</td><td>Until cleared by the member</td></tr>
          <tr><td>theme</td><td>Local storage: light, dark or system theme</td><td>Until cleared by the member</td></tr>
        </tbody>
      </ScrollTable>
      <p>
        The services embedded in the application (Mapbox map, YouTube videos in “nocookie” mode, OpenAIP data and weather)
        are loaded by the browser and therefore receive the member’s IP address.
      </p>

      <h2>7. Security</h2>
      <p>
        Encrypted connections (HTTPS), passwords stored in hashed form, two-factor authentication offered to every member,
        access to pages according to role, and a log of administrators’ sensitive actions.
      </p>

      <h2>8. Your rights</h2>
      <p>
        You have the right to access, rectify, erase, restrict, object to and port your data, as well as the right to set
        instructions regarding what happens to it after your death. Where processing is based on your consent, you can
        withdraw it at any time.
      </p>
      <p>
        For this website’s data: write to <Fill>{LEGAL.contactEmail}</Fill>. For the application’s data: contact your
        club, or us and we will forward your request. You will receive a reply within one month.
      </p>
      <p>
        You can also lodge a complaint with the French data protection authority, the Commission nationale de
        l’informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07,{' '}
        <a href="https://www.cnil.fr/en/home" rel="noopener noreferrer">www.cnil.fr</a>.
      </p>
    </LegalPage>
  )
}
