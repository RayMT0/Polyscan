export default defineEventHandler(async (event) =>{
    const body = await readBody<{id: string}>(event)

    const res = await prisma.playground.delete({
        where: { id: body.id }
    })
    return res;
})