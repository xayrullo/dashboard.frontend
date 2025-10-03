import { defineStore } from "pinia";
import { useCookie } from "#app";
import { fetchLogin } from "~/services/auth";

import type { IUser } from "~/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const token = useCookie<string | null>("token", { default: () => null });
  const refreshToken = useCookie<string | null>("refreshToken", {
    default: () => null,
  });
  const user = useCookie<IUser | null>("user", { default: () => null });

  const isAuthenticated = computed(() => !!token.value);

  async function login(params: { email: string; password: string }) {
    try {
      const res = await fetchLogin(params);
      if (res.success.value && res.data.value) {
        const data = res.data.value;
        token.value = data.accessToken;
        refreshToken.value = data.refreshToken;
        user.value = {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          image: data.image,
        };
        return;
      }
      throw res.error.value;
    } catch (err) {
      console.error("[Auth] Login failed", err);
      throw err;
    }
  }

  function logout() {
    token.value = null;
    refreshToken.value = null;
    user.value = null;
  }

  function setToken(newToken: string) {
    token.value = newToken;
  }

  function setRefreshToken(newRefreshToken: string) {
    refreshToken.value = newRefreshToken;
  }

  return {
    token,
    refreshToken,
    user,
    isAuthenticated,
    login,
    logout,
    setToken,
    setRefreshToken,
  };
});
