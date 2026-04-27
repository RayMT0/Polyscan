export default defineNuxtPlugin(() => {
  const sidebarOpen = useState<boolean>('sidebarOpen', () => true)

  const stored = localStorage.getItem('sidebarOpen')
  if (stored !== null) {
    sidebarOpen.value = stored === 'true'
  }

  watch(sidebarOpen, (val) => {
    localStorage.setItem('sidebarOpen', String(val))
  })
})