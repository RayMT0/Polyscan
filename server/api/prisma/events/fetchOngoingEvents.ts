export async function fetchOngoingEvent(){
    const res = await prisma.event.findMany({
        where: { status: "ONGOING" },
        include: {
            predictions: {
                include: {
                    playground: true,
                }
            }
        }
    })

    return res;
}