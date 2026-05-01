<script setup lang="ts">
import type { NewPlayground } from '~/types/playground';

definePageMeta({
  layout: 'playgrounds',
})

//Sidebar data
const { playgrounds, refresh: refreshPG } = usePlaygrounds()

// State management
const { isCreatingPlayground, sidebarOpen } = usePlaygroundStates()
const  isLoading  = ref(false)

const newPlaygroundForm = reactive({
  name: '',
  balance: 1000,
});

// Helper to select playground
const createPlayground = async () => {
  try {
    isLoading.value = true
  
    if (!newPlaygroundForm.name) return;
    if(newPlaygroundForm.balance === null){
      newPlaygroundForm.balance = 100
    }
    
    const newPlayground: NewPlayground = {
      name: newPlaygroundForm.name,
      initialBalance: newPlaygroundForm.balance,
    };
    
    const res = await useFetch('/api/prisma/playgrounds/create', {
      method: 'POST',
      body: newPlayground
    })

    resetCreatePlayground();
    await refreshPG();
  } catch (error) {
    console.error('Error creating playground:', error)
  } finally {
    isLoading.value = false
  } 
};

const resetCreatePlayground = () => {
  isCreatingPlayground.value = false;
  newPlaygroundForm.name = '';
  newPlaygroundForm.balance = 1000;
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
      :playgrounds="playgrounds || []"
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
        <!-- Create Playground View -->
        <div v-if="isCreatingPlayground" class="flex items-center justify-center min-h-full p-4">
          <UCard class="w-full max-w-md">
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold">Create New Playground</h2>
                <UButton
                  @click="resetCreatePlayground"
                  color="primary"
                  variant="ghost"
                  size="sm"
                  icon="i-lucide-x"
                />
              </div>
            </template>

            <div class="flex flex-col gap-4">
              <div>
                <UFormField label="Playground Name" required>
                  <UInput
                    v-model="newPlaygroundForm.name"
                    placeholder="e.g., Summer Trading"
                    type="text"
                    class="w-full"
                  />  
                </UFormField>
              </div>

              <div>
                <UFormField label="Initial balance" required>
                  <UInput
                    v-model.number="newPlaygroundForm.balance"
                    placeholder="e.g., 5000"
                    type="number"
                    min="100"
                    class="w-full"
                  />
                </UFormField>
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
                  @click="resetCreatePlayground"
                  color="primary"
                  variant="soft"
                >
                  Cancel
                </UButton>
                <UButton
                  @click="createPlayground"
                  color="primary"
                  :disabled="!newPlaygroundForm.name || isLoading"
                  :loading="isLoading"
                >
                  {{ isLoading ? 'Creating...' : 'Create Playground' }}
                </UButton>
              </div>
            </template>
          </UCard>
        </div>

        <!-- Empty State -->
        <div v-else class="flex items-center justify-center min-h-full py-4 sm:py-6 lg:py-8">
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
              class="cursor-pointer"
            >
              Create Your First Playground
            </UButton>
          </div>
        </div>
      </div>
      <!-- End Content Scroll Area -->
    </div>
  </div>
</template>
