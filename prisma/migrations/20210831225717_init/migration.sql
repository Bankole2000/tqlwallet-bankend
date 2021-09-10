-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(255),
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255),
    "country" VARCHAR(255),
    "state" VARCHAR(255),
    "city" VARCHAR(255),
    "address" VARCHAR(255),
    "zipCode" VARCHAR(255),
    "bvn" VARCHAR(255),
    "bank" VARCHAR(255),
    "accountNo" VARCHAR(255),
    "lastLogin" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "actorUuid" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) DEFAULT E'New Transaction',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User.id_unique" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction.id_unique" ON "Transaction"("id");
