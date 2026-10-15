import { NextResponse, type NextRequest } from 'next/server'
import { LANG_HEADER } from '@/i18n/config'

/**
 * Only tags requests under /en so that an unknown English URL gets the English "page not found".
 * No redirection of any kind: a URL always shows the same page, whatever the browser's language.
 */
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set(LANG_HEADER, 'en')
  return NextResponse.next({ request: { headers } })
}

export const config = { matcher: ['/en', '/en/:path*'] }
