import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsEnum, IsDate } from 'class-validator';

enum Roles {
  Member = 'MEMBER',
  Owner = 'OWNER',
  Viewer = 'VIEWER',
}

export class CreateWorkSpace {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  color: string;

  @IsEnum(Roles)
  role: Roles;

  @IsDate()
  joinedAt: Date;
}

export class UpdateWorkSpace extends PartialType(CreateWorkSpace) {}  

 