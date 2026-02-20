-- DropIndex
DROP INDEX "WorkSpace_ownerId_key";

-- AlterTable
ALTER TABLE "WorkSpace" ALTER COLUMN "description" DROP NOT NULL;
