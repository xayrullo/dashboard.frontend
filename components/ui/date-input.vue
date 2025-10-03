<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        v-bind="props"
        v-model="text"
        :label="label"
        :placeholder="placeholder"
        readonly
        clearable
        @click:clear="clearDate"
      ></v-text-field>
    </template>

    <date-picker
      v-model="internalValue"
      inline
      auto-apply
      :range="range"
      :enable-time-picker="false"
      :multi-calendars="multiCalendars"
      :max-date="maxDate"
      @update:model-value="updateDate"
    />
  </v-menu>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

interface Props {
  modelValue: string | string[] | null;
  label?: string;
  placeholder?: string;
  range?: boolean;
  multiCalendars?: boolean;
  maxDate?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string | string[] | null): void;
  (e: "onChange", value: string | string[] | null): void;
}>();

const menu = ref(false);
const internalValue = ref<string | string[] | null>(props.modelValue);

const text = computed(() => {
  if (Array.isArray(internalValue.value)) {
    return internalValue.value
      .map((item) => new Date(item).toISOString().split("T")[0])
      .join(" : ");
  }
  internalValue.value
    ? new Date(internalValue.value).toISOString().split("T")[0]
    : "";
});

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val;
  }
);

const updateDate = (val: string | string[] | null) => {
  let date: string | string[] | null;
  if (Array.isArray(internalValue.value)) {
    date = internalValue.value.map(
      (item) => new Date(item).toISOString().split("T")[0] as string
    );
  } else {
    date = internalValue.value
      ? (new Date(internalValue.value).toISOString().split("T")[0] as string)
      : "";
  }

  emit("update:modelValue", date);
  emit("onChange", date);
  menu.value = false;
};

const clearDate = () => {
  internalValue.value = null;
  emit("update:modelValue", null);
  emit("onChange", null);
};
</script>
