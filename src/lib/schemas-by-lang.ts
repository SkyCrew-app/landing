import { DEFAULT_LANG, type Lang } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { buildSchemas, type Schemas } from '@/lib/schemas'

const cache = new Map<Lang, Schemas>()

/** The form schemas with their messages in `lang` (server side: API routes and tests). */
export function schemasFor(lang: Lang = DEFAULT_LANG): Schemas {
  let schemas = cache.get(lang)
  if (!schemas) {
    schemas = buildSchemas(getDictionary(lang).validation)
    cache.set(lang, schemas)
  }
  return schemas
}
