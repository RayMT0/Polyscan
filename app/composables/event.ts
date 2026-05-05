import type { Event, TeamResponse } from "~/types/event"

const selectedEvent = ref<Event | null>(null)
const selectedTeam = ref<TeamResponse | null>(null)
export const useEvents = () => {

    const selectEvent = (event: Event | null, team: TeamResponse | null) => {
        selectedEvent.value = event
        selectedTeam.value = team
        console.log(selectedEvent.value, selectedTeam.value)
    }
    return {
        selectedEvent,
        selectedTeam,
        selectEvent,
    }
}