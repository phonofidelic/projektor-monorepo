import { Button, Header } from '@projektor/ui'
import { generateMockProject, setSeed } from '@projektor/mocks'

export default function Page() {
  setSeed(1234)
  const project = generateMockProject({ userId: 'testUser123' })
  return (
    <>
      <Header text="Web" />
      <Button />
      <div>Project title: {project.title}</div>
      <div>userId: {project.userId}</div>
      <div>{project.tasks[0].userId}</div>
    </>
  )
}
