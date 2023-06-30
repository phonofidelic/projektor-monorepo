import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { User as UserModel } from '@prisma/client'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    if (!createUserDto.email || !createUserDto.password) {
      throw new BadRequestException()
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(createUserDto.email)) {
      throw new BadRequestException({
        message: 'Not a valid email address',
        statusCode: 400,
      })
    }

    return this.authService.registerUser(createUserDto)
  }
}
