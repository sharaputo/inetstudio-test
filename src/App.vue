<template>
  <v-app>
    <v-main>
      <ContentBlock />
    </v-main>

    <v-footer app v-bind="localAttrs">
      <Footer />
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import ContentBlock from "@/components/AppContent.vue";
import Footer from "@/components/AppFooter.vue";

const localAttrs = reactive({
  absolute: true,
  fixed: false,
});
</script>

<style scoped></style>
