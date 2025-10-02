import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  routeRules: {},
  build: {
    transpile: ['vuetify'],
  },
  ssr: true,
  typescript: {
    shim: true,
  },
  vite: {
    vueJsx: {
      mergeProps: true,
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  imports: {
    autoImport: true,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }))
      })
    }
  ],
  css: ["@/assets/css/tailwind.css"],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
});
