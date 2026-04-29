import type { PlaygroundSidebar } from "~/types/playground"

// All playgrounds fetch
export const usePlaygrounds = () => {
    const { data, pending, refresh } = useFetch<PlaygroundSidebar[]>('/api/prisma/playgrounds',{
        key: 'playgrounds',
    })

    const deletingId = ref<string | null>(null)
    const deletePlayground = async (id: string) =>{
        deletingId.value = id;
        try {
            const res = await $fetch('/api/prisma/playgrounds/delete', {
                method: 'DELETE',
                body: {id: id}
            })

            await refresh();
        } catch (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to delete playground'
            })
        } finally {
            deletingId.value = null;
        }
    }

    return {
        playgrounds: data,
        pending,
        refresh,
        deletePlayground,
        deletingId,
    }
}

//Playground UI states
export const usePlaygroundStates = () => {
    const isCreatingPlayground = useState<boolean>(
        'isCreatingPlayground',
        () => false
    );
    const sidebarOpen = useState<boolean>('sidebarOpen', () => true)



    return {
        isCreatingPlayground,
        sidebarOpen
    }
}