<script setup lang="ts">
import IconVal from './icons/IconVal.vue';
import IconLive from './icons/IconLive.vue';
import IconCS2 from './icons/IconCS2.vue';
import IconLoL from './icons/IconLoL.vue';

import type { EventCounts } from '~/types/event';

const { data: counts, pending } = await useFetch<EventCounts>('/api/events-counts');

</script>

<template>
    <div 
        class="hidden lg:flex w-47.5 shrink-0 flex-col overflow-y-auto scrollbar-hide sticky gap-1"
        style="top: calc(2.25rem + var(--navbar-height)); height: calc(100vh - var(--floatnav-height));"
    >
    <!-- Filter Items -->
        <NuxtLink 
            raw
            to="/events"
            class="flex flex-row justify-between items-center rounded-md px-3 py-3 w-full hover:bg-muted cursor-pointer"
            active-class="bg-muted"
        >
            <div class="flex flex-row items-center gap-x-2.5 flex-1 min-w-0">
                <!-- Icon -->
                <IconLive />
                <!-- Filter Name -->
                <p class="text-body-base font-semibold truncate">Live</p>
            </div>
            <div v-if="pending" class="text-sm text-muted font-semibold">
                <UIcon name="i-lucide-loader-circle" class="size-5 shrink-0 text-muted animate-spin" />
            </div>
            <div v-else class="text-sm text-muted font-semibold">
                <p>{{ counts?.live || 0 }}</p>
            </div>
        </NuxtLink>
        <NuxtLink 
            raw
            to="/events/soon"
            class="flex flex-row justify-between items-center rounded-md px-3 py-3 w-full hover:bg-muted cursor-pointer"
            active-class="bg-muted"
        >
            <div class="flex flex-row items-center gap-x-2.5 flex-1 min-w-0">
                <!-- Icon -->
                <UIcon name="i-lucide-clock" class="size-5 shrink-0 text-muted" />
                <!-- Filter Name -->
                <p class="text-body-base font-semibold truncate">Upcoming</p>
            </div>
            <div class="text-sm text-muted font-semibold">{{ counts?.soon || '' }}</div>
        </NuxtLink>
        <div class="pb-1 border-b border-muted mb-1 w-full"></div>
        <div class="flex items-center px-3 mt-3 mb-2">
            <p class="text-[11px] uppercase text-muted font-medium whitespace-nowrap tracking-wider">Games</p>
        </div>
        <!-- Games Filter Items -->
        <div class="flex flex-col gap-1">
            <!-- Dota2 -->
            <NuxtLink
                raw
                to="/events/dota-2"
                class="flex flex-row items-center justify-between rounded-md p-3 w-full hover:bg-muted cursor-pointer"
                active-class="bg-muted"
            >
            <!-- Game Icon & Name -->
                <div class="flex items-center gap-x-2.5 min-w-0">
                    <NuxtImg
                        src="/dota2-league.png"
                        loading="lazy"
                        format="png"
                        class="size-5 shrink-0"
                    />
                    <p class="text-body-base font-semibold truncate text-left">Dota 2</p>
                </div>
                <!-- Game Event Count -->
                <div class="text-sm text-muted font-semibold">{{ counts?.dota2 || '' }}</div>
            </NuxtLink>

            <!-- League of Legends -->
            <NuxtLink
                raw
                to="/events/league-of-legends"
                class="flex flex-row items-center justify-between rounded-md p-3 w-full hover:bg-muted cursor-pointer"
                active-class="bg-muted"
            >
            <!-- Game Icon & Name -->
                <div class="flex items-center gap-x-2.5 min-w-0">
                    <IconLoL />
                    <p class="text-body-base font-semibold truncate text-left">LoL</p>
                </div>
                <!-- Game Event Count -->
                <div class="text-sm text-muted font-semibold">{{ counts?.lol || '' }}</div>
            </NuxtLink>

            <!-- CS2 -->
            <NuxtLink
                raw
                to="/events/cs2"
                class="flex flex-row items-center justify-between rounded-md p-3 w-full hover:bg-muted cursor-pointer"
                active-class="bg-muted"
            >
            <!-- Game Icon & Name -->
                <div class="flex items-center gap-x-2.5 min-w-0">
                    <IconCS2 />
                    <p class="text-body-base font-semibold truncate text-left">CS2</p>
                </div>
                <!-- Game Event Count -->
                <div class="text-sm text-muted font-semibold">{{ counts?.cs2 || '' }}</div>
            </NuxtLink>

            <!-- Valorant -->
            <NuxtLink
                raw
                to="/events/valorant"
                class="flex flex-row items-center justify-between rounded-md p-3 w-full hover:bg-muted cursor-pointer"
                active-class="bg-muted"
            >
            <!-- Game Icon & Name -->
                <div class="flex items-center gap-x-2.5 min-w-0">
                    <IconVal />
                    <p class="text-body-base font-semibold truncate text-left">Valorant</p>
                </div>
                <!-- Game Event Count -->
                <div class="text-sm text-muted font-semibold">{{ counts?.valo || '' }}</div>
            </NuxtLink>
        </div>
    </div>

</template>