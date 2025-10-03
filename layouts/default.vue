<template>
  <v-app>
    <header>
      <div
        class="flex items-center justify-between p-4"
        :class="
          $vuetify.theme.name === 'dark'
            ? 'bg-gray-800 text-white'
            : 'bg-gray-200 text-black'
        "
      >
        <h1 class="text-h6">My Website</h1>
        <div class="flex items-center gap-4">
          <v-btn
            variant="text"
            :icon="
              $vuetify.theme.name === 'dark'
                ? 'mdi-weather-sunny'
                : 'mdi-weather-night'
            "
            @click="$vuetify.theme.toggle()"
          ></v-btn>
          <v-avatar size="large">
            <v-img
              :alt="authStore.user?.username"
              :src="authStore.user?.image"
            />
          </v-avatar>
        </div>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </v-app>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
</script>
