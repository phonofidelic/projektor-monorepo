import { authFetch } from '@/utils'
import { Project } from '@projektor/types'
import { Header } from '@projektor/ui'
import Link from 'next/link'
import React from 'react'

type FetchProjectResponse = {
  project?: Project
}

type Props = {
  params: {
    slug: string
  }
  children: React.ReactNode
}

export default async function ProjectsLayout({ params, children }: Props) {
  const { slug } = params

  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects/${slug}`
  )

  const { project }: FetchProjectResponse = await response.json()

  return (
    <div>
      <div className="sticky top-0 bg-white z-20">
        {project && (
          <Header title={project.title}>
            <Link href={'/projects/create'}>
              <button className="rounded border border-gray-200 hover:bg-gray-100 p-2">
                {'New project'.toUpperCase()}
              </button>
            </Link>
          </Header>
        )}
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {children}
      </div>
    </div>
  )
}
