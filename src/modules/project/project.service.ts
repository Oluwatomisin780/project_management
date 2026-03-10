import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { iWorkspaceProject } from 'prisma/schema';
import { Prisma } from 'src/generated/prisma/client';
import { CreateProjectDto } from 'src/modules/project/project.type';
import { WorkspaceService } from 'src/modules/workspace/workspace.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private workspaceService: WorkspaceService,
  ) {}

  async createProject(
    dto: CreateProjectDto,
    workspaceId: string,
    userId: string,
  ) {
    // check if workspace exists
    const workspace = await this.workspaceService.getWorkSpace(workspaceId);

    if (!workspace) throw new NotFoundException('Workspace does not exist');
    // check user is a memeber of workspace
    const isMember = workspace.workspace.workspaceMember.find(
      (member) => member.user.id === userId,
    );

    if (!isMember)
      throw new BadRequestException('user is not a member of a workspace');

    dto.tags = Array.isArray(dto.tags) ? dto.tags : [];

    return await this.prisma.project.create({
      data: {
        ...dto,
        workspaceId,
        userId,
        projectMembers: dto.projectMembers?.length
          ? {
              create: dto.projectMembers?.map((member) => ({
                userId: member.userId,
                role: member.role,
              })) as Prisma.ProjectMembersUncheckedCreateWithoutProjectInput[],
            }
          : undefined,
      },
    });
  }

  //get project under workspace by project id and workspace id

  async getProject(projectId: string, workspaceId: string) {
    const workspace = await this.workspaceService.getWorkSpace(workspaceId);
    if (!workspace) throw new NotFoundException('Workspace does not exist');
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) throw new NotFoundException('project does not exist');
    if (project.workspaceId !== workspaceId)
      throw new BadRequestException('project does not belong to workspace');
    return project;
  }

  async getSingleProject(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        task: {
          include: {
            assignee: true,
          },
        },
        projectMembers: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!project) throw new NotFoundException('project does not exist');
    return {
      project: project,
    };
  }
  async getWorkspaceProject(workspaceId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        workspaceId,
        isArchived: false,
      },
      ...iWorkspaceProject,
    });

    if (!project) throw new NotFoundException('project does not exist');
    return project;
  }



  deleteProject(projectId: string) {

      }
}
