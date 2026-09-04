import { Prisma } from '@prisma/client'

export class CreateProjectDto {
  userId: string
  user: Prisma.UserCreateNestedOneWithoutProjectsInput
  title: string
  description?: string
}
