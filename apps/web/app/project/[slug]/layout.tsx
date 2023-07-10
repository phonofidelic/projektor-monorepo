import { Project } from '@projektor/types'
import { Header } from '@projektor/ui'
import { authFetch } from '@/utils'
import ProjectOptionsMenu from '@/components/ProjectOptionsMenu'
import BackButton from '@/components/BackButton'

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
          <Header
            title={project.title}
            backButton={<BackButton pushUrl="/projects" />}
          >
            <ProjectOptionsMenu project={project} />
          </Header>
        )}
      </div>
      <div className="m-aut">{children}</div>
    </div>
  )
}
