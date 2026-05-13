import { fetchOngoingEvent } from "../api/prisma/events/fetchOngoingEvents";

export async function resolveEvents() {
    //Fetch ONGOING events from DB
    const ongoingEvent = await fetchOngoingEvent();

    for(const event of ongoingEvent) {
        //Check Polymarket
        const marketResolver = await fetchMarketResolver(event.polymarketId)

        //If not resolved skip
        if(!marketResolver.resolved) continue;

        await prisma.$transaction(async (tx) => {
            //Update prisma events
            await tx.event.update({
                where: {
                    id: event.id
                },
                data: {
                    status: "RESOLVED"
                }
            })

            //Update Predictions
            for (const prediction of event.predictions){
                //Win or Loss Decider
                const result =
                    (marketResolver.team1 === prediction.oddsTitle && 
                    marketResolver.odds1 > marketResolver.odds2) ||
                    (marketResolver.team2 === prediction.oddsTitle && 
                    marketResolver.odds2 > marketResolver.odds1);

                const resultStatus = result ? "WIN" : "LOSS"
                await tx.prediction.update({
                    where: {
                        id: prediction.id
                    },
                    data: {
                        status: "CLOSED",
                        resultStatus
                    }
                })
            }
        })
    }
}