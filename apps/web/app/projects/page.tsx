import { Header } from '@projektor/ui'
import { generateMockProjectsArray } from '@projektor/mocks'
import ProjectGridItem from '../../components/ProjectGridItem'

export default function ProjectsPage() {
  const projects = generateMockProjectsArray(5, { userId: 'testUser123' })
  return (
    <>
      <Header title="Projects" />
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {projects.map((project) => (
          <ProjectGridItem project={project} />
        ))}
      </div>
    </>
  )
}
