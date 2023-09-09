-- AlterTable
ALTER TABLE "exhibitors" ADD COLUMN     "customBanquetTicketsWanted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "customChairs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "customDrinkCoupons" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "customRepresentativeSpots" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "customTables" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "extraTables" SET DEFAULT 0,
ALTER COLUMN "extraChairs" SET DEFAULT 0,
ALTER COLUMN "extraDrinkCoupons" SET DEFAULT 0,
ALTER COLUMN "extraRepresentativeSpots" SET DEFAULT 0,
ALTER COLUMN "totalBanquetTicketsWanted" SET DEFAULT 0;
