<script setup lang="ts">
import type { Playground, Prediction } from '~/types/playground';
import { formatEventDate } from '~/utils/format';

// Mock data
const playgrounds = ref<Playground[]>([
  {
    id: '1',
    name: 'Main Account',
    initialBalance: 10000,
    currentBalance: 10500,
    lastUpdated: new Date('2025-04-24'),
  },
  {
    id: '2',
    name: 'Test Strategies',
    initialBalance: 5000,
    currentBalance: 4750,
    lastUpdated: new Date('2025-04-23'),
  },
  {
    id: '3',
    name: 'Conservative Fund',
    initialBalance: 20000,
    currentBalance: 21200,
    lastUpdated: new Date('2025-04-22'),
  },
]);

const mockPredictions: Prediction[] = [
  {
    id: '1',
    playgroundId: '1',
    eventName: 'Team A vs Team B - LCS Finals',
    side: 'Team A',
    amount: 500,
    potentialWinnings: 950,
    status: 'active',
  },
  {
    id: '2',
    playgroundId: '1',
    eventName: 'FaZe vs Natus Vincere - CS2 Pro League',
    side: 'FaZe',
    amount: 300,
    potentialWinnings: 570,
    status: 'active',
  },
  {
    id: '3',
    playgroundId: '1',
    eventName: 'G2 vs Fnatic - Valorant Champions',
    side: 'G2',
    amount: 200,
    potentialWinnings: 320,
    status: 'active',
  },
  {
    id: '4',
    playgroundId: '1',
    eventName: 'Team Liquid vs Evil Geniuses - Dota 2',
    side: 'Team Liquid',
    amount: 750,
    potentialWinnings: 1125,
    status: 'closed',
    result: 'win',
  },
  {
    id: '5',
    playgroundId: '1',
    eventName: 'Sentinels vs FaZe - VCT Masters',
    side: 'Sentinels',
    amount: 400,
    potentialWinnings: 640,
    status: 'closed',
    result: 'loss',
  },
];

// State management
const selectedPlaygroundId = ref<string | null>(null);
const activeTab = ref<'active' | 'closed'>('active');
const isCreatingPlayground = ref(false);
const sidebarOpen = ref(true);

const newPlaygroundForm = reactive({
  name: '',
  balance: 1000,
});

// Helper to select playground
const selectPlayground = (playgroundId: string) => {
  selectedPlaygroundId.value = playgroundId;
  isCreatingPlayground.value = false;
};

const selectedPlayground = computed(() => {
  if (!selectedPlaygroundId.value) return null;
  return playgrounds.value.find(p => p.id === selectedPlaygroundId.value);
});

const predictions = computed(() => {
  if (!selectedPlayground.value) return [];
  const filtered = mockPredictions.filter(p => p.playgroundId === selectedPlayground.value!.id);
  return filtered.filter(p => p.status === activeTab.value);
});

const stats = computed(() => {
  if (!selectedPlayground.value) return null;
  const playground = selectedPlayground.value;
  const allPredictions = mockPredictions.filter(p => p.playgroundId === playground.id);
  
  const pnl = playground.currentBalance - playground.initialBalance;
  const pnlPercent = ((pnl / playground.initialBalance) * 100).toFixed(2);
  
  const closedPredictions = allPredictions.filter(p => p.status === 'closed');
  const wins = closedPredictions.filter(p => p.result === 'win').length;
  const winRate = closedPredictions.length > 0 
    ? ((wins / closedPredictions.length) * 100).toFixed(1)
    : '0';
  
  const activePredictions = allPredictions.filter(p => p.status === 'active');
  const activeValue = activePredictions.reduce((sum, p) => sum + p.amount, 0);

  return {
    pnl,
    pnlPercent,
    winRate,
    activePredictionsCount: activePredictions.length,
    activeValue,
  };
});

const createPlayground = () => {
  if (!newPlaygroundForm.name) return;
  
  const newPlayground: Playground = {
    id: String(playgrounds.value.length + 1),
    name: newPlaygroundForm.name,
    initialBalance: newPlaygroundForm.balance,
    currentBalance: newPlaygroundForm.balance,
    lastUpdated: new Date(),
  };
  
  playgrounds.value.push(newPlayground);
  selectedPlaygroundId.value = newPlayground.id;
  isCreatingPlayground.value = false;
  newPlaygroundForm.name = '';
  newPlaygroundForm.balance = 1000;
};

const getPredictionStatusColor = (status: string, result?: string) => {
  if (status === 'active') return 'primary';
  if (result === 'win') return 'green';
  if (result === 'loss') return 'red';
  return 'gray';
};

const getPredictionStatusLabel = (status: string, result?: string) => {
  if (status === 'active') return 'Ongoing';
  if (result === 'win') return 'Win';
  if (result === 'loss') return 'Loss';
  return 'Closed';
};

const getPnlColor = (pnl: number) => {
  if (pnl > 0) return 'text-emerald-600 dark:text-emerald-400';
  if (pnl < 0) return 'text-red-600 dark:text-red-400';
  return 'text-muted';
};

const cancelCreatePlayground = () => {
  isCreatingPlayground.value = false;
  newPlaygroundForm.name = '';
  newPlaygroundForm.balance = 1000;
};
</script>

<template>
  <div
    class="flex flex-1"
    :class="[
      'bg-neutral-50 dark:bg-neutral-950'
    ]"
  >
    <!-- USidebar with inset variant and offcanvas collapsible -->
    <USidebar
      v-model:open="sidebarOpen"
      variant="inset"
      collapsible="offcanvas"
      :ui="{
        container: 'h-full',
      }"
    >
      <!-- Sidebar Header with Icon and Title -->
      <template #header>
        <div class="flex items-center gap-2 px-2">
          <UIcon name="i-lucide-target" class="size-6 text-primary flex-shrink-0" />
          <span class="font-bold text-lg hidden sm:inline">Playgrounds</span>
        </div>
      </template>

      <!-- Sidebar Content - Playground List -->
      <template #default>
        <div class="flex flex-col gap-2">
          <!-- New Playground Button -->
          <UButton
            @click="isCreatingPlayground = true"
            color="primary"
            variant="soft"
            block
            icon="i-lucide-plus"
            label="New Playground"
            size="sm"
            class="mx-2 mt-1"
          />

          <!-- Playgrounds List -->
          <nav class="space-y-1 px-2">
            <button
              v-for="playground in playgrounds"
              :key="playground.id"
              @click="selectPlayground(playground.id)"
              :class="[
                'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-md transition-colors duration-200',
                selectedPlaygroundId === playground.id && !isCreatingPlayground
                  ? 'bg-primary/10 text-primary hover:bg-primary/15'
                  : 'text-default hover:bg-muted/60 active:bg-muted'
              ]"
            >
              <div class="flex items-center gap-2 min-w-0 flex-1">
                <UIcon name="i-lucide-target" class="size-4 flex-shrink-0" />
                <span class="text-sm font-medium truncate hidden sm:inline">{{ playground.name }}</span>
              </div>
              <span class="text-xs text-muted flex-shrink-0 whitespace-nowrap hidden sm:inline">
                ${{ (playground.currentBalance / 1000).toFixed(0) }}k
              </span>
            </button>
          </nav>
        </div>
      </template>

      <!-- Sidebar Footer -->
      <template #footer>
        <div class="border-t border-border pt-3 px-2">
          <p class="text-xs text-muted">{{ playgrounds.length }} playground{{ playgrounds.length !== 1 ? 's' : '' }}</p>
        </div>
      </template>
    </USidebar>

    <!-- Main Content Area -->
    <div
      class="flex-1 flex flex-col overflow-hidden lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-default"
    >
      <!-- Header Bar with Toggle Button -->
      <div
        class="h-(--ui-header-height) shrink-0 flex items-center px-4 gap-3 border-b border-border"
      >
        <UButton
          icon="i-lucide-panel-left"
          color="primary"
          variant="ghost"
          size="sm"
          aria-label="Toggle sidebar"
          @click="sidebarOpen = !sidebarOpen"
        />
        <div class="flex-1" />
      </div>

      <!-- Content Scroll Area -->
      <div class="flex-1 overflow-y-auto">
        <!-- Create Playground View -->
        <div v-if="isCreatingPlayground" class="flex items-center justify-center min-h-full p-4">
          <UCard class="w-full max-w-md">
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold">Create New Playground</h2>
                <UButton
                  @click="cancelCreatePlayground"
                  color="primary"
                  variant="ghost"
                  size="sm"
                  icon="i-lucide-x"
                />
              </div>
            </template>

            <div class="flex flex-col gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Playground Name</label>
                <UInput
                  v-model="newPlaygroundForm.name"
                  placeholder="e.g., Summer Trading"
                  type="text"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Initial Balance</label>
                <UInput
                  v-model.number="newPlaygroundForm.balance"
                  placeholder="e.g., 5000"
                  type="number"
                  min="100"
                />
              </div>

              <UAlert
                icon="i-lucide-info"
                title="Virtual Playground"
                description="This is a sandbox environment for testing predictions without real money."
                variant="subtle"
              />
            </div>

            <template #footer>
              <div class="flex gap-3 justify-end">
                <UButton
                  @click="cancelCreatePlayground"
                  color="primary"
                  variant="soft"
                >
                  Cancel
                </UButton>
                <UButton
                  @click="createPlayground"
                  color="primary"
                  :disabled="!newPlaygroundForm.name"
                >
                  Create Playground
                </UButton>
              </div>
            </template>
          </UCard>
        </div>

        <!-- Empty State -->
        <div v-else-if="!selectedPlayground" class="flex items-center justify-center min-h-full">
          <div class="text-center">
            <div class="mb-4">
              <UIcon name="i-lucide-inbox" class="size-16 text-muted mx-auto" />
            </div>
            <h2 class="text-2xl font-bold mb-2">No Playground Selected</h2>
            <p class="text-muted mb-8 max-w-sm">Create a new playground to start testing your prediction strategies</p>
            <UButton
              @click="isCreatingPlayground = true"
              size="lg"
              color="primary"
              icon="i-lucide-plus"
            >
              Create Your First Playground
            </UButton>
          </div>
        </div>

        <!-- Playground Dashboard View -->
        <div v-else class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <!-- Header Section -->
          <div class="mb-8">
            <div class="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 class="text-3xl lg:text-4xl font-bold">{{ selectedPlayground.name }}</h1>
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
                <p class="text-3xl font-bold">${{ selectedPlayground.currentBalance.toLocaleString() }}</p>
                <p class="text-xs text-muted">Started with ${{ selectedPlayground.initialBalance.toLocaleString() }}</p>
              </div>
            </UCard>

            <!-- P&L Card -->
            <UCard :ui="{ body: { padding: 'p-4 sm:p-5' } }">
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-muted">P&L</p>
                  <UIcon 
                    :name="stats!.pnl >= 0 ? 'i-lucide-trending-up' : 'i-lucide-trending-down'" 
                    :class="['size-5', stats!.pnl >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400']"
                  />
                </div>
                <div class="flex items-baseline gap-2">
                  <p :class="['text-3xl font-bold', getPnlColor(stats!.pnl)]">
                    {{ stats!.pnl > 0 ? '+' : '' }}${{ Math.abs(stats!.pnl).toLocaleString() }}
                  </p>
                  <p :class="['text-sm font-semibold', getPnlColor(stats!.pnl)]">
                    ({{ stats!.pnl > 0 ? '+' : '' }}{{ stats!.pnlPercent }}%)
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
                <p class="text-3xl font-bold">{{ stats!.winRate }}%</p>
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
                <p class="text-3xl font-bold">{{ stats!.activePredictionsCount }}</p>
                <p class="text-xs text-muted">${{ stats!.activeValue.toLocaleString() }} at risk</p>
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
                    @click="activeTab = 'active'"
                    :color="activeTab === 'active' ? 'primary' : 'primary'"
                    :variant="activeTab === 'active' ? 'solid' : 'ghost'"
                    size="sm"
                  >
                    Active
                  </UButton>
                  <UButton
                    @click="activeTab = 'closed'"
                    :color="activeTab === 'closed' ? 'primary' : 'primary'"
                    :variant="activeTab === 'closed' ? 'solid' : 'ghost'"
                    size="sm"
                  >
                    Closed
                  </UButton>
                </div>
              </div>
            </template>

            <!-- Table or Empty State -->
            <div v-if="predictions.length === 0" class="py-12 px-6 text-center">
              <UIcon name="i-lucide-inbox" class="size-12 text-muted mx-auto mb-3" />
              <p class="text-muted">No {{ activeTab === 'active' ? 'active' : 'closed' }} predictions yet</p>
            </div>

            <div v-else class="overflow-x-auto">
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
                      <p class="font-medium text-default line-clamp-2">{{ prediction.eventName }}</p>
                    </td>
                    <td class="py-4 px-6">
                      <p class="text-default font-medium">{{ prediction.side }}</p>
                    </td>
                    <td class="py-4 px-6 text-right">
                      <p class="font-semibold text-default">${{ prediction.amount.toLocaleString() }}</p>
                    </td>
                    <td class="py-4 px-6 text-right">
                      <p class="font-semibold text-default">${{ prediction.potentialWinnings.toLocaleString() }}</p>
                    </td>
                    <td class="py-4 px-6 text-center">
                      <UBadge
                        :color="getPredictionStatusColor(prediction.status, prediction.result)"
                        variant="soft"
                        size="sm"
                      >
                        {{ getPredictionStatusLabel(prediction.status, prediction.result) }}
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
