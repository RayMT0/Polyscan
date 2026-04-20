import axios from "axios";
import { buildParams } from "~/utils/format";
import type { TeamResponse } from "~/types/event";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const names = Array.isArray(query.names) ? query.names : [query.names].filter(Boolean);

    const res = await axios.get(
        "https://gamma-api.polymarket.com/teams",
        {
            params: {
                name: names,
            },
            paramsSerializer: (params) => buildParams(params)
        }
    );

    const data : TeamResponse[] = res.data.map((team: any) => ({
        name: team.name,
        logo: team.logo,
        abbreviation: team.abbreviation,
        color: team.color,
    }));

    return data;
});