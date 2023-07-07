export type Project = {
  id: string
  userId: string
  title: string
  slug: string
  description?: string
  theme?: string
  createdAt: string
  updatedAt: string
  tasks: Task[]
  status: ProjectStatus
}

export type ProjectStatus = 'active' | 'archived' | 'removed'

export type Task = {
  id: string
  userId: string
  projectId: string
  title: string
  description?: string
  createdAt: string
  updatedAt: string
}

export type User = {
  id: string
  email: string
  name?: string
}
