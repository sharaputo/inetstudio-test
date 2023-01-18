<template>
  <v-container>
    <v-row align="center" class="ma-4">
      <v-col cols="12" sm="6">
        <v-img :src="Logo" class="my-3" contain height="200" />
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <UsersFilters />
      </v-col>

      <v-col cols="12">
        <h1 class="my-6">User List</h1>

        <v-row>
          <v-col cols="12" class="text-center" v-if="usersStore.isLoading">
            <v-progress-circular color="primary" indeterminate size="70" />
          </v-col>

          <UsersList :users="usersStore.usersList" v-else />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import Logo from "@/assets/logo.svg";
import UsersFilters from "@/components/UsersFilters.vue";
import UsersList from "@/components/UsersList.vue";
import useUserStore from "@/stores/users";

const usersStore = useUserStore();
</script>
