/*
  Warnings:

  - You are about to drop the column `balance` on the `playground` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "playground" DROP COLUMN "balance",
ADD COLUMN     "current_balance" DECIMAL(15,2) NOT NULL DEFAULT 0,
ADD COLUMN     "initial_balance" DECIMAL(15,2) NOT NULL DEFAULT 0;
