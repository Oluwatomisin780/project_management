import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { BullModule } from '@nestjs/bullmq';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';



@Module({
  imports: [
    BullModule.registerQueue({ name: 'mail' }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      template: {
        dir: join(process.cwd(), 'templates'), // 👈 important
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
          layout: 'layouts/main',
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
