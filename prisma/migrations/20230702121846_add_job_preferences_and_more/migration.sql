/*
  Warnings:

  - The values [main] on the enum `Package` will be removed. If these variants are still used in the database, this will fail.
  - The `value` column on the `food_specifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[jobOfferId]` on the table `exhibitors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobOfferId` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `food_specifications` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `food_specifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FoodPreferencesValue" AS ENUM ('Meat', 'Vegan', 'LactoseFree', 'GlutenFree');

-- CreateEnum
CREATE TYPE "FoodPreferencesType" AS ENUM ('Banquet', 'Representative');

-- AlterEnum
BEGIN;
CREATE TYPE "Package_new" AS ENUM ('base', 'sponsor', 'headhunter', 'premium');
ALTER TABLE "exhibitors" ALTER COLUMN "package" TYPE "Package_new" USING ("package"::text::"Package_new");
ALTER TYPE "Package" RENAME TO "Package_old";
ALTER TYPE "Package_new" RENAME TO "Package";
DROP TYPE "Package_old";
COMMIT;

-- AlterTable
ALTER TABLE "exhibitors" ADD COLUMN     "jobOfferId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "food_specifications" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" "FoodPreferencesValue"[],
DROP COLUMN "type",
ADD COLUMN     "type" "FoodPreferencesType" NOT NULL;

-- DropEnum
DROP TYPE "FoodSpecificationType";

-- CreateTable
CREATE TABLE "job_offers" (
    "id" TEXT NOT NULL,
    "summerJob" INTEGER[],
    "internship" INTEGER[],
    "partTimeJob" INTEGER[],
    "masterThesis" BOOLEAN NOT NULL,
    "fullTimeJob" BOOLEAN NOT NULL,
    "traineeProgram" BOOLEAN NOT NULL,

    CONSTRAINT "job_offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exhibitors_jobOfferId_key" ON "exhibitors"("jobOfferId");

-- AddForeignKey
ALTER TABLE "exhibitors" ADD CONSTRAINT "exhibitors_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "job_offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
