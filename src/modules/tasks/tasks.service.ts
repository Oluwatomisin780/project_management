import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTask } from 'src/modules/tasks/task.type';
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

  async getTask(taskId: string) {
    const task = await this.prismaService.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        project: true,
        subTask: true,
        comment: true,
        assignee: true,
        watcher: true,
      },
    });
    if (!task) throw new NotFoundException('Task does not  exist');

    return {
      task: task,
    };
  }

  async updateTask(taskId: string, dto: UpdateTask) {
    const task = await this.getTask(taskId);
    if (!task) throw new NotFoundException('task  does not update');
    return await this.prismaService.task.update({
      where: {
        id: taskId,
      },
      data: {
        name: dto.name,
      },
    });
  }
}
