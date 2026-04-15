<script setup>
import MarketCard from '~/components/MarketCard.vue';

const { data: markets, pending } = await useFetch('/api/markets');

</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Market Dashboard</h1>
        <div v-if="pending">Loading...</div>

        <div class="grid grid-cols-3 gap-4">
           <MarketCard
            v-for="m in markets"
            :key="m.id"
            :market="m"
           /> 
        </div>
    </div>
</template>
