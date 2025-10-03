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
            <v-btn
              variant="text"
              color="green"
              icon="mdi-cart-outline"
            ></v-btn>
            <div class="text-right">
              <div class="text-lg font-semibold">250</div>
              <div class="text-sm text-gray-500">Total Orders</div>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="col-span-1">
          <v-card-text class="flex items-center justify-between">
            <v-btn
              variant="text"
              color="blue"
              icon="mdi-cash-multiple"
            ></v-btn>
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
        <v-card-text class="flex">
          <div class="w-full lg:w-1/3">
            <div class="font-semibold">Total Sales</div>
            <div>
              <client-only>
                <chart-base type="bar" :data="barChartData" />
                <chart-base type="line" :data="lineChartData" />
                <chart-base type="pie" :data="pieChartData" />
                <chart-base type="doughnut" :data="doughnutChartData" />
                <chart-base type="radar" :data="radarChartData" />
                <chart-base type="polarArea" :data="polarAreaChartData" />
                <chart-base type="bubble" :data="bubbleChartData" />
                <chart-base type="scatter" :data="scatterChartData" />
              </client-only>
            </div>
          </div>
          <div class="w-full lg:w-2/3">
            <div class="text font-semibold">Sales Analytics</div>
          </div>
        </v-card-text>
      </v-card> 
    </div>
  </v-container>
</template>

<script setup lang="ts">

const breadcrumbs = [
  { title: 'Home', disabled: false, href: '/' },
  { title: 'Dashboard', disabled: true, href: '/dashboard' },
]

const barChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 39, 10, 40, 39],
    },
  ],
};

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

const doughnutChartData = {
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
  labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
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
      pointHoverBorderColor: "rgb(255, 99, 132)"
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
      pointHoverBorderColor: "rgb(54, 162, 235)"
    }
  ]
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
        "rgb(54, 162, 235)"
      ]
    }
  ]
};

const scatterChartData = {
  datasets: [
    {
      label: "Scatter Dataset",
      data: [
        { x: -10, y: 0 },
        { x: 0, y: 10 },
        { x: 10, y: 5 },
        { x: 0.5, y: 5.5 }
      ],
      backgroundColor: "rgb(255, 99, 132)"
    }
  ]
};

const bubbleChartData = {
  datasets: [
    {
      label: "Bubble Dataset",
      data: [
        { x: 20, y: 30, r: 15 },
        { x: 40, y: 10, r: 10 },
        { x: 25, y: 50, r: 20 },
        { x: 35, y: 40, r: 25 }
      ],
      backgroundColor: "rgb(54, 162, 235)"
    }
  ]
};
</script>