import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    MCP_URL: process.env.MCP_URL || "http://localhost:3001",
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', '@nuxt/image'],
  image: {
    domains: ['polymarket-upload.s3.us-east-2.amazonaws.com']
  },
  app: {
    head: {
      title: 'Polyscan',
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