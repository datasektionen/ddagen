-- CreateEnum
CREATE TYPE "ExtraOrderHistoryType" AS ENUM ('CREATED_REQUEST', 'CANCELED_REQUEST', 'ACCEPTED_REQUEST', 'UPDATED_REQUEST', 'CREATED_ORDER', 'CANCELED_ORDER');

-- CreateTable
CREATE TABLE "ExtraOrderItem" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "price_per_unit" MONEY NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExtraOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraOrderReq" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "exhibitor_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtraOrderReq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraOrder" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "exhibitor_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtraOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraOrderHistory" (
    "id" TEXT NOT NULL,
    "exhibitor_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "action" "ExtraOrderHistoryType" NOT NULL,
    "person_name" TEXT NOT NULL,
    "person_email" TEXT NOT NULL,
    "person_is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExtraOrderHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExtraOrderReq_item_id_key" ON "ExtraOrderReq"("item_id");

-- AddForeignKey
ALTER TABLE "ExtraOrderReq" ADD CONSTRAINT "ExtraOrderReq_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ExtraOrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraOrderHistory" ADD CONSTRAINT "ExtraOrderHistory_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ExtraOrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
