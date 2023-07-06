import { Project } from '@projektor/types'
import { Header } from '@projektor/ui'
import ProjectGridItem from '../../components/ProjectGridItem'
import Link from 'next/link'
import { authFetch } from '@/utils'

type FetchProjectsResponse = {
  projects?: Project[]
}

export default async function ProjectsPage() {
  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects?limit=10`
  )

  const { projects }: FetchProjectsResponse = await response.json()

  if (!projects) {
    return 'Your projects will live here'
  }

  return projects.map((project) => <ProjectGridItem project={project} />)
}
