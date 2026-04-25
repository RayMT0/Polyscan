<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
    {
        label: 'Events',
        to: '/events',
        active: route.path === '/events',
    },
    {
        label: 'Playground',
        to: '/playground',
        active: route.path.startsWith('/playground'),
    }
])

</script>

<template>
    <UHeader class="xl:rounded-2xl xl:max-w-7xl xl:mx-auto xl:top-3 xl:border xl:bg-default/20 w-full min-h-(--ui-header-height)"
        :ui="{
            container: 'lg:px-6'
        }"
    >
        <template #title>
            <div class="flex items-center gap-3">
                <div class="flex items-center justify-center size-8 rounded-xl bg-primary">
                    <UIcon name="i-lucide-gamepad-2" class="size-5 text-inverted" />
                </div>
                <div>
                    Polyscan
                </div>
            </div>
        </template>

        <UNavigationMenu :items="items" />

        <template #right>
            <UColorModeButton />

            <div class="flex items-center gap-4">
                <UAvatar
                    src="https://i.pravatar.cc/150?img=3"
                    alt="User"
                    size="md"
                />
            </div>
        </template>
    </UHeader>
</template>