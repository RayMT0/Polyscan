import axios from "axios";
import { z } from "zod";

export const getActiveMarkets = {
  description: "Get active esports prediction markets from Polymarket",

  inputSchema: z.object({
    limit: z.number().optional().default(10)
  }),

  handler: async ({ limit }: { limit: number }) => {
    const res = await axios.get(
      "https://gamma-api.polymarket.com/events",
      {
        params: {
          limit,
          ascending: true,
          series_id: [10311, 10309],
          tag_id: 100639,
          closed: false,
          live: true,
          event_date: new Date().toISOString().split("T")[0],
          order: "endDate"
        }
      }
    );

    return res.data.map((event: any) => {
      const market = event.markets?.[0] || {};

      return {
        id: event.id,
        question: event.title,
        probability: market?.outcomes?.[0]?.price ?? null,
        volume: market?.volume ?? 0,
        endDate: event.endDate
      };
    });
  }
};