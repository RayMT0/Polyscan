<script setup lang="ts">

const props = defineProps<{
    color: string | null,
    abbreviation: string,
    odds: string | number,
}>();
</script>

<template>
    <button 
        :style="{'--team-color': color || '#ccc'}" 
        :class="color ? 'bg-(--team-color)' : 'bg-primary'"
        class="flex-1 w-full rounded-md h-10 cursor-pointer hover:opacity-90"
        type="button"
        tabindex="0"
    >
        <p class="flex flex-1 h-full items-center text-center justify-center font-bold leading-5.21!">
            <span class="text-xs text-white opacity-70">
                {{ abbreviation }}
            </span>
            <span class="text-sm ml-1 opacity-100">
                {{ odds }}
            </span>
        </p>
    </button>  
</template>