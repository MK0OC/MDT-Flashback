-- CreateTable
CREATE TABLE "interventions" (
    "id" TEXT NOT NULL,
    "citizenId" TEXT NOT NULL,
    "clinicalExam" TEXT NOT NULL,
    "careProvided" TEXT NOT NULL,
    "checkup" TEXT NOT NULL,
    "ata" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interventions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "citizen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
