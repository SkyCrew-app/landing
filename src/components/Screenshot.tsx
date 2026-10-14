import Image, { type StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'

/** A real capture of the application, in a light window frame (desktop) or phone frame. */
export function Screenshot({
  src,
  alt,
  phone = false,
  priority = false,
  className,
  sizes,
}: {
  src: StaticImageData
  alt: string
  phone?: boolean
  priority?: boolean
  className?: string
  sizes?: string
}) {
  if (phone) {
    return (
      <div className={cn('overflow-hidden rounded-[1.75rem] border-[6px] border-slate-800 bg-slate-800 shadow-xl', className)}>
        <Image src={src} alt={alt} sizes={sizes ?? '(min-width: 1024px) 260px, 45vw'} className="h-auto w-full rounded-[1.25rem]" priority={priority} />
      </div>
    )
  }
  return (
    <figure className={cn('overflow-hidden rounded-xl border border-border bg-white shadow-xl shadow-slate-900/10', className)}>
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-3 py-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      </div>
      <Image src={src} alt={alt} sizes={sizes ?? '(min-width: 1024px) 640px, 100vw'} className="h-auto w-full" priority={priority} placeholder="blur" />
    </figure>
  )
}
