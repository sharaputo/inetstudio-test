import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import { fetchUsers } from "@/api/mock";
import { getUniqueValues } from "@/composables/getUniqueValues";
import type { UserDetails } from "@/types/UserDetails";
import type { FilterExpression } from "@/types/FilterExpression";

export default defineStore("users", () => {
  const isLoading = ref(false);
  const users = ref<UserDetails[]>([]);

  const usersList = computed(() => {
    return filteredUsers.value ?? users.value;
  });
  const countries = computed(() => {
    return users.value
      .map((user) => user.country)
      .filter(getUniqueValues)
      .sort();
  });

  const filteredUsers = ref<UserDetails[]>();
  const evaluateFiltersArray = (
    filterExpression: FilterExpression,
    object: UserDetails
  ): boolean => {
    const { key, operation, value } = filterExpression;
    const propValue = object[key];
    switch (operation) {
      case "greater_than":
        return propValue > value;
      case "less_than":
        return propValue < value;
      case "contains":
        return new RegExp(value + "").test(propValue + "");
    }
  };
  const filterUsers = (filtersArray: FilterExpression[]): void => {
    filteredUsers.value = users.value;
    isLoading.value = true;

    filteredUsers.value = filteredUsers.value.filter((user) => {
      return filtersArray.every((array) => evaluateFiltersArray(array, user));
    });

    isLoading.value = false;
  };

  const resetFilterdUsers = () => {
    filteredUsers.value = users.value;
  };

  const fetchUsersList = async (): Promise<void> => {
    isLoading.value = true;

    try {
      const usersList = (await fetchUsers()) as UserDetails[];
      users.value = usersList;
    } catch (error) {
      console.log("error", error);
    } finally {
      isLoading.value = false;
    }
  };
  onMounted(() => {
    fetchUsersList();
  });

  return {
    isLoading,
    users,
    usersList,
    countries,
    filterUsers,
    resetFilterdUsers,
  };
});
