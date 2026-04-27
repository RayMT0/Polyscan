import type { PlaygroundSidebar } from "~/types/playground"

// All playgrounds fetch
export const usePlaygrounds = () => {
    const { data, pending, refresh } = useFetch<PlaygroundSidebar[]>('/api/prisma/playgrounds',{
        key: 'playgrounds',
    })

    const selectedPlaygroundId = useState<string | null>(
        'selectedPlaygroundId', 
        () => null
    )

    const selectPlayground = (id: string) => {
        selectedPlaygroundId.value = id

        navigateTo(`/playgrounds/${id}`)
    }

    return {
        playgrounds: data,
        pending,
        refresh,
        selectedPlaygroundId,
        selectPlayground,
    }
}

// Single playground fetch
export const usePlaygroundSingle = () => {
    //Code here
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