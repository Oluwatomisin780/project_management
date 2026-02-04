import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  @IsStrongPassword()
  password: string;
  @IsEmail()
  email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  emailVerified?: boolean;
}
