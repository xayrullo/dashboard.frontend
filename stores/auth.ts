import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useAuthStore = defineStore("auth", () => {
  const token = useCookie<string | null>("token", { default: () => null });
  const refreshToken = useCookie<string | null>("refreshToken", {
    default: () => null,
  });
  const user = ref<Record<string, any> | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  async function login(email: string, password: string) {
    try {
      const res = await $fetch<{
        token: string;
        refreshToken: string;
        user: any;
      }>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      token.value = res.token;
      refreshToken.value = res.refreshToken;
      user.value = res.user;
    } catch (err) {
      console.error("[Auth] Login failed", err);
      throw err;
    }
  }

  async function refresh() {
    if (!refreshToken.value) return;

    try {
      const res = await $fetch<{ token: string }>("/api/auth/refresh", {
        method: "POST",
        body: { refreshToken: refreshToken.value },
      });
      token.value = res.token;
    } catch (err) {
      console.error("[Auth] Refresh failed", err);
      logout();
    }
  }

  function logout() {
    token.value = null;
    refreshToken.value = null;
    user.value = null;
  }

  return {
    token,
    refreshToken,
    user,
    isAuthenticated,
    login,
    refresh,
    logout,
  };
});
