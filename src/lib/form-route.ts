import { NextResponse } from 'next/server'
import type { z } from 'zod'
import { jsonError, limitByIp, readJsonBody } from '@/lib/http'
import { NotifyNotConfiguredError, notifyOwner, type OwnerMessage } from '@/lib/notify'
import { HONEYPOT_FIELD, fieldErrors } from '@/lib/schemas'

/**
 * A public form posted to the owner: rate limit, honeypot, validation, then notification.
 * Nothing of the submitted data is logged.
 */
export function formRoute<S extends z.ZodTypeAny>(form: string, schema: S, toMessage: (data: z.infer<S>) => OwnerMessage) {
  return async function POST(request: Request) {
    const limited = limitByIp(request, form)
    if (limited) return limited

    const parsed = await readJsonBody(request)
    if ('error' in parsed) return parsed.error

    // A filled-in hidden field means a bot: answer as if all went well, send nothing.
    const trap = parsed.body[HONEYPOT_FIELD]
    if (typeof trap === 'string' && trap.trim() !== '') return NextResponse.json({ ok: true })

    const result = schema.safeParse(parsed.body)
    if (!result.success) {
      return jsonError(422, 'Certains champs sont à corriger.', { errors: fieldErrors(result.error) })
    }

    try {
      await notifyOwner(toMessage(result.data))
    } catch (error) {
      if (error instanceof NotifyNotConfiguredError) {
        console.error(`${form}: ${error.message}`)
        return jsonError(503, 'L’envoi de messages n’est pas encore configuré sur ce site. Écrivez-nous directement par e-mail.')
      }
      return jsonError(502, 'Le message n’a pas pu être transmis. Réessayez dans quelques minutes.')
    }
    return NextResponse.json({ ok: true })
  }
}
