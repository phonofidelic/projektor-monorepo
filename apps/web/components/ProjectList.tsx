'use client'
import { useQuery } from '@tanstack/react-query'
import { Project, ProjectStatus } from '@projektor/types'
import ProjectGridItem from './ProjectGridItem'
import { authFetch } from '@/utils'
import { useProjectsFilter } from '@/contexts/ProjectsFilterContext'

type FetchProjectsResponse = {
  projects?: Project[]
}

type Props = {
  initialProjects: Project[]
}

export default function ProjectList({ initialProjects }: Props) {
  const { statusFilter } = useProjectsFilter()
  const getProjects = async (statusFilter: ProjectStatus) => {
    const response = await authFetch(
      `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects?filter=${statusFilter}`
    )
    const { projects }: FetchProjectsResponse = await response.json()

    return projects
  }

  const { data: projects } = useQuery({
    queryKey: ['projects', statusFilter],
    queryFn: () => getProjects(statusFilter),
    initialData: initialProjects,
  })

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {!projects
        ? 'Your projects will live here'
        : projects.map((project) => (
            <ProjectGridItem key={project.id} project={project} />
          ))}
    </div>
  )
}
