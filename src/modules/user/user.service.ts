import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/modules/user/user.type';
import { PrismaService } from 'src/services/prisma/prisma.service';
import * as argon from 'argon2';
import { TokenService } from 'src/services/token/token.service';
import { MailService } from 'src/services/mail/mail.service';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => TokenService))
    private tokenService: TokenService,
    private mailService: MailService,
  ) {}

  async createUser(dto: CreateUserDto) {
    console.log(dto);
    const user = await this.findUser(dto.email);
    if (user) throw new BadRequestException('User already exist.');
    dto.password = await argon.hash(dto.password);

    console.log(dto.password);

    //  await this.mailService.welcomeUserEmail({
    //   to: dto.email,
    //   fullname: dto.name,
    //   subject: 'Welcome to  Project Management App',
    //   template: 'welcome-user',
    // });
    return await this.prisma.user.create({
      data: dto,
    });
  }

  async findUser(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async verifyEmail(token: string) {
    // generateToken

    const isToken = await this.tokenService.findToken(token);
    if (!isToken) throw new NotFoundException('invalid user token');
    return await this.updateUser(isToken.userId, {
      emailVerified: true,
    });
  }
  async forgetPassword(email: string) {
    const user = await this.findUser(email);
    if (!user) throw new NotFoundException('User does not exist!!');
    // generateToken
    const token = await this.tokenService.createToken(user.id);
    // send a reset password token through email
  }

  async ResetPassword(token: string, password: string) {
    // check for token
    const tokenExist = await this.tokenService.findToken(token);
    //  if does not token exist throw an error
    if (!tokenExist) throw new NotFoundException('invalid user token');
    //   reset  user password
    const hashedPassword = await argon.hash(password);
    return await this.updateUser(tokenExist.userId, {
      password: hashedPassword,
    });
  }

  async updateUser(id: string, updateUser: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUser,
    });
  }
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    console.log('change password service', userId, oldPassword, newPassword);
    // find user..
    const user = await this.findUser(userId);

    if (!user) throw new NotFoundException('user does not  exist');

    //  check password correlation

    const password = await argon.verify(oldPassword, user.password);

    if (!password) throw new BadRequestException('Incorrect password');

    //else change password
    return await this.updateUser(user.id, {
      password: newPassword,
    });
  }
}
