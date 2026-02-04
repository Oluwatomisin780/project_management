import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from 'src/common/decorators/current-user.decorator';
import { WorkspaceService } from 'src/modules/workspace/workspace.service';
import {
  CreateWorkSpace,
  UpdateWorkSpace,
} from 'src/modules/workspace/workspace.type';

@Controller('workspace')
export class WorkspaceController {
  constructor(private workService: WorkspaceService) {}

  @Post()
  async createWorkspace(@Body() dto: CreateWorkSpace, @User() user: any) {
    return await this.workService.createWorkSpace(dto, user.id);
  }

  @Get('/:id')
  async getWorkspace(@Param('id') id: string) {
    return await this.workService.getWorkSpace(id);
  }

  @Patch('/:id')
  async updateWorkspace(@Param('id') id: string, @Body() dto: UpdateWorkSpace) {
    return await this.workService.updateWorkSpace(id, dto);
  }

  @Delete('/:id')
  async deleteWorkspace(@Param('id') id: string) {
    return await this.workService.deleteWorkSpace(id);
  }
}
