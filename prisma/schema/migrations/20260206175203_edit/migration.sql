/*
  Warnings:

  - You are about to drop the `Citizen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pathologies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pathologies" DROP CONSTRAINT "Pathologies_citizenId_fkey";

-- DropForeignKey
ALTER TABLE "emergency_contact" DROP CONSTRAINT "emergency_contact_citizenId_fkey";

-- DropForeignKey
ALTER TABLE "emergency_contact" DROP CONSTRAINT "emergency_contact_contactId_fkey";

-- DropTable
DROP TABLE "Citizen";

-- DropTable
DROP TABLE "Pathologies";

-- CreateTable
CREATE TABLE "citizen" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "picture" TEXT,
    "attentingMedic" TEXT,
    "bloodType" "BloodType",
    "mutual" TEXT,
    "addictions" TEXT,
    "allergies" TEXT,
    "threatments" TEXT,
    "pathology" TEXT,
    "contraindications" TEXT,
    "Antecedents" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "citizen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pathologies" (
    "id" TEXT NOT NULL,
    "citizenId" TEXT NOT NULL,
    "doctor" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pathologies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "emergency_contact" ADD CONSTRAINT "emergency_contact_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "citizen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_contact" ADD CONSTRAINT "emergency_contact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "citizen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pathologies" ADD CONSTRAINT "pathologies_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "citizen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
