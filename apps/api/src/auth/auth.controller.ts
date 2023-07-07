import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { AuthService } from './auth.service'
// import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { RefreshTokenGuard } from './guards/refreshToken.guard'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!createUserDto.email || !createUserDto.password) {
      throw new BadRequestException()
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(createUserDto.email)) {
      throw new BadRequestException({
        message: 'Not a valid email address',
        statusCode: 400,
      })
    }

    const tokens = await this.authService.registerUser(createUserDto)
    response.cookie('access_token', tokens.accessToken)
    response.cookie('refresh_token', tokens.refreshToken)
    return tokens
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginUser(
    @Request() request: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.loginUser(request.user)
    response.cookie('access_token', tokens.accessToken)
    response.cookie('refresh_token', tokens.refreshToken)
    return { ...tokens, userId: request.user.id }
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @Request() request: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userId = request.user['sub']
    const refreshToken = request.user['refreshToken']
    const freshTokens = await this.authService.refreshTokens(
      userId,
      refreshToken,
    )
    response.cookie('access_token', freshTokens.accessToken)
    response.cookie('refresh_token', freshTokens.refreshToken)
    return freshTokens
  }
}
