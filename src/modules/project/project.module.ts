import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { WorkspaceModule } from 'src/modules/workspace/workspace.module';

@Module({
  imports: [PrismaModule, WorkspaceModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
