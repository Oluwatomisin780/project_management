import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/modules/tasks/task.type';
import { TasksService } from 'src/modules/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post('/:projectId')
  async create(
    @Body() dto: CreateTaskDto,
    @Param('projectId') projectId: string,
  ) {
    return this.taskService.createTask(dto, projectId);
  }
}
