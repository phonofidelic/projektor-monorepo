import { authFetch } from '@/utils'
import { Project } from '@projektor/types'
import { Header } from '@projektor/ui'

type FetchProjectResponse = {
  project?: Project
}

type Props = {
  params: {
    slug: string
  }
  project: Project
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = params

  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects/${slug}`
  )

  const { project }: FetchProjectResponse = await response.json()

  if (!project) {
    return (
      <>
        <Header title="Oops!" />
        <div>
          <p>We could not find your project :(</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        <p>{project.description}</p>
      </div>
      <ul>
        {project.tasks &&
          project.tasks.map((task) => (
            <li key={task.id}>{task.description}</li>
          ))}
      </ul>
    </>
  )
}
