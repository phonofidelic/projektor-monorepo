import { authFetch } from '@/utils'
import { Project } from '@projektor/types'
import { Header } from '@projektor/ui'
import { notFound } from 'next/navigation'

type FetchProjectResponse = {
  project?: Project
}

type Props = {
  params: {
    slug: string
  }
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = params

  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects/${slug}`
  )

  console.log('*** response', response)

  const { project }: FetchProjectResponse = await response.json()

  if (!project) {
    notFound()
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
