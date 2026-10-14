import Image from 'next/image'
import { cn } from '@/lib/utils'
import icon from '@/app/icon.png'

/** The product's icon (white plane on navy), as in the application. */
export function Logo({ className }: { className?: string }) {
  return <Image src={icon} alt="" width={32} height={32} className={cn('rounded-md', className)} priority />
}
