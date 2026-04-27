-- AlterTable
ALTER TABLE "playground" ADD COLUMN     "pnl_percentage" DECIMAL(5,2) NOT NULL DEFAULT 0,
ADD COLUMN     "win_count" INTEGER NOT NULL DEFAULT 0;
