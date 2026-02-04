import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class MailQueueService {
  private readonly logger = new Logger(MailQueueService.name);
  constructor(@InjectQueue('mail') private readonly mailQueue: Queue) {}

  // Method to add email job to the queue
  async queueVerificationMail(to: string, subject: string, body: string) {
    // adding something  here later
  }

  async queuePasswordResetMail(to: string, subject: string, body: string) {
    // adding something  here later
  }

  async queueForgetPasswordMail(to: string, subject: string, body: string) {
    // adding something  here later
  }

   
}
