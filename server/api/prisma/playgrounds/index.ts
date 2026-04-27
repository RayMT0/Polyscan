export default defineEventHandler(async () =>{
    const data = await prisma.playground.findMany({
        orderBy: { createdAt: 'desc' },
    })

    

    return data;
})