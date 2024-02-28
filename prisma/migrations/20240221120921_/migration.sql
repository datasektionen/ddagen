/*
  Warnings:

  - Added the required column `cv` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_url` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedin_url` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_link` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personal_story` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "cv" TEXT NOT NULL,
ADD COLUMN     "github_url" TEXT NOT NULL,
ADD COLUMN     "linkedin_url" TEXT NOT NULL,
ADD COLUMN     "other_link" TEXT NOT NULL,
ADD COLUMN     "personal_story" TEXT NOT NULL;
