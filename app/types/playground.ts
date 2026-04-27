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
  status: PredictionsStatus;
  resultStatus: PredictionsResultStatus;
  value: number;
  resultValue: number;
  oddsTitle: string;
  odds: number;
  createdAt: string;
  updatedAt: string;
  playgroundId: string;
  eventId: string;
}

export const PredictionStatus = {
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED'
} as const

export type PredictionsStatus = typeof PredictionStatus[keyof typeof PredictionStatus]

export const PredictionResultStatus = {
  WIN: 'WIN',
  LOSS: 'LOSS',
  ONGOING: 'ONGOING'
} as const

export type PredictionsResultStatus = typeof PredictionResultStatus[keyof typeof PredictionResultStatus]

