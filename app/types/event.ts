import type { EventStatus } from "~~/prisma/generated/enums";

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

export type SelectedEvent = {
  id: string;
  title: string;
  teamA: TeamResponse | null;
  teamB: TeamResponse | null;
  oddsA: number;
  oddsB: number;
  selectedOdds: number;
}

export type CreateEventDB = {
  polymarketId: string;
  name: string;
  status: EventStatus;
}

export interface EventCounts{
  live: number,
  soon: number,
  dota2: number,
  cs2: number,
  lol: number,
  valo: number,
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