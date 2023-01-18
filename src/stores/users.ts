import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
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
  const filterUsers = (value: string): void => {
    filteredUsers.value = users.value;

    switch (value) {
      case "> 20":
        filteredUsers.value = users.value.filter((user) => +user.score > 20); // falls through
      case "< 10":
        filteredUsers.value = users.value.filter((user) => +user.score < 10); // falls through
      default:
        filteredUsers.value = users.value.filter(
          (user) => user.country === value
        );
    }
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
