import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class MailTypeDto {
  @IsString()
  subject: string;

  @IsEmail()
  to: string;

  @IsString()
  template: string;
}

export class WelcomeUserDto extends MailTypeDto {
  @IsString()
  fullname: string;
}

export class VerificationMailDto extends MailTypeDto {
  @IsString()
  fullName: string;
  @IsString()
  token: string;
}

export class PasswordResetMailDto extends MailTypeDto {
  @IsString()
  fullName: string;
  @IsString()
  token: string;
}

export class ForgetPasswordMailDto extends MailTypeDto {}

export enum MailJobType {
  USER_VERIFICATION = 'user_verification',
  PASSWORD_RESET = 'password_reset',
  FORGET_PASSWORD = 'forget_password',
}
