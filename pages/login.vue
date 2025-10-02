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
            <v-form ref="formRef" class="space-y-3" @submit.prevent="login">
              <v-text-field
                label="Username"
                placeholder="johndoe@gmail.com"
                type="email"
                v-model="form.username"
                :rules="[rules.required, rules.email]"
              />

              <v-text-field
                label="Password"
                type="password"
                v-model="form.password"
                :rules="[rules.required, rules.min]"
              />
              <v-btn class="w-full" size="large" color="success" type="submit">
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

const authStore = useAuthStore();

const formRef = ref<HTMLFormElement | null>(null);
const form = ref<{ username: string; password: string }>({
  username: "sophia.brown@x.dummyjson.com",
  password: "sophiabpass",
});

const rules = {
  required: (v: string) => !!v || "Field is required",
  email: (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  min: (v: string) => v.length >= 6 || "Minimum 6 characters",
};
async function login() {
  const { valid } = await formRef.value?.validate();
  if (valid) {
    authStore.login(form.value).then(() => {
      navigateTo("/");
    });
  }
}
</script>
