<script setup lang="ts">
import type { Market } from '@/types/market';

defineProps<{
    market: Market;
}>();
</script>

<template>
    <div class="border rounded-xl p-4 shadow">
        <h2 class="text-lg font-semibold mb-2">{{ market.question }}</h2>
        <p class="text-sm text-gray-600 mb-1">Created: {{ new Date(market.createdAt).toLocaleDateString() }}</p>
        <p class="text-sm text-gray-600 mb-1">Probability: {{ (market.probability * 100).toFixed(2) }}%</p>
        <p class="text-sm text-gray-600">Volume: {{ market.volume }}</p>
    </div>
</template>