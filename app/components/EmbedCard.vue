<script setup lang="ts">
import type { Event } from '~/types/event';
defineProps<{
    event: Event;
}>();
</script>

<template>
    <div>
        <iframe
            title="polymarket-sports-iframe"
            :src="`https://embed.polymarket.com/sports?market=${event.slug}&border=true&theme=dark&height=300`"
            width="400"
            height="300"
            frameBorder="0"
            class="bg-transparent rounded-2xl "
        />
    </div>
</template>