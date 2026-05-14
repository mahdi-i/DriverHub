import { Controller, Get, Param } from '@nestjs/common';
import { UserInfo } from '@shared/decorators/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async findByJwt(@UserInfo('id') userid: string) {
    return this.userService.findByJwt(userid);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Get(':id')
  async findByPhone(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
