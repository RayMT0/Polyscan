export async function syncPlaygrounds(){
    const predictions = await prisma.prediction.findMany({
        where: {
            status: "CLOSED",
            resolvedSync: false,
        }
    })

    //Group the prediction based on the same playground
    const groupedPrediction = new Map<string, typeof predictions>()

    for(const prediction of predictions){
        const existing = groupedPrediction.get(prediction.playgroundId)

        if(existing){
            existing.push(prediction)
        }else{
            groupedPrediction.set(
                prediction.playgroundId,
                [prediction]
            )
        }
    }

    //Process playground stat sync per prediction group
    for (const [playgroundId, predictions] of groupedPrediction){
        let winCountDelta = 0
        let balanceDelta = 0
        let valueDelta = 0
        let pnlDelta = 0
        

        for(const prediction of predictions){
            const baseValue = prediction.value.toNumber()
            const resultValue = prediction.resultValue.toNumber()

            valueDelta += baseValue;

            if(prediction.resultStatus === "WIN"){
                pnlDelta += resultValue;
                balanceDelta += resultValue;
                winCountDelta++;
            }
            else if(prediction.resultStatus === "LOSS"){
                pnlDelta -= resultValue;
            }
        }

        await prisma.$transaction(async (tx) => {
            //Update the playground
            await tx.playground.update({
                where: {
                    id: playgroundId
                },
                data: {
                    currentBalance: {
                        increment: balanceDelta,
                    },
                    pnL: {
                        increment: pnlDelta,
                    },
                    winCount: {
                        increment: winCountDelta,
                    },
                    activeValue: {
                        decrement: valueDelta,
                    },
                    activePredictions: {
                        decrement: predictions.length
                    }
                }
            })

            //Update prediction
            await tx.prediction.updateMany({
                where: {
                    id: {
                        in: predictions.map(p => p.id)
                    }
                },
                data: {
                    resolvedSync: true
                }
            })
        })
    }
}