import axios from "axios";
import { buildParams } from "~/composables/utils";
import type { EventResponse, MarketResponse } from "~/types/event";


export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const limit = Number(query.limit) || 10;

    const res = await axios.get(
        "https://gamma-api.polymarket.com/events",
        {
            params: {
                limit,
                ascending: true,
                series_id: [10311, 10310, 10309, 10369],
                tag_id: 100639,
                closed: false,
                active: true,
                live: true,
                ended: false,
                event_date: new Date().toISOString().split("T")[0],
                order: "startTime"
            },
            paramsSerializer: (params) => buildParams(params)
        }
    );

    const data : EventResponse[] = res.data.map((event: any) => {
        const marketRes = event.markets?.find((m: MarketResponse) => m.sportsMarketType === "moneyline") ||
        event.markets?.[0]; 

        const market : MarketResponse | null = marketRes ? {
            id: marketRes.id,
            question: marketRes.question,
            team1: marketRes.outcomes ? JSON.parse(marketRes.outcomes)[0] : "Team A",
            team2: marketRes.outcomes ? JSON.parse(marketRes.outcomes)[1] : "Team B",
            odds1: marketRes.outcomePrices ? JSON.parse(marketRes.outcomePrices).map(Number)[0] : 1.0,
            odds2: marketRes.outcomePrices ? JSON.parse(marketRes.outcomePrices).map(Number)[1] : 1.0,
            volume: marketRes.volume24hr,
            groupItemTitle: marketRes.groupItemTitle,
            liquidityNum: marketRes.liquidityNum,
            gameStartTime: marketRes.gameStartTime,
            sportsMarketType: marketRes.sportsMarketType,
        } : null;


        return {
            id: event.id,
            question: event.title,
            resolutionSource: event.resolutionSource,
            icon: event.icon,
            liquidity: event.liquidity,
            volume: event.volume24hr,
            probability: null,
            startTime: event.startTime,
            score: event.score,
            period: event.period,
            live: event.live,
            seriesSlug: event.seriesSlug,
            market: market || null,
        };
    });

    return data;
});