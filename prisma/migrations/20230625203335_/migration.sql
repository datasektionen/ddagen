/*
  Warnings:

  - A unique constraint covering the columns `[jobOfferId]` on the table `exhibitors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobOfferId` to the `exhibitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exhibitors" ADD COLUMN     "jobOfferId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "job_offers" (
    "id" TEXT NOT NULL,
    "summerJob" INTEGER[],
    "internhip" INTEGER[],
    "partTimeJob" INTEGER[],
    "masterThesis" BOOLEAN NOT NULL,
    "fullTimeJob" BOOLEAN NOT NULL,
    "traineeProgram" BOOLEAN NOT NULL,

    CONSTRAINT "job_offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exhibitors_jobOfferId_key" ON "exhibitors"("jobOfferId");

-- AddForeignKey
ALTER TABLE "exhibitors" ADD CONSTRAINT "exhibitors_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "job_offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
