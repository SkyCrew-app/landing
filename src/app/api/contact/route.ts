import { formRoute } from '@/lib/form-route'
import { contactSchema } from '@/lib/schemas'

export const runtime = 'nodejs'

export const POST = formRoute('contact', contactSchema, (data) => ({
  title: 'Message reçu depuis le formulaire de contact',
  replyTo: data.email,
  fields: [
    ['Nom', data.name],
    ['E-mail', data.email],
    ['Club', data.clubName],
  ],
  body: data.message,
}))
