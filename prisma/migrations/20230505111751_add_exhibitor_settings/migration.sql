-- CreateEnum
CREATE TYPE "Package" AS ENUM ('base', 'sponsor', 'headhunter', 'premium', 'main');

-- CreateEnum
CREATE TYPE "FoodSpecificationType" AS ENUM ('banquet', 'representative');

-- CreateTable
CREATE TABLE "exhibitors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationNumber" TEXT NOT NULL,
    "invoiceEmail" TEXT NOT NULL,
    "logoWhite" BYTEA,
    "logoColor" BYTEA,
    "description" TEXT NOT NULL,
    "package" "Package" NOT NULL,
    "extraTables" INTEGER NOT NULL,
    "extraChairs" INTEGER NOT NULL,
    "extraDrinkCoupons" INTEGER NOT NULL,
    "extraRepresentativeSpots" INTEGER NOT NULL,
    "totalBanquetTicketsWanted" INTEGER NOT NULL,

    CONSTRAINT "exhibitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_specifications" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "type" "FoodSpecificationType" NOT NULL,
    "exhibitorId" TEXT NOT NULL,

    CONSTRAINT "food_specifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "login_codes_userId_key" ON "login_codes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userId_key" ON "sessions"("userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "exhibitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login_codes" ADD CONSTRAINT "login_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_specifications" ADD CONSTRAINT "food_specifications_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "exhibitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
