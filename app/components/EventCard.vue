<script setup lang="ts">
import type { Event, TeamResponse } from '~/types/event';
import { formatGameScore, formatVolume } from '~/utils/format';


const props = defineProps<{
    event: Event;
}>();

const titleLabel = computed(() => {
    switch(props.event.seriesSlug) {
        case 'counter-strike':
            return 'CS2';
        case 'valorant':
            return 'Valorant';
        case 'dota-2':
            return 'Dota 2';
        case 'league-of-legends':
            return 'League of Legends';
        default:
            return props.event.seriesSlug || 'Unknown Series';
    }
})

const statusColor = computed(() => {
  if(props.event.live) {
    return 'success'
  } else {
    return 'info'
  }
})

const statusLabel = computed(() => {
  if(props.event.live) {
    return 'LIVE'
  } else {
    return 'Upcoming'
  }
})

function formatTime(time: string) {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const hktype = ref(true);
</script>

<template>
    <UCard
    class="group relative overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-primary/50"
    :class="event.live ? 'ring-1 ring-success/30' : ''"
    >
        <div class="flex flex-col gap-4">
        <!-- Top row -->
            <!-- Game Info -->
            <div class="flex flex-row items-center gap-3 lg:min-w-48">
                <!-- Game Icon -->
                <div class="flex items-center justify-center size-10 rounded-lg">
                    <NuxtImg 
                        :src="event.seriesSlug === 'dota-2' 
                        ? '/dota2-league.png' : event.icon"
                        loading="lazy"
                        format="png"
                        class="size-10 object-contain rounded-lg" 
                    />
                </div>

                <!-- Game Description -->
                <div class="flex flex-col">
                    <!-- Game Title & Period -->
                    <div class="flex flex-row gap-3 items-center">
                        <!-- Status Badge -->
                        <div class="flex items-center gap-1">
                            <div :class="'text-' + statusColor" class="text-xs font-bold">
                                <span
                                    v-if="event.live"
                                    class="mr-0.5 inline-block size-2 rounded-full bg-success animate-pulse"
                                />
                                {{ statusLabel }}
                            </div>
                        </div>
                        <div class="flex font-semibold text-default text-sm gap-1 items-center">
                            <span>Today,</span>
                            <span>Game {{ event.period.split('/')[0] }}</span>
                            <span class="mx-0.5 inline-block size-1.5 rounded-full bg-white"/>
                            <span>Best of {{ event.period.split('/')[1] }}</span>
                        </div>
                    </div>
                    <!-- Game Volume Traded & League -->
                    <div class="flex flex-row gap-1">
                        <span class="text-sm text-muted">${{ formatVolume(event.volume) }} Vol.</span>
                        <span class="text-sm text-muted">
                            {{ event.eventMetadata.league }} {{ event.eventMetadata.serie }}
                        </span>
                    </div>
                </div>
                
            </div>

        <!-- Main Row -->
        <div class="flex flex-row w-full @max-[490px]:flex-col gap-3">

            <!-- Teams -->
            <div class="flex flex-col gap-3 items-center w-full lg:w-auto lg:flex-1 @max-[490px]:w-full">
                <!-- Team 1 -->
                <div class="flex flex-row items-center gap-3 rounded-lg py-2 w-full overflow-hidden">
                    <UBadge color="neutral" variant="outline" size="lg" class="flex justify-center items-center h-6 bg-muted px-2 min-w-8 tabular-nums">
                        {{ formatGameScore(event.score, 1) }}
                    </UBadge>
                    <div class="flex items-center gap-3 w-full">
                        <NuxtImg 
                            :src="event.teamA?.logo || ''"
                            loading="lazy"
                            format="png"
                            class="size-8 object-contain rounded-lg" />
                        <span 
                            class="flex flex-1 min-w-0 max-w-full font-medium text-default overflow-hidden">
                            {{ event.market?.team1 || 'Team A' }}
                        </span>
                    </div>
                    
                </div>

                <!-- Team 2 -->
                <div class="flex flex-row items-center gap-3 rounded-lg py-2 w-full overflow-hidden">
                    <UBadge color="neutral" variant="outline" size="lg" class="flex justify-center items-center h-6 bg-muted px-2 min-w-8 tabular-nums">
                        {{ formatGameScore(event.score, 2) }}
                    </UBadge>
                    <div class="flex items-center gap-3 w-full">
                        <NuxtImg 
                            :src="event.teamB?.logo || ''"
                            loading="lazy"
                            format="png"
                            class="size-8 object-contain rounded-lg" />
                        <span 
                            class="flex flex-1 min-w-0 max-w-full font-medium text-default overflow-hidden">
                            {{ event.market?.team2 || 'Team B' }}
                        </span>
                    </div>
                    
                </div>
            </div>

            <!-- Odds Button -->
            <div class="flex flex-1 justify-end items-center"> 
                <div class="flex items-end gap-2 w-64.5 @max-[490px]:w-full">
                    <button 
                        :style="{'--team-color': event.teamA?.color || '#ccc'}" 
                        :class="event.teamA?.color ? 'bg-(--team-color)' : 'bg-primary'"
                        class="flex-1 w-full rounded-lg h-11 cursor-pointer hover:opacity-90"
                        type="button"
                        selected="true"
                        data-three-dee
                        tabindex="0"
                        data-tapstate="rest"
                    >
                        <p class="flex flex-1 h-full items-center text-center justify-center font-semibold leading-5.21!">
                            <span class="text-xs text-white opacity-70">
                                {{ event.teamA?.abbreviation.toUpperCase() || 'N/A' }}
                            </span>
                            <span class="text-sm ml-1 opacity-100">
                                {{ hktype ? (1/(event.market?.odds1 || 1)-1).toFixed(2) : event.market?.odds1 || 'N/A' }}
                            </span>
                        </p>
                    </button>
                    <button
                        :style="{'--team-color': event.teamB?.color || '#ccc'}" 
                        :class="event.teamB?.color ? 'bg-(--team-color)' : 'bg-primary'"
                        class="flex-1 w-full rounded-lg h-11 cursor-pointer hover:opacity-90"
                    >
                        <p class="flex flex-1 h-full items-center text-center justify-center font-semibold leading-5.21!">
                            <span class="text-xs text-white opacity-70">
                                {{ event.teamB?.abbreviation.toUpperCase() || 'N/A' }}
                            </span>
                            <span class="text-sm ml-1 opacity-100">
                                {{ hktype ? (1/(event.market?.odds2 || 1)-1).toFixed(2) : event.market?.odds2 || 'N/A' }}
                            </span>
                        </p>
                    </button>
                </div>
            </div>
        </div>
            <!-- Time  -->
            <!-- <div class="flex items-center gap-2 lg:min-w-24 justify-end">
                <span class="text-sm text-muted">
                    Live Odds
                </span>
                <UIcon name="i-lucide-chevron-right" class="size-4 text-muted" />
            </div> -->
        </div>

        <!-- Live glow effect -->
        <div 
            v-if="event.live"
            class="absolute inset-0 pointer-events-none bg-linear-to-r from-success/5 via-transparent to-success/5"
        />
    </UCard>
</template>