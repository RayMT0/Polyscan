import type { PredictionResult, PredictionStatus } from "~~/prisma/generated/enums";
import type { CreateEventDB } from "./event";

export interface PlaygroundSidebar {
  id: string;
  name: string;
  initialBalance: number;
}

export interface NewPlayground {
  name: string;
  initialBalance: number;
}

export interface Playground extends PlaygroundSidebar{
  currentBalance: number;
  pnL: number;
  pnlPercentage: number;
  winCount: number;
  winRate: number;
  activeValue: number;
  activePredictions: number;
  totalPredictions: number;
  createdAt: string;
  updatedAt: string;
  predictions: Prediction[];
}

export interface Prediction {
  id: string;
  title: string;
  status: PredictionStatus;
  resultStatus: PredictionResult;
  value: number;
  resultValue: number;
  oddsTitle: string;
  odds: number;
  createdAt: string;
  updatedAt: string;
  playgroundId: string;
  eventId: string;
}

export type CreatePredictionDB = {
  title: string;
  status: PredictionStatus;
  resultStatus: PredictionResult;
  value: number;
  resultValue: number;
  oddsTitle: string;
  odds: number;
  playgroundId: string;
  eventData: CreateEventDB;
}

