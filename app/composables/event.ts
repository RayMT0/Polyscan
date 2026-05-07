import type { Event, SelectedEvent, TeamResponse } from "~/types/event"

const selectedEvent = ref<SelectedEvent | null>(null)
const selectedTeam = ref<TeamResponse | null>(null)
export const useEvents = () => {

    const selectEvent = (event: Event | null, team: TeamResponse | null, selectedOdds?: number) => {
        if(event){
            selectedEvent.value = {
                id: event.id,
                title: `${event.teamA?.name ?? 'Team A'} vs ${event.teamB?.name ?? 'Team B'}`,
                teamA: event.teamA,
                teamB: event.teamB,
                oddsA: event.market?.odds1 ?? 1,
                oddsB: event.market?.odds2 ?? 1,
                selectedOdds: selectedOdds ?? 1
            }
        }else{
            selectedEvent.value = null
        }
        selectedTeam.value = team
        console.log(selectedEvent.value, selectedTeam.value)
    }
    return {
        selectedEvent,
        selectedTeam,
        selectEvent,
    }
}