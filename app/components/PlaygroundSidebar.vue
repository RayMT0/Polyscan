<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const { playgrounds, selectPlayground } = usePlaygrounds()
const { isCreatingPlayground, sidebarOpen } = usePlaygroundStates()

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
      title="PLAYGROUND"
      description="Virtual sandbox for predictions"
      class="bg-neutral-950 rounded-lg"
      :ui="{
        container: 'h-full z-0 absolute',
        title: ''
      }"
    >
      <!-- Sidebar Header with Icon and Title -->
      <!-- <template #header>
        <div class="flex items-center gap-2 px-2">
          <UIcon name="i-lucide-target" class="size-6 text-primary shrink-0" />
          <div class="flex flex-col gap-0 items-start">
            <span class="font-semibold text-highlighted truncate">Playgrounds</span>
            <span class="text-muted text-sm truncate">Virtual sandbox for predictions</span>
          </div>
        </div>
      </template> -->

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

          <span class="text-xs mt-2">Recent</span>

          <!-- Playgrounds List -->
          <UNavigationMenu
            :items="navItems"
            orientation="vertical"
            color="primary"
            :ui="{
              link: 'p-1.5 overflow-hidden has-data-[state=open]:before:bg-elevated/50',
            }"
          >
            <template #item-trailing="{ item }">
              <div class="flex items-center group-hover:gap-1.5 has-data-[state=open]:gap-1.5" @click.prevent>
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
                    :modal="false"
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
        </div>
      </template>

      <!-- Sidebar Footer -->
      <template #footer>
        <div class="border-t border-accented pt-3 px-2">
          <p class="text-xs text-muted">{{ navItems.length }} playground{{ navItems.length > 1 ? 's' : '' }}</p>
        </div>
      </template>
    </USidebar>
</template>