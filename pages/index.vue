<template>
  <v-container>
    <div class="flex items-center justify-between">
      <div class="text-lg font-semibold">Dashboard</div>
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="space-y-4">
      <div
        class="block md:flex items-center justify-end gap-x-4 space-y-4 md:space-y-0"
      >
        <v-select
          v-model="queryParams.categories"
          :items="CATEGORIES"
          multiple
          clearable
          chips
          label="Categories"
          class="w-full md:max-w-[300px]"
        >
        </v-select>
        <v-select
          v-model="periodType"
          :items="PERIOD_TYPES"
          label="Date range"
          class="w-full md:max-w-[300px]"
        ></v-select>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <v-card class="col-span-1">
          <v-card-text class="flex items-center justify-between">
            <v-btn
              variant="text"
              color="purple"
              icon="mdi-cash-multiple"
            ></v-btn>
            <div class="text-right">
              <div class="text-lg font-semibold">
                {{ priceFormatter(cardsData?.totalSales, "$") }}
              </div>
              <div class="text-sm text-gray-500">Total Sales</div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="col-span-1">
          <v-card-text class="flex items-center justify-between">
            <v-btn variant="text" color="green" icon="mdi-cart-outline"></v-btn>
            <div class="text-right">
              <div class="text-lg font-semibold">
                {{ priceFormatter(cardsData?.totalOrders) }}
              </div>
              <div class="text-sm text-gray-500">Total Orders</div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="col-span-1">
          <v-card-text class="flex items-center justify-between">
            <v-btn variant="text" color="blue" icon="mdi-cash-multiple"></v-btn>
            <div class="text-right">
              <div class="text-lg font-semibold">
                {{ priceFormatter(cardsData?.bill, "$") }}
              </div>
              <div class="text-sm text-gray-500">Average Bill</div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="col-span-1">
          <v-card-text class="flex items-center justify-between">
            <v-btn
              variant="text"
              color="yellow"
              icon="mdi-account-multiple"
            ></v-btn>
            <div class="text-right">
              <div class="text-lg font-semibold">
                {{ priceFormatter(cardsData?.users) }}
              </div>
              <div class="text-sm text-gray-500">Unique Users</div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <v-card>
        <v-card-text class="lg:flex block lg:space-x-6 space-y-4 lg:space-y-0">
          <div class="w-full lg:w-1/3">
            <div class="font-semibold">Total Sales</div>
            <client-only class="flex items-center justify-center">
              <chart-base
                v-if="totalSales"
                type="doughnut"
                :data="totalSales"
              />
            </client-only>
          </div>
          <div class="border border-dashed my-6 lg:mx-6"></div>
          <div class="w-full lg:w-2/3">
            <div class="text font-semibold">Sales Analytics</div>
            <client-only class="flex items-center justify-center">
              <chart-base
                v-if="salesAnalytics"
                type="bar"
                width="100%"
                :data="salesAnalytics"
              />
            </client-only>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import {
  fetchCards,
  fetchSalesAnalytics,
  fetchTotalSales,
} from "~/services/dashboard";
import type { ITotalSales } from "~/types/dashboard";
import { priceFormatter } from "~/utils/tools";

interface IQueryParams {
  startDate: string;
  endDate: string;
  categories: string[];
}

const breadcrumbs = [
  { title: "Home", disabled: false, href: "/" },
  { title: "Dashboard", disabled: true, href: "/dashboard" },
];

const periodType = ref<string>("today");
const queryParams = ref<IQueryParams>({
  startDate: "2025-09-25",
  endDate: "2025-10-01",
  categories: ["book", "notebook", "phone"],
});

const { data: totalSalesData, pending: totalSalesPending } = useAsyncData(
  "fetch-total-sales",
  async () => {
    const response = await fetchTotalSales(queryParams.value);

    return response.data.value ?? [];
  },
  {
    watch: [() => JSON.stringify(queryParams.value)],
  }
);

const { data: salesAnalyticsData, pending: salesAnalyticsPending } =
  useAsyncData(
    "fetch-sales-analytics",
    async () => {
      const response = await fetchSalesAnalytics(queryParams.value);

      return response.data.value ?? [];
    },
    {
      watch: [() => JSON.stringify(queryParams.value)],
    }
  );

const { data: cardsData, pending: cardsPending } = useAsyncData(
  "fetch-cards",
  async () => {
    const response = await fetchCards(queryParams.value);

    return response.data.value;
  },
  {
    watch: [() => JSON.stringify(queryParams.value)],
  }
);

const totalSales = computed(() => {
  if (!totalSalesData.value) return null;
  return {
    labels: totalSalesData.value.map((item) => item.label),
    datasets: [
      {
        label: "",
        data: totalSalesData.value.map((item) => item.data),
        backgroundColor: totalSalesData.value.map(
          (item) => item.backgroundColor
        ),
        hoverOffset: 4,
      },
    ],
  } as ITotalSales;
});

const salesAnalytics = computed(() => {
  if (!salesAnalyticsData.value) return null;
  return salesAnalyticsData.value;
});
</script>
