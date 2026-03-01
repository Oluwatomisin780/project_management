import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ProjectService } from 'src/modules/project/project.service';
import { CreateProjectDto } from 'src/modules/project/project.type';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:workspaceId/create-project')
  async createProject(
    @Body() dto: CreateProjectDto,
    @Param('workspaceId') workspaceId: string,
    @User() user: any,
  ) {
    console.log(user);
    return await this.projectService.createProject(dto, workspaceId, user.id);
  }
  @Get('/workspace/:workspaceId')
  getWorkspaceProjects(@Param('workspaceId') workspaceId: string) {
    return this.projectService.getWorkspaceProject(workspaceId);
  }
  @Get('/:workspaceId/:projectId')
  getProjectById(
    @Param('workspaceId') workspaceId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.projectService.getProject(projectId, workspaceId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:projectId')
  async getSingleProject(@Param('projectId') projectId: string) {
    return await this.projectService.getSingleProject(projectId);
  }
}
