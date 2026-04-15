export interface Market {
    id: string;
    question: string;
    probability: number;
    volume: number;
    startTime: string;
    score: string;
  }

export type MarketResponse = {
  id: string;
  question: string;
  probability: number | null;
  volume: number;
  startTime: string;
  score: string;
};