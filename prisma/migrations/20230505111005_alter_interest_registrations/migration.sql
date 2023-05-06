-- AlterTable
ALTER TABLE "exhibitors" RENAME TO "exhibitor_interest_registrations";
ALTER TABLE "exhibitor_interest_registrations"
    ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "exhibitor_interest_registrations"
    ALTER COLUMN "organizationNumber" SET NOT NULL;
ALTER TABLE "exhibitor_interest_registrations"
    ADD COLUMN "email" TEXT NULL;
ALTER TABLE "exhibitor_interest_registrations" RENAME CONSTRAINT "exhibitors_pkey" TO "exhibitor_interest_registrations_pkey";

UPDATE "exhibitor_interest_registrations" SET "email" = (
    SELECT "email"
    FROM "accounts"
    WHERE "accounts"."exhibitorId" = "exhibitor_interest_registrations"."id"
);

ALTER TABLE "exhibitor_interest_registrations"
    ALTER COLUMN "email" SET NOT NULL;

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_exhibitorId_fkey";

-- DropTable
DROP TABLE "accounts";
