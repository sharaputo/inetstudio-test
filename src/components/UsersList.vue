<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-col
    cols="12"
    md="4"
    sm="6"
    v-for="(user, i) in users"
    :key="`${user.title}-${i}`"
  >
    <v-card max-width="450" class="mx-auto">
      <v-card-item>
        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon size="x-large" class="mb-3" v-bind="props">
              <v-avatar size="64">
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <p class="text-caption mt-1">
                  {{ user.address }}
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>

        <v-card-title class="mb-2" v-html="user.title"></v-card-title>
        <v-card-subtitle v-html="user.subtitle"></v-card-subtitle>
      </v-card-item>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import type { UserDetails } from "@/types/UserDetails";

interface Props {
  users: UserDetails[];
}

defineProps<Props>();
</script>

<style scoped></style>
