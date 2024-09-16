-- AlterTable
ALTER TABLE "exhibitors" ADD COLUMN     "meetingTimeSlots" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
