<template>
  <v-container class="h-full"> Login Page </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "guest",
  middleware: ["guest"],
});
</script>
