/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exhibitors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_exhibitorId_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "exhibitors";

-- CreateTable
CREATE TABLE "exhibitor_interest_registrations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationNumber" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "exhibitor_interest_registrations_pkey" PRIMARY KEY ("id")
);
