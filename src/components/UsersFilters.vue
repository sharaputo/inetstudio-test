<template>
  <div>
    <!-- <v-select
      v-model="filtersStore.country"
      @update:modelValue="usersStore.filterUsers(filtersStore.country)"
      :items="usersStore.countries"
      label="Filter by country"
    />
    <v-select
      v-model="filtersStore.score"
      @update:modelValue="usersStore.filterUsers(filtersStore.score)"
      :items="scoreFilter"
      label="Filter by score"
    /> -->
    <v-select
      v-model="filtersStore.country"
      @update:modelValue="setFilters(filtersStore.country)"
      :items="usersStore.countries"
      label="Filter by country"
    />
    <v-select
      v-model="filtersStore.score"
      @update:modelValue="setFilters(filtersStore.score)"
      :items="scoreFilter"
      label="Filter by score"
    />
    <v-btn block variant="tonal" :disabled="isDisabled" @click="resetFilters">
      Reset filters
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import useFiltersStore from "@/stores/filters";
import useUsersStore from "@/stores/users";
import type { FilterExpression } from "@/types/FilterExpression";

const filtersStore = useFiltersStore();
const usersStore = useUsersStore();

const scoreFilter = ref(["> 20", "< 10"]);

const isDisabled = computed(() => {
  return !filtersStore.country && !filtersStore.score;
});

// Logic to form filter conditions
const filtersArray = ref<FilterExpression[]>([]);
const addToFilters = (filterObject: FilterExpression): void => {
  filtersArray.value.push(filterObject);
};
const setFiltersArray = (value: string): void => {
  const newFilter = {} as FilterExpression;

  if (value === filtersStore.score) {
    const score = Number(value.replace(/\D/g, ""));
    newFilter.key = "score";
    newFilter.operation = value === "> 20" ? "greater_than" : "less_than";
    newFilter.value = score;
  } else {
    newFilter.key = "country";
    newFilter.operation = "contains";
    newFilter.value = value;
  }

  if (filtersArray.value.length === 2) {
    filtersArray.value = filtersArray.value.filter(
      (item) => item.key !== newFilter.key
    );
  }

  addToFilters(newFilter);
};
const setFilters = (value: string): void => {
  setFiltersArray(value);
  usersStore.filterUsers(filtersArray.value);
};

const resetFilters = (): void => {
  filtersArray.value = [];
  filtersStore.resetFilters();
  usersStore.resetFilterdUsers();
};
</script>

<style scoped></style>
