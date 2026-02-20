/*
  Warnings:

  - Added the required column `actualHours` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completeAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedHours` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "actualHours" INTEGER NOT NULL,
ADD COLUMN     "completeAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "estimatedHours" INTEGER NOT NULL,
ADD COLUMN     "tags" TEXT[];
