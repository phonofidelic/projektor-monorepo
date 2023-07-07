import React from 'react'
import { Project } from '@projektor/types'
import { Header } from '@projektor/ui'
import { authFetch } from '@/utils'
import EditProjectButton from '@/components/EditProjectButton'

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
      <div
        className="sticky top-0 bg-white z-20"
        style={{ borderBottom: `2px solid ${project?.theme || 'white'}` }}
      >
        {project && (
          <Header title={project.title}>
            <EditProjectButton slug={project.slug} />
          </Header>
        )}
      </div>
      <div className="m-aut">{children}</div>
    </div>
  )
}
