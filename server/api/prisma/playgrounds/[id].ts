export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    if(!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing playground ID",
        })
    }

    const playground = await prisma.playground.findUnique({
        where: { id },
        include: { 
            predictions: true 
        }
    })

    if(!playground){
        throw createError({
            statusCode: 404,
            statusMessage: "Playground not found"
        })
    }

    return playground;
})