import axios from "axios";
import { buildParams } from "~/utils/format";

export async function fetchLiveEvents(limit?: number){

    const res = await axios.get(
        "https://gamma-api.polymarket.com/events",
        {
            params: {
                ascending: false,
                series_id: [10311, 10310, 10309, 10369],
                tag_id: 100639,
                closed: false,
                active: true,
                live: true,
                ended: false,
                event_date: new Date().toISOString().split("T")[0],
                order: "volume",
                ...(limit !== undefined && { limit }),
            },
            paramsSerializer: (params) => buildParams(params)
        }
    );

    return res;
}