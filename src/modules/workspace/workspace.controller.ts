import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { User } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { WorkspaceService } from 'src/modules/workspace/workspace.service';
import {
  CreateWorkSpace,
  UpdateWorkSpace,
} from 'src/modules/workspace/workspace.type';

@Controller('workspace')
export class WorkspaceController {
  constructor(private workService: WorkspaceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create-workspace')
  async createWorkspace(@Body() dto: CreateWorkSpace, @User() user: any) {
    console.log(user);
    return await this.workService.createWorkSpace(dto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-workspaces')
  async getWorkspaces() {
    return this.workService.getWorkspaces();
  }
  @Get('/get-workspace/:id')
  async getWorkspace(@Param('id') id: string) {
    return await this.workService.getWorkSpace(id);
  }

  @Patch('/update-workspace/:id')
  async updateWorkspace(@Param('id') id: string, @Body() dto: UpdateWorkSpace) {
    return await this.workService.updateWorkSpace(id, dto);
  }

  @Delete('/delete-workspace/:id')
  async deleteWorkspace(@Param('id') id: string) {
    return await this.workService.deleteWorkSpace(id);
  }
}
