export type Project = {
  id: string
  userId: string
  title: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
  tasks: Task[]
}

export type Task = {
  id: string
  userId: string
  projectId: string
  title: string
  description?: string
  createdAt: string
  updatedAt: string
}
