<template>
  <v-app>
    <header-base />
    <main>
      <slot />
    </main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import HeaderBase from "~/components/header.vue";

const theme = useTheme();

const themeName = useCookie<string>("theme", { default: () => "system" });

function onChangeTheme() {
  theme.toggle();
  themeName.value = theme.name.value;
}
</script>
