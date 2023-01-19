import { defineStore } from "pinia";
import { ref, reactive, computed, onMounted } from "vue";
import { fetchUsers } from "@/api/mock";
import { getUniqueValues } from "@/composables/getUniqueValues";
import type { UserDetails } from "@/types/UserDetails";

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
  const filters = reactive({ country: "", score: 0 });
  const setFilters = (value: string): void => {
    if (value === "> 20" || value === "< 10") {
      filters.score = value === "> 20" ? 2 : 1;
    } else {
      filters.country = value;
    }
  };
  const filterUsers = (value: string): void => {
    filteredUsers.value = users.value;

    setFilters(value);

    filteredUsers.value = users.value.filter((user) => {
      if (filters.country && !filters.score) {
        return user.country === filters.country;
      } else if (filters.country && filters.score === 1) {
        return user.country === filters.country && user.score < 10;
      } else if (filters.country && filters.score === 2) {
        return user.country === filters.country && user.score > 20;
      } else if (!filters.country && filters.score === 1) {
        return user.score < 10;
      } else if (!filters.country && filters.score === 2) {
        return user.score > 20;
      }
    });

    console.log(filters);
  };

  const resetFilterdUsers = () => {
    filters.country = "";
    filters.score = 0;
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
