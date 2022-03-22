-- CreateTable
CREATE TABLE "NodbankWaitlist" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "NodbankWaitlist.id_unique" ON "NodbankWaitlist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NodbankWaitlist.email_unique" ON "NodbankWaitlist"("email");
