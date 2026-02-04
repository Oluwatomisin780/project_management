import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { TokenModule } from 'src/services/token/token.module';
import { MailModule } from 'src/services/mail/mail.module';

@Module({
  imports: [PrismaModule, forwardRef(() => TokenModule),MailModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
