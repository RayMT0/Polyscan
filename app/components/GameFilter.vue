<script setup lang="ts">
import IconVal from './icons/IconVal.vue';
import IconLive from './icons/IconLive.vue';

</script>

<template>
    <div 
        class="hidden lg:flex w-47.5 shrink-0 flex-col overflow-y-auto scrollbar-hide sticky"
        style="top: var(--navbar-height); height: calc(100vh - var(--navbar-height));"
    >
    <!-- Filter Items -->
        <a 
            href=""
            class="flex flex-row justify-between items-center rounded-md px-3 py-3 w-full hover:bg-accented/50 cursor-pointer"
        >
            <div class="flex flex-row items-center gap-x-2.5 flex-1 min-w-0">
                <!-- Icon -->
                <IconLive />
                <!-- Filter Name -->
                <p class="text-body-base font-semibold truncate">Live</p>
            </div>
        </a>
        <a 
            href=""
            class="flex flex-row justify-between items-center rounded-md px-3 py-3 w-full hover:bg-accented/50 cursor-pointer"
        >
            <div class="flex flex-row items-center gap-x-2.5 flex-1 min-w-0">
                <!-- Icon -->
                <UIcon name="i-lucide-clock" class="size-5 shrink-0 text-muted" />
                <!-- Filter Name -->
                <p class="text-body-base font-semibold truncate">Upcoming</p>
            </div>
        </a>
        <div class="pb-2 border-b border-neutral-100 mb-2 w-full"></div>
        <div class="flex items-center px-3 mt-4 mb-3">
            <p class="text-[11px] uppercase text-muted font-medium whitespace-nowrap tracking-wider">Games</p>
        </div>
        <!-- Games Filter Items -->
        <div>
            <button
                type="button"
                class="flex flex-row items-center justify-between rounded-md p-3 w-full hover:bg-accented/50 cursor-pointer"
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
                <div class="text-sm text-muted font-semibold">20</div>
            </button>
            <button
                type="button"
                class="flex flex-row items-center justify-between rounded-md p-3 w-full hover:bg-accented/50 cursor-pointer"
            >
            <!-- Game Icon & Name -->
                <div class="flex items-center gap-x-2.5 min-w-0">
                    <IconVal />
                    <p class="text-body-base font-semibold truncate text-left">Valorant</p>
                </div>
                <!-- Game Event Count -->
                <div class="text-sm text-muted font-semibold">20</div>
            </button>
        </div>
    </div>

</template>