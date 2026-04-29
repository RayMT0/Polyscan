import type { NewPlayground } from '~/types/playground'

export default defineEventHandler(async (event) =>{
    const body = await readBody<NewPlayground>(event)

    const res = await prisma.playground.create({
        data:{
            name: body.name,
            initialBalance: body.initialBalance,
            currentBalance: body.initialBalance,
        }
    })

    return res;
})