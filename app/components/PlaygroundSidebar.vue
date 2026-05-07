<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import type { PlaygroundSidebar } from '~/types/playground';

const props = defineProps<{
  playgrounds: PlaygroundSidebar[]
}>()

const { deletePlayground, deletingId } = usePlaygrounds()
const { isCreatingPlayground, sidebarOpen } = usePlaygroundStates()
const { confirm } = useConfirmDialog()

const createPlayground = () => {
    const route = useRoute()
    if(route.path !== '/playgrounds'){
        navigateTo('/playgrounds')
    }
    isCreatingPlayground.value = true
}

const navItems = computed(() => {
  if(props.playgrounds.length === 0) return [];
  
  const route = useRoute()
  return props.playgrounds.map((pg) => {
    const id = pg.id
    const label = pg.name
    const icon = 'i-lucide-target'
    const badge = `$${formatMoney(pg.currentBalance)}`
    const to = `/playgrounds/${pg.id}`
    const active = route.path === `/playgrounds/${pg.id}`
    const disabled = deletingId.value === pg.id
    return{
      id,
      label,
      icon,
      badge,
      to,
      active,
      disabled
    }
  });
})

const dropdownItems = (id: string, name: string): DropdownMenuItem[][] => [
  [
    {
      label: 'Rename playground',
      icon: 'i-lucide-pencil',
      class: 'cursor-pointer'
    },
    {
      label: 'Pin playground',
      icon: 'i-lucide-pin',
      class: 'cursor-pointer'
    },
  ],
  [ 
    {
      label: 'Delete playground',
      icon: 'i-lucide-trash-2',
      color: 'error',
      class: 'cursor-pointer',
      async onSelect() {
        const ok = await confirm({
          title: 'Delete playground?',
          description: 'Playground will be deleted permanently',
          body: "This will delete",
          bodyHighlighted: name,
          confirmLabel: 'Delete',
          confirmColor: 'error',
        })
        
        console.log(ok)
        if(!ok) return;

        await deletePlayground(id);
      }
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
      class="rounded-lg"
      :ui="{
        container: 'h-full z-0 absolute',
        body: 'lg:pt-1!'
      }"
    >
      <!-- Sidebar Header with Icon and Title -->
      <template #header>
        <div class="flex items-center gap-2 px-1">
          <UIcon name="i-lucide-target" class="size-6 text-primary shrink-0" />
          <span class="font-semibold text-highlighted truncate">Playgrounds</span>
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
            class="py-2.5 cursor-pointer"
          />

          <span class="text-xs mt-2">Recents</span>

          <!-- Playgrounds List -->
          <UNavigationMenu
            :items="navItems"
            orientation="vertical"
            color="primary"
            :ui="{
              link: 'p-1.5 overflow-hidden has-data-[state=open]:before:bg-elevated/50 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
            }"
          >
            <template #item-trailing="{ item }">
              <div v-if="!item.disabled" class="flex items-center group-hover:gap-1.5 has-data-[state=open]:gap-1.5" @click.prevent @click.stop>
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
                    :items="dropdownItems(item.id, item.label)"
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
                      class="text-muted hover:text-highlighted hover:bg-accented/50 data-[state=open]:bg-accented/50 mr-1.5 cursor-pointer"
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
        <div class="lg:border-t lg:border-accented lg:pt-3 px-2">
          <p class="text-xs text-muted">{{ navItems.length }} playground{{ navItems.length > 1 ? 's' : '' }}</p>
        </div>
      </template>
    </USidebar>
</template>