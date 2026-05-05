<script setup lang="ts">
    
const { selectedEvent: event, selectedTeam: team } = useEvents()
const value = ref(0)
</script>

<template>
    <div
        class="hidden lg:flex w-92 shrink-0 flex-col overflow-y-auto scrollbar-hide sticky pr-0.5 pl-3 gap-1"
        style="top: calc(2.25rem + var(--navbar-height)); height: calc(100vh - var(--floatnav-height));"
    >
        <UCard 
            v-if="event" 
            variant="subtle"
            :ui="{
                header: 'px-2 sm:px-4',
                body: 'px-2 sm:px-4',
                footer: 'px-2 sm:px-4',
            }"
        >
            <template #header>
                <div v-if="team" class="flex flex-row w-full items-center gap-2">
                    <NuxtImg 
                        :src="team.logo === '' ? '/val-logo.png' : team.logo || ''"
                        format="webp"
                        loading="lazy"
                        class="size-8 object-contain rounded-lg" 
                    />
                    <div class="flex flex-col">
                        <span class="text-sm text-muted font-medium">{{ event.teamA?.name ?? '' }} vs {{ event.teamB?.name ?? '' }}</span>
                        <span :style="{'--team-color': team.color || '#ccc'}" class="font-semibold text-(--team-color) dark:brightness-150">{{ team.name }}</span>
                    </div>
                </div>
            </template>
            <UFormField label="Amount">
                <UInput
                    v-model="value"
                    variant="soft"
                    :highlight="false"
                    size="xl"
                    placeholder="$0"
                    :ui="{
                        base: '',
                        leading: 'pointer-events-none'
                    }"
                >
                   <template #leading>
                        <p class="text-muted">$</p>
                   </template> 
                </UInput>
            </UFormField>
            <template #footer>
                <UButton
                    label="Trade"
                    class="w-full justify-center font-bold text-neutral-50 bg-primary-500"
                    size="lg"
                />
            </template>
        </UCard>
    </div>
</template>