import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailTypeDto, WelcomeUserDto } from 'src/services/mail/mail.type';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail({ to, subject, template }: MailTypeDto) {
    // Logic to send email
    const sendMail = await this.mailerService.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      template: template,
    });
    console.log(`Sending email to ${to} with subject "${subject}"`);
    return sendMail;
  }

  async welcomeUserEmail({ to, fullname, subject }: WelcomeUserDto) {
    const sendMail = await this.mailerService.sendMail({
      to,
      subject,
      template: 'welcome-user',
      context: {
        name: fullname,
      },
    });
    return sendMail;
  }
}
