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
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <v-card class="col-span-1">
          <v-card-text class="flex items-center justify-between">
            <v-btn
              variant="text"
              color="purple"
              icon="mdi-cash-multiple"
            ></v-btn>
            <div class="text-right">
              <div class="text-lg font-semibold">$25,000</div>
              <div class="text-sm text-gray-500">Total Sales</div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="col-span-1">
          <v-card-text class="flex items-center justify-between">
            <v-btn variant="text" color="green" icon="mdi-cart-outline"></v-btn>
            <div class="text-right">
              <div class="text-lg font-semibold">250</div>
              <div class="text-sm text-gray-500">Total Orders</div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="col-span-1">
          <v-card-text class="flex items-center justify-between">
            <v-btn variant="text" color="blue" icon="mdi-cash-multiple"></v-btn>
            <div class="text-right">
              <div class="text-lg font-semibold">$5,000</div>
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
              <div class="text-lg font-semibold">100</div>
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
                v-if="totalSales && !totalSalesPending"
                type="doughnut"
                :data="totalSales"
              />
            </client-only>
          </div>
          <div class="border border-dashed my-6 lg:mx-6"></div>
          <div class="w-full lg:w-2/3">
            <div class="text font-semibold">Sales Analytics</div>
            <client-only class="flex items-center justify-center">
              <chart-base type="bar" :data="totalSalesByCategory" />
            </client-only>
          </div>
        </v-card-text>
        <client-only>
          <chart-base type="line" :data="lineChartData" />
          <chart-base type="pie" :data="pieChartData" />
          <chart-base type="radar" :data="radarChartData" />
          <chart-base type="polarArea" :data="polarAreaChartData" />
          <chart-base type="bubble" :data="bubbleChartData" />
          <chart-base type="scatter" :data="scatterChartData" />
        </client-only>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { fetchTotalSales } from "~/services/dashboard";
import type { ITotalSales } from "~/types/dashboard";

const breadcrumbs = [
  { title: "Home", disabled: false, href: "/" },
  { title: "Dashboard", disabled: true, href: "/dashboard" },
];

const totalSalesByCategory = ref<ITotalSales>({
  labels: [
    "2025-09-25",
    "2025-09-26",
    "2025-09-27",
    "2025-09-28",
    "2025-09-29",
  ],
  datasets: [
    {
      label: "Online Store",
      data: [1200, 1500, 1800, 2000, 2200],
      backgroundColor: "#FF6384",
      hoverOffset: 4,
    },
    {
      label: "Retail Store",
      data: [1000, 1300, 1600, 1900, 2100],
      backgroundColor: "#36A2EB",
      hoverOffset: 4,
    },
    {
      label: "BTB Revenue",
      data: [800, 1100, 1400, 1700, 2000],
      backgroundColor: "#FFCE56",
      hoverOffset: 4,
    },
    {
      label: "Marketplace Revenue",
      data: [900, 1200, 1500, 1800, 2100],
      backgroundColor: "#4BC0C0",
      hoverOffset: 4,
    },
  ],
});

const lineChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Visitors",
      borderColor: "#42b983",
      data: [30, 50, 25, 60, 40, 80, 70],
      fill: false,
    },
  ],
};

const pieChartData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverOffset: 4,
    },
  ],
};

const radarChartData = {
  labels: [
    "Eating",
    "Drinking",
    "Sleeping",
    "Designing",
    "Coding",
    "Cycling",
    "Running",
  ],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
    {
      label: "My Second Dataset",
      data: [28, 48, 40, 19, 96, 27, 100],
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgb(54, 162, 235)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
  ],
};

const polarAreaChartData = {
  labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
  datasets: [
    {
      label: "My First Dataset",
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
        "rgb(201, 203, 207)",
        "rgb(54, 162, 235)",
      ],
    },
  ],
};

const scatterChartData = {
  datasets: [
    {
      label: "Scatter Dataset",
      data: [
        { x: -10, y: 0 },
        { x: 0, y: 10 },
        { x: 10, y: 5 },
        { x: 0.5, y: 5.5 },
      ],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};

const bubbleChartData = {
  datasets: [
    {
      label: "Bubble Dataset",
      data: [
        { x: 20, y: 30, r: 15 },
        { x: 40, y: 10, r: 10 },
        { x: 25, y: 50, r: 20 },
        { x: 35, y: 40, r: 25 },
      ],
      backgroundColor: "rgb(54, 162, 235)",
    },
  ],
};

const { data: totalSalesData, pending: totalSalesPending } = useAsyncData(
  "fetch-total-sales",
  async () => {
    const response = await fetchTotalSales({
      startDate: "2025-09-25",
      endDate: "2025-09-29",
    });

    return response.data.value ?? [];
  }
);

const totalSales = computed(() => {
  if (totalSalesData.value) {
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
  }
});
</script>
