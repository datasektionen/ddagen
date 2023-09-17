-- AlterTable
ALTER TABLE "sessions"
  ADD COLUMN   "exhibitorId" TEXT,
  ALTER COLUMN "userId" DROP NOT NULL;

UPDATE "sessions"
SET "exhibitorId" = (select "users"."exhibitorId" from "users" WHERE "users".id = "sessions"."userId");

ALTER TABLE "sessions" ALTER COLUMN "exhibitorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "exhibitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
