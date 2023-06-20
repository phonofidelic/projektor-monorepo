import { Task, Project } from '@projektor/types'
import { faker } from '@faker-js/faker'

export const setSeed = faker.seed.bind(faker)

type GenerateMockTaskOptions = {
  userId?: string
}
export function generateMockTask({
  userId,
}: GenerateMockTaskOptions = {}): Task {
  return {
    id: faker.string.uuid(),
    userId: userId ?? faker.string.uuid(),
    projectId: 'project123',
    title: 'Random task',
    description: 'This is a mock task',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  }
}

type GenerateMockProjectOptions = {
  userId?: string
}
export function generateMockProject({
  userId: providedUserId,
}: GenerateMockProjectOptions = {}): Project {
  const userId = providedUserId ?? faker.string.uuid()

  return {
    id: faker.string.uuid(),
    userId,
    title: faker.company.catchPhrase(),
    description: 'This is a mock project',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    tasks: [generateMockTask({ userId })],
  }
}
