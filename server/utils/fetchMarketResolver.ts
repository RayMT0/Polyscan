import axios from "axios";
import { MarketResolverResponse } from "~/types/event";

export async function fetchMarketResolver(id: string){

    const res = await axios.get(`https://gamma-api.polymarket.com/events/markets/${id}`);

    const market = res.data
    const data: MarketResolverResponse = {
        team1: market.outcomes ? JSON.parse(market.outcomes)[0] : "Team A",
        team2: market.outcomes ? JSON.parse(market.outcomes)[1] : "Team B",
        odds1: market.outcomePrices ? JSON.parse(market.outcomePrices).map(Number)[0] : 1.0,
        odds2: market.outcomePrices ? JSON.parse(market.outcomePrices).map(Number)[1] : 1.0,
        resolved: market.closed === true ? (
            market.umaResolutionStatus === "resolved" ? true : false
        ) : false
    }

    return data;
}