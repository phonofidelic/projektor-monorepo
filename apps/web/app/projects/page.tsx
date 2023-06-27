import { Project } from '@projektor/types'
import { Header } from '@projektor/ui'
import ProjectGridItem from '../../components/ProjectGridItem'

type FetchProjectsResponse = {
  projects?: Project[]
}

export default async function ProjectsPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects?limit=10`
  )

  const { projects }: FetchProjectsResponse = await response.json()

  if (!projects) {
    return 'No projects!'
  }

  return (
    <>
      <div className="sticky top-0 bg-white z-20">
        <Header title="Projects" />
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {projects.map((project) => (
          <ProjectGridItem project={project} />
        ))}
      </div>
    </>
  )
}
