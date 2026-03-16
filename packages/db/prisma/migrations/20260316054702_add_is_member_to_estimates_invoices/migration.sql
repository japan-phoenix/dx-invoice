-- AlterTable
ALTER TABLE "estimates" ADD COLUMN     "is_member" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "is_member" BOOLEAN NOT NULL DEFAULT false;
