/*
  Warnings:

  - Added the required column `packageTier` to the `exhibitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exhibitors" ADD COLUMN     "packageTier" INTEGER NOT NULL;
