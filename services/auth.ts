import { useApi } from "~/composables/useApi";

import type { IErrorResponse } from "~/types";
import type { ILoginResponse, IRefreshResponse } from "./../types/auth";

export const fetchLogin = async (params: {
  email: string;
  password: string;
}) => {
  const response = await useApi<ILoginResponse>("/api/auth/login", {
    method: "POST",
    body: params,
  });

  return {
    ...response,
    error: computed(() => {
      return response.error.value as IErrorResponse;
    }),
    data: computed(() => response.data.value),
    success: computed(() => !response.error.value),
  };
};

export const fetchRefreshToken = async (token: string) => {
  const response = await useApi<IRefreshResponse>("/auth/refresh", {
    method: "POST",
    body: {
      refreshToken: token,
    },
  });

  return {
    ...response,
    error: computed(() => {
      return response.error.value as IErrorResponse;
    }),
    data: computed(() => response.data.value),
    success: computed(() => !response.error.value),
  };
};
