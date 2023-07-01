import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { AuthService } from './auth.service'
// import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { RefreshTokenGuard } from './guards/refreshToken.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
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
    return this.authService.loginUser(request.user)
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Request() request: any) {
    const userId = request.user['sub']
    const refreshToken = request.user['refreshToken']
    console.log('*** refreshToken:', refreshToken)
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
