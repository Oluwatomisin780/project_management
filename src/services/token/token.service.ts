import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateTokenDtos } from 'src/services/token/token.type';
import { expiresAt, generateToken, hashToken } from 'src/utils/generateToken';

@Injectable()
export class TokenService {
  constructor(
    private prismaService: PrismaService,
     @Inject(forwardRef(()=>UserService))
    private userService: UserService,
  ) {}
  async createToken(userId: string) {
    const user = await this.userService.findUser(userId);

    // generate token
    const rawToken = generateToken();
    console.log(rawToken);

    const hashedToken = hashToken(rawToken);

    console.log(hashToken);

    if (!user) throw new NotFoundException('user does not exist');

    return this.prismaService.token.create({
      data: {
        token: hashedToken,
        userId: user.id,
        expireAt: expiresAt,
      },
    });
  }

  async findToken(token: string) {
    // compare the token  and  check
    const decryptToken = hashToken(token);

    return await this.prismaService.token.findUnique({
      where: {
        token: decryptToken,
      },
    });
  }

  async updateToken(id: string, token: string) {
    return await this.prismaService.token.update({
      where: {
        id,
      },
      data: {
        token,
      },
    });
  }
}
