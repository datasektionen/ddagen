-- AlterTable
ALTER TABLE "exhibitors" ADD COLUMN     "infoSubmissionStatus" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "exhibitors" ADD COLUMN     "packageTier" INTEGER NOT NULL DEFAULT -1;
