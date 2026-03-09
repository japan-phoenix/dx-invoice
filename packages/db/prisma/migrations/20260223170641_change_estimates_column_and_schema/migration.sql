-- AlterEnum
ALTER TYPE "AltarPlaceType" ADD VALUE 'OTHER';

-- AlterTable
ALTER TABLE "estimates" ADD COLUMN     "altar_place_other" VARCHAR(100);

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "altar_place_other" VARCHAR(100);
