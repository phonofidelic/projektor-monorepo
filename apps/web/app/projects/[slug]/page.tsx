import { generateMockProjectsArray } from '@projektor/mocks'
import { Header } from '@projektor/ui'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

export default function ProjectDetailsPage({ params }: Props) {
  const { slug } = params
  const project = generateMockProjectsArray(10, { userId: 'testUser123' }).find(
    (project) => project.slug === slug
  )

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
      <Header title={project.title} />
      <ul>
        {project.tasks.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    </>
  )
}
