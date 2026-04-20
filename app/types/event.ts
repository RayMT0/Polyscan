export interface Event {
  id: string;
  question: string;
  slug: string;
  resolutionSource: string;
  icon: string;
  liquidity: number;
  probability: number | null;
  volume: number;
  startTime: string;
  score: string;
  period: string;
  live: boolean;
  seriesSlug: string;
  market: Market | null;
  teamA: TeamResponse | null;
  teamB: TeamResponse | null;
  eventMetadata: EventMetadataResponse;
}

export interface Market {
  id: string;
  question: string;
  team1: string;
  team2: string;
  odds1: number;
  odds2: number;
  volume: number;
  groupItemTitle: string;
  liquidityNum: number;
  gameStartTime: string;
  sportsMarketType: string;
};

export type EventResponse = {
  id: string;
  question: string;
  slug: string;
  resolutionSource: string;
  icon: string;
  liquidity: number;
  probability: number | null;
  volume: number;
  startTime: string;
  score: string;
  period: string;
  live: boolean;
  seriesSlug: string;
  market: MarketResponse | null;
  teamA: TeamResponse | null;
  teamB: TeamResponse | null;
  eventMetadata: EventMetadataResponse;
};

export type MarketResponse = {
  id: string;
  question: string;
  team1: string;
  team2: string;
  odds1: number;
  odds2: number;
  volume: number;
  groupItemTitle: string;
  liquidityNum: number;
  gameStartTime: string;
  sportsMarketType: string;
};

export type TeamResponse = {
  name: string;
  logo: string;
  abbreviation: string;
  color: string;
}

export type EventMetadataResponse = {
  league: string;
  serie: string;
  tournament: string;
}