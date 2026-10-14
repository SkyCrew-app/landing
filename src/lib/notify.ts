import nodemailer from 'nodemailer'

/**
 * Sends a message to the owner: to a webhook (Discord-compatible JSON `{ content }`) when
 * OWNER_NOTIFY_WEBHOOK_URL is set, and by e-mail when SMTP_HOST and OWNER_NOTIFY_EMAIL are set.
 * Server side only: these variables never reach the browser.
 */

export interface OwnerMessage {
  /** Short title, also the e-mail subject. */
  title: string
  /** Label / value pairs; empty values are left out. */
  fields: [string, string | number | null | undefined][]
  /** Free text (message of the visitor), shown after the fields. */
  body?: string
  /** E-mail address the owner can reply to. */
  replyTo?: string
}

export class NotifyNotConfiguredError extends Error {
  constructor() {
    super('No owner notification channel is configured (OWNER_NOTIFY_WEBHOOK_URL or SMTP).')
  }
}

const DISCORD_LIMIT = 2000

export function formatMessage(message: OwnerMessage): string {
  const lines = [`**${message.title}**`]
  for (const [label, value] of message.fields) {
    if (value === undefined || value === null || value === '') continue
    lines.push(`${label} : ${value}`)
  }
  if (message.body) lines.push('', message.body)
  const text = lines.join('\n')
  return text.length > DISCORD_LIMIT ? `${text.slice(0, DISCORD_LIMIT - 1)}…` : text
}

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.OWNER_NOTIFY_EMAIL)
}

export function notificationsConfigured() {
  return Boolean(process.env.OWNER_NOTIFY_WEBHOOK_URL) || smtpConfigured()
}

async function sendWebhook(url: string, content: string) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // allowed_mentions stops a visitor's text from pinging @everyone on Discord.
    body: JSON.stringify({ content, allowed_mentions: { parse: [] } }),
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error(`Owner webhook answered ${response.status}`)
}

async function sendMail(message: OwnerMessage, text: string) {
  const port = Number(process.env.SMTP_PORT || 587)
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
  })
  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.OWNER_NOTIFY_EMAIL,
    to: process.env.OWNER_NOTIFY_EMAIL,
    replyTo: message.replyTo,
    subject: `[SkyCrew] ${message.title}`,
    text: text.replace(/\*\*/g, ''),
  })
}

/**
 * Delivers the message on every configured channel. Succeeds when at least one channel
 * accepted it; throws when none is configured or all of them failed.
 */
export async function notifyOwner(message: OwnerMessage): Promise<void> {
  if (!notificationsConfigured()) throw new NotifyNotConfiguredError()
  const text = formatMessage(message)
  const attempts: Promise<void>[] = []
  if (process.env.OWNER_NOTIFY_WEBHOOK_URL) attempts.push(sendWebhook(process.env.OWNER_NOTIFY_WEBHOOK_URL, text))
  if (smtpConfigured()) attempts.push(sendMail(message, text))
  const results = await Promise.allSettled(attempts)
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected')
  for (const failure of failures) {
    // Only the error, never the message content (it holds the visitor's personal data).
    console.error('Owner notification failed:', failure.reason instanceof Error ? failure.reason.message : failure.reason)
  }
  if (failures.length === results.length) throw new Error('Every owner notification channel failed')
}
