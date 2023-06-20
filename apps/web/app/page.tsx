import { Button, Header } from '@projektor/ui'
import { generateProject } from '@projektor/mocks'

export default function Page() {
  const project = generateProject()
  return (
    <>
      <Header text="Web" />
      <Button />
      <div>{project.title}</div>
    </>
  )
}
