<script setup lang="ts">
import EmbedCard from '~/components/EmbedCard.vue';
import EventCard from '~/components/EventCard.vue';

const { data: events, pending } = await useFetch('/api/events', {
    query: { limit: 10 },
});

const stats = [
  {
    title: 'Total PnL',
    value: '+$2,847.50',
    change: '+12.5%',
    trend: 'up',
    icon: 'i-lucide-dollar-sign',
  },
  {
    title: 'Win Rate',
    value: '68.4%',
    change: '+4.2%',
    trend: 'up',
    icon: 'i-lucide-trophy',
  },
  {
    title: 'Active Predictions',
    value: '12',
    change: '-2',
    trend: 'down',
    icon: 'i-lucide-target',
  },
]

</script>

<template>
    <div class="min-h-screen bg-default">
    <!-- Main Content -->
        <!-- Stats Card -->
        <!-- Events Sections -->
        <div class="flex flex-col gap-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <h2 class="text-2xl font-bold text-default">Live Events</h2>

                <!-- Event status filter or odds type -->
            </div>

        <!-- Event List -->
            
            <!-- Polymarket Embed Cards -->
            <!-- <div class="flex flex-row gap-4 flex-wrap">
                <EmbedCard 
                    v-for="e in events"
                    :key="e.id"
                    :event="e"
                />
            </div> -->

            <!-- Event Cards -->
            <div class="flex flex-col gap-4">
                <EventCard 
                    v-for="e in events"
                    :key="e.id"
                    :event="e"
                />

                <UEmpty
                    v-if="events?.length === 0"
                    icon="i-lucide-calendar-x"
                    title="No events found"
                    description="Check back later for upcoming prediction events."
                />
            </div>
        </div>
    </div>
</template>
