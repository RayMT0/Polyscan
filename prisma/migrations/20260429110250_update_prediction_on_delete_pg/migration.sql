-- DropForeignKey
ALTER TABLE "prediction" DROP CONSTRAINT "prediction_event_id_fkey";

-- DropForeignKey
ALTER TABLE "prediction" DROP CONSTRAINT "prediction_playground_id_fkey";

-- AddForeignKey
ALTER TABLE "prediction" ADD CONSTRAINT "prediction_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prediction" ADD CONSTRAINT "prediction_playground_id_fkey" FOREIGN KEY ("playground_id") REFERENCES "playground"("id") ON DELETE CASCADE ON UPDATE CASCADE;
