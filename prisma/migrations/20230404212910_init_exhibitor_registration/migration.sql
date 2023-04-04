-- CreateTable
CREATE TABLE "exhibitors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationNumber" TEXT,
    "contactPerson" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "exhibitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "exhibitorId" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "exhibitors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
