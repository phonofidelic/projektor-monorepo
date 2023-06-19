import { Button, Header } from 'ui'
import { generateProject } from 'mocks'

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
