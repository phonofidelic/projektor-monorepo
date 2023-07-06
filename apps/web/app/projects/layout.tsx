import { Header } from '@projektor/ui'
import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function ProjectsLayout({ children }: Props) {
  return (
    <div>
      <div className="sticky top-0 bg-white z-20">
        <Header title="Projects">
          <Link href={'/projects/create'}>
            <button className="rounded border border-gray-200 hover:bg-gray-100 p-2">
              {'New project'.toUpperCase()}
            </button>
          </Link>
        </Header>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {children}
      </div>
    </div>
  )
}
