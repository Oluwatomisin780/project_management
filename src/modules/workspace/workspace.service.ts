import { Injectable, NotFoundException } from '@nestjs/common';
import { Roles } from 'src/generated/prisma/enums';
import {
  CreateWorkSpace,
  UpdateWorkSpace,
} from 'src/modules/workspace/workspace.type';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class WorkspaceService {
  constructor(private prismaService: PrismaService) {}

  async createWorkSpace(dto: CreateWorkSpace, userId: string) {
    return await this.prismaService.workSpace.create({
      data: {
        ...dto,
        ownerId: userId,
        joinedAt: new Date(),
        workspaceMember: {
          create: {
            userId: userId,
            role: Roles.OWNER,
          },
        },
      },
    });
  }

  async getWorkspaces() {
    const workspaces = this.prismaService.workSpace.findMany({
      include: {
        workspaceMember: true,
      },
    });
    console.log(workspaces);
    return workspaces;
  }
  async getWorkSpace(id: string) {
    const workspace = await this.prismaService.workSpace.findUnique({
      where: {
        id,
      },

      include: {
        workspaceMember: {
          select: {
            user: true,
            role: true,
          },
        },
        project: {
          where: {
            workspaceId: id,
            isArchived: false,
          },
        },
      },
    });

    if (!workspace) throw new NotFoundException('workspace does not exist');

    return {
      workspace: workspace,
    };
  }

  async updateWorkSpace(id: string, dto: UpdateWorkSpace) {
    return await this.prismaService.workSpace.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async deleteWorkSpace(id: string) {
    return await this.prismaService.workSpace.delete({
      where: {
        id,
      },
    });
  }
}
