import type { IErrorResponse } from "~/types";
import type { ITotalSalesResponse } from "~/types/dashboard";

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
    error: error,
    success: computed(() => !error.value),
  };
};
