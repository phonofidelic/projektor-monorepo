import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProjectsService } from './projects/projects.service'
import { ProjectsModule } from './projects/projects.module'
import { UserModule } from './user/user.module'
import { PrismaService } from './prisma.service'
import { UserService } from './user/user.service'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'

@Module({
  imports: [ConfigModule.forRoot(), ProjectsModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    AuthService,
    UserService,
    ProjectsService,
  ],
})
export class AppModule {}
