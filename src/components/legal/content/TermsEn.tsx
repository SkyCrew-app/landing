import Link from 'next/link'
import { Fill, LegalPage, ScrollTable } from '@/components/legal/LegalPage'
import { legalFor } from '@/config/legal'
import { OFFER, TIERS } from '@/config/offer'
import { getDictionary } from '@/i18n'
import { pathOf, sectionHref } from '@/i18n/routes'
import { formatEuros } from '@/lib/pricing'

/** English translation of TermsFr (the French version prevails). */
export function TermsEn() {
  const LEGAL = legalFor('en')
  const t = getDictionary('en')
  return (
    <LegalPage lang="en" title={t.meta.terms.title} frenchHref={pathOf('fr', 'terms')}>
      <h2>1. Purpose</h2>
      <p>
        These terms of sale govern the subscription to the SkyCrew online service, flying club management software,
        entered into between <Fill>{LEGAL.companyName}</Fill> (“SkyCrew”) and the club that subscribes to it (“the
        Customer”), represented by the person who takes out the subscription and declares that they have the authority to
        bind it.
      </p>
      <p>
        The service is intended for flying clubs and other aviation organisations, associations or businesses. It is not
        offered to consumers acting in a personal capacity.
      </p>

      <h2>2. The service</h2>
      <p>
        SkyCrew provides the Customer with an online space dedicated to the club, accessible through a web browser,
        including the features of the chosen plan as described on the{' '}
        <Link href={sectionHref('en', 'features')}>presentation page</Link> on the date of subscription. SkyCrew may
        change the service; a change cannot remove an essential feature of the subscribed plan unless the Customer can
        cancel free of charge.
      </p>
      <p>
        SkyCrew is a management aid. Flight plans, weather, aeronautical data, fuel calculations and checklists are aids:
        the pilot in command remains responsible for preparing and conducting the flight (NOTAMs, official weather,
        documents, airworthiness), and the Customer remains responsible for operating its aircraft and for complying with
        regulations.
      </p>

      <h2>3. Subscription</h2>
      <p>
        The subscription is taken out on the website, by choosing the plan, the number of aircraft and the billing period,
        then paying on the payment page of our provider Stripe; or, when online payment is not offered, on request
        followed by an exchange with SkyCrew. Subscribing constitutes acceptance of these terms of sale, recorded by the
        checkbox provided for that purpose.
      </p>
      <p>After the subscription, SkyCrew creates the club’s space and sends the first administrator’s access to the e-mail address provided.</p>

      <h2>4. Prices</h2>
      <p>
        Prices are stated in euros excluding VAT; VAT at the applicable rate is added. The price of a period equals a flat
        fee per club plus an amount per declared aircraft, with a minimum of {OFFER.minAircraft}. Under the conditions
        displayed on the effective date above:
      </p>
      <ScrollTable label="Plan prices">
        <thead>
          <tr>
            <th scope="col">Plan</th>
            <th scope="col">Monthly flat fee excl. VAT</th>
            <th scope="col">Per aircraft per month excl. VAT</th>
          </tr>
        </thead>
        <tbody>
          {TIERS.map((tier) => (
            <tr key={tier.id}>
              <td>{t.tiers[tier.id].name}</td>
              <td>{formatEuros(tier.monthlyFlatCents, 'en')}</td>
              <td>{formatEuros(tier.monthlyPerAircraftCents, 'en')}</td>
            </tr>
          ))}
        </tbody>
      </ScrollTable>
      <p>
        The yearly subscription is billed at {OFFER.monthsBilledPerYear} times the monthly price. The applicable price is
        the one displayed at the time of subscription. The number of aircraft billed may be changed at the Customer’s
        request; the change applies pro rata according to Stripe’s rules or from the next period.
      </p>
      <p>
        SkyCrew may change its prices for future periods by informing the Customer by e-mail at least 30 days before the
        renewal concerned; a Customer who refuses the new price may cancel before that date.
      </p>

      <h2>5. Term, trial and renewal</h2>
      <p>
        The subscription is entered into for a period of one month or one year, as chosen by the Customer, and renews
        automatically for periods of the same length unless cancelled.
      </p>
      {OFFER.trialDays > 0 && (
        <p>
          Every subscription taken out online starts with a free trial period of {OFFER.trialDays} days: the payment method
          is registered, but no amount is charged before the end of the trial. Cancelling during the trial ends the
          subscription at no cost.
        </p>
      )}
      <p>
        Where the Customer is a non-professional (for example an association not acting for professional purposes),
        SkyCrew informs it in writing, no earlier than three months and no later than one month before the end of a
        yearly subscription, of the option not to renew it, in accordance with articles L. 215-1 and L. 215-3 of the
        French Consumer Code.
      </p>

      <h2>6. Payment and invoices</h2>
      <p>
        The price is payable in advance, at the start of each period (after the trial, where applicable), by bank card or
        any method offered on Stripe’s payment page. SkyCrew never has access to card data. Invoices are sent by e-mail
        and remain available from SkyCrew.
      </p>
      <p>
        If a payment fails, Stripe makes further attempts and the Customer is informed. If the payment is not settled
        within 15 days of that notice, SkyCrew may suspend access to the service until payment, after a final warning by
        e-mail.
      </p>

      <h2>7. Late payment</h2>
      <p>
        Where the Customer acts as a professional, any amount unpaid when due automatically bears late payment penalties
        equal to three times the French statutory interest rate, plus a fixed recovery fee of 40 euros, in accordance with
        articles L. 441-10 and D. 441-5 of the French Commercial Code. Where the Customer is a non-professional, unpaid
        amounts bear interest at the statutory rate after formal notice.
      </p>

      <h2>8. Cancellation</h2>
      <p>
        The Customer may cancel at any time, by e-mail to <Fill>{LEGAL.contactEmail}</Fill> or from the subscription
        management space when it is offered. Cancellation takes effect at the end of the current period, already paid,
        which is not refunded; no further payment is taken.
      </p>
      <p>
        SkyCrew may terminate the subscription in the event of a serious breach by the Customer (persistent non-payment,
        unlawful use or a threat to the security of the service), after formal notice that has remained without effect
        for 15 days, or at the end of a period with three months’ notice.
      </p>

      <h2>9. Availability, maintenance and backups</h2>
      <p>
        SkyCrew uses reasonable means to keep the service accessible at all times, without guaranteeing continuous
        availability (best-efforts obligation). Interruptions may occur for maintenance or updates; they are announced in
        advance where possible and preferably scheduled outside the clubs’ hours of activity.
      </p>
      <p>
        Backups of the club’s data: <Fill>{LEGAL.backups}</Fill>.
      </p>

      <h2>10. Support</h2>
      <p>
        <Fill>{LEGAL.support}</Fill>.
      </p>

      <h2>11. Club data and reversibility</h2>
      <p>
        The data entered in the club’s space belongs to the Customer. At the end of the subscription, and at the
        Customer’s request made no later than 30 days after that end, SkyCrew provides it free of charge with a copy of
        that data in a standard, readable format (CSV files or a database export), together with the supporting documents
        uploaded.
      </p>
      <p>
        After that period, or once the copy has been provided, the club’s space and its data are deleted; backup copies
        disappear at the end of their retention period. SkyCrew only keeps what the law requires it to keep (subscription
        invoices).
      </p>

      <h2>12. Personal data</h2>
      <p>
        For the data of the club’s members, the Customer is the controller and SkyCrew acts as processor, under article 28
        of the GDPR: SkyCrew processes that data only to provide the service and on the Customer’s instructions, ensures
        its confidentiality and security, uses the sub-processors listed in the{' '}
        <Link href={pathOf('en', 'privacy')}>privacy policy</Link>, helps the Customer respond to requests from
        individuals, informs it without delay of any personal data breach, and deletes or returns the data at the end of
        the subscription (article 11).
      </p>

      <h2>13. Members’ payments</h2>
      <p>
        Top-ups of members’ accounts by card or PayPal are collected on a Stripe or PayPal account opened in the
        Customer’s name, under those providers’ terms. SkyCrew is not a party to these payments and does not hold the
        members’ funds.
      </p>

      <h2>14. Liability</h2>
      <p>
        SkyCrew is bound by a best-efforts obligation. It is not liable for indirect damage (loss of revenue, of business,
        of opportunity), nor for the consequences of use of the service that does not comply with these terms, of an
        input error, of a flight decision or of unavailability caused by a third party (Internet access provider, payment
        provider, mapping or weather services). Except in the case of gross negligence or wilful misconduct, SkyCrew’s
        total liability is limited to the amounts paid by the Customer over the last twelve months.
      </p>
      <p>
        The Customer is responsible for the use of the service by its administrators and members, for the confidentiality
        of their access and for the accuracy of the data they enter (rates, licences, aircraft availability…).
      </p>

      <h2>15. Intellectual property</h2>
      <p>
        SkyCrew remains the owner of the software. The Customer and its members receive, for the duration of the
        subscription, a non-exclusive and non-transferable right to use the service for the club’s needs.
      </p>

      <h2>16. Changes to these terms</h2>
      <p>
        SkyCrew may change these terms of sale. The new terms are sent to the Customer by e-mail at least 30 days before
        they apply to its subscription; a Customer who refuses them may cancel before that date.
      </p>

      <h2>17. Governing law and disputes</h2>
      <p>
        These terms of sale are governed by French law. In the event of a dispute, the parties first seek an amicable
        solution. Failing that, where the Customer is a professional, the dispute is brought before{' '}
        <Fill>{LEGAL.court}</Fill>; in other cases, before the court with jurisdiction under the ordinary rules of law.
      </p>
    </LegalPage>
  )
}
