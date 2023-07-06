'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  slug: string
}

export default function EditProjectButton({ slug }: Props) {
  const pathname = usePathname()

  if (pathname.includes('/edit')) {
    return null
  }

  return (
    <Link href={`/project/${slug}/edit`}>
      <button className="rounded border border-gray-200 hover:bg-gray-100 p-2">
        {'Edit project'.toUpperCase()}
      </button>
    </Link>
  )
}
