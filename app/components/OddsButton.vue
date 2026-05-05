<script setup lang="ts">

defineProps<{
    color: string | null,
    abbreviation: string,
    odds: string | number,
    onClick: () => void,
}>();
</script>

<template>
    <UButton 
        :style="{'--team-color': color || '#ccc'}" 
        :class="color ? 'bg-(--team-color) hover:bg-(--team-color)/75 active:bg-(--team-color)/60' : 'bg-primary-500 hover:bg-primary-500/75 active:bg-primary-500/60'"
        class="flex-1 w-full rounded-md h-10 cursor-pointer"
        tabindex="0"
        @click="onClick"
        :ui="{

        }"
    >
        <p class="flex flex-1 h-full items-center text-center justify-center font-bold leading-5.21!">
            <span class="text-xs text-white opacity-70">
                {{ abbreviation }}
            </span>
            <span class="text-sm ml-1 opacity-100 text-highlighted">
                {{ odds }}
            </span>
        </p>
    </UButton>  
</template>