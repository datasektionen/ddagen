-- AlterTable
ALTER TABLE "exhibitors" ADD COLUMN     "extraMealCoupons" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "goodiebagLogo" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "industryType" TEXT,
ADD COLUMN     "lastChanged" TIMESTAMP(3),
ADD COLUMN     "panelDiscussion" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "socialMediaPost" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "food_specifications" ADD COLUMN     "alcPreference" INTEGER NOT NULL DEFAULT 1;
