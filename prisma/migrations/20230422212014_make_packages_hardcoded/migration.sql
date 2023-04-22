/*
  Warnings:

  - You are about to drop the column `packageId` on the `exhibitors` table. All the data in the column will be lost.
  - You are about to drop the `packages` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Package" AS ENUM ('base', 'sponsor', 'headhunter', 'premium');

-- DropForeignKey
ALTER TABLE "exhibitors" DROP CONSTRAINT "exhibitors_packageId_fkey";

-- AlterTable
ALTER TABLE "exhibitors" DROP COLUMN "packageId",
ADD COLUMN     "package" "Package";

-- DropTable
DROP TABLE "packages";
