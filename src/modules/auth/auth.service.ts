import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findUser(email);
    if (!user) throw new NotFoundException('User does not exist');
    const isPassword = await argon.verify(user.password, pass);
    if (!isPassword) throw new BadRequestException('Incorrect password');
    const { password, ...result } = user;

    return result;
  }

  async login(user: any) {
    const token = this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });
    console.log(token, user);
    return { token, user };
  }
}
