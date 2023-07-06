import EditProjectForm from '@/components/EditProjectForm'
import { authFetch } from '@/utils'
import { Project } from '@projektor/types'
import React from 'react'

type FetchProjectResponse = {
  project?: Project
}

type Props = {
  params: {
    slug: string
  }
}

export default async function EditProjectPage({ params }: Props) {
  const { slug } = params

  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects/${slug}`
  )
  const { project }: FetchProjectResponse = await response.json()

  return <EditProjectForm project={project} />
}
