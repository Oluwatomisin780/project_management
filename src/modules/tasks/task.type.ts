import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { extname } from 'node:path';

export enum TaskPriority {
  LOW = 'LOW',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}
export class CreateTaskDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsEnum(TaskPriority)
  taskpriority: TaskPriority;
  @IsString()
  assigneeId: string;
  @IsDate()
  @Type(() => Date)
  startDate: Date;
  @IsDate()
  @Type(() => Date)
  dueDate: Date;
  @IsEnum(TaskStatus)
  status: TaskStatus;
}


 export class UpdateTask extends PartialType(CreateTaskDto){ 
   
 }