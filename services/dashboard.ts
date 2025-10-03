import type { IErrorResponse } from "~/types";
import type {
  ICardsResponse,
  ITotalSales,
  ITotalSalesResponse,
} from "~/types/dashboard";

export const fetchTotalSales = async (params: {
  startDate: string;
  endDate: string;
}) => {
  const { data, error } = await useApi<ITotalSalesResponse[]>(
    "/api/dashboard/total-sales",
    { query: params }
  );

  return {
    data: data,
    error: error.value as IErrorResponse,
    success: computed(() => !error.value),
  };
};

export const fetchSalesAnalytics = async (params: {
  startDate: string;
  endDate: string;
  categories: string[];
}) => {
  const { data, error } = await useApi<ITotalSales>(
    "/api/dashboard/sales-analytics",
    { query: params }
  );

  return {
    data: data,
    error: error.value as IErrorResponse,
    success: computed(() => !error.value),
  };
};

export const fetchCards = async (params: {
  startDate: string;
  endDate: string;
}) => {
  const { data, error } = await useApi<ICardsResponse>("/api/dashboard/cards", {
    query: params,
  });

  return {
    data: data,
    error: error.value as IErrorResponse,
    success: computed(() => !error.value),
  };
};
