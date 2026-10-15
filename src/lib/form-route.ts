import { NextResponse } from 'next/server'
import type { z } from 'zod'
import { langOfRequest, type Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { jsonError, limitByIp, readJsonBody } from '@/lib/http'
import { NotifyNotConfiguredError, notifyOwner, type OwnerMessage } from '@/lib/notify'
import { HONEYPOT_FIELD, fieldErrors, type Schemas } from '@/lib/schemas'
import { schemasFor } from '@/lib/schemas-by-lang'
import { visitorLanguageField } from '@/lib/visitor-language'

/**
 * A public form posted to the owner: rate limit, honeypot, validation, then notification.
 * The visitor's language comes from `?lang=` on the URL (French by default): every answer is in
 * that language, the notification to the owner stays in French and says which language was used.
 * Nothing of the submitted data is logged.
 */
export function formRoute<S extends z.ZodTypeAny>(
  form: string,
  pickSchema: (schemas: Schemas) => S,
  toMessage: (data: z.infer<S>, lang: Lang) => OwnerMessage,
) {
  return async function POST(request: Request) {
    const lang = langOfRequest(request)
    const t = getDictionary(lang).api

    const limited = limitByIp(request, form, t)
    if (limited) return limited

    const parsed = await readJsonBody(request, t)
    if ('error' in parsed) return parsed.error

    // A filled-in hidden field means a bot: answer as if all went well, send nothing.
    const trap = parsed.body[HONEYPOT_FIELD]
    if (typeof trap === 'string' && trap.trim() !== '') return NextResponse.json({ ok: true })

    const result = pickSchema(schemasFor(lang)).safeParse(parsed.body)
    if (!result.success) {
      return jsonError(422, t.fixFields, { errors: fieldErrors(result.error) })
    }

    const message = toMessage(result.data, lang)
    try {
      await notifyOwner({ ...message, fields: [...message.fields, visitorLanguageField(lang)] })
    } catch (error) {
      if (error instanceof NotifyNotConfiguredError) {
        console.error(`${form}: ${error.message}`)
        return jsonError(503, t.notConfigured)
      }
      return jsonError(502, t.notDelivered)
    }
    return NextResponse.json({ ok: true })
  }
}
