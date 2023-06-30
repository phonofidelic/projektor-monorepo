// import bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { UserService } from 'src/user/user.service'
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(data: Prisma.UserCreateInput): Promise<User> {
    const saltRounds = 10
    const hash = await bcrypt.hash(data.password, saltRounds)
    return this.userService.createUser({ ...data, password: hash })
  }
}
