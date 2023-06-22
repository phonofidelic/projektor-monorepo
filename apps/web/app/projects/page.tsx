import { Header } from '@projektor/ui'
import { generateMockProjectsArray } from '@projektor/mocks'
import ProjectGridItem from '../../components/ProjectGridItem'

export default function ProjectsPage() {
  const projects = generateMockProjectsArray(10, { userId: 'testUser123' })
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
