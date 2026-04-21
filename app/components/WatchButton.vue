<script setup lang="ts">
const props = defineProps<{
    link: string
}>();
</script>

<template>
    <div class="flex">
        <UTooltip 
            text="Watch Livestream"
            :delay-duration="300"
            :content="{ side: 'top', sideOffset: 10 }"
        >
            <UButton 
                icon="i-lucide-radio"
                color="primary"
                variant="soft"
                size="md"
                :to="link"
                target="_blank"
                rel="noopener noreferrer"
                referrerpolicy="no-referrer"
            >
            </UButton>
        </UTooltip>
    </div>
</template>