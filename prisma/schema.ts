import { Prisma } from 'src/generated/prisma/client';

export const iWorkspaceProject = {
  select: {
    workspace: {
      select: {
        workspaceMember: {
          select: {
            user: true,
            role: true,
          },
        },
      },
    },
  },
} satisfies Prisma.ProjectDefaultArgs;
 