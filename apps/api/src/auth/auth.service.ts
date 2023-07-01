// import bcrypt from 'bcrypt'
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt'
// import bcrypt from 'bcrypt'

const saltRounds = 10
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(data: Prisma.UserCreateInput) {
    const userExists = await this.userService.findOne({ email: data.email })
    if (userExists) {
      throw new BadRequestException('User already exists')
    }

    const hash = await this.hashData(data.password)
    const newUser = await this.userService.createUser({
      ...data,
      password: hash,
    })

    const tokens = await this.getTokens(newUser.id, newUser.email)
    await this.updateRefreshToken(newUser.id, tokens.refreshToken)

    return tokens
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email })
    if (!user) {
      throw new ForbiddenException()
    }
    const result = await this.compare(password, user.password)

    if (!result) {
      throw new ForbiddenException()
    }

    return user
  }

  async loginUser(user: Omit<User, 'password'>) {
    console.log('*** loginUser, user:', user)
    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refreshToken)

    return tokens
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findOne({ id: userId })
    if (!user || !user.refreshToken) {
      throw new ForbiddenException()
    }

    const refreshTokenMatches = await this.compare(
      refreshToken,
      user.refreshToken,
    )

    if (!refreshTokenMatches) {
      throw new ForbiddenException()
    }

    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refreshToken)

    return tokens
  }

  private async hashData(data: string) {
    const bcrypt = await import('bcrypt')
    return await bcrypt.hash(data, saltRounds)
  }

  private async compare(data: string, hash: string) {
    const bcrypt = await import('bcrypt')
    return await bcrypt.compare(data, hash)
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken)
    await this.userService.update(userId, { refreshToken: hashedRefreshToken })
  }

  private async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '60s',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }
}
