<template>
  <v-container>
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="text-lg font-semibold">Dashboard</div>
      <v-breadcrumbs :items="breadcrumbs">
        <template #divider>
          <v-icon icon="mdi-chevron-right" />
        </template>
      </v-breadcrumbs>
    </div>

    <div class="space-y-4">
      <!-- Filters -->
      <div class="block md:flex items-center justify-end gap-x-4">
        <v-select
          v-model="queryParams.categories"
          :items="CATEGORIES"
          multiple
          clearable
          chips
          label="Categories"
          class="w-full md:max-w-[300px]"
        />
        <date-input
          v-if="periodType === 'range'"
          v-model="dateRange"
          range
          multi-calendars
          :max-date="getNextDateString(new Date(), 1)"
          label="Date range"
          class="w-full md:max-w-[300px]"
        />
        <v-select
          v-model="periodType"
          :items="PERIOD_TYPES"
          label="Range type"
          class="w-full md:max-w-[300px]"
        />
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <v-card v-for="card in cards" :key="card.label" class="col-span-1">
          <v-card-text class="flex items-center justify-between">
            <v-btn variant="text" :color="card.color" :icon="card.icon" />
            <div class="text-right">
              <div class="text-lg font-semibold">
                {{ priceFormatter(cardsData?.[card.key], card.symbol) }}
              </div>
              <div class="text-sm text-gray-500">{{ card.label }}</div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- Charts -->
      <v-card>
        <v-card-text class="lg:flex block lg:space-x-6 space-y-4 lg:space-y-0">
          <div class="w-full lg:w-1/3">
            <div class="font-semibold">Total Sales</div>
            <chart-base
              type="doughnut"
              :data="totalSales"
              :loading="totalSalesPending"
            />
          </div>
          <div class="border border-dashed my-6 lg:mx-6"></div>
          <div class="w-full lg:w-2/3">
            <div class="font-semibold">Sales Analytics</div>
            <chart-base
              type="bar"
              width="100%"
              :data="salesAnalytics"
              :loading="salesAnalyticsPending"
            />
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

import {
  fetchCards,
  fetchSalesAnalytics,
  fetchTotalSales,
} from "~/services/dashboard";
import DateInput from "~/components/ui/date-input.vue";
import type { ITotalSales } from "~/types/dashboard";
import {
  getDateRangeString,
  getNextDateString,
  priceFormatter,
} from "~/utils/tools";

interface IQueryParams {
  startDate: string;
  endDate: string;
  categories: string[];
}

const breadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Dashboard", disabled: true, href: "/dashboard" },
];

// State
const dateRange = ref<string[] | null>(getDateRangeString(new Date(), 7));
const periodType = ref<"today" | "week" | "month" | "range">("week");

const queryParams = reactive<IQueryParams>({
  startDate: getNextDateString(new Date(), -6),
  endDate: getNextDateString(new Date(), 1),
  categories: ["book", "notebook", "phone"],
});

// Card config
const cards = [
  {
    key: "totalSales",
    label: "Total Sales",
    icon: "mdi-cash-multiple",
    color: "purple",
    symbol: "$",
  },
  {
    key: "totalOrders",
    label: "Total Orders",
    icon: "mdi-cart-outline",
    color: "green",
  },
  {
    key: "bill",
    label: "Average Bill",
    icon: "mdi-cash-multiple",
    color: "blue",
    symbol: "$",
  },
  {
    key: "users",
    label: "Unique Users",
    icon: "mdi-account-multiple",
    color: "yellow",
  },
];

// Async Data
const { data: totalSalesData, pending: totalSalesPending } = useAsyncData(
  "fetch-total-sales",
  () => fetchTotalSales(queryParams).then((r) => r.data.value),
  { watch: [queryParams] }
);
const { data: salesAnalyticsData, pending: salesAnalyticsPending } =
  useAsyncData(
    "fetch-sales-analytics",
    () => fetchSalesAnalytics(queryParams).then((r) => r.data.value),
    { watch: [queryParams] }
  );
const { data: cardsData } = useAsyncData(
  "fetch-cards",
  () => fetchCards(queryParams).then((r) => r.data.value),
  { watch: [queryParams] }
);

// Computed
const totalSales = computed<ITotalSales | null>(() =>
  totalSalesData.value
    ? {
        labels: totalSalesData.value.map((i) => i.label),
        datasets: [
          {
            label: "",
            data: totalSalesData.value.map((i) => i.data),
            backgroundColor: totalSalesData.value.map((i) => i.backgroundColor),
            hoverOffset: 4,
          },
        ],
      }
    : null
);

const salesAnalytics = computed(() => salesAnalyticsData.value ?? null);

// Watchers
watch(dateRange, () => {
  if (periodType.value === "range" && dateRange.value) {
    [queryParams.startDate, queryParams.endDate] = dateRange.value;
  }
});

watch(periodType, () => {
  if (periodType.value !== "range") {
    const now = new Date();
    const ranges: Record<string, [number, number]> = {
      today: [0, 1],
      week: [-6, 1],
      month: [-29, 1],
    };
    const [start, end] = ranges[periodType.value];
    queryParams.startDate = getNextDateString(now, start);
    queryParams.endDate = getNextDateString(now, end);
  }
});
</script>
