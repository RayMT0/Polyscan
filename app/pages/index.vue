<script setup lang="ts">
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
        <!-- Header -->
        <header class="border-b border-muted px-6 py-4">
            <div class="mx-auto flex max-w-7xl items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="flex items-center justify-center size-10 rounded-lg bg-primary">
                        <UIcon name="i-lucide-gamepad-2" class="size-5 text-inverted" />
                    </div>
                    <div>
                        <h1 class="text-xl font-bold text-default">Esports Predictions</h1>
                        <p class="text-sm text-muted">Live prediction events</p>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <UAvatar
                        src="https://i.pravatar.cc/150?img=3"
                        alt="User"
                        size="md"
                    />
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="mx-auto max-w-7xl px-6 py-8">
            <!-- Stats Card -->
            <!-- Events Sections -->
            <div class="flex flex-col gap-6">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <h2 class="text-2xl font-bold text-default">Prediction Events</h2>

                    <!-- Event status filter or odds type -->
                </div>

                <!-- Event List -->
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
        </main>
    </div>
</template>
