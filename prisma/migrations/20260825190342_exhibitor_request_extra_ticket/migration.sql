-- AlterTable
ALTER TABLE "ExtraOrderItem" ADD COLUMN     "ticket_comment" TEXT,
ADD COLUMN     "ticket_name" TEXT,
ADD COLUMN     "ticket_value" "FoodPreferencesValue"[] DEFAULT ARRAY[]::"FoodPreferencesValue"[];
