import { formRoute } from '@/lib/form-route'

export const runtime = 'nodejs'

export const POST = formRoute(
  'contact',
  (schemas) => schemas.contact,
  (data) => ({
    title: 'Message reçu depuis le formulaire de contact',
    replyTo: data.email,
    fields: [
      ['Nom', data.name],
      ['E-mail', data.email],
      ['Club', data.clubName],
    ],
    body: data.message,
  }),
)
