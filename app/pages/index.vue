<script setup>
import MarketCard from '~/components/MarketCard.vue';

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
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Events Dashboard</h1>
        <div v-if="pending">Loading...</div>

        <div class="grid grid-cols-3 gap-4">
           <MarketCard
            v-for="e in events"
            :key="e.id"
            :event="e"
           /> 
        </div>
    </div>
</template>
