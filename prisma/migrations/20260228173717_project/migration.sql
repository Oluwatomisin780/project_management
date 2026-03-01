/*
  Warnings:

  - A unique constraint covering the columns `[workspaceId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';

-- AlterTable
ALTER TABLE "SubTask" ADD COLUMN     "taskId" UUID;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "actualHours" DROP NOT NULL,
ALTER COLUMN "completeAt" DROP NOT NULL,
ALTER COLUMN "estimatedHours" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_workspaceId_key" ON "Project"("workspaceId");

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
