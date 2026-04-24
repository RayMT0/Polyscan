<script setup lang="ts">
import type { Playground, Prediction } from '~/types/playground';
import { formatVolume, formatEventDate } from '~/utils/format';

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

const selectedPlaygroundId = ref<string>('1');
const activeTab = ref<'active' | 'closed'>('active');

const selectedPlayground = computed(() => {
  return playgrounds.value.find(p => p.id === selectedPlaygroundId.value);
});

const predictions = computed(() => {
  const filtered = mockPredictions.filter(p => p.playgroundId === selectedPlaygroundId.value);
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
    : 0;
  
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

const showNewPlaygroundModal = ref(false);
const newPlaygroundName = ref('');
const newPlaygroundBalance = ref(1000);

const createPlayground = () => {
  if (!newPlaygroundName.value) return;
  
  const newPlayground: Playground = {
    id: String(playgrounds.value.length + 1),
    name: newPlaygroundName.value,
    initialBalance: newPlaygroundBalance.value,
    currentBalance: newPlaygroundBalance.value,
    lastUpdated: new Date(),
  };
  
  playgrounds.value.push(newPlayground);
  selectedPlaygroundId.value = newPlayground.id;
  showNewPlaygroundModal.value = false;
  newPlaygroundName.value = '';
  newPlaygroundBalance.value = 1000;
};

const getPredictionStatusColor = (status: string, result?: string) => {
  if (status === 'active') return 'blue';
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
  if (pnl > 0) return 'text-green-500';
  if (pnl < 0) return 'text-red-500';
  return 'text-gray-500';
};
</script>

<template>
  <div class="flex h-full gap-4 lg:gap-6 flex-col lg:flex-row">
    <!-- Sidebar -->
    <div class="w-full lg:w-64 flex flex-col gap-3 lg:gap-4">
      <!-- New Playground Button -->
      <UButton
        @click="showNewPlaygroundModal = true"
        color="primary"
        size="lg"
        class="w-full"
        icon="i-lucide-plus"
      >
        New Playground
      </UButton>

      <!-- Playgrounds List -->
      <div class="flex flex-col gap-2 overflow-y-auto max-h-96 lg:max-h-full">
        <div
          v-for="playground in playgrounds"
          :key="playground.id"
          @click="selectedPlaygroundId = playground.id"
          :class="[
            'p-3 rounded-lg cursor-pointer transition-all',
            selectedPlaygroundId === playground.id
              ? 'bg-primary/10 border border-primary/30'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border border-transparent'
          ]"
        >
          <div class="flex flex-col gap-1">
            <p class="font-semibold text-sm line-clamp-1">
              {{ playground.name }}
            </p>
            <p class="text-xs text-muted">
              Balance: ${{ playground.currentBalance.toLocaleString() }}
            </p>
            <p class="text-xs text-muted">
              Updated: {{ formatEventDate(playground.lastUpdated.toISOString()) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 min-w-0">
      <!-- Empty State -->
      <div v-if="!selectedPlayground" class="flex items-center justify-center h-full">
        <div class="text-center">
          <UIcon name="i-lucide-inbox" class="size-12 text-muted mx-auto mb-4" />
          <h2 class="text-2xl font-bold mb-2">No Playground Selected</h2>
          <p class="text-muted mb-6">Create a new playground to get started</p>
          <UButton
            @click="showNewPlaygroundModal = true"
            size="lg"
            color="primary"
          >
            Create First Playground
          </UButton>
        </div>
      </div>

      <!-- Playground View -->
      <div v-else class="flex flex-col gap-6">
        <!-- Header -->
        <div>
          <h1 class="text-3xl font-bold">{{ selectedPlayground.name }}</h1>
          <p class="text-muted mt-1">Sandbox predictions with virtual funds</p>
        </div>

        <!-- Stats Cards Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- PnL Card -->
          <UCard class="p-4">
            <div class="flex flex-col gap-2">
              <p class="text-sm text-muted font-medium">PnL</p>
              <div class="flex items-baseline gap-2">
                <p :class="['text-2xl font-bold', getPnlColor(stats!.pnl)]">
                  ${{ Math.abs(stats!.pnl).toLocaleString() }}
                </p>
                <p :class="['text-sm font-semibold', getPnlColor(stats!.pnl)]">
                  {{ stats!.pnl > 0 ? '+' : '' }}{{ stats!.pnlPercent }}%
                </p>
              </div>
            </div>
          </UCard>

          <!-- Win Rate Card -->
          <UCard class="p-4">
            <div class="flex flex-col gap-2">
              <p class="text-sm text-muted font-medium">Win Rate</p>
              <p class="text-2xl font-bold">{{ stats!.winRate }}%</p>
            </div>
          </UCard>

          <!-- Active Predictions Card -->
          <UCard class="p-4">
            <div class="flex flex-col gap-2">
              <p class="text-sm text-muted font-medium">Active Predictions</p>
              <p class="text-2xl font-bold">{{ stats!.activePredictionsCount }}</p>
            </div>
          </UCard>

          <!-- Active Value Card -->
          <UCard class="p-4">
            <div class="flex flex-col gap-2">
              <p class="text-sm text-muted font-medium">Active Value</p>
              <p class="text-2xl font-bold">${{ stats!.activeValue.toLocaleString() }}</p>
            </div>
          </UCard>
        </div>

        <!-- Predictions Tabs -->
        <div>
          <!-- Tab Buttons -->
          <div class="flex gap-2 border-b border-gray-200 dark:border-gray-700">
            <button
              @click="activeTab = 'active'"
              :class="[
                'px-4 py-3 font-medium text-sm border-b-2 transition-all',
                activeTab === 'active'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-default'
              ]"
            >
              Active Predictions
            </button>
            <button
              @click="activeTab = 'closed'"
              :class="[
                'px-4 py-3 font-medium text-sm border-b-2 transition-all',
                activeTab === 'closed'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-default'
              ]"
            >
              Closed Predictions
            </button>
          </div>

          <!-- Predictions Table -->
          <div class="mt-4 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-muted">Event Name</th>
                  <th class="text-left py-3 px-4 font-semibold text-muted">Side Chosen</th>
                  <th class="text-right py-3 px-4 font-semibold text-muted">Amount Bet</th>
                  <th class="text-right py-3 px-4 font-semibold text-muted">Potential Winnings</th>
                  <th class="text-center py-3 px-4 font-semibold text-muted">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="prediction in predictions"
                  :key="prediction.id"
                  class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                >
                  <td class="py-4 px-4">
                    <p class="font-medium text-default line-clamp-2">{{ prediction.eventName }}</p>
                  </td>
                  <td class="py-4 px-4">
                    <p class="text-default">{{ prediction.side }}</p>
                  </td>
                  <td class="py-4 px-4 text-right">
                    <p class="font-semibold text-default">${{ prediction.amount.toLocaleString() }}</p>
                  </td>
                  <td class="py-4 px-4 text-right">
                    <p class="font-semibold text-default">${{ prediction.potentialWinnings.toLocaleString() }}</p>
                  </td>
                  <td class="py-4 px-4 text-center">
                    <UBadge
                      :color="getPredictionStatusColor(prediction.status, prediction.result)"
                      variant="soft"
                      size="sm"
                    >
                      {{ getPredictionStatusLabel(prediction.status, prediction.result) }}
                    </UBadge>
                  </td>
                </tr>
                <tr v-if="predictions.length === 0">
                  <td colspan="5" class="py-8 px-4 text-center text-muted">
                    No {{ activeTab === 'active' ? 'active' : 'closed' }} predictions yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- New Playground Modal -->
  <UModal v-model="showNewPlaygroundModal">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold">Create New Playground</h2>
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-lucide-x"
            @click="showNewPlaygroundModal = false"
          />
        </div>
      </template>

      <div class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Playground Name</label>
          <UInput
            v-model="newPlaygroundName"
            placeholder="Enter playground name"
            type="text"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Initial Balance</label>
          <UInput
            v-model.number="newPlaygroundBalance"
            placeholder="Enter starting balance"
            type="number"
            min="100"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex gap-2 justify-end">
          <UButton
            color="gray"
            variant="soft"
            @click="showNewPlaygroundModal = false"
          >
            Cancel
          </UButton>
          <UButton
            color="primary"
            @click="createPlayground"
            :disabled="!newPlaygroundName"
          >
            Create Playground
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
