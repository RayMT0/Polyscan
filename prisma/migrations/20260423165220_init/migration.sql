-- CreateEnum
CREATE TYPE "PredictionStatus" AS ENUM ('ACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "PredictionResult" AS ENUM ('WIN', 'LOSS', 'ONGOING');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('ONGOING', 'RESOLVED', 'CANCELLED');

-- CreateTable
CREATE TABLE "playground" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pnl" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "win_rate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "active_value" INTEGER NOT NULL DEFAULT 0,
    "active_predictions" INTEGER NOT NULL DEFAULT 0,
    "total_predictions" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "playground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prediction" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "PredictionStatus" NOT NULL DEFAULT 'ACTIVE',
    "result_status" "PredictionResult" NOT NULL DEFAULT 'ONGOING',
    "value" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "result_value" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "odds_title" TEXT NOT NULL,
    "odds" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "event_id" TEXT NOT NULL,
    "playground_id" TEXT NOT NULL,

    CONSTRAINT "prediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "polymarket_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'ONGOING',

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "prediction" ADD CONSTRAINT "prediction_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prediction" ADD CONSTRAINT "prediction_playground_id_fkey" FOREIGN KEY ("playground_id") REFERENCES "playground"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
