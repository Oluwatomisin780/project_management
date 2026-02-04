import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { TokenModule } from './services/token/token.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from './services/event/event.module';
import { MailModule } from './services/mail/mail.module';
import { BullModule } from '@nestjs/bullmq';
import { WorkspaceModule } from './modules/workspace/workspace.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    TokenModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
        password: 'oluwatomisin',
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 100,
        removeOnFail: 100,
        backoff: 2000,
      },
    }),
    EventModule,
    MailModule,
    WorkspaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
