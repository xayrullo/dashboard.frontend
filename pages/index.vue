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
</script>