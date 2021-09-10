-- CreateTable
CREATE TABLE "Event" (
    "eventId" TEXT NOT NULL,
    "model" VARCHAR(255),
    "id" TEXT,
    "type" TEXT,
    "name" TEXT,
    "data" JSON,
    "error" TEXT,
    "ip" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event.eventId_unique" ON "Event"("eventId");
