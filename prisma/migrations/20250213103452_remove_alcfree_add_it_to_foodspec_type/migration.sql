/*
  Warnings:

  - You are about to drop the column `alcPreference` on the `food_specifications` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "FoodPreferencesValue" ADD VALUE 'AlcoholFree';

-- AlterTable
ALTER TABLE "food_specifications" DROP COLUMN "alcPreference";
