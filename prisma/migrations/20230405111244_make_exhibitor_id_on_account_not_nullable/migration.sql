/*
  Warnings:
  - Made the column `exhibitorId` on table `accounts` required. This step will fail if there are existing NULL values in that column.
*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_exhibitorId_fkey";

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "exhibitorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "exhibitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
