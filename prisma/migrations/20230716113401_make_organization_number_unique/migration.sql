/*
  Warnings:

  - A unique constraint covering the columns `[organizationNumber]` on the table `exhibitors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "exhibitors_organizationNumber_key" ON "exhibitors"("organizationNumber");
