/*
  Warnings:

  - Added the required column `company_meeting_interests` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "company_meeting_interests" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "meetings" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "exhibitorId" TEXT NOT NULL,
    "timeslot" INTEGER NOT NULL,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);
