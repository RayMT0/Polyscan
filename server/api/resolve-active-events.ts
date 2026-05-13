
export default defineEventHandler(async () => {
    try {
        await resolveEvents();
        await syncPlaygrounds();
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to resolve all ongoing events'
        })
    }
})