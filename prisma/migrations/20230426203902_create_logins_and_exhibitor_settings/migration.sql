/*
  Warnings:

  - You are about to drop the column `contactPerson` on the `exhibitors` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `exhibitors` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `extraBanquetTickets` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraChairs` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraDrinkCoupons` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraRepresentativeSpots` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraTables` to the `exhibitors` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Package" AS ENUM ('base', 'sponsor', 'headhunter', 'premium');

-- CreateEnum
CREATE TYPE "allergen_information_type" AS ENUM ('BANQUET', 'REPRESENTATIVE_SPOT');

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_exhibitorId_fkey";

-- AlterTable
ALTER TABLE "exhibitors" DROP COLUMN "contactPerson",
DROP COLUMN "phoneNumber",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "extraBanquetTickets" INTEGER NOT NULL,
ADD COLUMN     "extraChairs" INTEGER NOT NULL,
ADD COLUMN     "extraDrinkCoupons" INTEGER NOT NULL,
ADD COLUMN     "extraRepresentativeSpots" INTEGER NOT NULL,
ADD COLUMN     "extraTables" INTEGER NOT NULL,
ADD COLUMN     "invoiceEmail" TEXT,
ADD COLUMN     "logo" BYTEA,
ADD COLUMN     "package" "Package";

-- DropTable
DROP TABLE "accounts";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" TEXT,
    "exhibitorId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_codes" (
    "id" CHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "login_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "lastUsed" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userId_key" ON "sessions"("userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "exhibitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login_codes" ADD CONSTRAINT "login_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allergen_informations" ADD CONSTRAINT "allergen_informations_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "exhibitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
