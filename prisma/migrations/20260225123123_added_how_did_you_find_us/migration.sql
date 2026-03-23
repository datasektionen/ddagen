/*
  Warnings:

  - Added the required column `howDidYouFindUs` to the `exhibitor_interest_registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exhibitor_interest_registrations" ADD COLUMN     "howDidYouFindUs" TEXT NOT NULL;
