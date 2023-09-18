BEGIN;

-- 1. Create the new enum type
CREATE TYPE "FoodPreferencesValue_new" AS ENUM ('Meat', 'Vegan', 'LactoseFree', 'GlutenFree', 'None');

-- 2. Add a new temporary column to the table
ALTER TABLE "food_specifications" ADD COLUMN "temp_value" "FoodPreferencesValue_new"[];

-- 3. Cast values from the old column to the new column
UPDATE "food_specifications" 
SET "temp_value" = ARRAY(
  SELECT UNNEST("value")::text::"FoodPreferencesValue_new"
);

-- 4. Drop the old column and rename the temporary column
ALTER TABLE "food_specifications" DROP COLUMN "value";
ALTER TABLE "food_specifications" RENAME COLUMN "temp_value" TO "value";

-- 5. Rename and drop the old enum type
ALTER TYPE "FoodPreferencesValue" RENAME TO "FoodPreferencesValue_old";
ALTER TYPE "FoodPreferencesValue_new" RENAME TO "FoodPreferencesValue";
DROP TYPE "FoodPreferencesValue_old";

COMMIT;
