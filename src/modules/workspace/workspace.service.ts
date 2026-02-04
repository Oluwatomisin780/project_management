import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/modules/user/user.type';
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
      },
    });
  }

  async getWorkSpace(id: string) {
    return await this.prismaService.workSpace.findUnique({
      where: {
        id,
      },
    });
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
