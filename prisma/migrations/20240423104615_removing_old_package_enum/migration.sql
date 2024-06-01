/*
  Warnings:

  - You are about to drop the column `package` on the `exhibitors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exhibitors" DROP COLUMN "package";

-- DropEnum
DROP TYPE "Package";
