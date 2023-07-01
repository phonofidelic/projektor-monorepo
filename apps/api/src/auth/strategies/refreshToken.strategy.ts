import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

type JwtRefreshPayload = {
  sub: string
  email: string
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    })
  }

  async validate(request: Request, payload: JwtRefreshPayload) {
    const header = request.get('Authorization')
    if (!header) {
      throw new InternalServerErrorException()
    }

    const refreshToken = header.replace('Bearer', '').trim()
    return { ...payload, refreshToken }
  }
}
