import axios from "axios";

export async function fetchGameEvents(live: boolean, seriesId: number, limit?: number){
    const res = await axios.get(
        "https://gamma-api.polymarket.com/events",
        {
            params: {
                ascending: false,
                series_id: seriesId,
                tag_id: 100639,
                closed: false,
                active: true,
                ended: false,
                event_date: new Date().toISOString().split("T")[0],
                order: "volume",
                ...(limit !== undefined && { limit }),
                ...(live ? {
                    live: true,
                }:{
                    start_time_min: new Date().toISOString(),
                })
            },
        }
    );

    return res;
}