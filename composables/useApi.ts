import { createError, useRuntimeConfig, useFetch, navigateTo } from "nuxt/app";
import defu from "defu";
import { useRoute } from "vue-router";

import type { UseFetchOptions } from "@vueuse/core";

import { ERROR_SEPARATOR } from "#imports";

import { fetchRefreshToken } from "~/services/auth";

interface ErrorType {
  errors: Record<string, string[]>;
}
type FetchOptions<T> = UseFetchOptions<T> & { timeout?: number };

let refreshPromise: Promise<void> | null = null;

export async function useApi<T = unknown>(
  url: string | (() => string),
  userOptions: FetchOptions<T> = {}
) {
  const authStore = useAuthStore();

  const config = useRuntimeConfig();
  const userToken = authStore.token;
  const route = useRoute();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(
      createError({
        statusCode: 408,
        statusMessage: "aborted",
        message: "This request has been automatically aborted.",
      })
    );
  }, userOptions.timeout);

  let executeFn: (() => Promise<void>) | null = null;

  const defaultOptions: FetchOptions<T> = {
    baseURL: `${config.public.baseUrl}`,
    method: "GET",
    retry: 3,
    signal: userOptions.timeout ? controller.signal : undefined,
    key: typeof url === "string" ? url + Date.now() : url(),

    onRequest({ options }) {
      const hasToken = !!userToken;

      if (hasToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
      }
    },

    onResponse: async (ctx) => {
      const { request, options, response } = ctx;
      if (response.status === 401) {
        if (!authStore.refreshToken) {
          authStore.logout();
          return navigateTo("/login");
        }
        if (authStore.refreshToken) {
          if (!refreshPromise) {
            refreshPromise = fetchRefreshToken(authStore.refreshToken)
              .then((res) => {
                if (res.success.value && res.data.value) {
                  authStore.setToken(res.data.value.accessToken);
                  authStore.setRefreshToken(res.data.value.refreshToken);
                } else {
                  authStore.logout();
                  navigateTo("/login");
                }
              })
              .catch((error) => {
                authStore.logout();
                navigateTo("/login");
              })
              .finally(() => {
                refreshPromise = null;
              });
          }
        }
        await refreshPromise;

        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
        };

        if (executeFn) {
          await executeFn();
        }
        return;
      }
      if (response.status === 403) {
        authStore.logout();
        navigateTo("/login");
      }
    },

    onResponseError: async ({ response }) => {
      const statusCode = response.status || 500;
      const statusMessage = response.statusText || "";
      const errorsMsg = (response._data || {}) as ErrorType;

      const errorEntries = Object.entries(errorsMsg.errors);

      const message = errorEntries.reduce((acc: string[], [key, value]) => {
        return [...acc, ...value.map((item) => `${key}: ${item}`)];
      }, []);

      throw createError({
        statusCode,
        statusMessage,
        message: message.join(ERROR_SEPARATOR),
      });
    },
  };

  const options = defu(userOptions, defaultOptions);

  if (options.method !== "GET") {
    options.cache = false;
  }

  const response = useFetch<T>(url, {
    ...options,
    onRequest: (ctx) => {
      if (options.onRequest) options.onRequest(ctx);
    },
    onResponse: async (ctx) => {
      clearTimeout(timeoutId);
      await defaultOptions.onResponse?.(ctx);
    },
    onResponseError: (ctx) => {
      clearTimeout(timeoutId);
      return defaultOptions.onResponseError?.(ctx);
    },
  });

  executeFn = response.execute;

  return response;
}
