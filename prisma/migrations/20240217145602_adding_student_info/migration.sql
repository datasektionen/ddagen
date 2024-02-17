-- CreateTable
CREATE TABLE "Students" (
    "id" TEXT NOT NULL,
    "ugkthid" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "emails" TEXT NOT NULL,
    "study_year" INTEGER NOT NULL,
    "summerJob" BOOLEAN NOT NULL,
    "partTimeJob" BOOLEAN NOT NULL,
    "internship" BOOLEAN NOT NULL,
    "masterThesis" BOOLEAN NOT NULL,
    "fullTimeJob" BOOLEAN NOT NULL,
    "traineeProgram" BOOLEAN NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_ugkthid_key" ON "Students"("ugkthid");
