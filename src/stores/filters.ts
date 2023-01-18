import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("filters", () => {
  const country = ref("");
  const score = ref("");

  const resetFilters = (): void => {
    country.value = "";
    score.value = "";
  };

  return { country, score, resetFilters };
});
