import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    MCP_URL: process.env.MCP_URL || "http://localhost:3001",
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui'],
  app: {
    head: {
      title: 'Esports Predictions - Live Dashboard',
      meta: [
        { name: 'description', content: 'Live esports prediction events and PnL tracking' }
      ]
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    },
    plugins: [
      tailwindcss(),
    ],
  },
})
