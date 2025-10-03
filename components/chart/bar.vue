<template>
  <Bar
    id="bar-chart-id"
    :data="barChartData"
    :chart-data="chartData"
    :chart-options="chartOptions"
  />
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 39, 10, 40, 39],
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const barChartData = ref(chartData);
</script>
