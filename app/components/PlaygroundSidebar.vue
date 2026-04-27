<script setup lang="ts">


const { playgrounds, selectPlayground } = usePlaygrounds()
const { isCreatingPlayground, sidebarOpen } = usePlaygroundStates()

const props = defineProps<{
    selectedPlaygroundId: string,
}>()

const createPlayground = () => {
    const route = useRoute()
    if(route.path !== '/playgrounds'){
        navigateTo('/playgrounds')
    }
    isCreatingPlayground.value = true
}

</script>

<template>
    <!-- USidebar with inset variant and offcanvas collapsible -->
    <USidebar
      v-model:open="sidebarOpen"
      variant="inset"
      collapsible="offcanvas"
      class=""
      :ui="{
        container: 'h-full z-0 absolute',
      }"
    >
      <!-- Sidebar Header with Icon and Title -->
      <template #header>
        <div class="flex items-center gap-2 px-2">
          <UIcon name="i-lucide-target" class="size-6 text-primary shrink-0" />
          <span class="font-bold text-lg hidden sm:inline">Playgrounds</span>
        </div>
      </template>

      <!-- Sidebar Content - Playground List -->
      <template #default>
        <div class="flex flex-col gap-2">
          <!-- New Playground Button -->
          <UButton
            @click="createPlayground"
            color="primary"
            variant="soft"
            icon="i-lucide-plus"
            label="New playground"
            size="sm"
            class="py-2"
          />

          <!-- Playgrounds List -->
          <nav class="space-y-1">
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
                <UIcon name="i-lucide-target" class="size-4 shrink-0" />
                <span class="text-sm font-medium truncate hidden sm:inline">{{ playground.name }}</span>
              </div>
              <span class="text-xs text-muted shrink-0 whitespace-nowrap hidden sm:inline">
                ${{ formatMoney(Number(playground.initialBalance)) }}
              </span>
            </button>
          </nav>
        </div>
      </template>

      <!-- Sidebar Footer -->
      <template #footer>
        <div class="border-t border-border pt-3 px-2">
          <p class="text-xs text-muted">{{ playgrounds?.length || 0}} playground{{ playgrounds?.length !== 1 ? 's' : '' }}</p>
        </div>
      </template>
    </USidebar>
</template>