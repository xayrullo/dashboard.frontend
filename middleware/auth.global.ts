import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  if (to.path === "/login") {
    if (auth.isAuthenticated) {
      return navigateTo("/");
    }
    return;
  }

  if (!auth.token && auth.refreshToken) {
    try {
      await auth.refresh();
    } catch {
      return navigateTo("/login");
    }
  }

  if (!auth.isAuthenticated) {
    return navigateTo("/login");
  }
});
