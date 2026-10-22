-- AlterEnum
ALTER TYPE "ExtraOrderHistoryType" ADD VALUE 'UPDATED_ORDER';

-- AlterTable
ALTER TABLE "ExtraOrderHistory" ADD COLUMN     "amount" INTEGER,
ADD COLUMN     "price_per_unit" MONEY,
ADD COLUMN     "type" TEXT;
