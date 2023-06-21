import { Button, Header } from '@projektor/ui'
import { generateMockProject, setSeed } from '@projektor/mocks'

export default function Page() {
  setSeed(123)
  const project = generateMockProject({ userId: 'testUser123' })
  return (
    <>
      <Header title="Projects" />
      <div>Project title: {project.title}</div>
      <div>userId: {project.userId}</div>
      <div>{project.tasks[0]?.userId}</div>
    </>
  )
}
