<script setup lang="ts">
import type { Playground, Prediction, PredictionsResultStatus, PredictionsStatus } from '~/types/playground';
import { PredictionResultStatus, PredictionStatus } from '~/types/playground';


const route = useRoute()

//Data
const { data: playground, pending, error } = useFetch<Playground>(
    () => `/api/prisma/playgrounds/${route.params.playgroundId}`,
    {
        key: () => `pg-${route.params.playgroundId}`,
        server: false,
        watch: [() => route.params.playgroundId]
    }
)

const { selectedPlaygroundId } = usePlaygrounds()

//UI States
const { isCreatingPlayground, sidebarOpen } = usePlaygroundStates()
const activeTab = ref<PredictionsStatus>(PredictionStatus.ACTIVE);


const stats = computed(() => {
    if (!playground.value) return null;
    const pnl = playground.value.currentBalance - playground.value.initialBalance;
    const pnlPercent = ((pnl / playground.value.initialBalance) * 100).toFixed(2);

    const winRate = playground.value.winRate;

    const activePredictions = playground.value.activePredictions;
    const activeValue = playground.value.activeValue;

    return {
    pnl,
    pnlPercent,
    winRate,
    activePredictions,
    activeValue,
    };
});

const predictions = computed(() => {
    if(playground.value?.predictions && playground.value.predictions.length > 0){
        return playground.value.predictions.filter((p: Prediction) => p.status === activeTab.value)
    }
    else return null;
})

const getPredictionStatusColor = (status: string, result?: string) => {
  if (status === PredictionStatus.ACTIVE) return 'secondary';
  if (result === PredictionResultStatus.WIN) return 'primary';
  if (result === PredictionResultStatus.LOSS) return 'error';
  return 'neutral';
};

const getPredictionStatusLabel = (status: PredictionsStatus, result: PredictionsResultStatus) => {
  if (status === PredictionStatus.ACTIVE) return 'Ongoing';
  if (result === PredictionResultStatus.WIN) return 'Win';
  if (result === PredictionResultStatus.LOSS) return 'Loss';
  return 'Closed';
};

const getPnlColor = (pnl: number) => {
  if (pnl > 0) return 'text-primary';
  if (pnl < 0) return 'text-error';
  return 'text-muted';
};
</script>

<template>
    <div
    class="flex flex-1 overflow-hidden mt-3 relative rounded-xl"
    :class="[
      'bg-neutral-50 dark:bg-neutral-950'
    ]"
  >
    <!-- Playrground Sidebar -->
    <PlaygroundSidebar 
      :selected-playground-id="selectedPlaygroundId || ''"
    />

    <!-- Main Content Area with proper inset styling -->
    <div
      class="flex-1 flex flex-col overflow-hidden lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-default"
    >
      <!-- Header Bar with Toggle Button -->
      <div
        class="h-(--ui-header-height) shrink-0 flex items-center px-4 border-b border-default"
      >
        <UButton
          icon="i-lucide-panel-left"
          color="primary"
          variant="ghost"
          size="sm"
          aria-label="Toggle sidebar"
          @click="sidebarOpen = !sidebarOpen"
        />
      </div>

      <!-- Content Scroll Area -->
      <div class="flex-1 overflow-y-auto">
        <!-- Playground Dashboard View -->
        <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <!-- Header Section -->
          <div class="mb-8">
            <div class="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 class="text-3xl lg:text-4xl font-bold">{{ playground?.name }}</h1>
                <p class="text-muted mt-2">Virtual playground for testing prediction strategies</p>
              </div>
              <UButton
                @click="isCreatingPlayground = true"
                color="primary"
                variant="soft"
                size="sm"
                icon="i-lucide-plus"
              >
                New
              </UButton>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <!-- Current Balance -->
            <UCard>
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-muted">Current Balance</p>
                  <UIcon name="i-lucide-wallet" class="size-5 text-muted" />
                </div>
                <p class="text-3xl font-bold">${{ formatMoney(Number(playground?.currentBalance) || 0) }}</p>
                <p class="text-xs text-muted">Started with ${{ formatMoney(Number(playground?.initialBalance) || 0) }}</p>
              </div>
            </UCard>

            <!-- P&L Card -->
            <UCard>
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-muted">P&L</p>
                  <UIcon 
                    :name="(stats?.pnl || 0) >= 0 ? 'i-lucide-trending-up' : 'i-lucide-trending-down'" 
                    :class="['size-5',(stats?.pnl || 0) >= 0 ? 'text-primary' : 'text-error']"
                  />
                </div>
                <div class="flex items-baseline gap-2">
                  <p :class="['text-3xl font-bold', getPnlColor(stats?.pnl || 0)]">
                    {{ (stats?.pnl || 0) >= 0 ? '+' : '' }}${{ stats?.pnl || 0 }}
                  </p>
                  <p :class="['text-sm font-semibold', getPnlColor(stats?.pnl || 0)]">
                    ({{ (stats?.pnl || 0) >= 0 ? '+' : '' }}{{ stats?.pnlPercent || 0 }}%)
                  </p>
                </div>
              </div>
            </UCard>

            <!-- Win Rate Card -->
            <UCard>
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-muted">Win Rate</p>
                  <UIcon name="i-lucide-target" class="size-5 text-muted" />
                </div>
                <p class="text-3xl font-bold">{{ stats?.winRate || 0 }}%</p>
                <p class="text-xs text-muted">Based on closed predictions</p>
              </div>
            </UCard>

            <!-- Active Predictions Card -->
            <UCard>
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-muted">Active Bets</p>
                  <UIcon name="i-lucide-zap" class="size-5 text-muted" />
                </div>
                <p class="text-3xl font-bold">{{ stats?.activePredictions || 'N/A' }}</p>
                <p class="text-xs text-muted">${{ stats?.activeValue.toLocaleString() || 'N/A' }} at risk</p>
              </div>
            </UCard>
          </div>

          <!-- Predictions Section -->
          <UCard>
            <!-- Tabs Header -->
            <template #header>
              <div class="flex items-center gap-4">
                <h2 class="text-lg font-bold">Predictions</h2>
                <div class="flex gap-2 ml-auto">
                  <UButton
                    @click="activeTab = PredictionStatus.ACTIVE"
                    :color="activeTab === PredictionStatus.ACTIVE ? 'primary' : 'primary'"
                    :variant="activeTab === PredictionStatus.ACTIVE ? 'solid' : 'ghost'"
                    size="sm"
                  >
                    Active
                  </UButton>
                  <UButton
                    @click="activeTab = PredictionStatus.CLOSED"
                    :color="activeTab === PredictionStatus.CLOSED ? 'primary' : 'primary'"
                    :variant="activeTab === PredictionStatus.CLOSED ? 'solid' : 'ghost'"
                    size="sm"
                  >
                    Closed
                  </UButton>
                </div>
              </div>
            </template>

            <!-- Table or Empty State -->
            <div v-if="!predictions" class="py-12 px-6 text-center">
              <UIcon name="i-lucide-inbox" class="size-12 text-muted mx-auto mb-3" />
              <p class="text-muted">No {{ activeTab.toLowerCase() }} predictions yet</p>
            </div>

            <div v-else class="overflow-x-auto overflow-y-scroll">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-t border-border">
                    <th class="text-left py-4 px-6 font-semibold text-muted">Event</th>
                    <th class="text-left py-4 px-6 font-semibold text-muted">Side</th>
                    <th class="text-right py-4 px-6 font-semibold text-muted">Bet Amount</th>
                    <th class="text-right py-4 px-6 font-semibold text-muted">Potential Return</th>
                    <th class="text-center py-4 px-6 font-semibold text-muted">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="prediction in predictions"
                    :key="prediction.id"
                    class="border-t border-border hover:bg-muted/50 transition-colors"
                  >
                    <td class="py-4 px-6">
                      <p class="font-medium text-default line-clamp-2">{{ prediction.title }}</p>
                    </td>
                    <td class="py-4 px-6">
                      <p class="text-default font-medium">{{ prediction.oddsTitle }}</p>
                    </td>
                    <td class="py-4 px-6 text-right">
                      <p class="font-semibold text-default">${{ formatMoney(prediction.value) }}</p>
                    </td>
                    <td v-if="activeTab === PredictionStatus.ACTIVE" class="py-4 px-6 text-right">
                      <p class="font-semibold text-default">${{ formatMoney(prediction.odds * prediction.value) }}</p>
                    </td>
                    <td v-else class="py-4 px-6 text-right">
                      <p class="font-semibold text-default">${{ formatMoney(prediction.resultValue) }}</p>
                    </td>
                    <td class="py-4 px-6 text-center">
                      <UBadge
                        :color="getPredictionStatusColor(prediction.status, prediction.resultStatus)"
                        variant="soft"
                        size="sm"
                      >
                        {{ getPredictionStatusLabel(prediction.status, prediction.resultStatus) }}
                      </UBadge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </UCard>
        </div>
      </div>
      <!-- End Content Scroll Area -->
    </div>
  </div>
</template>