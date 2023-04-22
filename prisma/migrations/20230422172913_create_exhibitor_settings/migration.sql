/*
  Warnings:

  - You are about to drop the column `contactPerson` on the `exhibitors` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `exhibitors` table. All the data in the column will be lost.
  - Added the required column `extraChairs` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraDrinkCoupons` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraRepresentativeSpots` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraTables` to the `exhibitors` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "allergen_information_type" AS ENUM ('BANQUET', 'REPRESENTATIVE_SPOT');

-- DropForeignKey
ALTER TABLE "login_codes" DROP CONSTRAINT "login_codes_accountId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_accountId_fkey";

-- AlterTable
ALTER TABLE "exhibitors" DROP COLUMN "contactPerson",
DROP COLUMN "phoneNumber",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "extraChairs" INTEGER NOT NULL,
ADD COLUMN     "extraDrinkCoupons" INTEGER NOT NULL,
ADD COLUMN     "extraRepresentativeSpots" INTEGER NOT NULL,
ADD COLUMN     "extraTables" INTEGER NOT NULL,
ADD COLUMN     "invoiceEmail" TEXT,
ADD COLUMN     "logo" BYTEA,
ADD COLUMN     "packageId" TEXT;

-- CreateTable
CREATE TABLE "contact_people" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "exhibitorId" TEXT NOT NULL,

    CONSTRAINT "contact_people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceSek" INTEGER NOT NULL,
    "representativeSpots" INTEGER NOT NULL,
    "banquetTickets" INTEGER NOT NULL,
    "drinkCoupons" INTEGER NOT NULL,
    "tables" INTEGER NOT NULL,
    "chairs" INTEGER NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allergen_informations" (
    "id" TEXT NOT NULL,
    "type" "allergen_information_type" NOT NULL,
    "value" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "exhibitorId" TEXT NOT NULL,

    CONSTRAINT "allergen_informations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exhibitors" ADD CONSTRAINT "exhibitors_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login_codes" ADD CONSTRAINT "login_codes_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_people" ADD CONSTRAINT "contact_people_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "exhibitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allergen_informations" ADD CONSTRAINT "allergen_informations_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "exhibitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
