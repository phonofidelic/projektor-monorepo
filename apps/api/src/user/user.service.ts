import { Injectable } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma.service'
import { Prisma, User } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({})
  }

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log('*** update, id:', id)
    return this.prisma.user.update({ where: { id }, data: updateUserDto })
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
