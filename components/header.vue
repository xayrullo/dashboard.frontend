<template>
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
          @click="onChangeTheme"
        ></v-btn>
        <v-avatar v-if="authStore.isAuthenticated" size="large">
          <v-img :alt="authStore.user?.username" :src="authStore.user?.image" />
        </v-avatar>
        <v-btn
          v-if="authStore.isAuthenticated"
          variant="text"
          icon="mdi-logout"
          @click="authStore.logout()"
        ></v-btn>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
const authStore = useAuthStore();

const themeName = useCookie<string>("theme", { default: () => "system" });

function onChangeTheme() {
  theme.toggle();
  themeName.value = theme.name.value;
}
</script>
