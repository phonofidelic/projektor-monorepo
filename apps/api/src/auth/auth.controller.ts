import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { User as UserModel } from '@prisma/client'
import { AuthService } from './auth.service'
// import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'

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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginUser(@Request() request: any) {
    // await this.authService.validateUser(
    //   loginUserDto.email,
    //   loginUserDto.password,
    // )

    return this.authService.loginUser(request.user)
  }
}
