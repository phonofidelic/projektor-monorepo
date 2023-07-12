import { Task, Project } from '@projektor/types'
import { faker } from '@faker-js/faker'

export const setSeed = faker.seed.bind(faker)

type GenerateMockTaskOptions = {
  userId?: string
  projectId?: string
}
export function generateMockTask({
  userId,
  projectId,
}: GenerateMockTaskOptions = {}): Task {
  return {
    id: faker.string.uuid(),
    userId: userId ?? faker.string.uuid(),
    projectId: projectId ?? faker.string.uuid(),
    title: 'Random task',
    description: faker.git.commitMessage(),
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  }
}

type GenerateMockProjectOptions = {
  userId?: string
  taskCount?: number
  projectData?: Partial<Project>
}
export function generateMockProject({
  userId: providedUserId,
  taskCount,
  projectData = {},
}: GenerateMockProjectOptions = {}): Project {
  const userId = providedUserId ?? faker.string.uuid()
  const id = faker.string.uuid()

  const title = projectData.title ?? faker.company.catchPhrase()
  const slug = faker.helpers.slugify(title).toLowerCase()

  const tasks = []
  const count = taskCount ?? faker.helpers.rangeToNumber({ min: 0, max: 10 })
  for (let index = 0; index < count; index++) {
    tasks.push(generateMockTask({ userId, projectId: id }))
  }

  const refDate = faker.date.past()

  return {
    id,
    userId,
    title,
    slug,
    description: projectData.description ?? faker.hacker.phrase(),
    theme: faker.color.rgb(),
    createdAt: projectData.createdAt ?? refDate.toDateString(),
    updatedAt:
      projectData.updatedAt ?? faker.date.past({ refDate }).toDateString(),
    tasks,
    status: 'active',
  }
}

export function generateMockProjectsArray(
  length: number,
  options: GenerateMockProjectOptions = {}
) {
  return Array.from(Array(length === 0 ? 50 : length), (_, index) => {
    setSeed(index)
    return generateMockProject({ userId: options.userId })
  })
}
