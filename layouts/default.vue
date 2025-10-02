<template>
  <v-app>
    <header>
      <h1>My Website</h1>
      <v-btn @click="theme.toggle()" text="Toggle Light / Dark"></v-btn>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <p>&copy; 2025 My Website</p>
    </footer>
  </v-app>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleDarkMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>
