-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_exhibitorId_fkey";

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "exhibitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
