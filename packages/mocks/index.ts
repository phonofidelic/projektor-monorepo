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
    description: 'This is a mock task',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  }
}

type GenerateMockProjectOptions = {
  userId?: string
  taskCount?: number
}
export function generateMockProject({
  userId: providedUserId,
  taskCount,
}: GenerateMockProjectOptions = {}): Project {
  const userId = providedUserId ?? faker.string.uuid()
  const id = faker.string.uuid()

  const title = faker.company.catchPhrase()
  const slug = faker.helpers.slugify(title).toLowerCase()

  const tasks = []
  const count = taskCount ?? faker.helpers.rangeToNumber({ min: 0, max: 10 })
  for (let index = 0; index < count; index++) {
    tasks.push(generateMockTask({ userId, projectId: id }))
  }

  return {
    id,
    userId,
    title,
    slug,
    description: 'This is a mock project',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    tasks,
  }
}

export function generateMockProjectsArray(
  length: number,
  options: GenerateMockProjectOptions = {}
) {
  return Array.from(Array(length), (_, index) => {
    setSeed(index)
    return generateMockProject({ userId: options.userId })
  })
}
