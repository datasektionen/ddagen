-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "ugkthid" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "prefered_email" TEXT NOT NULL,
    "study_year" INTEGER NOT NULL,
    "summerJob" BOOLEAN NOT NULL,
    "partTimeJob" BOOLEAN NOT NULL,
    "internship" BOOLEAN NOT NULL,
    "masterThesis" BOOLEAN NOT NULL,
    "fullTimeJob" BOOLEAN NOT NULL,
    "traineeProgram" BOOLEAN NOT NULL,
    "cv" TEXT NOT NULL,
    "linkedin_url" TEXT NOT NULL,
    "github_url" TEXT NOT NULL,
    "other_link" TEXT NOT NULL,
    "personal_story" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_ugkthid_key" ON "students"("ugkthid");
