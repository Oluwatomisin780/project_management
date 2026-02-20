import { IsDate, IsEnum, IsString, IsUUID } from 'class-validator';

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
export class CreateProjectDto {
  @IsString()
  title: string;
  @IsString()
  description?: string;
  @IsUUID()
  assigneeId: string[];
  @IsDate()
  startDate: Date;
  @IsDate()
  dueDate: Date;
}
