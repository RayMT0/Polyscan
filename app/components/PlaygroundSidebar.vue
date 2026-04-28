<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

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

const navItems = computed(() => {
  const route = useRoute()

  return playgrounds.value?.map((pg) => {
    const id = pg.id
    const label = pg.name + 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    const icon = 'i-lucide-target'
    const badge = `$${formatMoney(pg.initialBalance)}`
    const to = `/playgrounds/${pg.id}`
    const active = route.path === `/playgrounds/${pg.id}`
    return{
      id,
      label,
      icon,
      badge,
      to,
      active
    }
  }) || [];
})

const dropdownItems: DropdownMenuItem[][] = [
  [
    {
      label: 'Rename playground',
      icon: 'i-lucide-pencil'
    },
    {
      label: 'Pin playground',
      icon: 'i-lucide-pin'
    },
  ],
  [ 
    {
      label: 'Delete playground',
      icon: 'i-lucide-trash-2',
      color: 'error'
    }
  ]
]

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
          <!-- NUXT UI VER, CLUNKY DROPDOWN -->
          <UNavigationMenu
            :items="navItems"
            orientation="vertical"
            color="primary"
            :ui="{
              link: 'p-1.5 overflow-hidden has-data-[state=open]:before:bg-elevated/50 has-data-[state=open]:disable',
            }"
          >
            <template #item-trailing="{ item }">
              <div class="flex items-center group-hover:gap-1.5 has-data-[state=open]:gap-1.5">
                <UBadge
                  color="neutral"
                  variant="outline"
                  size="sm"
                  class=""
                  >
                  {{ item.badge }}
                </UBadge>
                <div class="w-0 overflow-hidden group-hover:w-6 has-data-[state=open]:w-6 transition-all duration-200">
                  <UDropdownMenu
                    :items="dropdownItems"
                    :content="{ align: 'start' }"
                    :modal="true"
                    size="md"
                    class="items-center"
                  >
                    <UButton
                      icon="i-lucide-ellipsis"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      class="text-muted hover:text-highlighted hover:bg-accented/50 data-[state=open]:bg-accented/50 mr-1.5"
                    />
                  </UDropdownMenu>
                </div>
              </div>
            </template>
          </UNavigationMenu>

          <!-- Manual Sidebar Content + NuxtLink -->
          <!-- <div class="flex flex-col gap-1.5">
            <div
              v-for="item in navItems"
              :key="item.id"
              class="group flex items-center gap-2 rounded-md hover:bg-elevated/50 overflow-hidden cursor-pointer"
            >
              <ULink
                :to="item.to"
                class="flex flex-row items-center w-full px-2.5 py-1.5 gap-1.5 flex-1 min-w-0 font-semibold text-xs/5"
              >
                <UIcon :name="item.icon" class="size-4 shrink-0" />
                <span class="truncate text-sm">{{ item.label }}</span>
              </ULink>

              <div class="flex items-center group-hover:gap-1.5 has-data-[state=open]:gap-1.5">
                <UBadge 
                  color="neutral"
                  variant="outline"
                  size="sm"
                >
                {{ item.badge }}
                </UBadge>
                <div class="w-0 overflow-hidden group-hover:w-6 has-data-[state=open]:w-6 transition-all duration-200">
                  <UDropdownMenu
                    :items="dropdownItems"
                    :content="{ align: 'start' }"
                    :modal="false"
                    size="sm"
                  >
                    <UButton 
                      icon="i-lucide-ellipsis"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      class="text-muted hover:text-highlighted hover:bg-accented/50 data-[state=open]:bg-accented/50 mr-1.5"
                    />
                  </UDropdownMenu>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </template>

      <!-- Sidebar Footer -->
      <template #footer>
        <div class="border-t border-border pt-3 px-2">
          <p class="text-xs text-muted">{{ navItems.length }} playground{{ navItems.length > 1 ? 's' : '' }}</p>
        </div>
      </template>
    </USidebar>
</template>