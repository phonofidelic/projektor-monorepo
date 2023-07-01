import { Controller, Get, Param, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { UUID } from 'crypto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async signupUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
  //   return this.userService.createUser(createUserDto)
  // }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.userService.findOne({ id })
  }

  // @Patch(':id')
  // update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto)
  // }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.userService.remove(+id)
  }
}
