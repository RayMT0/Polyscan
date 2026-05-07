<script setup lang="ts">
import type { PlaygroundSelect } from '~/types/playground'

    
const { selectedEvent: event, selectedTeam: team } = useEvents()

const { data: playgrounds, pending, execute } = await useLazyFetch('/api/prisma/playgrounds', {
    query: { sortBy: 'updated' },
    key: 'playground-select',
    transform: (data: PlaygroundSelect[]) => {
        return data?.map(playground => ({
            label: playground.name,
            value: playground.id,
            balance: playground.currentBalance
        }))
    },
    immediate: false,
})

const MAX = 1_000_000_000

const rawValue = ref<number | null>(null)
const display = computed({
    get(){
        if(rawValue.value === null) return ''
        return formatInputMoney(rawValue.value)
    },
    set(val: string){
        const numeric = parseNumber(val)
        if(isNaN(numeric)){
            rawValue.value = null
            return
        }

        rawValue.value = Math.min(numeric, MAX)
    }
})

const fontSizeClass = computed(() => {
    const len = display.value.length

    if(len<9) return 'text-4xl'
    if(len<10) return 'text-3xl'
    if(len<11) return 'text-2xl'
    return 'text-xl'
})

const onlyNumber = (e: KeyboardEvent) => {
    const input = e.target as HTMLInputElement
    const value = input.value
    const start = input.selectionStart ?? value.length
    const end = input.selectionEnd ?? value.length
    const nextValue = value.slice(0, start) + e.key + value.slice(end)
    
    if(!/[0-9.]/.test(e.key)){
        e.preventDefault()
    }else{
        if(value.includes('.')){
            if(e.key === '.') e.preventDefault();
    
            const dotIndex = value.indexOf('.')
            if(start > dotIndex){
                const decimals = value.split('.')[1] || ''
                if(decimals.length >= 2){
                    e.preventDefault()
                }
            }
            else if(start < dotIndex){
                if(parseNumber(nextValue) > MAX) e.preventDefault();
            }
        }
        if(parseNumber(nextValue) > MAX) e.preventDefault();
    }
}

function onOpen() {
  if (!playgrounds.value?.length) {
    execute()
  }
}
</script>

<template>
    <div
        class="hidden lg:flex w-89 shrink-0 flex-col overflow-y-auto scrollbar-hide sticky pr-0.5 pl-3 gap-1"
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
                        <span class="text-sm text-muted font-medium">{{ event.title }}</span>
                        <span :style="{'--team-color': team.color || '#ccc'}" class="font-semibold text-(--team-color) dark:brightness-150">{{ team.name }}</span>
                    </div>
                </div>
            </template>
            <!-- Main Content -->
            <div class="flex flex-col gap-4">
                <!-- Input prediction amount -->
                <UFormField 
                    label="Amount"
                    size="xl"
                    orientation="horizontal"
                    :ui="{
                        root: 'items-start'
                    }"
                >
                    <UInput
                        v-model="display"
                        @keypress="onlyNumber"
                        variant="none"
                        class="w-full tabular-nums tracking-tight overflow-hidden"
                        placeholder="$0"
                        inputmode="decimal"
                        type="text"
                        :ui="{
                            base: ['font-bold text-right p-0 leading-[1]!', fontSizeClass],
                        }"
                    />
                </UFormField>
                <!-- Select Playground -->
                <USelectMenu 
                    :items="playgrounds"
                    :loading="pending"
                    placeholder="Select playground"
                    class="w-full"
                    @update:open="onOpen"
                    size="xl"
                    :ui="{
                        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
                    }"
                >
                    <template #item-description="{item}">
                        <span class="text-muted">Balance: ${{ item.balance }}</span>
                    </template>
                </USelectMenu>
            </div>
            <template #footer>
                <div class="flex flex-col gap-6 w-full">
                    <!-- To Win Result -->
                    <div v-if="rawValue" class="w-full flex flex-row items-center">
                        <span class="font-semibold">To win</span>
                        <div class="flex flex-1 justify-end pl-4">
                            <span 
                                :style="{'--green-500': '#3db468'}"
                                class="text-right text-(--green-500) text-4xl font-bold tabular-nums tracking-tight"
                            >
                                ${{ formatInputMoney(rawValue * event.selectedOdds, 2) }}
                            </span>
                        </div>
                    </div>
                    <!-- Trade Button -->
                    <UButton
                        label="Trade"
                        class="w-full justify-center font-bold text-neutral-50 bg-primary-500"
                        size="lg"
                    />
                </div>
            </template>
        </UCard>
    </div>
</template>