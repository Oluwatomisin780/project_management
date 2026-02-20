/*
  Warnings:

  - You are about to drop the column `role` on the `WorkSpace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkSapceMember" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'VIEWER';

-- AlterTable
ALTER TABLE "WorkSpace" DROP COLUMN "role";
