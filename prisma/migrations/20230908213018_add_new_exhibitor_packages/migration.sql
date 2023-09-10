-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.

-- AlterEnum
BEGIN;
CREATE TYPE "Package_new" AS ENUM ('main', 'base', 'sponsor', 'premium', 'startup', 'headhunter');
ALTER TABLE "exhibitors" ALTER COLUMN "package" TYPE "Package_new" USING ("package"::text::"Package_new");
ALTER TYPE "Package" RENAME TO "Package_old";
ALTER TYPE "Package_new" RENAME TO "Package";
DROP TYPE "Package_old";
COMMIT;
