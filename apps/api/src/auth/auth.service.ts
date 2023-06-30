// import bcrypt from 'bcrypt'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt'
// import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(data: Prisma.UserCreateInput): Promise<User> {
    const saltRounds = 10
    const bcrypt = await import('bcrypt')
    const hash = await bcrypt.hash(data.password, saltRounds)
    return this.userService.createUser({ ...data, password: hash })
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email })
    if (!user) {
      throw new ForbiddenException()
    }
    const bcrypt = await import('bcrypt')
    const result = await bcrypt.compare(password, user.password)

    return result
  }

  async loginUser(user: Omit<User, 'password'>) {
    const payload = {
      email: user.email,
      sub: user.id,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
