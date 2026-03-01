import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/modules/tasks/task.type';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async createTask(dto: CreateTaskDto, projectId: string) {
    return this.prismaService.task.create({
      data: {
        ...dto,
        ProjectId: projectId,
        assignee: {
          connect: {
            id: dto.assigneeId,
          },
        },
      },
    });
  }
}
