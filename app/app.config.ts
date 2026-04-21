export default defineAppConfig({
  ui: {
    tooltip: {
      slots: {
        content: 'flex items-center gap-1 bg-muted text-highlighted shadow-sm font-medium rounded-lg ring ring-accented h-6 px-3 py-3.5 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto',
        arrow: 'fill-bg stroke-default',
        text: 'truncate',
        kbds: "hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-['·'] not-first-of-type:before:me-0.5",
        kbdsSize: 'sm'
      }
    }
  }
})
