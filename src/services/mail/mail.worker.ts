import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';

import { Job } from 'bullmq';
import { MailService } from 'src/services/mail/mail.service';
import { MailJobType } from 'src/services/mail/mail.type';
import { Logger } from '@nestjs/common';

@Processor('email', { concurrency: 5 })
export class EmailProcessor extends WorkerHost {
  constructor(private mailService: MailService) {
    super();
  }

  async process(job: Job): Promise<any> {
    Logger.log('Received a new Job', job.id);
    try {
      switch (job.name) {
        case MailJobType.USER_VERIFICATION:
          Logger.log('Processing USER_VERIFICATION email job');
          break;
        case MailJobType.PASSWORD_RESET:
          Logger.log('Processing PASSWORD_RESET email job');
          break;
        case MailJobType.FORGET_PASSWORD:
          Logger.log('Processing FORGET_PASSWORD email job');
          break;
        default:
          Logger.log('Unknown job type');
      }
    } catch (error) {
      Logger.error(`Error processing job ${job.id}:`, error);
    }
  }

  async sendWelcomeEmail(to: string, subject: string, body: string) {
    Logger.log('Sending welcome email to:', to);
  }

  async sendPasswordResetEmail(to: string, subject: string, body: string) {
    Logger.log('Sending password reset email to:', to);
  }

  async sendForgetPasswordEmail(to: string, subject: string, body: string) {
    Logger.log('Sending forget password email to:', to);
  }
}
