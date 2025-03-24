-- AlterTable
ALTER TABLE "exhibitors" ADD COLUMN     "billingMethod" TEXT,
ADD COLUMN     "companyAddress" TEXT,
ALTER COLUMN "invoiceEmail" DROP NOT NULL;
