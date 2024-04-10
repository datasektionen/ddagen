/*
  Warnings:

  - The values [main,base,sponsor,premium,headhunter] on the enum `Package` will be removed. If these variants are still used in the database, this will fail.


-- AlterEnum
BEGIN;
CREATE TYPE "Package_new" AS ENUM ('small', 'medium', 'large', 'mainsponsor', 'startup');
ALTER TABLE "exhibitors" ALTER COLUMN "package" TYPE "Package_new" USING ("package"::text::"Package_new");
ALTER TYPE "Package" RENAME TO "Package_old";
ALTER TYPE "Package_new" RENAME TO "Package";
DROP TYPE "Package_old";
COMMIT;
*/