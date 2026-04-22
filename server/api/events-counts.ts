import { EventCounts } from "~/types/event"
import { 
    fetchGameEvents, fetchLiveEvents, fetchSoonEvents
} from "../utils" 

export default defineEventHandler(async () =>{
    const [
        live, soon, liveDota2, soonDota2, liveCS2, soonCS2, liveLol, soonLol, liveValo, soonValo
    ] = await Promise.all([
        fetchLiveEvents(),
        fetchSoonEvents(),
        fetchGameEvents(true, 10309),
        fetchGameEvents(false, 10309),
        fetchGameEvents(true, 10310),
        fetchGameEvents(false, 10310),
        fetchGameEvents(true, 10311),
        fetchGameEvents(false, 10311),
        fetchGameEvents(true, 10369),
        fetchGameEvents(false, 10369),
        
    ])

    const data : EventCounts = {
        live: live.data.length,
        soon: soon.data.length,
        dota2: liveDota2.data.length + soonDota2.data.length,
        cs2: liveCS2.data.length + soonCS2.data.length,
        lol: liveLol.data.length + soonLol.data.length,
        valo: liveValo.data.length + soonValo.data.length,
    }

    return data;
})
