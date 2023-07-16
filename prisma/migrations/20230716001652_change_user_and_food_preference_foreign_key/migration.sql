/*
  Warnings:

  - You are about to drop the column `exhibitorId` on the `food_specifications` table. All the data in the column will be lost.
  - You are about to drop the column `exhibitorId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationNumber]` on the table `exhibitors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationNumber` to the `food_specifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationNumber` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "food_specifications" DROP CONSTRAINT "food_specifications_exhibitorId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_exhibitorId_fkey";

-- AlterTable
ALTER TABLE "food_specifications" DROP COLUMN "exhibitorId",
ADD COLUMN     "organizationNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "exhibitorId",
ADD COLUMN     "organizationNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "exhibitors_organizationNumber_key" ON "exhibitors"("organizationNumber");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organizationNumber_fkey" FOREIGN KEY ("organizationNumber") REFERENCES "exhibitors"("organizationNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_specifications" ADD CONSTRAINT "food_specifications_organizationNumber_fkey" FOREIGN KEY ("organizationNumber") REFERENCES "exhibitors"("organizationNumber") ON DELETE CASCADE ON UPDATE CASCADE;
