/*
  Warnings:

  - You are about to drop the column `internhip` on the `job_offers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "job_offers" DROP COLUMN "internhip",
ADD COLUMN     "internship" INTEGER[];
