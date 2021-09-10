-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "type" VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN     "status" VARCHAR(255) DEFAULT E'SIGNEDUP';
