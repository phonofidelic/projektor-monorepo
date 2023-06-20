import { Task, Project } from '@projektor/types'

export function generateTask(): Task {
  return {
    id: 'task123',
    userId: 'user123',
    projectId: 'project123',
    title: 'Random task',
    description: 'This is a mock task',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  }
}

export function generateProject(): Project {
  return {
    id: 'project123',
    userId: 'user123',
    title: 'Random project',
    description: 'This is a mock project',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    tasks: [generateTask()],
  }
}
