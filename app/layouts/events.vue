<script setup lang="ts">

</script>

<template>
    <NuxtLayout name="default">
        <!-- Main Content -->
        <div class="flex min-w-0 min-h-0 flex-1 flex-col lg:flex-row lg:gap-2 px-4 sm:px-6">
            <!-- Game Filters -->
            <GameFilter />
            <!-- Events Sections -->
            <slot />
            <!-- Prediction Sidecard -->
            <PredictionCard />
        </div>
    </NuxtLayout>
</template>