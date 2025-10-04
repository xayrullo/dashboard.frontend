<template>
  <v-container class="h-full flex items-center justify-center">
    <div class="w-full max-w-sm lg:w-96">
      <!-- Title -->
      <h2 class="mt-8 text-2xl font-bold tracking-tight text-center">
        Sign in to your account
      </h2>

      <!-- Form -->
      <v-form ref="formRef" class="mt-10 space-y-3" @submit.prevent="login">
        <v-text-field
          v-model="form.email"
          label="Email address"
          placeholder="johndoe@gmail.com"
          type="email"
          :rules="[rules.required, rules.email]"
          clearable
        />

        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          :rules="[rules.required, rules.min]"
          clearable
        />

        <v-btn
          class="w-full"
          size="large"
          color="success"
          type="submit"
          :loading="loading"
          :disabled="loading"
        >
          Sign in
        </v-btn>

        <v-alert
          v-if="errorMessage"
          type="error"
          density="compact"
          class="mt-4"
        >
          {{ errorMessage }}
        </v-alert>
      </v-form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "guest",
  middleware: ["guest"],
});

import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const formRef = ref();
const loading = ref(false);
const errorMessage = ref("");

// ✅ Strong typing for form
interface LoginForm {
  email: string;
  password: string;
}
const form = ref<LoginForm>({
  email: "faker@gmail.com",
  password: "123456",
});

// ✅ Extract rules into reusable structure
const rules = {
  required: (v: string) => !!v || "Field is required",
  email: (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  min: (v: string) => v.length >= 6 || "Minimum 6 characters",
};

async function login() {
  const { valid } = await formRef.value?.validate();
  if (!valid) return;

  loading.value = true;
  errorMessage.value = "";

  try {
    await authStore.login(form.value);
    navigateTo("/");
  } catch (err: any) {
    errorMessage.value = err?.message || "Login failed. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>
