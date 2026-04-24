<script setup lang="ts">
import EmbedCard from '~/components/EmbedCard.vue';
import EventCard from '~/components/EventCard.vue';

definePageMeta({
    layout: 'events'
})

const { data: events, pending } = await useFetch('/api/live-events', {
    query: { limit: 10 },
});

</script>

<template>
    <div class="relative h-fit flex flex-col max-w-170 w-full md:max-w-none xl:max-w-170 gap-6 lg:pl-8 pt-5">
        <div class="w-full h-full">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-5">
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
