import { Injectable, NotFoundException } from '@nestjs/common';
import { IsString } from 'class-validator';
import { iWorkspaceProject } from 'prisma/schema';
import { CreateProjectDto } from 'src/modules/project/project.type';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  createProject(dto: CreateProjectDto) {
    const project = this.prisma.project.create({
      data: dto,
    });
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
}
