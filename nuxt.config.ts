export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,
  typescript: {
    shim: true,
  },
  vite: {
    vueJsx: {
      mergeProps: true,
    },
  },
  imports: {
    autoImport: true,
  },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/css/tailwind.css"],
});
