import { Body, Controller, Post, Query } from '@nestjs/common';
import { User } from 'src/common/decorators/current-user.decorator';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from 'src/modules/user/user.type';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create-user')
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Post('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return await this.userService.verifyEmail(token);
  }

  @Post('forget-password')
  async forgetPassword(@Body('email') email: string) {
    return await this.userService.forgetPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body('password') password: string,
  ) {
    return await this.userService.ResetPassword(token, password);
  }

  @Post('change-password')
  async changePassword(
    @User('id') user,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    return await this.userService.changePassword(
      user.id,
      oldPassword,
      newPassword,
    );
  }
}
