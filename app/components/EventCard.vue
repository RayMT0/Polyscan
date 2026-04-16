<script setup lang="ts">
import type { Event } from '~/types/event';

const props = defineProps<{
    event: Event;
}>();

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
    <!-- Old ver -->
    <!-- <div class="border rounded-xl p-4 shadow">
        <h2 class="text-lg font-semibold mb-2">{{ event.question }}</h2>
        <p class="text-sm text-gray-600 mb-1">Start at: {{ event.startTime }}</p>
        <p class="text-sm text-gray-600 mb-1">Probability: {{ (event.probability * 100).toFixed(2) }}%</p>
        <p class="text-sm text-gray-600 mb-1">Volume: {{ event.volume }}</p>
        <p class="text-sm text-gray-600 mb-1">Score: {{ event.score }}</p>
        <p class="text-sm text-gray-600 mb-1">Period: {{ event.period }}</p>
        <p class="text-sm text-gray-600 mb-1">Watch at: <a :href="event.resolutionSource" target="_blank" rel="noopener noreferrer" class="underline">{{event.resolutionSource}}</a></p>
        <p class="text-sm text-gray-600 mb-1">Teams: {{ event.market?.team1 }} vs {{ event.market?.team2 }}</p>
        <p v-if="hktype" class="text-sm text-gray-600 mb-1">Odds: {{ (1/(event.market?.odds1 || 1)-1).toFixed(2) }} vs {{ (1/(event.market?.odds2 || 1)-1).toFixed(2) }} </p>
        <p v-else class="text-sm text-gray-600 mb-1">Odds: {{ event.market?.odds1 }} vs {{ event.market?.odds2 }} </p>
    </div> -->
    <UCard
    class="group relative overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-primary/50"
    :class="event.live ? 'ring-1 ring-success/30' : ''"
    >
        <div class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
            <!-- Game Info -->
            <div class="flex items-center gap-3 lg:min-w-48">
                <div class="flex items-center justify-center size-12 rounded-lg bg-elevated">
                    <UIcon :name="event.icon" class="size-6 text-primary" />
                </div>
                <div class="flex flex-col">
                    <span class="font-semibold text-default">{{ event.seriesSlug }}</span>
                    <span class="text-sm text-muted">To be announced</span>
                </div>
            </div>

            <!-- Status Badge -->
            <div class="flex items-center justify-center gap-2 lg:min-w-28">
                <UBadge :color="statusColor" variant="subtle" size="sm">
                    <span
                        v-if="event.live"
                        class="mr-0.5 inline-block size-2 rounded-full bg-success animate-pulse"
                    />
                    {{ statusLabel }}
                </UBadge>
            </div>

            <!-- Teams -->
            <div class="flex flex-1 items-center justify-center gap-4">
                <!-- Team 1 -->
                <button
                :disabled="!event.live"
                class="flex flex-1 items-center justify-between gap-3 rounded-lg px-4 py-3 transition-all duration-200"
                :class="[
                    event.live 
                    ? 'cursor-pointer hover:bg-elevated' 
                    : 'cursor-default',
                ]">
                    <div class="flex items-center gap-3">
                        <span class="text-2xl">Team 1 logo</span>
                        <span class="text-2xl">{{ event.market?.team1 || 'Team A' }}</span>
                    </div>
                    <UBadge color="neutral" variant="outline" size="sm">
                        {{ hktype ? (1/(event.market?.odds1 || 1)-1).toFixed(2) : event.market?.odds1 || 'N/A' }}
                    </UBadge>
                </button>

                <span class="text-sm font-bold text-muted">VS</span>

                <!-- Team 2 -->
                <button
                :disabled="!event.live"
                class="flex flex-1 items-center justify-between gap-3 rounded-lg px-4 py-3 transition-all duration-200"
                :class="[
                    event.live 
                    ? 'cursor-pointer hover:bg-elevated' 
                    : 'cursor-default',
                ]">
                    <div class="flex items-center gap-3">
                        <span class="text-2xl">Team 2 logo</span>
                        <span class="text-2xl">{{ event.market?.team2 || 'Team B' }}</span>
                    </div>
                    <UBadge color="neutral" variant="outline" size="sm">
                        {{ hktype ? (1/(event.market?.odds2 || 1)-1).toFixed(2) : event.market?.odds2 || 'N/A' }}
                    </UBadge>
                </button>
            </div>

            <!-- Time  -->
            <div class="flex items-center gap-2 lg:min-w-24 justify-end">
                <UIcon name="i-lucide-clock" class="size-4 text-muted" />
                <span class="text-sm text-muted">
                    {{ event.live ? 'In Progress' : formatTime(event.startTime) }}
                </span>
            </div>
        </div>

        <!-- Live glow effect -->
        <div 
            v-if="event.live"
            class="absolute inset-0 pointer-events-none bg-linear-to-r from-success/5 via-transparent to-success/5"
        />
    </UCard>
</template>