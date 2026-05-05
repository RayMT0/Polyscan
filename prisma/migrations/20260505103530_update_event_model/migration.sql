/*
  Warnings:

  - A unique constraint covering the columns `[polymarket_id]` on the table `event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "event_polymarket_id_key" ON "event"("polymarket_id");
