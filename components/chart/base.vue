<template>
  <div class="overflow-x-auto">
    <component
      :is="chartComponent"
      :data="chartData"
      :options="chartOptions"
      :height="height"
      :width="width"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";
import {
  Bar,
  Line,
  Pie,
  Doughnut,
  Radar,
  PolarArea,
  Bubble,
  Scatter,
} from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

type ChartType =
  | "bar"
  | "line"
  | "pie"
  | "doughnut"
  | "radar"
  | "polarArea"
  | "bubble"
  | "scatter";

interface BaseChartProps {
  type: ChartType;
  data: any;
  options?: any;
  height?: number;
  width?: number | string;
}

const props = defineProps<BaseChartProps>();

const chartData = computed(() => props.data);
const chartOptions = computed(() => props.options || {});

const chartComponent = computed(() => {
  switch (props.type) {
    case "bar":
      return Bar;
    case "line":
      return Line;
    case "pie":
      return Pie;
    case "doughnut":
      return Doughnut;
    case "radar":
      return Radar;
    case "polarArea":
      return PolarArea;
    case "bubble":
      return Bubble;
    case "scatter":
      return Scatter;
    default:
      return Bar;
  }
});
</script>
