export interface Playground {
  id: string;
  name: string;
  initialBalance: number;
  currentBalance: number;
  lastUpdated: Date;
}

export interface Prediction {
  id: string;
  playgroundId: string;
  eventName: string;
  side: string;
  amount: number;
  potentialWinnings: number;
  status: 'active' | 'closed';
  result?: 'win' | 'loss';
}
