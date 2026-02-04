import { Module, forwardRef } from '@nestjs/common';
import { TokenService } from './token.service';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [PrismaModule, forwardRef(() => UserModule)],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
