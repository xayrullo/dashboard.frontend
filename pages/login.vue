<template>
  <v-container class="h-full">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-center">
            Sign in to your account
          </h2>
        </div>

        <div class="mt-10">
          <div>
            <v-form class="space-y-3">
              <v-text-field
                label="Username"
                placeholder="johndoe@gmail.com"
                type="email"
              />

              <v-text-field label="Password" type="password" />
              <v-btn class="w-full" size="large" color="success">
                Sign in
              </v-btn>
            </v-form>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "guest",
  middleware: ["guest"],
});
</script>
