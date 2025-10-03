<template>
  <v-app>
    <header-base />
    <slot />
  </v-app>
</template>

<script setup lang="ts">
import HeaderBase from "~/components/header.vue";
</script>
