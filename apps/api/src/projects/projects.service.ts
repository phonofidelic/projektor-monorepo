import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdateProjectDto } from './dto/update-project.dto'
import { PrismaService } from 'src/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProjectCreateInput) {
    const slug = data.title.toLocaleLowerCase().replace(/\s/g, '_')
    return this.prisma.project.create({ data: { ...data, slug } })
  }

  async findAll(data: Prisma.ProjectFindManyArgs) {
    return this.prisma.project.findMany(data)
  }

  async findOne(data: Prisma.ProjectFindFirstArgs) {
    const foundProject = await this.prisma.project.findFirst(data)

    if (!foundProject) {
      throw new NotFoundException('Could not find project')
    }

    return foundProject
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`
  }

  remove(id: number) {
    return `This action removes a #${id} project`
  }
}
