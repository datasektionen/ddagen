/*
  Warnings:

  - Added the required column `customBanquetTicketsWanted` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customChairs` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customDrinkCoupons` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customRepresentativeSpots` to the `exhibitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customTables` to the `exhibitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exhibitors" ADD COLUMN     "customBanquetTicketsWanted" INTEGER NOT NULL,
ADD COLUMN     "customChairs" INTEGER NOT NULL,
ADD COLUMN     "customDrinkCoupons" INTEGER NOT NULL,
ADD COLUMN     "customRepresentativeSpots" INTEGER NOT NULL,
ADD COLUMN     "customTables" INTEGER NOT NULL;
