<script setup lang="ts">
import type { Event } from '~/types/event';
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
    class="group relative overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-primary/50 cursor-default"
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
                <div class="flex flex-col flex-1">
                    <!-- Game Title & Period -->
                    <div class="flex flex-row gap-3 items-center">
                        <!-- Status Badge -->
                        <div class="flex items-center gap-1">
                            <div :class="'text-' + statusColor" class="text-xs font-bold flex flex-row items-center gap-2">
                                <span v-if="event.live" class="relative flex size-2">
                                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                                    <span class="relative inline-flex size-2 rounded-full bg-success"></span>
                                </span>
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
                    <div class="max-w-0 min-w-full overflow-hidden">
                        <span class="flex flex-row gap-1 line-clamp-1 whitespace-nowrap! overflow-hidden">
                            <span class="text-sm text-muted">${{ formatVolume(event.volume) }} Vol.</span>
                            <span class="text-sm text-toned">
                                {{ event.eventMetadata.league }} {{ event.eventMetadata.serie }} {{ event.eventMetadata.tournament }}
                            </span>
                        </span>
                    </div>
                </div>
                
                <!-- Game Stream -->
                <WatchButton :link="event.resolutionSource"/>
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
                    <div class="flex items-center gap-3 w-full overflow-hidden min-w-0 max-w-full">
                        <NuxtImg 
                            :src="event.teamA?.logo === '' ? '/val-logo.png' : event.teamA?.logo || ''"
                            loading="lazy"
                            format="png"
                            class="size-8 object-contain rounded-lg" />

                        <div class="flex flex-1 items-baseline min-w-0 max-w-full overflow-hidden">
                            <span 
                                class="font-semibold text-default line-clamp-1 whitespace-nowrap!">
                                <span class="ml-1">
                                    {{ event.market?.team1 || 'Team A' }}
                                </span>
                            </span>
                        </div>
                    </div>
                    
                </div>

                <!-- Team 2 -->
                <div class="flex flex-row items-center gap-3 rounded-lg py-2 w-full overflow-hidden">
                    <UBadge color="neutral" variant="outline" size="lg" class="flex justify-center items-center h-6 bg-muted px-2 min-w-8 tabular-nums">
                        {{ formatGameScore(event.score, 2) }}
                    </UBadge>
                    <div class="flex items-center gap-3 w-full">
                        <NuxtImg 
                            :src="event.teamB?.logo === '' ? '/val-logo.png' : event.teamB?.logo || ''"
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
                    <OddsButton
                        :color="event.teamA?.color || null"
                        :abbreviation="event.teamA?.abbreviation.toUpperCase() || 'N/A'"
                        :odds="hktype ? (1/(event.market?.odds1 || 1)-1).toFixed(2) : event.market?.odds1 || 'N/A'"
                    />
                    <OddsButton
                        :color="event.teamB?.color || null"
                        :abbreviation="event.teamB?.abbreviation.toUpperCase() || 'N/A'"
                        :odds="hktype ? (1/(event.market?.odds2 || 1)-1).toFixed(2) : event.market?.odds2 || 'N/A'"
                    />
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