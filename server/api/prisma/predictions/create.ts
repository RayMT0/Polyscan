import { CreatePredictionDB } from "~/types/playground"
import { Prisma } from "~~/prisma/generated/client"

export default defineEventHandler(async (event) => {
    const body = await readBody<CreatePredictionDB>(event)
    const { eventData, ...data } = body

    try {
        await prisma.$transaction(async (tx) => {
            const event = await tx.event.upsert({
                where: { polymarketId: eventData.polymarketId },
                update: {},
                create: {
                    polymarketId: eventData.polymarketId,
                    name: eventData.name,
                    status: eventData.status,
                }
            })

            await tx.prediction.create({
                data:{
                    ...data,
                    eventId: event.id
                }
            })

            await tx.playground.update({
                where: { id: body.playgroundId },
                data: {
                    totalPredictions: { increment: 1 },
                    activePredictions: { increment: 1 },
                    activeValue: { increment: body.value },
                    currentBalance: { decrement: body.value },
                }
            })
        })
    } catch (err) {
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            console.error('DB Transaction error: ', err.code, err.message)
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create prediction'
        })
    }
})