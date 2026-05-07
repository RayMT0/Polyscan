export default defineEventHandler(async (event) =>{
    const query = getQuery(event)
    const sortBy = query.sortBy === 'update' ? 'updatedAt' : 'createdAt'

    const data = await prisma.playground.findMany({
        orderBy: { [sortBy]: 'desc' },
        select: { id: true, name: true, currentBalance: true }
    })
    return data;
})