import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard'
import { UserService } from 'src/user/user.service'
import { Prisma } from '@prisma/client'

@UseGuards(AccessTokenGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const user = (await this.userService.getUserWithoutPassword({
      id: createProjectDto.userId,
    })) as Prisma.UserCreateNestedOneWithoutProjectsInput

    if (!user) {
      throw new BadRequestException('User does not exist')
    }

    const project = await this.projectsService.create(createProjectDto)
    return { project }
  }

  @Get()
  async findAll(@Request() request: any) {
    const userId = request.user.userId as string

    if (!userId) {
      throw new BadRequestException('User does not exist')
    }
    const projects = await this.projectsService.findAll({ where: { userId } })

    return { projects }
  }

  @Get(':slug')
  async findOne(@Request() request: any, @Param('slug') slug: string) {
    const userId = request.user.userId as string

    if (!userId) {
      throw new BadRequestException('User does not exist')
    }

    const project = await this.projectsService.findOne({
      where: { slug, userId },
    })
    return { project }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id)
  }
}
