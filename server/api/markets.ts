import type { MCPResponse } from "~/types/mcp";
import type { MarketResponse } from "~/types/market";

export default defineEventHandler(async () => {
    const config = useRuntimeConfig();

    const res = await $fetch<MCPResponse<MarketResponse[]>>(
        `${config.MCP_URL}/mcp`,
    {
        method: "POST",
        body: {
            tool: "getActiveMarkets",
            input: { limit: 10 },
        }
    });

    return res.result;
});