<template>
  <div>
    <v-select
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

const filtersStore = useFiltersStore();
const usersStore = useUsersStore();

const scoreFilter = ref(["> 20", "< 10"]);

const isDisabled = computed(() => {
  return !filtersStore.country && !filtersStore.score;
});

const resetFilters = () => {
  filtersStore.resetFilters();
  usersStore.resetFilterdUsers();
};
</script>

<style scoped></style>
