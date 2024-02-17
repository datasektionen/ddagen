/*
  Warnings:

  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Students";

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "ugkthid" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "emails" TEXT NOT NULL,
    "study_year" INTEGER NOT NULL,
    "summerJob" BOOLEAN NOT NULL,
    "partTimeJob" BOOLEAN NOT NULL,
    "internship" BOOLEAN NOT NULL,
    "masterThesis" BOOLEAN NOT NULL,
    "fullTimeJob" BOOLEAN NOT NULL,
    "traineeProgram" BOOLEAN NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_ugkthid_key" ON "students"("ugkthid");
