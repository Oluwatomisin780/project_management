import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { retryWhen } from 'rxjs';
import { CreateTaskDto, UpdateTask } from 'src/modules/tasks/task.type';
import { TasksService } from 'src/modules/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post('/:projectId')
  async create(
    @Body() dto: CreateTaskDto,
    @Param('projectId') projectId: string,
  ) {
    return await this.taskService.createTask(dto, projectId);
  }

  @Get('/:taskId')
  async getTask(@Param('taskId') taskId: string) {
    return await this.taskService.getTask(taskId);
  }

  @Patch('/:taskId')
  async updateTask(@Param('taskId') taskId: string, @Body() dto: UpdateTask) {
    return this.taskService.updateTask(taskId, dto);
  }
}
