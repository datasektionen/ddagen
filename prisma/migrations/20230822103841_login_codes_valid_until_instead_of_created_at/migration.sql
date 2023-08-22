ALTER TABLE "login_codes" ADD COLUMN "validUntil" TIMESTAMP(3);

UPDATE "login_codes"
SET "validUntil" = "createdAt" + interval '10' minute;

ALTER TABLE "login_codes" DROP COLUMN "createdAt";

ALTER TABLE "login_codes" ALTER COLUMN "validUntil" SET NOT NULL;
