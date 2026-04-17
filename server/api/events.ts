import axios from "axios";
import { buildParams } from "~/composables/utils";
import type { EventResponse, MarketResponse, TeamResponse } from "~/types/event";


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

    const data : EventResponse[] = await Promise.all(
        res.data.map(async (event: any) => {
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

            let teamA: TeamResponse | null = null;
            let teamB: TeamResponse | null = null;

            if(event.seriesSlug === 'counter-strike' || event.seriesSlug === 'valorant'){
                const teamsRes = await axios.get(
                    "https://gamma-api.polymarket.com/teams",
                    {
                        params: {
                            name: [market?.team1, market?.team2].filter(Boolean),
                            league: event.seriesSlug === 'counter-strike' ? 'csgo' : 'valorant',
                        },
                        paramsSerializer: (params) => buildParams(params)
                    }
                );
                const teamsData : TeamResponse[] = teamsRes.data.map((team: any) => ({
                    name: team.name,
                    logo: team.logo,
                    abbreviation: team.abbreviation,
                    color: team.color,
                }));
                teamA = teamsData.find((team) => team.name === market?.team1) || null;
                teamB = teamsData.find((team) => team.name === market?.team2) || null;
            }else{
                teamA = {
                    name: event.teams[0].name,
                    logo: event.teams[0].logo,
                    abbreviation: event.teams[0].abbreviation,
                    color: event.teams[0].color,
                };
                teamB = {
                    name: event.teams[1].name,
                    logo: event.teams[1].logo,
                    abbreviation: event.teams[1].abbreviation,
                    color: event.teams[1].color,
                }
            }

            return {
                id: event.id,
                question: event.title,
                slug: event.slug,
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
                teamA,
                teamB,
                // teamA: event.seriesSlug === 'counter-strike' ? null :{
                //     name: event.teams[0].name,
                //     logo: event.teams[0].logo,
                //     abbreviation: event.teams[0].abbreviation,
                //     color: event.teams[0].color,
                // },
                // teamB: event.seriesSlug === 'counter-strike' ? null :{
                //     name: event.teams[1].name,
                //     logo: event.teams[1].logo,
                //     abbreviation: event.teams[1].abbreviation,
                //     color: event.teams[1].color,
                // },
            };
        })
    );

    return data;
});